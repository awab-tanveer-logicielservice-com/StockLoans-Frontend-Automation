/**
 * Logs in once per run and captures the Firebase session for every other
 * project to reuse, so the ~480 scenarios that need an authenticated user
 * don't each pay for a full UI login.
 *
 * See utils/auth.js for why storageState alone doesn't work for this app.
 */
import { test as setup, expect } from '@playwright/test';
import { LoginPage } from './Pages/LoginPage.js';
import { ENV } from './Config/env.js';
import { users, devUsers } from './utils/testdata.js';
import { extractFirebaseAuth, saveFirebaseAuth } from './utils/auth.js';

setup('authenticate', async ({ page }) => {
  const testUsers = ENV.baseURL.includes('dev') ? devUsers : users;

  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login(testUsers.username, testUsers.password);

  // login() already waits for the redirect off /login; assert it so a broken
  // login fails here loudly instead of as 480 confusing downstream failures.
  expect(page.url()).not.toContain('/login');

  const records = await extractFirebaseAuth(page);
  expect(
    records.length,
    'no Firebase auth record found in IndexedDB after login'
  ).toBeGreaterThan(0);

  saveFirebaseAuth(records);
});
