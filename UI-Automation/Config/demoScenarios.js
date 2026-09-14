// Which scenarios the `npm run demo` walkthrough runs (Login + Trade).
//
// Deliberately kept here rather than as a tag in the .feature files: the
// feature files are the shared, Jira-traceable specification and shouldn't
// carry a tag that only exists to serve a demo. Selection is by exact scenario
// title, turned into a Playwright `grep` regex in playwright.config.js.
//
// To change what the demo runs, edit the lists below — nothing else.

export const DEMO_SCENARIOS = {
  // Runs in the 'demo-login' project: drives the real login form from a
  // logged-out state, so it must not receive the replayed session.
  login: [
    'Successful login with valid credentials redirects to Contract Summary dashboard',
  ],

  // Runs in the 'demo-trade' project: replays the session captured by
  // 'auth setup'. Mix is intentional — happy paths, negative/validation
  // paths, and one end-to-end scenario that ties the journey together.
  trade: [
    // Happy paths
    'User opens Trade panel for a single Borrow and submits successfully',
    'User opens Trade panel for a single Loan and submits successfully',
    'User opens Trade panel in Match mode and two linked trades are created',
    'Symbol is prefilled when Trade panel is opened from Contract Details context',
    // Negative / validation
    'Trade form validates all required fields before allowing submit',
    'Trade form validates counterparty before allowing submit',
    // End-to-end
    'Full lifecycle — login, navigate to Contract Details, filter, verify live quote, expand history, verify pinned totals, submit Trade',
  ],
};

/**
 * Builds a Playwright `grep` regex that matches any of the given scenario
 * titles exactly (special characters escaped, so em dashes and dots in a
 * title can't act as wildcards).
 */
export function grepForTitles(titles) {
  const escaped = titles.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  return new RegExp(`(?:${escaped.join('|')})`);
}
