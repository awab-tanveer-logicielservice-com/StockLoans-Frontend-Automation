import { HttpClient } from './HttpClient.js';
import { ENDPOINTS } from '../Config/endpoints.js';
import { API_ENV } from '../Config/env.js';
import { newQuoteReqId, newCliOrdId } from '../utils/ids.js';

/**
 * One method per entity URL in the Velocity JSON API Specification 1.5.
 *
 * Every method returns the raw HttpClient envelope (see HttpClient.ApiResponse)
 * and never throws on an error status - the steps assert on what came back.
 * That is the whole point: a client that threw on 401 could not be used to test
 * that 401 is returned.
 *
 * Request documents are built exactly as the spec prints them, including field
 * order, so a diff against the PDF is easy. Optional fields are omitted rather
 * than sent as null, because the spec marks them optional, not nullable.
 *
 * The client holds no session state beyond `token` - the session lifecycle
 * lives in the fixtures, so a scenario that needs two concurrent sessions can
 * simply create two clients.
 */
export class LocateApiClient {
  /** @param {HttpClient} http */
  constructor(http) {
    this.http = http;
    /** Set by logon(); sent automatically by every authenticated call. */
    this.token = null;
    this.user = null;
  }

  static async create(options = {}) {
    return new LocateApiClient(await HttpClient.create(options));
  }

  get baseURL() {
    return this.http.baseURL;
  }

  get lastCall() {
    return this.http.lastCall;
  }

  // --- 3 Logon -------------------------------------------------------------

  /**
   * Acquires a session token. On success the token is stored on the client and
   * used by every subsequent call, so a scenario rarely passes it by hand.
   *
   * @param {{ user: string, password: string, callbackUrl?: string }} creds
   * @param {{ store?: boolean }} [options] store defaults to true
   */
  async logon({ user, password, callbackUrl }, options = {}) {
    const payload = { user, password };
    // Optional, "reserved for server-pushed messages" (spec section 3).
    if (callbackUrl !== undefined) payload.callbackUrl = callbackUrl;

    const res = await this.http.post(ENDPOINTS.LOGON, payload);

    const token = res.body?.token;
    if (options.store !== false && token) {
      this.token = token;
      this.user = res.body?.user ?? user;
    }
    return res;
  }

  // --- 3 Logout ------------------------------------------------------------

  /**
   * Removes the server-side token, invalidating all subsequent requests.
   * Clears the locally held token too unless told otherwise, so a scenario
   * cannot accidentally keep using a dead token.
   */
  async logout({ user = this.user, token = this.token } = {}, options = {}) {
    const res = await this.http.post(
      ENDPOINTS.LOGOUT,
      { user, token },
      { params: { token } }
    );
    if (options.store !== false) {
      this.token = null;
      this.user = null;
    }
    return res;
  }

  // --- 4 Quote Request -----------------------------------------------------

  /**
   * Determines cost per share and inventory availability. The price from the
   * response feeds a limit-locate-order.
   *
   * @param {{ symbol: string, mpid: string, trader: string,
   *           orderQty: number, quoteReqId?: string, token?: string }} params
   */
  async quote({ symbol, mpid, trader, orderQty, quoteReqId, token = this.token } = {}) {
    const payload = {
      token,
      quoteReqId: quoteReqId ?? newQuoteReqId(),
      mpid,
      trader,
      symbol,
    };
    if (orderQty === undefined) {
      throw new Error('orderQty is required for /quote by Specification 1.5.');
    }
    payload.orderQty = orderQty;

    return this.http.post(ENDPOINTS.QUOTE, payload);
  }

  // --- 5 Limit-Locate-Order ------------------------------------------------

  /**
   * Requests a locate at a guaranteed-or-better price.
   *
   * @param {{ symbol: string, mpid: string, trader: string, orderQty: number,
   *           orderPx: number, cliOrdId?: string, tif?: string, token?: string }} params
   */
  async limit({ symbol, mpid, trader, orderQty, orderPx, cliOrdId, tif, token = this.token } = {}) {
    const payload = {
      token,
      cliOrdId: cliOrdId ?? newCliOrdId(),
      mpid,
      trader,
      symbol,
      orderQty,
      orderPx,
    };
    if (tif !== undefined) payload.tif = tif;
    return this.http.post(ENDPOINTS.LIMIT, payload);
  }

  // --- 7 Overnight-Locate-Order -------------------------------------------

  /**
   * Same required identity/quantity fields as /limit minus orderPx; overnight
   * orders are priced by the service.
   *
   * @param {{ symbol: string, mpid: string, trader: string, orderQty: number,
   *           cliOrdId?: string, token?: string }} params
   */
  async overnight({ symbol, mpid, trader, orderQty, cliOrdId, token = this.token } = {}) {
    return this.http.post(ENDPOINTS.OVERNIGHT, {
      token,
      cliOrdId: cliOrdId ?? newCliOrdId(),
      mpid,
      trader,
      symbol,
      orderQty,
    });
  }

  // --- 8 Locate-Order Restatement -----------------------------------------

  /**
   * Re-reads an existing order. Response shape is identical to /limit.
   *
   * @param {{ cliOrdId: string, locateId: number|string, token?: string }} params
   */
  async locate({ cliOrdId, locateId, token = this.token } = {}) {
    return this.http.post(ENDPOINTS.LOCATE, {
      token,
      cliOrdId,
      locateId,
    });
  }

  // --- 6 Quote List Snapshot -----------------------------------------------

  /**
   * Price list of everything in inventory at the time of the request. The
   * literal string "snapshot" is the symbol, per the spec's request sample;
   * symbols absent from inventory simply do not appear in the list.
   *
   * @param {{ mpid: string, quoteReqId?: string, token?: string }} params
   */
  async snapshot({ mpid, quoteReqId, token = this.token } = {}) {
    return this.http.post(ENDPOINTS.SNAPSHOT, {
      token,
      quoteReqId: quoteReqId ?? newQuoteReqId(),
      mpid,
      symbol: 'snapshot',
    });
  }

  // --- Escape hatch --------------------------------------------------------

  /**
   * POST an arbitrary document to an arbitrary entity URL.
   *
   * For negative tests only - missing required fields, unknown fields,
   * malformed JSON, wrong content type. Business flows must use the typed
   * methods above so the request shape stays in one place.
   */
  async raw(entityUrl, payload, options) {
    return this.http.post(entityUrl, payload, options);
  }

  async dispose() {
    await this.http.dispose();
  }
}

/** Convenience for scripts outside the test runner. */
export async function createClient(options = {}) {
  return LocateApiClient.create({ baseURL: API_ENV.baseURL, ...options });
}
