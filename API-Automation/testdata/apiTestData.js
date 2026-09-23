/**
 * Credentials and inputs for the Velocity JSON API suite.
 *
 * Unlike the UI suite, NOTHING here has a hard-coded fallback credential. The
 * JSON API reaches a trading backend, and a committed default would be both a
 * secret in git and a way to fire real locate orders from a stray run. Every
 * value comes from the environment, and a missing one fails fast with a message
 * naming the variable.
 *
 * Set them in your shell, in CI secrets, or in a local .env file (.env is
 * already gitignored):
 *
 *   VELOCITY_API_USER      preassigned UserID   (spec 1.3)
 *   VELOCITY_API_PASSWORD  preassigned password (spec 1.3)
 *   VELOCITY_MPID          market participant id sent on quote/order requests
 *   VELOCITY_TRADER        trader id sent on quote/order requests
 *
 * Optional:
 *   VELOCITY_TEST_SYMBOL         a symbol expected to be in inventory   (default AAPL)
 *   VELOCITY_ILLIQUID_SYMBOL     a symbol expected NOT to be in inventory
 *   VELOCITY_UNKNOWN_SYMBOL      a symbol the system does not know      (default ZZZZQQ)
 *   VELOCITY_TEST_QTY            default order quantity                 (default 100)
 *   VELOCITY_CALLBACK_URL        optional logon callbackUrl
 */

function required(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required environment variable ${name}.\n` +
        'The Velocity JSON API suite has no default credentials by design - see ' +
        'API-Automation/README.md for the full list and how to set them.'
    );
  }
  return value;
}

/** Throws if any credential is missing. Call from a fixture, not at import time. */
export function apiCredentials() {
  return {
    user: required('VELOCITY_API_USER'),
    password: required('VELOCITY_API_PASSWORD'),
    callbackUrl: process.env.VELOCITY_CALLBACK_URL,
  };
}

/** Party identifiers echoed back on every quote and order response. */
export function apiParty() {
  return {
    mpid: required('VELOCITY_MPID'),
    trader: required('VELOCITY_TRADER'),
  };
}

/** True when every required variable is present - used to skip rather than fail. */
export function hasApiCredentials() {
  return ['VELOCITY_API_USER', 'VELOCITY_API_PASSWORD', 'VELOCITY_MPID', 'VELOCITY_TRADER'].every(
    (name) => Boolean(process.env[name])
  );
}

export const SYMBOLS = {
  /** Expected to have inventory on the target environment. */
  get liquid() {
    return process.env.VELOCITY_TEST_SYMBOL || 'AAPL';
  },
  /** Expected to be a real symbol with no inventory - drives the code 0 path. */
  get illiquid() {
    return process.env.VELOCITY_ILLIQUID_SYMBOL || '';
  },
  /** Not a real symbol - drives status code 1, Unknown Symbol. */
  get unknown() {
    return process.env.VELOCITY_UNKNOWN_SYMBOL || 'ZZZZQQ';
  },
};

export const QUANTITIES = {
  get standard() {
    return Number(process.env.VELOCITY_TEST_QTY) || 100;
  },
  /** Drives status code 98, Qty Too Low. */
  tooLow: 1,
  /** Drives status code 93/94, Qty Not Allowed / Block. */
  tooHigh: 100_000_000,
};

/** Drives status code 2, Price Too Low. */
export const PRICES = {
  tooLow: 0.0001,
  /** Well above any realistic offer, so a limit order is never rejected on price. */
  generous: 999.0,
};

/** Deliberately invalid values for the negative scenarios. */
export const INVALID = {
  token: 'not-a-real-token-0000',
  user: 'no.such.user@example.invalid',
  password: 'definitely-wrong-password',
  malformedJson: '{"token": "abc", "symbol":}',
};
