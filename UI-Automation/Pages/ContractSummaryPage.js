import { ENV } from '../Config/env.js';
import { LOCATORS } from '../utils/locators.js';
import { expect } from '@playwright/test';

export class ContractSummaryPage {
  page;
  grid;
  detailGrid;
  gridRow;
  pinnedRow;
  emptyStateOverlay;
  symbolCusipFilter;
  applyButton;
  clearButton;
  detailsToggle;
  effectiveDateInput;

  constructor(page) {
    this.page = page;
    this.grid               = LOCATORS.ContractSummaryPage.grid(page);
    this.detailGrid         = LOCATORS.ContractSummaryPage.detailGrid(page);
    this.gridRow            = LOCATORS.ContractSummaryPage.gridRow(page);
    this.pinnedRow          = LOCATORS.ContractSummaryPage.pinnedRow(page);
    this.emptyStateOverlay  = LOCATORS.ContractSummaryPage.emptyStateOverlay(page);
    this.symbolCusipFilter  = LOCATORS.ContractSummaryPage.symbolCusipFilter(page);
    this.applyButton        = LOCATORS.ContractSummaryPage.applyButton(page);
    this.clearButton        = LOCATORS.ContractSummaryPage.clearButton(page);
    this.detailsToggle      = LOCATORS.ContractSummaryPage.detailsToggle(page);
    this.effectiveDateInput = LOCATORS.ContractSummaryPage.effectiveDateInput(page);
  }

  defaultTimeout = 15000;
  defaultSymbol  = 'QQQ';

  async navigate() {
    const origin = new URL(ENV.baseURL).origin;
    const target = `${origin}/contract-summary`;
    if (!this.page.url().startsWith(target)) {
      await this.page.goto(target);
    }
    await this.grid.waitFor({ state: 'visible', timeout: 30000 });
    const loadingOverlay = this.page.locator('.ag-overlay-loading-wrapper');
    // Wait for loading to start (Firestore subscription kicks in), then wait for it to finish.
    // Grace period is short on purpose - when the grid loads fast the overlay never
    // appears, and a long timeout here is spent waiting for something that won't happen.
    await loadingOverlay.waitFor({ state: 'visible', timeout: 1000 }).catch(() => {});
    await loadingOverlay.waitFor({ state: 'hidden', timeout: 120000 });
  }

  async isGridVisible() {
    await this.grid.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await expect(this.grid).toBeVisible();
  }

  async hasGridRows() {
    const loadingOverlay = this.page.locator('.ag-overlay-loading-wrapper');
    // The overlay clearing doesn't mean rows have rendered - AG Grid hides it
    // as soon as the Firestore subscription responds, and the first page of
    // rows can land noticeably later. So wait for the overlay, then wait
    // separately (and generously) for an actual row.
    await loadingOverlay.waitFor({ state: 'hidden', timeout: 90000 }).catch(() => {});
    try {
      await this.gridRow.first().waitFor({ state: 'visible', timeout: 90000 });
    } catch {
      // A bare locator timeout looks identical whether the backend returned
      // nothing or is still spinning. Say which, so a demo/CI failure is
      // diagnosable without reopening the trace.
      const stillLoading = await loadingOverlay.isVisible().catch(() => false);
      const noRowsShown = await this.emptyStateOverlay.isVisible().catch(() => false);
      const effectiveDate = await this.effectiveDateInput.inputValue().catch(() => 'unknown');
      throw new Error(
        `Contract Summary grid rendered no rows within 90s. ` +
          `Loading overlay: ${stillLoading ? 'STILL VISIBLE (data never arrived)' : 'cleared'}. ` +
          `"No rows" overlay: ${noRowsShown ? 'visible (backend returned an empty set)' : 'absent'}. ` +
          `Effective date: ${effectiveDate}.`
      );
    }
    expect(await this.gridRow.count()).toBeGreaterThan(0);
  }

  async isColumnVisible(colHeaderText) {
    const col = LOCATORS.ContractSummaryPage.columnHeader(this.page, colHeaderText);
    await col.first().waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await expect(col.first()).toBeVisible();
  }

  async isColumnGroupVisible(groupText) {
    const group = LOCATORS.ContractSummaryPage.columnGroupHeader(this.page, groupText);
    await group.first().waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await expect(group.first()).toBeVisible();
  }

  async isPinnedRowVisible() {
    // The pinned total row only renders once the grid has data, so wait for the
    // grid to settle first rather than timing out against a still-loading grid.
    await this._waitForGridSettled();
    await this.pinnedRow.first().waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await expect(this.pinnedRow.first()).toBeVisible();
  }

  async isEmptyStateVisible() {
    try {
      await this.emptyStateOverlay.waitFor({ state: 'visible', timeout: 10000 });
      await expect(this.emptyStateOverlay).toBeVisible();
    } catch {
      await this.page.waitForTimeout(3000);
      const rowCount = await this.gridRow.count();
      expect(rowCount).toBe(0);
    }
  }

  async enableDetailsToggle() {
    await this.detailsToggle.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    const btn = this.page.locator('button#mat-mdc-slide-toggle-0-button');
    const isChecked = (await btn.getAttribute('aria-checked')) === 'true';
    if (!isChecked) await this.detailsToggle.click();
    await this.page.waitForTimeout(500);
  }

  async disableDetailsToggle() {
    await this.detailsToggle.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    const btn = this.page.locator('button#mat-mdc-slide-toggle-0-button');
    const isChecked = (await btn.getAttribute('aria-checked')) === 'true';
    if (isChecked) await this.detailsToggle.click();
    await this.page.waitForTimeout(500);
  }

