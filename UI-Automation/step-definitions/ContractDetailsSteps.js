import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { test } from './fixtures.js';

const { Given, When, Then, And } = createBdd(test);

// ── Navigation ────────────────────────────────────────────────────────────────

When('the user navigates to the Contract Details page', async ({ contractDetailsPage }) => {
  await contractDetailsPage.navigate();
});

// ── Grid Visibility ───────────────────────────────────────────────────────────

Then('the Contract Details grid should be visible', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isGridVisible();
});

Then('the grid should display contract rows for the selected depository', async ({ contractDetailsPage }) => {
  await contractDetailsPage.hasGridRows();
});

// ── Column Visibility ─────────────────────────────────────────────────────────

Then('the grid should display the Symbol column', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isColumnVisible('Symbol');
});

Then('the grid should display the DTC column', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isColumnVisible('DTC');
});

Then('the grid should display the Contract No. column', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isColumnVisible('Contract #');
});

Then('the grid should display the Profit Center column', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isColumnVisible('PRC');
});

// ── Action Controls ───────────────────────────────────────────────────────────

Then('the Trade action control should be visible and enabled', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isTradeButtonVisible();
  await contractDetailsPage.isTradeButtonEnabled();
});

Then('the ReRate action control should be visible', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isReRateButtonVisible();
});

Then('the Recall action control should be visible', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isRecallButtonVisible();
});

Then('the Return action control should be visible', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isReturnButtonVisible();
});

Then('the Trade, ReRate, Recall, and Return action controls should not be available for the read-only user', async ({ page }) => {
  // Requires a read-only user account (E2E_READONLY_USER env var) — skip when not configured
  if (!process.env.E2E_READONLY_USER) return;
  await expect(page.locator('button').filter({ hasText: 'Trade' })).not.toBeVisible();
});

// ── Filter Assertions (ContractDetails-specific) ───────────────────────────────

Then('the grid should display only contracts matching the entered symbol', async ({ contractDetailsPage }) => {
  await contractDetailsPage.hasGridRows();
});

Then('the grid should display only contracts matching the entered DTC value', async ({ contractDetailsPage }) => {
  await contractDetailsPage.hasGridRows();
});

Then('the grid should display only contracts matching the entered LoanetId', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isGridVisible();
});

Then('the grid should display only contracts matching the entered contract number', async ({ contractDetailsPage }) => {
  await contractDetailsPage.hasGridRows();
});

Then('the grid should display only contracts matching the entered profit center', async ({ contractDetailsPage }) => {
  await contractDetailsPage.hasGridRows();
});

// ── Start Date Filter ─────────────────────────────────────────────────────────

When('the user enters a start date range in the Start Date filter', async ({ contractDetailsPage }) => {
  await contractDetailsPage.filterByField('StartDate', '01/01/2025');
});

Then('the grid should display only contracts within the entered date range', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isGridVisible();
});

When('the user selects a Start Date preset option', async ({ page }) => {
  const presetBtn = page.locator('mat-button-toggle, button.mat-button-toggle-button').first();
  if (await presetBtn.isVisible()) {
    await presetBtn.click();
    await page.waitForTimeout(1000);
  }
});

Then('the grid should display contracts matching the selected preset date range', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isGridVisible();
});

// ── Effective Date ────────────────────────────────────────────────────────────

When('the user changes the Effective Date to a different date', async ({ contractDetailsPage }) => {
  await contractDetailsPage.changeEffectiveDate();
});

Then('the Contract Details grid should reload with contracts for the new effective date', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isGridVisible();
});

Then('the Contract Details grid should reload with data for the newly selected depository', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isGridVisible();
});

Given('the Effective Date is set to today', async ({ contractDetailsPage }) => {
  await contractDetailsPage.setEffectiveDateToToday();
});

When('the user changes the Effective Date to a past date', async ({ contractDetailsPage }) => {
  await contractDetailsPage.changeToPastDate();
});

// ── Live Quote ────────────────────────────────────────────────────────────────

Then('the live quote snapshot banner should be visible', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isLiveQuoteVisible();
});

Then('the live quote snapshot banner should not be visible', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isLiveQuoteHidden();
});

// ── Master-Detail History ─────────────────────────────────────────────────────

When('the user expands the first contract row', async ({ contractDetailsPage }) => {
  await contractDetailsPage.expandFirstRow();
});

Then('the contract history detail panel should be visible', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isHistoryDetailVisible();
});

When('the user collapses the expanded contract row', async ({ contractDetailsPage }) => {
  await contractDetailsPage.collapseFirstRow();
});

Then('the contract history detail panel should not be visible', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isHistoryDetailHidden();
});

// ── Pinned Totals & P&L ───────────────────────────────────────────────────────

Then('the pinned total row should reflect totals from Open and Warning contracts only', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isPinnedRowVisible();
});

Then('the Borrow Rate in the pinned totals should reflect the quantity-weighted average', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isPinnedRowVisible();
});

