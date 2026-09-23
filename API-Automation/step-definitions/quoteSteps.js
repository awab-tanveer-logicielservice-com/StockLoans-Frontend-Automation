/**
 * Steps for spec 1.5 Quote Request and 1.10 Quote List Snapshot.
 */
import { createBdd } from 'playwright-bdd';
import { test, expect } from './fixtures.js';
import { requireResponse } from './commonApiSteps.js';
import { QUOTE_RESPONSE, SNAPSHOT_RESPONSE, SNAPSHOT_ENTRY } from '../schemas/responseSchemas.js';
import { assertShape, checkShape } from '../utils/validate.js';
import { SYMBOLS, QUANTITIES } from '../testdata/apiTestData.js';
import { newQuoteReqId } from '../utils/ids.js';
import { extractSnapshotEntries, snapshotPrice } from '../utils/snapshot.js';

const { When, Then } = createBdd(test);

// --- 1.5 Quote Request -----------------------------------------------------

When(
  'the client requests a quote for the test symbol',
  async ({ authedApi, party, world }) => {
    const quoteReqId = newQuoteReqId();
    world.ids.quoteReqId = quoteReqId;
    world.stash.symbol = SYMBOLS.liquid;
    world.stash.orderQty = QUANTITIES.standard;
    world.response = await authedApi.quote({
      symbol: SYMBOLS.liquid,
      orderQty: QUANTITIES.standard,
      quoteReqId,
      ...party,
    });
    if (world.response.httpStatus === 200) world.quote = world.response.body;
  }
);

When(
  'the client requests a quote for {string} with quantity {int}',
  async ({ authedApi, party, world }, symbol, orderQty) => {
    const quoteReqId = newQuoteReqId();
    world.ids.quoteReqId = quoteReqId;
    world.stash.symbol = symbol;
    world.stash.orderQty = orderQty;
    world.response = await authedApi.quote({ symbol, orderQty, quoteReqId, ...party });
    if (world.response.httpStatus === 200) world.quote = world.response.body;
  }
);

When(
  'the client requests a quote for {string} without a quantity',
  async ({ authedApi, party, world }, symbol) => {
    // orderQty is optional in spec 1.5 - omitting it asks "what is available".
    const quoteReqId = newQuoteReqId();
    world.ids.quoteReqId = quoteReqId;
    world.stash.symbol = symbol;
    world.stash.orderQty = undefined;
    world.response = await authedApi.quote({ symbol, quoteReqId, ...party });
    if (world.response.httpStatus === 200) world.quote = world.response.body;
  }
);

When(
  'the client requests a quote for the unknown symbol',
  async ({ authedApi, party, world }) => {
    world.stash.symbol = SYMBOLS.unknown;
    world.response = await authedApi.quote({
      symbol: SYMBOLS.unknown,
      orderQty: QUANTITIES.standard,
      ...party,
    });
  }
);

When(
  'the client requests {int} quotes for the test symbol',
  async ({ authedApi, party, world }, count) => {
    // Spec 1.2: "repeat as many times as necessary". This proves repeat quoting
    // is allowed and that each one gets its own server-assigned id.
    const responses = [];
    for (let i = 0; i < count; i += 1) {
      responses.push(
        await authedApi.quote({
          symbol: SYMBOLS.liquid,
          orderQty: QUANTITIES.standard,
          quoteReqId: newQuoteReqId(),
          ...party,
        })
      );
    }
    world.stash.quoteBatch = responses;
    world.response = responses[responses.length - 1];
    world.quote = world.response.body;
  }
);

Then('the response should match the quote schema', async ({ world }) => {
  const res = requireResponse(world);
  assertShape(res.body, QUOTE_RESPONSE, 'quote response');
});

Then('the quote should echo back the requested symbol', async ({ world }) => {
  const res = requireResponse(world);
  expect(String(res.body?.data?.symbol).toUpperCase()).toBe(
    String(world.stash.symbol).toUpperCase()
  );
});

Then('the quote should echo back the requested quoteReqId', async ({ world }) => {
  const res = requireResponse(world);
  expect(res.body?.data?.quoteReqId).toBe(world.ids.quoteReqId);
});

Then('the quote should echo back the requesting mpid and trader', async ({ party, world }) => {
  const res = requireResponse(world);
  expect(res.body?.data?.mpid).toBe(party.mpid);
  expect(res.body?.data?.trader).toBe(party.trader);
});

