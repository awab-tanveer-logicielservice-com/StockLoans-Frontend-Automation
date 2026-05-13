// Generated from: UI-Automation\features\ContractDetails.feature
import { test } from "../../../step-definitions/fixtures.js";

test.describe('Contract Details Component (SLL-192)', () => {

  test('User navigates to Contract Details and sees contracts for the selected depository and effective date', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await Then('the Contract Details grid should be visible', null, { contractDetailsPage }); 
    await And('the grid should display contract rows for the selected depository', null, { contractDetailsPage }); 
  });

  test('Grid displays contracts with all expected columns', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await Then('the grid should display the Symbol column', null, { contractDetailsPage }); 
    await And('the grid should display the DTC column', null, { contractDetailsPage }); 
    await And('the grid should display the Contract No. column', null, { contractDetailsPage }); 
    await And('the grid should display the Profit Center column', null, { contractDetailsPage }); 
  });

  test('Authorized user can access Trade, ReRate, Recall, and Return action controls', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await Then('the Trade action control should be visible and enabled', null, { contractDetailsPage }); 
    await And('the ReRate action control should be visible', null, { contractDetailsPage }); 
    await And('the Recall action control should be visible', null, { contractDetailsPage }); 
    await And('the Return action control should be visible', null, { contractDetailsPage }); 
  });

  test('Read-only user cannot access Trade, ReRate, Recall, or Return action dialogs', { tag: ['@smokeBDD', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, contractDetailsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await Then('the Trade, ReRate, Recall, and Return action controls should not be available for the read-only user', null, { page }); 
  });

  test('User filters by Symbol/CUSIP and grid shows only matching contracts', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, contractSummaryPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await When('the user enters a symbol in the Symbol/CUSIP filter', null, { contractDetailsPage, contractSummaryPage, page }); 
    await Then('the grid should display only contracts matching the entered symbol', null, { contractDetailsPage }); 
  });

  test('User filters by DTC and grid updates correctly', { tag: ['@smokeBDD', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, contractSummaryPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await When('the user enters a value in the DTC filter', null, { contractDetailsPage, contractSummaryPage, page }); 
    await Then('the grid should display only contracts matching the entered DTC value', null, { contractDetailsPage }); 
  });

  test('User filters by LoanetId and grid updates correctly', { tag: ['@smokeBDD', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, contractSummaryPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await When('the user enters a value in the LoanetId filter', null, { contractDetailsPage, contractSummaryPage, page }); 
    await Then('the grid should display only contracts matching the entered LoanetId', null, { contractDetailsPage }); 
  });

  test('User filters by Contract No. and grid updates correctly', { tag: ['@smokeBDD', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, contractSummaryPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await When('the user enters a value in the Contract No. filter', null, { contractDetailsPage, contractSummaryPage, page }); 
    await Then('the grid should display only contracts matching the entered contract number', null, { contractDetailsPage }); 
  });

  test('User filters by Profit Center and grid updates correctly', { tag: ['@smokeBDD', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, contractSummaryPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await When('the user enters a value in the Profit Center filter', null, { contractDetailsPage, contractSummaryPage, page }); 
    await Then('the grid should display only contracts matching the entered profit center', null, { contractDetailsPage }); 
  });

  test('User filters by Start Date range and grid updates correctly', { tag: ['@smokeBDD', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await When('the user enters a start date range in the Start Date filter', null, { contractDetailsPage }); 
    await Then('the grid should display only contracts within the entered date range', null, { contractDetailsPage }); 
  });

  test('User applies a Start Date preset and grid updates correctly', { tag: ['@smokeBDD', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await When('the user selects a Start Date preset option', null, { page }); 
    await Then('the grid should display contracts matching the selected preset date range', null, { contractDetailsPage }); 
  });

  test('User changes Effective Date and grid reloads with data for the new date', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await When('the user changes the Effective Date to a different date', null, { contractDetailsPage }); 
    await Then('the Contract Details grid should reload with contracts for the new effective date', null, { contractDetailsPage }); 
  });

  test('User changes selected depository and grid reloads with new depository contracts', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, contractSummaryPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await When('the user changes the selected depository', null, { contractDetailsPage, contractSummaryPage, page }); 
    await Then('the Contract Details grid should reload with data for the newly selected depository', null, { contractDetailsPage }); 
  });

  test('Live quote banner appears when grid is filtered down to a single symbol', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, contractSummaryPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await When('the user enters a symbol in the Symbol/CUSIP filter', null, { contractDetailsPage, contractSummaryPage, page }); 
    await Then('the live quote snapshot banner should be visible', null, { contractDetailsPage }); 
  });

  test('Live quote banner is hidden when multiple symbols are visible in the grid', { tag: ['@smokeBDD', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, contractDetailsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await Then('the live quote snapshot banner should not be visible', null, { contractDetailsPage }); 
  });

  test('User expands a contract row and sees contract history detail', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await When('the user expands the first contract row', null, { contractDetailsPage }); 
    await Then('the contract history detail panel should be visible', null, { contractDetailsPage }); 
  });

  test('User collapses an expanded history row and the detail is hidden', { tag: ['@smokeBDD', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await And('the user expands the first contract row', null, { contractDetailsPage }); 
    await When('the user collapses the expanded contract row', null, { contractDetailsPage }); 
    await Then('the contract history detail panel should not be visible', null, { contractDetailsPage }); 
  });

  test('Pinned totals include only Open and Warning contracts — Closed contracts are excluded', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-192'] }, async ({ Given, Then, And, contractDetailsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await Then('the pinned total row should reflect totals from Open and Warning contracts only', null, { contractDetailsPage }); 
  });

  test('Weighted average Borrow Rate and Loan Rate are calculated quantity-based', { tag: ['@smokeBDD', '@Regression', '@SLL-192'] }, async ({ Given, Then, And, contractDetailsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await Then('the Borrow Rate in the pinned totals should reflect the quantity-weighted average', null, { contractDetailsPage }); 
    await And('the Loan Rate in the pinned totals should reflect the quantity-weighted average', null, { contractDetailsPage }); 
  });

  test('Inventory equals Borrow Qty minus Loan Qty in pinned totals', { tag: ['@smokeBDD', '@Regression', '@SLL-192'] }, async ({ Given, Then, And, contractDetailsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await Then('the Inventory value in pinned totals should equal Borrow Qty minus Loan Qty', null, { contractDetailsPage }); 
  });

  test('Net equals Loan Amount minus Borrow Amount in pinned totals', { tag: ['@smokeBDD', '@Regression', '@SLL-192'] }, async ({ Given, Then, And, contractDetailsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await Then('the Net value in pinned totals should equal Loan Amount minus Borrow Amount', null, { contractDetailsPage }); 
  });

  test('Match P&L uses daily spread between weighted borrow and loan rates on matched dollar amount', { tag: ['@smokeBDD', '@Regression', '@SLL-192'] }, async ({ Given, Then, And, contractDetailsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await Then('the Match P&L value should reflect the daily spread calculation on the matched dollar amount', null, { contractDetailsPage }); 
  });

  test('Funding P&L uses net dollar imbalance at 4.33 funding rate plus rebate-rate debit logic', { tag: ['@smokeBDD', '@Regression', '@SLL-192'] }, async ({ Given, Then, And, contractDetailsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await Then('the Funding P&L value should reflect the net dollar imbalance at the 4.33 funding rate', null, { contractDetailsPage }); 
  });

  test('Total P&L equals Funding plus Match', { tag: ['@smokeBDD', '@Regression', '@SLL-192'] }, async ({ Given, Then, And, contractDetailsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await Then('the Total P&L value should equal Funding plus Match', null, { contractDetailsPage }); 
  });

  test('Pinned totals recalculate correctly after a Symbol/CUSIP filter is applied', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, contractSummaryPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await When('the user enters a symbol in the Symbol/CUSIP filter', null, { contractDetailsPage, contractSummaryPage, page }); 
    await Then('the pinned total row should recalculate to reflect only the filtered contracts', null, { contractDetailsPage }); 
  });

  test('Pinned totals recalculate correctly after all filters are cleared', { tag: ['@smokeBDD', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, contractSummaryPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await And('the user enters a symbol in the Symbol/CUSIP filter', null, { contractDetailsPage, contractSummaryPage, page }); 
    await When('the user clears all active filters', null, { contractDetailsPage, contractSummaryPage, page }); 
    await Then('the pinned total row should recalculate to reflect all Open and Warning contracts', null, { contractDetailsPage }); 
  });

  test('Pinned totals show zeros when all contracts are filtered out', { tag: ['@smokeBDD', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, contractSummaryPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await When('the user enters "ZZZZINVALID" in the Symbol/CUSIP filter', null, { contractDetailsPage, contractSummaryPage, page }); 
    await Then('the grid should show no matching rows', null, { contractDetailsPage, contractSummaryPage, page }); 
    await And('the pinned total row should display zero values', null, { contractSummaryPage }); 
  });

  test('Profit Center field is editable when Effective Date is today', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-192'] }, async ({ Given, Then, And, contractDetailsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await And('the Effective Date is set to today', null, { contractDetailsPage }); 
    await Then('the Profit Center field should be editable', null, { contractDetailsPage }); 
  });

  test('Profit Center field is read-only when Effective Date is a past date', { tag: ['@smokeBDD', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await When('the user changes the Effective Date to a past date', null, { contractDetailsPage }); 
    await Then('the Profit Center field should not be editable', null, { contractDetailsPage }); 
  });

  test('Valid single-character Profit Center update submits successfully', { tag: ['@smokeBDD', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await And('the Effective Date is set to today', null, { contractDetailsPage }); 
    await When('the user updates the Profit Center field with a single character value', null, { contractDetailsPage }); 
    await Then('the Profit Center update should be submitted successfully', null, { contractDetailsPage }); 
  });

  test('Blank Profit Center update is accepted and submits successfully', { tag: ['@smokeBDD', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await And('the Effective Date is set to today', null, { contractDetailsPage }); 
    await When('the user clears the Profit Center field and submits', null, { contractDetailsPage }); 
    await Then('the Profit Center update should be submitted successfully', null, { contractDetailsPage }); 
  });

  test('Multi-character Profit Center value is rejected with a validation error', { tag: ['@smokeBDD', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await And('the Effective Date is set to today', null, { contractDetailsPage }); 
    await When('the user enters a multi-character value in the Profit Center field', null, { contractDetailsPage }); 
    await Then('a validation error should be displayed for the Profit Center field', null, { contractDetailsPage }); 
  });

  test('User opens Trade panel for a single Borrow and submits successfully', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await When('the user opens the Trade panel', null, { contractDetailsPage }); 
    await And('the user selects the Borrow trade type', null, { contractDetailsPage }); 
    await And('the user fills in all required Trade fields', null, { contractDetailsPage }); 
    await And('the user submits the Trade form', null, { contractDetailsPage }); 
    await Then('a trade success confirmation should be displayed', null, { contractDetailsPage }); 
    await And('the Trade panel should close', null, { contractDetailsPage }); 
  });

  test('User opens Trade panel for a single Loan and submits successfully', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await When('the user opens the Trade panel', null, { contractDetailsPage }); 
    await And('the user selects the Loan trade type', null, { contractDetailsPage }); 
    await And('the user fills in all required Trade fields', null, { contractDetailsPage }); 
    await And('the user submits the Trade form', null, { contractDetailsPage }); 
    await Then('a trade success confirmation should be displayed', null, { contractDetailsPage }); 
    await And('the Trade panel should close', null, { contractDetailsPage }); 
  });

  test('User opens Trade panel in Match mode and two linked trades are created', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await When('the user opens the Trade panel', null, { contractDetailsPage }); 
    await And('the user selects both Borrow and Loan trade types', null, { contractDetailsPage }); 
    await And('the user fills in the Borrow side fields', null, { contractDetailsPage }); 
    await And('the user fills in the Loan side specific fields', null, { contractDetailsPage }); 
    await And('the user submits the Trade form', null, { contractDetailsPage }); 
    await Then('two linked trade submissions should be created successfully', null, { contractDetailsPage }); 
  });

  test('Symbol is prefilled when Trade panel is opened from Contract Details context', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await When('the user opens the Trade panel from a contract row', null, { contractDetailsPage }); 
    await Then('the symbol field in the Trade panel should be prefilled with the contract symbol', null, { contractDetailsPage }); 
  });

  test('Trade form validates all required fields before allowing submit', { tag: ['@smokeBDD', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await When('the user opens the Trade panel', null, { contractDetailsPage }); 
    await And('the user submits the Trade form without filling required fields', null, { contractDetailsPage }); 
    await Then('validation errors should be displayed for counterparty, quantity, symbol, and rebate rate', null, { page }); 
  });

  test('Trade form validates counterparty before allowing submit', { tag: ['@smokeBDD', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await When('the user opens the Trade panel', null, { contractDetailsPage }); 
    await And('the user enters an invalid counterparty', null, { contractDetailsPage }); 
    await And('the user submits the Trade form', null, { contractDetailsPage }); 
    await Then('a validation error should be displayed for the counterparty field', null, { contractDetailsPage }); 
  });

  test('Trade form validates symbol/CUSIP before allowing submit', { tag: ['@smokeBDD', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await When('the user opens the Trade panel', null, { contractDetailsPage }); 
    await And('the user enters an invalid symbol or CUSIP', null, { contractDetailsPage }); 
    await And('the user submits the Trade form', null, { contractDetailsPage }); 
    await Then('a validation error should be displayed for the symbol field', null, { contractDetailsPage }); 
  });

  test('In Match mode Loan side shows symbol and quantity read-only from Borrow side', { tag: ['@smokeBDD', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await When('the user opens the Trade panel', null, { contractDetailsPage }); 
    await And('the user selects both Borrow and Loan trade types', null, { contractDetailsPage }); 
    await Then('the Loan side symbol and quantity fields should be read-only and copied from the Borrow side', null, { contractDetailsPage }); 
  });

  test('In Match mode Loan side requires its own counterparty, rebate rate, margin, and rounding', { tag: ['@smokeBDD', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await When('the user opens the Trade panel', null, { contractDetailsPage }); 
    await And('the user selects both Borrow and Loan trade types', null, { contractDetailsPage }); 
    await Then('the Loan side should require its own counterparty field', null, { contractDetailsPage }); 
    await And('the Loan side should require its own rebate rate field', null, { contractDetailsPage }); 
  });

  test('ReRate dialog is enabled only when today\'s effective date is selected and at least one Open contract is selected', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await And('the Effective Date is set to today', null, { contractDetailsPage }); 
    await When('the user selects an Open contract row', null, { contractDetailsPage }); 
    await Then('the ReRate action control should be enabled', null, { contractDetailsPage }); 
  });

  test('ReRate dialog is disabled when no contract is selected', { tag: ['@smokeBDD', '@Regression', '@SLL-192'] }, async ({ Given, Then, And, contractDetailsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await Then('the ReRate action control should be disabled', null, { contractDetailsPage }); 
  });

  test('ReRate dialog is disabled for a past effective date', { tag: ['@smokeBDD', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await When('the user changes the Effective Date to a past date', null, { contractDetailsPage }); 
    await Then('the ReRate action control should be disabled', null, { contractDetailsPage }); 
  });

  test('ReRate dialog is disabled when only Closed or Warning contracts are selected', { tag: ['@smokeBDD', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await And('the Effective Date is set to today', null, { contractDetailsPage }); 
    await When('the user selects only a Closed contract row', null, { contractDetailsPage }); 
    await Then('the ReRate action control should be disabled', null, { contractDetailsPage }); 
  });

  test('Single selected contract shows a contract summary line in the ReRate dialog', { tag: ['@smokeBDD', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await And('the Effective Date is set to today', null, { contractDetailsPage }); 
    await When('the user selects one Open contract row', null, { contractDetailsPage }); 
    await And('the user opens the ReRate dialog', null, { contractDetailsPage }); 
    await Then('a contract summary line should be visible in the ReRate dialog', null, { contractDetailsPage }); 
  });

  test('ReRate submit sends request for all selected contract IDs and shows success feedback', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await And('the Effective Date is set to today', null, { contractDetailsPage }); 
    await When('the user selects multiple Open contract rows', null, { contractDetailsPage }); 
    await And('the user opens the ReRate dialog', null, { contractDetailsPage }); 
    await And('the user enters a valid rebate rate', null, { contractDetailsPage }); 
    await And('the user submits the ReRate dialog', null, { contractDetailsPage }); 
    await Then('a success message should be displayed', null, { contractDetailsPage }); 
    await And('the contract selection should be cleared', null, { contractDetailsPage }); 
  });

  test('Empty rebate rate input is rejected with a validation error in ReRate dialog', { tag: ['@smokeBDD', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await And('the Effective Date is set to today', null, { contractDetailsPage }); 
    await When('the user selects an Open contract row', null, { contractDetailsPage }); 
    await And('the user opens the ReRate dialog', null, { contractDetailsPage }); 
    await And('the user submits the ReRate dialog without entering a rate', null, { contractDetailsPage }); 
    await Then('a validation error should be displayed for the rebate rate field', null, { contractDetailsPage }); 
  });

  test('Non-numeric rebate rate input is rejected with a validation error in ReRate dialog', { tag: ['@smokeBDD', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await And('the Effective Date is set to today', null, { contractDetailsPage }); 
    await When('the user selects an Open contract row', null, { contractDetailsPage }); 
    await And('the user opens the ReRate dialog', null, { contractDetailsPage }); 
    await And('the user enters a non-numeric value in the rebate rate field', null, { contractDetailsPage }); 
    await And('the user submits the ReRate dialog', null, { contractDetailsPage }); 
    await Then('a validation error should be displayed for the rebate rate field', null, { contractDetailsPage }); 
  });

  test('Recall dialog is enabled for exactly one selected Open loan-side contract on today\'s date', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await And('the Effective Date is set to today', null, { contractDetailsPage }); 
    await When('the user selects exactly one Open loan-side contract row', null, { contractDetailsPage }); 
    await Then('the Recall action control should be enabled', null, { contractDetailsPage }); 
  });

  test('Recall dialog is not available for borrow-side contracts', { tag: ['@smokeBDD', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await And('the Effective Date is set to today', null, { contractDetailsPage }); 
    await When('the user selects a borrow-side contract row', null, { contractDetailsPage }); 
    await Then('the Recall action control should be disabled', null, { contractDetailsPage }); 
  });

  test('Recall dialog is not available when more than one contract is selected', { tag: ['@smokeBDD', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await And('the Effective Date is set to today', null, { contractDetailsPage }); 
    await When('the user selects multiple contract rows', null, { contractDetailsPage }); 
    await Then('the Recall action control should be disabled', null, { contractDetailsPage }); 
  });

  test('Recall dialog is disabled for a past effective date', { tag: ['@smokeBDD', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await When('the user changes the Effective Date to a past date', null, { contractDetailsPage }); 
    await Then('the Recall action control should be disabled', null, { contractDetailsPage }); 
  });

  test('Recall quantity exceeding the contract quantity is rejected', { tag: ['@smokeBDD', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await And('the Effective Date is set to today', null, { contractDetailsPage }); 
    await When('the user selects exactly one Open loan-side contract row', null, { contractDetailsPage }); 
    await And('the user opens the Recall dialog', null, { contractDetailsPage }); 
    await And('the user enters a recall quantity greater than the contract quantity', null, { contractDetailsPage }); 
    await And('the user submits the Recall dialog', null, { contractDetailsPage }); 
    await Then('a validation error should be displayed for the recall quantity field', null, { contractDetailsPage }); 
  });

  test('Valid Recall quantity submits successfully and shows success feedback', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await And('the Effective Date is set to today', null, { contractDetailsPage }); 
    await When('the user selects exactly one Open loan-side contract row', null, { contractDetailsPage }); 
    await And('the user opens the Recall dialog', null, { contractDetailsPage }); 
    await And('the user enters a valid recall quantity', null, { contractDetailsPage }); 
    await And('the user submits the Recall dialog', null, { contractDetailsPage }); 
    await Then('a success message should be displayed', null, { contractDetailsPage }); 
    await And('the contract selection should be cleared', null, { contractDetailsPage }); 
  });

  test('Return dialog is enabled for exactly one selected Open borrow-side contract on today\'s date', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await And('the Effective Date is set to today', null, { contractDetailsPage }); 
    await When('the user selects exactly one Open borrow-side contract row', null, { contractDetailsPage }); 
    await Then('the Return action control should be enabled', null, { contractDetailsPage }); 
  });

  test('Return dialog is not available for loan-side contracts', { tag: ['@smokeBDD', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await And('the Effective Date is set to today', null, { contractDetailsPage }); 
    await When('the user selects a loan-side contract row', null, { contractDetailsPage }); 
    await Then('the Return action control should be disabled', null, { contractDetailsPage }); 
  });

  test('Return dialog is not available when more than one contract is selected', { tag: ['@smokeBDD', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await And('the Effective Date is set to today', null, { contractDetailsPage }); 
    await When('the user selects multiple contract rows', null, { contractDetailsPage }); 
    await Then('the Return action control should be disabled', null, { contractDetailsPage }); 
  });

  test('Return dialog is disabled for a past effective date', { tag: ['@smokeBDD', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await When('the user changes the Effective Date to a past date', null, { contractDetailsPage }); 
    await Then('the Return action control should be disabled', null, { contractDetailsPage }); 
  });

  test('Return quantity exceeding the contract quantity is rejected', { tag: ['@smokeBDD', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await And('the Effective Date is set to today', null, { contractDetailsPage }); 
    await When('the user selects exactly one Open borrow-side contract row', null, { contractDetailsPage }); 
    await And('the user opens the Return dialog', null, { contractDetailsPage }); 
    await And('the user enters a return quantity greater than the contract quantity', null, { contractDetailsPage }); 
    await And('the user submits the Return dialog', null, { contractDetailsPage }); 
    await Then('a validation error should be displayed for the return quantity field', null, { contractDetailsPage }); 
  });

  test('Same-day return acknowledgement is required when contract start date is today', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await And('the Effective Date is set to today', null, { contractDetailsPage }); 
    await When('the user selects an Open borrow-side contract with a start date of today', null, { contractDetailsPage }); 
    await And('the user opens the Return dialog', null, { contractDetailsPage }); 
    await Then('the same-day return acknowledgement checkbox should be required before submit', null, { contractDetailsPage }); 
  });

  test('Valid Return submits with contract ID, quantity, spec flag, and batch code and shows success feedback', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await And('the Effective Date is set to today', null, { contractDetailsPage }); 
    await When('the user selects exactly one Open borrow-side contract row', null, { contractDetailsPage }); 
    await And('the user opens the Return dialog', null, { contractDetailsPage }); 
    await And('the user enters a valid return quantity, batch code, and delivery code', null, { contractDetailsPage }); 
    await And('the user submits the Return dialog', null, { contractDetailsPage }); 
    await Then('a success message should be displayed', null, { contractDetailsPage }); 
    await And('the contract selection should be cleared', null, { contractDetailsPage }); 
  });

  test('Selected depository with no contracts shows empty grid and empty pinned totals', { tag: ['@smokeBDD', '@Regression', '@SLL-192'] }, async ({ Given, Then, And, contractDetailsPage, contractSummaryPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await And('the selected depository has no contracts', null, { contractDetailsPage, contractSummaryPage, page }); 
    await Then('the grid should display the empty state overlay', null, { contractDetailsPage, contractSummaryPage, page }); 
    await And('the pinned total row should display zero values', null, { contractSummaryPage }); 
  });

  test('Filtering by a Symbol with no matching contracts shows empty grid and zeroed pinned totals', { tag: ['@smokeBDD', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, contractSummaryPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await When('the user enters "ZZZZINVALID" in the Symbol/CUSIP filter', null, { contractDetailsPage, contractSummaryPage, page }); 
    await Then('the grid should show no matching rows', null, { contractDetailsPage, contractSummaryPage, page }); 
    await And('the pinned total row should display zero values', null, { contractSummaryPage }); 
  });

  test.describe('Multiple filter combinations with valid, partial, and no-match inputs', () => {

    test('Example #1', { tag: ['@smokeBDD', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, contractSummaryPage, loginPage, page, testUsers }) => { 
      await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
      await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
      await When('the user filters by "Symbol/CUSIP" with value "AAPL"', null, { contractDetailsPage, contractSummaryPage, page }); 
      await Then('the expected filter outcome should be "rows shown"', null, { contractDetailsPage, contractSummaryPage, page }); 
    });

    test('Example #2', { tag: ['@smokeBDD', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, contractSummaryPage, loginPage, page, testUsers }) => { 
      await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
      await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
      await When('the user filters by "Symbol/CUSIP" with value "MSFT"', null, { contractDetailsPage, contractSummaryPage, page }); 
      await Then('the expected filter outcome should be "rows shown"', null, { contractDetailsPage, contractSummaryPage, page }); 
    });

    test('Example #3', { tag: ['@smokeBDD', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, contractSummaryPage, loginPage, page, testUsers }) => { 
      await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
      await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
      await When('the user filters by "DTC" with value "0005"', null, { contractDetailsPage, contractSummaryPage, page }); 
      await Then('the expected filter outcome should be "rows shown"', null, { contractDetailsPage, contractSummaryPage, page }); 
    });

    test('Example #4', { tag: ['@smokeBDD', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, contractSummaryPage, loginPage, page, testUsers }) => { 
      await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
      await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
      await When('the user filters by "Symbol/CUSIP" with value "ZZZZINVALID"', null, { contractDetailsPage, contractSummaryPage, page }); 
      await Then('the expected filter outcome should be "empty grid"', null, { contractDetailsPage, contractSummaryPage, page }); 
    });

    test('Example #5', { tag: ['@smokeBDD', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, contractSummaryPage, loginPage, page, testUsers }) => { 
      await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
      await And('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
      await When('the user filters by "Profit Center" with value "INVALID_PC"', null, { contractDetailsPage, contractSummaryPage, page }); 
      await Then('the expected filter outcome should be "empty grid"', null, { contractDetailsPage, contractSummaryPage, page }); 
    });

  });

  test('Full lifecycle — login, navigate to Contract Details, filter, verify live quote, expand history, verify pinned totals, submit Trade', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-192'] }, async ({ Given, When, Then, And, contractDetailsPage, contractSummaryPage, loginPage, page, testUsers }) => { 
    await Given('the user navigates to the application', null, { loginPage, page }); 
    await When('the user logs in with valid credentials', null, { loginPage, testUsers }); 
    await Then('the user should be redirected to the dashboard', null, { contractSummaryPage, page }); 
    await When('the user navigates to the Contract Details page', null, { contractDetailsPage }); 
    await Then('the Contract Details grid should be visible', null, { contractDetailsPage }); 
    await When('the user enters a symbol in the Symbol/CUSIP filter', null, { contractDetailsPage, contractSummaryPage, page }); 
    await Then('the live quote snapshot banner should be visible', null, { contractDetailsPage }); 
    await And('the pinned total row should recalculate to reflect only the filtered contracts', null, { contractDetailsPage }); 
    await When('the user expands the first contract row', null, { contractDetailsPage }); 
    await Then('the contract history detail panel should be visible', null, { contractDetailsPage }); 
    await When('the user opens the Trade panel', null, { contractDetailsPage }); 
    await And('the user selects the Borrow trade type', null, { contractDetailsPage }); 
    await And('the user fills in all required Trade fields', null, { contractDetailsPage }); 
    await And('the user submits the Trade form', null, { contractDetailsPage }); 
    await Then('a trade success confirmation should be displayed', null, { contractDetailsPage }); 
    await And('the Trade panel should close', null, { contractDetailsPage }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('UI-Automation\\features\\ContractDetails.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":10,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-192"],"steps":[{"pwStepLine":7,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"When the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"Then the Contract Details grid should be visible","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"And the grid should display contract rows for the selected depository","stepMatchArguments":[]}]},
  {"pwTestLine":13,"pickleLine":18,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-192"],"steps":[{"pwStepLine":14,"gherkinStepLine":19,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":20,"keywordType":"Action","textWithKeyword":"When the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"Then the grid should display the Symbol column","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"And the grid should display the DTC column","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"And the grid should display the Contract No. column","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"And the grid should display the Profit Center column","stepMatchArguments":[]}]},
  {"pwTestLine":22,"pickleLine":30,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-192"],"steps":[{"pwStepLine":23,"gherkinStepLine":31,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":32,"keywordType":"Action","textWithKeyword":"When the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":33,"keywordType":"Outcome","textWithKeyword":"Then the Trade action control should be visible and enabled","stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":34,"keywordType":"Outcome","textWithKeyword":"And the ReRate action control should be visible","stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":35,"keywordType":"Outcome","textWithKeyword":"And the Recall action control should be visible","stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":36,"keywordType":"Outcome","textWithKeyword":"And the Return action control should be visible","stepMatchArguments":[]}]},
  {"pwTestLine":31,"pickleLine":40,"tags":["@smokeBDD","@Regression","@SLL-192"],"steps":[{"pwStepLine":32,"gherkinStepLine":41,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":42,"keywordType":"Action","textWithKeyword":"When the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":43,"keywordType":"Outcome","textWithKeyword":"Then the Trade, ReRate, Recall, and Return action controls should not be available for the read-only user","stepMatchArguments":[]}]},
  {"pwTestLine":37,"pickleLine":49,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-192"],"steps":[{"pwStepLine":38,"gherkinStepLine":50,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":39,"gherkinStepLine":51,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":40,"gherkinStepLine":52,"keywordType":"Action","textWithKeyword":"When the user enters a symbol in the Symbol/CUSIP filter","stepMatchArguments":[]},{"pwStepLine":41,"gherkinStepLine":53,"keywordType":"Outcome","textWithKeyword":"Then the grid should display only contracts matching the entered symbol","stepMatchArguments":[]}]},
  {"pwTestLine":44,"pickleLine":57,"tags":["@smokeBDD","@Regression","@SLL-192"],"steps":[{"pwStepLine":45,"gherkinStepLine":58,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":46,"gherkinStepLine":59,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":47,"gherkinStepLine":60,"keywordType":"Action","textWithKeyword":"When the user enters a value in the DTC filter","stepMatchArguments":[]},{"pwStepLine":48,"gherkinStepLine":61,"keywordType":"Outcome","textWithKeyword":"Then the grid should display only contracts matching the entered DTC value","stepMatchArguments":[]}]},
  {"pwTestLine":51,"pickleLine":65,"tags":["@smokeBDD","@Regression","@SLL-192"],"steps":[{"pwStepLine":52,"gherkinStepLine":66,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":53,"gherkinStepLine":67,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":54,"gherkinStepLine":68,"keywordType":"Action","textWithKeyword":"When the user enters a value in the LoanetId filter","stepMatchArguments":[]},{"pwStepLine":55,"gherkinStepLine":69,"keywordType":"Outcome","textWithKeyword":"Then the grid should display only contracts matching the entered LoanetId","stepMatchArguments":[]}]},
  {"pwTestLine":58,"pickleLine":73,"tags":["@smokeBDD","@Regression","@SLL-192"],"steps":[{"pwStepLine":59,"gherkinStepLine":74,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":60,"gherkinStepLine":75,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":61,"gherkinStepLine":76,"keywordType":"Action","textWithKeyword":"When the user enters a value in the Contract No. filter","stepMatchArguments":[]},{"pwStepLine":62,"gherkinStepLine":77,"keywordType":"Outcome","textWithKeyword":"Then the grid should display only contracts matching the entered contract number","stepMatchArguments":[]}]},
  {"pwTestLine":65,"pickleLine":81,"tags":["@smokeBDD","@Regression","@SLL-192"],"steps":[{"pwStepLine":66,"gherkinStepLine":82,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":67,"gherkinStepLine":83,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":68,"gherkinStepLine":84,"keywordType":"Action","textWithKeyword":"When the user enters a value in the Profit Center filter","stepMatchArguments":[]},{"pwStepLine":69,"gherkinStepLine":85,"keywordType":"Outcome","textWithKeyword":"Then the grid should display only contracts matching the entered profit center","stepMatchArguments":[]}]},
  {"pwTestLine":72,"pickleLine":89,"tags":["@smokeBDD","@Regression","@SLL-192"],"steps":[{"pwStepLine":73,"gherkinStepLine":90,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":74,"gherkinStepLine":91,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":75,"gherkinStepLine":92,"keywordType":"Action","textWithKeyword":"When the user enters a start date range in the Start Date filter","stepMatchArguments":[]},{"pwStepLine":76,"gherkinStepLine":93,"keywordType":"Outcome","textWithKeyword":"Then the grid should display only contracts within the entered date range","stepMatchArguments":[]}]},
  {"pwTestLine":79,"pickleLine":97,"tags":["@smokeBDD","@Regression","@SLL-192"],"steps":[{"pwStepLine":80,"gherkinStepLine":98,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":81,"gherkinStepLine":99,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":82,"gherkinStepLine":100,"keywordType":"Action","textWithKeyword":"When the user selects a Start Date preset option","stepMatchArguments":[]},{"pwStepLine":83,"gherkinStepLine":101,"keywordType":"Outcome","textWithKeyword":"Then the grid should display contracts matching the selected preset date range","stepMatchArguments":[]}]},
  {"pwTestLine":86,"pickleLine":105,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-192"],"steps":[{"pwStepLine":87,"gherkinStepLine":106,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":88,"gherkinStepLine":107,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":89,"gherkinStepLine":108,"keywordType":"Action","textWithKeyword":"When the user changes the Effective Date to a different date","stepMatchArguments":[]},{"pwStepLine":90,"gherkinStepLine":109,"keywordType":"Outcome","textWithKeyword":"Then the Contract Details grid should reload with contracts for the new effective date","stepMatchArguments":[]}]},
  {"pwTestLine":93,"pickleLine":113,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-192"],"steps":[{"pwStepLine":94,"gherkinStepLine":114,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":95,"gherkinStepLine":115,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":96,"gherkinStepLine":116,"keywordType":"Action","textWithKeyword":"When the user changes the selected depository","stepMatchArguments":[]},{"pwStepLine":97,"gherkinStepLine":117,"keywordType":"Outcome","textWithKeyword":"Then the Contract Details grid should reload with data for the newly selected depository","stepMatchArguments":[]}]},
  {"pwTestLine":100,"pickleLine":123,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-192"],"steps":[{"pwStepLine":101,"gherkinStepLine":124,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":102,"gherkinStepLine":125,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":103,"gherkinStepLine":126,"keywordType":"Action","textWithKeyword":"When the user enters a symbol in the Symbol/CUSIP filter","stepMatchArguments":[]},{"pwStepLine":104,"gherkinStepLine":127,"keywordType":"Outcome","textWithKeyword":"Then the live quote snapshot banner should be visible","stepMatchArguments":[]}]},
  {"pwTestLine":107,"pickleLine":131,"tags":["@smokeBDD","@Regression","@SLL-192"],"steps":[{"pwStepLine":108,"gherkinStepLine":132,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":109,"gherkinStepLine":133,"keywordType":"Action","textWithKeyword":"When the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":110,"gherkinStepLine":134,"keywordType":"Outcome","textWithKeyword":"Then the live quote snapshot banner should not be visible","stepMatchArguments":[]}]},
  {"pwTestLine":113,"pickleLine":140,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-192"],"steps":[{"pwStepLine":114,"gherkinStepLine":141,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":115,"gherkinStepLine":142,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":116,"gherkinStepLine":143,"keywordType":"Action","textWithKeyword":"When the user expands the first contract row","stepMatchArguments":[]},{"pwStepLine":117,"gherkinStepLine":144,"keywordType":"Outcome","textWithKeyword":"Then the contract history detail panel should be visible","stepMatchArguments":[]}]},
  {"pwTestLine":120,"pickleLine":148,"tags":["@smokeBDD","@Regression","@SLL-192"],"steps":[{"pwStepLine":121,"gherkinStepLine":149,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":122,"gherkinStepLine":150,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":123,"gherkinStepLine":151,"keywordType":"Context","textWithKeyword":"And the user expands the first contract row","stepMatchArguments":[]},{"pwStepLine":124,"gherkinStepLine":152,"keywordType":"Action","textWithKeyword":"When the user collapses the expanded contract row","stepMatchArguments":[]},{"pwStepLine":125,"gherkinStepLine":153,"keywordType":"Outcome","textWithKeyword":"Then the contract history detail panel should not be visible","stepMatchArguments":[]}]},
  {"pwTestLine":128,"pickleLine":159,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-192"],"steps":[{"pwStepLine":129,"gherkinStepLine":160,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":130,"gherkinStepLine":161,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":131,"gherkinStepLine":162,"keywordType":"Outcome","textWithKeyword":"Then the pinned total row should reflect totals from Open and Warning contracts only","stepMatchArguments":[]}]},
  {"pwTestLine":134,"pickleLine":166,"tags":["@smokeBDD","@Regression","@SLL-192"],"steps":[{"pwStepLine":135,"gherkinStepLine":167,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":136,"gherkinStepLine":168,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":137,"gherkinStepLine":169,"keywordType":"Outcome","textWithKeyword":"Then the Borrow Rate in the pinned totals should reflect the quantity-weighted average","stepMatchArguments":[]},{"pwStepLine":138,"gherkinStepLine":170,"keywordType":"Outcome","textWithKeyword":"And the Loan Rate in the pinned totals should reflect the quantity-weighted average","stepMatchArguments":[]}]},
  {"pwTestLine":141,"pickleLine":174,"tags":["@smokeBDD","@Regression","@SLL-192"],"steps":[{"pwStepLine":142,"gherkinStepLine":175,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":143,"gherkinStepLine":176,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":144,"gherkinStepLine":177,"keywordType":"Outcome","textWithKeyword":"Then the Inventory value in pinned totals should equal Borrow Qty minus Loan Qty","stepMatchArguments":[]}]},
  {"pwTestLine":147,"pickleLine":181,"tags":["@smokeBDD","@Regression","@SLL-192"],"steps":[{"pwStepLine":148,"gherkinStepLine":182,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":149,"gherkinStepLine":183,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":150,"gherkinStepLine":184,"keywordType":"Outcome","textWithKeyword":"Then the Net value in pinned totals should equal Loan Amount minus Borrow Amount","stepMatchArguments":[]}]},
  {"pwTestLine":153,"pickleLine":188,"tags":["@smokeBDD","@Regression","@SLL-192"],"steps":[{"pwStepLine":154,"gherkinStepLine":189,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":155,"gherkinStepLine":190,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":156,"gherkinStepLine":191,"keywordType":"Outcome","textWithKeyword":"Then the Match P&L value should reflect the daily spread calculation on the matched dollar amount","stepMatchArguments":[]}]},
  {"pwTestLine":159,"pickleLine":195,"tags":["@smokeBDD","@Regression","@SLL-192"],"steps":[{"pwStepLine":160,"gherkinStepLine":196,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":161,"gherkinStepLine":197,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":162,"gherkinStepLine":198,"keywordType":"Outcome","textWithKeyword":"Then the Funding P&L value should reflect the net dollar imbalance at the 4.33 funding rate","stepMatchArguments":[]}]},
  {"pwTestLine":165,"pickleLine":202,"tags":["@smokeBDD","@Regression","@SLL-192"],"steps":[{"pwStepLine":166,"gherkinStepLine":203,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":167,"gherkinStepLine":204,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":168,"gherkinStepLine":205,"keywordType":"Outcome","textWithKeyword":"Then the Total P&L value should equal Funding plus Match","stepMatchArguments":[]}]},
  {"pwTestLine":171,"pickleLine":209,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-192"],"steps":[{"pwStepLine":172,"gherkinStepLine":210,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":173,"gherkinStepLine":211,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":174,"gherkinStepLine":212,"keywordType":"Action","textWithKeyword":"When the user enters a symbol in the Symbol/CUSIP filter","stepMatchArguments":[]},{"pwStepLine":175,"gherkinStepLine":213,"keywordType":"Outcome","textWithKeyword":"Then the pinned total row should recalculate to reflect only the filtered contracts","stepMatchArguments":[]}]},
  {"pwTestLine":178,"pickleLine":217,"tags":["@smokeBDD","@Regression","@SLL-192"],"steps":[{"pwStepLine":179,"gherkinStepLine":218,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":180,"gherkinStepLine":219,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":181,"gherkinStepLine":220,"keywordType":"Context","textWithKeyword":"And the user enters a symbol in the Symbol/CUSIP filter","stepMatchArguments":[]},{"pwStepLine":182,"gherkinStepLine":221,"keywordType":"Action","textWithKeyword":"When the user clears all active filters","stepMatchArguments":[]},{"pwStepLine":183,"gherkinStepLine":222,"keywordType":"Outcome","textWithKeyword":"Then the pinned total row should recalculate to reflect all Open and Warning contracts","stepMatchArguments":[]}]},
  {"pwTestLine":186,"pickleLine":226,"tags":["@smokeBDD","@Regression","@SLL-192"],"steps":[{"pwStepLine":187,"gherkinStepLine":227,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":188,"gherkinStepLine":228,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":189,"gherkinStepLine":229,"keywordType":"Action","textWithKeyword":"When the user enters \"ZZZZINVALID\" in the Symbol/CUSIP filter","stepMatchArguments":[{"group":{"start":16,"value":"\"ZZZZINVALID\"","children":[{"start":17,"value":"ZZZZINVALID","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":190,"gherkinStepLine":230,"keywordType":"Outcome","textWithKeyword":"Then the grid should show no matching rows","stepMatchArguments":[]},{"pwStepLine":191,"gherkinStepLine":231,"keywordType":"Outcome","textWithKeyword":"And the pinned total row should display zero values","stepMatchArguments":[]}]},
  {"pwTestLine":194,"pickleLine":237,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-192"],"steps":[{"pwStepLine":195,"gherkinStepLine":238,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":196,"gherkinStepLine":239,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":197,"gherkinStepLine":240,"keywordType":"Context","textWithKeyword":"And the Effective Date is set to today","stepMatchArguments":[]},{"pwStepLine":198,"gherkinStepLine":241,"keywordType":"Outcome","textWithKeyword":"Then the Profit Center field should be editable","stepMatchArguments":[]}]},
  {"pwTestLine":201,"pickleLine":245,"tags":["@smokeBDD","@Regression","@SLL-192"],"steps":[{"pwStepLine":202,"gherkinStepLine":246,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":203,"gherkinStepLine":247,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":204,"gherkinStepLine":248,"keywordType":"Action","textWithKeyword":"When the user changes the Effective Date to a past date","stepMatchArguments":[]},{"pwStepLine":205,"gherkinStepLine":249,"keywordType":"Outcome","textWithKeyword":"Then the Profit Center field should not be editable","stepMatchArguments":[]}]},
  {"pwTestLine":208,"pickleLine":253,"tags":["@smokeBDD","@Regression","@SLL-192"],"steps":[{"pwStepLine":209,"gherkinStepLine":254,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":210,"gherkinStepLine":255,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":211,"gherkinStepLine":256,"keywordType":"Context","textWithKeyword":"And the Effective Date is set to today","stepMatchArguments":[]},{"pwStepLine":212,"gherkinStepLine":257,"keywordType":"Action","textWithKeyword":"When the user updates the Profit Center field with a single character value","stepMatchArguments":[]},{"pwStepLine":213,"gherkinStepLine":258,"keywordType":"Outcome","textWithKeyword":"Then the Profit Center update should be submitted successfully","stepMatchArguments":[]}]},
  {"pwTestLine":216,"pickleLine":262,"tags":["@smokeBDD","@Regression","@SLL-192"],"steps":[{"pwStepLine":217,"gherkinStepLine":263,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":218,"gherkinStepLine":264,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":219,"gherkinStepLine":265,"keywordType":"Context","textWithKeyword":"And the Effective Date is set to today","stepMatchArguments":[]},{"pwStepLine":220,"gherkinStepLine":266,"keywordType":"Action","textWithKeyword":"When the user clears the Profit Center field and submits","stepMatchArguments":[]},{"pwStepLine":221,"gherkinStepLine":267,"keywordType":"Outcome","textWithKeyword":"Then the Profit Center update should be submitted successfully","stepMatchArguments":[]}]},
  {"pwTestLine":224,"pickleLine":271,"tags":["@smokeBDD","@Regression","@SLL-192"],"steps":[{"pwStepLine":225,"gherkinStepLine":272,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":226,"gherkinStepLine":273,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":227,"gherkinStepLine":274,"keywordType":"Context","textWithKeyword":"And the Effective Date is set to today","stepMatchArguments":[]},{"pwStepLine":228,"gherkinStepLine":275,"keywordType":"Action","textWithKeyword":"When the user enters a multi-character value in the Profit Center field","stepMatchArguments":[]},{"pwStepLine":229,"gherkinStepLine":276,"keywordType":"Outcome","textWithKeyword":"Then a validation error should be displayed for the Profit Center field","stepMatchArguments":[]}]},
  {"pwTestLine":232,"pickleLine":282,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-192"],"steps":[{"pwStepLine":233,"gherkinStepLine":283,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":234,"gherkinStepLine":284,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":235,"gherkinStepLine":285,"keywordType":"Action","textWithKeyword":"When the user opens the Trade panel","stepMatchArguments":[]},{"pwStepLine":236,"gherkinStepLine":286,"keywordType":"Action","textWithKeyword":"And the user selects the Borrow trade type","stepMatchArguments":[]},{"pwStepLine":237,"gherkinStepLine":287,"keywordType":"Action","textWithKeyword":"And the user fills in all required Trade fields","stepMatchArguments":[]},{"pwStepLine":238,"gherkinStepLine":288,"keywordType":"Action","textWithKeyword":"And the user submits the Trade form","stepMatchArguments":[]},{"pwStepLine":239,"gherkinStepLine":289,"keywordType":"Outcome","textWithKeyword":"Then a trade success confirmation should be displayed","stepMatchArguments":[]},{"pwStepLine":240,"gherkinStepLine":290,"keywordType":"Outcome","textWithKeyword":"And the Trade panel should close","stepMatchArguments":[]}]},
  {"pwTestLine":243,"pickleLine":294,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-192"],"steps":[{"pwStepLine":244,"gherkinStepLine":295,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":245,"gherkinStepLine":296,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":246,"gherkinStepLine":297,"keywordType":"Action","textWithKeyword":"When the user opens the Trade panel","stepMatchArguments":[]},{"pwStepLine":247,"gherkinStepLine":298,"keywordType":"Action","textWithKeyword":"And the user selects the Loan trade type","stepMatchArguments":[]},{"pwStepLine":248,"gherkinStepLine":299,"keywordType":"Action","textWithKeyword":"And the user fills in all required Trade fields","stepMatchArguments":[]},{"pwStepLine":249,"gherkinStepLine":300,"keywordType":"Action","textWithKeyword":"And the user submits the Trade form","stepMatchArguments":[]},{"pwStepLine":250,"gherkinStepLine":301,"keywordType":"Outcome","textWithKeyword":"Then a trade success confirmation should be displayed","stepMatchArguments":[]},{"pwStepLine":251,"gherkinStepLine":302,"keywordType":"Outcome","textWithKeyword":"And the Trade panel should close","stepMatchArguments":[]}]},
  {"pwTestLine":254,"pickleLine":306,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-192"],"steps":[{"pwStepLine":255,"gherkinStepLine":307,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":256,"gherkinStepLine":308,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":257,"gherkinStepLine":309,"keywordType":"Action","textWithKeyword":"When the user opens the Trade panel","stepMatchArguments":[]},{"pwStepLine":258,"gherkinStepLine":310,"keywordType":"Action","textWithKeyword":"And the user selects both Borrow and Loan trade types","stepMatchArguments":[]},{"pwStepLine":259,"gherkinStepLine":311,"keywordType":"Action","textWithKeyword":"And the user fills in the Borrow side fields","stepMatchArguments":[]},{"pwStepLine":260,"gherkinStepLine":312,"keywordType":"Action","textWithKeyword":"And the user fills in the Loan side specific fields","stepMatchArguments":[]},{"pwStepLine":261,"gherkinStepLine":313,"keywordType":"Action","textWithKeyword":"And the user submits the Trade form","stepMatchArguments":[]},{"pwStepLine":262,"gherkinStepLine":314,"keywordType":"Outcome","textWithKeyword":"Then two linked trade submissions should be created successfully","stepMatchArguments":[]}]},
  {"pwTestLine":265,"pickleLine":318,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-192"],"steps":[{"pwStepLine":266,"gherkinStepLine":319,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":267,"gherkinStepLine":320,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":268,"gherkinStepLine":321,"keywordType":"Action","textWithKeyword":"When the user opens the Trade panel from a contract row","stepMatchArguments":[]},{"pwStepLine":269,"gherkinStepLine":322,"keywordType":"Outcome","textWithKeyword":"Then the symbol field in the Trade panel should be prefilled with the contract symbol","stepMatchArguments":[]}]},
  {"pwTestLine":272,"pickleLine":326,"tags":["@smokeBDD","@Regression","@SLL-192"],"steps":[{"pwStepLine":273,"gherkinStepLine":327,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":274,"gherkinStepLine":328,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":275,"gherkinStepLine":329,"keywordType":"Action","textWithKeyword":"When the user opens the Trade panel","stepMatchArguments":[]},{"pwStepLine":276,"gherkinStepLine":330,"keywordType":"Action","textWithKeyword":"And the user submits the Trade form without filling required fields","stepMatchArguments":[]},{"pwStepLine":277,"gherkinStepLine":331,"keywordType":"Outcome","textWithKeyword":"Then validation errors should be displayed for counterparty, quantity, symbol, and rebate rate","stepMatchArguments":[]}]},
  {"pwTestLine":280,"pickleLine":335,"tags":["@smokeBDD","@Regression","@SLL-192"],"steps":[{"pwStepLine":281,"gherkinStepLine":336,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":282,"gherkinStepLine":337,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":283,"gherkinStepLine":338,"keywordType":"Action","textWithKeyword":"When the user opens the Trade panel","stepMatchArguments":[]},{"pwStepLine":284,"gherkinStepLine":339,"keywordType":"Action","textWithKeyword":"And the user enters an invalid counterparty","stepMatchArguments":[]},{"pwStepLine":285,"gherkinStepLine":340,"keywordType":"Action","textWithKeyword":"And the user submits the Trade form","stepMatchArguments":[]},{"pwStepLine":286,"gherkinStepLine":341,"keywordType":"Outcome","textWithKeyword":"Then a validation error should be displayed for the counterparty field","stepMatchArguments":[]}]},
  {"pwTestLine":289,"pickleLine":345,"tags":["@smokeBDD","@Regression","@SLL-192"],"steps":[{"pwStepLine":290,"gherkinStepLine":346,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":291,"gherkinStepLine":347,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":292,"gherkinStepLine":348,"keywordType":"Action","textWithKeyword":"When the user opens the Trade panel","stepMatchArguments":[]},{"pwStepLine":293,"gherkinStepLine":349,"keywordType":"Action","textWithKeyword":"And the user enters an invalid symbol or CUSIP","stepMatchArguments":[]},{"pwStepLine":294,"gherkinStepLine":350,"keywordType":"Action","textWithKeyword":"And the user submits the Trade form","stepMatchArguments":[]},{"pwStepLine":295,"gherkinStepLine":351,"keywordType":"Outcome","textWithKeyword":"Then a validation error should be displayed for the symbol field","stepMatchArguments":[]}]},
  {"pwTestLine":298,"pickleLine":355,"tags":["@smokeBDD","@Regression","@SLL-192"],"steps":[{"pwStepLine":299,"gherkinStepLine":356,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":300,"gherkinStepLine":357,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":301,"gherkinStepLine":358,"keywordType":"Action","textWithKeyword":"When the user opens the Trade panel","stepMatchArguments":[]},{"pwStepLine":302,"gherkinStepLine":359,"keywordType":"Action","textWithKeyword":"And the user selects both Borrow and Loan trade types","stepMatchArguments":[]},{"pwStepLine":303,"gherkinStepLine":360,"keywordType":"Outcome","textWithKeyword":"Then the Loan side symbol and quantity fields should be read-only and copied from the Borrow side","stepMatchArguments":[]}]},
  {"pwTestLine":306,"pickleLine":364,"tags":["@smokeBDD","@Regression","@SLL-192"],"steps":[{"pwStepLine":307,"gherkinStepLine":365,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":308,"gherkinStepLine":366,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":309,"gherkinStepLine":367,"keywordType":"Action","textWithKeyword":"When the user opens the Trade panel","stepMatchArguments":[]},{"pwStepLine":310,"gherkinStepLine":368,"keywordType":"Action","textWithKeyword":"And the user selects both Borrow and Loan trade types","stepMatchArguments":[]},{"pwStepLine":311,"gherkinStepLine":369,"keywordType":"Outcome","textWithKeyword":"Then the Loan side should require its own counterparty field","stepMatchArguments":[]},{"pwStepLine":312,"gherkinStepLine":370,"keywordType":"Outcome","textWithKeyword":"And the Loan side should require its own rebate rate field","stepMatchArguments":[]}]},
  {"pwTestLine":315,"pickleLine":376,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-192"],"steps":[{"pwStepLine":316,"gherkinStepLine":377,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":317,"gherkinStepLine":378,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":318,"gherkinStepLine":379,"keywordType":"Context","textWithKeyword":"And the Effective Date is set to today","stepMatchArguments":[]},{"pwStepLine":319,"gherkinStepLine":380,"keywordType":"Action","textWithKeyword":"When the user selects an Open contract row","stepMatchArguments":[]},{"pwStepLine":320,"gherkinStepLine":381,"keywordType":"Outcome","textWithKeyword":"Then the ReRate action control should be enabled","stepMatchArguments":[]}]},
  {"pwTestLine":323,"pickleLine":385,"tags":["@smokeBDD","@Regression","@SLL-192"],"steps":[{"pwStepLine":324,"gherkinStepLine":386,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":325,"gherkinStepLine":387,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":326,"gherkinStepLine":388,"keywordType":"Outcome","textWithKeyword":"Then the ReRate action control should be disabled","stepMatchArguments":[]}]},
  {"pwTestLine":329,"pickleLine":392,"tags":["@smokeBDD","@Regression","@SLL-192"],"steps":[{"pwStepLine":330,"gherkinStepLine":393,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":331,"gherkinStepLine":394,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":332,"gherkinStepLine":395,"keywordType":"Action","textWithKeyword":"When the user changes the Effective Date to a past date","stepMatchArguments":[]},{"pwStepLine":333,"gherkinStepLine":396,"keywordType":"Outcome","textWithKeyword":"Then the ReRate action control should be disabled","stepMatchArguments":[]}]},
  {"pwTestLine":336,"pickleLine":400,"tags":["@smokeBDD","@Regression","@SLL-192"],"steps":[{"pwStepLine":337,"gherkinStepLine":401,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":338,"gherkinStepLine":402,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":339,"gherkinStepLine":403,"keywordType":"Context","textWithKeyword":"And the Effective Date is set to today","stepMatchArguments":[]},{"pwStepLine":340,"gherkinStepLine":404,"keywordType":"Action","textWithKeyword":"When the user selects only a Closed contract row","stepMatchArguments":[]},{"pwStepLine":341,"gherkinStepLine":405,"keywordType":"Outcome","textWithKeyword":"Then the ReRate action control should be disabled","stepMatchArguments":[]}]},
  {"pwTestLine":344,"pickleLine":409,"tags":["@smokeBDD","@Regression","@SLL-192"],"steps":[{"pwStepLine":345,"gherkinStepLine":410,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":346,"gherkinStepLine":411,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":347,"gherkinStepLine":412,"keywordType":"Context","textWithKeyword":"And the Effective Date is set to today","stepMatchArguments":[]},{"pwStepLine":348,"gherkinStepLine":413,"keywordType":"Action","textWithKeyword":"When the user selects one Open contract row","stepMatchArguments":[]},{"pwStepLine":349,"gherkinStepLine":414,"keywordType":"Action","textWithKeyword":"And the user opens the ReRate dialog","stepMatchArguments":[]},{"pwStepLine":350,"gherkinStepLine":415,"keywordType":"Outcome","textWithKeyword":"Then a contract summary line should be visible in the ReRate dialog","stepMatchArguments":[]}]},
  {"pwTestLine":353,"pickleLine":419,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-192"],"steps":[{"pwStepLine":354,"gherkinStepLine":420,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":355,"gherkinStepLine":421,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":356,"gherkinStepLine":422,"keywordType":"Context","textWithKeyword":"And the Effective Date is set to today","stepMatchArguments":[]},{"pwStepLine":357,"gherkinStepLine":423,"keywordType":"Action","textWithKeyword":"When the user selects multiple Open contract rows","stepMatchArguments":[]},{"pwStepLine":358,"gherkinStepLine":424,"keywordType":"Action","textWithKeyword":"And the user opens the ReRate dialog","stepMatchArguments":[]},{"pwStepLine":359,"gherkinStepLine":425,"keywordType":"Action","textWithKeyword":"And the user enters a valid rebate rate","stepMatchArguments":[]},{"pwStepLine":360,"gherkinStepLine":426,"keywordType":"Action","textWithKeyword":"And the user submits the ReRate dialog","stepMatchArguments":[]},{"pwStepLine":361,"gherkinStepLine":427,"keywordType":"Outcome","textWithKeyword":"Then a success message should be displayed","stepMatchArguments":[]},{"pwStepLine":362,"gherkinStepLine":428,"keywordType":"Outcome","textWithKeyword":"And the contract selection should be cleared","stepMatchArguments":[]}]},
  {"pwTestLine":365,"pickleLine":432,"tags":["@smokeBDD","@Regression","@SLL-192"],"steps":[{"pwStepLine":366,"gherkinStepLine":433,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":367,"gherkinStepLine":434,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":368,"gherkinStepLine":435,"keywordType":"Context","textWithKeyword":"And the Effective Date is set to today","stepMatchArguments":[]},{"pwStepLine":369,"gherkinStepLine":436,"keywordType":"Action","textWithKeyword":"When the user selects an Open contract row","stepMatchArguments":[]},{"pwStepLine":370,"gherkinStepLine":437,"keywordType":"Action","textWithKeyword":"And the user opens the ReRate dialog","stepMatchArguments":[]},{"pwStepLine":371,"gherkinStepLine":438,"keywordType":"Action","textWithKeyword":"And the user submits the ReRate dialog without entering a rate","stepMatchArguments":[]},{"pwStepLine":372,"gherkinStepLine":439,"keywordType":"Outcome","textWithKeyword":"Then a validation error should be displayed for the rebate rate field","stepMatchArguments":[]}]},
  {"pwTestLine":375,"pickleLine":443,"tags":["@smokeBDD","@Regression","@SLL-192"],"steps":[{"pwStepLine":376,"gherkinStepLine":444,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":377,"gherkinStepLine":445,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":378,"gherkinStepLine":446,"keywordType":"Context","textWithKeyword":"And the Effective Date is set to today","stepMatchArguments":[]},{"pwStepLine":379,"gherkinStepLine":447,"keywordType":"Action","textWithKeyword":"When the user selects an Open contract row","stepMatchArguments":[]},{"pwStepLine":380,"gherkinStepLine":448,"keywordType":"Action","textWithKeyword":"And the user opens the ReRate dialog","stepMatchArguments":[]},{"pwStepLine":381,"gherkinStepLine":449,"keywordType":"Action","textWithKeyword":"And the user enters a non-numeric value in the rebate rate field","stepMatchArguments":[]},{"pwStepLine":382,"gherkinStepLine":450,"keywordType":"Action","textWithKeyword":"And the user submits the ReRate dialog","stepMatchArguments":[]},{"pwStepLine":383,"gherkinStepLine":451,"keywordType":"Outcome","textWithKeyword":"Then a validation error should be displayed for the rebate rate field","stepMatchArguments":[]}]},
  {"pwTestLine":386,"pickleLine":457,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-192"],"steps":[{"pwStepLine":387,"gherkinStepLine":458,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":388,"gherkinStepLine":459,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":389,"gherkinStepLine":460,"keywordType":"Context","textWithKeyword":"And the Effective Date is set to today","stepMatchArguments":[]},{"pwStepLine":390,"gherkinStepLine":461,"keywordType":"Action","textWithKeyword":"When the user selects exactly one Open loan-side contract row","stepMatchArguments":[]},{"pwStepLine":391,"gherkinStepLine":462,"keywordType":"Outcome","textWithKeyword":"Then the Recall action control should be enabled","stepMatchArguments":[]}]},
  {"pwTestLine":394,"pickleLine":466,"tags":["@smokeBDD","@Regression","@SLL-192"],"steps":[{"pwStepLine":395,"gherkinStepLine":467,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":396,"gherkinStepLine":468,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":397,"gherkinStepLine":469,"keywordType":"Context","textWithKeyword":"And the Effective Date is set to today","stepMatchArguments":[]},{"pwStepLine":398,"gherkinStepLine":470,"keywordType":"Action","textWithKeyword":"When the user selects a borrow-side contract row","stepMatchArguments":[]},{"pwStepLine":399,"gherkinStepLine":471,"keywordType":"Outcome","textWithKeyword":"Then the Recall action control should be disabled","stepMatchArguments":[]}]},
  {"pwTestLine":402,"pickleLine":475,"tags":["@smokeBDD","@Regression","@SLL-192"],"steps":[{"pwStepLine":403,"gherkinStepLine":476,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":404,"gherkinStepLine":477,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":405,"gherkinStepLine":478,"keywordType":"Context","textWithKeyword":"And the Effective Date is set to today","stepMatchArguments":[]},{"pwStepLine":406,"gherkinStepLine":479,"keywordType":"Action","textWithKeyword":"When the user selects multiple contract rows","stepMatchArguments":[]},{"pwStepLine":407,"gherkinStepLine":480,"keywordType":"Outcome","textWithKeyword":"Then the Recall action control should be disabled","stepMatchArguments":[]}]},
  {"pwTestLine":410,"pickleLine":484,"tags":["@smokeBDD","@Regression","@SLL-192"],"steps":[{"pwStepLine":411,"gherkinStepLine":485,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":412,"gherkinStepLine":486,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":413,"gherkinStepLine":487,"keywordType":"Action","textWithKeyword":"When the user changes the Effective Date to a past date","stepMatchArguments":[]},{"pwStepLine":414,"gherkinStepLine":488,"keywordType":"Outcome","textWithKeyword":"Then the Recall action control should be disabled","stepMatchArguments":[]}]},
  {"pwTestLine":417,"pickleLine":492,"tags":["@smokeBDD","@Regression","@SLL-192"],"steps":[{"pwStepLine":418,"gherkinStepLine":493,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":419,"gherkinStepLine":494,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":420,"gherkinStepLine":495,"keywordType":"Context","textWithKeyword":"And the Effective Date is set to today","stepMatchArguments":[]},{"pwStepLine":421,"gherkinStepLine":496,"keywordType":"Action","textWithKeyword":"When the user selects exactly one Open loan-side contract row","stepMatchArguments":[]},{"pwStepLine":422,"gherkinStepLine":497,"keywordType":"Action","textWithKeyword":"And the user opens the Recall dialog","stepMatchArguments":[]},{"pwStepLine":423,"gherkinStepLine":498,"keywordType":"Action","textWithKeyword":"And the user enters a recall quantity greater than the contract quantity","stepMatchArguments":[]},{"pwStepLine":424,"gherkinStepLine":499,"keywordType":"Action","textWithKeyword":"And the user submits the Recall dialog","stepMatchArguments":[]},{"pwStepLine":425,"gherkinStepLine":500,"keywordType":"Outcome","textWithKeyword":"Then a validation error should be displayed for the recall quantity field","stepMatchArguments":[]}]},
  {"pwTestLine":428,"pickleLine":504,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-192"],"steps":[{"pwStepLine":429,"gherkinStepLine":505,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":430,"gherkinStepLine":506,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":431,"gherkinStepLine":507,"keywordType":"Context","textWithKeyword":"And the Effective Date is set to today","stepMatchArguments":[]},{"pwStepLine":432,"gherkinStepLine":508,"keywordType":"Action","textWithKeyword":"When the user selects exactly one Open loan-side contract row","stepMatchArguments":[]},{"pwStepLine":433,"gherkinStepLine":509,"keywordType":"Action","textWithKeyword":"And the user opens the Recall dialog","stepMatchArguments":[]},{"pwStepLine":434,"gherkinStepLine":510,"keywordType":"Action","textWithKeyword":"And the user enters a valid recall quantity","stepMatchArguments":[]},{"pwStepLine":435,"gherkinStepLine":511,"keywordType":"Action","textWithKeyword":"And the user submits the Recall dialog","stepMatchArguments":[]},{"pwStepLine":436,"gherkinStepLine":512,"keywordType":"Outcome","textWithKeyword":"Then a success message should be displayed","stepMatchArguments":[]},{"pwStepLine":437,"gherkinStepLine":513,"keywordType":"Outcome","textWithKeyword":"And the contract selection should be cleared","stepMatchArguments":[]}]},
  {"pwTestLine":440,"pickleLine":519,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-192"],"steps":[{"pwStepLine":441,"gherkinStepLine":520,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":442,"gherkinStepLine":521,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":443,"gherkinStepLine":522,"keywordType":"Context","textWithKeyword":"And the Effective Date is set to today","stepMatchArguments":[]},{"pwStepLine":444,"gherkinStepLine":523,"keywordType":"Action","textWithKeyword":"When the user selects exactly one Open borrow-side contract row","stepMatchArguments":[]},{"pwStepLine":445,"gherkinStepLine":524,"keywordType":"Outcome","textWithKeyword":"Then the Return action control should be enabled","stepMatchArguments":[]}]},
  {"pwTestLine":448,"pickleLine":528,"tags":["@smokeBDD","@Regression","@SLL-192"],"steps":[{"pwStepLine":449,"gherkinStepLine":529,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":450,"gherkinStepLine":530,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":451,"gherkinStepLine":531,"keywordType":"Context","textWithKeyword":"And the Effective Date is set to today","stepMatchArguments":[]},{"pwStepLine":452,"gherkinStepLine":532,"keywordType":"Action","textWithKeyword":"When the user selects a loan-side contract row","stepMatchArguments":[]},{"pwStepLine":453,"gherkinStepLine":533,"keywordType":"Outcome","textWithKeyword":"Then the Return action control should be disabled","stepMatchArguments":[]}]},
  {"pwTestLine":456,"pickleLine":537,"tags":["@smokeBDD","@Regression","@SLL-192"],"steps":[{"pwStepLine":457,"gherkinStepLine":538,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":458,"gherkinStepLine":539,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":459,"gherkinStepLine":540,"keywordType":"Context","textWithKeyword":"And the Effective Date is set to today","stepMatchArguments":[]},{"pwStepLine":460,"gherkinStepLine":541,"keywordType":"Action","textWithKeyword":"When the user selects multiple contract rows","stepMatchArguments":[]},{"pwStepLine":461,"gherkinStepLine":542,"keywordType":"Outcome","textWithKeyword":"Then the Return action control should be disabled","stepMatchArguments":[]}]},
  {"pwTestLine":464,"pickleLine":546,"tags":["@smokeBDD","@Regression","@SLL-192"],"steps":[{"pwStepLine":465,"gherkinStepLine":547,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":466,"gherkinStepLine":548,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":467,"gherkinStepLine":549,"keywordType":"Action","textWithKeyword":"When the user changes the Effective Date to a past date","stepMatchArguments":[]},{"pwStepLine":468,"gherkinStepLine":550,"keywordType":"Outcome","textWithKeyword":"Then the Return action control should be disabled","stepMatchArguments":[]}]},
  {"pwTestLine":471,"pickleLine":554,"tags":["@smokeBDD","@Regression","@SLL-192"],"steps":[{"pwStepLine":472,"gherkinStepLine":555,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":473,"gherkinStepLine":556,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":474,"gherkinStepLine":557,"keywordType":"Context","textWithKeyword":"And the Effective Date is set to today","stepMatchArguments":[]},{"pwStepLine":475,"gherkinStepLine":558,"keywordType":"Action","textWithKeyword":"When the user selects exactly one Open borrow-side contract row","stepMatchArguments":[]},{"pwStepLine":476,"gherkinStepLine":559,"keywordType":"Action","textWithKeyword":"And the user opens the Return dialog","stepMatchArguments":[]},{"pwStepLine":477,"gherkinStepLine":560,"keywordType":"Action","textWithKeyword":"And the user enters a return quantity greater than the contract quantity","stepMatchArguments":[]},{"pwStepLine":478,"gherkinStepLine":561,"keywordType":"Action","textWithKeyword":"And the user submits the Return dialog","stepMatchArguments":[]},{"pwStepLine":479,"gherkinStepLine":562,"keywordType":"Outcome","textWithKeyword":"Then a validation error should be displayed for the return quantity field","stepMatchArguments":[]}]},
  {"pwTestLine":482,"pickleLine":566,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-192"],"steps":[{"pwStepLine":483,"gherkinStepLine":567,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":484,"gherkinStepLine":568,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":485,"gherkinStepLine":569,"keywordType":"Context","textWithKeyword":"And the Effective Date is set to today","stepMatchArguments":[]},{"pwStepLine":486,"gherkinStepLine":570,"keywordType":"Action","textWithKeyword":"When the user selects an Open borrow-side contract with a start date of today","stepMatchArguments":[]},{"pwStepLine":487,"gherkinStepLine":571,"keywordType":"Action","textWithKeyword":"And the user opens the Return dialog","stepMatchArguments":[]},{"pwStepLine":488,"gherkinStepLine":572,"keywordType":"Outcome","textWithKeyword":"Then the same-day return acknowledgement checkbox should be required before submit","stepMatchArguments":[]}]},
  {"pwTestLine":491,"pickleLine":576,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-192"],"steps":[{"pwStepLine":492,"gherkinStepLine":577,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":493,"gherkinStepLine":578,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":494,"gherkinStepLine":579,"keywordType":"Context","textWithKeyword":"And the Effective Date is set to today","stepMatchArguments":[]},{"pwStepLine":495,"gherkinStepLine":580,"keywordType":"Action","textWithKeyword":"When the user selects exactly one Open borrow-side contract row","stepMatchArguments":[]},{"pwStepLine":496,"gherkinStepLine":581,"keywordType":"Action","textWithKeyword":"And the user opens the Return dialog","stepMatchArguments":[]},{"pwStepLine":497,"gherkinStepLine":582,"keywordType":"Action","textWithKeyword":"And the user enters a valid return quantity, batch code, and delivery code","stepMatchArguments":[]},{"pwStepLine":498,"gherkinStepLine":583,"keywordType":"Action","textWithKeyword":"And the user submits the Return dialog","stepMatchArguments":[]},{"pwStepLine":499,"gherkinStepLine":584,"keywordType":"Outcome","textWithKeyword":"Then a success message should be displayed","stepMatchArguments":[]},{"pwStepLine":500,"gherkinStepLine":585,"keywordType":"Outcome","textWithKeyword":"And the contract selection should be cleared","stepMatchArguments":[]}]},
  {"pwTestLine":503,"pickleLine":591,"tags":["@smokeBDD","@Regression","@SLL-192"],"steps":[{"pwStepLine":504,"gherkinStepLine":592,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":505,"gherkinStepLine":593,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":506,"gherkinStepLine":594,"keywordType":"Context","textWithKeyword":"And the selected depository has no contracts","stepMatchArguments":[]},{"pwStepLine":507,"gherkinStepLine":595,"keywordType":"Outcome","textWithKeyword":"Then the grid should display the empty state overlay","stepMatchArguments":[]},{"pwStepLine":508,"gherkinStepLine":596,"keywordType":"Outcome","textWithKeyword":"And the pinned total row should display zero values","stepMatchArguments":[]}]},
  {"pwTestLine":511,"pickleLine":600,"tags":["@smokeBDD","@Regression","@SLL-192"],"steps":[{"pwStepLine":512,"gherkinStepLine":601,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":513,"gherkinStepLine":602,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":514,"gherkinStepLine":603,"keywordType":"Action","textWithKeyword":"When the user enters \"ZZZZINVALID\" in the Symbol/CUSIP filter","stepMatchArguments":[{"group":{"start":16,"value":"\"ZZZZINVALID\"","children":[{"start":17,"value":"ZZZZINVALID","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":515,"gherkinStepLine":604,"keywordType":"Outcome","textWithKeyword":"Then the grid should show no matching rows","stepMatchArguments":[]},{"pwStepLine":516,"gherkinStepLine":605,"keywordType":"Outcome","textWithKeyword":"And the pinned total row should display zero values","stepMatchArguments":[]}]},
  {"pwTestLine":521,"pickleLine":619,"tags":["@smokeBDD","@Regression","@SLL-192"],"steps":[{"pwStepLine":522,"gherkinStepLine":612,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":523,"gherkinStepLine":613,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":524,"gherkinStepLine":614,"keywordType":"Action","textWithKeyword":"When the user filters by \"Symbol/CUSIP\" with value \"AAPL\"","stepMatchArguments":[{"group":{"start":20,"value":"\"Symbol/CUSIP\"","children":[{"start":21,"value":"Symbol/CUSIP","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":46,"value":"\"AAPL\"","children":[{"start":47,"value":"AAPL","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":525,"gherkinStepLine":615,"keywordType":"Outcome","textWithKeyword":"Then the expected filter outcome should be \"rows shown\"","stepMatchArguments":[{"group":{"start":38,"value":"\"rows shown\"","children":[{"start":39,"value":"rows shown","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":528,"pickleLine":620,"tags":["@smokeBDD","@Regression","@SLL-192"],"steps":[{"pwStepLine":529,"gherkinStepLine":612,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":530,"gherkinStepLine":613,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":531,"gherkinStepLine":614,"keywordType":"Action","textWithKeyword":"When the user filters by \"Symbol/CUSIP\" with value \"MSFT\"","stepMatchArguments":[{"group":{"start":20,"value":"\"Symbol/CUSIP\"","children":[{"start":21,"value":"Symbol/CUSIP","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":46,"value":"\"MSFT\"","children":[{"start":47,"value":"MSFT","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":532,"gherkinStepLine":615,"keywordType":"Outcome","textWithKeyword":"Then the expected filter outcome should be \"rows shown\"","stepMatchArguments":[{"group":{"start":38,"value":"\"rows shown\"","children":[{"start":39,"value":"rows shown","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":535,"pickleLine":621,"tags":["@smokeBDD","@Regression","@SLL-192"],"steps":[{"pwStepLine":536,"gherkinStepLine":612,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":537,"gherkinStepLine":613,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":538,"gherkinStepLine":614,"keywordType":"Action","textWithKeyword":"When the user filters by \"DTC\" with value \"0005\"","stepMatchArguments":[{"group":{"start":20,"value":"\"DTC\"","children":[{"start":21,"value":"DTC","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":37,"value":"\"0005\"","children":[{"start":38,"value":"0005","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":539,"gherkinStepLine":615,"keywordType":"Outcome","textWithKeyword":"Then the expected filter outcome should be \"rows shown\"","stepMatchArguments":[{"group":{"start":38,"value":"\"rows shown\"","children":[{"start":39,"value":"rows shown","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":542,"pickleLine":622,"tags":["@smokeBDD","@Regression","@SLL-192"],"steps":[{"pwStepLine":543,"gherkinStepLine":612,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":544,"gherkinStepLine":613,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":545,"gherkinStepLine":614,"keywordType":"Action","textWithKeyword":"When the user filters by \"Symbol/CUSIP\" with value \"ZZZZINVALID\"","stepMatchArguments":[{"group":{"start":20,"value":"\"Symbol/CUSIP\"","children":[{"start":21,"value":"Symbol/CUSIP","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":46,"value":"\"ZZZZINVALID\"","children":[{"start":47,"value":"ZZZZINVALID","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":546,"gherkinStepLine":615,"keywordType":"Outcome","textWithKeyword":"Then the expected filter outcome should be \"empty grid\"","stepMatchArguments":[{"group":{"start":38,"value":"\"empty grid\"","children":[{"start":39,"value":"empty grid","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":549,"pickleLine":623,"tags":["@smokeBDD","@Regression","@SLL-192"],"steps":[{"pwStepLine":550,"gherkinStepLine":612,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":551,"gherkinStepLine":613,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":552,"gherkinStepLine":614,"keywordType":"Action","textWithKeyword":"When the user filters by \"Profit Center\" with value \"INVALID_PC\"","stepMatchArguments":[{"group":{"start":20,"value":"\"Profit Center\"","children":[{"start":21,"value":"Profit Center","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":47,"value":"\"INVALID_PC\"","children":[{"start":48,"value":"INVALID_PC","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":553,"gherkinStepLine":615,"keywordType":"Outcome","textWithKeyword":"Then the expected filter outcome should be \"empty grid\"","stepMatchArguments":[{"group":{"start":38,"value":"\"empty grid\"","children":[{"start":39,"value":"empty grid","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":558,"pickleLine":629,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-192"],"steps":[{"pwStepLine":559,"gherkinStepLine":630,"keywordType":"Context","textWithKeyword":"Given the user navigates to the application","stepMatchArguments":[]},{"pwStepLine":560,"gherkinStepLine":631,"keywordType":"Action","textWithKeyword":"When the user logs in with valid credentials","stepMatchArguments":[]},{"pwStepLine":561,"gherkinStepLine":632,"keywordType":"Outcome","textWithKeyword":"Then the user should be redirected to the dashboard","stepMatchArguments":[]},{"pwStepLine":562,"gherkinStepLine":633,"keywordType":"Action","textWithKeyword":"When the user navigates to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":563,"gherkinStepLine":634,"keywordType":"Outcome","textWithKeyword":"Then the Contract Details grid should be visible","stepMatchArguments":[]},{"pwStepLine":564,"gherkinStepLine":635,"keywordType":"Action","textWithKeyword":"When the user enters a symbol in the Symbol/CUSIP filter","stepMatchArguments":[]},{"pwStepLine":565,"gherkinStepLine":636,"keywordType":"Outcome","textWithKeyword":"Then the live quote snapshot banner should be visible","stepMatchArguments":[]},{"pwStepLine":566,"gherkinStepLine":637,"keywordType":"Outcome","textWithKeyword":"And the pinned total row should recalculate to reflect only the filtered contracts","stepMatchArguments":[]},{"pwStepLine":567,"gherkinStepLine":638,"keywordType":"Action","textWithKeyword":"When the user expands the first contract row","stepMatchArguments":[]},{"pwStepLine":568,"gherkinStepLine":639,"keywordType":"Outcome","textWithKeyword":"Then the contract history detail panel should be visible","stepMatchArguments":[]},{"pwStepLine":569,"gherkinStepLine":640,"keywordType":"Action","textWithKeyword":"When the user opens the Trade panel","stepMatchArguments":[]},{"pwStepLine":570,"gherkinStepLine":641,"keywordType":"Action","textWithKeyword":"And the user selects the Borrow trade type","stepMatchArguments":[]},{"pwStepLine":571,"gherkinStepLine":642,"keywordType":"Action","textWithKeyword":"And the user fills in all required Trade fields","stepMatchArguments":[]},{"pwStepLine":572,"gherkinStepLine":643,"keywordType":"Action","textWithKeyword":"And the user submits the Trade form","stepMatchArguments":[]},{"pwStepLine":573,"gherkinStepLine":644,"keywordType":"Outcome","textWithKeyword":"Then a trade success confirmation should be displayed","stepMatchArguments":[]},{"pwStepLine":574,"gherkinStepLine":645,"keywordType":"Outcome","textWithKeyword":"And the Trade panel should close","stepMatchArguments":[]}]},
]; // bdd-data-end