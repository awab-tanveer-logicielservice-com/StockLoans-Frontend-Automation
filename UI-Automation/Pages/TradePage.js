import { LOCATORS } from '../utils/locators.js';

export class TradePage {
  page;
  tradeButton;
  borrowCheckbox;
  loanCheckbox;
  counterpartyCombobox;
  quantityInput;
  symbolInput;
  rebateRateInput;
  saveButton;

  constructor(page) {
    this.page = page;
    this.tradeButton = LOCATORS.TradePage.tradeButton(page);
    this.borrowCheckbox = LOCATORS.TradePage.borrowCheckbox(page);
    this.loanCheckbox = LOCATORS.TradePage.loanCheckbox(page);
    this.counterpartyCombobox = LOCATORS.TradePage.counterpartyCombobox(page);
    this.quantityInput = LOCATORS.TradePage.quantityInput(page);
    this.symbolInput = LOCATORS.TradePage.symbolInput(page);
    this.rebateRateInput = LOCATORS.TradePage.rebateRateInput(page);
    this.saveButton = LOCATORS.TradePage.saveButton(page);

  }

  async clickTradeButton() {
    await this.tradeButton.click();
  }

  async verifyBorrowCheckboxVisible() {
    await this.borrowCheckbox.waitFor({ state: 'visible' });
  }

   async verifyLoanCheckboxVisible() {
    await this.loanCheckbox.waitFor({ state: 'visible' });
  }
  async selectBorrowCheckbox() {
    await LOCATORS.TradePage.borrowCheckboxContainer(this.page).click();
  }
  async selectLoanCheckbox(){
  await LOCATORS.TradePage.loanCheckboxContainer(this.page).click();
  }

  async searchAndSelectCounterparty(counterpartyName) {
    // Click the combobox to open the dropdown
    await this.counterpartyCombobox.click();

    // Fill the search term
    await this.counterpartyCombobox.fill(counterpartyName);

    // Wait for autocomplete to filter results
    await this.page.waitForTimeout(2000);

    // Press ArrowDown to highlight the first option in the dropdown
    await this.counterpartyCombobox.press('ArrowDown');

    // Wait a moment for the option to be highlighted
    await this.page.waitForTimeout(500);

    // Press Enter to select the highlighted option
    await this.counterpartyCombobox.press('Enter');

    // Wait for selection to be processed
    await this.page.waitForTimeout(1000);
  }

  async enterQuantity(quantity) {
    await this.quantityInput.click();
    await this.quantityInput.clear();
    await this.quantityInput.fill(quantity.toString());
  }

  async enterSymbol(symbol) {
    await this.symbolInput.click();
    await this.symbolInput.clear();
    await this.symbolInput.fill(symbol);
  }

  async enterRebateRate(rate) {
    await this.rebateRateInput.click();
    await this.rebateRateInput.clear();
    await this.rebateRateInput.fill(rate.toString());
  }

  async clickSaveButton() {
    await this.page.waitForTimeout(5000);
    await this.saveButton.click();
  }
  
  async createTradeBorrow({ counterpartyName, quantity, symbol, rebateRate}) {
    await this.clickTradeButton();
    await this.verifyBorrowCheckboxVisible();
    await this.selectBorrowCheckbox();
    await this.searchAndSelectCounterparty(counterpartyName);
    await this.enterQuantity(quantity);
    await this.enterSymbol(symbol);
    await this.enterRebateRate(rebateRate);
    await this.clickSaveButton();
  }

  async createTradeLoan({ counterpartyName, quantity, symbol, rebateRate}) {
    await this.clickTradeButton();
    await this.verifyLoanCheckboxVisible();
    await this.selectLoanCheckbox();
    await this.searchAndSelectCounterparty(counterpartyName);
    await this.enterQuantity(quantity);
    await this.enterSymbol(symbol);
    await this.enterRebateRate(rebateRate);
    await this.clickSaveButton();
  }
}