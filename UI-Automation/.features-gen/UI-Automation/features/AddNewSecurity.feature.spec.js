// Generated from: UI-Automation\features\AddNewSecurity.feature
import { test } from "../../../step-definitions/fixtures.js";

test.describe('Security Master - Add New Security Functionality (SLL-187)', () => {

  test('User clicks Add Security button and the modal dialog opens', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-187'] }, async ({ Given, When, Then, And, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await And('the user clicks the Add New Security button', null, { addNewSecurityPage }); 
    await Then('the Add New Security modal should be visible', null, { addNewSecurityPage }); 
  });

  test('User fills all required fields and saves — new security record is created and Ag-Grid refreshes', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-187'] }, async ({ Given, When, Then, And, addNewModalLayoutsPage, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await And('the user clicks the Add New Security button', null, { addNewSecurityPage }); 
    await When('the user fills in all required security fields', null, { addNewSecurityPage }); 
    await And('the user clicks the Save button', null, { addNewModalLayoutsPage }); 
    await Then('a success confirmation should be displayed', null, { addNewModalLayoutsPage }); 
    await And('the Security Master Ag-Grid should refresh with the new security record', null, { addNewSecurityPage }); 
  });

  test('User fills all required and optional fields and saves successfully', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-187'] }, async ({ Given, When, Then, And, addNewModalLayoutsPage, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await And('the user clicks the Add New Security button', null, { addNewSecurityPage }); 
    await When('the user fills in all required security fields', null, { addNewSecurityPage }); 
    await And('the user fills in all optional security fields', null, { addNewSecurityPage }); 
    await And('the user clicks the Save button', null, { addNewModalLayoutsPage }); 
    await Then('a success confirmation should be displayed', null, { addNewModalLayoutsPage }); 
    await And('the Security Master Ag-Grid should refresh with the new security record', null, { addNewSecurityPage }); 
  });

  test('Authorized user can see and click the Add Security button on the toolbar', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-187'] }, async ({ Given, When, Then, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await Then('the Add New Security button should be visible and enabled on the toolbar', null, { addNewSecurityPage }); 
  });

  test('Read-only user cannot see or access the Add Security button', { tag: ['@smokeBDD', '@Regression', '@SLL-187'] }, async ({ Given, When, Then, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await Then('the Add New Security button should not be available for the read-only user', null, { addNewSecurityPage }); 
  });

  test('Add Security button is visible on the Security Master toolbar', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-187'] }, async ({ Given, When, Then, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await Then('the Add New Security button should be visible on the Security Master toolbar', null, { addNewSecurityPage }); 
  });

  test('Modal opens centered on screen with theme-aware styling applied', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-187'] }, async ({ Given, When, Then, And, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await When('the user clicks the Add New Security button', null, { addNewSecurityPage }); 
    await Then('the Add New Security modal should be visible', null, { addNewSecurityPage }); 
    await And('the modal should be centered with theme-aware styling', null, { addNewSecurityPage }); 
  });

  test('Modal contains all required fields — Symbol, CUSIP, Description, Close Price, Close Date', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-187'] }, async ({ Given, When, Then, And, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await When('the user clicks the Add New Security button', null, { addNewSecurityPage }); 
    await Then('the Symbol input field should be visible in the modal', null, { addNewSecurityPage }); 
    await And('the CUSIP input field should be visible in the modal', null, { addNewSecurityPage }); 
    await And('the Description input field should be visible in the modal', null, { addNewSecurityPage }); 
    await And('the Close Price input field should be visible in the modal', null, { addNewSecurityPage }); 
    await And('the Close Date input field should be visible in the modal', null, { addNewSecurityPage }); 
  });

  test('Modal contains optional fields — Exchange, Volume, Status', { tag: ['@smokeBDD', '@Regression', '@SLL-187'] }, async ({ Given, When, Then, And, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await When('the user clicks the Add New Security button', null, { addNewSecurityPage }); 
    await Then('the Exchange input field should be visible in the modal', null, { addNewSecurityPage }); 
    await And('the Volume input field should be visible in the modal', null, { addNewSecurityPage }); 
    await And('the Status input field should be visible in the modal', null, { addNewSecurityPage }); 
  });

  test('Save button is disabled when the form is empty', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-187'] }, async ({ Given, When, Then, And, addNewModalLayoutsPage, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await When('the user clicks the Add New Security button', null, { addNewSecurityPage }); 
    await Then('the Save button should be disabled', null, { addNewModalLayoutsPage }); 
  });

  test('Save button becomes enabled only when all required fields are populated', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-187'] }, async ({ Given, When, Then, And, addNewModalLayoutsPage, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await And('the user clicks the Add New Security button', null, { addNewSecurityPage }); 
    await When('the user fills in all required security fields', null, { addNewSecurityPage }); 
    await Then('the Save button should be enabled', null, { addNewModalLayoutsPage }); 
  });

  test('Ag-Grid refreshes after a new security is successfully created', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-187'] }, async ({ Given, When, Then, And, addNewModalLayoutsPage, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await And('the user clicks the Add New Security button', null, { addNewSecurityPage }); 
    await When('the user fills in all required security fields', null, { addNewSecurityPage }); 
    await And('the user clicks the Save button', null, { addNewModalLayoutsPage }); 
    await Then('the Security Master Ag-Grid should refresh with the new security record', null, { addNewSecurityPage }); 
  });

  test('Modal closes after successful save', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-187'] }, async ({ Given, When, Then, And, addNewModalLayoutsPage, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await And('the user clicks the Add New Security button', null, { addNewSecurityPage }); 
    await When('the user fills in all required security fields', null, { addNewSecurityPage }); 
    await And('the user clicks the Save button', null, { addNewModalLayoutsPage }); 
    await Then('the Add New Security modal should be closed', null, { addNewSecurityPage }); 
  });

  test('Save button remains disabled when Symbol is missing', { tag: ['@smokeBDD', '@Regression', '@SLL-187'] }, async ({ Given, When, Then, And, addNewModalLayoutsPage, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await And('the user clicks the Add New Security button', null, { addNewSecurityPage }); 
    await When('the user fills in all required security fields except Symbol', null, { addNewSecurityPage }); 
    await Then('the Save button should be disabled', null, { addNewModalLayoutsPage }); 
  });

  test('Save button remains disabled when CUSIP is missing', { tag: ['@smokeBDD', '@Regression', '@SLL-187'] }, async ({ Given, When, Then, And, addNewModalLayoutsPage, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await And('the user clicks the Add New Security button', null, { addNewSecurityPage }); 
    await When('the user fills in all required security fields except CUSIP', null, { addNewSecurityPage }); 
    await Then('the Save button should be disabled', null, { addNewModalLayoutsPage }); 
  });

  test('Save button remains disabled when Description is missing', { tag: ['@smokeBDD', '@Regression', '@SLL-187'] }, async ({ Given, When, Then, And, addNewModalLayoutsPage, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await And('the user clicks the Add New Security button', null, { addNewSecurityPage }); 
    await When('the user fills in all required security fields except Description', null, { addNewSecurityPage }); 
    await Then('the Save button should be disabled', null, { addNewModalLayoutsPage }); 
  });

  test('Save button remains disabled when Close Price is missing', { tag: ['@smokeBDD', '@Regression', '@SLL-187'] }, async ({ Given, When, Then, And, addNewModalLayoutsPage, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await And('the user clicks the Add New Security button', null, { addNewSecurityPage }); 
    await When('the user fills in all required security fields except Close Price', null, { addNewSecurityPage }); 
    await Then('the Save button should be disabled', null, { addNewModalLayoutsPage }); 
  });

  test('Save button remains disabled when Close Date is missing', { tag: ['@smokeBDD', '@Regression', '@SLL-187'] }, async ({ Given, When, Then, And, addNewModalLayoutsPage, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await And('the user clicks the Add New Security button', null, { addNewSecurityPage }); 
    await When('the user fills in all required security fields except Close Date', null, { addNewSecurityPage }); 
    await Then('the Save button should be disabled', null, { addNewModalLayoutsPage }); 
  });

  test('Non-numeric value entered in Close Price field — validation error shown', { tag: ['@smokeBDD', '@Regression', '@SLL-187'] }, async ({ Given, When, Then, And, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await And('the user clicks the Add New Security button', null, { addNewSecurityPage }); 
    await When('the user enters "abc" in the Close Price field', null, { addNewSecurityPage }); 
    await Then('a validation error should be displayed for the Close Price field', null, { addNewSecurityPage }); 
  });

  test('Non-numeric value entered in Volume field — validation error shown', { tag: ['@smokeBDD', '@Regression', '@SLL-187'] }, async ({ Given, When, Then, And, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await And('the user clicks the Add New Security button', null, { addNewSecurityPage }); 
    await When('the user enters "xyz" in the Volume field', null, { addNewSecurityPage }); 
    await Then('a validation error should be displayed for the Volume field', null, { addNewSecurityPage }); 
  });

  test('Negative value entered in Close Price — validation error shown', { tag: ['@smokeBDD', '@Regression', '@SLL-187'] }, async ({ Given, When, Then, And, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await And('the user clicks the Add New Security button', null, { addNewSecurityPage }); 
    await When('the user enters "-50.00" in the Close Price field', null, { addNewSecurityPage }); 
    await Then('a validation error should be displayed for the Close Price field', null, { addNewSecurityPage }); 
  });

  test('Negative value entered in Volume — validation error shown', { tag: ['@smokeBDD', '@Regression', '@SLL-187'] }, async ({ Given, When, Then, And, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await And('the user clicks the Add New Security button', null, { addNewSecurityPage }); 
    await When('the user enters "-100" in the Volume field', null, { addNewSecurityPage }); 
    await Then('a validation error should be displayed for the Volume field', null, { addNewSecurityPage }); 
  });

  test('Invalid date format entered in Close Date — validation error shown', { tag: ['@smokeBDD', '@Regression', '@SLL-187'] }, async ({ Given, When, Then, And, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await And('the user clicks the Add New Security button', null, { addNewSecurityPage }); 
    await When('the user enters "99/99/9999" in the Close Date field', null, { addNewSecurityPage }); 
    await Then('a validation error should be displayed for the Close Date field', null, { addNewSecurityPage }); 
  });

  test('Volume at minimum boundary zero is accepted', { tag: ['@smokeBDD', '@Regression', '@SLL-187'] }, async ({ Given, When, Then, And, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await And('the user clicks the Add New Security button', null, { addNewSecurityPage }); 
    await When('the user enters "0" in the Volume field', null, { addNewSecurityPage }); 
    await Then('no validation error should be displayed for the Volume field', null, { addNewSecurityPage }); 
  });

  test('Volume below minimum boundary negative is rejected', { tag: ['@smokeBDD', '@Regression', '@SLL-187'] }, async ({ Given, When, Then, And, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await And('the user clicks the Add New Security button', null, { addNewSecurityPage }); 
    await When('the user enters "-1" in the Volume field', null, { addNewSecurityPage }); 
    await Then('a validation error should be displayed for the Volume field', null, { addNewSecurityPage }); 
  });

  test('Very large Volume value is accepted or boundary error is shown', { tag: ['@smokeBDD', '@Regression', '@SLL-187'] }, async ({ Given, When, Then, And, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await And('the user clicks the Add New Security button', null, { addNewSecurityPage }); 
    await When('the user enters "999999999999" in the Volume field', null, { addNewSecurityPage }); 
    await Then('the Volume field should either accept the value or display a boundary validation error', null, { addNewSecurityPage }); 
  });

  test('Optional fields can be left blank and form saves successfully with only required fields', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-187'] }, async ({ Given, When, Then, And, addNewModalLayoutsPage, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await And('the user clicks the Add New Security button', null, { addNewSecurityPage }); 
    await When('the user fills in all required security fields', null, { addNewSecurityPage }); 
    await And('the user clicks the Save button', null, { addNewModalLayoutsPage }); 
    await Then('a success confirmation should be displayed', null, { addNewModalLayoutsPage }); 
  });

  test('User cancels the modal without saving — no record is created and Ag-Grid is unchanged', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-187'] }, async ({ Given, When, Then, And, addNewModalLayoutsPage, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await And('the user clicks the Add New Security button', null, { addNewSecurityPage }); 
    await When('the user closes the modal without saving', null, { addNewModalLayoutsPage }); 
    await Then('the Add New Security modal should be closed', null, { addNewSecurityPage }); 
    await And('the Security Master Ag-Grid should remain unchanged', null, { addNewSecurityPage }); 
  });

  test('Newly created security appears in the Ag-Grid after successful save', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-187'] }, async ({ Given, When, Then, And, addNewModalLayoutsPage, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await And('the user clicks the Add New Security button', null, { addNewSecurityPage }); 
    await When('the user fills in all required security fields', null, { addNewSecurityPage }); 
    await And('the user clicks the Save button', null, { addNewModalLayoutsPage }); 
    await Then('the Security Master Ag-Grid should refresh with the new security record', null, { addNewSecurityPage }); 
  });

  test('Symbol field with special characters is handled appropriately', { tag: ['@smokeBDD', '@Regression', '@SLL-187'] }, async ({ Given, When, Then, And, addNewModalLayoutsPage, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await And('the user clicks the Add New Security button', null, { addNewSecurityPage }); 
    await When('the user enters "!@#$%" in the Symbol field', null, { addNewSecurityPage }); 
    await And('the user fills in all other required security fields', null, { addNewSecurityPage }); 
    await And('the user clicks the Save button', null, { addNewModalLayoutsPage }); 
    await Then('the application should handle the special character input appropriately', null, { addNewSecurityPage }); 
  });

  test('CUSIP field at maximum allowed length is accepted', { tag: ['@smokeBDD', '@Regression', '@SLL-187'] }, async ({ Given, When, Then, And, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await And('the user clicks the Add New Security button', null, { addNewSecurityPage }); 
    await When('the user enters a CUSIP value at the maximum allowed length', null, { addNewSecurityPage }); 
    await Then('no validation error should be displayed for the CUSIP field', null, { addNewSecurityPage }); 
  });

  test('Description field with maximum allowed characters is accepted', { tag: ['@smokeBDD', '@Regression', '@SLL-187'] }, async ({ Given, When, Then, And, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await And('the user clicks the Add New Security button', null, { addNewSecurityPage }); 
    await When('the user enters a Description value at the maximum allowed length', null, { addNewSecurityPage }); 
    await Then('no validation error should be displayed for the Description field', null, { addNewSecurityPage }); 
  });

  test('User submits a duplicate Symbol — appropriate error or warning is shown', { tag: ['@smokeBDD', '@Regression', '@SLL-187'] }, async ({ Given, When, Then, And, addNewModalLayoutsPage, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await And('the user clicks the Add New Security button', null, { addNewSecurityPage }); 
    await When('the user fills in all required fields using an existing Symbol', null, { addNewSecurityPage }); 
    await And('the user clicks the Save button', null, { addNewModalLayoutsPage }); 
    await Then('an appropriate error or warning message should be displayed', null, { addNewModalLayoutsPage }); 
  });

  test.describe('Multiple combinations of security field values including valid, missing, and invalid inputs', () => {

    test('Example #1', { tag: ['@smokeBDD', '@Regression', '@SLL-187'] }, async ({ Given, When, Then, And, addNewSecurityPage, loginPage, page, testUsers }) => { 
      await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
      await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
      await And('the user clicks the Add New Security button', null, { addNewSecurityPage }); 
      await When('the user enters "AAPL" in the Symbol field', null, { addNewSecurityPage }); 
      await And('the user enters "037833100" in the CUSIP field', null, { addNewSecurityPage }); 
      await And('the user enters "150.00" in the Close Price field', null, { addNewSecurityPage }); 
      await Then('the expected form outcome should be "save enabled"', null, { addNewSecurityPage }); 
    });

    test('Example #2', { tag: ['@smokeBDD', '@Regression', '@SLL-187'] }, async ({ Given, When, Then, And, addNewSecurityPage, loginPage, page, testUsers }) => { 
      await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
      await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
      await And('the user clicks the Add New Security button', null, { addNewSecurityPage }); 
      await When('the user enters "MSFT" in the Symbol field', null, { addNewSecurityPage }); 
      await And('the user enters "594918104" in the CUSIP field', null, { addNewSecurityPage }); 
      await And('the user enters "280.50" in the Close Price field', null, { addNewSecurityPage }); 
      await Then('the expected form outcome should be "save enabled"', null, { addNewSecurityPage }); 
    });

    test('Example #3', { tag: ['@smokeBDD', '@Regression', '@SLL-187'] }, async ({ Given, When, Then, And, addNewSecurityPage, loginPage, page, testUsers }) => { 
      await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
      await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
      await And('the user clicks the Add New Security button', null, { addNewSecurityPage }); 
      await When('the user enters "TSLA" in the Symbol field', null, { addNewSecurityPage }); 
      await And('the user enters "88160R101" in the CUSIP field', null, { addNewSecurityPage }); 
      await And('the user enters "720.00" in the Close Price field', null, { addNewSecurityPage }); 
      await Then('the expected form outcome should be "save enabled"', null, { addNewSecurityPage }); 
    });

    test('Example #4', { tag: ['@smokeBDD', '@Regression', '@SLL-187'] }, async ({ Given, When, Then, And, addNewSecurityPage, loginPage, page, testUsers }) => { 
      await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
      await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
      await And('the user clicks the Add New Security button', null, { addNewSecurityPage }); 
      await When('the user enters "" in the Symbol field', null, { addNewSecurityPage }); 
      await And('the user enters "037833100" in the CUSIP field', null, { addNewSecurityPage }); 
      await And('the user enters "150.00" in the Close Price field', null, { addNewSecurityPage }); 
      await Then('the expected form outcome should be "save disabled"', null, { addNewSecurityPage }); 
    });

    test('Example #5', { tag: ['@smokeBDD', '@Regression', '@SLL-187'] }, async ({ Given, When, Then, And, addNewSecurityPage, loginPage, page, testUsers }) => { 
      await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
      await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
      await And('the user clicks the Add New Security button', null, { addNewSecurityPage }); 
      await When('the user enters "GOOG" in the Symbol field', null, { addNewSecurityPage }); 
      await And('the user enters "02079K305" in the CUSIP field', null, { addNewSecurityPage }); 
      await And('the user enters "abc" in the Close Price field', null, { addNewSecurityPage }); 
      await Then('the expected form outcome should be "validation error"', null, { addNewSecurityPage }); 
    });

  });

  test('Full lifecycle — login, navigate to Security Master, click Add Security, fill all fields, save, verify new record in Ag-Grid', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-187'] }, async ({ Given, When, Then, And, addNewModalLayoutsPage, addNewSecurityPage, contractSummaryPage, loginPage, page, testUsers }) => { 
    await Given('the user navigates to the application', null, { loginPage, page }); 
    await When('the user logs in with valid credentials', null, { loginPage, testUsers }); 
    await Then('the user should be redirected to the dashboard', null, { contractSummaryPage, page }); 
    await When('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await Then('the Add New Security button should be visible on the Security Master toolbar', null, { addNewSecurityPage }); 
    await When('the user clicks the Add New Security button', null, { addNewSecurityPage }); 
    await Then('the Add New Security modal should be visible', null, { addNewSecurityPage }); 
    await And('the Save button should be disabled', null, { addNewModalLayoutsPage }); 
    await When('the user fills in all required security fields', null, { addNewSecurityPage }); 
    await Then('the Save button should be enabled', null, { addNewModalLayoutsPage }); 
    await When('the user clicks the Save button', null, { addNewModalLayoutsPage }); 
    await Then('a success confirmation should be displayed', null, { addNewModalLayoutsPage }); 
    await And('the Add New Security modal should be closed', null, { addNewSecurityPage }); 
    await And('the Security Master Ag-Grid should refresh with the new security record', null, { addNewSecurityPage }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('UI-Automation\\features\\AddNewSecurity.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":10,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-187"],"steps":[{"pwStepLine":7,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"When the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":13,"keywordType":"Action","textWithKeyword":"And the user clicks the Add New Security button","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Then the Add New Security modal should be visible","stepMatchArguments":[]}]},
  {"pwTestLine":13,"pickleLine":18,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-187"],"steps":[{"pwStepLine":14,"gherkinStepLine":19,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":20,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":21,"keywordType":"Context","textWithKeyword":"And the user clicks the Add New Security button","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":22,"keywordType":"Action","textWithKeyword":"When the user fills in all required security fields","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":23,"keywordType":"Action","textWithKeyword":"And the user clicks the Save button","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"Then a success confirmation should be displayed","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"And the Security Master Ag-Grid should refresh with the new security record","stepMatchArguments":[]}]},
  {"pwTestLine":23,"pickleLine":29,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-187"],"steps":[{"pwStepLine":24,"gherkinStepLine":30,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":31,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":32,"keywordType":"Context","textWithKeyword":"And the user clicks the Add New Security button","stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":33,"keywordType":"Action","textWithKeyword":"When the user fills in all required security fields","stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":34,"keywordType":"Action","textWithKeyword":"And the user fills in all optional security fields","stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":35,"keywordType":"Action","textWithKeyword":"And the user clicks the Save button","stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":36,"keywordType":"Outcome","textWithKeyword":"Then a success confirmation should be displayed","stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":37,"keywordType":"Outcome","textWithKeyword":"And the Security Master Ag-Grid should refresh with the new security record","stepMatchArguments":[]}]},
  {"pwTestLine":34,"pickleLine":43,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-187"],"steps":[{"pwStepLine":35,"gherkinStepLine":44,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":36,"gherkinStepLine":45,"keywordType":"Action","textWithKeyword":"When the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":37,"gherkinStepLine":46,"keywordType":"Outcome","textWithKeyword":"Then the Add New Security button should be visible and enabled on the toolbar","stepMatchArguments":[]}]},
  {"pwTestLine":40,"pickleLine":50,"tags":["@smokeBDD","@Regression","@SLL-187"],"steps":[{"pwStepLine":41,"gherkinStepLine":51,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":42,"gherkinStepLine":52,"keywordType":"Action","textWithKeyword":"When the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":43,"gherkinStepLine":53,"keywordType":"Outcome","textWithKeyword":"Then the Add New Security button should not be available for the read-only user","stepMatchArguments":[]}]},
  {"pwTestLine":46,"pickleLine":59,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-187"],"steps":[{"pwStepLine":47,"gherkinStepLine":60,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":48,"gherkinStepLine":61,"keywordType":"Action","textWithKeyword":"When the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":49,"gherkinStepLine":62,"keywordType":"Outcome","textWithKeyword":"Then the Add New Security button should be visible on the Security Master toolbar","stepMatchArguments":[]}]},
  {"pwTestLine":52,"pickleLine":66,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-187"],"steps":[{"pwStepLine":53,"gherkinStepLine":67,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":54,"gherkinStepLine":68,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":55,"gherkinStepLine":69,"keywordType":"Action","textWithKeyword":"When the user clicks the Add New Security button","stepMatchArguments":[]},{"pwStepLine":56,"gherkinStepLine":70,"keywordType":"Outcome","textWithKeyword":"Then the Add New Security modal should be visible","stepMatchArguments":[]},{"pwStepLine":57,"gherkinStepLine":71,"keywordType":"Outcome","textWithKeyword":"And the modal should be centered with theme-aware styling","stepMatchArguments":[]}]},
  {"pwTestLine":60,"pickleLine":75,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-187"],"steps":[{"pwStepLine":61,"gherkinStepLine":76,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":62,"gherkinStepLine":77,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":63,"gherkinStepLine":78,"keywordType":"Action","textWithKeyword":"When the user clicks the Add New Security button","stepMatchArguments":[]},{"pwStepLine":64,"gherkinStepLine":79,"keywordType":"Outcome","textWithKeyword":"Then the Symbol input field should be visible in the modal","stepMatchArguments":[]},{"pwStepLine":65,"gherkinStepLine":80,"keywordType":"Outcome","textWithKeyword":"And the CUSIP input field should be visible in the modal","stepMatchArguments":[]},{"pwStepLine":66,"gherkinStepLine":81,"keywordType":"Outcome","textWithKeyword":"And the Description input field should be visible in the modal","stepMatchArguments":[]},{"pwStepLine":67,"gherkinStepLine":82,"keywordType":"Outcome","textWithKeyword":"And the Close Price input field should be visible in the modal","stepMatchArguments":[]},{"pwStepLine":68,"gherkinStepLine":83,"keywordType":"Outcome","textWithKeyword":"And the Close Date input field should be visible in the modal","stepMatchArguments":[]}]},
  {"pwTestLine":71,"pickleLine":87,"tags":["@smokeBDD","@Regression","@SLL-187"],"steps":[{"pwStepLine":72,"gherkinStepLine":88,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":73,"gherkinStepLine":89,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":74,"gherkinStepLine":90,"keywordType":"Action","textWithKeyword":"When the user clicks the Add New Security button","stepMatchArguments":[]},{"pwStepLine":75,"gherkinStepLine":91,"keywordType":"Outcome","textWithKeyword":"Then the Exchange input field should be visible in the modal","stepMatchArguments":[]},{"pwStepLine":76,"gherkinStepLine":92,"keywordType":"Outcome","textWithKeyword":"And the Volume input field should be visible in the modal","stepMatchArguments":[]},{"pwStepLine":77,"gherkinStepLine":93,"keywordType":"Outcome","textWithKeyword":"And the Status input field should be visible in the modal","stepMatchArguments":[]}]},
  {"pwTestLine":80,"pickleLine":97,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-187"],"steps":[{"pwStepLine":81,"gherkinStepLine":98,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":82,"gherkinStepLine":99,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":83,"gherkinStepLine":100,"keywordType":"Action","textWithKeyword":"When the user clicks the Add New Security button","stepMatchArguments":[]},{"pwStepLine":84,"gherkinStepLine":101,"keywordType":"Outcome","textWithKeyword":"Then the Save button should be disabled","stepMatchArguments":[]}]},
  {"pwTestLine":87,"pickleLine":105,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-187"],"steps":[{"pwStepLine":88,"gherkinStepLine":106,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":89,"gherkinStepLine":107,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":90,"gherkinStepLine":108,"keywordType":"Context","textWithKeyword":"And the user clicks the Add New Security button","stepMatchArguments":[]},{"pwStepLine":91,"gherkinStepLine":109,"keywordType":"Action","textWithKeyword":"When the user fills in all required security fields","stepMatchArguments":[]},{"pwStepLine":92,"gherkinStepLine":110,"keywordType":"Outcome","textWithKeyword":"Then the Save button should be enabled","stepMatchArguments":[]}]},
  {"pwTestLine":95,"pickleLine":114,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-187"],"steps":[{"pwStepLine":96,"gherkinStepLine":115,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":97,"gherkinStepLine":116,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":98,"gherkinStepLine":117,"keywordType":"Context","textWithKeyword":"And the user clicks the Add New Security button","stepMatchArguments":[]},{"pwStepLine":99,"gherkinStepLine":118,"keywordType":"Action","textWithKeyword":"When the user fills in all required security fields","stepMatchArguments":[]},{"pwStepLine":100,"gherkinStepLine":119,"keywordType":"Action","textWithKeyword":"And the user clicks the Save button","stepMatchArguments":[]},{"pwStepLine":101,"gherkinStepLine":120,"keywordType":"Outcome","textWithKeyword":"Then the Security Master Ag-Grid should refresh with the new security record","stepMatchArguments":[]}]},
  {"pwTestLine":104,"pickleLine":124,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-187"],"steps":[{"pwStepLine":105,"gherkinStepLine":125,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":106,"gherkinStepLine":126,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":107,"gherkinStepLine":127,"keywordType":"Context","textWithKeyword":"And the user clicks the Add New Security button","stepMatchArguments":[]},{"pwStepLine":108,"gherkinStepLine":128,"keywordType":"Action","textWithKeyword":"When the user fills in all required security fields","stepMatchArguments":[]},{"pwStepLine":109,"gherkinStepLine":129,"keywordType":"Action","textWithKeyword":"And the user clicks the Save button","stepMatchArguments":[]},{"pwStepLine":110,"gherkinStepLine":130,"keywordType":"Outcome","textWithKeyword":"Then the Add New Security modal should be closed","stepMatchArguments":[]}]},
  {"pwTestLine":113,"pickleLine":136,"tags":["@smokeBDD","@Regression","@SLL-187"],"steps":[{"pwStepLine":114,"gherkinStepLine":137,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":115,"gherkinStepLine":138,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":116,"gherkinStepLine":139,"keywordType":"Context","textWithKeyword":"And the user clicks the Add New Security button","stepMatchArguments":[]},{"pwStepLine":117,"gherkinStepLine":140,"keywordType":"Action","textWithKeyword":"When the user fills in all required security fields except Symbol","stepMatchArguments":[]},{"pwStepLine":118,"gherkinStepLine":141,"keywordType":"Outcome","textWithKeyword":"Then the Save button should be disabled","stepMatchArguments":[]}]},
  {"pwTestLine":121,"pickleLine":145,"tags":["@smokeBDD","@Regression","@SLL-187"],"steps":[{"pwStepLine":122,"gherkinStepLine":146,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":123,"gherkinStepLine":147,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":124,"gherkinStepLine":148,"keywordType":"Context","textWithKeyword":"And the user clicks the Add New Security button","stepMatchArguments":[]},{"pwStepLine":125,"gherkinStepLine":149,"keywordType":"Action","textWithKeyword":"When the user fills in all required security fields except CUSIP","stepMatchArguments":[]},{"pwStepLine":126,"gherkinStepLine":150,"keywordType":"Outcome","textWithKeyword":"Then the Save button should be disabled","stepMatchArguments":[]}]},
  {"pwTestLine":129,"pickleLine":154,"tags":["@smokeBDD","@Regression","@SLL-187"],"steps":[{"pwStepLine":130,"gherkinStepLine":155,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":131,"gherkinStepLine":156,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":132,"gherkinStepLine":157,"keywordType":"Context","textWithKeyword":"And the user clicks the Add New Security button","stepMatchArguments":[]},{"pwStepLine":133,"gherkinStepLine":158,"keywordType":"Action","textWithKeyword":"When the user fills in all required security fields except Description","stepMatchArguments":[]},{"pwStepLine":134,"gherkinStepLine":159,"keywordType":"Outcome","textWithKeyword":"Then the Save button should be disabled","stepMatchArguments":[]}]},
  {"pwTestLine":137,"pickleLine":163,"tags":["@smokeBDD","@Regression","@SLL-187"],"steps":[{"pwStepLine":138,"gherkinStepLine":164,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":139,"gherkinStepLine":165,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":140,"gherkinStepLine":166,"keywordType":"Context","textWithKeyword":"And the user clicks the Add New Security button","stepMatchArguments":[]},{"pwStepLine":141,"gherkinStepLine":167,"keywordType":"Action","textWithKeyword":"When the user fills in all required security fields except Close Price","stepMatchArguments":[]},{"pwStepLine":142,"gherkinStepLine":168,"keywordType":"Outcome","textWithKeyword":"Then the Save button should be disabled","stepMatchArguments":[]}]},
  {"pwTestLine":145,"pickleLine":172,"tags":["@smokeBDD","@Regression","@SLL-187"],"steps":[{"pwStepLine":146,"gherkinStepLine":173,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":147,"gherkinStepLine":174,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":148,"gherkinStepLine":175,"keywordType":"Context","textWithKeyword":"And the user clicks the Add New Security button","stepMatchArguments":[]},{"pwStepLine":149,"gherkinStepLine":176,"keywordType":"Action","textWithKeyword":"When the user fills in all required security fields except Close Date","stepMatchArguments":[]},{"pwStepLine":150,"gherkinStepLine":177,"keywordType":"Outcome","textWithKeyword":"Then the Save button should be disabled","stepMatchArguments":[]}]},
  {"pwTestLine":153,"pickleLine":183,"tags":["@smokeBDD","@Regression","@SLL-187"],"steps":[{"pwStepLine":154,"gherkinStepLine":184,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":155,"gherkinStepLine":185,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":156,"gherkinStepLine":186,"keywordType":"Context","textWithKeyword":"And the user clicks the Add New Security button","stepMatchArguments":[]},{"pwStepLine":157,"gherkinStepLine":187,"keywordType":"Action","textWithKeyword":"When the user enters \"abc\" in the Close Price field","stepMatchArguments":[{"group":{"start":16,"value":"\"abc\"","children":[{"start":17,"value":"abc","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":158,"gherkinStepLine":188,"keywordType":"Outcome","textWithKeyword":"Then a validation error should be displayed for the Close Price field","stepMatchArguments":[]}]},
  {"pwTestLine":161,"pickleLine":192,"tags":["@smokeBDD","@Regression","@SLL-187"],"steps":[{"pwStepLine":162,"gherkinStepLine":193,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":163,"gherkinStepLine":194,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":164,"gherkinStepLine":195,"keywordType":"Context","textWithKeyword":"And the user clicks the Add New Security button","stepMatchArguments":[]},{"pwStepLine":165,"gherkinStepLine":196,"keywordType":"Action","textWithKeyword":"When the user enters \"xyz\" in the Volume field","stepMatchArguments":[{"group":{"start":16,"value":"\"xyz\"","children":[{"start":17,"value":"xyz","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":166,"gherkinStepLine":197,"keywordType":"Outcome","textWithKeyword":"Then a validation error should be displayed for the Volume field","stepMatchArguments":[]}]},
  {"pwTestLine":169,"pickleLine":201,"tags":["@smokeBDD","@Regression","@SLL-187"],"steps":[{"pwStepLine":170,"gherkinStepLine":202,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":171,"gherkinStepLine":203,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":172,"gherkinStepLine":204,"keywordType":"Context","textWithKeyword":"And the user clicks the Add New Security button","stepMatchArguments":[]},{"pwStepLine":173,"gherkinStepLine":205,"keywordType":"Action","textWithKeyword":"When the user enters \"-50.00\" in the Close Price field","stepMatchArguments":[{"group":{"start":16,"value":"\"-50.00\"","children":[{"start":17,"value":"-50.00","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":174,"gherkinStepLine":206,"keywordType":"Outcome","textWithKeyword":"Then a validation error should be displayed for the Close Price field","stepMatchArguments":[]}]},
  {"pwTestLine":177,"pickleLine":210,"tags":["@smokeBDD","@Regression","@SLL-187"],"steps":[{"pwStepLine":178,"gherkinStepLine":211,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":179,"gherkinStepLine":212,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":180,"gherkinStepLine":213,"keywordType":"Context","textWithKeyword":"And the user clicks the Add New Security button","stepMatchArguments":[]},{"pwStepLine":181,"gherkinStepLine":214,"keywordType":"Action","textWithKeyword":"When the user enters \"-100\" in the Volume field","stepMatchArguments":[{"group":{"start":16,"value":"\"-100\"","children":[{"start":17,"value":"-100","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":182,"gherkinStepLine":215,"keywordType":"Outcome","textWithKeyword":"Then a validation error should be displayed for the Volume field","stepMatchArguments":[]}]},
  {"pwTestLine":185,"pickleLine":219,"tags":["@smokeBDD","@Regression","@SLL-187"],"steps":[{"pwStepLine":186,"gherkinStepLine":220,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":187,"gherkinStepLine":221,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":188,"gherkinStepLine":222,"keywordType":"Context","textWithKeyword":"And the user clicks the Add New Security button","stepMatchArguments":[]},{"pwStepLine":189,"gherkinStepLine":223,"keywordType":"Action","textWithKeyword":"When the user enters \"99/99/9999\" in the Close Date field","stepMatchArguments":[{"group":{"start":16,"value":"\"99/99/9999\"","children":[{"start":17,"value":"99/99/9999","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":190,"gherkinStepLine":224,"keywordType":"Outcome","textWithKeyword":"Then a validation error should be displayed for the Close Date field","stepMatchArguments":[]}]},
  {"pwTestLine":193,"pickleLine":230,"tags":["@smokeBDD","@Regression","@SLL-187"],"steps":[{"pwStepLine":194,"gherkinStepLine":231,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":195,"gherkinStepLine":232,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":196,"gherkinStepLine":233,"keywordType":"Context","textWithKeyword":"And the user clicks the Add New Security button","stepMatchArguments":[]},{"pwStepLine":197,"gherkinStepLine":234,"keywordType":"Action","textWithKeyword":"When the user enters \"0\" in the Volume field","stepMatchArguments":[{"group":{"start":16,"value":"\"0\"","children":[{"start":17,"value":"0","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":198,"gherkinStepLine":235,"keywordType":"Outcome","textWithKeyword":"Then no validation error should be displayed for the Volume field","stepMatchArguments":[]}]},
  {"pwTestLine":201,"pickleLine":239,"tags":["@smokeBDD","@Regression","@SLL-187"],"steps":[{"pwStepLine":202,"gherkinStepLine":240,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":203,"gherkinStepLine":241,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":204,"gherkinStepLine":242,"keywordType":"Context","textWithKeyword":"And the user clicks the Add New Security button","stepMatchArguments":[]},{"pwStepLine":205,"gherkinStepLine":243,"keywordType":"Action","textWithKeyword":"When the user enters \"-1\" in the Volume field","stepMatchArguments":[{"group":{"start":16,"value":"\"-1\"","children":[{"start":17,"value":"-1","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":206,"gherkinStepLine":244,"keywordType":"Outcome","textWithKeyword":"Then a validation error should be displayed for the Volume field","stepMatchArguments":[]}]},
  {"pwTestLine":209,"pickleLine":248,"tags":["@smokeBDD","@Regression","@SLL-187"],"steps":[{"pwStepLine":210,"gherkinStepLine":249,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":211,"gherkinStepLine":250,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":212,"gherkinStepLine":251,"keywordType":"Context","textWithKeyword":"And the user clicks the Add New Security button","stepMatchArguments":[]},{"pwStepLine":213,"gherkinStepLine":252,"keywordType":"Action","textWithKeyword":"When the user enters \"999999999999\" in the Volume field","stepMatchArguments":[{"group":{"start":16,"value":"\"999999999999\"","children":[{"start":17,"value":"999999999999","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":214,"gherkinStepLine":253,"keywordType":"Outcome","textWithKeyword":"Then the Volume field should either accept the value or display a boundary validation error","stepMatchArguments":[]}]},
  {"pwTestLine":217,"pickleLine":259,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-187"],"steps":[{"pwStepLine":218,"gherkinStepLine":260,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":219,"gherkinStepLine":261,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":220,"gherkinStepLine":262,"keywordType":"Context","textWithKeyword":"And the user clicks the Add New Security button","stepMatchArguments":[]},{"pwStepLine":221,"gherkinStepLine":263,"keywordType":"Action","textWithKeyword":"When the user fills in all required security fields","stepMatchArguments":[]},{"pwStepLine":222,"gherkinStepLine":264,"keywordType":"Action","textWithKeyword":"And the user clicks the Save button","stepMatchArguments":[]},{"pwStepLine":223,"gherkinStepLine":265,"keywordType":"Outcome","textWithKeyword":"Then a success confirmation should be displayed","stepMatchArguments":[]}]},
  {"pwTestLine":226,"pickleLine":269,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-187"],"steps":[{"pwStepLine":227,"gherkinStepLine":270,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":228,"gherkinStepLine":271,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":229,"gherkinStepLine":272,"keywordType":"Context","textWithKeyword":"And the user clicks the Add New Security button","stepMatchArguments":[]},{"pwStepLine":230,"gherkinStepLine":273,"keywordType":"Action","textWithKeyword":"When the user closes the modal without saving","stepMatchArguments":[]},{"pwStepLine":231,"gherkinStepLine":274,"keywordType":"Outcome","textWithKeyword":"Then the Add New Security modal should be closed","stepMatchArguments":[]},{"pwStepLine":232,"gherkinStepLine":275,"keywordType":"Outcome","textWithKeyword":"And the Security Master Ag-Grid should remain unchanged","stepMatchArguments":[]}]},
  {"pwTestLine":235,"pickleLine":279,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-187"],"steps":[{"pwStepLine":236,"gherkinStepLine":280,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":237,"gherkinStepLine":281,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":238,"gherkinStepLine":282,"keywordType":"Context","textWithKeyword":"And the user clicks the Add New Security button","stepMatchArguments":[]},{"pwStepLine":239,"gherkinStepLine":283,"keywordType":"Action","textWithKeyword":"When the user fills in all required security fields","stepMatchArguments":[]},{"pwStepLine":240,"gherkinStepLine":284,"keywordType":"Action","textWithKeyword":"And the user clicks the Save button","stepMatchArguments":[]},{"pwStepLine":241,"gherkinStepLine":285,"keywordType":"Outcome","textWithKeyword":"Then the Security Master Ag-Grid should refresh with the new security record","stepMatchArguments":[]}]},
  {"pwTestLine":244,"pickleLine":291,"tags":["@smokeBDD","@Regression","@SLL-187"],"steps":[{"pwStepLine":245,"gherkinStepLine":292,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":246,"gherkinStepLine":293,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":247,"gherkinStepLine":294,"keywordType":"Context","textWithKeyword":"And the user clicks the Add New Security button","stepMatchArguments":[]},{"pwStepLine":248,"gherkinStepLine":295,"keywordType":"Action","textWithKeyword":"When the user enters \"!@#$%\" in the Symbol field","stepMatchArguments":[{"group":{"start":16,"value":"\"!@#$%\"","children":[{"start":17,"value":"!@#$%","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":249,"gherkinStepLine":296,"keywordType":"Action","textWithKeyword":"And the user fills in all other required security fields","stepMatchArguments":[]},{"pwStepLine":250,"gherkinStepLine":297,"keywordType":"Action","textWithKeyword":"And the user clicks the Save button","stepMatchArguments":[]},{"pwStepLine":251,"gherkinStepLine":298,"keywordType":"Outcome","textWithKeyword":"Then the application should handle the special character input appropriately","stepMatchArguments":[]}]},
  {"pwTestLine":254,"pickleLine":302,"tags":["@smokeBDD","@Regression","@SLL-187"],"steps":[{"pwStepLine":255,"gherkinStepLine":303,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":256,"gherkinStepLine":304,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":257,"gherkinStepLine":305,"keywordType":"Context","textWithKeyword":"And the user clicks the Add New Security button","stepMatchArguments":[]},{"pwStepLine":258,"gherkinStepLine":306,"keywordType":"Action","textWithKeyword":"When the user enters a CUSIP value at the maximum allowed length","stepMatchArguments":[]},{"pwStepLine":259,"gherkinStepLine":307,"keywordType":"Outcome","textWithKeyword":"Then no validation error should be displayed for the CUSIP field","stepMatchArguments":[]}]},
  {"pwTestLine":262,"pickleLine":311,"tags":["@smokeBDD","@Regression","@SLL-187"],"steps":[{"pwStepLine":263,"gherkinStepLine":312,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":264,"gherkinStepLine":313,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":265,"gherkinStepLine":314,"keywordType":"Context","textWithKeyword":"And the user clicks the Add New Security button","stepMatchArguments":[]},{"pwStepLine":266,"gherkinStepLine":315,"keywordType":"Action","textWithKeyword":"When the user enters a Description value at the maximum allowed length","stepMatchArguments":[]},{"pwStepLine":267,"gherkinStepLine":316,"keywordType":"Outcome","textWithKeyword":"Then no validation error should be displayed for the Description field","stepMatchArguments":[]}]},
  {"pwTestLine":270,"pickleLine":320,"tags":["@smokeBDD","@Regression","@SLL-187"],"steps":[{"pwStepLine":271,"gherkinStepLine":321,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":272,"gherkinStepLine":322,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":273,"gherkinStepLine":323,"keywordType":"Context","textWithKeyword":"And the user clicks the Add New Security button","stepMatchArguments":[]},{"pwStepLine":274,"gherkinStepLine":324,"keywordType":"Action","textWithKeyword":"When the user fills in all required fields using an existing Symbol","stepMatchArguments":[]},{"pwStepLine":275,"gherkinStepLine":325,"keywordType":"Action","textWithKeyword":"And the user clicks the Save button","stepMatchArguments":[]},{"pwStepLine":276,"gherkinStepLine":326,"keywordType":"Outcome","textWithKeyword":"Then an appropriate error or warning message should be displayed","stepMatchArguments":[]}]},
  {"pwTestLine":281,"pickleLine":343,"tags":["@smokeBDD","@Regression","@SLL-187"],"steps":[{"pwStepLine":282,"gherkinStepLine":333,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":283,"gherkinStepLine":334,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":284,"gherkinStepLine":335,"keywordType":"Context","textWithKeyword":"And the user clicks the Add New Security button","stepMatchArguments":[]},{"pwStepLine":285,"gherkinStepLine":336,"keywordType":"Action","textWithKeyword":"When the user enters \"AAPL\" in the Symbol field","stepMatchArguments":[{"group":{"start":16,"value":"\"AAPL\"","children":[{"start":17,"value":"AAPL","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":286,"gherkinStepLine":337,"keywordType":"Action","textWithKeyword":"And the user enters \"037833100\" in the CUSIP field","stepMatchArguments":[{"group":{"start":16,"value":"\"037833100\"","children":[{"start":17,"value":"037833100","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":287,"gherkinStepLine":338,"keywordType":"Action","textWithKeyword":"And the user enters \"150.00\" in the Close Price field","stepMatchArguments":[{"group":{"start":16,"value":"\"150.00\"","children":[{"start":17,"value":"150.00","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":288,"gherkinStepLine":339,"keywordType":"Outcome","textWithKeyword":"Then the expected form outcome should be \"save enabled\"","stepMatchArguments":[{"group":{"start":36,"value":"\"save enabled\"","children":[{"start":37,"value":"save enabled","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":291,"pickleLine":344,"tags":["@smokeBDD","@Regression","@SLL-187"],"steps":[{"pwStepLine":292,"gherkinStepLine":333,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":293,"gherkinStepLine":334,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":294,"gherkinStepLine":335,"keywordType":"Context","textWithKeyword":"And the user clicks the Add New Security button","stepMatchArguments":[]},{"pwStepLine":295,"gherkinStepLine":336,"keywordType":"Action","textWithKeyword":"When the user enters \"MSFT\" in the Symbol field","stepMatchArguments":[{"group":{"start":16,"value":"\"MSFT\"","children":[{"start":17,"value":"MSFT","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":296,"gherkinStepLine":337,"keywordType":"Action","textWithKeyword":"And the user enters \"594918104\" in the CUSIP field","stepMatchArguments":[{"group":{"start":16,"value":"\"594918104\"","children":[{"start":17,"value":"594918104","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":297,"gherkinStepLine":338,"keywordType":"Action","textWithKeyword":"And the user enters \"280.50\" in the Close Price field","stepMatchArguments":[{"group":{"start":16,"value":"\"280.50\"","children":[{"start":17,"value":"280.50","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":298,"gherkinStepLine":339,"keywordType":"Outcome","textWithKeyword":"Then the expected form outcome should be \"save enabled\"","stepMatchArguments":[{"group":{"start":36,"value":"\"save enabled\"","children":[{"start":37,"value":"save enabled","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":301,"pickleLine":345,"tags":["@smokeBDD","@Regression","@SLL-187"],"steps":[{"pwStepLine":302,"gherkinStepLine":333,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":303,"gherkinStepLine":334,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":304,"gherkinStepLine":335,"keywordType":"Context","textWithKeyword":"And the user clicks the Add New Security button","stepMatchArguments":[]},{"pwStepLine":305,"gherkinStepLine":336,"keywordType":"Action","textWithKeyword":"When the user enters \"TSLA\" in the Symbol field","stepMatchArguments":[{"group":{"start":16,"value":"\"TSLA\"","children":[{"start":17,"value":"TSLA","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":306,"gherkinStepLine":337,"keywordType":"Action","textWithKeyword":"And the user enters \"88160R101\" in the CUSIP field","stepMatchArguments":[{"group":{"start":16,"value":"\"88160R101\"","children":[{"start":17,"value":"88160R101","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":307,"gherkinStepLine":338,"keywordType":"Action","textWithKeyword":"And the user enters \"720.00\" in the Close Price field","stepMatchArguments":[{"group":{"start":16,"value":"\"720.00\"","children":[{"start":17,"value":"720.00","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":308,"gherkinStepLine":339,"keywordType":"Outcome","textWithKeyword":"Then the expected form outcome should be \"save enabled\"","stepMatchArguments":[{"group":{"start":36,"value":"\"save enabled\"","children":[{"start":37,"value":"save enabled","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":311,"pickleLine":346,"tags":["@smokeBDD","@Regression","@SLL-187"],"steps":[{"pwStepLine":312,"gherkinStepLine":333,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":313,"gherkinStepLine":334,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":314,"gherkinStepLine":335,"keywordType":"Context","textWithKeyword":"And the user clicks the Add New Security button","stepMatchArguments":[]},{"pwStepLine":315,"gherkinStepLine":336,"keywordType":"Action","textWithKeyword":"When the user enters \"\" in the Symbol field","stepMatchArguments":[{"group":{"start":16,"value":"\"\"","children":[{"start":17,"value":"","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":316,"gherkinStepLine":337,"keywordType":"Action","textWithKeyword":"And the user enters \"037833100\" in the CUSIP field","stepMatchArguments":[{"group":{"start":16,"value":"\"037833100\"","children":[{"start":17,"value":"037833100","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":317,"gherkinStepLine":338,"keywordType":"Action","textWithKeyword":"And the user enters \"150.00\" in the Close Price field","stepMatchArguments":[{"group":{"start":16,"value":"\"150.00\"","children":[{"start":17,"value":"150.00","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":318,"gherkinStepLine":339,"keywordType":"Outcome","textWithKeyword":"Then the expected form outcome should be \"save disabled\"","stepMatchArguments":[{"group":{"start":36,"value":"\"save disabled\"","children":[{"start":37,"value":"save disabled","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":321,"pickleLine":347,"tags":["@smokeBDD","@Regression","@SLL-187"],"steps":[{"pwStepLine":322,"gherkinStepLine":333,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":323,"gherkinStepLine":334,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":324,"gherkinStepLine":335,"keywordType":"Context","textWithKeyword":"And the user clicks the Add New Security button","stepMatchArguments":[]},{"pwStepLine":325,"gherkinStepLine":336,"keywordType":"Action","textWithKeyword":"When the user enters \"GOOG\" in the Symbol field","stepMatchArguments":[{"group":{"start":16,"value":"\"GOOG\"","children":[{"start":17,"value":"GOOG","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":326,"gherkinStepLine":337,"keywordType":"Action","textWithKeyword":"And the user enters \"02079K305\" in the CUSIP field","stepMatchArguments":[{"group":{"start":16,"value":"\"02079K305\"","children":[{"start":17,"value":"02079K305","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":327,"gherkinStepLine":338,"keywordType":"Action","textWithKeyword":"And the user enters \"abc\" in the Close Price field","stepMatchArguments":[{"group":{"start":16,"value":"\"abc\"","children":[{"start":17,"value":"abc","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":328,"gherkinStepLine":339,"keywordType":"Outcome","textWithKeyword":"Then the expected form outcome should be \"validation error\"","stepMatchArguments":[{"group":{"start":36,"value":"\"validation error\"","children":[{"start":37,"value":"validation error","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":333,"pickleLine":353,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-187"],"steps":[{"pwStepLine":334,"gherkinStepLine":354,"keywordType":"Context","textWithKeyword":"Given the user navigates to the application","stepMatchArguments":[]},{"pwStepLine":335,"gherkinStepLine":355,"keywordType":"Action","textWithKeyword":"When the user logs in with valid credentials","stepMatchArguments":[]},{"pwStepLine":336,"gherkinStepLine":356,"keywordType":"Outcome","textWithKeyword":"Then the user should be redirected to the dashboard","stepMatchArguments":[]},{"pwStepLine":337,"gherkinStepLine":357,"keywordType":"Action","textWithKeyword":"When the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":338,"gherkinStepLine":358,"keywordType":"Outcome","textWithKeyword":"Then the Add New Security button should be visible on the Security Master toolbar","stepMatchArguments":[]},{"pwStepLine":339,"gherkinStepLine":359,"keywordType":"Action","textWithKeyword":"When the user clicks the Add New Security button","stepMatchArguments":[]},{"pwStepLine":340,"gherkinStepLine":360,"keywordType":"Outcome","textWithKeyword":"Then the Add New Security modal should be visible","stepMatchArguments":[]},{"pwStepLine":341,"gherkinStepLine":361,"keywordType":"Outcome","textWithKeyword":"And the Save button should be disabled","stepMatchArguments":[]},{"pwStepLine":342,"gherkinStepLine":362,"keywordType":"Action","textWithKeyword":"When the user fills in all required security fields","stepMatchArguments":[]},{"pwStepLine":343,"gherkinStepLine":363,"keywordType":"Outcome","textWithKeyword":"Then the Save button should be enabled","stepMatchArguments":[]},{"pwStepLine":344,"gherkinStepLine":364,"keywordType":"Action","textWithKeyword":"When the user clicks the Save button","stepMatchArguments":[]},{"pwStepLine":345,"gherkinStepLine":365,"keywordType":"Outcome","textWithKeyword":"Then a success confirmation should be displayed","stepMatchArguments":[]},{"pwStepLine":346,"gherkinStepLine":366,"keywordType":"Outcome","textWithKeyword":"And the Add New Security modal should be closed","stepMatchArguments":[]},{"pwStepLine":347,"gherkinStepLine":367,"keywordType":"Outcome","textWithKeyword":"And the Security Master Ag-Grid should refresh with the new security record","stepMatchArguments":[]}]},
]; // bdd-data-end