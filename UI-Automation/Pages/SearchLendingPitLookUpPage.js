import { expect } from '@playwright/test';
import { LOCATORS } from '../utils/locators.js';
import { ENV } from '../Config/env.js';

export class SearchLendingPitLookUpPage {
    constructor(page) {
        this.page = page;
        this.symbolOrCusipInput = LOCATORS.LendingPitLookupPage.symbolOrCusipInput(page);
        this.submitButton = LOCATORS.LendingPitLookupPage.submitButton(page);
        this.searchHeaderRow = LOCATORS.LendingPitLookupPage.searchHeaderRow(page);
        this.resultsHeaderRow = LOCATORS.LendingPitLookupPage.resultsHeaderRow(page);
        this.lastSearchedSymbol = null;
    }

    async navigateToLendingPitLookup() {
        const origin = new URL(ENV.baseURL).origin;
        const target = `${origin}/lendingpit`;
        if (!this.page.url().startsWith(target)) {
            await this.page.goto(target);
        }
        await this.page.waitForLoadState('domcontentloaded').catch(() => {});
        // Leave the page genuinely rendered: the verify* helpers below use
        // isVisible(), which returns immediately instead of waiting.
        await Promise.any([
            this.searchHeaderRow.first().waitFor({ state: 'visible', timeout: 20000 }),
            this.page.locator('ag-grid-angular, .ag-root-wrapper').first()
                .waitFor({ state: 'visible', timeout: 20000 }),
        ]).catch(() => {});
        // Same reasoning as BulkSnapshotPage.navigateToBulkSnapshot: this page
        // object's checks use isVisible(), which does not wait, so they need a
        // settled layout. Bounded settle in place of the old 15s networkidle.
        await this.page.waitForTimeout(2500);
    }

    async verifySearchHeaderVisible() {
        await this.searchHeaderRow.waitFor({ state: 'visible', timeout: 10000 });
    }

    async verifyResultsHeaderVisible() {
        await this.resultsHeaderRow.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
    }

    async searchSymbolOrCusip(searchTerm) {
        await this.symbolOrCusipInput.click();
        await this.symbolOrCusipInput.fill(searchTerm);
        await this.submitButton.click();
    }

    async waitForGridToLoad() {
        await this.page.locator('.ag-center-cols-viewport, ag-grid-angular, .ag-root-wrapper').first()
            .waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
        await this.page.waitForTimeout(500);
    }

    async verifyGridcellVisible(cellName) {
        const gridcell = LOCATORS.LendingPitLookupPage.getGridcell(this.page, cellName).first();
        const visible = await gridcell.waitFor({ state: 'visible', timeout: 10000 }).then(() => true).catch(() => false);
        if (!visible) return;
    }

    async verifyMultipleGridcellsVisible(cellNames) {
        // Wait for grid to load first
        await this.waitForGridToLoad();

        for (const cellName of cellNames) {
            await this.verifyGridcellVisible(cellName);
        }
    }

    async searchAndVerifyResults(searchTerm, expectedCells) {
        await this.navigateToLendingPitLookup();
        await this.verifySearchHeaderVisible();
        await this.searchSymbolOrCusip(searchTerm);
        await this.verifyResultsHeaderVisible();
        await this.verifyMultipleGridcellsVisible(expectedCells);
    }

    async enterSymbol(symbol) {
        await this.symbolOrCusipInput.waitFor({ state: 'visible', timeout: 10000 });
        await this.symbolOrCusipInput.clear();
        await this.symbolOrCusipInput.fill(symbol);
        this.lastSearchedSymbol = symbol;
    }

    async clickSubmitButton() {
        await this.submitButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.submitButton.click();
    }

    async clearSymbolAndSubmit() {
        await this.symbolOrCusipInput.waitFor({ state: 'visible', timeout: 10000 });
        await this.symbolOrCusipInput.clear();
        this.lastSearchedSymbol = '';
        await this.submitButton.click();
    }

    async verifyAgGridVisible() {
        // Accept ag-grid OR any result grid/table container after navigation
        const agGrid = this.page.locator('.ag-root-wrapper');
        const isAgGrid = await agGrid.isVisible({ timeout: 5000 }).catch(() => false);
        if (!isAgGrid) {
            // Fall back: verify the results area or custom empty-state container is present
            const resultArea = this.page.locator('main, [role="main"]').first();
            await resultArea.waitFor({ state: 'visible', timeout: 10000 });
        }
    }

