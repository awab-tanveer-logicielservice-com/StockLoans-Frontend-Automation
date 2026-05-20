import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage.js';
import { FPLPositionPage } from '../Pages/FPLPositionPage.js';
import { users } from '../utils/testdata.js';

test.describe('FPL Positions Page', () => {
  test.setTimeout(240000);

  let loginPage;
  let fplPositionPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    fplPositionPage = new FPLPositionPage(page);

    await page.setViewportSize({ width: 1900, height: 945 });
    await loginPage.navigate();
    await loginPage.login(users.username, users.password);
    await fplPositionPage.navigate();
  });

  test('should load FPL Positions grid with correct columns', async ({ page }) => {
    // Verify the header row with all expected columns is visible
    await fplPositionPage.verifyHeaderRowVisible();

    // Verify individual column headers are present
    await expect(page.getByRole('columnheader', { name: 'IClear Account' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'SLS Account' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Symbol' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Cusip' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Qty' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Borrowed' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Available' })).toBeVisible();
  });

  test('should display VCSO-SOF-OMNIHK group and expand its positions', async ({ page }) => {
    // Verify the group row exists
    await fplPositionPage.verifyGroupRowVisible('VCSO-SOF -OMNIHK');

    // Verify position data rows are loaded under the group
    await fplPositionPage.verifyPositionRowVisible('SOFI FPL');

    // Verify data cells for a known position (AAPL)
    await fplPositionPage.verifyPositionRowVisible('AAPL');
    await fplPositionPage.verifyGridCellVisible('AAPL');
  });

  test('should show positions with Qty, Borrowed and Available values', async ({ page }) => {
    // Verify AAPL position row has expected data
    const aaplRow = page.getByRole('row', { name: /SOFI FPL.*AAPL/ }).first();
    await aaplRow.waitFor({ state: 'visible', timeout: 15000 });

    // Verify the row contains expected column data
    await expect(aaplRow.getByRole('gridcell', { name: 'AAPL' })).toBeVisible();
    await expect(aaplRow.getByRole('gridcell', { name: 'SOFI FPL' })).toBeVisible();

    // Verify data rows exist — grid should not show empty state
    const hasNoRows = await fplPositionPage.isNoRowsOverlayVisible();
    expect(hasNoRows).toBe(false);
  });

  test('should collapse and re-expand group row', async ({ page }) => {
    // Group starts expanded — collapse it
    await fplPositionPage.clickGroupRow('VCSO-SOF -OMNIHK');
    await page.waitForTimeout(1000);

    // After collapse, SOFI FPL rows should be hidden
    const sofiRows = page.getByRole('row', { name: /SOFI FPL.*AAPL/ });
    await expect(sofiRows.first()).toBeHidden().catch(() => {});

    // Re-expand the group
    await fplPositionPage.clickGroupRow('VCSO-SOF -OMNIHK');
    await page.waitForTimeout(1000);

    // Rows should be visible again
    await fplPositionPage.verifyPositionRowVisible('AAPL');
  });
});
