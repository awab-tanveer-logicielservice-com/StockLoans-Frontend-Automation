/**
 * Steps for the order endpoints, which share one response shape:
 *   5  /limit     - limit-locate-order
 *   7  /overnight - overnight-locate-order
 *   8  /locate    - locate-order restatement
 */
import { createBdd } from 'playwright-bdd';
import { test, expect } from './fixtures.js';
import { requireResponse } from './commonApiSteps.js';
import { ORDER_RESPONSE } from '../schemas/responseSchemas.js';
import { assertShape } from '../utils/validate.js';
import {
  ORD_STATUS,
  describeOrdStatus,
  interpretOrderStatus,
  isFill,
} from '../schemas/statusCodes.js';
import { SYMBOLS, QUANTITIES, PRICES } from '../testdata/apiTestData.js';
import { newCliOrdId, newUnknownId } from '../utils/ids.js';

const { When, Then } = createBdd(test);

// --- 5 Limit-Locate-Order --------------------------------------------------

When(
  'the client submits a limit-locate-order at the quoted price',
  async ({ authedApi, party, world }) => {
    // Section 2 workflow: quote first, then locate using the price it returned.
    const orderPx = world.stash.quotedPx;
    expect(orderPx, 'no quoted price captured - the quote step must run first').toBeGreaterThan(0);

    const cliOrdId = newCliOrdId();
    world.ids.cliOrdId = cliOrdId;
    world.stash.symbol = SYMBOLS.liquid;
    world.stash.orderQty = QUANTITIES.standard;
    world.stash.orderPx = orderPx;

    world.response = await authedApi.limit({
      symbol: SYMBOLS.liquid,
      orderQty: QUANTITIES.standard,
      orderPx,
      cliOrdId,
      ...party,
    });
    if (world.response.httpStatus === 200) world.order = world.response.body;
  }
);

When(
  'the client submits a limit-locate-order for {string} quantity {int} at price {float}',
  async ({ authedApi, party, world }, symbol, orderQty, orderPx) => {
    const cliOrdId = newCliOrdId();
    world.ids.cliOrdId = cliOrdId;
    world.stash.symbol = symbol;
    world.stash.orderQty = orderQty;
    world.stash.orderPx = orderPx;

    world.response = await authedApi.limit({ symbol, orderQty, orderPx, cliOrdId, ...party });
    if (world.response.httpStatus === 200) world.order = world.response.body;
  }
);

When(
  'the client submits a limit-locate-order at the snapshot price',
  async ({ authedApi, party, world }) => {
    // Section 6: use a snapshot price to request a limit-locate-order.
    const orderPx = world.stash.snapshotPx;
    expect(
      orderPx,
      'no snapshot price captured - the snapshot step must run first'
    ).toBeGreaterThan(0);

    const cliOrdId = newCliOrdId();
    world.ids.cliOrdId = cliOrdId;
    world.stash.symbol = SYMBOLS.liquid;
    world.stash.orderQty = QUANTITIES.standard;
    world.stash.orderPx = orderPx;

    world.response = await authedApi.limit({
      symbol: SYMBOLS.liquid,
      orderQty: QUANTITIES.standard,
      orderPx,
      cliOrdId,
      ...party,
    });
    if (world.response.httpStatus === 200) world.order = world.response.body;
  }
);

When(
  'the client submits a limit-locate-order at a price below the market',
  async ({ authedApi, party, world }) => {
    // Drives status code 2, Price Too Low.
    const cliOrdId = newCliOrdId();
    world.ids.cliOrdId = cliOrdId;
    world.stash.symbol = SYMBOLS.liquid;
    world.stash.orderQty = QUANTITIES.standard;
    world.stash.orderPx = PRICES.tooLow;

    world.response = await authedApi.limit({
      symbol: SYMBOLS.liquid,
      orderQty: QUANTITIES.standard,
      orderPx: PRICES.tooLow,
      cliOrdId,
      ...party,
    });
  }
);

// --- 7 Overnight-Locate-Order ---------------------------------------------

