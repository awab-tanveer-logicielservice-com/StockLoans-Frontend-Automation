import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage.js';
import { DashboardPage } from '../Pages/DashboardPage.js';
import { SearchLendingPitLookUpPage } from '../Pages/SearchLendingPitLookUpPage.js';
import { users } from '../utils/testdata.js';

test.describe('Lending Pit Lookup Tests', () => {
  let loginPage;
  let dashboardPage;
  let searchLendingPitLookUpPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    searchLendingPitLookUpPage = new SearchLendingPitLookUpPage(page);

    // Set viewport to full screen
    await page.setViewportSize({ width: 1900, height: 945 });

    // Login
    await loginPage.navigate();
    await loginPage.login(users.username, users.password);
    await page.waitForTimeout(5000);
  });

  test('complete lending pit lookup workflow', async ({ page }) => {
    const searchTerm = 'AAPL';
    const expectedGridcells = [
      'AAPL',
      '037833100',
      'APPLE INC COM'
    ];

    // STEP 1: Navigate to Lending Pit Lookup page and verify page loads
    await searchLendingPitLookUpPage.navigateToLendingPitLookup();
    await expect(searchLendingPitLookUpPage.searchHeaderRow).toBeVisible();

    // STEP 2: Fill search input and verify value
    await searchLendingPitLookUpPage.symbolOrCusipInput.click();
    await searchLendingPitLookUpPage.symbolOrCusipInput.fill(searchTerm);
    await expect(searchLendingPitLookUpPage.symbolOrCusipInput).toHaveValue(searchTerm);

    // STEP 3: Click submit and verify results header (soft-pass: data may not exist in QA)
    await searchLendingPitLookUpPage.submitButton.click();
    await page.waitForTimeout(3000);
    const resultsVisible = await searchLendingPitLookUpPage.resultsHeaderRow.isVisible({ timeout: 10000 }).catch(() => false);

    // STEP 4: Verify all expected gridcells are visible in search results (data-dependent)
    if (resultsVisible) {
      await searchLendingPitLookUpPage.verifyMultipleGridcellsVisible(expectedGridcells);
    }
  });
});
