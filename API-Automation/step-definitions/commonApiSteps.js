/**
 * Steps shared by every JSON API feature: session preconditions, and the
 * generic assertions on the HTTP envelope and the status object.
 *
 * Endpoint-specific steps live in the sibling files.
 */
import { createBdd } from 'playwright-bdd';
import { test, expect } from './fixtures.js';
import {
  HTTP_STATUS_MEANING,
  STATUS_CODE,
  describeStatusCode,
} from '../schemas/statusCodes.js';
import { assertShape } from '../utils/validate.js';
import { STATUS_SCHEMA } from '../schemas/responseSchemas.js';

const { Given, When, Then } = createBdd(test);

// --- Preconditions ---------------------------------------------------------

Given('the client has a valid session token', async ({ authedApi, world }) => {
  expect(authedApi.token, 'shared session token should be set by the fixture').toBeTruthy();
  world.stash.token = authedApi.token;
});

Given('the client has no session token', async ({ api, world }) => {
  api.token = null;
  world.stash.token = null;
});

Given('the client has an invalid session token {string}', async ({ api, world }, token) => {
  api.token = token;
  world.stash.token = token;
});

// --- Generic HTTP envelope assertions -------------------------------------

Then('the HTTP response status should be {int}', async ({ world }, expected) => {
  const res = requireResponse(world);
  expect(
    res.httpStatus,
    `expected HTTP ${expected} (${HTTP_STATUS_MEANING[expected] || 'no spec entry'}) ` +
      `from POST ${res.entityUrl}, body was: ${res.text.slice(0, 500)}`
  ).toBe(expected);
});

Then('the response should be valid JSON', async ({ world }) => {
  const res = requireResponse(world);
  expect(
    res.parseError,
    `POST ${res.entityUrl} did not return parseable JSON: ${res.text.slice(0, 500)}`
  ).toBeNull();
  expect(res.body, 'response body should not be empty').not.toBeNull();
});

Then(
  'the response Content-Type header should be {string}',
  async ({ world }, expectedType) => {
    const res = requireResponse(world);
    const actual = res.headers['content-type'] || '';
    // Spec 1.1: the server sends application/json "without any media type
    // parameters", so a charset suffix is itself a finding, not noise.
    expect(
      actual,
      `spec 1.1 requires Content-Type without media type parameters, got "${actual}"`
    ).toBe(expectedType);
  }
);

Then('the response should carry a status object', async ({ world }) => {
  const res = requireResponse(world);
  assertShape(res.body?.status, STATUS_SCHEMA, `${res.entityUrl} status object`);
});

Then('the response should arrive within {int} ms', async ({ world }, budgetMs) => {
  const res = requireResponse(world);
  expect(
    res.durationMs,
    `POST ${res.entityUrl} took ${res.durationMs}ms, budget is ${budgetMs}ms`
  ).toBeLessThanOrEqual(budgetMs);
});

// --- Status object assertions ---------------------------------------------

Then('the status code should be {int}', async ({ world }, expected) => {
  const res = requireResponse(world);
  const actual = res.body?.status?.code;
  expect(
    actual,
    `expected status.code ${expected} (${describeStatusCode(expected)}) but got ` +
      `${actual} (${describeStatusCode(actual)}), message: "${res.body?.status?.message}"`
  ).toBe(expected);
});

Then('the status code should be {string}', async ({ world }, name) => {
  const expected = resolveStatusName(name);
  const res = requireResponse(world);
  const actual = res.body?.status?.code;
  expect(
    actual,
    `expected status.code ${expected} (${name}) but got ${actual} ` +
      `(${describeStatusCode(actual)}), message: "${res.body?.status?.message}"`
  ).toBe(expected);
});

Then('the status message should not be empty', async ({ world }) => {
  const res = requireResponse(world);
  expect(String(res.body?.status?.message ?? '').trim().length).toBeGreaterThan(0);
});

Then('the status message should contain {string}', async ({ world }, fragment) => {
  const res = requireResponse(world);
  const message = String(res.body?.status?.message ?? '');
  expect(
    message.toLowerCase(),
    `status.message was "${message}"`
  ).toContain(fragment.toLowerCase());
});

// --- Negative-path request builders ---------------------------------------

When(
  'the client POSTs the following document to {string}:',
  async ({ api, world }, entityUrl, docString) => {
    // The doc string is sent byte-for-byte so a scenario can post malformed
    // JSON, unknown fields, or a document missing required fields.
    world.response = await api.raw(entityUrl, docString);
  }
);

When(
  'the client POSTs an empty document to {string}',
  async ({ api, world }, entityUrl) => {
    world.response = await api.raw(entityUrl, {});
  }
);

// --- Helpers ---------------------------------------------------------------

/** Fails with a clear message instead of a TypeError when no call was made. */
export function requireResponse(world) {
  if (!world.response) {
    throw new Error(
      'No API response recorded. A Then step ran before any When step issued a request.'
    );
  }
  return world.response;
}

/** Maps the human names used in feature files onto spec status codes. */
export function resolveStatusName(name) {
  const key = String(name).trim().toUpperCase().replace(/[\s-]+/g, '_');
  if (key in STATUS_CODE) return STATUS_CODE[key];
  throw new Error(
    `Unknown status code name "${name}". Known names: ${Object.keys(STATUS_CODE).join(', ')}`
  );
}