When(
  'the client submits an overnight-locate-order for the test symbol',
  async ({ authedApi, party, world }) => {
    const cliOrdId = newCliOrdId();
    world.ids.cliOrdId = cliOrdId;
    world.stash.symbol = SYMBOLS.liquid;
    world.stash.orderQty = QUANTITIES.standard;

    world.response = await authedApi.overnight({
      symbol: SYMBOLS.liquid,
      orderQty: QUANTITIES.standard,
      cliOrdId,
      ...party,
    });
    if (world.response.httpStatus === 200) world.order = world.response.body;
  }
);

When(
  'the client submits an overnight-locate-order for {string} quantity {int}',
  async ({ authedApi, party, world }, symbol, orderQty) => {
    const cliOrdId = newCliOrdId();
    world.ids.cliOrdId = cliOrdId;
    world.stash.symbol = symbol;
    world.stash.orderQty = orderQty;

    world.response = await authedApi.overnight({ symbol, orderQty, cliOrdId, ...party });
    if (world.response.httpStatus === 200) world.order = world.response.body;
  }
);

// --- 8 Locate-Order Restatement -------------------------------------------

When(
  'the client requests a restatement using the cliOrdId',
  async ({ authedApi, world }) => {
    const cliOrdId = world.ids.cliOrdId;
    const locateId = world.order?.data?.locateId;
    expect(cliOrdId, 'no cliOrdId captured - an order step must run first').toBeTruthy();
    expect(locateId, 'no locateId captured - an order step must run first').toBeTruthy();
    world.response = await authedApi.locate({ cliOrdId, locateId });
    if (world.response.httpStatus === 200) world.stash.restatement = world.response.body;
  }
);

When(
  'the client requests a restatement using the locateId',
  async ({ authedApi, world }) => {
    const locateId = world.order?.data?.locateId;
    expect(locateId, 'no locateId captured - an order step must run first').toBeTruthy();
    const cliOrdId = world.order?.data?.cliOrdId;
    expect(cliOrdId, 'no cliOrdId captured - an order step must run first').toBeTruthy();
    world.response = await authedApi.locate({ cliOrdId, locateId });
    if (world.response.httpStatus === 200) world.stash.restatement = world.response.body;
  }
);

When(
  'the client requests a restatement for an order that does not exist',
  async ({ authedApi, world }) => {
    world.response = await authedApi.locate({
      cliOrdId: newUnknownId(),
      locateId: Number.MAX_SAFE_INTEGER,
    });
  }
);

Then('the restatement should match the original order', async ({ world }) => {
  const restated = world.stash.restatement?.data;
  const original = world.order?.data;
  expect(restated, 'no restatement captured').toBeTruthy();
  expect(original, 'no original order captured').toBeTruthy();

  // The restatement is a re-read of the same order, so the identity and terms
  // must be identical. execQty/execPx/orderStatus are deliberately excluded:
  // they are allowed to move as the order fills, and transactTime is the time
  // of the restatement, not of the original order.
  for (const field of ['cliOrdId', 'locateId', 'mpid', 'trader', 'symbol', 'orderQty']) {
    expect(
      restated[field],
      `restatement ${field} drifted from the original order`
    ).toEqual(original[field]);
  }
});

// --- Shared order response assertions --------------------------------------

Then('the response should match the order schema', async ({ world }) => {
  const res = requireResponse(world);
  assertShape(res.body, ORDER_RESPONSE, `${res.entityUrl} order response`);
});

Then('the order should echo back the requested cliOrdId', async ({ world }) => {
  const res = requireResponse(world);
  expect(res.body?.data?.cliOrdId).toBe(world.ids.cliOrdId);
});

Then('the order should carry a locateId', async ({ world }) => {
  const res = requireResponse(world);
  const locateId = res.body?.data?.locateId;
  expect(Number.isFinite(locateId), 'locateId should be numeric per spec section 5').toBe(true);
  world.ids.locateId = locateId;
});

Then('the order should echo back the requested symbol and quantity', async ({ world }) => {
  const res = requireResponse(world);
  expect(String(res.body?.data?.symbol).toUpperCase()).toBe(
    String(world.stash.symbol).toUpperCase()
  );
  expect(Number(res.body?.data?.orderQty)).toBe(Number(world.stash.orderQty));
});

