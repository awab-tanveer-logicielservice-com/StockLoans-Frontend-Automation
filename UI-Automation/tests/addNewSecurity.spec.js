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
    closePrice: Math.floor(Math.random() * 1000 + 50).toString(),
    closeDate: '2026-12-31',
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

    await page.setViewportSize({ width: 1900, height: 945 });
    await loginPage.navigate();
    await loginPage.login(users.username, users.password);
    await page.waitForURL(/\/contract-summary/, { timeout: 30000 });
  });

  test('complete security form workflow - all scenarios in one test', async ({ page }) => {
    const securityData = generateRandomSecurityData();

    // STEP 1: Navigate to Security Master page and verify page loads
    await addNewSecurityPage.navigateToSecurityMaster();

    // STEP 2: Search '6019' and wait for results or no-results message
    await addNewSecurityPage.searchSecurity('6019');
    await addNewSecurityPage.waitForSearchResults();

    if (await addNewSecurityPage.hasSearchResults()) {
      // STEP 3: Normal update — select first result, edit a field, click Update
      await addNewSecurityPage.selectFirstResult();
      await addNewSecurityPage.verifyDetailViewVisible();
      await addNewSecurityPage.modifyDescriptionField();
      await addNewSecurityPage.clickUpdateButton();

      // STEP 4: Enable Update Contracts toggle and verify the sub-view appears
      await addNewSecurityPage.toggleUpdateContracts();
      await addNewSecurityPage.verifyUpdateContractsCheckboxVisible();

      // STEP 5: Update contracts by existing symbol then submit
      await addNewSecurityPage.fillExistingSymbol('6019');
      await addNewSecurityPage.clickUpdateButton();

      // STEP 6: Disable Update Contracts toggle
      await addNewSecurityPage.toggleUpdateContracts();
    }

    // STEP 7: Search again with a different term and wait for results or no-results
    await addNewSecurityPage.searchSecurity('Tester');
    await addNewSecurityPage.waitForSearchResults();

    // STEP 8: Navigate fresh to Security Master to reset any search state, then open modal
    await addNewSecurityPage.navigateToSecurityMaster();
    await addNewSecurityPage.clickAddNewSecurity();
    await addNewSecurityPage.verifyNewSecurityFormVisible();

    // STEP 9: Fill and verify symbol field
    await addNewSecurityPage.fillSymbol(securityData.symbol);
    await expect(addNewSecurityPage.symbolInput).toHaveValue(securityData.symbol);

    // STEP 10: Fill and verify CUSIP field
    await addNewSecurityPage.fillCusip(securityData.cusip);
    await expect(addNewSecurityPage.cusipInput).toHaveValue(securityData.cusip);

    // STEP 11: Fill and verify description field
    await addNewSecurityPage.fillDescription(securityData.description);
    await expect(addNewSecurityPage.descriptionInput).toHaveValue(securityData.description);

    // STEP 12: Fill and verify exchange field
    await addNewSecurityPage.fillExchange(securityData.exchange);
    await expect(addNewSecurityPage.exchangeInput).toHaveValue(securityData.exchange);

    // STEP 13: Fill and verify volume field
    await addNewSecurityPage.fillVolume(securityData.volume);
    await expect(addNewSecurityPage.volumeInput).toHaveValue(securityData.volume);

    // STEP 14: Fill and verify close price field
    await addNewSecurityPage.fillClosePrice(securityData.closePrice);
    await expect(addNewSecurityPage.closePriceInput).toHaveValue(securityData.closePrice);

    // STEP 15: Fill and verify close date field
    await addNewSecurityPage.fillCloseDate(securityData.closeDate);
    await expect(addNewSecurityPage.closeDateInput).toHaveValue(securityData.closeDate);

    // STEP 16: Fill and verify status field
    await addNewSecurityPage.fillStatus(securityData.status);
    await expect(addNewSecurityPage.statusInput).toHaveValue(securityData.status);

    // STEP 17: Verify Add button is enabled then submit the form
    await expect(addNewSecurityPage.addButton).toBeEnabled();
    await addNewSecurityPage.submitNewSecurity();

    // STEP 18: Verify the security was successfully added
    await addNewSecurityPage.verifySecurityAdded();
  });
});
