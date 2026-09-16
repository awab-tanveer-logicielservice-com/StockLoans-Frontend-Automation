import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import { ENV } from './UI-Automation/Config/env.js';
import { DEMO_SCENARIOS, grepForTitles } from './UI-Automation/Config/demoScenarios.js';

// Optional: drive Brave instead of the bundled Chromium. Brave is Chromium-based,
// so every launch arg below applies unchanged and the page objects behave the
// same; Playwright ships no `channel` for Brave, so it is selected by path:
//
//   $env:BROWSER = 'brave'; npx playwright test --project=bdd
//
// Override the location with BRAVE_PATH if Brave is installed elsewhere.
// Unset, this is inert and the suite runs on bundled Chromium exactly as before.
const USE_BRAVE = (process.env.BROWSER || '').toLowerCase() === 'brave';
const BRAVE_PATH =
  process.env.BRAVE_PATH ||
  'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe';

// The size every project renders the app at. 1536x720 is the suite standard;
// override for a one-off run with e.g. VIEWPORT=1920x1080.
//
// The browser window is sized to match (and --start-maximized dropped), so a
// headed run shows the app at exactly this size rather than a maximized window
// with a smaller viewport inside it. The step definitions call setViewportSize
// with the same dimensions â€” keep them in step with VIEWPORT_DEFAULT if this
// changes, or they will override it per scenario.
const VIEWPORT_DEFAULT = '1536x720';

// Local runs are headed so the browser is visible while tests execute; CI stays
// headless. Force either way with HEADLESS=1 / HEADLESS=0.
const HEADLESS =
  process.env.HEADLESS !== undefined
    ? !['0', 'false', 'no'].includes(process.env.HEADLESS.toLowerCase())
    : Boolean(process.env.CI);

const VIEWPORT = (() => {
  const raw = process.env.VIEWPORT || VIEWPORT_DEFAULT;
  const m = raw.match(/^(\d+)\s*[xX*]\s*(\d+)$/);
  if (!m) throw new Error(`VIEWPORT must look like "1280x800", got "${raw}"`);
  return { width: Number(m[1]), height: Number(m[2]) };
})();

const bddUse = {
  headless: HEADLESS,
  slowMo: 0,
  viewport: VIEWPORT,
  deviceScaleFactor: undefined,
  launchOptions: {
    ...(USE_BRAVE ? { executablePath: BRAVE_PATH } : {}),
    args: [
      ...(VIEWPORT ? [] : ['--start-maximized']),
      '--window-position=0,0',
      VIEWPORT
        ? `--window-size=${VIEWPORT.width},${VIEWPORT.height}`
        : '--window-size=1920,1080',
      // Prevent Chrome from throttling requestAnimationFrame in headless mode.
      // Angular schedules change detection via rAF; without these flags the
      // entity dropdown options never flush to the DOM in headless runs.
      '--disable-background-timer-throttling',
      '--disable-renderer-backgrounding',
      '--disable-backgrounding-occluded-windows',
    ]
  }
};

// Extra evidence captured only by the demo projects â€” see their definitions
// at the bottom of `projects`.
const demoArtifacts = {
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
  trace: 'retain-on-failure',
};

const bddConfig = defineBddConfig({
  features: [
    'UI-Automation/features/ContractsSummary.feature',
    'UI-Automation/features/ContractDetails.feature',
    'UI-Automation/features/AddNewSecurity.feature',
    'UI-Automation/features/SecurityMasterSearchEdit.feature',
    'UI-Automation/features/AddNewModalLayouts.feature',
    'UI-Automation/features/LendingPitTweaks.feature',
    'UI-Automation/features/Bulkimport.feature',
    'UI-Automation/features/ContractManagement.feature',
    'UI-Automation/features/memosegFeature.feature',
    'UI-Automation/features/ShortInterestRateAdjustment.feature',
    'UI-Automation/features/ShortRateAdjustment.feature',
    'UI-Automation/features/ContractReview.feature',
    'UI-Automation/features/LCOR.feature',
    'UI-Automation/features/ReportDateFiltersGrouping.feature',
    'UI-Automation/features/AddNewUser.feature',
    'UI-Automation/features/UserRoles.feature',
    'UI-Automation/features/BulkImportFPLMode.feature',
    'UI-Automation/features/BulkSnapshot.feature',
    'UI-Automation/features/FplAccount.feature',
    // SLL-236 Access Review. Deliberately not registered yet: the screen is not
    // built (ticket is To Do) and the locators in LOCATORS.AccessReviewPage are
    // unconfirmed guesses, so enabling this now would add ~43 failing scenarios
    // to a green suite. Uncomment once the UI lands and the locators are verified.
    // 'UI-Automation/features/AccessReview.feature',
  ],
  steps: 'UI-Automation/step-definitions/**/*.js',
  outputDir: 'UI-Automation/.features-gen',
});

