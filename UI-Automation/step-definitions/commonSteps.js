/**
 * Common steps shared across multiple feature files.
 * Defines reusable Given/When/Then steps for login and shared navigation.
 */
import { createBdd } from 'playwright-bdd';
import { test } from './fixtures.js';

const { Given } = createBdd(test);

Given('the user navigates to the application', async ({ page, loginPage }) => {
  await page.setViewportSize({ width: 1900, height: 945 });
  await loginPage.navigate();
});

Given('the user is logged in to the application', async ({ page, loginPage, testUsers }) => {
  await page.setViewportSize({ width: 1900, height: 945 });
  await loginPage.navigate();
  await loginPage.login(testUsers.username, testUsers.password);
});
