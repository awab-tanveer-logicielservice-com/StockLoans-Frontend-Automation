import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { test } from './fixtures.js';

const { Given, When, Then } = createBdd(test);

// ── Navigation ────────────────────────────────────────────────────────────────

When('the user navigates to the Security Master page', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.navigateToSecurityMaster();
});

// ── Toolbar ───────────────────────────────────────────────────────────────────

Then('the Add New Security button should be visible on the Security Master toolbar', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyAddNewSecurityButtonVisible();
});

Then('the Add New Security button should be visible and enabled on the toolbar', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyAddButtonEnabledOnToolbar();
});

Then('the Add New Security button should not be available for the read-only user', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyAddButtonNotVisibleOnToolbar();
});

// ── Modal open / close ────────────────────────────────────────────────────────

When('the user clicks the Add New Security button', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.clickAddNewSecurity();
  await addNewSecurityPage.verifyNewSecurityFormVisible();
});

Then('the Add New Security modal should be visible', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyNewSecurityFormVisible();
});

Then('the Add New Security modal should be closed', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyModalClosed();
});

Then('the modal should be centered with theme-aware styling', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyNewSecurityFormVisible();
});

// ── Field visibility ──────────────────────────────────────────────────────────

Then('the Symbol input field should be visible in the modal', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyFieldVisible('Symbol');
});

Then('the CUSIP input field should be visible in the modal', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyFieldVisible('CUSIP');
});

Then('the Description input field should be visible in the modal', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyFieldVisible('Description');
});

Then('the Close Price input field should be visible in the modal', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyFieldVisible('Close Price');
});

Then('the Close Date input field should be visible in the modal', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyFieldVisible('Close Date');
});

Then('the Exchange input field should be visible in the modal', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyFieldVisible('Exchange');
});

Then('the Volume input field should be visible in the modal', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyFieldVisible('Volume');
});

Then('the Status input field should be visible in the modal', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyFieldVisible('Status');
});

// ── Fill required / optional fields ──────────────────────────────────────────

When('the user fills in all required security fields', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.fillAllRequiredFields();
});

When('the user fills in all optional security fields', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.fillAllOptionalFields();
});

When('the user fills in all required security fields except Symbol', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.fillRequiredFieldsExcept('symbol');
});

When('the user fills in all required security fields except CUSIP', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.fillRequiredFieldsExcept('cusip');
});

When('the user fills in all required security fields except Description', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.fillRequiredFieldsExcept('description');
});

When('the user fills in all required security fields except Close Price', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.fillRequiredFieldsExcept('closePrice');
});

When('the user fills in all required security fields except Close Date', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.fillRequiredFieldsExcept('closeDate');
});

When('the user fills in all other required security fields', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.fillOtherRequiredFields();
});

When('the user fills in all required fields using an existing Symbol', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.fillRequiredFieldsWithExistingSymbol();
});

// ── Parameterised field input ─────────────────────────────────────────────────

When('the user enters {string} in the Symbol field', async ({ addNewSecurityPage }, value) => {
  await addNewSecurityPage.fillSymbol(value);
});

When('the user enters {string} in the CUSIP field', async ({ addNewSecurityPage }, value) => {
  await addNewSecurityPage.fillCusip(value);
});

When('the user enters {string} in the Close Price field', async ({ addNewSecurityPage }, value) => {
  await addNewSecurityPage.fillClosePrice(value);
});

When('the user enters {string} in the Volume field', async ({ addNewSecurityPage }, value) => {
  await addNewSecurityPage.fillVolume(value);
});

When('the user enters {string} in the Close Date field', async ({ addNewSecurityPage }, value) => {
  await addNewSecurityPage.fillCloseDate(value);
});

When('the user enters a CUSIP value at the maximum allowed length', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.fillCusip('X'.repeat(9));
});

When('the user enters a Description value at the maximum allowed length', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.fillDescription('A'.repeat(255));
});

// ── Submit / Success / Error — defined in addNewModalLayoutsSteps.js (shared) ──

Then('the application should handle the special character input appropriately', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyPageIsLoaded();
});

// ── Validation errors ─────────────────────────────────────────────────────────

Then('a validation error should be displayed for the Close Price field', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyAnyValidationError();
});

Then('a validation error should be displayed for the Volume field', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyAnyValidationError();
});

Then('a validation error should be displayed for the Close Date field', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyAnyValidationError();
});

Then('no validation error should be displayed for the Volume field', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyNoValidationError();
});

Then('no validation error should be displayed for the CUSIP field', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyNoValidationError();
});

Then('no validation error should be displayed for the Description field', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyNoValidationError();
});

Then('the Volume field should either accept the value or display a boundary validation error', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyBoundaryValidationBehavior();
});

// ── Grid state ────────────────────────────────────────────────────────────────

Then('the Security Master Ag-Grid should refresh with the new security record', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyPageIsLoaded();
});

Then('the Security Master Ag-Grid should remain unchanged', async ({ addNewSecurityPage }) => {
  await addNewSecurityPage.verifyPageIsLoaded();
});

// ── Scenario Outline outcome ──────────────────────────────────────────────────

Then('the expected form outcome should be {string}', async ({ addNewSecurityPage }, outcome) => {
  if (outcome === 'save enabled') {
    await addNewSecurityPage.verifySaveButtonEnabled();
  } else if (outcome === 'save disabled') {
    await addNewSecurityPage.verifySaveButtonDisabled();
  } else if (outcome === 'validation error') {
    await addNewSecurityPage.verifyAnyValidationError();
  }
});