// Login and Remember-Me run in their own project: they assert on the logged-out
// state, so they must not receive the replayed session the other projects use.
// Kept separate from bddConfig so the existing projects' composition is unchanged.
const loginBddConfig = defineBddConfig({
  features: [
    'UI-Automation/features/LoginFunctionalityFeatureFile.feature',
    'UI-Automation/features/RememberMe.feature',
  ],
  steps: 'UI-Automation/step-definitions/**/*.js',
  outputDir: 'UI-Automation/.features-gen-login',
});

export default defineConfig({
  testDir: 'UI-Automation/tests',
  // Was 240s to absorb the old networkidle/grid-overlay stalls. Most scenarios
  // now finish in ~20s, but the slowest legitimate ones (e.g. Contract
  // Management depository switching) still take ~95s, so this keeps real
  // headroom while cutting what a genuinely hung test costs.
  timeout: 180_000,
  expect: { timeout: 10000 },
  // Scenarios within a feature stay serial (they share app state on a live
  // environment); separate feature files run in parallel across workers.
  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : Number(process.env.PW_WORKERS) || 4,
  reporter: [['list'], ['allure-playwright']],
  use: {
    baseURL: ENV.baseURL,
    headless: HEADLESS,
    viewport: VIEWPORT,
    actionTimeout: 10_000,
    navigationTimeout: 120_000,
    ignoreHTTPSErrors: true,
    trace: 'on-first-retry'
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        headless: HEADLESS,
      },
    },
    {
      // Logs in once and captures the Firebase session that the BDD projects
      // replay into every context, instead of ~480 scenarios each driving the
      // login form. See UI-Automation/utils/auth.js.
      name: 'auth setup',
      testDir: 'UI-Automation',
      testMatch: /auth\.setup\.js/,
      // Every BDD project depends on this one, so a transient login blip would
      // otherwise skip the entire suite. Retry regardless of CI.
      retries: 2,
      use: bddUse,
    },
    {
      name: 'bdd',
      testDir: bddConfig,
      dependencies: ['auth setup'],
      use: bddUse,
    },
    {
      // Runs only @Smoke-tagged scenarios. Word-boundary regex avoids matching
      // the unrelated @smokeBDD tag that's present on nearly every scenario.
      name: 'smoke',
      testDir: bddConfig,
      grep: /@Smoke\b/,
      dependencies: ['auth setup'],
      use: bddUse,
    },
    {
      // Runs only @Regression-tagged scenarios (the full regression set).
      name: 'regression',
      testDir: bddConfig,
      grep: /@Regression\b/,
      dependencies: ['auth setup'],
      use: bddUse,
    },
    {
      // Login / Remember Me. No 'auth setup' dependency and no injected session â€”
      // these scenarios drive the real login form from a logged-out state.
      name: 'login',
      testDir: loginBddConfig,
      use: bddUse,
    },
    // â”€â”€ Demo â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    // `npm run demo` runs both demo projects in one shot (see scripts/run-demo.mjs).
    // Split in two because the Login scenario must start logged out while the
    // Trade scenarios replay the captured session from 'auth setup'.
    //
    // Scenarios are picked by title from UI-Automation/Config/demoScenarios.js,
    // so the .feature files stay free of any demo-only tag.
    //
    // Unlike the CI projects these capture a screenshot, video and trace on
    // failure. It costs a little time but means the Allure report you present
    // has the evidence attached inline instead of "re-run it with --trace on".
    // Longer per-test budget than the 180s default: the grid waits in the
    // Contract Summary/Details page objects were widened to 90s each, and the
    // test timeout has to exceed them or it aborts before the wait finishes
    // (and before the diagnostic message it raises).
    {
      name: 'demo-login',
      testDir: loginBddConfig,
      grep: grepForTitles(DEMO_SCENARIOS.login),
      timeout: 300_000,
      use: { ...bddUse, ...demoArtifacts },
    },
    {
      name: 'demo-trade',
      testDir: bddConfig,
      grep: grepForTitles(DEMO_SCENARIOS.trade),
      dependencies: ['auth setup'],
      timeout: 300_000,
      use: { ...bddUse, ...demoArtifacts },
    },
  ]
});
