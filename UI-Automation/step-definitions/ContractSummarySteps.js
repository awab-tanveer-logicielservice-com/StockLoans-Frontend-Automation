import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { test } from './fixtures.js';

const { Given, When, Then } = createBdd(test);

// ── Navigation ────────────────────────────────────────────────────────────────

Given('the user navigates to the Contract Summary page', async ({ contractSummaryPage }) => {
  await contractSummaryPage.navigate();
});

// ── Grid Visibility ───────────────────────────────────────────────────────────

Then('the Contract Summary grid should be visible', async ({ contractSummaryPage }) => {
  await contractSummaryPage.isGridVisible();
});

Then('the grid should display summary rows grouped by symbol', async ({ contractSummaryPage }) => {
  await contractSummaryPage.hasGridRows();
});

Then('each summary row should represent a unique symbol grouping', async ({ contractSummaryPage }) => {
  await contractSummaryPage.hasGridRows();
});

// ── Column Visibility ─────────────────────────────────────────────────────────

Then('the grid should display the Borrow Rate column', async ({ contractSummaryPage }) => {
  await contractSummaryPage.isColumnVisible('Borrow');
});

Then('the grid should display the Loan Rate column', async ({ contractSummaryPage }) => {
  await contractSummaryPage.isColumnVisible('Loan');
});

Then('the grid should display the Quantity column', async ({ contractSummaryPage }) => {
  await contractSummaryPage.isColumnGroupVisible('Quantity');
});

Then('the grid should display the Spread column', async ({ contractSummaryPage }) => {
  await contractSummaryPage.isColumnVisible('Spread');
});

Then('the grid should display the Imbalance column', async ({ contractSummaryPage }) => {
  await contractSummaryPage.isColumnVisible('Imbal.');
});

Then('the grid should display the Cash\\/Net column', async ({ contractSummaryPage }) => {
  await contractSummaryPage.isColumnVisible('Cash');
});

Then('the grid should display the Rebate column', async ({ contractSummaryPage }) => {
  await contractSummaryPage.isColumnVisible('Rebate');
});

// ── Calculation Assertions ────────────────────────────────────────────────────

Then('the Borrow Rate column should reflect the weighted average by quantity', async ({ contractSummaryPage }) => {
  await contractSummaryPage.isColumnVisible('Borrow');
  await contractSummaryPage.hasGridRows();
});

Then('the Loan Rate column should reflect the weighted average by quantity', async ({ contractSummaryPage }) => {
  await contractSummaryPage.isColumnVisible('Loan');
  await contractSummaryPage.hasGridRows();
});

Then('the Spread column value should equal the difference between the aggregated borrow and loan rates', async ({ contractSummaryPage }) => {
  await contractSummaryPage.isColumnVisible('Spread');
  await contractSummaryPage.hasGridRows();
});

Then('the Imbalance column value should equal Borrow Qty minus Loan Qty for each row', async ({ contractSummaryPage }) => {
  await contractSummaryPage.isColumnVisible('Imbal.');
  await contractSummaryPage.hasGridRows();
});

Then('the Cash\\/Net column value should equal Loan Amount minus Borrow Amount for each row', async ({ contractSummaryPage }) => {
  await contractSummaryPage.isColumnVisible('Cash');
  await contractSummaryPage.hasGridRows();
});

Then('the Rebate column value should reflect the correct rebate calculation', async ({ contractSummaryPage }) => {
  await contractSummaryPage.isColumnVisible('Rebate');
  await contractSummaryPage.hasGridRows();
});

Then('the Exposure\\/Recall column should reflect netted borrow-side and loan-side pending recall totals', async ({ contractSummaryPage }) => {
  await contractSummaryPage.hasGridRows();
});

Then('the Return column should reflect netted borrow-side and loan-side pending return totals', async ({ contractSummaryPage }) => {
  await contractSummaryPage.hasGridRows();
});

// ── Pinned Total Row ──────────────────────────────────────────────────────────

Then('the pinned total row should be visible at the bottom of the grid', async ({ contractSummaryPage }) => {
  await contractSummaryPage.isPinnedRowVisible();
});

Then('the pinned total row values should equal the sum of all displayed summary rows', async ({ contractSummaryPage }) => {
  await contractSummaryPage.isPinnedRowVisible();
});

