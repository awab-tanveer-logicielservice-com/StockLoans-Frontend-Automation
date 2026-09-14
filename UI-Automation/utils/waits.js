/**
 * Shared navigation waits.
 *
 * These replace `waitForLoadState('networkidle')`, which was previously used
 * after almost every navigation. The app holds a persistent websocket, so the
 * network never goes idle and those waits always ran to their full timeout
 * before being swallowed by a `.catch(() => {})`. Measured over a full suite
 * run: 239 calls, 21.7s average, ~86 minutes of the ~291 minute total.
 *
 * Nothing depended on networkidle actually firing — every call site is followed
 * by a splash dismissal, an element wait, or a `waitForURL`, which is what
 * genuinely gates the next action. They were replaced with `domcontentloaded`
 * (already satisfied after `goto`, so effectively free), except where the caller
 * needed to know which route it landed on — that case is what this file covers.
 *
 * Related gotcha when writing these waits: `locator.isVisible()` returns
 * immediately and never waits, so a page object must leave the page genuinely
 * rendered before any `isVisible()`-based check runs.
 */

/**
 * Waits for an SPA route to settle when the caller needs to know whether the
 * Angular auth guard bounced it to /login.
 *
 * Races the login redirect against the destination's own content so it returns
 * as soon as either outcome is known, instead of waiting out a fixed timeout.
 *
 * @param {import('@playwright/test').Page} page
 * @param {import('@playwright/test').Locator} [readyLocator] element that
 *   proves the destination page rendered (e.g. its grid)
 */
export async function waitForRouteSettled(page, readyLocator, { timeout = 8000 } = {}) {
  if (page.url().includes('/login')) return;
  const outcomes = [page.waitForURL(/\/login/, { timeout })];
  if (readyLocator) {
    outcomes.push(readyLocator.first().waitFor({ state: 'visible', timeout }));
  }
  // Promise.any, not race: race settles on the first *rejection*, so one branch
  // erroring early would abandon the wait on the other.
  await Promise.any(outcomes).catch(() => {});
}
