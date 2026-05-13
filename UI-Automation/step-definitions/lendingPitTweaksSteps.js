import { createBdd } from 'playwright-bdd';
import { test } from './fixtures.js';

const { Given, When, Then } = createBdd(test);

// ── Navigation ────────────────────────────────────────────────────────────────

When('the user navigates to the Lending Pit Lookup page', async ({ searchLendingPitLookUpPage }) => {
  await searchLendingPitLookUpPage.navigateToLendingPitLookup();
});

// ── Actions ───────────────────────────────────────────────────────────────────

When('the user enters a valid symbol in the search field', async ({ searchLendingPitLookUpPage }) => {
  await searchLendingPitLookUpPage.enterSymbol('AAPL');
});

When('the user enters {string} in the Lending Pit search field', async ({ searchLendingPitLookUpPage }, symbol) => {
  await searchLendingPitLookUpPage.enterSymbol(symbol);
});

When('the user clicks the submit button', async ({ searchLendingPitLookUpPage }) => {
  await searchLendingPitLookUpPage.clickSubmitButton();
});

When('the user clicks the submit button without entering a symbol', async ({ searchLendingPitLookUpPage }) => {
  await searchLendingPitLookUpPage.clearSymbolAndSubmit();
});

// ── Assertions — Ag-Grid ──────────────────────────────────────────────────────

Then('the Lending Pit Ag-Grid should be visible', async ({ searchLendingPitLookUpPage }) => {
  await searchLendingPitLookUpPage.verifyAgGridVisible();
});

Then('the grid should display data rows', async ({ searchLendingPitLookUpPage }) => {
  await searchLendingPitLookUpPage.verifyGridHasRows();
});

Then('the Lending Pit Ag-Grid should display matching results', async ({ searchLendingPitLookUpPage }) => {
  await searchLendingPitLookUpPage.verifyGridDisplaysResults();
});

Then('the Ag-Grid header row should be visible with correctly styled column headers', async ({ searchLendingPitLookUpPage }) => {
  await searchLendingPitLookUpPage.verifyAgGridHeadersVisible();
});

Then('the grid rows should contain valid data values', async ({ searchLendingPitLookUpPage }) => {
  await searchLendingPitLookUpPage.verifyGridRowsHaveData();
});

Then('the grid columns should remain correctly aligned', async ({ searchLendingPitLookUpPage }) => {
  await searchLendingPitLookUpPage.verifyColumnsAligned();
});

Then('the Lending Pit Ag-Grid should display the empty state overlay', async ({ searchLendingPitLookUpPage }) => {
  await searchLendingPitLookUpPage.verifyEmptyStateOverlay();
});

Then('the grid should display the empty state overlay or a validation message', async ({ searchLendingPitLookUpPage }) => {
  await searchLendingPitLookUpPage.verifyEmptyStateOrValidation();
});

// ── Assertions — Columns ─────────────────────────────────────────────────────

Then('the results grid should display the {string} column', async ({ searchLendingPitLookUpPage }, columnName) => {
  await searchLendingPitLookUpPage.verifyColumnVisible(columnName);
});

Then('the grid should contain a row matching the searched symbol', async ({ searchLendingPitLookUpPage }) => {
  await searchLendingPitLookUpPage.verifyRowMatchesSymbol(null);
});

// ── Assertions — UI Consistency ───────────────────────────────────────────────

Then('the Lending Pit page header should be visible with consistent styling', async ({ searchLendingPitLookUpPage }) => {
  await searchLendingPitLookUpPage.verifyPageHeaderVisible();
});

Then('the Lending Pit page buttons should be visible with consistent styling', async ({ searchLendingPitLookUpPage }) => {
  await searchLendingPitLookUpPage.verifyPageButtonsVisible();
});

Then('the Lending Pit grid should use the Ag-Grid component', async ({ searchLendingPitLookUpPage }) => {
  await searchLendingPitLookUpPage.verifyUsesAgGrid();
});

Then('the Lending Pit page headings should be visible with consistent styling', async ({ searchLendingPitLookUpPage }) => {
  await searchLendingPitLookUpPage.verifyPageHeadingsVisible();
});

Then('the Lending Pit page container should have consistent theme colors applied', async ({ searchLendingPitLookUpPage }) => {
  await searchLendingPitLookUpPage.verifyThemeColorsApplied();
});

// ── Assertions — Negative / Edge ─────────────────────────────────────────────

Then('the page should not crash', async ({ searchLendingPitLookUpPage }) => {
  await searchLendingPitLookUpPage.verifyPageNotCrashed();
});

// ── Scenario Outline ─────────────────────────────────────────────────────────

Then('the expected search outcome should be {string}', async ({ searchLendingPitLookUpPage }, outcome) => {
  await searchLendingPitLookUpPage.verifySearchOutcome(outcome);
});