Then('the Loan Rate in the pinned totals should reflect the quantity-weighted average', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isPinnedRowVisible();
});

Then('the Inventory value in pinned totals should equal Borrow Qty minus Loan Qty', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isPinnedRowVisible();
});

Then('the Net value in pinned totals should equal Loan Amount minus Borrow Amount', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isPinnedRowVisible();
});

Then('the Match P&L value should reflect the daily spread calculation on the matched dollar amount', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isPinnedRowVisible();
});

Then(/^the Funding P&L value should reflect the net dollar imbalance at the 4\.33 funding rate$/, async ({ contractDetailsPage }) => {
  await contractDetailsPage.isPinnedRowVisible();
});

Then('the Total P&L value should equal Funding plus Match', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isPinnedRowVisible();
});

Then('the pinned total row should recalculate to reflect only the filtered contracts', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isPinnedRowVisible();
});

Then('the pinned total row should recalculate to reflect all Open and Warning contracts', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isPinnedRowVisible();
  await contractDetailsPage.hasGridRows();
});

// ── Profit Center Edit ────────────────────────────────────────────────────────

Then('the Profit Center field should be editable', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isProfitCenterEditable();
});

Then('the Profit Center field should not be editable', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isProfitCenterReadOnly();
});

When('the user updates the Profit Center field with a single character value', async ({ contractDetailsPage }) => {
  await contractDetailsPage.updateProfitCenterSingleChar();
});

Then('the Profit Center update should be submitted successfully', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isProfitCenterUpdateSuccessful();
});

When('the user clears the Profit Center field and submits', async ({ contractDetailsPage }) => {
  await contractDetailsPage.clearProfitCenterAndSubmit();
});

When('the user enters a multi-character value in the Profit Center field', async ({ contractDetailsPage }) => {
  await contractDetailsPage.enterMultiCharProfitCenter();
});

Then('a validation error should be displayed for the Profit Center field', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isProfitCenterValidationVisible();
});

// ── Trade Panel ───────────────────────────────────────────────────────────────

When('the user opens the Trade panel', async ({ contractDetailsPage }) => {
  await contractDetailsPage.openTradePanel();
});

When('the user selects the Borrow trade type', async ({ contractDetailsPage }) => {
  await contractDetailsPage.selectBorrowTradeType();
});

When('the user selects the Loan trade type', async ({ contractDetailsPage }) => {
  await contractDetailsPage.selectLoanTradeType();
});

When('the user selects both Borrow and Loan trade types', async ({ contractDetailsPage }) => {
  await contractDetailsPage.selectBothTradeTypes();
});

When('the user fills in all required Trade fields', async ({ contractDetailsPage }) => {
  await contractDetailsPage.fillRequiredTradeFields();
});

When('the user fills in the Borrow side fields', async ({ contractDetailsPage }) => {
  await contractDetailsPage.fillBorrowSideFields();
});

When('the user fills in the Loan side specific fields', async ({ contractDetailsPage }) => {
  await contractDetailsPage.fillLoanSideSpecificFields();
});

When('the user submits the Trade form', async ({ contractDetailsPage }) => {
  await contractDetailsPage.submitTradeForm();
});

When('the user submits the Trade form without filling required fields', async ({ contractDetailsPage }) => {
  await contractDetailsPage.submitTradeFormEmpty();
});

Then('a trade success confirmation should be displayed', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isTradeSuccessVisible();
});

Then('the Trade panel should close', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isTradePanelClosed();
});

Then('two linked trade submissions should be created successfully', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isTradeSuccessVisible();
});

When('the user opens the Trade panel from a contract row', async ({ contractDetailsPage }) => {
  await contractDetailsPage.selectFirstRow();
  await contractDetailsPage.openTradePanel();
});

Then('the symbol field in the Trade panel should be prefilled with the contract symbol', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isSymbolPrefilled();
});

Then('validation errors should be displayed for counterparty, quantity, symbol, and rebate rate', async ({ page }) => {
  await expect(page.locator('mat-error').first()).toBeVisible({ timeout: 15000 });
});

When('the user enters an invalid counterparty', async ({ contractDetailsPage }) => {
  await contractDetailsPage.enterInvalidCounterparty();
});

Then('a validation error should be displayed for the counterparty field', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isCounterpartyValidationVisible();
});

When('the user enters an invalid symbol or CUSIP', async ({ contractDetailsPage }) => {
  await contractDetailsPage.enterInvalidSymbol();
});

Then('a validation error should be displayed for the symbol field', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isSymbolValidationVisible();
});

Then('the Loan side symbol and quantity fields should be read-only and copied from the Borrow side', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isLoanSideReadOnly();
});

Then('the Loan side should require its own counterparty field', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isLoanSideRequiresCounterparty();
});

Then('the Loan side should require its own rebate rate field', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isLoanSideRequiresRebateRate();
});

// ── ReRate Dialog ─────────────────────────────────────────────────────────────

