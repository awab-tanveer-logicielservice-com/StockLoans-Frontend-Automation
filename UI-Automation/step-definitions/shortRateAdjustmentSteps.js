import { createBdd } from 'playwright-bdd';
import { test } from './fixtures.js';

const { When, Then } = createBdd(test);

When('the user navigates to the Short Rate Adjustment page', async ({ shortRateAdjustmentPage }) => {
  await shortRateAdjustmentPage.navigateToPage();
});

Then('the Short Rate Adjustment grid should be visible', async ({ shortRateAdjustmentPage }) => {
  await shortRateAdjustmentPage.verifyGridVisible();
});

Then('the grid should display short rate data rows', async ({ shortRateAdjustmentPage }) => {
  await shortRateAdjustmentPage.verifyDataLoaded();
});

Then('the grid should display Symbol, Cusip, Rate and Source columns', async ({ shortRateAdjustmentPage }) => {
  await shortRateAdjustmentPage.verifyColumnHeaders();
});

Then('the Short Rate Adjustment ag-grid root should be visible', async ({ shortRateAdjustmentPage }) => {
  await shortRateAdjustmentPage.verifyAgGridPresent();
});

When('the user selects the first row in the short rate grid', async ({ shortRateAdjustmentPage }) => {
  await shortRateAdjustmentPage.selectFirstRow();
});

Then('the short rate row should be selected', async ({ shortRateAdjustmentPage }) => {
  await shortRateAdjustmentPage.verifyRowSelected();
});

When('the user enters a short rate value of {string}', async ({ shortRateAdjustmentPage }, rate) => {
  await shortRateAdjustmentPage.enterRateValue(rate);
});

When('the user saves the short rate change', async ({ shortRateAdjustmentPage }) => {
  await shortRateAdjustmentPage.clickSave();
});

Then('a short rate success confirmation should be displayed', async ({ shortRateAdjustmentPage }) => {
  await shortRateAdjustmentPage.verifySuccessMessage();
});

Then('the short rate input should be inactive before any row is selected', async ({ shortRateAdjustmentPage }) => {
  await shortRateAdjustmentPage.verifyRateInputInactive();
});

Then('the short rate input should be active', async ({ shortRateAdjustmentPage }) => {
  await shortRateAdjustmentPage.verifyRateInputActive();
});

When('the user tries to save without selecting any row', async ({ shortRateAdjustmentPage }) => {
  await shortRateAdjustmentPage.clickSave();
});

Then('the short rate save action should be blocked', async ({ shortRateAdjustmentPage }) => {
  await shortRateAdjustmentPage.verifySaveBlocked();
});

When('the user clears the short rate input', async ({ shortRateAdjustmentPage }) => {
  await shortRateAdjustmentPage.clearRateInput();
});

Then('a short rate validation error should be displayed', async ({ shortRateAdjustmentPage }) => {
  await shortRateAdjustmentPage.verifyValidationError();
});

Then('the short rate outcome should be {string}', async ({ shortRateAdjustmentPage }, outcome) => {
  if (outcome === 'success') {
    await shortRateAdjustmentPage.verifySuccessMessage();
  } else {
    await shortRateAdjustmentPage.verifyValidationError();
  }
});

When('no short rate records are present in the system', async ({ shortRateAdjustmentPage }) => {
  await shortRateAdjustmentPage.waitForGridLoad();
});

Then('the short rate grid empty state overlay should be displayed', async ({ shortRateAdjustmentPage }) => {
  await shortRateAdjustmentPage.verifyEmptyGridOverlay();
});
