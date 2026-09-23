/**
 * Entity URLs from the Velocity JSON API Specification 1.4.
 *
 * Every one of these is HTTPS POST with Content-Type: application/json, and is
 * appended to the base URL from Config/env.js.
 */
export const ENDPOINTS = {
  /** 1.3 - acquire a session token. */
  LOGON: '/logon',
  /** 1.4 - invalidate the server-side token. */
  LOGOUT: '/logout',
  /** 1.5 - price and inventory availability for a symbol. */
  QUOTE: '/quote',
  /** 1.6 - limit-locate-order at a client-specified price. */
  LIMIT: '/limit',
  /** 1.8 - overnight-locate-order (no orderPx; response orderType is "5"). */
  OVERNIGHT: '/overnight',
  /** 1.9 - locate-order restatement; same response shape as /limit. */
  LOCATE: '/locate',
  /** 1.10 - quote list snapshot of everything currently in inventory. */
  SNAPSHOT: '/snapshot',
};

/**
 * Token lifetime, spec 1.3: "Tokens expire after 2 hours of inactivity or at
 * 8:10 PM ET, whichever comes first." Referenced by the session fixture so a
 * long run re-logs on instead of failing every scenario with 401.
 */
export const TOKEN_IDLE_LIFETIME_MS = 2 * 60 * 60 * 1000;
