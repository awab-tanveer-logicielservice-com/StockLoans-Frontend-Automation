import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { test } from './fixtures.js';

const { When, Then } = createBdd(test);

When('the user logs in with valid credentials', async ({ loginPage, testUsers }) => {
  await loginPage.login(testUsers.username, testUsers.password);
});

Then('the user should be redirected to the dashboard', async ({ page, contractSummaryPage }) => {
  await page.waitForURL(/\/contract-summary/, { timeout: 30000 });
  await expect(page).toHaveURL(/\/contract-summary/);
  await contractSummaryPage.navigate();
});
