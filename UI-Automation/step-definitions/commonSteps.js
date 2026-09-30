/**
 * Common steps shared across multiple feature files.
 * Defines reusable Given/When/Then steps for login and shared navigation.
 */
import { createBdd } from 'playwright-bdd';
import { test } from './fixtures.js';
import { ENV } from '../Config/env.js';

const { Given } = createBdd(test);

Given('the user navigates to the application', async ({ page, loginPage }) => {
  await page.setViewportSize({ width: 1900, height: 1080 });
  await loginPage.navigate();
});

Given('the user is logged in to the application', async ({ page, loginPage, testUsers }) => {
  await page.setViewportSize({ width: 1900, height: 1080 });

  // The session is injected into the context from the 'auth setup' project, so
  // we land authenticated by going straight to an in-app route. Going to
  // baseURL instead would hit /login, which clears the injected session.
  await page.goto(ENV.dashboardURL);

  // Let the auth guard settle before deciding whether we're authenticated:
  // resolves as soon as either the dashboard grid renders or we get bounced to
  // the login form, so the common (authenticated) path isn't waiting on a timeout.
  // Promise.any, not race: race settles on the first *rejection*, which would
  // abandon the wait as soon as any one branch errored.
  await Promise.any([
    page.waitForURL(/\/login/, { timeout: 20000 }),
    loginPage.usernameInput.first().waitFor({ state: 'visible', timeout: 20000 }),
    page.locator('ag-grid-angular, .ag-root-wrapper').first()
      .waitFor({ state: 'visible', timeout: 20000 }),
  ]).catch(() => {});

  if (page.url().includes('/login')) {
    // No captured session, or it expired mid-run - do a real UI login.
    await loginPage.login(testUsers.username, testUsers.password);
  }
});
