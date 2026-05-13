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
    usernameInput: (page) => page.locator('#email'),

    /**
     * Password input field
     */
    passwordInput: (page) => page.locator('#password'),

    /**
     * Login button
     */
    loginButton: (page) => page.locator('button.login-btn'),

    /**
     * Application logo on login page
     */
    logoElement: (page) => page.locator('div.logo-container'),

    /**
     * Password visibility toggle button
     */
    passwordToggleButton: (page) => page.locator('button[aria-label="Toggle password visibility"]'),

    /**
     * Firebase authentication error message
     */
    errorMessage: (page) => page.locator('p.error-text'),

    /**
     * Validation error for the email field — email input in Angular invalid state
     */
    emailValidationError: (page) => page.locator('#email.ng-invalid'),

    /**
     * Validation error for the password field — password input in Angular invalid state
     */
    passwordValidationError: (page) => page.locator('#password.ng-invalid'),
  },

  // ============================================
  // REMEMBER ME PAGE LOCATORS
  // ============================================
  RememberMePage: {
    rememberMeCheckbox: (page) => page.locator('input[name="rememberMe"]'),
    rememberMeLabel: (page) => page.locator('label.remember-label span'),
    userMenuButton: (page) => page.locator('button.user-btn'),
    logoutButton: (page) => page.locator('button.drawer-item.logout'),
  },

  // ============================================
  // CONTRACT SUMMARY PAGE LOCATORS
  // ============================================
  ContractSummaryPage: {
    grid:                (page) => page.locator('ag-grid-angular').first(),
    detailGrid:          (page) => page.locator('ag-grid-angular').nth(1),
    gridRow:             (page) => page.locator('.ag-center-cols-container .ag-row'),
    pinnedRow:           (page) => page.locator('.ag-floating-bottom .ag-row'),
    emptyStateOverlay:   (page) => page.locator('.ag-overlay-no-rows-wrapper'),
    columnHeader:        (page, text) => page.locator('.ag-header-cell-text').filter({ hasText: text }),
    columnGroupHeader:   (page, text) => page.locator('.ag-header-group-cell-label, .ag-column-group-header-name').filter({ hasText: text }),
    symbolCusipFilter:   (page) => page.locator('input[placeholder="Symbol / CUSIP"]'),
    dtcFilter:           (page) => page.locator('mat-form-field').filter({ hasText: 'DTC' }).locator('input'),
    loanetIdFilter:      (page) => page.locator('mat-form-field').filter({ hasText: 'LoanetId' }).locator('input'),
    contractNoFilter:    (page) => page.locator('mat-form-field').filter({ hasText: 'Contract No' }).locator('input'),
    profitCenterFilter:  (page) => page.locator('mat-form-field').filter({ hasText: 'PRC' }).locator('mat-select'),
    effectiveDateInput:  (page) => page.locator('mat-form-field').filter({ hasText: 'Effective Date' }).locator('input'),
    applyButton:         (page) => page.locator('button.mat-mdc-button').filter({ hasText: 'Apply' }),
    clearButton:         (page) => page.locator('button.mat-mdc-button').filter({ hasText: 'Clear' }).first(),
    detailsToggle:       (page) => page.locator('mat-slide-toggle.details-toggle'),
    depositoryButtons:   (page) => page.locator('button.mat-button-toggle-button'),
    getDepositoryButton: (page, code) => page.locator(`button.mat-button-toggle-button:has-text("${code}")`),
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
    firstExpandIcon: (page) => page.locator('span').filter({ hasText: 'AAPL' }).first(),

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
     * Strategy: More robust locator that finds symbol in AG-Grid row group
     * @param {Page} page - The page object
     * @param {string} symbol - The symbol text to filter
     */
    getSymbolLocator: (page, symbol) => page.locator('span.ag-cell-wrapper.ag-row-group.ag-row-group-indent-0').locator(`span:has-text("${symbol}")`),

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
  // FPL ACCOUNT PAGE LOCATORS
  // ============================================
  FPLAccountPage: {
    /**
     * Menu button for navigation
     * Strategy: Chained getByRole with filter
     */
    menuButton: (page) => page.getByRole('button').filter({ hasText: 'menu' }),

    /**
     * FPL Accounts navigation link
     * Strategy: Playwright's getByRole for link
     */
    fplAccountsLink: (page) => page.getByRole('link', { name: 'FPL Accounts' }),

    /**
     * Main account table header row
     * Strategy: Playwright's getByRole for row
     */
    accountRow: (page) => page.getByRole('row', { name: 'Account Number Office Corr' }),

    /**
     * Sidebar overlay element
     * Strategy: CSS selector for fuse sidebar overlay
     */
    fuseSidebarOverlay: (page) => page.locator('.fuse-sidebar-overlay'),

    /**
     * AG-Grid center columns viewport
     * Strategy: CSS selector for grid viewport
     */
    centerColsViewport: (page) => page.locator('.ag-center-cols-viewport'),

    /**
     * GTN account row
     * Strategy: Playwright's getByRole for row
     */
    gtnRow: (page) => page.getByRole('row', { name: 'GTN GTNA M A' }),

    /**
     * OMNIHK text element (first occurrence)
     * Strategy: Playwright's getByText with first()
     */
    omnihkText: (page) => page.getByText('OMNIHK').first(),

    /**
     * OMNIHK text element (second occurrence)
     * Strategy: Playwright's getByText with nth(1)
     */
    omnihkTextSecond: (page) => page.getByText('OMNIHK').nth(1),

    /**
     * GTN FPL Test account row
     * Strategy: Playwright's getByRole for row
     */
    gtnFplTestRow: (page) => page.getByRole('row', { name: 'GTN GTNA M A 0.5 FPL Test' }),

    /**
     * AG-Grid floating filter input field
     * Strategy: CSS selector for filter input
     */
    filterInput: (page) => page.locator('.ag-floating-filter-input').first(),

    /**
     * Get gridcell by name - dynamic locator
     * Strategy: Playwright's getByRole for gridcell
     * @param {Page} page - The page object
     * @param {string} cellName - The text content of the cell
     * @param {boolean} exact - Whether to match exactly (default: false)
     */
    getGridcell: (page, cellName, exact = false) => page.getByRole('gridcell', { name: cellName, exact }),

    /**
     * Specific row for FPL VCSO account
     * Strategy: Playwright's getByRole for row
     */
    fplVcsoRow: (page) => page.getByRole('row', { name: 'FPL VCSO L A 0.5 SOFI FPL' }),

    /**
     * Paragraph within specific row
     * Strategy: Combined locator for row with paragraph
     */
    fplVcsoRowParagraph: (page) => page.getByRole('row', { name: 'FPL VCSO L A 0.5 SOFI FPL' }).getByRole('paragraph'),

    /**
     * FPL VCSO verification row
     * Strategy: Playwright's getByRole for row
     */
    fplVcsoVerifyRow: (page) => page.getByRole('row', { name: 'FPL VCSO L A' }),

    /**
     * Get option from dropdown by name
     * Strategy: Playwright's getByRole for option
     * @param {Page} page - The page object
     * @param {string} optionName - The option name to select
     */
    getDropdownOption: (page, optionName) => page.getByRole('option', { name: optionName }),

    /**
     * Mat-select dropdown by ID
     * Strategy: CSS selector with ID
     * @param {Page} page - The page object
     * @param {number} selectId - The select ID number
     */
    getMatSelect: (page, selectId) => page.locator(`#mat-select-${selectId}`),

    /**
     * Focused AG-Grid cell
     * Strategy: CSS selector for cell with focus
     */
    focusedGridCell: (page) => page.locator('.ag-cell.ag-cell-with-height.ag-cell-value.ag-cell-range-right.ag-cell-focus'),
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
     * Counterparty option from dropdown
     * Strategy: Dynamic locator for selecting counterparty option
     * @param {Page} page - The page object
     * @param {string} counterpartyName - The counterparty name to select
     */
    getCounterpartyOption: (page, counterpartyName) => page.getByRole('option', { name: counterpartyName }),

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
     * Strategy: Playwright's getByRole for textbox (clickable trigger)
     */
    statusDropdown: (page) => page.getByRole('textbox', { name: 'Status' }),

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
     * Strategy: CSS selector - targets the active/showing backdrop
     */
    backdropOverlay: (page) => page.locator('.cdk-overlay-backdrop.cdk-overlay-backdrop-showing'),
  },

  // ============================================
  // ADD NEW SECURITY PAGE LOCATORS
  // ============================================
  AddNewSecurityPage: {
    /**
     * Menu button for navigation
     * Strategy: Chained getByRole with filter
     */
    menuButton: (page) => page.getByRole('button').filter({ hasText: 'menu' }),

    /**
     * Security Master navigation link
     * Strategy: Playwright's getByRole for link
     */
    securityMasterLink: (page) => page.getByRole('link', { name: 'Security Master' }),

    /**
     * Add New Security button
     * Strategy: Playwright's getByRole for button
     */
    addNewSecurityButton: (page) => page.getByRole('button', { name: 'Add New Security' }),

    /**
     * Search input field
     * Strategy: Playwright's getByRole for textbox
     */
    searchInput: (page) => page.getByRole('textbox', { name: 'Search' }),

    /**
     * Search button
     * Strategy: Playwright's getByRole for button
     */
    searchButton: (page) => page.getByRole('button', { name: 'Search' }),

    /**
     * Update Contracts checkbox
     * Strategy: Playwright's getByRole for checkbox
     */
    updateContractsCheckbox: (page) => page.getByRole('checkbox', { name: 'Update Contracts' }),

    /**
     * Symbol input field — accessible name is "Symbol *" in the Add New Security dialog
     * Strategy: exact match on the required-field label to avoid ambiguity with header/Trade panel "Symbol" inputs
     */
    symbolInput: (page) => page.getByRole('textbox', { name: 'Symbol *', exact: true }),

    /**
     * CUSIP input field — accessible name is "CUSIP *" in the Add New Security dialog
     * Strategy: exact match on the required-field label
     */
    cusipInput: (page) => page.getByRole('textbox', { name: 'CUSIP *', exact: true }),

    /**
     * Description input field
     * Strategy: Playwright's getByRole for textbox
     */
    descriptionInput: (page) => page.getByRole('textbox', { name: 'Description' }),

    /**
     * Exchange input field
     * Strategy: Playwright's getByRole for textbox
     */
    exchangeInput: (page) => page.getByRole('textbox', { name: 'Exchange' }),

    /**
     * Volume input field
     * Strategy: Playwright's getByRole for spinbutton
     */
    volumeInput: (page) => page.getByRole('spinbutton', { name: 'Volume' }),

    /**
     * Close Price input field
     * Strategy: Playwright's getByRole for spinbutton
     */
    closePriceInput: (page) => page.getByRole('spinbutton', { name: 'Close Price' }),

    /**
     * Close Date input field
     * Strategy: Playwright's getByRole for textbox
     */
    closeDateInput: (page) => page.getByRole('textbox', { name: 'Close Date' }),

    /**
     * Status input field
     * Strategy: Playwright's getByRole for textbox
     */
    statusInput: (page) => page.getByRole('textbox', { name: 'Status' }),

    /**
     * Restrictions listbox
     * Strategy: Playwright's getByRole for listbox
     */
    restrictionsListbox: (page) => page.getByRole('listbox', { name: 'Restrictions' }),

    /**
     * Save/Add button in the Add New Security dialog
     * Strategy: matches "Save Security" button rendered in the modal
     */
    addButton: (page) => page.getByRole('button', { name: 'Save Security' }),

    /**
     * Slide toggle bar for update contracts
     * Strategy: CSS selector
     */
    slideToggleBar: (page) => page.locator('.mat-slide-toggle-bar'),

    /**
     * Security Master page header/title
     * Strategy: getByRole heading — confirms the page has loaded
     */
    securityMasterHeader: (page) => page.getByRole('heading', { name: 'Security Master' }),

    /**
     * AG-Grid root wrapper — present once search results are rendered
     * Strategy: CSS selector for AG-Grid container
     */
    searchResultsGrid: (page) => page.locator('.ag-root-wrapper'),

    /**
     * Dynamic locator — result row matching a given symbol text
     * Strategy: getByRole row with the symbol name
     * @param {Page} page
     * @param {string} symbol - the symbol text to locate
     */
    getResultRowBySymbol: (page, symbol) => page.getByRole('row', { name: symbol }),

    /**
     * No-results overlay shown by AG-Grid when a search returns nothing
     * Strategy: CSS selector for AG-Grid empty overlay
     */
    noResultsMessage: (page) => page.locator('.ag-overlay-no-rows-wrapper'),

    /**
     * Validation error displayed below the Symbol field when it is left blank
     * Strategy: mat-error element filtered by text content
     */
    symbolValidationError: (page) => page.locator('mat-error').filter({ hasText: /symbol/i }).first(),

    /**
     * Validation error displayed below the CUSIP field when it is left blank
     * Strategy: mat-error element filtered by text content
     */
    cusipValidationError: (page) => page.locator('mat-error').filter({ hasText: /cusip/i }).first(),

    /**
     * Slide toggle in its checked/active state — confirms Update Contracts is enabled
     * Strategy: CSS selector combining the toggle component with the checked modifier class
     */
    updateContractsToggleActive: (page) => page.locator('.mat-slide-toggle.mat-checked'),

    /**
     * First row in the Ag-Grid search results — used to select a security record
     * Strategy: CSS selector targeting center-cols container rows
     */
    firstSearchResultRow: (page) => page.locator('.ag-center-cols-container .ag-row').first(),

    /**
     * Second row in the Ag-Grid search results — used to select a different security
     * Strategy: nth selector
     */
    secondSearchResultRow: (page) => page.locator('.ag-center-cols-container .ag-row').nth(1),

    /**
     * Existing Symbol input in the contract update sub-view
     * Strategy: getByRole textbox with accessible name
     */
    existingSymbolInput: (page) => page.getByRole('textbox', { name: /existing.*symbol/i }),

    /**
     * Existing CUSIP input in the contract update sub-view
     * Strategy: getByRole textbox with accessible name
     */
    existingCusipInput: (page) => page.getByRole('textbox', { name: /existing.*cusip/i }),

    /**
     * Update button in the contract update sub-view
     * Strategy: getByRole button with exact name
     */
    updateButton: (page) => page.getByRole('button', { name: /^update$/i }),

    /**
     * Modal/dialog container — present when Add New Security modal is open
     * Strategy: Angular Material dialog container
     */
    modalContainer: (page) => page.locator('mat-dialog-container'),
  },

  // ============================================
  // LENDING PIT LOOKUP PAGE LOCATORS
  // ============================================
  LendingPitLookupPage: {
    /**
     * Menu button for navigation
     * Strategy: Chained getByRole with filter
     */
    menuButton: (page) => page.getByRole('button').filter({ hasText: 'menu' }),

    /**
     * Lending Pit Lookup navigation link
     * Strategy: Playwright's getByRole for link
     */
    lendingPitLookupLink: (page) => page.getByRole('link', { name: 'Lending Pit' }),

    /**
     * Symbol or Cusip search input
     * Strategy: Playwright's getByRole for textbox
     */
    symbolOrCusipInput: (page) => page.getByRole('textbox', { name: 'Symbol or Cusip' }),

    /**
     * Fetch Rates / submit button for the Lending Pit form
     * Strategy: Playwright's getByRole for button
     */
    submitButton: (page) => page.getByRole('button', { name: 'Fetch Rates' }),

    /**
     * Clear button on the Lending Pit search form
     * Strategy: Playwright's getByRole for button within the form area
     */
    clearButton: (page) => page.locator('aside, [role="complementary"]').getByRole('button', { name: 'Clear' }),

    /**
     * Header row for search results table (legacy / ag-grid column header)
     * Strategy: Playwright's getByRole for row
     */
    searchHeaderRow: (page) => page.getByRole('row', { name: 'Symbol Cusip Description' }),

    /**
     * Results header row (legacy)
     * Strategy: Playwright's getByRole for row
     */
    resultsHeaderRow: (page) => page.getByRole('row', { name: 'Cusip Description Rebate Avg' }),

    /**
     * "No Data Available" custom empty-state heading shown before any search
     * Strategy: CSS heading selector
     */
    emptyStateHeading: (page) => page.getByRole('heading', { name: 'No Data Available' }),

    /**
     * "Start Searching" prompt button inside the custom empty state
     * Strategy: Playwright's getByRole for button
     */
    startSearchingButton: (page) => page.getByRole('button', { name: 'Start Searching' }),

    /**
     * Page heading for the Lending Pit page
     * Strategy: h2 heading with text "Lending Pit"
     */
    pageHeading: (page) => page.getByRole('heading', { name: 'Lending Pit' }),

    /**
     * Get gridcell by name - dynamic locator
     * Strategy: Playwright's getByRole for gridcell
     * @param {Page} page - The page object
     * @param {string} cellName - The text content of the cell
     */
    getGridcell: (page, cellName) => page.getByRole('gridcell', { name: cellName }),
  },

  // ============================================
  // MEMO SEG PAGE LOCATORS
  // ============================================
  MemoSegPage: {
    memoSegLink: (page) => page.getByRole('link', { name: 'Memo Seg' }),
    textInput: (page) => page.getByRole('textbox', { name: 'TODO: add selector — Memo Seg Symbol Quantity text input area' }),
    submitButton: (page) => page.getByRole('button', { name: 'TODO: add selector — Submit/Process button for memo seg batch' }),
    summaryGrid: (page) => page.locator('TODO: add selector — Summary grid container (first AG-Grid on Memo Seg page)'),
    detailGrid: (page) => page.locator('TODO: add selector — Detail grid container (second AG-Grid on Memo Seg page)'),
    unSegButton: (page) => page.getByRole('button', { name: 'UN-SEG' }),
    validationError: (page) => page.locator('mat-error').first(),
    emptyGridOverlay: (page) => page.locator('.ag-overlay-no-rows-wrapper'),
    detailGridHeaders: (page) => page.locator('TODO: add selector — Detail grid header row with column names'),
    firstGroupedRow: (page) => page.locator('.ag-row-group').first(),
    quantityValidationError: (page) => page.locator('mat-error').filter({ hasText: /quantity/i }).first(),
    symbolValidationError: (page) => page.locator('mat-error').filter({ hasText: /symbol/i }).first(),
    getSummaryGridCellBySymbol: (page, symbol) => page.getByRole('gridcell', { name: symbol }).first(),
    getDetailGridCellBySymbol: (page, symbol) => page.getByRole('gridcell', { name: symbol }).first(),
  },

  // ============================================
  // SHORT INTEREST RATE ADJUSTMENT PAGE LOCATORS
  // ============================================
  ShortInterestRateAdjustmentPage: {
    rateAdjustmentLink: (page) => page.getByRole('link', { name: 'Short Interest Rate Adjustment' }),
    rateGrid: (page) => page.locator('TODO: add selector — Ag-Grid root container for rate adjustment grid'),
    gridHeaderRow: (page) => page.locator('TODO: add selector — Ag-Grid header row with rate adjustment column names'),
    rateInputField: (page) => page.getByRole('spinbutton', { name: 'TODO: add selector — Rate input field label' }),
    saveButton: (page) => page.getByRole('button', { name: 'TODO: add selector — Save/Apply button for rate adjustment' }),
    successMessage: (page) => page.locator('TODO: add selector — Success toast/notification after rate save'),
    validationError: (page) => page.locator('mat-error').first(),
    rowSelectionWarning: (page) => page.locator('TODO: add selector — Warning message when save is attempted without row selection'),
    emptyGridOverlay: (page) => page.locator('.ag-overlay-no-rows-wrapper'),
    dataLoadError: (page) => page.locator('TODO: add selector — Error message shown when V1 endpoint fails'),
    pageContainer: (page) => page.locator('TODO: add selector — Main page container with V2 theme class'),
    agGridRoot: (page) => page.locator('.ag-root-wrapper'),
    accessRestrictionMessage: (page) => page.locator('TODO: add selector — Access restriction/read-only message for unauthorized users'),
  },

  // ============================================
  // CONTRACT DETAILS PAGE LOCATORS
  // ============================================
  ContractDetailsPage: {
    grid:                 (page) => page.locator('ag-grid-angular').first(),
    gridRow:              (page) => page.locator('.ag-center-cols-container .ag-row'),
    pinnedRow:            (page) => page.locator('.ag-floating-bottom .ag-row'),
    emptyStateOverlay:    (page) => page.locator('.ag-overlay-no-rows-wrapper'),
    columnHeader:         (page, text) => page.locator('.ag-header-cell-text').filter({ hasText: text }),
    symbolCusipFilter:    (page) => page.locator('input[placeholder="Symbol / CUSIP"], input[placeholder="Symbol or Cusip"], input[placeholder="Symbol or CUSIP"]').first(),
    dtcFilter:            (page) => page.locator('mat-form-field').filter({ hasText: 'DTC' }).locator('input'),
    loanetIdFilter:       (page) => page.locator('mat-form-field').filter({ hasText: 'LoanetId' }).locator('input'),
    contractNoFilter:     (page) => page.locator('mat-form-field').filter({ hasText: 'Contract No' }).locator('input'),
    profitCenterFilter:   (page) => page.locator('mat-form-field').filter({ hasText: 'PRC' }).locator('mat-select'),
    effectiveDateInput:   (page) => page.locator('mat-form-field').filter({ hasText: 'Effective Date' }).locator('input'),
    applyButton:          (page) => page.locator('button').filter({ hasText: 'Apply' }).first(),
    clearButton:          (page) => page.locator('button').filter({ hasText: 'Clear' }).first(),
    depositoryButtons:    (page) => page.locator('mat-radio-button, [role="radio"]'),
    tradeButton:          (page) => page.locator('button').filter({ hasText: 'Trade' }).first(),
    rerateButton:         (page) => page.locator('button').filter({ hasText: 'ReRate' }).first(),
    recallButton:         (page) => page.locator('button').filter({ hasText: 'Recall' }).first(),
    returnButton:         (page) => page.locator('button').filter({ hasText: 'Return' }).first(),
    liveQuoteBanner:      (page) => page.locator('text=Snapshot:').first(),
    historyDetailGrid:    (page) => page.locator('.ag-details-row'),
    rerateDialog:         (page) => page.locator('mat-dialog-container').filter({ hasText: 'ReRate' }),
    recallDialog:         (page) => page.locator('mat-dialog-container').filter({ hasText: 'Recall' }),
    returnDialog:         (page) => page.locator('mat-dialog-container').filter({ hasText: 'Return' }),
    tradePanel:           (page) => page.locator('mat-sidenav, mat-drawer, [class*="trade-panel"]').first(),
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
