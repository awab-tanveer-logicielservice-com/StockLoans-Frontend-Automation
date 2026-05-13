// Generated from: UI-Automation\features\SecurityMasterSearchEdit.feature
import { test } from "../../../step-definitions/fixtures.js";

test.describe('Security Master - Search, Edit & Contract Updates (SLL-188)', () => {

  test('User searches for a security by Symbol and results appear in the grid', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-188'] }, async ({ Given, When, Then, And, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await And('the user enters a valid Symbol in the search field', null, { addNewSecurityPage }); 
    await And('the user submits the search', null, { addNewSecurityPage }); 
    await Then('matching security records should be displayed in the Ag-Grid', null, { addNewSecurityPage }); 
  });

  test('User selects a security record and the editable detail view is populated', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-188'] }, async ({ Given, Then, And, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await And('the user searches for and selects a security record', null, { addNewSecurityPage }); 
    await Then('the editable detail view should be visible', null, { addNewSecurityPage }); 
    await And('the Symbol field should be populated with the selected security\'s value', null, { addNewSecurityPage }); 
    await And('the CUSIP field should be populated with the selected security\'s value', null, { addNewSecurityPage }); 
    await And('the Description field should be populated with the selected security\'s value', null, { addNewSecurityPage }); 
    await And('the Exchange field should be populated with the selected security\'s value', null, { addNewSecurityPage }); 
    await And('the Volume field should be populated with the selected security\'s value', null, { addNewSecurityPage }); 
    await And('the Close Price field should be populated with the selected security\'s value', null, { addNewSecurityPage }); 
    await And('the Close Date field should be populated with the selected security\'s value', null, { addNewSecurityPage }); 
    await And('the Status field should be populated with the selected security\'s value', null, { addNewSecurityPage }); 
  });

  test('User edits security fields and saves successfully', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-188'] }, async ({ Given, When, Then, And, addNewModalLayoutsPage, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await And('the user searches for and selects a security record', null, { addNewSecurityPage }); 
    await When('the user modifies the Description field with a new value', null, { addNewSecurityPage }); 
    await And('the user clicks the Save button', null, { addNewModalLayoutsPage }); 
    await Then('a success confirmation should be displayed', null, { addNewModalLayoutsPage }); 
    await And('the Ag-Grid should refresh reflecting the updated security record', null, { addNewSecurityPage }); 
  });

  test('User enables the Update Contract toggle and the contract sub-view appears', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-188'] }, async ({ Given, When, Then, And, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await And('the user searches for and selects a security record', null, { addNewSecurityPage }); 
    await When('the user enables the Update Contract toggle switch', null, { addNewSecurityPage }); 
    await Then('the contract update sub-view should be visible', null, { addNewSecurityPage }); 
    await And('the Existing Symbol field should be displayed', null, { addNewSecurityPage }); 
    await And('the Existing CUSIP field should be displayed', null, { addNewSecurityPage }); 
    await And('the Update action button should be displayed', null, { addNewSecurityPage }); 
  });

  test('User fills contract update fields and clicks Update to commit changes', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-188'] }, async ({ Given, When, Then, And, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await And('the user searches for and selects a security record', null, { addNewSecurityPage }); 
    await And('the user enables the Update Contract toggle switch', null, { addNewSecurityPage }); 
    await When('the user enters a valid Existing Symbol', null, { addNewSecurityPage }); 
    await And('the user enters a valid Existing CUSIP', null, { addNewSecurityPage }); 
    await And('the user clicks the Update action button', null, { addNewSecurityPage }); 
    await Then('a success confirmation for the contract update should be displayed', null, { addNewSecurityPage }); 
  });

  test('User searches by CUSIP and matching records are returned', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-188'] }, async ({ Given, When, Then, And, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await And('the user enters a valid CUSIP in the search field', null, { addNewSecurityPage }); 
    await And('the user submits the search', null, { addNewSecurityPage }); 
    await Then('matching security records should be displayed in the Ag-Grid', null, { addNewSecurityPage }); 
  });

  test('Search returns no results for a non-existent Symbol', { tag: ['@smokeBDD', '@Regression', '@SLL-188'] }, async ({ Given, When, Then, And, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await And('the user enters a Symbol that does not exist', null, { addNewSecurityPage }); 
    await And('the user submits the search', null, { addNewSecurityPage }); 
    await Then('an empty state or no results message should be displayed in the Ag-Grid', null, { addNewSecurityPage }); 
  });

  test('Search field is cleared and grid resets to default state', { tag: ['@smokeBDD', '@Regression', '@SLL-188'] }, async ({ Given, When, Then, And, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await And('the user has performed a search with results', null, { addNewSecurityPage }); 
    await When('the user clears the search field', null, { addNewSecurityPage }); 
    await Then('the Ag-Grid should reset to its default state', null, { addNewSecurityPage }); 
  });

  test('Search with partial Symbol returns relevant results', { tag: ['@smokeBDD', '@Regression', '@SLL-188'] }, async ({ Given, When, Then, And, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await And('the user enters a partial Symbol in the search field', null, { addNewSecurityPage }); 
    await And('the user submits the search', null, { addNewSecurityPage }); 
    await Then('security records matching the partial Symbol should be displayed in the Ag-Grid', null, { addNewSecurityPage }); 
  });

  test('All editable fields are enabled when a security is selected', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-188'] }, async ({ Given, When, Then, And, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await When('the user searches for and selects a security record', null, { addNewSecurityPage }); 
    await Then('the Symbol input should be editable', null, { addNewSecurityPage }); 
    await And('the CUSIP input should be editable', null, { addNewSecurityPage }); 
    await And('the Description input should be editable', null, { addNewSecurityPage }); 
    await And('the Close Price input should be editable', null, { addNewSecurityPage }); 
    await And('the Close Date input should be editable', null, { addNewSecurityPage }); 
  });

  test('Detail view is empty or hidden before a security is selected', { tag: ['@smokeBDD', '@Regression', '@SLL-188'] }, async ({ Given, When, Then, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await Then('the editable detail view should not be visible or should be empty', null, { addNewSecurityPage }); 
  });

  test('Selecting a different security in the grid updates the detail view', { tag: ['@smokeBDD', '@Regression', '@SLL-188'] }, async ({ Given, When, Then, And, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await And('the user searches for and selects a security record', null, { addNewSecurityPage }); 
    await When('the user selects a different security record from the Ag-Grid', null, { addNewSecurityPage }); 
    await Then('the editable detail view should update with the new selection\'s data', null, { addNewSecurityPage }); 
  });

  test('Update Contract toggle is visible in the detail view', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-188'] }, async ({ Given, When, Then, And, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await When('the user searches for and selects a security record', null, { addNewSecurityPage }); 
    await Then('the Update Contract toggle switch should be visible in the detail view', null, { addNewSecurityPage }); 
  });

  test('Update Contract toggle is disabled by default', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-188'] }, async ({ Given, When, Then, And, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await When('the user searches for and selects a security record', null, { addNewSecurityPage }); 
    await Then('the Update Contract toggle switch should be in the disabled state', null, { addNewSecurityPage }); 
  });

  test('Disabling the Update Contract toggle hides the contract sub-view', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-188'] }, async ({ Given, When, Then, And, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await And('the user searches for and selects a security record', null, { addNewSecurityPage }); 
    await And('the user enables the Update Contract toggle switch', null, { addNewSecurityPage }); 
    await When('the user disables the Update Contract toggle switch', null, { addNewSecurityPage }); 
    await Then('the contract update sub-view should no longer be visible', null, { addNewSecurityPage }); 
  });

  test('Update button is disabled when Existing Symbol and CUSIP are empty', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-188'] }, async ({ Given, When, Then, And, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await And('the user searches for and selects a security record', null, { addNewSecurityPage }); 
    await When('the user enables the Update Contract toggle switch', null, { addNewSecurityPage }); 
    await Then('the Update action button should be disabled', null, { addNewSecurityPage }); 
  });

  test('Update button becomes enabled when both Existing Symbol and CUSIP are filled', { tag: ['@smokeBDD', '@Regression', '@SLL-188'] }, async ({ Given, When, Then, And, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await And('the user searches for and selects a security record', null, { addNewSecurityPage }); 
    await And('the user enables the Update Contract toggle switch', null, { addNewSecurityPage }); 
    await When('the user enters a valid Existing Symbol', null, { addNewSecurityPage }); 
    await And('the user enters a valid Existing CUSIP', null, { addNewSecurityPage }); 
    await Then('the Update action button should be enabled', null, { addNewSecurityPage }); 
  });

  test('Update button remains disabled when only Existing Symbol is filled', { tag: ['@smokeBDD', '@Regression', '@SLL-188'] }, async ({ Given, When, Then, And, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await And('the user searches for and selects a security record', null, { addNewSecurityPage }); 
    await And('the user enables the Update Contract toggle switch', null, { addNewSecurityPage }); 
    await When('the user enters a valid Existing Symbol', null, { addNewSecurityPage }); 
    await Then('the Update action button should be disabled', null, { addNewSecurityPage }); 
  });

  test('Update button remains disabled when only Existing CUSIP is filled', { tag: ['@smokeBDD', '@Regression', '@SLL-188'] }, async ({ Given, When, Then, And, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await And('the user searches for and selects a security record', null, { addNewSecurityPage }); 
    await And('the user enables the Update Contract toggle switch', null, { addNewSecurityPage }); 
    await When('the user enters a valid Existing CUSIP', null, { addNewSecurityPage }); 
    await Then('the Update action button should be disabled', null, { addNewSecurityPage }); 
  });

  test('Non-numeric value in Close Price field shows validation error', { tag: ['@smokeBDD', '@Regression', '@SLL-188'] }, async ({ Given, When, Then, And, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await And('the user searches for and selects a security record', null, { addNewSecurityPage }); 
    await When('the user enters "abc" in the Close Price field', null, { addNewSecurityPage }); 
    await Then('a validation error should be displayed for the Close Price field', null, { addNewSecurityPage }); 
  });

  test('Negative value in Close Price field shows validation error', { tag: ['@smokeBDD', '@Regression', '@SLL-188'] }, async ({ Given, When, Then, And, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await And('the user searches for and selects a security record', null, { addNewSecurityPage }); 
    await When('the user enters "-50.00" in the Close Price field', null, { addNewSecurityPage }); 
    await Then('a validation error should be displayed for the Close Price field', null, { addNewSecurityPage }); 
  });

  test('Invalid date format in Close Date field shows validation error', { tag: ['@smokeBDD', '@Regression', '@SLL-188'] }, async ({ Given, When, Then, And, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await And('the user searches for and selects a security record', null, { addNewSecurityPage }); 
    await When('the user enters "99/99/9999" in the Close Date field', null, { addNewSecurityPage }); 
    await Then('a validation error should be displayed for the Close Date field', null, { addNewSecurityPage }); 
  });

  test('Clearing a required field disables the Save button', { tag: ['@smokeBDD', '@Regression', '@SLL-188'] }, async ({ Given, When, Then, And, addNewModalLayoutsPage, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await And('the user searches for and selects a security record', null, { addNewSecurityPage }); 
    await When('the user clears the Symbol field', null, { addNewSecurityPage }); 
    await Then('the Save button should be disabled', null, { addNewModalLayoutsPage }); 
  });

  test('Security Master page uses Ag-Grid for search results display', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-188'] }, async ({ Given, When, Then, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await Then('the security records should be displayed in an Ag-Grid component', null, { addNewSecurityPage }); 
  });

  test('Detail view inputs are theme-aware and match SLS V2 styling', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-188'] }, async ({ Given, When, Then, And, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await When('the user searches for and selects a security record', null, { addNewSecurityPage }); 
    await Then('the detail view inputs should display with theme-aware styling', null, { addNewSecurityPage }); 
  });

  test('Layout is presented as a single-screen view with no page navigation required', { tag: ['@smokeBDD', '@Regression', '@SLL-188'] }, async ({ Given, When, Then, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await Then('the search, grid, and detail view should all be visible on a single screen', null, { addNewSecurityPage }); 
  });

  test('Editing a security does not automatically trigger a contract update', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-188'] }, async ({ Given, When, Then, And, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await And('the user searches for and selects a security record', null, { addNewSecurityPage }); 
    await When('the user modifies a security field and saves', null, { addNewSecurityPage }); 
    await Then('no contract update should be triggered unless the Update Contract toggle is enabled', null, { addNewSecurityPage }); 
  });

  test('Contract update with a non-existent Existing Symbol shows an appropriate error', { tag: ['@smokeBDD', '@Regression', '@SLL-188'] }, async ({ Given, When, Then, And, addNewModalLayoutsPage, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await And('the user searches for and selects a security record', null, { addNewSecurityPage }); 
    await And('the user enables the Update Contract toggle switch', null, { addNewSecurityPage }); 
    await When('the user enters a non-existent Symbol in the Existing Symbol field', null, { addNewSecurityPage }); 
    await And('the user enters a valid Existing CUSIP', null, { addNewSecurityPage }); 
    await And('the user clicks the Update action button', null, { addNewSecurityPage }); 
    await Then('an appropriate error or warning message should be displayed', null, { addNewModalLayoutsPage }); 
  });

  test('Cancelling the edit does not persist changes to the security record', { tag: ['@smokeBDD', '@Regression', '@SLL-188'] }, async ({ Given, When, Then, And, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await And('the user searches for and selects a security record', null, { addNewSecurityPage }); 
    await When('the user modifies a field in the detail view', null, { addNewSecurityPage }); 
    await And('the user cancels or navigates away without saving', null, { addNewSecurityPage }); 
    await Then('the security record should remain unchanged in the Ag-Grid', null, { addNewSecurityPage }); 
  });

  test('Search field with only whitespace does not execute a search', { tag: ['@smokeBDD', '@Regression', '@SLL-188'] }, async ({ Given, When, Then, And, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await And('the user enters only whitespace in the search field', null, { addNewSecurityPage }); 
    await And('the user submits the search', null, { addNewSecurityPage }); 
    await Then('no search should be executed or an appropriate message should be displayed', null, { addNewSecurityPage }); 
  });

  test('Search with special characters is handled gracefully', { tag: ['@smokeBDD', '@Regression', '@SLL-188'] }, async ({ Given, When, Then, And, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await And('the user enters "!@#$%" in the search field', null, { addNewSecurityPage }); 
    await And('the user submits the search', null, { addNewSecurityPage }); 
    await Then('the application should handle the special character search gracefully without errors', null, { addNewSecurityPage }); 
  });

  test('Volume field in detail view rejects negative values', { tag: ['@smokeBDD', '@Regression', '@SLL-188'] }, async ({ Given, When, Then, And, addNewSecurityPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await And('the user searches for and selects a security record', null, { addNewSecurityPage }); 
    await When('the user enters "-1" in the Volume field', null, { addNewSecurityPage }); 
    await Then('a validation error should be displayed for the Volume field', null, { addNewSecurityPage }); 
  });

  test('Full lifecycle — search security, edit fields, enable contract update, commit update, verify grid', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-188'] }, async ({ Given, When, Then, And, addNewSecurityPage, contractSummaryPage, loginPage, page, testUsers }) => { 
    await Given('the user navigates to the application', null, { loginPage, page }); 
    await When('the user logs in with valid credentials', null, { loginPage, testUsers }); 
    await Then('the user should be redirected to the dashboard', null, { contractSummaryPage, page }); 
    await When('the user navigates to the Security Master page', null, { addNewSecurityPage }); 
    await Then('the Ag-Grid should be visible', null, { addNewSecurityPage }); 
    await When('the user enters a valid Symbol in the search field', null, { addNewSecurityPage }); 
    await And('the user submits the search', null, { addNewSecurityPage }); 
    await Then('matching security records should be displayed in the Ag-Grid', null, { addNewSecurityPage }); 
    await When('the user selects a security record from the grid', null, { addNewSecurityPage }); 
    await Then('the editable detail view should be populated', null, { addNewSecurityPage }); 
    await And('the Update Contract toggle switch should be visible', null, { addNewSecurityPage }); 
    await When('the user modifies the Close Price field with a valid value', null, { addNewSecurityPage }); 
    await And('the user enables the Update Contract toggle switch', null, { addNewSecurityPage }); 
    await And('the user enters a valid Existing Symbol', null, { addNewSecurityPage }); 
    await And('the user enters a valid Existing CUSIP', null, { addNewSecurityPage }); 
    await And('the user clicks the Update action button', null, { addNewSecurityPage }); 
    await Then('a success confirmation for the contract update should be displayed', null, { addNewSecurityPage }); 
    await And('the Ag-Grid should refresh reflecting the updated security record', null, { addNewSecurityPage }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('UI-Automation\\features\\SecurityMasterSearchEdit.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":10,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-188"],"steps":[{"pwStepLine":7,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"When the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":13,"keywordType":"Action","textWithKeyword":"And the user enters a valid Symbol in the search field","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":14,"keywordType":"Action","textWithKeyword":"And the user submits the search","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Then matching security records should be displayed in the Ag-Grid","stepMatchArguments":[]}]},
  {"pwTestLine":14,"pickleLine":19,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-188"],"steps":[{"pwStepLine":15,"gherkinStepLine":20,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":21,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":22,"keywordType":"Context","textWithKeyword":"And the user searches for and selects a security record","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"Then the editable detail view should be visible","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"And the Symbol field should be populated with the selected security's value","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"And the CUSIP field should be populated with the selected security's value","stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"And the Description field should be populated with the selected security's value","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":27,"keywordType":"Outcome","textWithKeyword":"And the Exchange field should be populated with the selected security's value","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":28,"keywordType":"Outcome","textWithKeyword":"And the Volume field should be populated with the selected security's value","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"And the Close Price field should be populated with the selected security's value","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"And the Close Date field should be populated with the selected security's value","stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":31,"keywordType":"Outcome","textWithKeyword":"And the Status field should be populated with the selected security's value","stepMatchArguments":[]}]},
  {"pwTestLine":29,"pickleLine":35,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-188"],"steps":[{"pwStepLine":30,"gherkinStepLine":36,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":37,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":38,"keywordType":"Context","textWithKeyword":"And the user searches for and selects a security record","stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":39,"keywordType":"Action","textWithKeyword":"When the user modifies the Description field with a new value","stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":40,"keywordType":"Action","textWithKeyword":"And the user clicks the Save button","stepMatchArguments":[]},{"pwStepLine":35,"gherkinStepLine":41,"keywordType":"Outcome","textWithKeyword":"Then a success confirmation should be displayed","stepMatchArguments":[]},{"pwStepLine":36,"gherkinStepLine":42,"keywordType":"Outcome","textWithKeyword":"And the Ag-Grid should refresh reflecting the updated security record","stepMatchArguments":[]}]},
  {"pwTestLine":39,"pickleLine":46,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-188"],"steps":[{"pwStepLine":40,"gherkinStepLine":47,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":41,"gherkinStepLine":48,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":42,"gherkinStepLine":49,"keywordType":"Context","textWithKeyword":"And the user searches for and selects a security record","stepMatchArguments":[]},{"pwStepLine":43,"gherkinStepLine":50,"keywordType":"Action","textWithKeyword":"When the user enables the Update Contract toggle switch","stepMatchArguments":[]},{"pwStepLine":44,"gherkinStepLine":51,"keywordType":"Outcome","textWithKeyword":"Then the contract update sub-view should be visible","stepMatchArguments":[]},{"pwStepLine":45,"gherkinStepLine":52,"keywordType":"Outcome","textWithKeyword":"And the Existing Symbol field should be displayed","stepMatchArguments":[]},{"pwStepLine":46,"gherkinStepLine":53,"keywordType":"Outcome","textWithKeyword":"And the Existing CUSIP field should be displayed","stepMatchArguments":[]},{"pwStepLine":47,"gherkinStepLine":54,"keywordType":"Outcome","textWithKeyword":"And the Update action button should be displayed","stepMatchArguments":[]}]},
  {"pwTestLine":50,"pickleLine":58,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-188"],"steps":[{"pwStepLine":51,"gherkinStepLine":59,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":52,"gherkinStepLine":60,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":53,"gherkinStepLine":61,"keywordType":"Context","textWithKeyword":"And the user searches for and selects a security record","stepMatchArguments":[]},{"pwStepLine":54,"gherkinStepLine":62,"keywordType":"Context","textWithKeyword":"And the user enables the Update Contract toggle switch","stepMatchArguments":[]},{"pwStepLine":55,"gherkinStepLine":63,"keywordType":"Action","textWithKeyword":"When the user enters a valid Existing Symbol","stepMatchArguments":[]},{"pwStepLine":56,"gherkinStepLine":64,"keywordType":"Action","textWithKeyword":"And the user enters a valid Existing CUSIP","stepMatchArguments":[]},{"pwStepLine":57,"gherkinStepLine":65,"keywordType":"Action","textWithKeyword":"And the user clicks the Update action button","stepMatchArguments":[]},{"pwStepLine":58,"gherkinStepLine":66,"keywordType":"Outcome","textWithKeyword":"Then a success confirmation for the contract update should be displayed","stepMatchArguments":[]}]},
  {"pwTestLine":61,"pickleLine":72,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-188"],"steps":[{"pwStepLine":62,"gherkinStepLine":73,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":63,"gherkinStepLine":74,"keywordType":"Action","textWithKeyword":"When the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":64,"gherkinStepLine":75,"keywordType":"Action","textWithKeyword":"And the user enters a valid CUSIP in the search field","stepMatchArguments":[]},{"pwStepLine":65,"gherkinStepLine":76,"keywordType":"Action","textWithKeyword":"And the user submits the search","stepMatchArguments":[]},{"pwStepLine":66,"gherkinStepLine":77,"keywordType":"Outcome","textWithKeyword":"Then matching security records should be displayed in the Ag-Grid","stepMatchArguments":[]}]},
  {"pwTestLine":69,"pickleLine":81,"tags":["@smokeBDD","@Regression","@SLL-188"],"steps":[{"pwStepLine":70,"gherkinStepLine":82,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":71,"gherkinStepLine":83,"keywordType":"Action","textWithKeyword":"When the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":72,"gherkinStepLine":84,"keywordType":"Action","textWithKeyword":"And the user enters a Symbol that does not exist","stepMatchArguments":[]},{"pwStepLine":73,"gherkinStepLine":85,"keywordType":"Action","textWithKeyword":"And the user submits the search","stepMatchArguments":[]},{"pwStepLine":74,"gherkinStepLine":86,"keywordType":"Outcome","textWithKeyword":"Then an empty state or no results message should be displayed in the Ag-Grid","stepMatchArguments":[]}]},
  {"pwTestLine":77,"pickleLine":90,"tags":["@smokeBDD","@Regression","@SLL-188"],"steps":[{"pwStepLine":78,"gherkinStepLine":91,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":79,"gherkinStepLine":92,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":80,"gherkinStepLine":93,"keywordType":"Context","textWithKeyword":"And the user has performed a search with results","stepMatchArguments":[]},{"pwStepLine":81,"gherkinStepLine":94,"keywordType":"Action","textWithKeyword":"When the user clears the search field","stepMatchArguments":[]},{"pwStepLine":82,"gherkinStepLine":95,"keywordType":"Outcome","textWithKeyword":"Then the Ag-Grid should reset to its default state","stepMatchArguments":[]}]},
  {"pwTestLine":85,"pickleLine":99,"tags":["@smokeBDD","@Regression","@SLL-188"],"steps":[{"pwStepLine":86,"gherkinStepLine":100,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":87,"gherkinStepLine":101,"keywordType":"Action","textWithKeyword":"When the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":88,"gherkinStepLine":102,"keywordType":"Action","textWithKeyword":"And the user enters a partial Symbol in the search field","stepMatchArguments":[]},{"pwStepLine":89,"gherkinStepLine":103,"keywordType":"Action","textWithKeyword":"And the user submits the search","stepMatchArguments":[]},{"pwStepLine":90,"gherkinStepLine":104,"keywordType":"Outcome","textWithKeyword":"Then security records matching the partial Symbol should be displayed in the Ag-Grid","stepMatchArguments":[]}]},
  {"pwTestLine":93,"pickleLine":110,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-188"],"steps":[{"pwStepLine":94,"gherkinStepLine":111,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":95,"gherkinStepLine":112,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":96,"gherkinStepLine":113,"keywordType":"Action","textWithKeyword":"When the user searches for and selects a security record","stepMatchArguments":[]},{"pwStepLine":97,"gherkinStepLine":114,"keywordType":"Outcome","textWithKeyword":"Then the Symbol input should be editable","stepMatchArguments":[]},{"pwStepLine":98,"gherkinStepLine":115,"keywordType":"Outcome","textWithKeyword":"And the CUSIP input should be editable","stepMatchArguments":[]},{"pwStepLine":99,"gherkinStepLine":116,"keywordType":"Outcome","textWithKeyword":"And the Description input should be editable","stepMatchArguments":[]},{"pwStepLine":100,"gherkinStepLine":117,"keywordType":"Outcome","textWithKeyword":"And the Close Price input should be editable","stepMatchArguments":[]},{"pwStepLine":101,"gherkinStepLine":118,"keywordType":"Outcome","textWithKeyword":"And the Close Date input should be editable","stepMatchArguments":[]}]},
  {"pwTestLine":104,"pickleLine":122,"tags":["@smokeBDD","@Regression","@SLL-188"],"steps":[{"pwStepLine":105,"gherkinStepLine":123,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":106,"gherkinStepLine":124,"keywordType":"Action","textWithKeyword":"When the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":107,"gherkinStepLine":125,"keywordType":"Outcome","textWithKeyword":"Then the editable detail view should not be visible or should be empty","stepMatchArguments":[]}]},
  {"pwTestLine":110,"pickleLine":129,"tags":["@smokeBDD","@Regression","@SLL-188"],"steps":[{"pwStepLine":111,"gherkinStepLine":130,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":112,"gherkinStepLine":131,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":113,"gherkinStepLine":132,"keywordType":"Context","textWithKeyword":"And the user searches for and selects a security record","stepMatchArguments":[]},{"pwStepLine":114,"gherkinStepLine":133,"keywordType":"Action","textWithKeyword":"When the user selects a different security record from the Ag-Grid","stepMatchArguments":[]},{"pwStepLine":115,"gherkinStepLine":134,"keywordType":"Outcome","textWithKeyword":"Then the editable detail view should update with the new selection's data","stepMatchArguments":[]}]},
  {"pwTestLine":118,"pickleLine":140,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-188"],"steps":[{"pwStepLine":119,"gherkinStepLine":141,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":120,"gherkinStepLine":142,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":121,"gherkinStepLine":143,"keywordType":"Action","textWithKeyword":"When the user searches for and selects a security record","stepMatchArguments":[]},{"pwStepLine":122,"gherkinStepLine":144,"keywordType":"Outcome","textWithKeyword":"Then the Update Contract toggle switch should be visible in the detail view","stepMatchArguments":[]}]},
  {"pwTestLine":125,"pickleLine":148,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-188"],"steps":[{"pwStepLine":126,"gherkinStepLine":149,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":127,"gherkinStepLine":150,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":128,"gherkinStepLine":151,"keywordType":"Action","textWithKeyword":"When the user searches for and selects a security record","stepMatchArguments":[]},{"pwStepLine":129,"gherkinStepLine":152,"keywordType":"Outcome","textWithKeyword":"Then the Update Contract toggle switch should be in the disabled state","stepMatchArguments":[]}]},
  {"pwTestLine":132,"pickleLine":156,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-188"],"steps":[{"pwStepLine":133,"gherkinStepLine":157,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":134,"gherkinStepLine":158,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":135,"gherkinStepLine":159,"keywordType":"Context","textWithKeyword":"And the user searches for and selects a security record","stepMatchArguments":[]},{"pwStepLine":136,"gherkinStepLine":160,"keywordType":"Context","textWithKeyword":"And the user enables the Update Contract toggle switch","stepMatchArguments":[]},{"pwStepLine":137,"gherkinStepLine":161,"keywordType":"Action","textWithKeyword":"When the user disables the Update Contract toggle switch","stepMatchArguments":[]},{"pwStepLine":138,"gherkinStepLine":162,"keywordType":"Outcome","textWithKeyword":"Then the contract update sub-view should no longer be visible","stepMatchArguments":[]}]},
  {"pwTestLine":141,"pickleLine":168,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-188"],"steps":[{"pwStepLine":142,"gherkinStepLine":169,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":143,"gherkinStepLine":170,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":144,"gherkinStepLine":171,"keywordType":"Context","textWithKeyword":"And the user searches for and selects a security record","stepMatchArguments":[]},{"pwStepLine":145,"gherkinStepLine":172,"keywordType":"Action","textWithKeyword":"When the user enables the Update Contract toggle switch","stepMatchArguments":[]},{"pwStepLine":146,"gherkinStepLine":173,"keywordType":"Outcome","textWithKeyword":"Then the Update action button should be disabled","stepMatchArguments":[]}]},
  {"pwTestLine":149,"pickleLine":177,"tags":["@smokeBDD","@Regression","@SLL-188"],"steps":[{"pwStepLine":150,"gherkinStepLine":178,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":151,"gherkinStepLine":179,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":152,"gherkinStepLine":180,"keywordType":"Context","textWithKeyword":"And the user searches for and selects a security record","stepMatchArguments":[]},{"pwStepLine":153,"gherkinStepLine":181,"keywordType":"Context","textWithKeyword":"And the user enables the Update Contract toggle switch","stepMatchArguments":[]},{"pwStepLine":154,"gherkinStepLine":182,"keywordType":"Action","textWithKeyword":"When the user enters a valid Existing Symbol","stepMatchArguments":[]},{"pwStepLine":155,"gherkinStepLine":183,"keywordType":"Action","textWithKeyword":"And the user enters a valid Existing CUSIP","stepMatchArguments":[]},{"pwStepLine":156,"gherkinStepLine":184,"keywordType":"Outcome","textWithKeyword":"Then the Update action button should be enabled","stepMatchArguments":[]}]},
  {"pwTestLine":159,"pickleLine":188,"tags":["@smokeBDD","@Regression","@SLL-188"],"steps":[{"pwStepLine":160,"gherkinStepLine":189,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":161,"gherkinStepLine":190,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":162,"gherkinStepLine":191,"keywordType":"Context","textWithKeyword":"And the user searches for and selects a security record","stepMatchArguments":[]},{"pwStepLine":163,"gherkinStepLine":192,"keywordType":"Context","textWithKeyword":"And the user enables the Update Contract toggle switch","stepMatchArguments":[]},{"pwStepLine":164,"gherkinStepLine":193,"keywordType":"Action","textWithKeyword":"When the user enters a valid Existing Symbol","stepMatchArguments":[]},{"pwStepLine":165,"gherkinStepLine":194,"keywordType":"Outcome","textWithKeyword":"Then the Update action button should be disabled","stepMatchArguments":[]}]},
  {"pwTestLine":168,"pickleLine":198,"tags":["@smokeBDD","@Regression","@SLL-188"],"steps":[{"pwStepLine":169,"gherkinStepLine":199,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":170,"gherkinStepLine":200,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":171,"gherkinStepLine":201,"keywordType":"Context","textWithKeyword":"And the user searches for and selects a security record","stepMatchArguments":[]},{"pwStepLine":172,"gherkinStepLine":202,"keywordType":"Context","textWithKeyword":"And the user enables the Update Contract toggle switch","stepMatchArguments":[]},{"pwStepLine":173,"gherkinStepLine":203,"keywordType":"Action","textWithKeyword":"When the user enters a valid Existing CUSIP","stepMatchArguments":[]},{"pwStepLine":174,"gherkinStepLine":204,"keywordType":"Outcome","textWithKeyword":"Then the Update action button should be disabled","stepMatchArguments":[]}]},
  {"pwTestLine":177,"pickleLine":210,"tags":["@smokeBDD","@Regression","@SLL-188"],"steps":[{"pwStepLine":178,"gherkinStepLine":211,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":179,"gherkinStepLine":212,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":180,"gherkinStepLine":213,"keywordType":"Context","textWithKeyword":"And the user searches for and selects a security record","stepMatchArguments":[]},{"pwStepLine":181,"gherkinStepLine":214,"keywordType":"Action","textWithKeyword":"When the user enters \"abc\" in the Close Price field","stepMatchArguments":[{"group":{"start":16,"value":"\"abc\"","children":[{"start":17,"value":"abc","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":182,"gherkinStepLine":215,"keywordType":"Outcome","textWithKeyword":"Then a validation error should be displayed for the Close Price field","stepMatchArguments":[]}]},
  {"pwTestLine":185,"pickleLine":219,"tags":["@smokeBDD","@Regression","@SLL-188"],"steps":[{"pwStepLine":186,"gherkinStepLine":220,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":187,"gherkinStepLine":221,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":188,"gherkinStepLine":222,"keywordType":"Context","textWithKeyword":"And the user searches for and selects a security record","stepMatchArguments":[]},{"pwStepLine":189,"gherkinStepLine":223,"keywordType":"Action","textWithKeyword":"When the user enters \"-50.00\" in the Close Price field","stepMatchArguments":[{"group":{"start":16,"value":"\"-50.00\"","children":[{"start":17,"value":"-50.00","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":190,"gherkinStepLine":224,"keywordType":"Outcome","textWithKeyword":"Then a validation error should be displayed for the Close Price field","stepMatchArguments":[]}]},
  {"pwTestLine":193,"pickleLine":228,"tags":["@smokeBDD","@Regression","@SLL-188"],"steps":[{"pwStepLine":194,"gherkinStepLine":229,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":195,"gherkinStepLine":230,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":196,"gherkinStepLine":231,"keywordType":"Context","textWithKeyword":"And the user searches for and selects a security record","stepMatchArguments":[]},{"pwStepLine":197,"gherkinStepLine":232,"keywordType":"Action","textWithKeyword":"When the user enters \"99/99/9999\" in the Close Date field","stepMatchArguments":[{"group":{"start":16,"value":"\"99/99/9999\"","children":[{"start":17,"value":"99/99/9999","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":198,"gherkinStepLine":233,"keywordType":"Outcome","textWithKeyword":"Then a validation error should be displayed for the Close Date field","stepMatchArguments":[]}]},
  {"pwTestLine":201,"pickleLine":237,"tags":["@smokeBDD","@Regression","@SLL-188"],"steps":[{"pwStepLine":202,"gherkinStepLine":238,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":203,"gherkinStepLine":239,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":204,"gherkinStepLine":240,"keywordType":"Context","textWithKeyword":"And the user searches for and selects a security record","stepMatchArguments":[]},{"pwStepLine":205,"gherkinStepLine":241,"keywordType":"Action","textWithKeyword":"When the user clears the Symbol field","stepMatchArguments":[]},{"pwStepLine":206,"gherkinStepLine":242,"keywordType":"Outcome","textWithKeyword":"Then the Save button should be disabled","stepMatchArguments":[]}]},
  {"pwTestLine":209,"pickleLine":248,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-188"],"steps":[{"pwStepLine":210,"gherkinStepLine":249,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":211,"gherkinStepLine":250,"keywordType":"Action","textWithKeyword":"When the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":212,"gherkinStepLine":251,"keywordType":"Outcome","textWithKeyword":"Then the security records should be displayed in an Ag-Grid component","stepMatchArguments":[]}]},
  {"pwTestLine":215,"pickleLine":255,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-188"],"steps":[{"pwStepLine":216,"gherkinStepLine":256,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":217,"gherkinStepLine":257,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":218,"gherkinStepLine":258,"keywordType":"Action","textWithKeyword":"When the user searches for and selects a security record","stepMatchArguments":[]},{"pwStepLine":219,"gherkinStepLine":259,"keywordType":"Outcome","textWithKeyword":"Then the detail view inputs should display with theme-aware styling","stepMatchArguments":[]}]},
  {"pwTestLine":222,"pickleLine":263,"tags":["@smokeBDD","@Regression","@SLL-188"],"steps":[{"pwStepLine":223,"gherkinStepLine":264,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":224,"gherkinStepLine":265,"keywordType":"Action","textWithKeyword":"When the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":225,"gherkinStepLine":266,"keywordType":"Outcome","textWithKeyword":"Then the search, grid, and detail view should all be visible on a single screen","stepMatchArguments":[]}]},
  {"pwTestLine":228,"pickleLine":272,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-188"],"steps":[{"pwStepLine":229,"gherkinStepLine":273,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":230,"gherkinStepLine":274,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":231,"gherkinStepLine":275,"keywordType":"Context","textWithKeyword":"And the user searches for and selects a security record","stepMatchArguments":[]},{"pwStepLine":232,"gherkinStepLine":276,"keywordType":"Action","textWithKeyword":"When the user modifies a security field and saves","stepMatchArguments":[]},{"pwStepLine":233,"gherkinStepLine":277,"keywordType":"Outcome","textWithKeyword":"Then no contract update should be triggered unless the Update Contract toggle is enabled","stepMatchArguments":[]}]},
  {"pwTestLine":236,"pickleLine":281,"tags":["@smokeBDD","@Regression","@SLL-188"],"steps":[{"pwStepLine":237,"gherkinStepLine":282,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":238,"gherkinStepLine":283,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":239,"gherkinStepLine":284,"keywordType":"Context","textWithKeyword":"And the user searches for and selects a security record","stepMatchArguments":[]},{"pwStepLine":240,"gherkinStepLine":285,"keywordType":"Context","textWithKeyword":"And the user enables the Update Contract toggle switch","stepMatchArguments":[]},{"pwStepLine":241,"gherkinStepLine":286,"keywordType":"Action","textWithKeyword":"When the user enters a non-existent Symbol in the Existing Symbol field","stepMatchArguments":[]},{"pwStepLine":242,"gherkinStepLine":287,"keywordType":"Action","textWithKeyword":"And the user enters a valid Existing CUSIP","stepMatchArguments":[]},{"pwStepLine":243,"gherkinStepLine":288,"keywordType":"Action","textWithKeyword":"And the user clicks the Update action button","stepMatchArguments":[]},{"pwStepLine":244,"gherkinStepLine":289,"keywordType":"Outcome","textWithKeyword":"Then an appropriate error or warning message should be displayed","stepMatchArguments":[]}]},
  {"pwTestLine":247,"pickleLine":293,"tags":["@smokeBDD","@Regression","@SLL-188"],"steps":[{"pwStepLine":248,"gherkinStepLine":294,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":249,"gherkinStepLine":295,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":250,"gherkinStepLine":296,"keywordType":"Context","textWithKeyword":"And the user searches for and selects a security record","stepMatchArguments":[]},{"pwStepLine":251,"gherkinStepLine":297,"keywordType":"Action","textWithKeyword":"When the user modifies a field in the detail view","stepMatchArguments":[]},{"pwStepLine":252,"gherkinStepLine":298,"keywordType":"Action","textWithKeyword":"And the user cancels or navigates away without saving","stepMatchArguments":[]},{"pwStepLine":253,"gherkinStepLine":299,"keywordType":"Outcome","textWithKeyword":"Then the security record should remain unchanged in the Ag-Grid","stepMatchArguments":[]}]},
  {"pwTestLine":256,"pickleLine":305,"tags":["@smokeBDD","@Regression","@SLL-188"],"steps":[{"pwStepLine":257,"gherkinStepLine":306,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":258,"gherkinStepLine":307,"keywordType":"Action","textWithKeyword":"When the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":259,"gherkinStepLine":308,"keywordType":"Action","textWithKeyword":"And the user enters only whitespace in the search field","stepMatchArguments":[]},{"pwStepLine":260,"gherkinStepLine":309,"keywordType":"Action","textWithKeyword":"And the user submits the search","stepMatchArguments":[]},{"pwStepLine":261,"gherkinStepLine":310,"keywordType":"Outcome","textWithKeyword":"Then no search should be executed or an appropriate message should be displayed","stepMatchArguments":[]}]},
  {"pwTestLine":264,"pickleLine":314,"tags":["@smokeBDD","@Regression","@SLL-188"],"steps":[{"pwStepLine":265,"gherkinStepLine":315,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":266,"gherkinStepLine":316,"keywordType":"Action","textWithKeyword":"When the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":267,"gherkinStepLine":317,"keywordType":"Action","textWithKeyword":"And the user enters \"!@#$%\" in the search field","stepMatchArguments":[{"group":{"start":16,"value":"\"!@#$%\"","children":[{"start":17,"value":"!@#$%","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":268,"gherkinStepLine":318,"keywordType":"Action","textWithKeyword":"And the user submits the search","stepMatchArguments":[]},{"pwStepLine":269,"gherkinStepLine":319,"keywordType":"Outcome","textWithKeyword":"Then the application should handle the special character search gracefully without errors","stepMatchArguments":[]}]},
  {"pwTestLine":272,"pickleLine":323,"tags":["@smokeBDD","@Regression","@SLL-188"],"steps":[{"pwStepLine":273,"gherkinStepLine":324,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":274,"gherkinStepLine":325,"keywordType":"Context","textWithKeyword":"And the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":275,"gherkinStepLine":326,"keywordType":"Context","textWithKeyword":"And the user searches for and selects a security record","stepMatchArguments":[]},{"pwStepLine":276,"gherkinStepLine":327,"keywordType":"Action","textWithKeyword":"When the user enters \"-1\" in the Volume field","stepMatchArguments":[{"group":{"start":16,"value":"\"-1\"","children":[{"start":17,"value":"-1","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":277,"gherkinStepLine":328,"keywordType":"Outcome","textWithKeyword":"Then a validation error should be displayed for the Volume field","stepMatchArguments":[]}]},
  {"pwTestLine":280,"pickleLine":334,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-188"],"steps":[{"pwStepLine":281,"gherkinStepLine":335,"keywordType":"Context","textWithKeyword":"Given the user navigates to the application","stepMatchArguments":[]},{"pwStepLine":282,"gherkinStepLine":336,"keywordType":"Action","textWithKeyword":"When the user logs in with valid credentials","stepMatchArguments":[]},{"pwStepLine":283,"gherkinStepLine":337,"keywordType":"Outcome","textWithKeyword":"Then the user should be redirected to the dashboard","stepMatchArguments":[]},{"pwStepLine":284,"gherkinStepLine":338,"keywordType":"Action","textWithKeyword":"When the user navigates to the Security Master page","stepMatchArguments":[]},{"pwStepLine":285,"gherkinStepLine":339,"keywordType":"Outcome","textWithKeyword":"Then the Ag-Grid should be visible","stepMatchArguments":[]},{"pwStepLine":286,"gherkinStepLine":340,"keywordType":"Action","textWithKeyword":"When the user enters a valid Symbol in the search field","stepMatchArguments":[]},{"pwStepLine":287,"gherkinStepLine":341,"keywordType":"Action","textWithKeyword":"And the user submits the search","stepMatchArguments":[]},{"pwStepLine":288,"gherkinStepLine":342,"keywordType":"Outcome","textWithKeyword":"Then matching security records should be displayed in the Ag-Grid","stepMatchArguments":[]},{"pwStepLine":289,"gherkinStepLine":343,"keywordType":"Action","textWithKeyword":"When the user selects a security record from the grid","stepMatchArguments":[]},{"pwStepLine":290,"gherkinStepLine":344,"keywordType":"Outcome","textWithKeyword":"Then the editable detail view should be populated","stepMatchArguments":[]},{"pwStepLine":291,"gherkinStepLine":345,"keywordType":"Outcome","textWithKeyword":"And the Update Contract toggle switch should be visible","stepMatchArguments":[]},{"pwStepLine":292,"gherkinStepLine":346,"keywordType":"Action","textWithKeyword":"When the user modifies the Close Price field with a valid value","stepMatchArguments":[]},{"pwStepLine":293,"gherkinStepLine":347,"keywordType":"Action","textWithKeyword":"And the user enables the Update Contract toggle switch","stepMatchArguments":[]},{"pwStepLine":294,"gherkinStepLine":348,"keywordType":"Action","textWithKeyword":"And the user enters a valid Existing Symbol","stepMatchArguments":[]},{"pwStepLine":295,"gherkinStepLine":349,"keywordType":"Action","textWithKeyword":"And the user enters a valid Existing CUSIP","stepMatchArguments":[]},{"pwStepLine":296,"gherkinStepLine":350,"keywordType":"Action","textWithKeyword":"And the user clicks the Update action button","stepMatchArguments":[]},{"pwStepLine":297,"gherkinStepLine":351,"keywordType":"Outcome","textWithKeyword":"Then a success confirmation for the contract update should be displayed","stepMatchArguments":[]},{"pwStepLine":298,"gherkinStepLine":352,"keywordType":"Outcome","textWithKeyword":"And the Ag-Grid should refresh reflecting the updated security record","stepMatchArguments":[]}]},
]; // bdd-data-end