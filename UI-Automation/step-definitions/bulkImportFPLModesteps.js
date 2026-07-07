import { createBdd } from 'playwright-bdd';
import { test } from './fixtures.js';

const { Given, When, Then } = createBdd(test);

// ── Import mode toggle ────────────────────────────────────────────────────────

When('the user activates FPL Mode', async ({ bulkImportPage }) => {
  await bulkImportPage.activateFPLMode();
});

When('the user switches back to standard import mode', async ({ bulkImportPage }) => {
  await bulkImportPage.deactivateFPLMode();
});

// ── Page-level assertions ─────────────────────────────────────────────────────

Then('the FPL Mode interface should be displayed', async ({ bulkImportPage }) => {
  await bulkImportPage.isFPLModeActive();
});

Then('the standard import interface should be displayed', async ({ bulkImportPage }) => {
  await bulkImportPage.isStandardModeVisible();
});

Then('the FPL import controls should be enabled', async ({ bulkImportPage }) => {
  await bulkImportPage.isFPLImportControlsEnabled();
});

Then('the rate field should not be required in FPL Mode', async ({ bulkImportPage }) => {
  await bulkImportPage.isFPLRateFieldAbsent();
});

// ── Form fill — FPL symbol & quantity ────────────────────────────────────────

When('the user enters a valid FPL symbol', async ({ bulkImportPage }) => {
  bulkImportPage.setFPLSymbol('AAPL');
});

When('the user enters a valid FPL quantity', async ({ bulkImportPage }) => {
  bulkImportPage.setFPLQty('100');
});

When('the user enters {string} as the FPL symbol', async ({ bulkImportPage }, value) => {
  bulkImportPage.setFPLSymbol(value);
});

When('the user enters {string} as the FPL allocation quantity', async ({ bulkImportPage }, value) => {
  bulkImportPage.setFPLQty(value);
});

// ── Import action ─────────────────────────────────────────────────────────────

When('the user clicks the FPL import button', async ({ bulkImportPage }) => {
  await bulkImportPage.clickFPLImport();
});

// ── Precondition helpers ──────────────────────────────────────────────────────

Given('at least one FPL allocation record exists in Grid 1', async ({ bulkImportPage }) => {
  await bulkImportPage.ensureGrid1HasFPLRecord();
});

// ── Grid 1 assertions ─────────────────────────────────────────────────────────

Then('Grid 1 should display the imported FPL allocation record', async ({ bulkImportPage }) => {
  await bulkImportPage.isGrid1FPLRecordVisible();
});

Then('Grid 1 should show a status column for FPL allocations', async ({ bulkImportPage }) => {
  await bulkImportPage.isFPLStatusColumnVisible();
});

Then('the system should apply pricing automatically for the FPL allocation', async ({ bulkImportPage }) => {
  await bulkImportPage.isFPLSystemPricingApplied();
});

// ── Grid 2 assertions ─────────────────────────────────────────────────────────

Then('Grid 2 should display the FPL submission history', async ({ bulkImportPage }) => {
  await bulkImportPage.isGrid2FPLHistoryVisible();
});

// ── Validation error assertions ───────────────────────────────────────────────

Then('a validation error for the FPL Symbol field should be displayed', async ({ bulkImportPage }) => {
  await bulkImportPage.isFPLValidationErrorVisible();
});

Then('a validation error for the FPL Quantity field should be displayed', async ({ bulkImportPage }) => {
  await bulkImportPage.isFPLValidationErrorVisible();
});

// ── Scenario Outline outcome ──────────────────────────────────────────────────

Then('the expected FPL import outcome should be {string}', async ({ bulkImportPage }, outcome) => {
  await bulkImportPage.assertFPLOutcome(outcome);
});
