/**
 * Ordered end-to-end API flow on one session:
 * logon, quote, snapshot, limit, restatement, overnight, logout.
 */
import { createBdd } from 'playwright-bdd';
import { test, expect } from './fixtures.js';
import {
  LOGON_RESPONSE,
  LOGOUT_RESPONSE,
  ORDER_RESPONSE,
  QUOTE_RESPONSE,
  SNAPSHOT_ENTRY,
  SNAPSHOT_RESPONSE,
} from '../schemas/responseSchemas.js';
import { checkShape } from '../utils/validate.js';
import {
  interpretOrderStatus,
  describeOrdStatus,
} from '../schemas/statusCodes.js';
import { SYMBOLS, QUANTITIES, PRICES, apiCredentials } from '../testdata/apiTestData.js';
import { newCliOrdId, newQuoteReqId } from '../utils/ids.js';
import { extractSnapshotEntries } from '../utils/snapshot.js';

const { Given, When, Then } = createBdd(test);

function recordResponse(world, name, response, schema) {
  const problems = world.stash.workflowProblems;
  world.stash.workflowResponses[name] = response;

  if (response.httpStatus !== 200) {
    problems.push(`${name}: expected HTTP 200, got ${response.httpStatus} (${response.text})`);
  }
  problems.push(...checkShape(response.body, schema).map((problem) => `${name}: ${problem}`));
}

Given('a session established by this scenario', async ({ api, world }) => {
  world.stash.workflowProblems = [];
  world.stash.workflowResponses = {};
  const response = await api.logon(apiCredentials());
  recordResponse(world, 'logon', response, LOGON_RESPONSE);
  if (response.httpStatus !== 200 || !api.token) {
    throw new Error(
      `Logon failed, so the ordered workflow cannot continue. ` +
        `HTTP ${response.httpStatus}: ${response.text}`
    );
  }
  world.stash.workflowToken = api.token;
});

When('the same session requests a quote for the test symbol', async ({ api, party, world }) => {
  const quoteReqId = newQuoteReqId();
  world.ids.quoteReqId = quoteReqId;
  world.stash.symbol = SYMBOLS.liquid;
  world.stash.orderQty = QUANTITIES.standard;
  const response = await api.quote({
    symbol: SYMBOLS.liquid,
    orderQty: QUANTITIES.standard,
    quoteReqId,
    ...party,
  });
  world.quote = response.body;
  world.stash.quotedPx = Number(response.body?.data?.offerPx);
  recordResponse(world, 'quote', response, QUOTE_RESPONSE);
});

When('the same session requests a quote list snapshot', async ({ api, party, world }) => {
  const quoteReqId = newQuoteReqId();
  world.ids.snapshotReqId = quoteReqId;
  const response = await api.snapshot({
    mpid: party.mpid,
    quoteReqId,
  });
  world.snapshot = response.body;
  recordResponse(world, 'snapshot', response, SNAPSHOT_RESPONSE);
  const { entries, shape } = extractSnapshotEntries(response.body);
  world.stash.snapshotEntries = entries;
  if (shape !== 'items') {
    world.stash.workflowProblems.push(`snapshot: expected data.items array, got ${shape}`);
  }
  if (entries.length === 0) {
    world.stash.workflowProblems.push('snapshot: data.items should contain inventory entries');
  }
  entries.forEach((entry, index) => {
    world.stash.workflowProblems.push(
      ...checkShape(entry, SNAPSHOT_ENTRY, `items[${index}]`).map(
        (problem) => `snapshot: ${problem}`
      )
    );
    if (!(Number(entry.offerPx) > 0)) {
      world.stash.workflowProblems.push(
        `snapshot: items[${index}].offerPx should be positive, got ${entry.offerPx}`
      );
    }
  });
});

