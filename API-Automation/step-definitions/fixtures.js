import { test as base } from 'playwright-bdd';
import { LocateApiClient } from '../clients/LocateApiClient.js';
import { API_ENV } from '../Config/env.js';
import { apiCredentials, apiParty, hasApiCredentials } from '../testdata/apiTestData.js';

/**
 * Fixtures for the Velocity JSON API suite.
 *
 * Note what is NOT here: no browser, no page, no context. None of these
 * fixtures touch `page`, so Playwright never launches a browser for this
 * project and the whole suite runs at HTTP speed.
 *
 * Two clients are offered because the scenarios need both:
 *
 *   api      - test-scoped, NOT logged on. Scenarios that exercise the session
 *              lifecycle itself (logon, bad credentials, logout, using a dead
 *              token) drive this one and control the token by hand.
 *
 *   authedApi - test-scoped client carrying a token from a worker-scoped logon.
 *              The token is acquired once per worker rather than once per
 *              scenario, because spec 1.3 says a new logon invalidates nothing
 *              but each one is still a round trip, and a suite that logs on per
 *              scenario spends most of its wall clock on /logon.
 *
 * The shared token is torn down with a single /logout when the worker finishes.
 */

/** Worker-scoped holder so authedApi instances share one token. */
async function acquireSharedSession() {
  const client = await LocateApiClient.create({ baseURL: API_ENV.baseURL });
  const res = await client.logon(apiCredentials());

  if (res.httpStatus !== 200 || !client.token) {
    await client.dispose();
    throw new Error(
      `Shared logon failed against ${API_ENV.baseURL} - every authenticated scenario ` +
        `in this worker would fail with 401.\n` +
        `HTTP ${res.httpStatus} ${res.httpStatusText}\n` +
        `Body: ${res.text}`
    );
  }
  return client;
}

export const test = base.extend({
  /** Which environment this run is pointed at. Asserted by the smoke scenario. */
  apiEnv: [async ({}, use) => { await use(API_ENV); }, { scope: 'worker' }],

  /** mpid / trader echoed back on quote and order responses. */
  party: async ({}, use) => {
    await use(apiParty());
  },

  /**
   * Worker-scoped session. Logs on once, logs out at the end of the worker.
   * Scenarios do not use this directly - they use `authedApi`.
   */
  sharedSession: [
    async ({}, use) => {
      if (!hasApiCredentials()) {
        // Let the scenario decide what to do. A worker-level throw here would
        // report as an infrastructure error rather than a skipped suite.
        await use(null);
        return;
      }
      const client = await acquireSharedSession();
      await use(client);
      // Best effort: a failed logout must not fail an otherwise green run.
      await client.logout().catch(() => {});
      await client.dispose();
    },
    { scope: 'worker' },
  ],

  /**
   * Unauthenticated client, fresh per scenario. Use for the session lifecycle
   * and for any negative test that needs full control of the token field.
   */
  api: async ({}, use) => {
    const client = await LocateApiClient.create({ baseURL: API_ENV.baseURL });
    await use(client);
    await client.dispose();
  },

  /**
   * Authenticated client, fresh per scenario but carrying the worker's token.
   * Disposing this does not log the shared session out.
   */
  authedApi: async ({ sharedSession }, use) => {
    test.skip(
      !sharedSession,
      'Velocity API credentials are not set - see API-Automation/README.md'
    );
    const client = await LocateApiClient.create({ baseURL: API_ENV.baseURL });
    client.token = sharedSession.token;
    client.user = sharedSession.user;
    await use(client);
    await client.dispose();
  },

  /**
   * Per-scenario scratchpad.
   *
   * Gherkin steps are separate functions, so anything one step produces and a
   * later step asserts on has to live somewhere. This is that somewhere - one
   * object per scenario, wiped between scenarios, so nothing leaks across
   * tests the way a module-level variable would.
   */
  world: async ({}, use) => {
    await use({
      /** Envelope from the most recent call, whatever endpoint it hit. */
      response: null,
      /** Last successful /quote response body. */
      quote: null,
      /** Last order response body, from /limit, /overnight or /locate. */
      order: null,
      /** Last /snapshot response body. */
      snapshot: null,
      /** Client-assigned ids issued during the scenario, for restatement. */
      ids: {},
      /** Values a step wants to hand to a later step by name. */
      stash: {},
    });
  },
});

export { expect } from '@playwright/test';
