/**
 * Client-assigned identifier generators.
 *
 * Every id is unique per process AND across concurrent processes. This is not
 * cosmetic: a repeated quoteReqId or cliOrdId makes two different requests
 * indistinguishable in the server logs, and reused warm-up ids have already
 * caused real mis-readings when comparing locate runs. The suite must never
 * emit the same id twice.
 *
 * Shape: <PREFIX>-<base36 timestamp>-<pid>-<counter>-<random>
 * e.g. QR-m4x1k2p-18244-0007-f3a9
 */

import { randomBytes } from 'node:crypto';

let counter = 0;

function nextId(prefix) {
  counter += 1;
  const ts = Date.now().toString(36);
  const seq = String(counter).padStart(4, '0');
  const rand = randomBytes(2).toString('hex');
  return `${prefix}-${ts}-${process.pid}-${seq}-${rand}`;
}

/** 1.5 / 1.10 - client-assigned quote request id. */
export function newQuoteReqId() {
  return nextId('QR');
}

/** 1.6 / 1.8 - client-assigned order id. */
export function newCliOrdId() {
  return nextId('CO');
}

/** For negative tests that need an id the server has definitely never seen. */
export function newUnknownId() {
  return nextId('NOPE');
}