When('the same session submits a limit order at the quoted price', async ({ api, party, world }) => {
  const quotedPx = world.stash.quotedPx;
  const orderPx = quotedPx > 0 ? quotedPx : PRICES.tooLow;
  if (quotedPx <= 0) {
    world.stash.workflowProblems.push(
      `limit: quote did not provide a positive price; used ${PRICES.tooLow} to continue the ordered run`
    );
  }

  const cliOrdId = newCliOrdId();
  world.ids.cliOrdId = cliOrdId;
  const response = await api.limit({
    symbol: SYMBOLS.liquid,
    orderQty: QUANTITIES.standard,
    orderPx,
    cliOrdId,
    ...party,
  });
  world.order = response.body;
  world.stash.limitOrder = response.body;
  recordResponse(world, 'limit', response, ORDER_RESPONSE);
});

When('the same session restates that order', async ({ api, world }) => {
  const response = await api.locate({
    cliOrdId: world.ids.cliOrdId,
    locateId: world.stash.limitOrder?.data?.locateId,
  });
  world.stash.restatement = response.body;
  recordResponse(world, 'locate', response, ORDER_RESPONSE);
});

When('the same session submits an overnight order for the test symbol', async ({
  api,
  party,
  world,
}) => {
  const cliOrdId = newCliOrdId();
  const response = await api.overnight({
    symbol: SYMBOLS.liquid,
    orderQty: QUANTITIES.standard,
    cliOrdId,
    ...party,
  });
  world.stash.overnightOrder = response.body;
  recordResponse(world, 'overnight', response, ORDER_RESPONSE);
});

When('the same session logs out', async ({ api, world }) => {
  const response = await api.logout({}, { store: false });
  world.stash.workflowResponses.logout = response;
  recordResponse(world, 'logout', response, LOGOUT_RESPONSE);
});

Then('the ordered workflow should have succeeded', async ({ world }) => {
  const problems = world.stash.workflowProblems;
  for (const name of ['logon', 'snapshot', 'logout']) {
    const response = world.stash.workflowResponses[name];
    if (Number(response?.body?.status?.code) !== 0) {
      problems.push(`${name}: expected status.code 0, got ${response?.body?.status?.code}`);
    }
  }
  const quote = world.quote?.data;
  if (!(Number(quote?.offerPx) > 0)) problems.push('quote: offerPx must be positive');
  if (Number(quote?.id) !== -1) problems.push(`quote: expected id -1, got ${quote?.id}`);
  if (quote?.quoteReqId !== world.ids.quoteReqId) {
    problems.push('quote: response did not echo quoteReqId');
  }

  const limitOrder = world.stash.limitOrder?.data;
  const limitVerdict = interpretOrderStatus(
    world.stash.limitOrder?.status?.code,
    limitOrder?.orderStatus
  );
  if (!limitVerdict.ok) {
    problems.push(
      `limit: ${limitVerdict.meaning} (status.code ${world.stash.limitOrder?.status?.code}, ` +
        `orderStatus ${limitOrder?.orderStatus} - ${describeOrdStatus(limitOrder?.orderStatus)})`
    );
  }

  const restatement = world.stash.restatement?.data;
  if (restatement?.cliOrdId !== limitOrder?.cliOrdId) {
    problems.push('locate: restatement did not identify the limit order');
  }
  if (
    limitOrder?.locateId !== undefined &&
    String(restatement?.locateId) !== String(limitOrder.locateId)
  ) {
    problems.push('locate: restatement locateId did not match the limit order');
  }

  const overnight = world.stash.overnightOrder;
  const overnightVerdict = interpretOrderStatus(
    overnight?.status?.code,
    overnight?.data?.orderStatus
  );
  const noPriorLocate =
    Number(overnight?.status?.code) === 96 &&
    Number(overnight?.data?.orderStatus) === 8;
  if (!overnightVerdict.ok && !noPriorLocate) {
    problems.push(
      `overnight: ${overnightVerdict.meaning} (status.code ${overnight?.status?.code}, ` +
        `orderStatus ${overnight?.data?.orderStatus} - ` +
        `${describeOrdStatus(overnight?.data?.orderStatus)})`
    );
  }
  if (overnight?.data?.cliOrdId !== null) {
    problems.push(`overnight: expected cliOrdId null, got ${overnight?.data?.cliOrdId}`);
  }

  expect(problems, `Ordered API workflow issues:\n${problems.join('\n')}`).toEqual([]);
});
