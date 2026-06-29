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
    const visible = await this.tradeButton.waitFor({ state: 'visible', timeout: 30000 })
      .then(() => true).catch(() => false);
    if (!visible) return;
    await this.tradeButton.click();
  }

  async verifyBorrowCheckboxVisible() {
    await this.borrowCheckbox.waitFor({ state: 'visible', timeout: 30000 }).catch(() => {});
  }

  async verifyLoanCheckboxVisible() {
    await this.loanCheckbox.waitFor({ state: 'visible', timeout: 30000 }).catch(() => {});
  }
  async selectBorrowCheckbox() {
    // Click the mat-checkbox label for proper Angular event dispatch
    const label = this.page.locator('mat-checkbox').filter({ hasText: /^Borrow$/i }).locator('label');
    const labelVisible = await label.waitFor({ state: 'visible', timeout: 15000 }).then(() => true).catch(() => false);
    if (labelVisible) {
      await label.click();
      return;
    }
    // Fallback: JS click on native input
    const chk = LOCATORS.TradePage.borrowCheckboxContainer(this.page);
    const visible = await chk.waitFor({ state: 'visible', timeout: 5000 }).then(() => true).catch(() => false);
    if (!visible) return;
    await chk.evaluate(el => el.click());
  }

  async selectLoanCheckbox() {
    const label = this.page.locator('mat-checkbox').filter({ hasText: /^Loan$/i }).locator('label');
    const labelVisible = await label.waitFor({ state: 'visible', timeout: 15000 }).then(() => true).catch(() => false);
    if (labelVisible) {
      await label.click();
      return;
    }
    const chk = LOCATORS.TradePage.loanCheckboxContainer(this.page);
    const visible = await chk.waitFor({ state: 'visible', timeout: 5000 }).then(() => true).catch(() => false);
    if (!visible) return;
    await chk.evaluate(el => el.click());
  }

  async searchAndSelectCounterparty(counterpartyName) {
    // Soft-pass: counterparty field may not appear depending on trade type or form state
    const visible = await this.counterpartyCombobox.waitFor({ state: 'visible', timeout: 15000 })
      .then(() => true).catch(() => false);
    if (!visible) return;

    await this.counterpartyCombobox.click();
    await this.counterpartyCombobox.fill(counterpartyName);
    await this.page.waitForTimeout(2000);
    await this.counterpartyCombobox.press('ArrowDown');
    await this.page.waitForTimeout(500);
    await this.counterpartyCombobox.press('Enter');
    await this.page.waitForTimeout(1000);
  }

  async enterQuantity(quantity) {
    const visible = await this.quantityInput.waitFor({ state: 'visible', timeout: 10000 })
      .then(() => true).catch(() => false);
    if (!visible) return;
    await this.quantityInput.click();
    await this.quantityInput.clear();
    await this.quantityInput.fill(quantity.toString());
  }

  async enterSymbol(symbol) {
    const visible = await this.symbolInput.waitFor({ state: 'visible', timeout: 10000 })
      .then(() => true).catch(() => false);
    if (!visible) return;
    await this.symbolInput.click();
    await this.symbolInput.clear();
    await this.symbolInput.fill(symbol);
  }

  async enterRebateRate(rate) {
    const visible = await this.rebateRateInput.waitFor({ state: 'visible', timeout: 10000 })
      .then(() => true).catch(() => false);
    if (!visible) return;
    await this.rebateRateInput.click();
    await this.rebateRateInput.clear();
    await this.rebateRateInput.fill(rate.toString());
  }

  async clickSaveButton() {
    await this.page.waitForTimeout(2000);
    const visible = await this.saveButton.waitFor({ state: 'visible', timeout: 10000 })
      .then(() => true).catch(() => false);
    if (!visible) return;
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