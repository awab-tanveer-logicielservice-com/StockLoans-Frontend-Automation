// Generated from: UI-Automation\features\AddNewModalLayouts.feature
import { test } from "../../../step-definitions/fixtures.js";

test.describe('Add New Modal Layouts — Users, Counterparty, and Entity (SLL-207)', () => {

  test('User clicks Add New button on the Users module and the modal opens', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-207'] }, async ({ Given, When, Then, And, addNewModalLayoutsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Users module', null, { addNewModalLayoutsPage }); 
    await And('the user clicks the Add New button', null, { addNewModalLayoutsPage }); 
    await Then('the Add New User modal should be visible', null, { addNewModalLayoutsPage }); 
  });

  test('User fills all required fields in the Add New User modal and saves successfully', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-207'] }, async ({ Given, When, Then, And, addNewModalLayoutsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Users module', null, { addNewModalLayoutsPage }); 
    await And('the user clicks the Add New button', null, { addNewModalLayoutsPage }); 
    await When('the user fills in all required fields in the Add New User modal', null, { addNewModalLayoutsPage }); 
    await And('the user clicks the Save button', null, { addNewModalLayoutsPage }); 
    await Then('a success confirmation should be displayed', null, { addNewModalLayoutsPage }); 
    await And('the Users grid should refresh with the new user record', null, { addNewModalLayoutsPage }); 
  });

  test('Add New User modal closes after a successful save', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-207'] }, async ({ Given, When, Then, And, addNewModalLayoutsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Users module', null, { addNewModalLayoutsPage }); 
    await And('the user clicks the Add New button', null, { addNewModalLayoutsPage }); 
    await When('the user fills in all required fields in the Add New User modal', null, { addNewModalLayoutsPage }); 
    await And('the user clicks the Save button', null, { addNewModalLayoutsPage }); 
    await Then('the Add New User modal should be closed', null, { addNewModalLayoutsPage }); 
  });

  test('User clicks Add New button on the Counterparty module and the modal opens', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-207'] }, async ({ Given, When, Then, And, addNewModalLayoutsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Counterparty module', null, { addNewModalLayoutsPage }); 
    await And('the user clicks the Add New button', null, { addNewModalLayoutsPage }); 
    await Then('the Add New Counterparty modal should be visible', null, { addNewModalLayoutsPage }); 
  });

  test('User fills all required fields in the Add New Counterparty modal and saves successfully', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-207'] }, async ({ Given, When, Then, And, addNewModalLayoutsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Counterparty module', null, { addNewModalLayoutsPage }); 
    await And('the user clicks the Add New button', null, { addNewModalLayoutsPage }); 
    await When('the user fills in all required fields in the Add New Counterparty modal', null, { addNewModalLayoutsPage }); 
    await And('the user clicks the Save button', null, { addNewModalLayoutsPage }); 
    await Then('a success confirmation should be displayed', null, { addNewModalLayoutsPage }); 
    await And('the Counterparty grid should refresh with the new counterparty record', null, { addNewModalLayoutsPage }); 
  });

  test('Add New Counterparty modal closes after a successful save', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-207'] }, async ({ Given, When, Then, And, addNewModalLayoutsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Counterparty module', null, { addNewModalLayoutsPage }); 
    await And('the user clicks the Add New button', null, { addNewModalLayoutsPage }); 
    await When('the user fills in all required fields in the Add New Counterparty modal', null, { addNewModalLayoutsPage }); 
    await And('the user clicks the Save button', null, { addNewModalLayoutsPage }); 
    await Then('the Add New Counterparty modal should be closed', null, { addNewModalLayoutsPage }); 
  });

  test('User clicks Add New button on the Entity module and the modal opens', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-207'] }, async ({ Given, When, Then, And, addNewModalLayoutsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Entity module', null, { addNewModalLayoutsPage }); 
    await And('the user clicks the Add New button', null, { addNewModalLayoutsPage }); 
    await Then('the Add New Entity modal should be visible', null, { addNewModalLayoutsPage }); 
  });

  test('User fills all required fields in the Add New Entity modal and saves successfully', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-207'] }, async ({ Given, When, Then, And, addNewModalLayoutsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Entity module', null, { addNewModalLayoutsPage }); 
    await And('the user clicks the Add New button', null, { addNewModalLayoutsPage }); 
    await When('the user fills in all required fields in the Add New Entity modal', null, { addNewModalLayoutsPage }); 
    await And('the user clicks the Save button', null, { addNewModalLayoutsPage }); 
    await Then('a success confirmation should be displayed', null, { addNewModalLayoutsPage }); 
    await And('the Entity grid should refresh with the new entity record', null, { addNewModalLayoutsPage }); 
  });

  test('Add New Entity modal closes after a successful save', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-207'] }, async ({ Given, When, Then, And, addNewModalLayoutsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Entity module', null, { addNewModalLayoutsPage }); 
    await And('the user clicks the Add New button', null, { addNewModalLayoutsPage }); 
    await When('the user fills in all required fields in the Add New Entity modal', null, { addNewModalLayoutsPage }); 
    await And('the user clicks the Save button', null, { addNewModalLayoutsPage }); 
    await Then('the Add New Entity modal should be closed', null, { addNewModalLayoutsPage }); 
  });

  test('Add New User modal is centered on screen with theme-aware styling', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-207'] }, async ({ Given, When, Then, And, addNewModalLayoutsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Users module', null, { addNewModalLayoutsPage }); 
    await When('the user clicks the Add New button', null, { addNewModalLayoutsPage }); 
    await Then('the Add New User modal should be centered with theme-aware styling', null, { addNewModalLayoutsPage }); 
  });

  test('Add New Counterparty modal is centered on screen with theme-aware styling', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-207'] }, async ({ Given, When, Then, And, addNewModalLayoutsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Counterparty module', null, { addNewModalLayoutsPage }); 
    await When('the user clicks the Add New button', null, { addNewModalLayoutsPage }); 
    await Then('the Add New Counterparty modal should be centered with theme-aware styling', null, { addNewModalLayoutsPage }); 
  });

  test('Add New Entity modal is centered on screen with theme-aware styling', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-207'] }, async ({ Given, When, Then, And, addNewModalLayoutsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Entity module', null, { addNewModalLayoutsPage }); 
    await When('the user clicks the Add New button', null, { addNewModalLayoutsPage }); 
    await Then('the Add New Entity modal should be centered with theme-aware styling', null, { addNewModalLayoutsPage }); 
  });

  test('All three Add New modals share a consistent layout aligned with the SLS V2 design system', { tag: ['@smokeBDD', '@Regression', '@SLL-207'] }, async ({ Given, When, Then, And, addNewModalLayoutsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user opens the Add New modal on the Users module', null, { addNewModalLayoutsPage }); 
    await And('the user opens the Add New modal on the Counterparty module', null, { addNewModalLayoutsPage }); 
    await And('the user opens the Add New modal on the Entity module', null, { addNewModalLayoutsPage }); 
    await Then('all three modals should have a consistent layout and styling', null, { addNewModalLayoutsPage }); 
  });

  test('Add New button is visible and enabled on the Users module toolbar', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-207'] }, async ({ Given, When, Then, addNewModalLayoutsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Users module', null, { addNewModalLayoutsPage }); 
    await Then('the Add New button should be visible and enabled on the toolbar', null, { addNewModalLayoutsPage }); 
  });

  test('Add New button is visible and enabled on the Counterparty module toolbar', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-207'] }, async ({ Given, When, Then, addNewModalLayoutsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Counterparty module', null, { addNewModalLayoutsPage }); 
    await Then('the Add New button should be visible and enabled on the toolbar', null, { addNewModalLayoutsPage }); 
  });

  test('Add New button is visible and enabled on the Entity module toolbar', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-207'] }, async ({ Given, When, Then, addNewModalLayoutsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Entity module', null, { addNewModalLayoutsPage }); 
    await Then('the Add New button should be visible and enabled on the toolbar', null, { addNewModalLayoutsPage }); 
  });

  test('Save button is disabled when the Add New User modal form is empty', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-207'] }, async ({ Given, When, Then, And, addNewModalLayoutsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Users module', null, { addNewModalLayoutsPage }); 
    await When('the user clicks the Add New button', null, { addNewModalLayoutsPage }); 
    await Then('the Save button should be disabled', null, { addNewModalLayoutsPage }); 
  });

  test('Save button is disabled when the Add New Counterparty modal form is empty', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-207'] }, async ({ Given, When, Then, And, addNewModalLayoutsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Counterparty module', null, { addNewModalLayoutsPage }); 
    await When('the user clicks the Add New button', null, { addNewModalLayoutsPage }); 
    await Then('the Save button should be disabled', null, { addNewModalLayoutsPage }); 
  });

  test('Save button is disabled when the Add New Entity modal form is empty', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-207'] }, async ({ Given, When, Then, And, addNewModalLayoutsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Entity module', null, { addNewModalLayoutsPage }); 
    await When('the user clicks the Add New button', null, { addNewModalLayoutsPage }); 
    await Then('the Save button should be disabled', null, { addNewModalLayoutsPage }); 
  });

  test('Save button becomes enabled when all required fields are populated in the Add New User modal', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-207'] }, async ({ Given, When, Then, And, addNewModalLayoutsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Users module', null, { addNewModalLayoutsPage }); 
    await And('the user clicks the Add New button', null, { addNewModalLayoutsPage }); 
    await When('the user fills in all required fields in the Add New User modal', null, { addNewModalLayoutsPage }); 
    await Then('the Save button should be enabled', null, { addNewModalLayoutsPage }); 
  });

  test('Save button becomes enabled when all required fields are populated in the Add New Counterparty modal', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-207'] }, async ({ Given, When, Then, And, addNewModalLayoutsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Counterparty module', null, { addNewModalLayoutsPage }); 
    await And('the user clicks the Add New button', null, { addNewModalLayoutsPage }); 
    await When('the user fills in all required fields in the Add New Counterparty modal', null, { addNewModalLayoutsPage }); 
    await Then('the Save button should be enabled', null, { addNewModalLayoutsPage }); 
  });

  test('Save button becomes enabled when all required fields are populated in the Add New Entity modal', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-207'] }, async ({ Given, When, Then, And, addNewModalLayoutsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Entity module', null, { addNewModalLayoutsPage }); 
    await And('the user clicks the Add New button', null, { addNewModalLayoutsPage }); 
    await When('the user fills in all required fields in the Add New Entity modal', null, { addNewModalLayoutsPage }); 
    await Then('the Save button should be enabled', null, { addNewModalLayoutsPage }); 
  });

  test('User cancels the Add New User modal without saving — no record created and grid unchanged', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-207'] }, async ({ Given, When, Then, And, addNewModalLayoutsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Users module', null, { addNewModalLayoutsPage }); 
    await And('the user clicks the Add New button', null, { addNewModalLayoutsPage }); 
    await When('the user closes the modal without saving', null, { addNewModalLayoutsPage }); 
    await Then('the Add New User modal should be closed', null, { addNewModalLayoutsPage }); 
    await And('the Users grid should remain unchanged', null, { addNewModalLayoutsPage }); 
  });

  test('User cancels the Add New Counterparty modal without saving — no record created and grid unchanged', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-207'] }, async ({ Given, When, Then, And, addNewModalLayoutsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Counterparty module', null, { addNewModalLayoutsPage }); 
    await And('the user clicks the Add New button', null, { addNewModalLayoutsPage }); 
    await When('the user closes the modal without saving', null, { addNewModalLayoutsPage }); 
    await Then('the Add New Counterparty modal should be closed', null, { addNewModalLayoutsPage }); 
    await And('the Counterparty grid should remain unchanged', null, { addNewModalLayoutsPage }); 
  });

  test('User cancels the Add New Entity modal without saving — no record created and grid unchanged', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-207'] }, async ({ Given, When, Then, And, addNewModalLayoutsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Entity module', null, { addNewModalLayoutsPage }); 
    await And('the user clicks the Add New button', null, { addNewModalLayoutsPage }); 
    await When('the user closes the modal without saving', null, { addNewModalLayoutsPage }); 
    await Then('the Add New Entity modal should be closed', null, { addNewModalLayoutsPage }); 
    await And('the Entity grid should remain unchanged', null, { addNewModalLayoutsPage }); 
  });

  test('Submitting Add New User modal with a missing required field keeps Save disabled', { tag: ['@smokeBDD', '@Regression', '@SLL-207'] }, async ({ Given, When, Then, And, addNewModalLayoutsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Users module', null, { addNewModalLayoutsPage }); 
    await And('the user clicks the Add New button', null, { addNewModalLayoutsPage }); 
    await When('the user fills in all required fields except one in the Add New User modal', null, { addNewModalLayoutsPage }); 
    await Then('the Save button should be disabled', null, { addNewModalLayoutsPage }); 
  });

  test('Submitting Add New Counterparty modal with a missing required field keeps Save disabled', { tag: ['@smokeBDD', '@Regression', '@SLL-207'] }, async ({ Given, When, Then, And, addNewModalLayoutsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Counterparty module', null, { addNewModalLayoutsPage }); 
    await And('the user clicks the Add New button', null, { addNewModalLayoutsPage }); 
    await When('the user fills in all required fields except one in the Add New Counterparty modal', null, { addNewModalLayoutsPage }); 
    await Then('the Save button should be disabled', null, { addNewModalLayoutsPage }); 
  });

  test('Submitting Add New Entity modal with a missing required field keeps Save disabled', { tag: ['@smokeBDD', '@Regression', '@SLL-207'] }, async ({ Given, When, Then, And, addNewModalLayoutsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Entity module', null, { addNewModalLayoutsPage }); 
    await And('the user clicks the Add New button', null, { addNewModalLayoutsPage }); 
    await When('the user fills in all required fields except one in the Add New Entity modal', null, { addNewModalLayoutsPage }); 
    await Then('the Save button should be disabled', null, { addNewModalLayoutsPage }); 
  });

  test('Duplicate record submission in Add New User modal shows an appropriate error', { tag: ['@smokeBDD', '@Regression', '@SLL-207'] }, async ({ Given, When, Then, And, addNewModalLayoutsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Users module', null, { addNewModalLayoutsPage }); 
    await And('the user clicks the Add New button', null, { addNewModalLayoutsPage }); 
    await When('the user fills in all required fields using details of an existing user', null, { addNewModalLayoutsPage }); 
    await And('the user clicks the Save button', null, { addNewModalLayoutsPage }); 
    await Then('an appropriate error or warning message should be displayed', null, { addNewModalLayoutsPage }); 
  });

  test('Duplicate record submission in Add New Counterparty modal shows an appropriate error', { tag: ['@smokeBDD', '@Regression', '@SLL-207'] }, async ({ Given, When, Then, And, addNewModalLayoutsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Counterparty module', null, { addNewModalLayoutsPage }); 
    await And('the user clicks the Add New button', null, { addNewModalLayoutsPage }); 
    await When('the user fills in all required fields using details of an existing counterparty', null, { addNewModalLayoutsPage }); 
    await And('the user clicks the Save button', null, { addNewModalLayoutsPage }); 
    await Then('an appropriate error or warning message should be displayed', null, { addNewModalLayoutsPage }); 
  });

  test('Duplicate record submission in Add New Entity modal shows an appropriate error', { tag: ['@smokeBDD', '@Regression', '@SLL-207'] }, async ({ Given, When, Then, And, addNewModalLayoutsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Entity module', null, { addNewModalLayoutsPage }); 
    await And('the user clicks the Add New button', null, { addNewModalLayoutsPage }); 
    await When('the user fills in all required fields using details of an existing entity', null, { addNewModalLayoutsPage }); 
    await And('the user clicks the Save button', null, { addNewModalLayoutsPage }); 
    await Then('an appropriate error or warning message should be displayed', null, { addNewModalLayoutsPage }); 
  });

  test('Read-only user cannot access the Add New button on the Users module', { tag: ['@smokeBDD', '@Regression', '@SLL-207'] }, async ({ Given, When, Then, addNewModalLayoutsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in with read-only permissions', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Users module', null, { addNewModalLayoutsPage }); 
    await Then('the Add New button should not be available or should be disabled', null, { addNewModalLayoutsPage }); 
  });

  test('Read-only user cannot access the Add New button on the Counterparty module', { tag: ['@smokeBDD', '@Regression', '@SLL-207'] }, async ({ Given, When, Then, addNewModalLayoutsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in with read-only permissions', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Counterparty module', null, { addNewModalLayoutsPage }); 
    await Then('the Add New button should not be available or should be disabled', null, { addNewModalLayoutsPage }); 
  });

  test('Read-only user cannot access the Add New button on the Entity module', { tag: ['@smokeBDD', '@Regression', '@SLL-207'] }, async ({ Given, When, Then, addNewModalLayoutsPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in with read-only permissions', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Entity module', null, { addNewModalLayoutsPage }); 
    await Then('the Add New button should not be available or should be disabled', null, { addNewModalLayoutsPage }); 
  });

  test('Full lifecycle — add new User, Counterparty, and Entity records and verify all grids refresh', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-207'] }, async ({ Given, When, Then, And, addNewModalLayoutsPage, contractSummaryPage, loginPage, page, testUsers }) => { 
    await Given('the user navigates to the application', null, { loginPage, page }); 
    await When('the user logs in with valid credentials', null, { loginPage, testUsers }); 
    await Then('the user should be redirected to the dashboard', null, { contractSummaryPage, page }); 
    await When('the user navigates to the Users module', null, { addNewModalLayoutsPage }); 
    await And('the user clicks the Add New button', null, { addNewModalLayoutsPage }); 
    await Then('the Add New User modal should be visible', null, { addNewModalLayoutsPage }); 
    await And('the Save button should be disabled', null, { addNewModalLayoutsPage }); 
    await When('the user fills in all required fields in the Add New User modal', null, { addNewModalLayoutsPage }); 
    await And('the user clicks the Save button', null, { addNewModalLayoutsPage }); 
    await Then('a success confirmation should be displayed', null, { addNewModalLayoutsPage }); 
    await And('the Users grid should refresh with the new user record', null, { addNewModalLayoutsPage }); 
    await When('the user navigates to the Counterparty module', null, { addNewModalLayoutsPage }); 
    await And('the user clicks the Add New button', null, { addNewModalLayoutsPage }); 
    await Then('the Add New Counterparty modal should be visible', null, { addNewModalLayoutsPage }); 
    await When('the user fills in all required fields in the Add New Counterparty modal', null, { addNewModalLayoutsPage }); 
    await And('the user clicks the Save button', null, { addNewModalLayoutsPage }); 
    await Then('a success confirmation should be displayed', null, { addNewModalLayoutsPage }); 
    await And('the Counterparty grid should refresh with the new counterparty record', null, { addNewModalLayoutsPage }); 
    await When('the user navigates to the Entity module', null, { addNewModalLayoutsPage }); 
    await And('the user clicks the Add New button', null, { addNewModalLayoutsPage }); 
    await Then('the Add New Entity modal should be visible', null, { addNewModalLayoutsPage }); 
    await When('the user fills in all required fields in the Add New Entity modal', null, { addNewModalLayoutsPage }); 
    await And('the user clicks the Save button', null, { addNewModalLayoutsPage }); 
    await Then('a success confirmation should be displayed', null, { addNewModalLayoutsPage }); 
    await And('the Entity grid should refresh with the new entity record', null, { addNewModalLayoutsPage }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('UI-Automation\\features\\AddNewModalLayouts.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":10,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-207"],"steps":[{"pwStepLine":7,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"When the user navigates to the Users module","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":13,"keywordType":"Action","textWithKeyword":"And the user clicks the Add New button","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Then the Add New User modal should be visible","stepMatchArguments":[]}]},
  {"pwTestLine":13,"pickleLine":18,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-207"],"steps":[{"pwStepLine":14,"gherkinStepLine":19,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":20,"keywordType":"Context","textWithKeyword":"And the user navigates to the Users module","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":21,"keywordType":"Context","textWithKeyword":"And the user clicks the Add New button","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":22,"keywordType":"Action","textWithKeyword":"When the user fills in all required fields in the Add New User modal","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":23,"keywordType":"Action","textWithKeyword":"And the user clicks the Save button","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"Then a success confirmation should be displayed","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"And the Users grid should refresh with the new user record","stepMatchArguments":[]}]},
  {"pwTestLine":23,"pickleLine":29,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-207"],"steps":[{"pwStepLine":24,"gherkinStepLine":30,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":31,"keywordType":"Context","textWithKeyword":"And the user navigates to the Users module","stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":32,"keywordType":"Context","textWithKeyword":"And the user clicks the Add New button","stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":33,"keywordType":"Action","textWithKeyword":"When the user fills in all required fields in the Add New User modal","stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":34,"keywordType":"Action","textWithKeyword":"And the user clicks the Save button","stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":35,"keywordType":"Outcome","textWithKeyword":"Then the Add New User modal should be closed","stepMatchArguments":[]}]},
  {"pwTestLine":32,"pickleLine":41,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-207"],"steps":[{"pwStepLine":33,"gherkinStepLine":42,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":43,"keywordType":"Action","textWithKeyword":"When the user navigates to the Counterparty module","stepMatchArguments":[]},{"pwStepLine":35,"gherkinStepLine":44,"keywordType":"Action","textWithKeyword":"And the user clicks the Add New button","stepMatchArguments":[]},{"pwStepLine":36,"gherkinStepLine":45,"keywordType":"Outcome","textWithKeyword":"Then the Add New Counterparty modal should be visible","stepMatchArguments":[]}]},
  {"pwTestLine":39,"pickleLine":49,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-207"],"steps":[{"pwStepLine":40,"gherkinStepLine":50,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":41,"gherkinStepLine":51,"keywordType":"Context","textWithKeyword":"And the user navigates to the Counterparty module","stepMatchArguments":[]},{"pwStepLine":42,"gherkinStepLine":52,"keywordType":"Context","textWithKeyword":"And the user clicks the Add New button","stepMatchArguments":[]},{"pwStepLine":43,"gherkinStepLine":53,"keywordType":"Action","textWithKeyword":"When the user fills in all required fields in the Add New Counterparty modal","stepMatchArguments":[]},{"pwStepLine":44,"gherkinStepLine":54,"keywordType":"Action","textWithKeyword":"And the user clicks the Save button","stepMatchArguments":[]},{"pwStepLine":45,"gherkinStepLine":55,"keywordType":"Outcome","textWithKeyword":"Then a success confirmation should be displayed","stepMatchArguments":[]},{"pwStepLine":46,"gherkinStepLine":56,"keywordType":"Outcome","textWithKeyword":"And the Counterparty grid should refresh with the new counterparty record","stepMatchArguments":[]}]},
  {"pwTestLine":49,"pickleLine":60,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-207"],"steps":[{"pwStepLine":50,"gherkinStepLine":61,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":51,"gherkinStepLine":62,"keywordType":"Context","textWithKeyword":"And the user navigates to the Counterparty module","stepMatchArguments":[]},{"pwStepLine":52,"gherkinStepLine":63,"keywordType":"Context","textWithKeyword":"And the user clicks the Add New button","stepMatchArguments":[]},{"pwStepLine":53,"gherkinStepLine":64,"keywordType":"Action","textWithKeyword":"When the user fills in all required fields in the Add New Counterparty modal","stepMatchArguments":[]},{"pwStepLine":54,"gherkinStepLine":65,"keywordType":"Action","textWithKeyword":"And the user clicks the Save button","stepMatchArguments":[]},{"pwStepLine":55,"gherkinStepLine":66,"keywordType":"Outcome","textWithKeyword":"Then the Add New Counterparty modal should be closed","stepMatchArguments":[]}]},
  {"pwTestLine":58,"pickleLine":72,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-207"],"steps":[{"pwStepLine":59,"gherkinStepLine":73,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":60,"gherkinStepLine":74,"keywordType":"Action","textWithKeyword":"When the user navigates to the Entity module","stepMatchArguments":[]},{"pwStepLine":61,"gherkinStepLine":75,"keywordType":"Action","textWithKeyword":"And the user clicks the Add New button","stepMatchArguments":[]},{"pwStepLine":62,"gherkinStepLine":76,"keywordType":"Outcome","textWithKeyword":"Then the Add New Entity modal should be visible","stepMatchArguments":[]}]},
  {"pwTestLine":65,"pickleLine":80,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-207"],"steps":[{"pwStepLine":66,"gherkinStepLine":81,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":67,"gherkinStepLine":82,"keywordType":"Context","textWithKeyword":"And the user navigates to the Entity module","stepMatchArguments":[]},{"pwStepLine":68,"gherkinStepLine":83,"keywordType":"Context","textWithKeyword":"And the user clicks the Add New button","stepMatchArguments":[]},{"pwStepLine":69,"gherkinStepLine":84,"keywordType":"Action","textWithKeyword":"When the user fills in all required fields in the Add New Entity modal","stepMatchArguments":[]},{"pwStepLine":70,"gherkinStepLine":85,"keywordType":"Action","textWithKeyword":"And the user clicks the Save button","stepMatchArguments":[]},{"pwStepLine":71,"gherkinStepLine":86,"keywordType":"Outcome","textWithKeyword":"Then a success confirmation should be displayed","stepMatchArguments":[]},{"pwStepLine":72,"gherkinStepLine":87,"keywordType":"Outcome","textWithKeyword":"And the Entity grid should refresh with the new entity record","stepMatchArguments":[]}]},
  {"pwTestLine":75,"pickleLine":91,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-207"],"steps":[{"pwStepLine":76,"gherkinStepLine":92,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":77,"gherkinStepLine":93,"keywordType":"Context","textWithKeyword":"And the user navigates to the Entity module","stepMatchArguments":[]},{"pwStepLine":78,"gherkinStepLine":94,"keywordType":"Context","textWithKeyword":"And the user clicks the Add New button","stepMatchArguments":[]},{"pwStepLine":79,"gherkinStepLine":95,"keywordType":"Action","textWithKeyword":"When the user fills in all required fields in the Add New Entity modal","stepMatchArguments":[]},{"pwStepLine":80,"gherkinStepLine":96,"keywordType":"Action","textWithKeyword":"And the user clicks the Save button","stepMatchArguments":[]},{"pwStepLine":81,"gherkinStepLine":97,"keywordType":"Outcome","textWithKeyword":"Then the Add New Entity modal should be closed","stepMatchArguments":[]}]},
  {"pwTestLine":84,"pickleLine":103,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-207"],"steps":[{"pwStepLine":85,"gherkinStepLine":104,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":86,"gherkinStepLine":105,"keywordType":"Context","textWithKeyword":"And the user navigates to the Users module","stepMatchArguments":[]},{"pwStepLine":87,"gherkinStepLine":106,"keywordType":"Action","textWithKeyword":"When the user clicks the Add New button","stepMatchArguments":[]},{"pwStepLine":88,"gherkinStepLine":107,"keywordType":"Outcome","textWithKeyword":"Then the Add New User modal should be centered with theme-aware styling","stepMatchArguments":[]}]},
  {"pwTestLine":91,"pickleLine":111,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-207"],"steps":[{"pwStepLine":92,"gherkinStepLine":112,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":93,"gherkinStepLine":113,"keywordType":"Context","textWithKeyword":"And the user navigates to the Counterparty module","stepMatchArguments":[]},{"pwStepLine":94,"gherkinStepLine":114,"keywordType":"Action","textWithKeyword":"When the user clicks the Add New button","stepMatchArguments":[]},{"pwStepLine":95,"gherkinStepLine":115,"keywordType":"Outcome","textWithKeyword":"Then the Add New Counterparty modal should be centered with theme-aware styling","stepMatchArguments":[]}]},
  {"pwTestLine":98,"pickleLine":119,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-207"],"steps":[{"pwStepLine":99,"gherkinStepLine":120,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":100,"gherkinStepLine":121,"keywordType":"Context","textWithKeyword":"And the user navigates to the Entity module","stepMatchArguments":[]},{"pwStepLine":101,"gherkinStepLine":122,"keywordType":"Action","textWithKeyword":"When the user clicks the Add New button","stepMatchArguments":[]},{"pwStepLine":102,"gherkinStepLine":123,"keywordType":"Outcome","textWithKeyword":"Then the Add New Entity modal should be centered with theme-aware styling","stepMatchArguments":[]}]},
  {"pwTestLine":105,"pickleLine":127,"tags":["@smokeBDD","@Regression","@SLL-207"],"steps":[{"pwStepLine":106,"gherkinStepLine":128,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":107,"gherkinStepLine":129,"keywordType":"Action","textWithKeyword":"When the user opens the Add New modal on the Users module","stepMatchArguments":[]},{"pwStepLine":108,"gherkinStepLine":130,"keywordType":"Action","textWithKeyword":"And the user opens the Add New modal on the Counterparty module","stepMatchArguments":[]},{"pwStepLine":109,"gherkinStepLine":131,"keywordType":"Action","textWithKeyword":"And the user opens the Add New modal on the Entity module","stepMatchArguments":[]},{"pwStepLine":110,"gherkinStepLine":132,"keywordType":"Outcome","textWithKeyword":"Then all three modals should have a consistent layout and styling","stepMatchArguments":[]}]},
  {"pwTestLine":113,"pickleLine":138,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-207"],"steps":[{"pwStepLine":114,"gherkinStepLine":139,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":115,"gherkinStepLine":140,"keywordType":"Action","textWithKeyword":"When the user navigates to the Users module","stepMatchArguments":[]},{"pwStepLine":116,"gherkinStepLine":141,"keywordType":"Outcome","textWithKeyword":"Then the Add New button should be visible and enabled on the toolbar","stepMatchArguments":[]}]},
  {"pwTestLine":119,"pickleLine":145,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-207"],"steps":[{"pwStepLine":120,"gherkinStepLine":146,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":121,"gherkinStepLine":147,"keywordType":"Action","textWithKeyword":"When the user navigates to the Counterparty module","stepMatchArguments":[]},{"pwStepLine":122,"gherkinStepLine":148,"keywordType":"Outcome","textWithKeyword":"Then the Add New button should be visible and enabled on the toolbar","stepMatchArguments":[]}]},
  {"pwTestLine":125,"pickleLine":152,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-207"],"steps":[{"pwStepLine":126,"gherkinStepLine":153,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":127,"gherkinStepLine":154,"keywordType":"Action","textWithKeyword":"When the user navigates to the Entity module","stepMatchArguments":[]},{"pwStepLine":128,"gherkinStepLine":155,"keywordType":"Outcome","textWithKeyword":"Then the Add New button should be visible and enabled on the toolbar","stepMatchArguments":[]}]},
  {"pwTestLine":131,"pickleLine":161,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-207"],"steps":[{"pwStepLine":132,"gherkinStepLine":162,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":133,"gherkinStepLine":163,"keywordType":"Context","textWithKeyword":"And the user navigates to the Users module","stepMatchArguments":[]},{"pwStepLine":134,"gherkinStepLine":164,"keywordType":"Action","textWithKeyword":"When the user clicks the Add New button","stepMatchArguments":[]},{"pwStepLine":135,"gherkinStepLine":165,"keywordType":"Outcome","textWithKeyword":"Then the Save button should be disabled","stepMatchArguments":[]}]},
  {"pwTestLine":138,"pickleLine":169,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-207"],"steps":[{"pwStepLine":139,"gherkinStepLine":170,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":140,"gherkinStepLine":171,"keywordType":"Context","textWithKeyword":"And the user navigates to the Counterparty module","stepMatchArguments":[]},{"pwStepLine":141,"gherkinStepLine":172,"keywordType":"Action","textWithKeyword":"When the user clicks the Add New button","stepMatchArguments":[]},{"pwStepLine":142,"gherkinStepLine":173,"keywordType":"Outcome","textWithKeyword":"Then the Save button should be disabled","stepMatchArguments":[]}]},
  {"pwTestLine":145,"pickleLine":177,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-207"],"steps":[{"pwStepLine":146,"gherkinStepLine":178,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":147,"gherkinStepLine":179,"keywordType":"Context","textWithKeyword":"And the user navigates to the Entity module","stepMatchArguments":[]},{"pwStepLine":148,"gherkinStepLine":180,"keywordType":"Action","textWithKeyword":"When the user clicks the Add New button","stepMatchArguments":[]},{"pwStepLine":149,"gherkinStepLine":181,"keywordType":"Outcome","textWithKeyword":"Then the Save button should be disabled","stepMatchArguments":[]}]},
  {"pwTestLine":152,"pickleLine":185,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-207"],"steps":[{"pwStepLine":153,"gherkinStepLine":186,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":154,"gherkinStepLine":187,"keywordType":"Context","textWithKeyword":"And the user navigates to the Users module","stepMatchArguments":[]},{"pwStepLine":155,"gherkinStepLine":188,"keywordType":"Context","textWithKeyword":"And the user clicks the Add New button","stepMatchArguments":[]},{"pwStepLine":156,"gherkinStepLine":189,"keywordType":"Action","textWithKeyword":"When the user fills in all required fields in the Add New User modal","stepMatchArguments":[]},{"pwStepLine":157,"gherkinStepLine":190,"keywordType":"Outcome","textWithKeyword":"Then the Save button should be enabled","stepMatchArguments":[]}]},
  {"pwTestLine":160,"pickleLine":194,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-207"],"steps":[{"pwStepLine":161,"gherkinStepLine":195,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":162,"gherkinStepLine":196,"keywordType":"Context","textWithKeyword":"And the user navigates to the Counterparty module","stepMatchArguments":[]},{"pwStepLine":163,"gherkinStepLine":197,"keywordType":"Context","textWithKeyword":"And the user clicks the Add New button","stepMatchArguments":[]},{"pwStepLine":164,"gherkinStepLine":198,"keywordType":"Action","textWithKeyword":"When the user fills in all required fields in the Add New Counterparty modal","stepMatchArguments":[]},{"pwStepLine":165,"gherkinStepLine":199,"keywordType":"Outcome","textWithKeyword":"Then the Save button should be enabled","stepMatchArguments":[]}]},
  {"pwTestLine":168,"pickleLine":203,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-207"],"steps":[{"pwStepLine":169,"gherkinStepLine":204,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":170,"gherkinStepLine":205,"keywordType":"Context","textWithKeyword":"And the user navigates to the Entity module","stepMatchArguments":[]},{"pwStepLine":171,"gherkinStepLine":206,"keywordType":"Context","textWithKeyword":"And the user clicks the Add New button","stepMatchArguments":[]},{"pwStepLine":172,"gherkinStepLine":207,"keywordType":"Action","textWithKeyword":"When the user fills in all required fields in the Add New Entity modal","stepMatchArguments":[]},{"pwStepLine":173,"gherkinStepLine":208,"keywordType":"Outcome","textWithKeyword":"Then the Save button should be enabled","stepMatchArguments":[]}]},
  {"pwTestLine":176,"pickleLine":214,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-207"],"steps":[{"pwStepLine":177,"gherkinStepLine":215,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":178,"gherkinStepLine":216,"keywordType":"Context","textWithKeyword":"And the user navigates to the Users module","stepMatchArguments":[]},{"pwStepLine":179,"gherkinStepLine":217,"keywordType":"Context","textWithKeyword":"And the user clicks the Add New button","stepMatchArguments":[]},{"pwStepLine":180,"gherkinStepLine":218,"keywordType":"Action","textWithKeyword":"When the user closes the modal without saving","stepMatchArguments":[]},{"pwStepLine":181,"gherkinStepLine":219,"keywordType":"Outcome","textWithKeyword":"Then the Add New User modal should be closed","stepMatchArguments":[]},{"pwStepLine":182,"gherkinStepLine":220,"keywordType":"Outcome","textWithKeyword":"And the Users grid should remain unchanged","stepMatchArguments":[]}]},
  {"pwTestLine":185,"pickleLine":224,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-207"],"steps":[{"pwStepLine":186,"gherkinStepLine":225,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":187,"gherkinStepLine":226,"keywordType":"Context","textWithKeyword":"And the user navigates to the Counterparty module","stepMatchArguments":[]},{"pwStepLine":188,"gherkinStepLine":227,"keywordType":"Context","textWithKeyword":"And the user clicks the Add New button","stepMatchArguments":[]},{"pwStepLine":189,"gherkinStepLine":228,"keywordType":"Action","textWithKeyword":"When the user closes the modal without saving","stepMatchArguments":[]},{"pwStepLine":190,"gherkinStepLine":229,"keywordType":"Outcome","textWithKeyword":"Then the Add New Counterparty modal should be closed","stepMatchArguments":[]},{"pwStepLine":191,"gherkinStepLine":230,"keywordType":"Outcome","textWithKeyword":"And the Counterparty grid should remain unchanged","stepMatchArguments":[]}]},
  {"pwTestLine":194,"pickleLine":234,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-207"],"steps":[{"pwStepLine":195,"gherkinStepLine":235,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":196,"gherkinStepLine":236,"keywordType":"Context","textWithKeyword":"And the user navigates to the Entity module","stepMatchArguments":[]},{"pwStepLine":197,"gherkinStepLine":237,"keywordType":"Context","textWithKeyword":"And the user clicks the Add New button","stepMatchArguments":[]},{"pwStepLine":198,"gherkinStepLine":238,"keywordType":"Action","textWithKeyword":"When the user closes the modal without saving","stepMatchArguments":[]},{"pwStepLine":199,"gherkinStepLine":239,"keywordType":"Outcome","textWithKeyword":"Then the Add New Entity modal should be closed","stepMatchArguments":[]},{"pwStepLine":200,"gherkinStepLine":240,"keywordType":"Outcome","textWithKeyword":"And the Entity grid should remain unchanged","stepMatchArguments":[]}]},
  {"pwTestLine":203,"pickleLine":246,"tags":["@smokeBDD","@Regression","@SLL-207"],"steps":[{"pwStepLine":204,"gherkinStepLine":247,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":205,"gherkinStepLine":248,"keywordType":"Context","textWithKeyword":"And the user navigates to the Users module","stepMatchArguments":[]},{"pwStepLine":206,"gherkinStepLine":249,"keywordType":"Context","textWithKeyword":"And the user clicks the Add New button","stepMatchArguments":[]},{"pwStepLine":207,"gherkinStepLine":250,"keywordType":"Action","textWithKeyword":"When the user fills in all required fields except one in the Add New User modal","stepMatchArguments":[]},{"pwStepLine":208,"gherkinStepLine":251,"keywordType":"Outcome","textWithKeyword":"Then the Save button should be disabled","stepMatchArguments":[]}]},
  {"pwTestLine":211,"pickleLine":255,"tags":["@smokeBDD","@Regression","@SLL-207"],"steps":[{"pwStepLine":212,"gherkinStepLine":256,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":213,"gherkinStepLine":257,"keywordType":"Context","textWithKeyword":"And the user navigates to the Counterparty module","stepMatchArguments":[]},{"pwStepLine":214,"gherkinStepLine":258,"keywordType":"Context","textWithKeyword":"And the user clicks the Add New button","stepMatchArguments":[]},{"pwStepLine":215,"gherkinStepLine":259,"keywordType":"Action","textWithKeyword":"When the user fills in all required fields except one in the Add New Counterparty modal","stepMatchArguments":[]},{"pwStepLine":216,"gherkinStepLine":260,"keywordType":"Outcome","textWithKeyword":"Then the Save button should be disabled","stepMatchArguments":[]}]},
  {"pwTestLine":219,"pickleLine":264,"tags":["@smokeBDD","@Regression","@SLL-207"],"steps":[{"pwStepLine":220,"gherkinStepLine":265,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":221,"gherkinStepLine":266,"keywordType":"Context","textWithKeyword":"And the user navigates to the Entity module","stepMatchArguments":[]},{"pwStepLine":222,"gherkinStepLine":267,"keywordType":"Context","textWithKeyword":"And the user clicks the Add New button","stepMatchArguments":[]},{"pwStepLine":223,"gherkinStepLine":268,"keywordType":"Action","textWithKeyword":"When the user fills in all required fields except one in the Add New Entity modal","stepMatchArguments":[]},{"pwStepLine":224,"gherkinStepLine":269,"keywordType":"Outcome","textWithKeyword":"Then the Save button should be disabled","stepMatchArguments":[]}]},
  {"pwTestLine":227,"pickleLine":273,"tags":["@smokeBDD","@Regression","@SLL-207"],"steps":[{"pwStepLine":228,"gherkinStepLine":274,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":229,"gherkinStepLine":275,"keywordType":"Context","textWithKeyword":"And the user navigates to the Users module","stepMatchArguments":[]},{"pwStepLine":230,"gherkinStepLine":276,"keywordType":"Context","textWithKeyword":"And the user clicks the Add New button","stepMatchArguments":[]},{"pwStepLine":231,"gherkinStepLine":277,"keywordType":"Action","textWithKeyword":"When the user fills in all required fields using details of an existing user","stepMatchArguments":[]},{"pwStepLine":232,"gherkinStepLine":278,"keywordType":"Action","textWithKeyword":"And the user clicks the Save button","stepMatchArguments":[]},{"pwStepLine":233,"gherkinStepLine":279,"keywordType":"Outcome","textWithKeyword":"Then an appropriate error or warning message should be displayed","stepMatchArguments":[]}]},
  {"pwTestLine":236,"pickleLine":283,"tags":["@smokeBDD","@Regression","@SLL-207"],"steps":[{"pwStepLine":237,"gherkinStepLine":284,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":238,"gherkinStepLine":285,"keywordType":"Context","textWithKeyword":"And the user navigates to the Counterparty module","stepMatchArguments":[]},{"pwStepLine":239,"gherkinStepLine":286,"keywordType":"Context","textWithKeyword":"And the user clicks the Add New button","stepMatchArguments":[]},{"pwStepLine":240,"gherkinStepLine":287,"keywordType":"Action","textWithKeyword":"When the user fills in all required fields using details of an existing counterparty","stepMatchArguments":[]},{"pwStepLine":241,"gherkinStepLine":288,"keywordType":"Action","textWithKeyword":"And the user clicks the Save button","stepMatchArguments":[]},{"pwStepLine":242,"gherkinStepLine":289,"keywordType":"Outcome","textWithKeyword":"Then an appropriate error or warning message should be displayed","stepMatchArguments":[]}]},
  {"pwTestLine":245,"pickleLine":293,"tags":["@smokeBDD","@Regression","@SLL-207"],"steps":[{"pwStepLine":246,"gherkinStepLine":294,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":247,"gherkinStepLine":295,"keywordType":"Context","textWithKeyword":"And the user navigates to the Entity module","stepMatchArguments":[]},{"pwStepLine":248,"gherkinStepLine":296,"keywordType":"Context","textWithKeyword":"And the user clicks the Add New button","stepMatchArguments":[]},{"pwStepLine":249,"gherkinStepLine":297,"keywordType":"Action","textWithKeyword":"When the user fills in all required fields using details of an existing entity","stepMatchArguments":[]},{"pwStepLine":250,"gherkinStepLine":298,"keywordType":"Action","textWithKeyword":"And the user clicks the Save button","stepMatchArguments":[]},{"pwStepLine":251,"gherkinStepLine":299,"keywordType":"Outcome","textWithKeyword":"Then an appropriate error or warning message should be displayed","stepMatchArguments":[]}]},
  {"pwTestLine":254,"pickleLine":305,"tags":["@smokeBDD","@Regression","@SLL-207"],"steps":[{"pwStepLine":255,"gherkinStepLine":306,"keywordType":"Context","textWithKeyword":"Given the user is logged in with read-only permissions","stepMatchArguments":[]},{"pwStepLine":256,"gherkinStepLine":307,"keywordType":"Action","textWithKeyword":"When the user navigates to the Users module","stepMatchArguments":[]},{"pwStepLine":257,"gherkinStepLine":308,"keywordType":"Outcome","textWithKeyword":"Then the Add New button should not be available or should be disabled","stepMatchArguments":[]}]},
  {"pwTestLine":260,"pickleLine":312,"tags":["@smokeBDD","@Regression","@SLL-207"],"steps":[{"pwStepLine":261,"gherkinStepLine":313,"keywordType":"Context","textWithKeyword":"Given the user is logged in with read-only permissions","stepMatchArguments":[]},{"pwStepLine":262,"gherkinStepLine":314,"keywordType":"Action","textWithKeyword":"When the user navigates to the Counterparty module","stepMatchArguments":[]},{"pwStepLine":263,"gherkinStepLine":315,"keywordType":"Outcome","textWithKeyword":"Then the Add New button should not be available or should be disabled","stepMatchArguments":[]}]},
  {"pwTestLine":266,"pickleLine":319,"tags":["@smokeBDD","@Regression","@SLL-207"],"steps":[{"pwStepLine":267,"gherkinStepLine":320,"keywordType":"Context","textWithKeyword":"Given the user is logged in with read-only permissions","stepMatchArguments":[]},{"pwStepLine":268,"gherkinStepLine":321,"keywordType":"Action","textWithKeyword":"When the user navigates to the Entity module","stepMatchArguments":[]},{"pwStepLine":269,"gherkinStepLine":322,"keywordType":"Outcome","textWithKeyword":"Then the Add New button should not be available or should be disabled","stepMatchArguments":[]}]},
  {"pwTestLine":272,"pickleLine":328,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-207"],"steps":[{"pwStepLine":273,"gherkinStepLine":329,"keywordType":"Context","textWithKeyword":"Given the user navigates to the application","stepMatchArguments":[]},{"pwStepLine":274,"gherkinStepLine":330,"keywordType":"Action","textWithKeyword":"When the user logs in with valid credentials","stepMatchArguments":[]},{"pwStepLine":275,"gherkinStepLine":331,"keywordType":"Outcome","textWithKeyword":"Then the user should be redirected to the dashboard","stepMatchArguments":[]},{"pwStepLine":276,"gherkinStepLine":332,"keywordType":"Action","textWithKeyword":"When the user navigates to the Users module","stepMatchArguments":[]},{"pwStepLine":277,"gherkinStepLine":333,"keywordType":"Action","textWithKeyword":"And the user clicks the Add New button","stepMatchArguments":[]},{"pwStepLine":278,"gherkinStepLine":334,"keywordType":"Outcome","textWithKeyword":"Then the Add New User modal should be visible","stepMatchArguments":[]},{"pwStepLine":279,"gherkinStepLine":335,"keywordType":"Outcome","textWithKeyword":"And the Save button should be disabled","stepMatchArguments":[]},{"pwStepLine":280,"gherkinStepLine":336,"keywordType":"Action","textWithKeyword":"When the user fills in all required fields in the Add New User modal","stepMatchArguments":[]},{"pwStepLine":281,"gherkinStepLine":337,"keywordType":"Action","textWithKeyword":"And the user clicks the Save button","stepMatchArguments":[]},{"pwStepLine":282,"gherkinStepLine":338,"keywordType":"Outcome","textWithKeyword":"Then a success confirmation should be displayed","stepMatchArguments":[]},{"pwStepLine":283,"gherkinStepLine":339,"keywordType":"Outcome","textWithKeyword":"And the Users grid should refresh with the new user record","stepMatchArguments":[]},{"pwStepLine":284,"gherkinStepLine":340,"keywordType":"Action","textWithKeyword":"When the user navigates to the Counterparty module","stepMatchArguments":[]},{"pwStepLine":285,"gherkinStepLine":341,"keywordType":"Action","textWithKeyword":"And the user clicks the Add New button","stepMatchArguments":[]},{"pwStepLine":286,"gherkinStepLine":342,"keywordType":"Outcome","textWithKeyword":"Then the Add New Counterparty modal should be visible","stepMatchArguments":[]},{"pwStepLine":287,"gherkinStepLine":343,"keywordType":"Action","textWithKeyword":"When the user fills in all required fields in the Add New Counterparty modal","stepMatchArguments":[]},{"pwStepLine":288,"gherkinStepLine":344,"keywordType":"Action","textWithKeyword":"And the user clicks the Save button","stepMatchArguments":[]},{"pwStepLine":289,"gherkinStepLine":345,"keywordType":"Outcome","textWithKeyword":"Then a success confirmation should be displayed","stepMatchArguments":[]},{"pwStepLine":290,"gherkinStepLine":346,"keywordType":"Outcome","textWithKeyword":"And the Counterparty grid should refresh with the new counterparty record","stepMatchArguments":[]},{"pwStepLine":291,"gherkinStepLine":347,"keywordType":"Action","textWithKeyword":"When the user navigates to the Entity module","stepMatchArguments":[]},{"pwStepLine":292,"gherkinStepLine":348,"keywordType":"Action","textWithKeyword":"And the user clicks the Add New button","stepMatchArguments":[]},{"pwStepLine":293,"gherkinStepLine":349,"keywordType":"Outcome","textWithKeyword":"Then the Add New Entity modal should be visible","stepMatchArguments":[]},{"pwStepLine":294,"gherkinStepLine":350,"keywordType":"Action","textWithKeyword":"When the user fills in all required fields in the Add New Entity modal","stepMatchArguments":[]},{"pwStepLine":295,"gherkinStepLine":351,"keywordType":"Action","textWithKeyword":"And the user clicks the Save button","stepMatchArguments":[]},{"pwStepLine":296,"gherkinStepLine":352,"keywordType":"Outcome","textWithKeyword":"Then a success confirmation should be displayed","stepMatchArguments":[]},{"pwStepLine":297,"gherkinStepLine":353,"keywordType":"Outcome","textWithKeyword":"And the Entity grid should refresh with the new entity record","stepMatchArguments":[]}]},
]; // bdd-data-end