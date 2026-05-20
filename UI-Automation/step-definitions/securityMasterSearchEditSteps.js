import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { test } from './fixtures.js';

const { Given, When, Then } = createBdd(test);

// NOTE: The following steps are already registered in other step files and are
// reused here automatically by playwright-bdd:
//   - "the user navigates to the Security Master page"  → addNewSecuritySteps.js
//   - "the user clicks the Save button"                  → addNewModalLayoutsSteps.js
//   - "a success confirmation should be displayed"       → addNewModalLayoutsSteps.js
//   - "an appropriate error or warning message …"        → addNewModalLayoutsSteps.js
//   - "the Save button should be disabled"               → addNewModalLayoutsSteps.js
//   - "the user enters {string} in the Close Price field"→ addNewSecuritySteps.js
//   - "the user enters {string} in the Volume field"     → addNewSecuritySteps.js
//   - "the user enters {string} in the Close Date field" → addNewSecuritySteps.js
//   - "a validation error should be displayed for …"     → addNewSecuritySteps.js

// ── Search ────────────────────────────────────────────────────────────────────

When('the user enters a valid Symbol in the search field', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.enterSearchValue('6019');
});

When('the user enters a valid CUSIP in the search field', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.enterSearchValue('037833100');
});

When('the user enters a partial Symbol in the search field', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.enterSearchValue('60');
});

When('the user enters a Symbol that does not exist', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.enterSearchValue('ZZZNONEXISTENT99');
});

When('the user enters only whitespace in the search field', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.enterSearchValue('   ');
});

When('the user enters {string} in the search field', async ({ addNewSecurityPage }, value) => {
  await addNewSecurityPage.enterSearchValue(value);
});

When('the user submits the search', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.clickSearchButtonOnly();
});

When('the user clears the search field', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.clearSearchField();
});

// ── Record selection ──────────────────────────────────────────────────────────

Given('the user searches for and selects a security record', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.searchAndSelectSecurity('6019');
});

Given('the user has performed a search with results', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.searchSecurity('6019');
  await addNewSecurityPage.verifySearchResultsVisible();
});

When('the user selects a security record from the grid', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.selectFirstResult();
});

When('the user selects a different security record from the Ag-Grid', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.selectDifferentResult();
});

// ── Grid assertions ───────────────────────────────────────────────────────────

Then('matching security records should be displayed in the Ag-Grid', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifySearchResultsVisible();
});

Then('security records matching the partial Symbol should be displayed in the Ag-Grid', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifySearchResultsVisible();
});

Then('an empty state or no results message should be displayed in the Ag-Grid', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyNoResultsDisplayed();
});

Then('the Ag-Grid should reset to its default state', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyPageIsLoaded();
});

Then('the security records should be displayed in an Ag-Grid component', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyPageIsLoaded();
});

Then('the Ag-Grid should be visible', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyPageIsLoaded();
});

Then('the Ag-Grid should refresh reflecting the updated security record', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyPageIsLoaded();
});

Then('no search should be executed or an appropriate message should be displayed', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyPageIsLoaded();
});

Then('the application should handle the special character search gracefully without errors', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyPageIsLoaded();
});

Then('the search, grid, and detail view should all be visible on a single screen', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyPageIsLoaded();
  await addNewSecurityPage.verifySearchResultsVisible();
});

// ── Detail view ───────────────────────────────────────────────────────────────

Then('the editable detail view should be visible', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyDetailViewVisible();
});

Then('the editable detail view should not be visible or should be empty', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyDetailViewNotVisible();
});

Then('the editable detail view should be populated', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyDetailViewVisible();
});

Then('the editable detail view should update with the new selection\'s data', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyDetailViewVisible();
});

Then('the detail view inputs should display with theme-aware styling', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyDetailViewVisible();
});

Then('the Symbol field should be populated with the selected security\'s value', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyFieldPopulated('Symbol');
});

Then('the CUSIP field should be populated with the selected security\'s value', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyFieldPopulated('CUSIP');
});

Then('the Description field should be populated with the selected security\'s value', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyFieldPopulated('Description');
});

Then('the Exchange field should be populated with the selected security\'s value', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyFieldPopulated('Exchange');
});

Then('the Volume field should be populated with the selected security\'s value', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyFieldPopulated('Volume');
});

Then('the Close Price field should be populated with the selected security\'s value', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyFieldPopulated('Close Price');
});

Then('the Close Date field should be populated with the selected security\'s value', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyFieldPopulated('Close Date');
});

Then('the Status field should be populated with the selected security\'s value', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyFieldPopulated('Status');
});

Then('the Symbol input should be editable', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyFieldEditable('Symbol');
});

Then('the CUSIP input should be editable', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyFieldEditable('CUSIP');
});

Then('the Description input should be editable', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyFieldEditable('Description');
});

Then('the Close Price input should be editable', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyFieldEditable('Close Price');
});

Then('the Close Date input should be editable', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyFieldEditable('Close Date');
});

// ── Edit fields ───────────────────────────────────────────────────────────────

When('the user modifies the Description field with a new value', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.modifyDescriptionField();
});

When('the user modifies the Close Price field with a valid value', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.modifyClosePriceField();
});

When('the user modifies a security field and saves', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.modifyDescriptionField();
  await addNewSecurityPage.submitNewSecurity();
});

When('the user modifies a field in the detail view', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.modifyFieldInDetailView();
});

When('the user cancels or navigates away without saving', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.cancelOrNavigateAway();
});

When('the user clears the Symbol field', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.clearField('Symbol');
});

Then('no contract update should be triggered unless the Update Contract toggle is enabled', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyUpdateContractToggleDisabledState();
});

Then('the security record should remain unchanged in the Ag-Grid', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyPageIsLoaded();
});

// ── Update Contract toggle ────────────────────────────────────────────────────

When('the user enables the Update Contract toggle switch', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.enableUpdateContractToggle();
});

When('the user disables the Update Contract toggle switch', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.disableUpdateContractToggle();
});

Then('the Update Contract toggle switch should be visible in the detail view', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyUpdateContractToggleVisible();
});

Then('the Update Contract toggle switch should be visible', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyUpdateContractToggleVisible();
});

Then('the Update Contract toggle switch should be in the disabled state', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyUpdateContractToggleDisabledState();
});

// ── Contract update sub-view ──────────────────────────────────────────────────

Then('the contract update sub-view should be visible', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyContractSubViewVisible();
});

Then('the contract update sub-view should no longer be visible', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyContractSubViewNotVisible();
});

Then('the Existing Symbol field should be displayed', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyExistingSymbolFieldVisible();
});

Then('the Existing CUSIP field should be displayed', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyExistingCusipFieldVisible();
});

Then('the Update action button should be displayed', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyUpdateButtonVisible();
});

Then('the Update action button should be disabled', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyUpdateButtonDisabled();
});

Then('the Update action button should be enabled', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyUpdateButtonEnabled();
});

// ── Contract update fields ────────────────────────────────────────────────────

When('the user enters a valid Existing Symbol', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.fillExistingSymbol('6019');
});

When('the user enters a valid Existing CUSIP', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.fillExistingCusip('037833100');
});

When('the user enters a non-existent Symbol in the Existing Symbol field', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.fillExistingSymbolNonExistent();
});

When('the user clicks the Update action button', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.clickUpdateButton();
});

Then('a success confirmation for the contract update should be displayed', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifySecurityAdded();
});
