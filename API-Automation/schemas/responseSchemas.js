/**
 * Response shapes transcribed from the Velocity JSON API Specification 1.5.
 *
 * These describe the envelope only - field presence and primitive type. Business
 * rules (echo-back of the request, status code meaning, fill quantities) are
 * asserted in the step definitions, where they read as requirements.
 *
 * See utils/validate.js for the schema notation ('number?' marks optional).
 */

/** Shared by every response, spec section 10 "Status Object". */
export const STATUS_SCHEMA = {
  code: 'number',
  message: 'string',
};

/** Section 3 Logon. */
export const LOGON_RESPONSE = {
  user: 'string',
  token: 'string',
  time: 'string',
  status: STATUS_SCHEMA,
};

/** Section 3 Logout. The response omits both token and time. */
export const LOGOUT_RESPONSE = {
  user: 'string',
  status: STATUS_SCHEMA,
};

/** Section 4 Quote Request. Quotes are not individually retrievable; id is always -1. */
export const QUOTE_RESPONSE = {
  data: {
    id: 'number',
    quoteReqId: 'string',
    mpid: 'string',
    trader: 'string',
    symbol: 'string',
    orderQty: 'number',
    offerSize: 'number',
    offerPx: 'number',
    transactTime: 'string',
  },
  status: STATUS_SCHEMA,
};

/**
 * Section 5 Limit-Locate-Order.
 *
 * Sections 7 Overnight-Locate-Order and 8 Locate-Order Restatement return this same
 * shape - the spec says so explicitly for both - so all three reuse it. The
 * Overnight responses may return a null cliOrdId. Every order, including a
 * rejected order, has a numeric locateId. The response's tif is numeric.
 */
export const ORDER_RESPONSE = {
  data: {
    cliOrdId: 'string?',
    locateId: 'number',
    mpid: 'string',
    trader: 'string',
    symbol: 'string',
    orderQty: 'number',
    orderPx: 'number',
    execQty: 'number',
    execPx: 'number',
    transactTime: 'string',
    orderStatus: 'number',
    tif: 'number',
  },
  status: STATUS_SCHEMA,
};

/**
 * Section 6 Quote List Snapshot.
 *
 * Confirmed 2026-10-14 against the full spec PDF: `data.items` is a named
 * array of `{ symbol, offerPx }` entries. An earlier partial read of the
 * printed sample made this look like unnamed/ambiguous JSON - it is not; the
 * document prints valid JSON with `items` as the key. Per-entry shape is
 * still checked separately via SNAPSHOT_ENTRY (items can be large, and a
 * malformed entry should be reported by index, not fail the whole shape
 * check at once).
 */
export const SNAPSHOT_RESPONSE = {
  data: {
    quoteReqId: 'string',
    mpid: 'string',
    transactTime: 'string',
    symbol: 'string',
    items: 'array',
  },
  status: STATUS_SCHEMA,
};

/** One entry in the snapshot price list. */
export const SNAPSHOT_ENTRY = {
  symbol: 'string',
  offerPx: 'number',
};

/** Early authentication failures use this capitalized HTTP 401 envelope. */
export const AUTH_ERROR_RESPONSE = {
  Status: 'number',
  message: 'string',
};
