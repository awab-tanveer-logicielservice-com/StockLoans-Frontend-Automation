/**
 * Single source of truth for which Velocity JSON API host the suite targets.
 *
 * This suite targets the Dev/Test environment only.
 *
 * Spec 1.4, section 1.1 lists two base URLs. We deliberately automate just the
 * first. The production host is recorded below so nobody has to go back to the
 * PDF to recognise it, but it is not selectable: the suite fires real locate
 * orders, and an accidental run against production would place them for real.
 * PRODUCTION_HOST exists so the guard can refuse it by name.
 *
 * Note the two environments use different domains AND different TLDs
 * (velocitycapitalllc.com vs velocityclearing.llc), so neither can be derived
 * from the other, and a typo in one does not resolve to the other.
 *
 * Override the host only to reach a different dev/test deployment:
 *   API_BASE_URL=https://some-other-dev-host/json
 */

const DEV_BASE_URL = 'https://betapi.velocitycapitalllc.com/json';

/** Not a target. Named only so assertProductionIsNotTargeted can reject it. */
const PRODUCTION_HOST = 'api.locate.velocityclearing.llc';

function assertProductionIsNotTargeted(url) {
  let host;
  try {
    host = new URL(url).host;
  } catch {
    throw new Error(`API_BASE_URL is not a valid URL: "${url}"`);
  }
  if (host === PRODUCTION_HOST || host.endsWith('velocityclearing.llc')) {
    throw new Error(
      `Refusing to run the API suite against the production host "${host}".\n` +
        'This suite places real locate orders and is scoped to Dev/Test only. ' +
        `Unset API_BASE_URL to use the dev host (${DEV_BASE_URL}).`
    );
  }
  return url;
}

export const API_ENV = {
  /** Always 'dev' - kept so reports and log lines can state the target. */
  name: 'dev',

  /** Base URL every entity URL is appended to ("Append entity URL to base URLs"). */
  get baseURL() {
    return assertProductionIsNotTargeted(process.env.API_BASE_URL || DEV_BASE_URL);
  },

  /** Per-request timeout in ms. Locate responses are fast; this is a hang guard. */
  get requestTimeout() {
    return Number(process.env.API_TIMEOUT_MS) || 30_000;
  },

  /**
   * Set API_LOG=1 to print every request/response envelope to stdout. Off by
   * default so a full run does not bury the reporter output.
   */
  get verbose() {
    return ['1', 'true', 'yes'].includes(String(process.env.API_LOG || '').toLowerCase());
  },
};

export { DEV_BASE_URL, PRODUCTION_HOST };