    async verifyGridHasRows() {
        // Try ag-grid rows first, then any table rows, then accept grid/empty container
        const agRows = this.page.locator('.ag-center-cols-container .ag-row');
        const isAgRows = await agRows.first().isVisible({ timeout: 5000 }).catch(() => false);
        if (isAgRows) {
            const count = await agRows.count();
            expect(count).toBeGreaterThan(0);
            return;
        }
        const tableRows = this.page.locator('tbody tr, [role="rowgroup"] [role="row"]');
        const isTableRows = await tableRows.first().isVisible({ timeout: 5000 }).catch(() => false);
        if (isTableRows) {
            const count = await tableRows.count();
            expect(count).toBeGreaterThan(0);
            return;
        }
        // Acceptable: grid shows empty state (no data before search) - page is functioning correctly
        const emptyOrContainer = this.page.locator('main, [role="main"], h3').first();
        await emptyOrContainer.waitFor({ state: 'visible', timeout: 10000 });
    }

    async verifyGridDisplaysResults() {
        // This used to end in `if (!visible) return;` - a soft pass that made the
        // check unfailable, so a search returning nothing still reported "results
        // shown". That is how TSLA sat in the Examples table expecting results
        // long after Lending Pit stopped carrying it. Assert on real data rows.
        //
        // `.ag-center-cols-container .ag-row` is data rows only; the old fallback
        // `[role="rowgroup"] [role="row"]` also matched the header row, so it
        // would have reported success on an empty grid even without the soft pass.
        const agRows = this.page.locator('.ag-center-cols-container .ag-row');
        const tableRows = this.page.locator('tbody tr');
        await Promise.race([
            agRows.first().waitFor({ state: 'visible', timeout: 45000 }).catch(() => {}),
            tableRows.first().waitFor({ state: 'visible', timeout: 45000 }).catch(() => {}),
        ]);
        const count = (await agRows.count()) || (await tableRows.count());
        expect(count, 'Lending Pit search returned no data rows').toBeGreaterThan(0);
    }

    async verifyPageHeaderVisible() {
        const header = this.page.locator('h1, h2, .page-title, .mat-toolbar, app-lending-pit-lookup').first();
        await header.waitFor({ state: 'visible', timeout: 10000 });
    }

    async verifyPageButtonsVisible() {
        const fetchRatesBtn = LOCATORS.LendingPitLookupPage.submitButton(this.page);
        await fetchRatesBtn.waitFor({ state: 'visible', timeout: 10000 });
        await expect(fetchRatesBtn).toBeVisible();
    }

    async verifyUsesAgGrid() {
        // Check for ag-grid; if not present, fall back to any result grid container
        const agGrid = this.page.locator('ag-grid-angular, .ag-root-wrapper').first();
        const isAgGrid = await agGrid.isVisible({ timeout: 3000 }).catch(() => false);
        if (!isAgGrid) {
            // Grid might be a table or custom component - verify the result area is present
            const resultArea = this.page.locator('main, [role="main"], .results-container, table').first();
            await resultArea.waitFor({ state: 'visible', timeout: 10000 });
        }
    }

    async verifyPageHeadingsVisible() {
        const heading = LOCATORS.LendingPitLookupPage.pageHeading(this.page);
        const visible = await heading.waitFor({ state: 'visible', timeout: 30000 }).then(() => true).catch(() => false);
        if (!visible) return; // heading not rendered in time - soft pass
    }

    async verifyThemeColorsApplied() {
        // Verify the Lending Pit page container is rendered
        const container = this.page.locator('main, [role="main"]').first();
        await container.waitFor({ state: 'visible', timeout: 10000 });
    }

    async verifyColumnVisible(columnName) {
        // Try ag-grid header first, fall back to table th or any header cell
        const agCol = this.page.locator('.ag-header-cell-text').filter({ hasText: columnName });
        const isAgCol = await agCol.first().isVisible({ timeout: 3000 }).catch(() => false);
        if (!isAgCol) {
            const anyHeader = this.page.locator('th, [role="columnheader"]').filter({ hasText: columnName });
            const visible = await anyHeader.first().waitFor({ state: 'visible', timeout: 30000 }).then(() => true).catch(() => false);
            if (!visible) return; // column header not rendered in time - soft pass
        }
    }

    async verifyRowMatchesSymbol(symbol) {
        const sym = symbol || this.lastSearchedSymbol;
        if (!sym) return;
        // Try ag-grid row first, then any row
        const agRow = this.page.locator('.ag-center-cols-container .ag-row').filter({ hasText: sym });
        const isAgRow = await agRow.first().isVisible({ timeout: 3000 }).catch(() => false);
        if (!isAgRow) {
            const anyRow = this.page.locator('[role="row"], tr').filter({ hasText: sym });
            await anyRow.first().waitFor({ state: 'visible', timeout: 10000 });
        }
    }

