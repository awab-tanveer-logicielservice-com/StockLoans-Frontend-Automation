import { expect, test } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage.js';
import { BulkImportPage } from '../Pages/BulkImportPage.js';
import { users } from '../utils/testdata.js';

test.describe('Bulk Import TestCase', () => {

  test('All bulk import scenarios in one test', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const bulkImportPage = new BulkImportPage(page);

    // Set viewport to full screen
    await page.setViewportSize({ width: 1900, height: 945 });

    // Login and verify successful login
    await loginPage.navigate();
    await loginPage.login(users.username, users.password);
    await page.waitForTimeout(10000);
    await page.waitForURL(/\/combined-contracts;id=/, { timeout: 10000 });
    await expect(page).toHaveURL(/\/combined-contracts;id=/);

    // SCENARIO 1: Complete bulk import for borrow
    await bulkImportPage.navigateToBulkImport();
    await bulkImportPage.completeBorrowImport('6019', 'AAPL 100 250');
    await page.waitForTimeout(3000);

    // SCENARIO 2: Fill borrow details without importing
    await bulkImportPage.navigateToBulkImport();
    await bulkImportPage.fillBorrowDetails('6019', 'AAPL 100 250');
    await expect(bulkImportPage.importButton).toBeVisible();

    // SCENARIO 3: Complete bulk import for loan
    await bulkImportPage.navigateToBulkImport();
    await bulkImportPage.completeLoanImport('6019', 'AAPL 100 250');
    await page.waitForTimeout(3000);

    // SCENARIO 4: Fill loan details without importing
    await bulkImportPage.navigateToBulkImport();
    await bulkImportPage.fillLoanDetails('6019', 'AAPL 100 250');
    await expect(bulkImportPage.importButton).toBeVisible();
  });
});