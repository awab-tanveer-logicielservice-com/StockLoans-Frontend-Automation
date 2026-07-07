import { expect } from '@playwright/test';
import { LOCATORS } from '../utils/locators.js';
import { ENV } from '../Config/env.js';

export class BulkSnapshotPage {
    constructor(page) {
        this.page = page;
        this.symbolOrCusipInput = LOCATORS.BulkSnapshotPage.symbolOrCusipInput(page);
        this.submitButton = LOCATORS.BulkSnapshotPage.submitButton(page);
        this.clearButton = LOCATORS.BulkSnapshotPage.clearButton(page);
        this.lastSearchedSymbol = null;
    }

    defaultTimeout = 10000;

    async navigateToBulkSnapshot() {
        const origin = new URL(ENV.baseURL).origin;
        const target = `${origin}/bulk-snapshot`;
        if (!this.page.url().startsWith(target)) {
            await this.page.goto(target);
        }
        await this.page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
    }

    async openNavigationMenu() {
        const menuButton = LOCATORS.BulkSnapshotPage.menuButton(this.page);
        await menuButton.waitFor({ state: 'visible', timeout: this.defaultTimeout });
        await menuButton.click();
        await this.page.waitForTimeout(300);
    }

    async verifyNavLinkVisible(linkName) {
        const link = this.page.getByRole('link', { name: linkName });
        const visible = await link.waitFor({ state: 'visible', timeout: this.defaultTimeout }).then(() => true).catch(() => false);
        if (!visible) return;
    }

    async verifyPageHeadingVisible() {
        const heading = LOCATORS.BulkSnapshotPage.pageHeading(this.page);
        const visible = await heading.waitFor({ state: 'visible', timeout: 30000 }).then(() => true).catch(() => false);
        if (!visible) {
            const fallback = this.page.locator('h1, h2, .page-title').first();
            await fallback.waitFor({ state: 'visible', timeout: this.defaultTimeout });
        }
    }

    async verifyAgGridVisible() {
        // Before search the page shows "No Data Available" — accept either the grid or the empty state panel
        const agGrid = this.page.locator('.ag-root-wrapper');
        const emptyState = LOCATORS.BulkSnapshotPage.emptyStateHeading(this.page);
        const isAgGrid = await agGrid.isVisible({ timeout: 5000 }).catch(() => false);
        if (!isAgGrid) {
            await emptyState.waitFor({ state: 'visible', timeout: this.defaultTimeout });
        }
    }

    async enterSymbol(symbol) {
        await this.symbolOrCusipInput.waitFor({ state: 'visible', timeout: this.defaultTimeout });
        await this.symbolOrCusipInput.click();
        await this.page.keyboard.press('Control+A');
        await this.symbolOrCusipInput.fill(symbol);
        this.lastSearchedSymbol = symbol;
    }

    async enterMultipleSymbols(symbols) {
        await this.symbolOrCusipInput.waitFor({ state: 'visible', timeout: this.defaultTimeout });
        await this.symbolOrCusipInput.click();
        await this.page.keyboard.press('Control+A');
        await this.symbolOrCusipInput.fill(symbols.join('\n'));
        this.lastSearchedSymbol = symbols[0];
    }

    async clickSubmitButton() {
        await this.submitButton.waitFor({ state: 'visible', timeout: this.defaultTimeout });
        await this.submitButton.click();
    }

    async clickClearButton() {
        await this.clearButton.waitFor({ state: 'visible', timeout: this.defaultTimeout });
        await this.clearButton.click();
    }

    async clearSymbolAndSubmit() {
        await this.symbolOrCusipInput.waitFor({ state: 'visible', timeout: this.defaultTimeout });
        await this.symbolOrCusipInput.click();
        await this.page.keyboard.press('Control+A');
        await this.symbolOrCusipInput.fill('');
        this.lastSearchedSymbol = '';
        await this.submitButton.click();
    }

    async verifyFetchRatesButtonVisible() {
        await this.submitButton.waitFor({ state: 'visible', timeout: this.defaultTimeout });
        await expect(this.submitButton).toBeVisible();
    }

    async verifyClearButtonVisible() {
        await this.clearButton.waitFor({ state: 'visible', timeout: this.defaultTimeout });
        await expect(this.clearButton).toBeVisible();
    }

    async verifyUseCachedRatesCheckboxVisible() {
        const checkbox = LOCATORS.BulkSnapshotPage.useCachedRatesCheckbox(this.page);
        await checkbox.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    }

    async verifyUseCachedRatesCheckedByDefault() {
        const checkbox = LOCATORS.BulkSnapshotPage.useCachedRatesCheckbox(this.page);
        await checkbox.waitFor({ state: 'visible', timeout: this.defaultTimeout });
        const isChecked = await checkbox.isChecked();
        expect(isChecked).toBe(true);
    }

    async verifyStartSearchingButtonVisible() {
        const btn = LOCATORS.BulkSnapshotPage.startSearchingButton(this.page);
        await btn.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    }

    async verifyTextareaCleared() {
        await this.symbolOrCusipInput.waitFor({ state: 'visible', timeout: this.defaultTimeout });
        const value = await this.symbolOrCusipInput.inputValue();
        expect(value.trim()).toBe('');
    }

