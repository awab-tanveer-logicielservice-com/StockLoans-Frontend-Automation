import { expect, test } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage.js';
import { BulkImportPage } from '../Pages/BulkImportPage.js';
import { users } from '../utils/testdata.js';

test.describe('Bulk Import TestCase', () => {

  test('User login and perform bulk import borrow workflow', async ({ page }) => {
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

    // Navigate to Bulk Import page
    await bulkImportPage.navigateToBulkImport();

    // Complete bulk import for borrow
    await bulkImportPage.completeBorrowImport('6019 ', 'AAPL 100 250');

    // Wait for import to process
    await page.waitForTimeout(3000);
  });

  test('User login and fill borrow details without importing', async ({ page }) => {
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

    // Navigate to Bulk Import page
    await bulkImportPage.navigateToBulkImport();

    // Fill borrow details
    await bulkImportPage.fillBorrowDetails('6019 ', 'AAPL 100 250');

    // Verify import button is visible
    await expect(bulkImportPage.importButton).toBeVisible();
  });

  test('User login and perform bulk import loan workflow', async ({ page }) => {
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

    // Navigate to Bulk Import page
    await bulkImportPage.navigateToBulkImport();

    // Complete bulk import for loan
    await bulkImportPage.completeLoanImport('6019 ', 'AAPL 100 250');

    // Wait for import to process
    await page.waitForTimeout(3000);
  });

  test('User login and fill loan details without importing', async ({ page }) => {
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

    // Navigate to Bulk Import page
    await bulkImportPage.navigateToBulkImport();

    // Fill loan details
    await bulkImportPage.fillLoanDetails('6019', 'AAPL 100 250');

    // Verify import button is visible
    await expect(bulkImportPage.importButton).toBeVisible();
  });
});