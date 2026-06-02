import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { test } from './fixtures.js';

const { When, Then } = createBdd(test);

When('the user navigates to the Short Interest Rate Adjustment page', async ({ shortInterestRateAdjustmentPage }) => {
  await shortInterestRateAdjustmentPage.navigateToPage();
});

Then('the Short Interest Rate Adjustment grid should be visible', async ({ shortInterestRateAdjustmentPage }) => {
  await shortInterestRateAdjustmentPage.verifyGridVisible();
});

Then('the grid should display rate data loaded from SLS V1 endpoints', async ({ shortInterestRateAdjustmentPage }) => {
  await shortInterestRateAdjustmentPage.verifyDataLoaded();
});

When('the user selects the first row in the rate adjustment grid', async ({ shortInterestRateAdjustmentPage }) => {
  await shortInterestRateAdjustmentPage.selectFirstRow();
});

When('the user enters a new rate value of {string} in the rate input field', async ({ shortInterestRateAdjustmentPage }, rate) => {
  await shortInterestRateAdjustmentPage.enterRateValue(rate);
});

When('the user clicks the save button', async ({ shortInterestRateAdjustmentPage }) => {
  await shortInterestRateAdjustmentPage.clickSave();
});

Then('a success confirmation message should be displayed', async ({ shortInterestRateAdjustmentPage }) => {
  await shortInterestRateAdjustmentPage.verifySuccessMessage();
});

Then('the grid should reflect the updated rate value', async ({ shortInterestRateAdjustmentPage }) => {
  await shortInterestRateAdjustmentPage.verifyGridUpdated();
});

Then('the rate input field should be editable', async ({ shortInterestRateAdjustmentPage }) => {
  await shortInterestRateAdjustmentPage.verifyRateInputEditable();
});

When('the user attempts to edit a rate cell', async ({ shortInterestRateAdjustmentPage }) => {
  await shortInterestRateAdjustmentPage.attemptEditRateCell();
});

Then('the rate input field should not be editable', async ({ shortInterestRateAdjustmentPage }) => {
  await shortInterestRateAdjustmentPage.verifyRateInputNotEditable();
});

Then('an access restriction message should be displayed', async ({ shortInterestRateAdjustmentPage }) => {
  await shortInterestRateAdjustmentPage.verifyAccessRestrictionMessage();
});

Then('the grid header row should be visible with expected column names', async ({ shortInterestRateAdjustmentPage }) => {
  await shortInterestRateAdjustmentPage.verifyGridHeaders();
});

Then('the grid should use the Ag-Grid component for data management', async ({ shortInterestRateAdjustmentPage }) => {
  await shortInterestRateAdjustmentPage.verifyAgGridPresent();
});

Then('the page container should be visible with V2 theme styling applied', async ({ shortInterestRateAdjustmentPage }) => {
  await shortInterestRateAdjustmentPage.verifyV2ThemeStyling();
});

When('the user clicks the save button without selecting any row', async ({ shortInterestRateAdjustmentPage }) => {
  await shortInterestRateAdjustmentPage.clickSave();
});

Then('the save action should be blocked', async ({ shortInterestRateAdjustmentPage }) => {
  await shortInterestRateAdjustmentPage.verifySaveBlocked();
});

Then('a row selection warning message should be displayed', async ({ shortInterestRateAdjustmentPage }) => {
  await shortInterestRateAdjustmentPage.verifyRowSelectionWarning();
});

Then('the rate input field should be disabled before any row is selected', async ({ shortInterestRateAdjustmentPage }) => {
  await shortInterestRateAdjustmentPage.verifyRateInputDisabled();
});

Then('the rate input field should be enabled', async ({ shortInterestRateAdjustmentPage }) => {
  await shortInterestRateAdjustmentPage.verifyRateInputEnabled();
});

When('the user clears the rate input field', async ({ shortInterestRateAdjustmentPage }) => {
  await shortInterestRateAdjustmentPage.clearRateInput();
});

Then('a validation error for the rate field should be displayed', async ({ shortInterestRateAdjustmentPage }) => {
  await shortInterestRateAdjustmentPage.verifyRateValidationError();
});

Then('the save action should not proceed', async ({ shortInterestRateAdjustmentPage }) => {
  await shortInterestRateAdjustmentPage.verifySaveBlocked();
});

Then('the expected outcome should be {string}', async ({ shortInterestRateAdjustmentPage }, outcome) => {
  if (outcome === 'success') {
    await shortInterestRateAdjustmentPage.verifySuccessMessage();
  } else {
    await shortInterestRateAdjustmentPage.verifyRateValidationError();
  }
});

When('no rate records are present in the system', async ({ shortInterestRateAdjustmentPage }) => {
  await shortInterestRateAdjustmentPage.waitForGridLoad();
});

Then('the grid empty state overlay should be displayed', async ({ shortInterestRateAdjustmentPage }) => {
  await shortInterestRateAdjustmentPage.verifyEmptyGridOverlay();
});

When('the user enters a rate value exceeding the maximum allowed length', async ({ shortInterestRateAdjustmentPage }) => {
  await shortInterestRateAdjustmentPage.enterRateValue('99999999999999');
});

Then('the rate input field should enforce the character limit', async ({ shortInterestRateAdjustmentPage }) => {
  await shortInterestRateAdjustmentPage.verifyMaxLengthEnforced();
});

When('the SLS V1 endpoint returns an error', async ({ shortInterestRateAdjustmentPage }) => {
  await shortInterestRateAdjustmentPage.waitForGridLoad();
});

Then('the grid should display a data load error message', async ({ shortInterestRateAdjustmentPage }) => {
  await shortInterestRateAdjustmentPage.verifyDataLoadError();
});
