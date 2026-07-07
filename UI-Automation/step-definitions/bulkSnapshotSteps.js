import { createBdd } from 'playwright-bdd';
import { test } from './fixtures.js';

const { When, Then } = createBdd(test);

// ── Navigation ────────────────────────────────────────────────────────────────

When('the user navigates to the Bulk Snapshot page', async ({ bulkSnapshotPage }) => {
  await bulkSnapshotPage.navigateToBulkSnapshot();
});

When('the user opens the navigation menu', async ({ bulkSnapshotPage }) => {
  await bulkSnapshotPage.openNavigationMenu();
});

// ── Actions ───────────────────────────────────────────────────────────────────

When('the user enters a valid symbol in the Bulk Snapshot search field', async ({ bulkSnapshotPage }) => {
  await bulkSnapshotPage.enterSymbol('AAPL');
});

When('the user enters multiple symbols in the Bulk Snapshot search field', async ({ bulkSnapshotPage }) => {
  await bulkSnapshotPage.enterMultipleSymbols(['AAPL', 'MSFT', 'GOOGL']);
});

When('the user enters {string} in the Bulk Snapshot search field', async ({ bulkSnapshotPage }, symbol) => {
  await bulkSnapshotPage.enterSymbol(symbol);
});

When('the user clicks the Bulk Snapshot Fetch Rates button', async ({ bulkSnapshotPage }) => {
  await bulkSnapshotPage.clickSubmitButton();
});

When('the user clicks the Bulk Snapshot Fetch Rates button without entering a symbol', async ({ bulkSnapshotPage }) => {
  await bulkSnapshotPage.clearSymbolAndSubmit();
});

When('the user clicks the Bulk Snapshot Clear button', async ({ bulkSnapshotPage }) => {
  await bulkSnapshotPage.clickClearButton();
});

// ── Assertions — Page Identity ─────────────────────────────────────────────────

Then('the Bulk Snapshot page heading should be visible', async ({ bulkSnapshotPage }) => {
  await bulkSnapshotPage.verifyPageHeadingVisible();
});

Then('the navigation link for {string} should be visible', async ({ bulkSnapshotPage }, linkName) => {
  await bulkSnapshotPage.verifyNavLinkVisible(linkName);
});

// ── Assertions — Form Controls ────────────────────────────────────────────────

Then('the Bulk Snapshot Fetch Rates button should be visible', async ({ bulkSnapshotPage }) => {
  await bulkSnapshotPage.verifyFetchRatesButtonVisible();
});

Then('the Bulk Snapshot Clear button should be visible', async ({ bulkSnapshotPage }) => {
  await bulkSnapshotPage.verifyClearButtonVisible();
});

Then('the Use Cached Rates checkbox should be visible and checked by default', async ({ bulkSnapshotPage }) => {
  await bulkSnapshotPage.verifyUseCachedRatesCheckedByDefault();
});

Then('the Bulk Snapshot symbol textarea should be empty', async ({ bulkSnapshotPage }) => {
  await bulkSnapshotPage.verifyTextareaCleared();
});

// ── Assertions — Empty State ───────────────────────────────────────────────────

Then('the Bulk Snapshot empty state should show "No Data Available" with "Start Searching" button', async ({ bulkSnapshotPage }) => {
  await bulkSnapshotPage.verifyEmptyStateOverlay();
  await bulkSnapshotPage.verifyStartSearchingButtonVisible();
});

Then('the Bulk Snapshot Ag-Grid should display the empty state overlay', async ({ bulkSnapshotPage }) => {
  await bulkSnapshotPage.verifyEmptyStateOverlay();
});

Then('the Bulk Snapshot grid should display the empty state overlay or a validation message', async ({ bulkSnapshotPage }) => {
  await bulkSnapshotPage.verifyEmptyStateOrValidation();
});

// ── Assertions — Ag-Grid ──────────────────────────────────────────────────────

Then('the Bulk Snapshot Ag-Grid should be visible', async ({ bulkSnapshotPage }) => {
  await bulkSnapshotPage.verifyAgGridVisible();
});

Then('the Bulk Snapshot Ag-Grid should display matching results', async ({ bulkSnapshotPage }) => {
  await bulkSnapshotPage.verifyGridDisplaysResults();
});

Then('the Bulk Snapshot Ag-Grid header row should be visible', async ({ bulkSnapshotPage }) => {
  await bulkSnapshotPage.verifyAgGridHeadersVisible();
});

// ── Assertions — Columns & Rows ───────────────────────────────────────────────

Then('the Bulk Snapshot results grid should display the {string} column', async ({ bulkSnapshotPage }, columnName) => {
  await bulkSnapshotPage.verifyColumnVisible(columnName);
});

Then('the Bulk Snapshot grid should contain a row matching the searched symbol', async ({ bulkSnapshotPage }) => {
  await bulkSnapshotPage.verifyRowMatchesSymbol(null);
});

Then('the Bulk Snapshot grid rows should contain valid data values', async ({ bulkSnapshotPage }) => {
  await bulkSnapshotPage.verifyGridRowsHaveData();
});

Then('the Bulk Snapshot grid columns should remain correctly aligned', async ({ bulkSnapshotPage }) => {
  await bulkSnapshotPage.verifyColumnsAligned();
});

// ── Assertions — Negative / Edge ─────────────────────────────────────────────

Then('the Bulk Snapshot page should not crash', async ({ bulkSnapshotPage }) => {
  await bulkSnapshotPage.verifyPageNotCrashed();
});

// ── Scenario Outline ─────────────────────────────────────────────────────────

Then('the Bulk Snapshot expected search outcome should be {string}', async ({ bulkSnapshotPage }, outcome) => {
  await bulkSnapshotPage.verifySearchOutcome(outcome);
});
