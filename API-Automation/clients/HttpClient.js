import { request } from '@playwright/test';
import { API_ENV } from '../Config/env.js';

/**
 * Thin transport layer over Playwright's APIRequestContext.
 *
 * Responsibilities, and deliberately nothing more:
 *   - POST JSON to <baseURL><entityUrl> with exactly the header the spec
 *     mandates (Content-Type: application/json, no media type parameters)
 *   - never throw on a non-2xx: 400/401/500 are expected outcomes the suite
 *     asserts on, so every call returns an envelope instead
 *   - record elapsed time per call, so latency assertions and any future
 *     perf comparison read the same number the assertions do
 *   - keep the raw text body, so a malformed or non-JSON response produces a
 *     readable failure rather than a JSON.parse stack trace
 *
 * Endpoint knowledge lives in LocateApiClient, not here.
 */
export class HttpClient {
  /**
   * @param {import('@playwright/test').APIRequestContext} context
   * @param {string} baseURL
   */
  constructor(context, baseURL) {
    this.context = context;
    this.baseURL = baseURL;
    /** Every call made through this client, in order. Useful for debugging. */
    this.history = [];
  }

  static async create({ baseURL = API_ENV.baseURL, timeout = API_ENV.requestTimeout } = {}) {
    const context = await request.newContext({
      // No baseURL here on purpose: the spec's base URL already carries the
      // "/json" path segment, and Playwright's baseURL resolution would drop
      // it when joining an entity URL that starts with "/".
      extraHTTPHeaders: { 'Content-Type': 'application/json' },
      ignoreHTTPSErrors: true,
      timeout,
    });
    return new HttpClient(context, baseURL);
  }

  /**
   * POST a JSON document to an entity URL.
   *
   * @param {string} entityUrl e.g. '/quote' - appended to the base URL
   * @param {object|string} payload object to serialise, or a raw string for
   *        malformed-body negative tests
   * @param {{ headers?: Record<string,string> }} [options]
   * @returns {Promise<ApiResponse>}
   */
  async post(entityUrl, payload, options = {}) {
    const url = `${this.baseURL}${entityUrl}`;
    const isRaw = typeof payload === 'string';
    const started = Date.now();

    const response = await this.context.post(url, {
      // `data` with a string sends it byte-for-byte, which is what the
      // malformed-JSON scenarios need; with an object Playwright serialises it.
      data: isRaw ? payload : JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    });

    const durationMs = Date.now() - started;
    const text = await response.text();

    let body = null;
    let parseError = null;
    try {
      body = text.length ? JSON.parse(text) : null;
    } catch (err) {
      parseError = err.message;
    }

    const envelope = {
      entityUrl,
      url,
      httpStatus: response.status(),
      httpStatusText: response.statusText(),
      headers: response.headers(),
      requestBody: isRaw ? payload : payload,
      body,
      text,
      parseError,
      durationMs,
    };

    this.history.push(envelope);
    if (API_ENV.verbose) logEnvelope(envelope);

    return envelope;
  }

  /** Redacts the password so a verbose run never prints a credential. */
  get lastCall() {
    return this.history[this.history.length - 1] || null;
  }

  async dispose() {
    await this.context.dispose();
  }
}

function redact(payload) {
  if (!payload || typeof payload !== 'object') return payload;
  const copy = { ...payload };
  if ('password' in copy) copy.password = '***';
  if ('token' in copy && typeof copy.token === 'string' && copy.token.length > 8) {
    copy.token = `${copy.token.slice(0, 4)}...${copy.token.slice(-4)}`;
  }
  return copy;
}

function logEnvelope(e) {
  const req = JSON.stringify(redact(e.requestBody));
  // eslint-disable-next-line no-console
  console.log(
    `[api] POST ${e.entityUrl} -> ${e.httpStatus} in ${e.durationMs}ms\n` +
      `      req: ${req}\n` +
      `      res: ${e.text.slice(0, 800)}`
  );
}

/**
 * @typedef {object} ApiResponse
 * @property {string} entityUrl
 * @property {string} url
 * @property {number} httpStatus
 * @property {string} httpStatusText
 * @property {Record<string,string>} headers
 * @property {object|string} requestBody
 * @property {object|null} body   parsed JSON, or null if the body was empty/invalid
 * @property {string} text        raw response text
 * @property {string|null} parseError
 * @property {number} durationMs
 */