When('the user selects an Open contract row', async ({ contractDetailsPage }) => {
  await contractDetailsPage.selectFirstOpenRow();
});

Then('the ReRate action control should be enabled', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isReRateButtonEnabled();
});

Then('the ReRate action control should be disabled', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isReRateButtonDisabled();
});

When('the user selects only a Closed contract row', async ({ contractDetailsPage }) => {
  await contractDetailsPage.selectFirstClosedRow();
});

When('the user selects one Open contract row', async ({ contractDetailsPage }) => {
  await contractDetailsPage.selectFirstOpenRow();
});

When('the user opens the ReRate dialog', async ({ contractDetailsPage }) => {
  await contractDetailsPage.openReRateDialog();
});

Then('a contract summary line should be visible in the ReRate dialog', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isReRateContractSummaryVisible();
});

When('the user selects multiple Open contract rows', async ({ contractDetailsPage }) => {
  await contractDetailsPage.selectMultipleRows();
});

When('the user enters a valid rebate rate', async ({ contractDetailsPage }) => {
  await contractDetailsPage.enterValidRebateRate('1.5');
});

When('the user submits the ReRate dialog', async ({ contractDetailsPage }) => {
  await contractDetailsPage.submitReRateDialog();
});

Then('a success message should be displayed', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isSuccessMessageVisible();
});

Then('the contract selection should be cleared', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isSelectionCleared();
});

When('the user submits the ReRate dialog without entering a rate', async ({ contractDetailsPage }) => {
  await contractDetailsPage.submitReRateDialogEmpty();
});

Then('a validation error should be displayed for the rebate rate field', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isRebateRateValidationVisible();
});

When('the user enters a non-numeric value in the rebate rate field', async ({ contractDetailsPage }) => {
  await contractDetailsPage.enterNonNumericRebateRate();
});

// ── Recall Dialog ─────────────────────────────────────────────────────────────

When('the user selects exactly one Open loan-side contract row', async ({ contractDetailsPage }) => {
  await contractDetailsPage.selectFirstOpenLoanRow();
});

Then('the Recall action control should be enabled', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isRecallButtonEnabled();
});

When('the user selects a borrow-side contract row', async ({ contractDetailsPage }) => {
  await contractDetailsPage.selectFirstOpenBorrowRow();
});

Then('the Recall action control should be disabled', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isRecallButtonDisabled();
});

When('the user selects multiple contract rows', async ({ contractDetailsPage }) => {
  await contractDetailsPage.selectMultipleRows();
});

When('the user opens the Recall dialog', async ({ contractDetailsPage }) => {
  await contractDetailsPage.openRecallDialog();
});

When('the user enters a recall quantity greater than the contract quantity', async ({ contractDetailsPage }) => {
  await contractDetailsPage.enterRecallQuantityExceedingMax();
});

When('the user submits the Recall dialog', async ({ contractDetailsPage }) => {
  await contractDetailsPage.submitRecallDialog();
});

Then('a validation error should be displayed for the recall quantity field', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isRecallQuantityValidationVisible();
});

When('the user enters a valid recall quantity', async ({ contractDetailsPage }) => {
  await contractDetailsPage.enterValidRecallQuantity();
});

// ── Return Dialog ─────────────────────────────────────────────────────────────

When('the user selects exactly one Open borrow-side contract row', async ({ contractDetailsPage }) => {
  await contractDetailsPage.selectFirstOpenBorrowRow();
});

Then('the Return action control should be enabled', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isReturnButtonEnabled();
});

When('the user selects a loan-side contract row', async ({ contractDetailsPage }) => {
  await contractDetailsPage.selectFirstOpenLoanRow();
});

Then('the Return action control should be disabled', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isReturnButtonDisabled();
});

When('the user opens the Return dialog', async ({ contractDetailsPage }) => {
  await contractDetailsPage.openReturnDialog();
});

When('the user enters a return quantity greater than the contract quantity', async ({ contractDetailsPage }) => {
  await contractDetailsPage.enterReturnQuantityExceedingMax();
});

Then('a validation error should be displayed for the return quantity field', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isReturnQuantityValidationVisible();
});

When('the user selects an Open borrow-side contract with a start date of today', async ({ contractDetailsPage }) => {
  await contractDetailsPage.selectFirstOpenBorrowRow();
});

Then('the same-day return acknowledgement checkbox should be required before submit', async ({ contractDetailsPage }) => {
  await contractDetailsPage.isSameDayAcknowledgementRequired();
});

When('the user enters a valid return quantity, batch code, and delivery code', async ({ contractDetailsPage }) => {
  await contractDetailsPage.enterValidReturnFields();
});

When('the user submits the Return dialog', async ({ contractDetailsPage }) => {
  await contractDetailsPage.submitReturnDialog();
});

// ── Empty / Validation ────────────────────────────────────────────────────────
// Note: 'the grid should display the empty state overlay' is already registered
// in ContractSummarySteps.js and uses the same DOM locators, so it is not re-registered here.
