/**
 * Entity URLs from the Velocity JSON API Specification 1.5.
 *
 * Every one of these is HTTPS POST with Content-Type: application/json, and is
 * appended to the base URL from Config/env.js.
 */
export const ENDPOINTS = {
  /** 3 - acquire a session token. */
  LOGON: '/logon',
  /** 3 - invalidate the server-side token. */
  LOGOUT: '/logout',
  /** 4 - price and inventory availability for a symbol. */
  QUOTE: '/quote',
  /** 5 - limit-locate-order at a client-specified price. */
  LIMIT: '/limit',
  /** 7 - overnight-locate-order (no client-supplied orderPx). */
  OVERNIGHT: '/overnight',
  /** 8 - locate-order restatement; same response shape as /limit. */
  LOCATE: '/locate',
  /** 6 - quote list snapshot of everything currently in inventory. */
  SNAPSHOT: '/snapshot',
};
