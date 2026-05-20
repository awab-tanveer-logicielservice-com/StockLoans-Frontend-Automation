import { createBdd } from 'playwright-bdd';
import { test } from './fixtures.js';

const { Given, When, Then } = createBdd(test);

// ── Navigation ────────────────────────────────────────────────────────────────

When('the user navigates to the Bulk Import page', async ({ bulkImportPage }) => {
  await bulkImportPage.navigate();
});

// ── Toggle actions ────────────────────────────────────────────────────────────

When('the user selects the {string} toggle', async ({ bulkImportPage }, toggleName) => {
  await bulkImportPage.selectToggle(toggleName);
});

Then('the {string} toggle should be selected by default', async ({ bulkImportPage }, toggleName) => {
  await bulkImportPage.isBorrowToggleDefault();
});

Then('the {string} toggle should be active', async ({ bulkImportPage }, toggleName) => {
  await bulkImportPage.isToggleActive(toggleName);
});

// ── Form fill — counterparty ──────────────────────────────────────────────────

When('the user selects a valid counterparty', async ({ bulkImportPage }) => {
  await bulkImportPage.selectCounterparty();
});

// ── Form fill — symbol / CUSIP ────────────────────────────────────────────────

When('the user enters a valid symbol or CUSIP', async ({ bulkImportPage }) => {
  bulkImportPage.setSymbol('AAPL');
});

When('the user enters {string} in the symbol or CUSIP field', async ({ bulkImportPage }, value) => {
  bulkImportPage.setSymbol(value);
});

// ── Form fill — quantity ──────────────────────────────────────────────────────

When('the user enters a valid quantity', async ({ bulkImportPage }) => {
  bulkImportPage.setQty('100');
});

When('the user enters {string} in the quantity field', async ({ bulkImportPage }, value) => {
  bulkImportPage.setQty(value);
});

// ── Form fill — rate ──────────────────────────────────────────────────────────

When('the user enters a valid rate', async ({ bulkImportPage }) => {
  bulkImportPage.setRate('200');
});

When('the user enters {string} in the rate field', async ({ bulkImportPage }, value) => {
  bulkImportPage.setRate(value);
});

// ── Additional optional fields ────────────────────────────────────────────────

When('the user enters a batch code', async ({ bulkImportPage }) => {
  await bulkImportPage.enterBatchCode();
});

When('the user sets a spec flag', async ({ bulkImportPage }) => {
  await bulkImportPage.setSpecFlag();
});

When('the user enters a profit center', async ({ bulkImportPage }) => {
  await bulkImportPage.enterProfitCenter();
});

When('the user enters a div rate', async ({ bulkImportPage }) => {
  await bulkImportPage.enterDivRate();
});

When('the user enters a margin value', async ({ bulkImportPage }) => {
  await bulkImportPage.enterMargin();
});

When('the user selects a rounding option', async ({ bulkImportPage }) => {
  await bulkImportPage.selectRoundingOption();
});

// ── Import action ─────────────────────────────────────────────────────────────

When('the user clicks the import button', async ({ bulkImportPage }) => {
  await bulkImportPage.clickImport();
});

// ── Grid 1 interactions ───────────────────────────────────────────────────────

When('the user selects the first row in Grid 1', async ({ bulkImportPage }) => {
  await bulkImportPage.selectFirstRowGrid1();
});

When('the user selects all rows in Grid 1', async ({ bulkImportPage }) => {
  await bulkImportPage.selectAllRowsGrid1();
});

// ── Submit actions ────────────────────────────────────────────────────────────

When('the user submits the selected rows', async ({ bulkImportPage }) => {
  await bulkImportPage.clickSubmit();
});

When('the user clicks the submit button without selecting any rows', async ({ bulkImportPage }) => {
  await bulkImportPage.clickSubmitWithoutSelection();
});

When('the user attempts to click the submit button without permissions', async ({ bulkImportPage }) => {
  await bulkImportPage.attemptSubmitWithoutPermissions();
});