Then('the order status should be {string}', async ({ world }, name) => {
  const expected = resolveOrdStatusName(name);
  const res = requireResponse(world);
  const actual = res.body?.data?.orderStatus;
  expect(
    actual,
    `expected OrdStatus ${expected} (${describeOrdStatus(expected)}) but got ` +
      `${actual} (${describeOrdStatus(actual)})`
  ).toBe(expected);
});

Then('the order status should be a fill', async ({ world }) => {
  const res = requireResponse(world);
  const actual = res.body?.data?.orderStatus;
  expect(
    isFill(actual),
    `expected Partially Filled (1) or Filled (2), got ${actual} (${describeOrdStatus(actual)}) ` +
      `with status ${JSON.stringify(res.body?.status)}`
  ).toBe(true);
});

Then('the order response should indicate no error', async ({ world }) => {
  // Specification 1.5 makes orderStatus authoritative; fills use code 0 and
  // booked overnights use code -1.
  const res = requireResponse(world);
  const { code } = res.body?.status || {};
  const orderStatus = res.body?.data?.orderStatus;
  const verdict = interpretOrderStatus(code, orderStatus);
  expect(
    verdict.ok,
    `order response is not a success: ${verdict.meaning} ` +
      `(status.code ${code}, orderStatus ${orderStatus} - ${describeOrdStatus(orderStatus)})`
  ).toBe(true);
});

Then('the overnight order should be booked', async ({ world }) => {
  const res = requireResponse(world);
  expect(Number(res.body?.data?.orderStatus)).toBe(ORD_STATUS.FILLED);
  expect(Number(res.body?.status?.code)).toBe(-1);
});

Then('the order response should indicate No Inventory', async ({ world }) => {
  const res = requireResponse(world);
  const { code } = res.body?.status || {};
  const orderStatus = res.body?.data?.orderStatus;
  expect(Number(code), 'No Inventory is signalled by status.code 0').toBe(0);
  expect(
    isFill(orderStatus),
    `No Inventory requires an unfilled order, but orderStatus was ` +
      `${orderStatus} (${describeOrdStatus(orderStatus)})`
  ).toBe(false);
});

Then('the executed quantity should not exceed the ordered quantity', async ({ world }) => {
  const res = requireResponse(world);
  const execQty = Number(res.body?.data?.execQty);
  const orderQty = Number(res.body?.data?.orderQty);
  expect(execQty, `execQty ${execQty} exceeds orderQty ${orderQty}`).toBeLessThanOrEqual(orderQty);
});

Then('the executed quantity should equal the ordered quantity', async ({ world }) => {
  const res = requireResponse(world);
  expect(Number(res.body?.data?.execQty)).toBe(Number(res.body?.data?.orderQty));
});

Then('the executed price should not exceed the limit price', async ({ world }) => {
  // Section 5: a limit order fills at the current rate, never above the limit.
  const res = requireResponse(world);
  const execPx = Number(res.body?.data?.execPx);
  const orderPx = Number(world.stash.orderPx);
  expect(
    execPx,
    `execPx ${execPx} is above the limit price ${orderPx}, which breaks the ` +
      'price guarantee in spec section 5'
  ).toBeLessThanOrEqual(orderPx);
});

Then('the overnight response should have a null cliOrdId', async ({ world }) => {
  const res = requireResponse(world);
  expect(
    res.body?.data?.cliOrdId,
    'spec section 7: overnight responses do not return cliOrdId'
  ).toBeNull();
  expect(
    Object.prototype.hasOwnProperty.call(res.body?.data || {}, 'orderType'),
    'Specification 1.5 removes orderType from order responses'
  ).toBe(false);
});

/** Maps the human names used in feature files onto section 10 OrdStatus values. */
function resolveOrdStatusName(name) {
  const key = String(name).trim().toUpperCase().replace(/[\s-]+/g, '_');
  if (key in ORD_STATUS) return ORD_STATUS[key];
  throw new Error(
    `Unknown OrdStatus name "${name}". Known names: ${Object.keys(ORD_STATUS).join(', ')}`
  );
}
