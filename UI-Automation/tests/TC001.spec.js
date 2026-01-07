import { expect, test } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage.js';
import { users } from '../utils/testdata.js';
import { DashboardPage } from '../Pages/DashboardPage.js';

test.describe('Login and Dashboard TestCase', () => {

  test('User login and verify dashboard page workflow', async ({ page }) => {
    test.setTimeout(120000); 
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
     // Set viewport to full screen
    await page.setViewportSize({ width: 1900, height: 945 });

    // Login and verify successful login
    await loginPage.navigate();
    await loginPage.login(users.username, users.password);

    await page.waitForURL(/\/combined-contracts;id=/, { timeout: 30000 });
    await expect(page).toHaveURL(/\/combined-contracts;id=/);

    await dashboardPage.searchAndApply('AAPR');

    await dashboardPage.searchAndApply();

    await dashboardPage.doubleClickSymbol('AAPR');

    await dashboardPage.expandFirstGroup();

    await dashboardPage.clickSymbolByIndex('AAPR', 3);

    await dashboardPage.doubleClickSymbol('AAPR');
    await dashboardPage.verifyBrokerDetailsHeader();

    await dashboardPage.expandFirstGroup();

    await dashboardPage.clickSymbolByIndex('AAPR', 3);
    await dashboardPage.verifyBrokerDetailsHeader();
  });

});