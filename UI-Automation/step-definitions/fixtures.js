import { test as base } from 'playwright-bdd';
import { LoginPage } from '../Pages/LoginPage.js';
import { DashboardPage } from '../Pages/DashboardPage.js';
import { FPLAccountPage } from '../Pages/FPLAccountPage.js';
import { AddNewCounterPartyPage } from '../Pages/AddNewCounterPartyPage.js';
import { AddNewUserPage } from '../Pages/addNewUserPage.js';
import { UserRolesPage } from '../Pages/UserRolesPage.js';
import { AddNewSecurityPage } from '../Pages/AddNewSecurityPage.js';
import { AddNewModalLayoutsPage } from '../Pages/AddNewModalLayoutsPage.js';
import { MemoSegPage } from '../Pages/MemoSegPage.js';
import { ShortInterestRateAdjustmentPage } from '../Pages/ShortInterestRateAdjustmentPage.js';
import { ShortRateAdjustmentPage } from '../Pages/ShortRateAdjustmentPage.js';
import { ContractSummaryPage } from '../Pages/ContractSummaryPage.js';
import { ContractDetailsPage } from '../Pages/ContractDetailsPage.js';
import { ContractReviewPage } from '../Pages/ContractReviewPage.js';
import { ContractManagementPage } from '../Pages/ContractManagementPage.js';
import { LCORPage } from '../Pages/LCORPage.js';
import { RememberMePage } from '../Pages/RememberMePage.js';
import { SearchLendingPitLookUpPage } from '../Pages/SearchLendingPitLookUpPage.js';
import { BulkImportPage } from '../Pages/BulkImportPage.js';
import { BulkSnapshotPage } from '../Pages/BulkSnapshotPage.js';
import { ReportPage } from '../Pages/ReportPage.js';
import { AccessReviewPage } from '../Pages/AccessReviewPage.js';
import { users, devUsers, accessReviewRoleUsers } from '../utils/testdata.js';
import { ENV } from '../Config/env.js';
import { loadFirebaseAuth, injectFirebaseAuth } from '../utils/auth.js';

// Records captured once by the 'auth setup' project; read at module load so we
// don't hit the filesystem for every scenario.
const authRecords = loadFirebaseAuth();

/**
 * Single-browser mode, used by `npm run demo` (see scripts/run-demo.mjs).
 *
 * By default Playwright gives every test a fresh BrowserContext and page, so a
 * new window appears and closes for each scenario. With this flag the whole
 * project shares ONE context and ONE page for the entire run, which is what you
 * want when someone is watching the screen.
 *
 * Trade-off, deliberately accepted only for the demo: there is no per-scenario
 * isolation, so state bleeds between scenarios and one that leaves a dialog
 * open can break the next. Failure screenshots and traces still work, because
 * the context below is created from the `browser` fixture and Playwright
 * applies the project's artifact settings to contexts made that way.
 *
 * The flag is off for every normal run (`test:bdd`, `test:smoke`, CI), which
 * keeps their behaviour byte-for-byte unchanged.
 */
const SINGLE_BROWSER = process.env.DEMO_SINGLE_BROWSER === '1';

const singleBrowserFixtures = !SINGLE_BROWSER
  ? {}
  : {
      // Worker-scoped: created once and reused by every scenario in the project.
      // Projects run in separate workers, so 'demo-login' gets its own logged-out
      // page while 'demo-trade' gets one with the captured session replayed.
      sharedPage: [
        async ({ browser }, use, workerInfo) => {
          const needsLoggedOut = /^(demo-)?login$|RememberMe/i.test(workerInfo.project.name);
          const context = await browser.newContext({
            // Matches VIEWPORT_DEFAULT in playwright.config.js. This context is
            // built by hand rather than from the project's `use`, so it does not
            // inherit that setting and has to state the size itself.
            viewport: { width: 1536, height: 720 },
            ignoreHTTPSErrors: true,
            baseURL: ENV.baseURL,
          });
          if (authRecords && !needsLoggedOut) await injectFirebaseAuth(context, authRecords);
          // This context is built here rather than via the `context` fixture
          // below, so it needs the same splash suppression applied directly.
          await suppressSplashOverlay(context);
          const page = await context.newPage();
          await use(page);
          await context.close();
        },
        { scope: 'worker' },
      ],
      // Override the built-in page/context so every page object and step gets the
      // shared instances. Note these deliberately do NOT depend on the built-in
      // `page`/`context` fixtures - depending on them would make Playwright
      // create the very per-test window we're trying to avoid.
      page: async ({ sharedPage }, use) => {
        await use(sharedPage);
      },
      context: async ({ sharedPage }, use) => {
        await use(sharedPage.context());
      },
    };

