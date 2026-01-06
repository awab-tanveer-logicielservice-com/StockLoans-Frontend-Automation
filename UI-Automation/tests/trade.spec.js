import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage.js';
import { DashboardPage } from '../Pages/DashboardPage.js';
import { TradePage } from '../Pages/TradePage.js';
import { users } from '../utils/testdata.js';

test.describe('Trade Tests', () => {
  let loginPage;
  let dashboardPage;
  let tradePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    tradePage = new TradePage(page);
     // Set viewport to full screen
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Login
    await loginPage.navigate();
    await loginPage.login(users.username, users.password);
    await page.waitForTimeout(5000);
  });

  test('User can create a trade with Loan successfully', async ({ page }) => {
    test.setTimeout(120000);
    // Verify dashboard is visible
    await dashboardPage.verifyTableHeaderVisible();
    // Create a new trade
    await tradePage.createTradeLoan({
      counterpartyName: '6019',
      quantity: 100,
      symbol: 'AAPL',
      rebateRate: 1,
    });
  });

  test('User can create a trade with Borrow Symbol and Counter party', async ({ page }) => {
    test.setTimeout(120000);
    // Verify dashboard is visible
    await dashboardPage.verifyTableHeaderVisible();
    // Create a simple trade
    await tradePage.createTradeBorrow({
      counterpartyName: '6019',
      quantity: 150,
      symbol: 'AAPL',
      rebateRate: 1,
    });
  });
});