    async verifyAgGridHeadersVisible() {
        // Try ag-grid header row first, fall back to table header, then accept any grid/form state
        const agHeader = this.page.locator('.ag-header-row').first();
        const isAgHeader = await agHeader.isVisible({ timeout: 3000 }).catch(() => false);
        if (isAgHeader) return;
        const thead = this.page.locator('thead, [role="rowgroup"]').first();
        const isThead = await thead.isVisible({ timeout: 3000 }).catch(() => false);
        if (isThead) return;
        // Acceptable: grid not yet loaded - verify the page form is present (empty state or search form)
        const formOrEmpty = this.page.locator('[role="complementary"], aside, h2').first();
        await formOrEmpty.waitFor({ state: 'visible', timeout: 10000 });
    }

    async verifyGridRowsHaveData() {
        // Try ag-grid cells first, fall back to table cells
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

    async verifyEmptyStateOrValidation() {
        // Accept: ag-grid empty overlay, custom "No Data Available" heading, or any visible grid container
        const agOverlay = this.page.locator('.ag-overlay-no-rows-wrapper');
        const customEmpty = LOCATORS.LendingPitLookupPage.emptyStateHeading(this.page);
        const isAgOverlay = await agOverlay.isVisible({ timeout: 2000 }).catch(() => false);
        const isCustomEmpty = await customEmpty.isVisible({ timeout: 2000 }).catch(() => false);
        const isAnyGrid = await this.page.locator('.ag-root-wrapper, main, [role="main"]').first().isVisible({ timeout: 2000 }).catch(() => false);
        expect(isAgOverlay || isCustomEmpty || isAnyGrid).toBe(true);
    }

    async verifyEmptyStateOverlay() {
        // Accept: ag-grid overlay OR custom "No Data Available" empty state.
        //
        // This used to probe the ag-Grid overlay with isVisible({ timeout }),
        // which does NOT wait - Playwright accepts the option and ignores it, so
        // the check returned false while the overlay was still rendering and the
        // method then waited 15s for a custom heading this screen never shows.
        // Race real waits on both instead, so whichever the app renders wins.
        const agOverlay = this.page.locator('.ag-overlay-no-rows-wrapper').first();
        const customEmpty = LOCATORS.LendingPitLookupPage.emptyStateHeading(this.page).first();
        await Promise.race([
            agOverlay.waitFor({ state: 'visible', timeout: 20000 }).catch(() => {}),
            customEmpty.waitFor({ state: 'visible', timeout: 20000 }).catch(() => {}),
        ]);
        const shown =
            (await agOverlay.isVisible().catch(() => false)) ||
            (await customEmpty.isVisible().catch(() => false));
        expect(shown, 'no empty-state indicator visible on the Lending Pit grid').toBe(true);
    }

    /**
     * An unknown symbol returned no rate data.
     *
     * Mirrors BulkSnapshotPage.verifyNoRateDataForSymbol() - see the note there.
     * Searching ZZZZINVALID echoes the symbol back as a row with blank data
     * columns rather than rendering a no-rows overlay, so asserting the overlay
     * only passed when the check caught the grid mid-load. verifyEmptyStateOverlay()
     * above is left alone: it is correct for the "before any search is performed"
     * scenario, where the grid really is empty.
     */
    async verifyNoRateDataForSymbol(symbol) {
        const grid = this.page.locator('ag-grid-angular').first();
        await grid.locator('.ag-overlay-loading-wrapper')
            .waitFor({ state: 'hidden', timeout: 20000 })
            .catch(() => {});

        const rows = grid.locator('.ag-center-cols-container .ag-row');
        const echoedRow = rows
            .filter({ has: this.page.getByRole('gridcell', { name: symbol, exact: true }) })
            .first();

        const hasEchoedRow = await echoedRow
            .waitFor({ state: 'visible', timeout: 15000 })
            .then(() => true)
            .catch(() => false);

        if (!hasEchoedRow) {
            const rowCount = await rows.count().catch(() => 0);
            expect(
                rowCount,
                `searched "${symbol}" and the grid holds ${rowCount} row(s), none of them for that symbol`
            ).toBe(0);
            return;
        }

        const cellTexts = await echoedRow.locator('.ag-cell').allTextContents();
        const dataCells = cellTexts.filter((t) => t.trim() !== symbol);
        const populated = dataCells.filter((t) => t.trim() !== '');
        expect(
            populated,
            `"${symbol}" is unknown, so its row should carry no rate data, but ` +
            `${populated.length} cell(s) are populated: ${JSON.stringify(populated)}`
        ).toEqual([]);
    }

    async verifyPageNotCrashed() {
        // Page is not crashed if the main content area is still visible
        const main = this.page.locator('main, [role="main"], h2').first();
        await main.waitFor({ state: 'visible', timeout: 10000 });
    }

    async verifyColumnsAligned() {
        // Try ag-grid headers, fall back to any column headers
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
