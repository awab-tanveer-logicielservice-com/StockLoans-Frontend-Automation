import { expect, test } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage.js';
import { users } from '../utils/testdata.js';
import { ContractSummaryPage } from '../Pages/ContractSummaryPage.js';

test.describe('Login and Dashboard TestCase', () => {

  test('User login and verify dashboard page workflow', async ({ page }) => {
    test.setTimeout(120000);
    const loginPage = new LoginPage(page);
    const contractSummaryPage = new ContractSummaryPage(page);
    await page.setViewportSize({ width: 1900, height: 945 });

    await loginPage.navigate();
    await loginPage.login(users.username, users.password);

    await page.waitForURL(/\/contract-summary/, { timeout: 30000 });
    await expect(page).toHaveURL(/\/contract-summary/);

    await contractSummaryPage.navigate();
    await contractSummaryPage.hasGridRows();

    await contractSummaryPage.filterBySymbol('AAPL');
    await contractSummaryPage.hasGridRows();

    await contractSummaryPage.selectFirstRow();
    await contractSummaryPage.enableDetailsToggle();
    await contractSummaryPage.isDetailPanelVisible();
  });

});
