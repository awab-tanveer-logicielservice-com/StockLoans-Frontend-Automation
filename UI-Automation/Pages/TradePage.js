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

  async searchCounterparty(counterpartyName) {
    await this.page.waitForTimeout(2000);
    await this.counterpartyCombobox.click();
    await this.counterpartyCombobox.fill(counterpartyName);
    await this.page.waitForTimeout(2000);
  }

  async selectCounterparty(counterpartyFullName) {
    await this.counterpartyCombobox.press('Tab');
    await this.counterpartyCombobox.fill(counterpartyFullName);
    await this.page.waitForTimeout(1500);
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
  
  async createTradeBorrow({ counterpartyName, counterpartyFullName, quantity, symbol, rebateRate}) {
    await this.clickTradeButton();
    await this.verifyBorrowCheckboxVisible();
    await this.selectBorrowCheckbox();
    await this.searchCounterparty(counterpartyName);
    await this.selectCounterparty(counterpartyFullName);
    await this.enterQuantity(quantity);
    await this.enterSymbol(symbol);
    await this.enterRebateRate(rebateRate);
    await this.clickSaveButton();
  }

  async createTradeLoan({ counterpartyName, counterpartyFullName, quantity, symbol, rebateRate}) {
    await this.clickTradeButton();
    await this.verifyLoanCheckboxVisible();
    await this.selectLoanCheckbox();
    await this.searchCounterparty(counterpartyName);
    await this.selectCounterparty(counterpartyFullName);
    await this.enterQuantity(quantity);
    await this.enterSymbol(symbol);
    await this.enterRebateRate(rebateRate);
    await this.clickSaveButton();
  }
}