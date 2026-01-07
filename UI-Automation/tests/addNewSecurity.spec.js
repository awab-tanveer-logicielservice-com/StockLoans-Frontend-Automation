import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage.js';
import { DashboardPage } from '../Pages/DashboardPage.js';
import { AddNewSecurityPage } from '../Pages/AddNewSecurityPage.js';
import { users } from '../utils/testdata.js';

// Helper function to generate random security data
function generateRandomSecurityData() {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 1000);

  const symbols = ['TEST', 'DEMO', 'SMPL', 'TEMP', 'AUTO'];
  const exchanges = ['NYSE', 'NASDAQ', 'LOCAL', 'AMEX'];
  const statuses = ['active', 'inactive', 'pending'];

  return {
    symbol: `${symbols[Math.floor(Math.random() * symbols.length)]}${randomNum}`,
    cusip: `TS${timestamp.toString().slice(-6)}`,
    description: `Test Security ${timestamp}`,
    exchange: exchanges[Math.floor(Math.random() * exchanges.length)],
    volume: Math.floor(10000 + Math.random() * 90000).toString(),
    closePrice: (Math.random() * 1000 + 50).toFixed(2),
    closeDate: '12/31/2026',
    status: statuses[Math.floor(Math.random() * statuses.length)]
  };
}

test.describe('Add New Security Tests', () => {
  let loginPage;
  let dashboardPage;
  let addNewSecurityPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    addNewSecurityPage = new AddNewSecurityPage(page);

    // Set viewport to full screen
    await page.setViewportSize({ width: 1900, height: 945 });

    // Login
    await loginPage.navigate();
    await loginPage.login(users.username, users.password);
    await page.waitForTimeout(5000);
  });

  test('complete security form workflow - all scenarios in one test', async ({ page }) => {
    const securityData = generateRandomSecurityData();

    // STEP 1: Navigate to Security Master page and verify page loads
    await addNewSecurityPage.navigateToSecurityMaster();
    await addNewSecurityPage.verifyAddNewSecurityButtonVisible();

    // STEP 2: Test search functionality
    await addNewSecurityPage.searchSecurity('6019');
    await addNewSecurityPage.verifyUpdateContractsCheckboxVisible();

    // STEP 3: Toggle update contracts and search again
    await addNewSecurityPage.toggleUpdateContracts();
    await addNewSecurityPage.searchSecurity('Tester');

    // STEP 4: Open add new security form
    await addNewSecurityPage.clickAddNewSecurity();

    // STEP 5: Fill and verify symbol field
    await addNewSecurityPage.fillSymbol(securityData.symbol);
    await expect(addNewSecurityPage.symbolInput).toHaveValue(securityData.symbol);

    // STEP 6: Fill and verify CUSIP field
    await addNewSecurityPage.fillCusip(securityData.cusip);
    await expect(addNewSecurityPage.cusipInput).toHaveValue(securityData.cusip);

    // STEP 7: Fill and verify description field
    await addNewSecurityPage.fillDescription(securityData.description);
    await expect(addNewSecurityPage.descriptionInput).toHaveValue(securityData.description);

    // STEP 8: Fill and verify exchange field
    await addNewSecurityPage.fillExchange(securityData.exchange);
    await expect(addNewSecurityPage.exchangeInput).toHaveValue(securityData.exchange);

    // STEP 9: Fill and verify volume field
    await addNewSecurityPage.fillVolume(securityData.volume);
    await expect(addNewSecurityPage.volumeInput).toHaveValue(securityData.volume);

    // STEP 10: Fill and verify close price field
    await addNewSecurityPage.fillClosePrice(securityData.closePrice);
    await expect(addNewSecurityPage.closePriceInput).toHaveValue(securityData.closePrice);

    // STEP 11: Fill and verify close date field
    await addNewSecurityPage.fillCloseDate(securityData.closeDate);
    await expect(addNewSecurityPage.closeDateInput).toHaveValue(securityData.closeDate);

    // STEP 12: Fill and verify status field
    await addNewSecurityPage.fillStatus(securityData.status);
    await expect(addNewSecurityPage.statusInput).toHaveValue(securityData.status);

    // STEP 13: Verify Add button is enabled after all fields are filled
    await expect(addNewSecurityPage.addButton).toBeEnabled();
  });
});