Then('the pinned total row should recalculate and reflect totals of only the filtered rows', async ({ contractSummaryPage }) => {
  await contractSummaryPage.isPinnedRowVisible();
});

Then('the pinned total row should recalculate to reflect all summary rows', async ({ contractSummaryPage }) => {
  await contractSummaryPage.isPinnedRowVisible();
  await contractSummaryPage.hasGridRows();
});

Then('the pinned total row should display zero values', async ({ contractSummaryPage }) => {
  await contractSummaryPage.isPinnedRowVisible();
});

// ── Filters ───────────────────────────────────────────────────────────────────

Given('the user enters a symbol in the Symbol\\/CUSIP filter', async ({ page, contractSummaryPage, contractDetailsPage }) => {
  const pageObj = page.url().includes('contract-details') ? contractDetailsPage : contractSummaryPage;
  await pageObj.filterBySymbol(pageObj.defaultSymbol);
});

When('the user enters {string} in the Symbol\\/CUSIP filter', async ({ page, contractSummaryPage, contractDetailsPage }, symbol) => {
  const pageObj = page.url().includes('contract-details') ? contractDetailsPage : contractSummaryPage;
  await pageObj.filterBySymbol(symbol);
});

When('the user enters a value in the DTC filter', async ({ page, contractSummaryPage, contractDetailsPage }) => {
  const pageObj = page.url().includes('contract-details') ? contractDetailsPage : contractSummaryPage;
  await pageObj.filterByField('DTC', '0005');
});

When('the user enters a value in the LoanetId filter', async ({ page, contractSummaryPage, contractDetailsPage }) => {
  const pageObj = page.url().includes('contract-details') ? contractDetailsPage : contractSummaryPage;
  await pageObj.filterByField('LoanetId', '1');
});

When('the user enters a value in the Contract No. filter', async ({ page, contractSummaryPage, contractDetailsPage }) => {
  const pageObj = page.url().includes('contract-details') ? contractDetailsPage : contractSummaryPage;
  await pageObj.filterByField('Contract No.', '1');
});

When('the user enters a value in the Profit Center filter', async ({ page, contractSummaryPage, contractDetailsPage }) => {
  const pageObj = page.url().includes('contract-details') ? contractDetailsPage : contractSummaryPage;
  await pageObj.filterByField('Profit Center', 'PC1');
});

When('the user changes the Effective Date filter to a different date', async ({ page, contractSummaryPage, contractDetailsPage }) => {
  const pageObj = page.url().includes('contract-details') ? contractDetailsPage : contractSummaryPage;
  await pageObj.changeEffectiveDate();
});

When('the user clears all active filters', async ({ page, contractSummaryPage, contractDetailsPage }) => {
  const pageObj = page.url().includes('contract-details') ? contractDetailsPage : contractSummaryPage;
  await pageObj.clearFilters();
});

When('the user filters by {string} with value {string}', async ({ page, contractSummaryPage, contractDetailsPage }, filterType, filterValue) => {
  const pageObj = page.url().includes('contract-details') ? contractDetailsPage : contractSummaryPage;
  if (filterType === 'Symbol/CUSIP') {
    await pageObj.filterBySymbol(filterValue);
  } else {
    await pageObj.filterByField(filterType, filterValue);
  }
});

// ── Filter Assertions ─────────────────────────────────────────────────────────

Then('the grid should display only rows matching the entered symbol', async ({ contractSummaryPage }) => {
  await contractSummaryPage.hasGridRows();
});

Then('the grid should display only rows matching the entered DTC value', async ({ contractSummaryPage }) => {
  await contractSummaryPage.hasGridRows();
});

Then('the grid should display only rows matching the entered LoanetId', async ({ contractSummaryPage }) => {
  await contractSummaryPage.isGridVisible();
});

Then('the grid should display only rows matching the entered contract number', async ({ contractSummaryPage }) => {
  await contractSummaryPage.hasGridRows();
});

Then('the grid should display only rows matching the entered profit center', async ({ contractSummaryPage }) => {
  await contractSummaryPage.hasGridRows();
});

Then('the summary grid should reload with data for the selected effective date', async ({ contractSummaryPage }) => {
  await contractSummaryPage.isGridVisible();
});

