/**
 * Every enumerated value in the Velocity JSON API Specification 1.5, in one
 * place. Steps and assertions refer to these by name so a spec revision is a
 * one-file change.
 */

/** Section 11 - HTTP Response Codes. */
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
 * Section 10 - application-level Status Codes carried in status.code. These are NOT
 * the HTTP codes: a request can be HTTP 200 and still carry a rejection here.
 */
export const STATUS_CODE = {
  NO_INVENTORY: 0,
  PRICE_TOO_LOW: 2,
  INTERNAL_PROCESSING_ERROR: 3,
  LOCATE_NOT_FOUND: 5,
  OVERNIGHT_BOOKED: -1,
  RISK_LIMIT: 92,
  QTY_NOT_ALLOWED: 93,
  SYMBOL_BLOCKED: 94,
  EMBARGO: 95,
  NO_PRIOR_LOCATE: 96,
  UNKNOWN_ACCOUNT: 97,
  QTY_TOO_LOW: 98,
  OTHER: 99,
};

export const STATUS_CODE_MEANING = {
  0: 'No Inventory',
  2: 'Price Too Low',
  3: 'Internal Processing Error',
  5: 'Locate Not Found',
  [-1]: 'Booked Overnight',
  92: 'Risk Limits',
  93: 'Qty Not Allowed',
  94: 'Symbol Blocked',
  95: 'Embargo',
  96: 'No Prior Locate to Overnight',
  97: 'Unknown Account',
  98: 'Qty Too Low',
  99: 'Other',
};

/** Section 10 - OrdStatus, carried in data.orderStatus on order responses. */
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
  4: 'Canceled - not expected for this locate API',
  5: 'Pending - not expected for this locate API',
  8: 'Rejected - the system rejected the order',
};

/** Statuses that mean shares were actually allocated. */
export const FILL_STATUSES = [ORD_STATUS.PARTIALLY_FILLED, ORD_STATUS.FILLED];

export function isFill(orderStatus) {
  return FILL_STATUSES.includes(Number(orderStatus));
}

/**
 * The orderStatus is authoritative. Code -1 is the successful overnight
 * booking code; code 0 on an unfilled order means no inventory.
 *
 * @returns {{ ok: boolean, meaning: string }}
 */
export function interpretOrderStatus(code, orderStatus) {
  const c = Number(code);
  const os = Number(orderStatus);
  if (os === ORD_STATUS.FILLED && c === STATUS_CODE.OVERNIGHT_BOOKED) {
    return { ok: true, meaning: 'Overnight order booked' };
  }
  if (isFill(os) && c === STATUS_CODE.NO_INVENTORY) {
    return { ok: true, meaning: 'Order filled (code 0)' };
  }
  if (c === STATUS_CODE.NO_PRIOR_LOCATE && os === ORD_STATUS.REJECTED) {
    return { ok: false, meaning: STATUS_CODE_MEANING[c] };
  }
  if (c === STATUS_CODE.NO_INVENTORY) {
    return { ok: false, meaning: 'No Inventory (code 0 without a fill)' };
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
