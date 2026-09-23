/**
 * Response shapes transcribed from the Velocity JSON API Specification 1.4.
 *
 * These describe the envelope only - field presence and primitive type. Business
 * rules (echo-back of the request, status code meaning, fill quantities) are
 * asserted in the step definitions, where they read as requirements.
 *
 * See utils/validate.js for the schema notation ('number?' marks optional).
 */

/** Shared by every response, spec 1.9 "Status Object". */
export const STATUS_SCHEMA = {
  code: 'number',
  message: 'string',
};

/** 1.3 Logon. */
export const LOGON_RESPONSE = {
  user: 'string',
  token: 'string',
  transactTime: 'string',
  status: STATUS_SCHEMA,
};

/** 1.4 Logout. Same as logon minus the token. */
export const LOGOUT_RESPONSE = {
  user: 'string',
  transactTime: 'string',
  status: STATUS_SCHEMA,
};

/** 1.5 Quote Request. `id` is the server-assigned quote id. */
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
 * 1.6 Limit-Locate-Order.
 *
 * 1.8 Overnight-Locate-Order and 1.9 Locate-Order Restatement return this same
 * shape - the spec says so explicitly for both - so all three reuse it. The
 * overnight-specific rule (orderType === "5") is asserted separately.
 *
 * Spec note on locateId: the type was unified to string across requests and
 * responses in 1.4 after previously being mixed string/number. If a server
 * returns it as a number the shape check will fail loudly here, which is the
 * intended signal - confirm the intended type rather than loosening this.
 */
export const ORDER_RESPONSE = {
  data: {
    cliOrdId: 'string',
    locateId: 'string',
    mpid: 'string',
    trader: 'string',
    symbol: 'string',
    orderQty: 'number',
    orderPx: 'number',
    execQty: 'number',
    execPx: 'number',
    transactTime: 'string',
    orderStatus: 'number',
    orderType: 'string',
  },
  status: STATUS_SCHEMA,
};

/**
 * 1.10 Quote List Snapshot.
 *
 * The spec's printed sample shows an unnamed `{ symbol, offerPx }` object
 * nested inside `data` with no key, which cannot be literal JSON. The two
 * plausible readings are a named array of quotes, or the quotes inlined
 * alongside the header fields. Only the header fields are asserted here; the
 * quote list itself is located at runtime by utils/snapshot.js, which accepts
 * either reading and reports which one the server actually uses.
 */
export const SNAPSHOT_RESPONSE = {
  data: {
    quoteReqId: 'string',
    mpid: 'string',
    transactTime: 'string',
    symbol: 'string',
  },
  status: STATUS_SCHEMA,
};

/** One entry in the snapshot price list. */
export const SNAPSHOT_ENTRY = {
  symbol: 'string',
  offerPx: 'number',
};
