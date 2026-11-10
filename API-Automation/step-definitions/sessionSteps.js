/**
 * Steps for section 3 Logon and Logout.
 *
 * These drive the unauthenticated `api` client, because the whole point is to
 * control the token by hand.
 */
import { createBdd } from 'playwright-bdd';
import { test, expect } from './fixtures.js';
import { requireResponse } from './commonApiSteps.js';
import { LOGON_RESPONSE, LOGOUT_RESPONSE } from '../schemas/responseSchemas.js';
import { assertShape } from '../utils/validate.js';
import { apiCredentials, INVALID } from '../testdata/apiTestData.js';
import { SYMBOLS, QUANTITIES, apiParty } from '../testdata/apiTestData.js';

const { When, Then } = createBdd(test);

// --- 3 Logon ---------------------------------------------------------------

When('the client logs on with valid credentials', async ({ api, world }) => {
  world.response = await api.logon(apiCredentials());
});

When('the client logs on with an invalid password', async ({ api, world }) => {
  const { user } = apiCredentials();
  world.response = await api.logon({ user, password: INVALID.password });
});

When('the client logs on with an unknown user', async ({ api, world }) => {
  world.response = await api.logon({ user: INVALID.user, password: INVALID.password });
});

When('the client logs on with a callbackUrl', async ({ api, world }) => {
  const creds = apiCredentials();
  world.response = await api.logon({
    ...creds,
    // Optional field, spec section 3: "reserved for server-pushed messages".
    callbackUrl: creds.callbackUrl || 'https://example.invalid/velocity-callback',
  });
});

When('the client logs on again', async ({ api, world }) => {
  world.stash.previousToken = api.token;
  world.response = await api.logon(apiCredentials());
});

Then('the response should match the logon schema', async ({ world }) => {
  const res = requireResponse(world);
  assertShape(res.body, LOGON_RESPONSE, 'logon response');
});

Then('a session token should be returned', async ({ api, world }) => {
  const res = requireResponse(world);
  const token = res.body?.token;
  expect(String(token || '').length, 'logon returned an empty token').toBeGreaterThan(0);
  expect(api.token, 'client should have stored the token').toBe(token);
  world.stash.token = token;
});

Then('no session token should be returned', async ({ world }) => {
  const res = requireResponse(world);
  expect(String(res.body?.token || ''), 'a failed logon must not return a token').toBe('');
});

Then('the returned user should match the requested user', async ({ world }) => {
  const res = requireResponse(world);
  expect(res.body?.user).toBe(apiCredentials().user);
});

Then('the new token should differ from the previous token', async ({ world }) => {
  const res = requireResponse(world);
  expect(world.stash.previousToken, 'no previous token was captured').toBeTruthy();
  expect(res.body?.token).not.toBe(world.stash.previousToken);
});

// --- 3 Logout --------------------------------------------------------------

When('the client logs out', async ({ api, world }) => {
  // Keep the token around: the follow-up step proves it no longer works.
  world.stash.loggedOutToken = api.token;
  world.response = await api.logout({}, { store: false });
  api.token = world.stash.loggedOutToken;
});

When('the client logs out with a token it never held', async ({ api, world }) => {
  world.response = await api.logout(
    { user: apiCredentials().user, token: INVALID.token },
    { store: false }
  );
});

Then('the response should match the logout schema', async ({ world }) => {
  const res = requireResponse(world);
  assertShape(res.body, LOGOUT_RESPONSE, 'logout response');
});

Then('the logout response should not carry a token', async ({ world }) => {
  const res = requireResponse(world);
  // Section 3 omits `token` from the logout response entirely.
  expect(
    Object.prototype.hasOwnProperty.call(res.body || {}, 'token'),
    'section 3 defines no token field on the logout response'
  ).toBe(false);
});

Then('the logout response should not carry a timestamp', async ({ world }) => {
  const res = requireResponse(world);
  for (const field of ['time', 'transactTime']) {
    expect(
      Object.prototype.hasOwnProperty.call(res.body || {}, field),
      `Specification 1.5 omits ${field} from the logout response`
    ).toBe(false);
  }
});

Then(
  'the invalidated token should be rejected on a subsequent request',
  async ({ api, world }) => {
    // Any authenticated endpoint proves the point; /quote is the cheapest that
    // does not create an order.
    const party = apiParty();
    const res = await api.quote({
      symbol: SYMBOLS.liquid,
      orderQty: QUANTITIES.standard,
      token: world.stash.loggedOutToken,
      ...party,
    });
    world.response = res;

    const statusCode = Number(res.body?.status?.code);
    const filterStatus = Number(res.body?.Status);
    expect(
      res.httpStatus,
      `expected HTTP 401 after logout, got HTTP ${res.httpStatus} with body ${res.text}`
    ).toBe(401);
    expect(
      (statusCode === 11 && typeof res.body?.status?.message === 'string') ||
        (filterStatus === 401 && typeof res.body?.message === 'string'),
      `expected a Specification 1.5 authentication error envelope, got ${res.text}`
    ).toBe(true);
  }
);
