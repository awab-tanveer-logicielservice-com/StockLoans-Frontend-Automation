import { LoginPage } from './LoginPage.js';
import { expect } from '@playwright/test';
import { LOCATORS } from '../utils/locators.js';

export class BulkImportPage {
  page;
  loginPage;
  menuButton;
  bulkImportLink;
  headerRow;
  borrowButton;
  loanButton;
  counterpartyCombobox;
  symbolCusipQtyRateTextbox;
  importButton;

  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.menuButton = LOCATORS.BulkImportPage.menuButton(page);
    this.bulkImportLink = LOCATORS.BulkImportPage.bulkImportLink(page);
    this.headerRow = LOCATORS.BulkImportPage.headerRow(page);
    this.borrowButton = LOCATORS.BulkImportPage.borrowButton(page);
    this.loanButton = LOCATORS.BulkImportPage.loanButton(page);
    this.counterpartyCombobox = LOCATORS.BulkImportPage.counterpartyCombobox(page);
    this.symbolCusipQtyRateTextbox = LOCATORS.BulkImportPage.symbolCusipQtyRateTextbox(page);
    this.importButton = LOCATORS.BulkImportPage.importButton(page);
  }

  async navigateToBulkImport() {
    await this.menuButton.click();
    // Ensure the Bulk Import link is visible and clickable
    await this.bulkImportLink.waitFor({ state: 'visible', timeout: 10000 });
    await this.bulkImportLink.click();

    // Wait for one of several reliable indicators that the Bulk Import page has loaded
    const timeout = 30000;
    const start = Date.now();
    while (Date.now() - start < timeout) {
      // Short-circuit if URL indicates bulk import page
      try {
        if (/bulk/i.test(this.page.url())) return;
      } catch (e) {}
      try {
        if (await this.headerRow.isVisible()) return;
      } catch (e) {}
      try {
        if (await this.borrowButton.isVisible()) return;
      } catch (e) {}
      try {
        if (await this.importButton.isVisible()) return;
      } catch (e) {}
      await this.page.waitForTimeout(500);
    }
    throw new Error('Bulk Import page did not finish loading within timeout');
  }

  async fillBorrowDetails(counterparty, symbolDetails) {
    await this.borrowButton.click();
    await this.counterpartyCombobox.click();
    await this.counterpartyCombobox.fill(counterparty);
    await this.counterpartyCombobox.press('Tab');
    await this.symbolCusipQtyRateTextbox.fill(symbolDetails);
    // Ensure the input loses focus to trigger validation/enabling of Import button
    await this.symbolCusipQtyRateTextbox.press('Tab');
    await this.page.waitForTimeout(200);
  }

  async clickImport() {
    await this.importButton.waitFor({ state: 'visible', timeout: 10000 });
    // Poll for enabled state (Locator doesn't expose waitForElementState in this runtime)
    const start = Date.now();
    const timeout = 10000;
    while (!(await this.importButton.isEnabled())) {
      if (Date.now() - start > timeout) {
        throw new Error('Import button did not become enabled within timeout');
      }
      await this.page.waitForTimeout(100);
    }
    await this.importButton.click();
  }

  async completeBorrowImport(counterparty, symbolDetails) {
    await this.fillBorrowDetails(counterparty, symbolDetails);
    await this.clickImport();
  }

  async fillLoanDetails(counterparty, symbolDetails) {
    await this.loanButton.click();
    await this.counterpartyCombobox.click();
    await this.counterpartyCombobox.fill(counterparty);
    await this.counterpartyCombobox.press('Tab');
    await this.symbolCusipQtyRateTextbox.fill(symbolDetails);
    // Ensure the input loses focus to trigger validation/enabling of Import button
    await this.symbolCusipQtyRateTextbox.press('Tab');
    await this.page.waitForTimeout(200);
  }

  async completeLoanImport(counterparty, symbolDetails) {
    await this.fillLoanDetails(counterparty, symbolDetails);
    await this.clickImport();
  }
}