// ── Preconditions ─────────────────────────────────────────────────────────────

Given('at least one imported record exists in Grid 1', async ({ bulkImportPage }) => {
  await bulkImportPage.ensureGrid1HasRecord();
});

Given('multiple imported records exist in Grid 1', async ({ bulkImportPage }) => {
  await bulkImportPage.ensureGrid1HasMultipleRecords();
});

// ── Page-level assertions ─────────────────────────────────────────────────────

Then('the Bulk Import page should be visible', async ({ bulkImportPage }) => {
  await bulkImportPage.isBulkImportPageVisible();
});

Then('the import controls should be enabled', async ({ bulkImportPage }) => {
  await bulkImportPage.areImportControlsEnabled();
});

// ── Grid 1 assertions ─────────────────────────────────────────────────────────

Then('Grid 1 should display the imported contract record', async ({ bulkImportPage }) => {
  await bulkImportPage.isGrid1RecordVisible();
});

Then('Grid 1 should display the imported contract record with all additional settings', async ({ bulkImportPage }) => {
  await bulkImportPage.isGrid1RecordVisibleWithAllSettings();
});

Then('the imported record should show a comment for the import', async ({ bulkImportPage }) => {
  await bulkImportPage.isImportedRecordCommentVisible();
});

Then('Grid 1 should no longer contain the submitted record', async ({ bulkImportPage }) => {
  await bulkImportPage.isGrid1RecordGone();
});

Then('Grid 1 should display the empty state overlay', async ({ bulkImportPage }) => {
  await bulkImportPage.isGrid1EmptyState();
});

Then('Grid 1 should be empty after bulk submission', async ({ bulkImportPage }) => {
  await bulkImportPage.isGrid1EmptyAfterSubmission();
});

// ── Grid 2 assertions ─────────────────────────────────────────────────────────

Then('the submitted record should appear in Grid 2', async ({ bulkImportPage }) => {
  await bulkImportPage.isSubmittedRecordInGrid2();
});

Then('Grid 2 should display the {string} column', async ({ bulkImportPage }, colName) => {
  await bulkImportPage.isGrid2ColumnVisible(colName);
});

Then('Grid 2 should display the empty state overlay', async ({ bulkImportPage }) => {
  await bulkImportPage.isGrid2EmptyState();
});

Then('all selected records should appear in Grid 2', async ({ bulkImportPage }) => {
  await bulkImportPage.areAllRecordsInGrid2();
});

// ── Submit restriction assertions ─────────────────────────────────────────────

Then('the submit action should be blocked', async ({ bulkImportPage }) => {
  await bulkImportPage.isSubmitBlocked();
});

Then('a Bulk Import access restriction message should be displayed', async ({ bulkImportPage }) => {
  await bulkImportPage.isAccessRestrictionVisible();
});

Then('a Bulk Import row selection warning should be displayed', async ({ bulkImportPage }) => {
  await bulkImportPage.isRowSelectionWarningVisible();
});

// ── Validation error assertions ───────────────────────────────────────────────

Then('a validation error for the Counterparty field should be displayed', async ({ bulkImportPage }) => {
  await bulkImportPage.isValidationErrorVisible();
});

Then(/^a validation error for the Symbol\/CUSIP field should be displayed$/, async ({ bulkImportPage }) => {
  await bulkImportPage.isValidationErrorVisible();
});

Then('a validation error for the Qty field should be displayed', async ({ bulkImportPage }) => {
  await bulkImportPage.isValidationErrorVisible();
});

Then('a validation error for the Rate field should be displayed', async ({ bulkImportPage }) => {
  await bulkImportPage.isValidationErrorVisible();
});

// ── Scenario Outline outcome ──────────────────────────────────────────────────

Then('the expected import outcome should be {string}', async ({ bulkImportPage }, outcome) => {
  await bulkImportPage.assertExpectedOutcome(outcome);
});
