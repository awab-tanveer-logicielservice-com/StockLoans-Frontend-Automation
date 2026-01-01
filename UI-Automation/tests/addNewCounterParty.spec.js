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
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Login
    await loginPage.navigate();
    await loginPage.login(users.username, users.password);
    await page.waitForTimeout(5000);
  });

  test('create new counterparty with all required fields', async ({ page }) => {
    const counterpartyData = generateRandomCounterpartyData();

    // Create new counterparty
    await addNewCounterPartyPage.createNewCounterparty(counterpartyData);

    // Verify counterparty was created successfully
    await page.waitForTimeout(2000);
    await expect(addNewCounterPartyPage.headerRow).toBeVisible();
  });

  test('navigate to counterparties page', async ({ page }) => {
    await addNewCounterPartyPage.navigateToCounterparties();

    // Verify counterparties page is loaded
    await expect(addNewCounterPartyPage.headerRow).toBeVisible();
  });

  test('open add new counterparty form', async ({ page }) => {
    await addNewCounterPartyPage.navigateToCounterparties();
    await addNewCounterPartyPage.clickAddNewCounterparty();

    // Verify form is visible
    await expect(addNewCounterPartyPage.basicInfoTabpanel).toBeVisible();
    await expect(addNewCounterPartyPage.addCounterpartyButton).toBeVisible();
  });

  test('fill counterparty form with basic information', async ({ page }) => {
    const counterpartyData = generateRandomCounterpartyData();

    await addNewCounterPartyPage.navigateToCounterparties();
    await addNewCounterPartyPage.clickAddNewCounterparty();
    await addNewCounterPartyPage.verifyBasicInfoVisible();

    // Fill basic fields
    await addNewCounterPartyPage.selectEntity(counterpartyData.entity);
    await addNewCounterPartyPage.fillName(counterpartyData.name);
    await addNewCounterPartyPage.fillShortCode(counterpartyData.shortCode);

    // Verify fields are filled
    await expect(addNewCounterPartyPage.nameInput).toHaveValue(counterpartyData.name);
    await expect(addNewCounterPartyPage.shortCodeInput).toHaveValue(counterpartyData.shortCode);
  });

  test('fill counterparty financial limits', async ({ page }) => {
    const counterpartyData = generateRandomCounterpartyData();

    await addNewCounterPartyPage.navigateToCounterparties();
    await addNewCounterPartyPage.clickAddNewCounterparty();
    await addNewCounterPartyPage.verifyBasicInfoVisible();

    // Fill financial fields
    await addNewCounterPartyPage.fillDefaultMargin(counterpartyData.defaultMargin);
    await addNewCounterPartyPage.fillLendLimit(counterpartyData.lendLimit);
    await addNewCounterPartyPage.fillBorrowLimit(counterpartyData.borrowLimit);

    // Verify fields are filled
    await expect(addNewCounterPartyPage.defaultMarginInput).toHaveValue(counterpartyData.defaultMargin);
    await expect(addNewCounterPartyPage.lendLimitInput).toHaveValue(counterpartyData.lendLimit);
    await expect(addNewCounterPartyPage.borrowLimitInput).toHaveValue(counterpartyData.borrowLimit);
  });

  test('select dropdown options for counterparty', async ({ page }) => {
    const counterpartyData = generateRandomCounterpartyData();

    await addNewCounterPartyPage.navigateToCounterparties();
    await addNewCounterPartyPage.clickAddNewCounterparty();
    await addNewCounterPartyPage.verifyBasicInfoVisible();

    // Select dropdown options
    await addNewCounterPartyPage.selectType(counterpartyData.type);
    await addNewCounterPartyPage.selectStatus(counterpartyData.status);
    await addNewCounterPartyPage.selectRounding(counterpartyData.rounding);

    // Verify button is visible after selections
    await expect(addNewCounterPartyPage.addCounterpartyButton).toBeVisible();
  });

  test('fill email fields for counterparty', async ({ page }) => {
    const counterpartyData = generateRandomCounterpartyData();

    await addNewCounterPartyPage.navigateToCounterparties();
    await addNewCounterPartyPage.clickAddNewCounterparty();
    await addNewCounterPartyPage.verifyBasicInfoVisible();

    // Fill email fields
    await addNewCounterPartyPage.fillBusinessEmail(counterpartyData.businessEmail);
    await addNewCounterPartyPage.fillOperationsEmail(counterpartyData.operationsEmail);

    // Verify fields are filled
    await expect(addNewCounterPartyPage.businessEmailInput).toHaveValue(counterpartyData.businessEmail);
    await expect(addNewCounterPartyPage.operationsEmailInput).toHaveValue(counterpartyData.operationsEmail);
  });

  test('verify all form fields can be filled independently', async ({ page }) => {
    const counterpartyData = generateRandomCounterpartyData();

    await addNewCounterPartyPage.navigateToCounterparties();
    await addNewCounterPartyPage.clickAddNewCounterparty();
    await addNewCounterPartyPage.verifyBasicInfoVisible();

    // Test entity selection
    await addNewCounterPartyPage.selectEntity(counterpartyData.entity);

    // Test name field
    await addNewCounterPartyPage.fillName(counterpartyData.name);
    await expect(addNewCounterPartyPage.nameInput).toHaveValue(counterpartyData.name);

    // Test short code field
    await addNewCounterPartyPage.fillShortCode(counterpartyData.shortCode);
    await expect(addNewCounterPartyPage.shortCodeInput).toHaveValue(counterpartyData.shortCode);

    // Test billing reference field
    await addNewCounterPartyPage.fillBillingReference(counterpartyData.billingReference);
    await expect(addNewCounterPartyPage.billingReferenceInput).toHaveValue(counterpartyData.billingReference);

    // Test margin field
    await addNewCounterPartyPage.fillDefaultMargin(counterpartyData.defaultMargin);
    await expect(addNewCounterPartyPage.defaultMarginInput).toHaveValue(counterpartyData.defaultMargin);

    // Test limit fields
    await addNewCounterPartyPage.fillLendLimit(counterpartyData.lendLimit);
    await expect(addNewCounterPartyPage.lendLimitInput).toHaveValue(counterpartyData.lendLimit);

    await addNewCounterPartyPage.fillBorrowLimit(counterpartyData.borrowLimit);
    await expect(addNewCounterPartyPage.borrowLimitInput).toHaveValue(counterpartyData.borrowLimit);

    // Test email fields
    await addNewCounterPartyPage.fillBusinessEmail(counterpartyData.businessEmail);
    await expect(addNewCounterPartyPage.businessEmailInput).toHaveValue(counterpartyData.businessEmail);

    await addNewCounterPartyPage.fillOperationsEmail(counterpartyData.operationsEmail);
    await expect(addNewCounterPartyPage.operationsEmailInput).toHaveValue(counterpartyData.operationsEmail);

    // Verify add button is visible
    await expect(addNewCounterPartyPage.addCounterpartyButton).toBeVisible();
  });
});