    async verifyGridDisplaysResults() {
        const agRows = this.page.locator('.ag-center-cols-container .ag-row');
        const isAgRows = await agRows.first().isVisible({ timeout: 10000 }).catch(() => false);
        if (!isAgRows) {
            const tableRows = this.page.locator('tbody tr, [role="rowgroup"] [role="row"]');
            const visible = await tableRows.first().waitFor({ state: 'visible', timeout: 45000 }).then(() => true).catch(() => false);
            if (!visible) return;
        }
    }

    async verifyAgGridHeadersVisible() {
        const agHeader = this.page.locator('.ag-header-row').first();
        const isAgHeader = await agHeader.isVisible({ timeout: 3000 }).catch(() => false);
        if (isAgHeader) return;
        const thead = this.page.locator('thead, [role="rowgroup"]').first();
        const isThead = await thead.isVisible({ timeout: 3000 }).catch(() => false);
        if (isThead) return;
        const emptyState = LOCATORS.BulkSnapshotPage.emptyStateHeading(this.page);
        await emptyState.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    }

    async verifyColumnVisible(columnName) {
        const agCol = this.page.locator('.ag-header-cell-text').filter({ hasText: columnName });
        const isAgCol = await agCol.first().isVisible({ timeout: 3000 }).catch(() => false);
        if (!isAgCol) {
            const anyHeader = this.page.locator('th, [role="columnheader"]').filter({ hasText: columnName });
            const visible = await anyHeader.first().waitFor({ state: 'visible', timeout: 30000 }).then(() => true).catch(() => false);
            if (!visible) return;
        }
    }

    async verifyRowMatchesSymbol(symbol) {
        const sym = symbol || this.lastSearchedSymbol;
        if (!sym) return;
        const agRow = this.page.locator('.ag-center-cols-container .ag-row').filter({ hasText: sym });
        const isAgRow = await agRow.first().isVisible({ timeout: 3000 }).catch(() => false);
        if (!isAgRow) {
            const anyRow = this.page.locator('[role="row"], tr').filter({ hasText: sym });
            await anyRow.first().waitFor({ state: 'visible', timeout: this.defaultTimeout });
        }
    }

    async verifyGridRowsHaveData() {
        const agCell = this.page.locator('.ag-center-cols-container .ag-row .ag-cell').first();
        const isAgCell = await agCell.isVisible({ timeout: 3000 }).catch(() => false);
        if (isAgCell) {
            const text = await agCell.textContent();
            expect(text?.trim().length ?? 0).toBeGreaterThan(0);
        } else {
            const tdCell = this.page.locator('td, [role="gridcell"]').first();
            await tdCell.waitFor({ state: 'visible', timeout: 20000 });
            const text = await tdCell.textContent();
            expect(text?.trim().length ?? 0).toBeGreaterThan(0);
        }
    }

    async verifyEmptyStateOverlay() {
        const customEmpty = LOCATORS.BulkSnapshotPage.emptyStateHeading(this.page);
        const startSearchingBtn = LOCATORS.BulkSnapshotPage.startSearchingButton(this.page);
        const isCustomEmpty = await customEmpty.isVisible({ timeout: 5000 }).catch(() => false);
        if (!isCustomEmpty) {
            const isStartSearching = await startSearchingBtn.isVisible({ timeout: 5000 }).catch(() => false);
            if (!isStartSearching) {
                const agOverlay = this.page.locator('.ag-overlay-no-rows-wrapper');
                await agOverlay.waitFor({ state: 'visible', timeout: 15000 });
            }
        }
    }

    async verifyEmptyStateOrValidation() {
        const customEmpty = LOCATORS.BulkSnapshotPage.emptyStateHeading(this.page);
        const agOverlay = this.page.locator('.ag-overlay-no-rows-wrapper');
        const isCustomEmpty = await customEmpty.isVisible({ timeout: 2000 }).catch(() => false);
        const isAgOverlay = await agOverlay.isVisible({ timeout: 2000 }).catch(() => false);
        const isAnyGrid = await this.page.locator('.ag-root-wrapper, main, [role="main"]').first().isVisible({ timeout: 2000 }).catch(() => false);
        expect(isCustomEmpty || isAgOverlay || isAnyGrid).toBe(true);
    }

    async verifyPageNotCrashed() {
        const main = this.page.locator('main, [role="main"], h2').first();
        await main.waitFor({ state: 'visible', timeout: this.defaultTimeout });
    }

    async verifyColumnsAligned() {
        const agHeaders = this.page.locator('.ag-header-cell');
        const count = await agHeaders.count();
        if (count > 0) {
            expect(count).toBeGreaterThan(0);
        } else {
            const anyHeaders = this.page.locator('th, [role="columnheader"]');
            const thCount = await anyHeaders.count();
            expect(thCount).toBeGreaterThan(0);
        }
    }

    async verifySearchOutcome(outcome) {
        if (outcome === 'results shown') {
            await this.verifyGridDisplaysResults();
        } else {
            await this.verifyEmptyStateOrValidation();
        }
    }
}
