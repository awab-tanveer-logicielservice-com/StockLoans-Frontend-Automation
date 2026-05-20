import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { test } from './fixtures.js';

const { Given, When, Then } = createBdd(test);

Given('the user navigates to the Memo Seg page', async ({ memoSegPage }) => {
  await memoSegPage.navigateToMemoSeg();
});

When('the user enters {string} in the memo seg text input', async ({ memoSegPage }, inputText) => {
  await memoSegPage.enterBatchInput(inputText);
});

When('the user submits the memo seg batch', async ({ memoSegPage }) => {
  await memoSegPage.submitBatch();
});

When('the user submits the memo seg batch without entering any data', async ({ memoSegPage }) => {
  await memoSegPage.submitBatch();
});

When('the user views the Memo Seg page without submitting a batch', async ({ memoSegPage }) => {
  await memoSegPage.verifyPageVisible();
});

When('the user views the summary grid without selecting a row', async ({ memoSegPage }) => {
  await memoSegPage.verifySummaryGridVisible();
});

When('the user enters multiple symbols with quantities in the memo seg text input', async ({ memoSegPage }) => {
  await memoSegPage.enterMultipleBatchInputs();
});

When('the user selects a grouped row in the summary grid', async ({ memoSegPage }) => {
  await memoSegPage.selectFirstGroupedRow();
});

When('the user clicks the UN-SEG button', async ({ memoSegPage }) => {
  await memoSegPage.clickUnSegButton();
});

When('the user clears the memo seg text input', async ({ memoSegPage }) => {
  await memoSegPage.clearTextInput();
});

Then('the Memo Seg page should be visible with the text input area', async ({ memoSegPage }) => {
  await memoSegPage.verifyPageVisible();
});

Then('the summary grid should display a batch entry for symbol {string}', async ({ memoSegPage }, symbol) => {
  await memoSegPage.verifySummaryGridHasSymbol(symbol);
});

Then('the detail grid should display the batch details for symbol {string}', async ({ memoSegPage }, symbol) => {
  await memoSegPage.verifyDetailGridHasSymbol(symbol);
});

Then('the UN-SEG button should be disabled', async ({ memoSegPage }) => {
  await memoSegPage.verifyUnSegButtonDisabled();
});

Then('the UN-SEG button should be visible on the Memo Seg page', async ({ memoSegPage }) => {
  await memoSegPage.verifyUnSegButtonVisible();
});

Then('the UN-SEG action should complete successfully', async ({ memoSegPage }) => {
  await memoSegPage.verifyUnSegSuccess();
});

Then('the summary grid should display rows grouped by symbol', async ({ memoSegPage }) => {
  await memoSegPage.verifySummaryGridGrouped();
});

Then('a validation error should be displayed indicating input is required', async ({ memoSegPage }) => {
  await memoSegPage.verifyValidationError();
});

Then('a validation error should be displayed for missing quantity', async ({ memoSegPage }) => {
  await memoSegPage.verifyMissingQuantityError();
});

Then('a validation error should be displayed for invalid quantity format', async ({ memoSegPage }) => {
  await memoSegPage.verifyInvalidQuantityFormatError();
});

Then('the system should show {string}', async ({ memoSegPage }, expectedOutcome) => {
  await memoSegPage.verifyBatchOutcome(expectedOutcome);
});

Then('a validation error should be displayed for invalid symbol format', async ({ memoSegPage }) => {
  await memoSegPage.verifyInvalidSymbolFormatError();
});

Then('the summary grid and detail grid should be reset to empty state', async ({ memoSegPage }) => {
  await memoSegPage.verifyGridsReset();
});

Then('the detail grid should display the correct column headers', async ({ memoSegPage }) => {
  await memoSegPage.verifyDetailGridHeaders();
});

Then('the grids should reflect the updated state after UN-SEG', async ({ memoSegPage }) => {
  await memoSegPage.verifyGridsUpdatedAfterUnSeg();
});