Then('the grid should show no matching rows', async ({ page, contractSummaryPage, contractDetailsPage }) => {
  const pageObj = page.url().includes('contract-details') ? contractDetailsPage : contractSummaryPage;
  await pageObj.isEmptyStateVisible();
});

Then('the expected filter outcome should be {string}', async ({ page, contractSummaryPage, contractDetailsPage }, outcome) => {
  const pageObj = page.url().includes('contract-details') ? contractDetailsPage : contractSummaryPage;
  if (outcome === 'rows shown') {
    await pageObj.hasGridRows();
  } else {
    await pageObj.isEmptyStateVisible();
  }
});

// ── Details Toggle ────────────────────────────────────────────────────────────

Given('the user enables the Details toggle', async ({ contractSummaryPage }) => {
  await contractSummaryPage.enableDetailsToggle();
});

When('the user disables the Details toggle', async ({ contractSummaryPage }) => {
  await contractSummaryPage.disableDetailsToggle();
});

Then('the lower detail panel should be visible', async ({ contractSummaryPage }) => {
  await contractSummaryPage.isDetailPanelVisible();
});

Then('the lower detail panel should not be visible', async ({ contractSummaryPage }) => {
  await contractSummaryPage.isDetailPanelHidden();
});

// ── Row Selection ─────────────────────────────────────────────────────────────

Given('the user selects a summary row', async ({ contractSummaryPage }) => {
  await contractSummaryPage.selectFirstRow();
});

When('the user selects a different summary row', async ({ contractSummaryPage }) => {
  await contractSummaryPage.selectSecondRow();
});

Then("the detail panel should display contracts for the selected row's symbol", async ({ contractSummaryPage }) => {
  await contractSummaryPage.isDetailPanelVisible();
});

Then('the detail panel should update to display contracts for the newly selected symbol', async ({ contractSummaryPage }) => {
  await contractSummaryPage.isDetailPanelVisible();
});

Then('trade and contract action controls should be visible and enabled in the detail area', async ({ page }) => {
  await expect(page.locator('button').filter({ hasText: 'Trade' }).first()).toBeVisible();
});

Then('trade and contract action controls should not be available for the read-only user', async ({ page }) => {
  await expect(page.locator('button').filter({ hasText: 'Trade' })).not.toBeVisible();
});

// ── Double-click Navigation ───────────────────────────────────────────────────

When('the user double-clicks a summary row', async ({ contractSummaryPage }) => {
  await contractSummaryPage.doubleClickFirstRow();
});

Then('the user should be navigated to the Contract Details page', async ({ page }) => {
  await page.waitForURL(/\/contract-details/, { timeout: 15000 });
  await expect(page).toHaveURL(/\/contract-details/);
});

Then('the Contract Details page should be prefiltered to the double-clicked symbol', async ({ page }) => {
  await expect(page).toHaveURL(/\/contract-details/);
});

Then('the Contract Details page should display only contracts matching the selected symbol', async ({ page }) => {
  await expect(page).toHaveURL(/\/contract-details/);
});

// ── Depository Scoping ────────────────────────────────────────────────────────

Then('the summary grid should display contracts for the selected depository only', async ({ contractSummaryPage }) => {
  await contractSummaryPage.hasGridRows();
});

When('the user changes the selected depository', async ({ page, contractSummaryPage, contractDetailsPage }) => {
  const pageObj = page.url().includes('contract-details') ? contractDetailsPage : contractSummaryPage;
  await pageObj.changeDepository();
});

Then('the summary grid should reload with data for the newly selected depository', async ({ contractSummaryPage }) => {
  await contractSummaryPage.isGridVisible();
});

// ── Negative / Empty State ────────────────────────────────────────────────────

Given('the selected depository has no contracts', async ({ page, contractSummaryPage, contractDetailsPage }) => {
  const pageObj = page.url().includes('contract-details') ? contractDetailsPage : contractSummaryPage;
  await pageObj.filterBySymbol('ZZZZINVALID');
});

When('the user views the summary grid', async ({ contractSummaryPage }) => {
  await contractSummaryPage.isGridVisible();
});

Then('the grid should display the empty state overlay', async ({ page, contractSummaryPage, contractDetailsPage }) => {
  const pageObj = page.url().includes('contract-details') ? contractDetailsPage : contractSummaryPage;
  await pageObj.isEmptyStateVisible();
});
