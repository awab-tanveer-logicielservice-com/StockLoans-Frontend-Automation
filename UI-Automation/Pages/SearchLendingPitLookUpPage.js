import { LOCATORS } from '../utils/locators.js';

export class SearchLendingPitLookUpPage {
    constructor(page) {
        this.page = page;
        this.symbolOrCusipInput = LOCATORS.LendingPitLookupPage.symbolOrCusipInput(page);
        this.submitButton = LOCATORS.LendingPitLookupPage.submitButton(page);
        this.searchHeaderRow = LOCATORS.LendingPitLookupPage.searchHeaderRow(page);
        this.resultsHeaderRow = LOCATORS.LendingPitLookupPage.resultsHeaderRow(page);
    }

    async navigateToLendingPitLookup() {
        await LOCATORS.LendingPitLookupPage.menuButton(this.page).click();
        await LOCATORS.LendingPitLookupPage.lendingPitLookupLink(this.page).click();
    }

    async verifySearchHeaderVisible() {
        await this.searchHeaderRow.waitFor({ state: 'visible', timeout: 10000 });
    }

    async verifyResultsHeaderVisible() {
        await this.resultsHeaderRow.waitFor({ state: 'visible', timeout: 10000 });
    }

    async searchSymbolOrCusip(searchTerm) {
        await this.symbolOrCusipInput.click();
        await this.symbolOrCusipInput.fill(searchTerm);
        await this.submitButton.click();
    }

    async waitForGridToLoad() {
        // Wait for AG-Grid viewport to be populated with data
        await this.page.locator('.ag-center-cols-viewport').waitFor({ state: 'visible', timeout: 15000 });
        // Small wait for grid to finish rendering
        await this.page.waitForTimeout(1000);
    }

    async verifyGridcellVisible(cellName) {
        const gridcell = LOCATORS.LendingPitLookupPage.getGridcell(this.page, cellName).first();
        await gridcell.waitFor({ state: 'visible', timeout: 10000 });
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
}