Then('the quote should carry a server-assigned id', async ({ world }) => {
  const res = requireResponse(world);
  const id = res.body?.data?.id;
  expect(typeof id, 'data.id should be a number per spec 1.5').toBe('number');
  expect(id, 'a server-assigned quote id should be non-zero').toBeGreaterThan(0);
});

Then('the quote should offer a positive price', async ({ world }) => {
  const res = requireResponse(world);
  const offerPx = Number(res.body?.data?.offerPx);
  expect(offerPx, `offerPx was ${offerPx}`).toBeGreaterThan(0);
});

Then('the quote should report available inventory', async ({ world }) => {
  const res = requireResponse(world);
  const offerSize = Number(res.body?.data?.offerSize);
  expect(offerSize, `offerSize was ${offerSize}`).toBeGreaterThan(0);
});

Then(
  'the quote offerSize should not exceed the requested quantity',
  async ({ world }) => {
    const res = requireResponse(world);
    const offerSize = Number(res.body?.data?.offerSize);
    expect(offerSize).toBeLessThanOrEqual(Number(world.stash.orderQty));
  }
);

Then('every quote in the batch should have a distinct id', async ({ world }) => {
  const batch = world.stash.quoteBatch || [];
  expect(batch.length, 'no quote batch was captured').toBeGreaterThan(1);
  const ids = batch.map((r) => r.body?.data?.id);
  expect(
    new Set(ids).size,
    `server-assigned quote ids repeated across a batch: ${JSON.stringify(ids)}`
  ).toBe(ids.length);
});

Then('the quoted price should be remembered for the locate request', async ({ world }) => {
  const res = requireResponse(world);
  world.stash.quotedPx = Number(res.body?.data?.offerPx);
  world.stash.quotedSize = Number(res.body?.data?.offerSize);
  expect(world.stash.quotedPx).toBeGreaterThan(0);
});

// --- 1.10 Quote List Snapshot ---------------------------------------------

When('the client requests a quote list snapshot', async ({ authedApi, party, world }) => {
  const quoteReqId = newQuoteReqId();
  world.ids.quoteReqId = quoteReqId;
  world.response = await authedApi.snapshot({ mpid: party.mpid, quoteReqId });
  if (world.response.httpStatus === 200) world.snapshot = world.response.body;
});

Then('the response should match the snapshot schema', async ({ world }) => {
  const res = requireResponse(world);
  assertShape(res.body, SNAPSHOT_RESPONSE, 'snapshot response');
});

Then('the snapshot should echo back the symbol {string}', async ({ world }, expected) => {
  const res = requireResponse(world);
  expect(res.body?.data?.symbol).toBe(expected);
});

Then('the snapshot should contain a price list', async ({ world }) => {
  const res = requireResponse(world);
  const { entries, shape, key } = extractSnapshotEntries(res.body);
  // The spec's printed sample is not literal JSON (see utils/snapshot.js), so
  // failing here means the response matched none of the readings - report what
  // arrived rather than asserting on a guessed key.
  expect(
    shape,
    `could not find a quote list in the snapshot response. data was:\n` +
      JSON.stringify(res.body?.data, null, 2)
  ).not.toBe('unrecognised');
  world.stash.snapshotShape = shape;
  world.stash.snapshotKey = key;
  world.stash.snapshotEntries = entries;
});

Then('every snapshot entry should have a symbol and a price', async ({ world }) => {
  const entries = world.stash.snapshotEntries || [];
  const problems = [];
  entries.forEach((entry, i) => {
    checkShape(entry, SNAPSHOT_ENTRY, `entry[${i}]`).forEach((p) => problems.push(p));
    if (Number(entry.offerPx) <= 0) problems.push(`entry[${i}].offerPx is ${entry.offerPx}`);
  });
  expect(problems, `snapshot entries are malformed:\n${problems.join('\n')}`).toEqual([]);
});

Then('the snapshot should include the test symbol', async ({ world }) => {
  const res = requireResponse(world);
  const price = snapshotPrice(res.body, SYMBOLS.liquid);
  expect(
    price,
    `${SYMBOLS.liquid} is not in the snapshot. Spec 1.10: a symbol absent from ` +
      `inventory simply does not appear, so either inventory is genuinely empty ` +
      `for it or VELOCITY_TEST_SYMBOL needs changing for this environment.`
  ).not.toBeNull();
  world.stash.snapshotPx = price;
});
