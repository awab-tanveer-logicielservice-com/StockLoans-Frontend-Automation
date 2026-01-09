import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage.js';
import { DashboardPage } from '../Pages/DashboardPage.js';
import { AddNewCounterPartyPage } from '../Pages/AddNewCounterPartyPage.js';
import { users } from '../utils/testdata.js';

// Helper function to generate random counterparty name
function generateRandomCounterpartyName() {
  const prefixes = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Theta'];
  const suffixes = ['Capital', 'Finance', 'Trading', 'Securities', 'Investments', 'Holdings'];
  const timestamp = Date.now();

  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

  return `${prefix} ${suffix} ${timestamp}`;
}

// Helper function to generate random short code
function generateRandomShortCode() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// Helper function to generate random email
function generateRandomEmail() {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 1000);
  return `counterparty${timestamp}${randomNum}@yopmail.com`;
}

// Helper function to generate random counterparty data
function generateRandomCounterpartyData() {
  return {
    entity: 'Velocity Clearing LLC - 7359',
    name: generateRandomCounterpartyName(),
    shortCode: generateRandomShortCode(),
    billingReference: `BR-${Date.now()}`,
    currency: 'USD',
    defaultMargin: '1.00',
    lendLimit: '50000',
    borrowLimit: '50000',
    type: 'Regular',
    status: 'Active',
    rounding: 'No rounding',
    businessEmail: generateRandomEmail(),
    operationsEmail: generateRandomEmail()
  };
}

test.describe('Add New Counterparty Tests', () => {
  let loginPage;
  let dashboardPage;
  let addNewCounterPartyPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    addNewCounterPartyPage = new AddNewCounterPartyPage(page);

    // Set viewport to full screen
    await page.setViewportSize({ width: 1900, height: 945 });

    // Login
    await loginPage.navigate();
    await loginPage.login(users.username, users.password);
    await page.waitForTimeout(5000);
  });

  test('complete counterparty form workflow - all scenarios in one test', async ({ page }) => {
    const counterpartyData = generateRandomCounterpartyData();

    // STEP 1: Navigate to counterparties page and verify page loads
    await addNewCounterPartyPage.navigateToCounterparties();
    // await expect(addNewCounterPartyPage.headerRow).toBeVisible();

    // STEP 2: Open add new counterparty form and verify form is visible
    await addNewCounterPartyPage.clickAddNewCounterparty();
    await expect(addNewCounterPartyPage.basicInfoTabpanel).toBeVisible();
    await expect(addNewCounterPartyPage.addCounterpartyButton).toBeVisible();

    // STEP 3: Fill and verify entity selection
    await addNewCounterPartyPage.selectEntity(counterpartyData.entity);

    // STEP 4: Fill and verify basic information fields
    await addNewCounterPartyPage.fillName(counterpartyData.name);
    await expect(addNewCounterPartyPage.nameInput).toHaveValue(counterpartyData.name);

    await addNewCounterPartyPage.fillShortCode(counterpartyData.shortCode);
    await expect(addNewCounterPartyPage.shortCodeInput).toHaveValue(counterpartyData.shortCode);

    await addNewCounterPartyPage.fillBillingReference(counterpartyData.billingReference);
    await expect(addNewCounterPartyPage.billingReferenceInput).toHaveValue(counterpartyData.billingReference);

    // STEP 5: Select and verify currency dropdown
    await addNewCounterPartyPage.selectCurrency(counterpartyData.currency);

    // STEP 6: Fill and verify financial fields
    await addNewCounterPartyPage.fillDefaultMargin(counterpartyData.defaultMargin);
    await expect(addNewCounterPartyPage.defaultMarginInput).toHaveValue(counterpartyData.defaultMargin);

    await addNewCounterPartyPage.fillLendLimit(counterpartyData.lendLimit);
    await expect(addNewCounterPartyPage.lendLimitInput).toHaveValue(counterpartyData.lendLimit);

    await addNewCounterPartyPage.fillBorrowLimit(counterpartyData.borrowLimit);
    await expect(addNewCounterPartyPage.borrowLimitInput).toHaveValue(counterpartyData.borrowLimit);

    // STEP 7: Select and verify dropdown options
    await addNewCounterPartyPage.selectType(counterpartyData.type);
    await addNewCounterPartyPage.selectStatus(counterpartyData.status);
    await addNewCounterPartyPage.selectRounding(counterpartyData.rounding);

    // STEP 8: Fill and verify email fields
    await addNewCounterPartyPage.fillBusinessEmail(counterpartyData.businessEmail);
    await expect(addNewCounterPartyPage.businessEmailInput).toHaveValue(counterpartyData.businessEmail);

    await addNewCounterPartyPage.fillOperationsEmail(counterpartyData.operationsEmail);
    await expect(addNewCounterPartyPage.operationsEmailInput).toHaveValue(counterpartyData.operationsEmail);

    // STEP 9: Verify Add Counterparty button is enabled after all fields are filled
    await expect(addNewCounterPartyPage.addCounterpartyButton).toBeEnabled();
  });
});
