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
    // Wait for loading to start (Firestore subscription kicks in), then wait for it to finish
    await loadingOverlay.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
    await loadingOverlay.waitFor({ state: 'hidden', timeout: 120000 });
  }

  async isGridVisible() {
    await this.grid.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await expect(this.grid).toBeVisible();
  }

  async hasGridRows() {
    const loadingOverlay = this.page.locator('.ag-overlay-loading-wrapper');
    await loadingOverlay.waitFor({ state: 'hidden', timeout: 60000 }).catch(() => {});
    await this.gridRow.first().waitFor({ state: 'visible', timeout: 30000 });
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

  async selectFirstRow() {
    await this.gridRow.first().waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await this.gridRow.first().click();
  }

  async selectSecondRow() {
    await this.gridRow.nth(1).waitFor({ state: 'visible', timeout: this.defaultTimeout });
    await this.gridRow.nth(1).click();
  }

  async doubleClickFirstRow() {
    await this.gridRow.first().waitFor({ state: 'visible', timeout: this.defaultTimeout });
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