  async isDetailPanelVisible() {
    await this.detailGrid.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await expect(this.detailGrid).toBeVisible();
  }

  async isDetailPanelHidden() {
    await expect(this.detailGrid).not.toBeVisible();
  }

  /**
   * Waits for the grid to finish loading; resolves true when it has data rows.
   * Settling on the first real outcome - rows, or the no-rows overlay - keeps a
   * slow fetch from being reported the same way as a genuinely empty grid.
   */
  async _waitForGridSettled(timeout = 90000) {
    // Do NOT race data rows against the no-rows overlay. ag-Grid displays that
    // overlay while a fetch is still in flight, so the race resolved the moment
    // the overlay appeared and reported an empty grid before the data had any
    // chance to arrive - turning "still loading" into a false "0 rows".
    //
    // Instead: let the loading indicators clear, then give the rows the whole
    // budget. Only a grid that produces no row in 90s is treated as empty.
    const loadingOverlay = this.page.locator('.ag-overlay-loading-wrapper');
    await loadingOverlay.waitFor({ state: 'visible', timeout: 1000 }).catch(() => {});
    await loadingOverlay.waitFor({ state: 'hidden', timeout: 60000 }).catch(() => {});

    // The app also renders its own "Loading..." element outside the ag-Grid
    // overlay, so wait that out too before concluding anything.
    await this.page
      .getByText(/^\s*Loading\.\.\.\s*$/)
      .first()
      .waitFor({ state: 'hidden', timeout: 60000 })
      .catch(() => {});

    const appeared = await this.gridRow
      .first()
      .waitFor({ state: 'visible', timeout })
      .then(() => true)
      .catch(() => false);
    return appeared && (await this.gridRow.count()) > 0;
  }

  /** Settles the grid, failing with a data-specific message when it is empty. */
  async _requireGridRows(minimum = 1) {
    await this._waitForGridSettled();
    // Settling only guarantees the first row. When a scenario needs more than
    // one, wait for that row specifically instead of counting straight away -
    // rows stream in and an immediate count can catch the grid mid-render.
    if (minimum > 1) {
      await this.gridRow
        .nth(minimum - 1)
        .waitFor({ state: 'visible', timeout: 30000 })
        .catch(() => {});
    }
    const count = await this.gridRow.count();
    if (count >= minimum) return;
    throw new Error(
      `Contract Summary grid has ${count} row(s) for the selected depository and effective date, ` +
      `but this scenario needs at least ${minimum}.`
    );
  }

  async selectFirstRow() {
    await this._requireGridRows();
    await this.gridRow.first().click();
  }

  async selectSecondRow() {
    await this._requireGridRows(2);
    await this.gridRow.nth(1).click();
  }

  async doubleClickFirstRow() {
    await this._requireGridRows();
    await this.gridRow.first().dblclick();
  }

  async getFirstRowSymbol() {
    await this.gridRow.first().waitFor({ state: 'visible', timeout: this.defaultTimeout });
    return await this.gridRow.first().locator('.ag-cell').first().innerText();
  }

  async filterBySymbol(symbol) {
    await this.symbolCusipFilter.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await this.symbolCusipFilter.clear();
    await this.symbolCusipFilter.fill(symbol);
    await this.applyButton.click();
    await this.page.waitForTimeout(3000);
  }

  async filterByField(label, value) {
    if (label === 'PRC' || label === 'Profit Center') {
      const prcSelect = LOCATORS.ContractSummaryPage.profitCenterFilter(this.page);
      await prcSelect.waitFor({ state: 'visible', timeout: this.defaultTimeout });
      await prcSelect.click();
      await this.page.waitForTimeout(1000);
      const firstOption = this.page.locator('mat-option').first();
      if (await firstOption.isVisible()) {
        await firstOption.click();
        await this.page.waitForTimeout(500);
      }
      // Close dropdown if still open, then force-click Apply past any overlay
      if (await this.page.locator('.cdk-overlay-backdrop').isVisible()) {
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(500);
      }
      await this.applyButton.click({ force: true });
      await this.page.waitForTimeout(1500);
      return;
    }

    let input;
    switch (label) {
      case 'DTC':          input = LOCATORS.ContractSummaryPage.dtcFilter(this.page); break;
      case 'LoanetId':     input = LOCATORS.ContractSummaryPage.loanetIdFilter(this.page); break;
      case 'Contract No.': input = LOCATORS.ContractSummaryPage.contractNoFilter(this.page); break;
      default:             input = LOCATORS.ContractSummaryPage.symbolCusipFilter(this.page);
    }
    await input.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await input.clear();
    await input.fill(value);
    await this.applyButton.click();
    await this.page.waitForTimeout(1500);
  }

  async clearFilters() {
    await this.clearButton.click();
    await this.page.waitForTimeout(1500);
  }

  async changeEffectiveDate() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const formatted = yesterday.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
    await this.effectiveDateInput.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await this.effectiveDateInput.fill(formatted);
    await this.applyButton.click();
    await this.page.waitForTimeout(2000);
  }

  async changeDepository() {
    const buttons = LOCATORS.ContractSummaryPage.depositoryButtons(this.page);
    await buttons.nth(1).click();
    await this.applyButton.click();
    await this.page.waitForTimeout(2000);
  }

  async rowsContainText(text) {
    const rows = this.gridRow;
    const count = await rows.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const rowText = await rows.nth(i).innerText();
      expect(rowText.toLowerCase()).toContain(text.toLowerCase());
    }
  }
}
