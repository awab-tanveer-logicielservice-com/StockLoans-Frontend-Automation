/**
 * Global Locators Configuration
 *
 * This file contains all UI locators for the StockLoan Playwright Framework.
 * Each page section contains functions that return locators when given a page object.
 *
 * Usage in Page Classes:
 * import { LOCATORS } from '../Config/locators';
 *
 * constructor(page) {
 *   this.page = page;
 *   this.usernameInput = LOCATORS.LoginPage.usernameInput(page);
 * }
 *
 * For dynamic locators with parameters:
 * await LOCATORS.DashboardPage.getRowByName(this.page, 'MyRow').click();
 */

export const LOCATORS = {

  // ============================================
  // LOGIN PAGE LOCATORS
  // ============================================
  LoginPage: {
    /**
     * Username input field
     * Strategy: XPath with ID selector
     */
    usernameInput: (page) => page.locator('//input[@id="mat-input-1"]'),

    /**
     * Password input field
     * Strategy: XPath with ID selector
     */
    passwordInput: (page) => page.locator('//input[@id="mat-input-2"]'),

    /**
     * Login button
     * Strategy: XPath with aria-label
     */
    loginButton: (page) => page.locator('//button[@aria-label="LOG IN"]'),
  },

  // ============================================
  // DASHBOARD PAGE LOCATORS
  // ============================================
  DashboardPage: {
    /**
     * Main table header in positions section
     * Strategy: XPath with ID and element name
     */
    tableHeader: (page) => page.locator("//div[@id='positions']//app-contract-filter"),

    /**
     * Symbol or CUSIP search input field
     * Strategy: XPath with placeholder attribute
     */
    symbolSearchInput: (page) => page.locator("//input[@placeholder='Symbol or Cusip']"),

    /**
     * Apply button for filtering
     * Strategy: XPath with text content matching
     */
    applyButton: (page) => page.locator("//button//*[contains(normalize-space(),'Apply')]"),

    /**
     * First expand icon for AAPL symbol
     * Strategy: XPath with role and text content
     * Note: This is specific to AAPL - consider parameterizing in future
     */
    firstExpandIcon: (page) => page.locator("(//div[@role='gridcell' and contains(., 'AAPR')])[1]"),

    /**
     * Expanded row icon indicator
     * Strategy: XPath with class-based selection
     */
    expandedRowIcon: (page) => page.locator("//div[contains(@class,'ag-row-focus')]//span[@class='ag-icon ag-icon-expanded']"),

    /**
     * Get row by name - dynamic locator
     * Strategy: Playwright's getByRole for semantic selection
     * @param {Page} page - The page object
     * @param {string} rowName - The name/text of the row to find
     */
    getRowByName: (page, rowName) => page.getByRole('row', { name: rowName }),

    /**
     * Filter symbol locator by text
     * Strategy: Chained locator with filter
     * @param {Page} page - The page object
     * @param {string} symbol - The symbol text to filter
     */
    getSymbolLocator: (page, symbol) => page.locator("//span[@class='ag-group-value'][normalize-space()='AAPR']").filter({ hasText: symbol }),

    /**
     * Get symbol by text with index
     * Strategy: getByText with nth selector
     * @param {Page} page - The page object
     * @param {string} symbol - The symbol text
     */
    getSymbolByText: (page, symbol) => page.getByText(symbol),

    /**
     * Broker details header row
     * Strategy: getByRole for table row with specific header text
     * @param {Page} page - The page object
     */
    getBrokerDetailsHeader: (page) => page.getByRole('row', { name: ' Symbol S Broker DTC' }),
  },

  // ============================================
  // TRADE PAGE LOCATORS
  // ============================================
  TradePage: {
    /**
     * Main Trade button to open trade dialog
     * Strategy: Playwright's getByRole with accessible name
     */
    tradeButton: (page) => page.getByRole('button', { name: 'Trade' }),

    /**
     * Borrow checkbox in trade form
     * Strategy: Playwright's getByRole for checkbox
     */
    borrowCheckbox: (page) => page.getByRole('checkbox', { name: 'Borrow' }),

    /**
     * Loan checkbox in trade form
     * Strategy: Playwright's getByRole for checkbox
     */
    loanCheckbox: (page) => page.getByRole('checkbox', { name: 'Loan' }),

    /**
     * Counterparty combobox/dropdown
     * Strategy: XPath with ID selector
     * Note: mat-input-9 is Material Design input ID
     */
    counterpartyCombobox: (page) => page.locator("//*[@id='mat-input-9']"),

    /**
     * Quantity input field (spinbutton)
     * Strategy: Playwright's getByRole for spinbutton
     */
    quantityInput: (page) => page.getByRole('spinbutton', { name: 'Quantity' }),

    /**
     * Symbol/CUSIP input field
     * Strategy: Playwright's getByLabel for form field
     */
    symbolInput: (page) => page.getByLabel('Symbol/Cusip *'),

    /**
     * Rebate rate input field (spinbutton)
     * Strategy: Playwright's getByRole for spinbutton
     */
    rebateRateInput: (page) => page.getByRole('spinbutton', { name: 'Rebate Rate' }),

    /**
     * Save button in trade form
     * Strategy: XPath with aria-label
     */
    saveButton: (page) => page.locator("//button[@aria-label='SAVE']"),

    /**
     * First checkbox inner container for Borrow
     * Strategy: CSS selector for Material Design checkbox
     * Note: Used for direct click on checkbox element
     */
    borrowCheckboxContainer: (page) => page.locator('.mat-checkbox-inner-container').first(),

    /**
     * Loan checkbox inner container by ID
     * Strategy: CSS selector with specific checkbox ID
     */
    loanCheckboxContainer: (page) => page.locator('#mat-checkbox-2 > .mat-checkbox-layout > .mat-checkbox-inner-container').first(),
  },

  // ============================================
  // ADD NEW ENTITY PAGE LOCATORS
  // ============================================
  AddNewEntityPage: {
    /**
     * Add New Entity button
     * Strategy: Playwright's getByRole with button name
     */
    addNewEntityButton: (page) => page.getByRole('button', { name: 'ADD NEW ENTITY' }),

    /**
     * Entity name input field
     * Strategy: Playwright's getByRole for textbox with accessible name
     */
    entityNameInput: (page) => page.getByRole('textbox', { name: 'Entity Name' }),

    /**
     * Status dropdown trigger
     * Strategy: Playwright's getByText
     */
    statusDropdown: (page) => page.getByText('Status'),

    /**
     * Active option in status dropdown
     * Strategy: Playwright's getByText with exact match
     */
    activeOption: (page) => page.getByText('Active', { exact: true }),

    /**
     * Add button in entity form
     * Strategy: Playwright's getByRole for better reliability
     */
    addButton: (page) => page.getByRole('button', { name: 'Add' }),

    /**
     * Menu button (hamburger/navigation)
     * Strategy: Chained getByRole with filter
     */
    menuButton: (page) => page.getByRole('button').filter({ hasText: 'menu' }),

    /**
     * Entities navigation link
     * Strategy: Playwright's getByRole for link
     */
    entitiesLink: (page) => page.getByRole('link', { name: 'Entities' }),
  },

  // ============================================
  // BULK IMPORT PAGE LOCATORS
  // ============================================
  BulkImportPage: {
    /**
     * Menu button for navigation
     * Strategy: Chained getByRole with filter
     */
    menuButton: (page) => page.getByRole('button').filter({ hasText: 'menu' }),

    /**
     * Bulk Import navigation link
     * Strategy: Playwright's getByRole for link
     */
    bulkImportLink: (page) => page.getByRole('link', { name: 'Bulk Import' }),

    /**
     * Header row in bulk import table
     * Strategy: Playwright's getByRole for table row
     */
    headerRow: (page) => page.getByRole('row', { name: 'Symbol Cusip S Broker B Rate' }),

    /**
     * Borrow button/tab selector
     * Strategy: Playwright's getByRole for button
     */
    borrowButton: (page) => page.getByRole('button', { name: 'Borrow' }),

    /**
     * Loan button/tab selector
     * Strategy: Playwright's getByRole for button
     */
    loanButton: (page) => page.getByRole('button', { name: 'Loan' }),

    /**
     * Counterparty combobox field
     * Strategy: Playwright's getByRole for combobox
     */
    counterpartyCombobox: (page) => page.getByRole('combobox', { name: 'Counterparty' }),

    /**
     * Symbol/CUSIP Quantity Rate text input
     * Strategy: Playwright's getByRole for textbox
     */
    symbolCusipQtyRateTextbox: (page) => page.getByRole('textbox', { name: 'Symbol/Cusip Qty Rate' }),

    /**
     * Import button with count indicator
     * Strategy: Playwright's getByRole for button
     */
    importButton: (page) => page.getByRole('button', { name: 'Import (1)' }),
  },

  // ============================================
  // ADD NEW USER PAGE LOCATORS
  // ============================================
  AddNewUserPage: {
    /**
     * Add New User button
     * Strategy: Playwright's getByRole with button name
     */
    addNewUserButton: (page) => page.getByRole('button', { name: 'ADD NEW USER' }),

    /**
     * Email input field for new user
     * Strategy: Playwright's getByRole for textbox with accessible name
     */
    emailInput: (page) => page.getByRole('textbox', { name: 'Email' }),

    /**
     * First Name input field
     * Strategy: Playwright's getByRole for textbox with accessible name
     */
    firstNameInput: (page) => page.getByRole('textbox', { name: 'First Name' }),

    /**
     * Last Name input field
     * Strategy: Playwright's getByRole for textbox with accessible name
     */
    lastNameInput: (page) => page.getByRole('textbox', { name: 'Last Name' }),

    /**
     * Title input field
     * Strategy: Playwright's getByRole for textbox with accessible name
     */
    titleInput: (page) => page.getByRole('textbox', { name: 'Title' }),

    /**
     * Nickname input field
     * Strategy: Playwright's getByRole for textbox with accessible name
     */
    nicknameInput: (page) => page.getByRole('textbox', { name: 'Nickname' }),

    /**
     * Add User button in form
     * Strategy: Playwright's getByRole for button
     */
    addUserButton: (page) => page.getByRole('button', { name: 'ADD USER' }),

    /**
     * Menu button for navigation
     * Strategy: Chained getByRole with filter
     */
    menuButton: (page) => page.getByRole('button').filter({ hasText: 'menu' }),

    /**
     * Users navigation link
     * Strategy: Playwright's getByRole for link
     */
    usersLink: (page) => page.getByRole('link', { name: 'Users' }),

    /**
     * Basic Info tabpanel
     * Strategy: Playwright's getByRole for tabpanel
     */
    basicInfoTabpanel: (page) => page.getByRole('tabpanel', { name: 'Basic Info' }),
  },

  // ============================================
  // ADD NEW COUNTERPARTY PAGE LOCATORS
  // ============================================
  AddNewCounterPartyPage: {
    /**
     * Add New Counterparty button
     * Strategy: Playwright's getByRole with button name
     */
    addNewCounterpartyButton: (page) => page.getByRole('button', { name: 'ADD NEW COUNTERPARTY' }),

    /**
     * Menu button for navigation
     * Strategy: Chained getByRole with filter
     */
    menuButton: (page) => page.getByRole('button').filter({ hasText: 'menu' }),

    /**
     * Counterparties navigation link
     * Strategy: Playwright's getByRole for link
     */
    counterpartiesLink: (page) => page.getByRole('link', { name: 'Counterparties' }),

    /**
     * Counterparties table header row
     * Strategy: Playwright's getByRole for table row
     */
    headerRow: (page) => page.getByRole('row', { name: 'Name Borrow Limit Lend Limit' }),

    /**
     * Basic Info tabpanel
     * Strategy: Playwright's getByRole for tabpanel
     */
    basicInfoTabpanel: (page) => page.getByRole('tabpanel', { name: 'Basic Info' }),

    /**
     * Entity dropdown trigger
     * Strategy: Filter with text matching
     */
    entityDropdown: (page) => page.locator('div').filter({ hasText: /^Entity$/ }).nth(1),

    /**
     * Entity option by name
     * Strategy: Dynamic locator for selecting entity option
     * @param {Page} page - The page object
     * @param {string} entityName - The entity name to select
     */
    getEntityOption: (page, entityName) => page.getByRole('option', { name: entityName }),

    /**
     * Name input field
     * Strategy: Playwright's getByRole for textbox
     */
    nameInput: (page) => page.getByRole('textbox', { name: 'Name' }),

    /**
     * Short Code input field
     * Strategy: Playwright's getByRole for textbox
     */
    shortCodeInput: (page) => page.getByRole('textbox', { name: 'Short Code' }),

    /**
     * Billing Reference input field
     * Strategy: Playwright's getByRole for textbox
     */
    billingReferenceInput: (page) => page.getByRole('textbox', { name: 'Billing Reference' }),

    /**
     * Currency dropdown trigger
     * Strategy: Filter with text matching
     */
    currencyDropdown: (page) => page.locator('div').filter({ hasText: /^USD$/ }).nth(1),

    /**
     * Currency option
     * Strategy: Playwright's getByRole for option
     */
    currencyOption: (page, currency = 'USD') => page.getByRole('option', { name: currency }),

    /**
     * Default Margin input field
     * Strategy: Playwright's getByRole for textbox
     */
    defaultMarginInput: (page) => page.getByRole('textbox', { name: 'Default Margin' }),

    /**
     * Lend Limit input field
     * Strategy: Playwright's getByRole for textbox
     */
    lendLimitInput: (page) => page.getByRole('textbox', { name: 'Lend Limit' }),

    /**
     * Borrow Limit input field
     * Strategy: Playwright's getByRole for textbox
     */
    borrowLimitInput: (page) => page.getByRole('textbox', { name: 'Borrow Limit' }),

    /**
     * Type dropdown trigger
     * Strategy: Filter with text matching
     */
    typeDropdown: (page) => page.locator('div').filter({ hasText: /^Regular$/ }).nth(1),

    /**
     * Type option (Regular)
     * Strategy: Playwright's getByRole for option
     */
    typeOption: (page, type = 'Regular') => page.getByRole('option', { name: type }),

    /**
     * Status dropdown trigger
     * Strategy: getByText
     */
    statusDropdown: (page) => page.getByText('ActiveStatus *'),

    /**
     * Status option (Active)
     * Strategy: Playwright's getByRole for option with exact match
     */
    statusOption: (page, status = 'Active') => page.getByRole('option', { name: status, exact: true }),

    /**
     * Rounding dropdown trigger
     * Strategy: Filter with text matching
     */
    roundingDropdown: (page) => page.locator('div').filter({ hasText: /^No rounding$/ }).nth(1),

    /**
     * Rounding option
     * Strategy: Playwright's getByRole for option
     */
    roundingOption: (page, rounding = 'No rounding') => page.getByRole('option', { name: rounding }),

    /**
     * Business Email input field
     * Strategy: Playwright's getByRole for textbox
     */
    businessEmailInput: (page) => page.getByRole('textbox', { name: 'Business Email' }),

    /**
     * Operations Email input field
     * Strategy: Playwright's getByRole for textbox
     */
    operationsEmailInput: (page) => page.getByRole('textbox', { name: 'Operations Email' }),

    /**
     * Add Counterparty button in form
     * Strategy: Playwright's getByRole for button
     */
    addCounterpartyButton: (page) => page.getByRole('button', { name: 'ADD COUNTERPARTY' }),

    /**
     * Backdrop overlay for closing dropdowns
     * Strategy: CSS selector
     */
    backdropOverlay: (page) => page.locator('.cdk-overlay-backdrop'),
  },

  // ============================================
  // COMMON/SHARED LOCATORS
  // ============================================
  Common: {
    /**
     * Generic success message locator
     * Strategy: getByText for toast/notification messages
     * @param {Page} page - The page object
     * @param {string} text - The success message text (default: 'Submitted Successfully')
     */
    successMessage: (page, text = 'Submitted Successfully') => page.getByText(text),

    /**
     * Generic menu button (reusable)
     * Strategy: Chained getByRole with filter
     */
    menuButton: (page) => page.getByRole('button').filter({ hasText: 'menu' }),
  },
};
