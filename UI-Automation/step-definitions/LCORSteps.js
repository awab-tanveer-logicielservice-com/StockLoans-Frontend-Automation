import { createBdd } from 'playwright-bdd';
import { test } from './fixtures.js';

const { Given, When, Then } = createBdd(test);

// ── Navigation ────────────────────────────────────────────────────────────────

When('the user navigates to the LCOR page', async ({ lcorPage }) => {
  await lcorPage.navigate();
});

// ── Depository ────────────────────────────────────────────────────────────────

When('the user selects a depository', async ({ lcorPage }) => {
  await lcorPage.selectDepository();
});

When('the user selects a specific depository', async ({ lcorPage }) => {
  await lcorPage.selectDepository();
});

When('the user selects a depository with existing LCOR records', async ({ lcorPage }) => {
  await lcorPage.selectDepository();
});

When('the user changes to a different depository', async ({ lcorPage }) => {
  await lcorPage.selectDifferentDepository();
});

// ── Required Field Entry ──────────────────────────────────────────────────────

When('the user enters a valid Contra Loanet ID', async ({ lcorPage }) => {
  await lcorPage.enterContraLoanetId();
});

When('the user enters a valid Symbol or CUSIP', async ({ lcorPage }) => {
  await lcorPage.enterSymbolOrCusip();
});

When('the user enters a valid Quantity', async ({ lcorPage }) => {
  await lcorPage.enterQuantity();
});

When('the user enters all required LCOR fields', async ({ lcorPage }) => {
  await lcorPage.fillRequiredFields();
});

// ── Advanced Field Entry ──────────────────────────────────────────────────────

When('the user enters the minimum quantity', async ({ lcorPage }) => {
  await lcorPage.enterMinQuantity();
});

When('the user enters the minimum rebate', async ({ lcorPage }) => {
  await lcorPage.enterMinRebate();
});

When('the user enters the maximum price', async ({ lcorPage }) => {
  await lcorPage.enterMaxPrice();
});

When('the user enters the dividend rate', async ({ lcorPage }) => {
  await lcorPage.enterDivRate();
});

When('the user enters the time limit', async ({ lcorPage }) => {
  await lcorPage.enterTimeLimit();
});

When('the user enters the profit center', async ({ lcorPage }) => {
  await lcorPage.enterProfitCenter();
});

When('the user enters a public comment', async ({ lcorPage }) => {
  await lcorPage.enterPublicComment();
});

// ── Validation Fill Variants ──────────────────────────────────────────────────

When('the user fills in LCOR batch fields', async ({ lcorPage }) => {
  await lcorPage.fillRequiredFields();
});

When('the user fills in all required LCOR fields except Contra Loanet ID', async ({ lcorPage }) => {
  await lcorPage.fillRequiredFieldsExcept('contraLoanetId');
});

When('the user fills in all required LCOR fields except Symbol or CUSIP', async ({ lcorPage }) => {
  await lcorPage.fillRequiredFieldsExcept('symbolOrCusip');
});

When('the user fills in all required LCOR fields except Quantity', async ({ lcorPage }) => {
  await lcorPage.fillRequiredFieldsExcept('quantity');
});

When('the user enters {string} in the Quantity field', async ({ lcorPage }, value) => {
  await lcorPage.enterInvalidQuantity(value);
});

When('the user enters {string} in the Min Rebate field', async ({ lcorPage }, value) => {
  await lcorPage.enterInvalidMinRebate(value);
});

// ── Actions ───────────────────────────────────────────────────────────────────

When('the user submits the LCOR batch', async ({ lcorPage }) => {
  await lcorPage.submitBatch();
});

When('the user clicks the Reset button', async ({ lcorPage }) => {
  await lcorPage.clickReset();
});

When('the user clicks on an LCOR row in the grid', async ({ lcorPage }) => {
  await lcorPage.clickGridRow();
});

// ── Assertions ────────────────────────────────────────────────────────────────

Then('current-day LCOR records for the selected depository should be displayed in the grid', async ({ lcorPage }) => {
  await lcorPage.hasGridRowsOrEmpty();
});

Then('the LCOR batch should be submitted successfully', async ({ lcorPage }) => {
  await lcorPage.isSubmitSuccessVisible();
});

Then('the grid should refresh with the new LCOR record', async ({ lcorPage }) => {
  await lcorPage.hasGridRowsAfterSubmit();
});

Then('the pinned detail summary for that record should be displayed at the bottom of the page', async ({ lcorPage }) => {
  await lcorPage.isPinnedDetailVisible();
});

Then('all LCOR form fields should be cleared', async ({ lcorPage }) => {
  await lcorPage.areFormFieldsCleared();
});

Then('the LCOR submission should be disabled or a validation error should be displayed', async ({ lcorPage }) => {
  await lcorPage.isSubmitBlockedOrValidationShown();
});

Then('a validation error should be displayed for the Quantity field', async ({ lcorPage }) => {
  await lcorPage.isValidationErrorVisible();
});

Then('a validation error should be displayed for the Min Rebate field', async ({ lcorPage }) => {
  await lcorPage.isValidationErrorVisible();
});

Then('only current-day LCOR records for that depository should be displayed', async ({ lcorPage }) => {
  await lcorPage.hasGridRowsOrEmpty();
});

Then('the grid should refresh with current-day records for the new depository only', async ({ lcorPage }) => {
  await lcorPage.hasGridRowsOrEmpty();
});
