/**
 * Every enumerated value in the Velocity JSON API Specification 1.4, in one
 * place. Steps and assertions refer to these by name so a spec revision is a
 * one-file change.
 */

/** 1.11 - HTTP Response Codes. */
export const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  SERVER_ERROR: 500,
};

export const HTTP_STATUS_MEANING = {
  200: 'OK - the request has succeeded',
  400: 'Bad Request - malformed syntax or missing fields',
  401: 'Unauthorized - the request requires user authentication',
  500: 'Internal Server Error',
};

/**
 * 1.11 - application-level Status Codes carried in status.code. These are NOT
 * the HTTP codes: a request can be HTTP 200 and still carry a rejection here.
 */
export const STATUS_CODE = {
  NO_INVENTORY: 0,
  UNKNOWN_SYMBOL: 1,
  PRICE_TOO_LOW: 2,
  UNKNOWN_TIF: 80,
  QTY_NOT_ALLOWED: 93,
  BLOCK: 94,
  CLIENT_BLOCK: 95,
  LOCKED: 96,
  UNKNOWN_CONFIGURATION: 97,
  QTY_TOO_LOW: 98,
  OTHER: 99,
};

export const STATUS_CODE_MEANING = {
  0: 'No Inventory',
  1: 'Unknown Symbol',
  2: 'Price Too Low',
  // Not in the spec's Status Code list. Observed on 2026-09-21 from the dev
  // host: POST /logon with an empty document returned HTTP 500 with
  // {"status":{"code":3,"message":"Internal Processing Error"}}. Mapped only so
  // failure messages are readable - it is not a code a client can rely on.
  3: 'Internal Processing Error (undocumented - observed on dev, not in spec 1.11)',
  // Spec note: JSON requests have no time-in-force field, so this should not
  // be reachable over JSON. Kept because the spec still lists it.
  80: 'Unknown TIF',
  93: 'Qty Not Allowed',
  94: 'Block',
  95: 'Client Block',
  96: 'Locked',
  97: 'Unknown Configuration',
  98: 'Qty Too Low',
  99: 'Other',
};

/** 1.7 - OrdStatus, carried in data.orderStatus on order responses. */
export const ORD_STATUS = {
  OPEN: 0,
  PARTIALLY_FILLED: 1,
  FILLED: 2,
  CANCELED: 4,
  // Spec: "A Locate Order does not currently require user acceptance, so you
  // should not see this status."
  PENDING: 5,
  REJECTED: 8,
};

export const ORD_STATUS_MEANING = {
  0: 'Open - the order is unfilled',
  1: 'Partially Filled',
  2: 'Filled',
  4: 'Canceled - canceled by the system, e.g. Fill-or-Kill with no inventory',
  5: 'Pending',
  8: 'Rejected - the system rejected the order',
};

/** 1.8 - overnight-locate-orders come back with this orderType. */
export const ORDER_TYPE_OVERNIGHT = '5';

/** Statuses that mean shares were actually allocated. */
export const FILL_STATUSES = [ORD_STATUS.PARTIALLY_FILLED, ORD_STATUS.FILLED];

export function isFill(orderStatus) {
  return FILL_STATUSES.includes(Number(orderStatus));
}

/**
 * Resolves the spec 1.9 ambiguity on status.code 0 for order responses
 * (/limit, /overnight, /locate).
 *
 * Quoting the spec: "interpret code 0 together with orderStatus. If orderStatus
 * is a fill (1 = Partially Filled or 2 = Filled), code 0 means 'no error'. If
 * the order is not filled, code 0 means 'No Inventory'."
 *
 * Assertions must never read a bare code 0 as success on an order response -
 * always route it through here.
 *
 * @returns {{ ok: boolean, meaning: string }}
 */
export function interpretOrderStatus(code, orderStatus) {
  const c = Number(code);
  const os = Number(orderStatus);
  if (c === STATUS_CODE.NO_INVENTORY) {
    return isFill(os)
      ? { ok: true, meaning: 'No error (code 0 with a fill)' }
      : { ok: false, meaning: 'No Inventory (code 0 without a fill)' };
  }
  return {
    ok: false,
    meaning: STATUS_CODE_MEANING[c] || `Unmapped status code ${c}`,
  };
}

/**
 * Non-order responses (/logon, /logout, /quote, /snapshot) have no orderStatus
 * to disambiguate against, so code 0 is read at face value as "no error".
 */
export function isSessionOrQuoteSuccess(code) {
  return Number(code) === STATUS_CODE.NO_INVENTORY;
}

export function describeStatusCode(code) {
  return STATUS_CODE_MEANING[Number(code)] || `Unmapped status code ${code}`;
}

export function describeOrdStatus(orderStatus) {
  return ORD_STATUS_MEANING[Number(orderStatus)] || `Unmapped OrdStatus ${orderStatus}`;
}
