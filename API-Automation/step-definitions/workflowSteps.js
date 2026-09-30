/**
 * The spec 1.2 workflow, end to end on ONE session.
 *
 * Why these exist separately: the endpoint steps split across two fixtures on
 * purpose - session steps drive the unauthenticated `api` client, business
 * steps drive `authedApi`, which carries a token acquired once per worker.
 * That split is what keeps the suite fast, but it means a scenario written by
 * gluing "logs on" to "requests a quote" would silently use two different
 * tokens and prove nothing about the session it just created.
 *
 * These steps all drive `api` and the token it acquired itself, so the
 * workflow scenario really is logon -> quote -> locate -> restate -> logout on
 * a single session.
 */
import { createBdd } from 'playwright-bdd';
import { test, expect } from './fixtures.js';
import { requireResponse } from './commonApiSteps.js';
import { ORDER_RESPONSE, QUOTE_RESPONSE } from '../schemas/responseSchemas.js';
import { assertShape } from '../utils/validate.js';
import { interpretOrderStatus, describeOrdStatus } from '../schemas/statusCodes.js';
import { SYMBOLS, QUANTITIES, apiCredentials } from '../testdata/apiTestData.js';
import { newCliOrdId, newQuoteReqId } from '../utils/ids.js';

const { Given, When, Then } = createBdd(test);

Given('a session established by this scenario', async ({ api, world }) => {
  const res = await api.logon(apiCredentials());
  world.response = res;
  expect(
    api.token,
    `logon failed, so the workflow cannot continue. HTTP ${res.httpStatus}: ${res.text}`
  ).toBeTruthy();
  world.stash.workflowToken = api.token;
});

When('the same session requests a quote for the test symbol', async ({ api, party, world }) => {
  const quoteReqId = newQuoteReqId();
  world.ids.quoteReqId = quoteReqId;
  world.stash.symbol = SYMBOLS.liquid;
  world.stash.orderQty = QUANTITIES.standard;
  world.response = await api.quote({
    symbol: SYMBOLS.liquid,
    orderQty: QUANTITIES.standard,
    quoteReqId,
    ...party,
  });
  if (world.response.httpStatus === 200) {
    world.quote = world.response.body;
    assertShape(world.quote, QUOTE_RESPONSE, 'quote response');
    world.stash.quotedPx = Number(world.quote?.data?.offerPx);
  }
});

When('the same session locates at the quoted price', async ({ api, party, world }) => {
  const orderPx = world.stash.quotedPx;
  expect(orderPx, 'the quote step did not produce a price').toBeGreaterThan(0);

  const cliOrdId = newCliOrdId();
  world.ids.cliOrdId = cliOrdId;
  world.stash.orderPx = orderPx;

  world.response = await api.limit({
    symbol: SYMBOLS.liquid,
    orderQty: QUANTITIES.standard,
    orderPx,
    cliOrdId,
    ...party,
  });
  if (world.response.httpStatus === 200) {
    world.order = world.response.body;
    assertShape(world.order, ORDER_RESPONSE, 'limit order response');
  }
});

When('the same session restates that order', async ({ api, world }) => {
  const cliOrdId = world.ids.cliOrdId;
  expect(cliOrdId, 'no order was placed earlier in this scenario').toBeTruthy();
  world.response = await api.locate({ cliOrdId });
  if (world.response.httpStatus === 200) world.stash.restatement = world.response.body;
});

When('the same session logs out', async ({ api, world }) => {
  world.stash.loggedOutToken = api.token;
  world.response = await api.logout({}, { store: false });
  api.token = world.stash.loggedOutToken;
});

Then('the whole workflow should have succeeded', async ({ world }) => {
  const order = world.order?.data;
  const status = world.order?.status;
  expect(order, 'no order was produced by the workflow').toBeTruthy();

  const verdict = interpretOrderStatus(status?.code, order?.orderStatus);
  expect(
    verdict.ok,
    `the locate did not succeed: ${verdict.meaning} (status.code ${status?.code}, ` +
      `orderStatus ${order?.orderStatus} - ${describeOrdStatus(order?.orderStatus)})`
  ).toBe(true);

  const restated = world.stash.restatement?.data;
  expect(restated, 'no restatement was produced by the workflow').toBeTruthy();
  expect(restated.cliOrdId).toBe(order.cliOrdId);
  expect(restated.locateId).toBe(order.locateId);

  const res = requireResponse(world);
  expect(res.httpStatus, 'the final logout did not return 200').toBe(200);
});
