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
    await this.bulkImportLink.click();
    await expect(this.headerRow).toBeVisible();
  }

  async fillBorrowDetails(counterparty, symbolDetails) {
    await this.borrowButton.click();
    await this.counterpartyCombobox.click();
    await this.counterpartyCombobox.fill(counterparty);
    await this.counterpartyCombobox.press('Tab');
    await this.symbolCusipQtyRateTextbox.fill(symbolDetails);
  }

  async clickImport() {
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
  }

  async completeLoanImport(counterparty, symbolDetails) {
    await this.fillLoanDetails(counterparty, symbolDetails);
    await this.clickImport();
  }
}