/**
 * Permanently neutralises the Angular splash overlay for a context.
 *
 * The page objects each hide the splash once, inline, right after navigate().
 * That is not enough: `app-splash-screen` re-renders on later data operations
 * (every grid reload, every import), which throws the inline style away. The
 * overlay then sits on top of the form again and Playwright's hit-test reports
 *
 *   <div class="splash-overlay darkBackground"> ... intercepts pointer events
 *
 * so a plain .click() retries until actionTimeout. That single cause accounted
 * for 18 of the 39 failures in the 2026-09-08 QA run, all of them in Bulk
 * Import, where the precondition steps import a record mid-scenario.
 *
 * A stylesheet rule survives re-renders where an inline style does not, so this
 * runs as an init script and installs one before any app code executes.
 * Nothing asserts on the splash (no feature or step file mentions it), and the
 * real readiness gates are the per-page waits that follow navigate().
 */
async function suppressSplashOverlay(context) {
  await context.addInitScript(() => {
    const CSS =
      'app-splash-screen,app-splash-screen .splash-overlay,.splash-overlay{' +
      'display:none!important;visibility:hidden!important;pointer-events:none!important}';
    const add = () => {
      const root = document.head || document.documentElement;
      if (!root || document.getElementById('pw-splash-suppressor')) return;
      const style = document.createElement('style');
      style.id = 'pw-splash-suppressor';
      style.textContent = CSS;
      root.appendChild(style);
    };
    add();
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', add);
    }
  });
}

export const test = base.extend({
  // Replay the captured Firebase session into every context so scenarios start
  // authenticated instead of driving the login form. If the setup project
  // hasn't run, this is a no-op and the login step falls back to a UI login.
  context: async ({ context }, use, testInfo) => {
    // Login/Remember-Me scenarios assert on the logged-out state ("Precondition:
    // User is not logged in"), so they must NOT get a replayed session.
    const needsLoggedOut = /LoginFunctionality|RememberMe/i.test(testInfo.file);
    if (authRecords && !needsLoggedOut) await injectFirebaseAuth(context, authRecords);
    await suppressSplashOverlay(context);
    await use(context);
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  fplAccountPage: async ({ page }, use) => {
    await use(new FPLAccountPage(page));
  },
  addNewUserPage: async ({ page }, use) => {
    await use(new AddNewUserPage(page));
  },
  userRolesPage: async ({ page }, use) => {
    await use(new UserRolesPage(page));
  },
  addNewCounterPartyPage: async ({ page }, use) => {
    await use(new AddNewCounterPartyPage(page));
  },
  addNewSecurityPage: async ({ page }, use) => {
    await use(new AddNewSecurityPage(page));
  },
  addNewModalLayoutsPage: async ({ page }, use) => {
    await use(new AddNewModalLayoutsPage(page));
  },
  memoSegPage: async ({ page }, use) => {
    await use(new MemoSegPage(page));
  },
  shortInterestRateAdjustmentPage: async ({ page }, use) => {
    await use(new ShortInterestRateAdjustmentPage(page));
  },
  shortRateAdjustmentPage: async ({ page }, use) => {
    await use(new ShortRateAdjustmentPage(page));
  },
  contractSummaryPage: async ({ page }, use) => {
    await use(new ContractSummaryPage(page));
  },
  contractDetailsPage: async ({ page }, use) => {
    await use(new ContractDetailsPage(page));
  },
  contractReviewPage: async ({ page }, use) => {
    await use(new ContractReviewPage(page));
  },
  contractManagementPage: async ({ page }, use) => {
    await use(new ContractManagementPage(page));
  },
  lcorPage: async ({ page }, use) => {
    await use(new LCORPage(page));
  },
  rememberMePage: async ({ page }, use) => {
    await use(new RememberMePage(page));
  },
  searchLendingPitLookUpPage: async ({ page }, use) => {
    await use(new SearchLendingPitLookUpPage(page));
  },
  bulkImportPage: async ({ page }, use) => {
    await use(new BulkImportPage(page));
  },
  bulkSnapshotPage: async ({ page }, use) => {
    await use(new BulkSnapshotPage(page));
  },
  reportPage: async ({ page }, use) => {
    await use(new ReportPage(page));
  },
  accessReviewPage: async ({ page }, use) => {
    await use(new AccessReviewPage(page));
  },
  testUsers: async ({}, use) => {
    await use(ENV.baseURL.includes('dev') ? devUsers : users);
  },
  // Requester / approver / admin identities for the SLL-236 access review flow.
  accessReviewUsers: async ({ testUsers }, use) => {
    await use(accessReviewRoleUsers(testUsers));
  },
  // Spread last so its page/context overrides win when the flag is on. Empty
  // object - and therefore a no-op - for every normal run.
  ...singleBrowserFixtures,
});
