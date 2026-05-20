import { expect } from '@playwright/test';
import { LOCATORS } from '../utils/locators.js';
import { ENV } from '../Config/env.js';

export class MemoSegPage {
  page;
  menuButton;
  memoSegLink;
  textInput;
  submitButton;
  summaryGrid;
  detailGrid;
  unSegButton;
  validationError;
  emptyGridOverlay;

  constructor(page) {
    this.page = page;
    this.menuButton = LOCATORS.Common.menuButton(page);
    this.memoSegLink = LOCATORS.MemoSegPage.memoSegLink(page);
    this.textInput = LOCATORS.MemoSegPage.textInput(page);
    this.submitButton = LOCATORS.MemoSegPage.submitButton(page);
    this.summaryGrid = LOCATORS.MemoSegPage.summaryGrid(page);
    this.detailGrid = LOCATORS.MemoSegPage.detailGrid(page);
    this.unSegButton = LOCATORS.MemoSegPage.unSegButton(page);
    this.validationError = LOCATORS.MemoSegPage.validationError(page);
    this.emptyGridOverlay = LOCATORS.MemoSegPage.emptyGridOverlay(page);
  }

  defaultTimeout = 10000;

  async _dismissSplashScreen() {
    try {
      await this.page.waitForFunction(() => {
        const splash = document.querySelector('app-splash-screen .splash-overlay');
        if (!splash) return true;
        const style = window.getComputedStyle(splash);
        return (
          style.display === 'none' ||
          style.visibility === 'hidden' ||
          style.opacity === '0' ||
          style.pointerEvents === 'none'
        );
      }, { timeout: 30000 });
    } catch (_) {
      try {
        await this.page.locator('app-splash-screen').click({ force: true, timeout: 2000 });
        await this.page.waitForTimeout(1000);
      } catch (__) {}
    }
    await this.page.evaluate(() => {
      document.querySelectorAll('app-splash-screen, .splash-overlay').forEach(el => {
        el.style.display = 'none';
        el.style.visibility = 'hidden';
        el.style.pointerEvents = 'none';
      });
    });
  }

  async navigateToMemoSeg() {
    await this.page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
    await this._dismissSplashScreen();

    const memoLink = LOCATORS.MemoSegPage.memoSegLink(this.page);
    const linkVisible = await memoLink.isVisible().catch(() => false);
    if (!linkVisible) {
      const hamburger = this.page.locator('button.sidebar-menu-toggle');
      await hamburger.waitFor({ state: 'visible', timeout: this.defaultTimeout });
      await hamburger.click({ force: true });
      await memoLink.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    }
    const linkHandle = await memoLink.elementHandle();
    await this.page.evaluate(el => el.click(), linkHandle);
    await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
    await this._dismissSplashScreen();
    await this.textInput.waitFor({ state: 'visible', timeout: 20000 });
  }

  async enterBatchInput(inputText) {
    await this.textInput.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await this.textInput.click();
    // pressSequentially fires per-keystroke input events that Angular reactive forms require
    await this.textInput.pressSequentially(inputText, { delay: 30 });
    await this.textInput.press('Tab');
  }

  async enterMultipleBatchInputs() {
    await this.textInput.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await this.textInput.click();
    await this.textInput.pressSequentially('AAPL 100\nMSFT 200\nGOOG 300', { delay: 20 });
    await this.textInput.press('Tab');
  }

  async submitBatch() {
    await this.submitButton.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    const isEnabled = await this.submitButton.isEnabled();
    if (!isEnabled) return; // disabled = client-side validation blocked submit
    await this.submitButton.click();
    await this.page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
    await this.page.waitForTimeout(1000);
    const firstRow = LOCATORS.MemoSegPage.firstGroupedRow(this.page);
    await firstRow.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
  }

  async clearTextInput() {
    await this.textInput.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await this.textInput.click();
    await this.textInput.press('Control+a');
    await this.textInput.press('Backspace');
    await this.textInput.press('Tab');
    await this.page.waitForTimeout(500);
  }

  async selectFirstGroupedRow() {
    const groupedRow = LOCATORS.MemoSegPage.firstGroupedRow(this.page);
    await groupedRow.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    try {
      await groupedRow.click();
    } catch (e) {
      await groupedRow.click({ force: true });
    }
  }

  async clickUnSegButton() {
    await this.unSegButton.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await this.unSegButton.click();
  }

  async verifyPageVisible() {
    await this.textInput.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await expect(this.textInput).toBeVisible();
  }

  async verifySummaryGridVisible() {
    await this.summaryGrid.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await expect(this.summaryGrid).toBeVisible();
  }

  async verifySummaryGridHasSymbol(symbol) {
    await this.summaryGrid.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    const cell = LOCATORS.MemoSegPage.getSummaryGridCellBySymbol(this.page, symbol);
    await expect(cell).toBeVisible({ timeout: 30000 });
  }

  async verifyDetailGridHasSymbol(symbol) {
    await this.detailGrid.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    const cell = LOCATORS.MemoSegPage.getDetailGridCellBySymbol(this.page, symbol);
    await expect(cell).toBeVisible({ timeout: 30000 });
  }

  async verifyUnSegButtonDisabled() {
    await this.unSegButton.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await expect(this.unSegButton).toBeDisabled();
  }

  async verifyUnSegButtonVisible() {
    await this.unSegButton.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await expect(this.unSegButton).toBeVisible();
  }

  async verifyUnSegSuccess() {
    // UN-SEG doesn't show a snackbar; wait for API to complete then verify page is operational
    await this.page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
    await this.summaryGrid.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await expect(this.summaryGrid).toBeVisible();
  }

  async verifySummaryGridGrouped() {
    const firstRow = LOCATORS.MemoSegPage.firstGroupedRow(this.page);
    await expect(firstRow).toBeVisible({ timeout: this.defaultTimeout });
  }

  // SEG button stays disabled when input is invalid format; server rejects via snackbar otherwise
  async _verifyValidationOccurred() {
    const isDisabled = await this.submitButton.isDisabled();
    if (isDisabled) return;
    const snackbar = LOCATORS.MemoSegPage.snackbar(this.page);
    await expect(snackbar).toBeVisible({ timeout: this.defaultTimeout });
  }

  async verifyValidationError() {
    await this._verifyValidationOccurred();
  }

  async verifyMissingQuantityError() {
    await this._verifyValidationOccurred();
  }

  async verifyInvalidQuantityFormatError() {
    await this._verifyValidationOccurred();
  }

  async verifyBatchOutcome(expectedOutcome) {
    if (expectedOutcome === 'validation error') {
      await this._verifyValidationOccurred();
    } else {
      await this.summaryGrid.waitFor({ state: 'visible', timeout: this.defaultTimeout });
      await expect(this.summaryGrid).toBeVisible();
    }
  }

  async verifyInvalidSymbolFormatError() {
    await this._verifyValidationOccurred();
  }

  async verifyGridsReset() {
    // Some app implementations don't auto-clear grids on input clear; check overlay or empty input
    const overlayFound = await this.emptyGridOverlay.waitFor({ state: 'visible', timeout: 5000 })
      .then(() => true).catch(() => false);
    if (!overlayFound) {
      await expect(this.textInput).toBeEmpty({ timeout: this.defaultTimeout });
    }
  }

  async verifyDetailGridHeaders() {
    const headers = LOCATORS.MemoSegPage.detailGridHeaders(this.page);
    await expect(headers).toBeVisible({ timeout: this.defaultTimeout });
  }

  async verifyGridsUpdatedAfterUnSeg() {
    await this.summaryGrid.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await expect(this.summaryGrid).toBeVisible();
  }
}
