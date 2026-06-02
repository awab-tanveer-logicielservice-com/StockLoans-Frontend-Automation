// Generated from: UI-Automation\features\AddNewUser.feature
import { test } from "../../../step-definitions/fixtures.js";

test.describe('Add New User — Admin User Management (SLL-Users)', () => {

  test('Admin navigates to the Users Management page', { tag: ['@smokeBDD', '@Smoke', '@Regression'] }, async ({ Given, When, Then, And, addNewUserPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Users Management page', null, { addNewUserPage }); 
    await Then('the Users AG-Grid should be visible', null, { page }); 
    await And('the ADD NEW USER button should be visible', null, { addNewUserPage }); 
  });

  test('Opening the Add New User modal reveals all required fields', { tag: ['@smokeBDD', '@Smoke', '@Regression'] }, async ({ Given, When, Then, And, addNewUserPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Users Management page', null, { addNewUserPage }); 
    await And('the user clicks the ADD NEW USER button', null, { addNewUserPage }); 
    await Then('the Email field should be visible in the modal', null, { addNewUserPage }); 
    await And('the First Name field should be visible in the modal', null, { addNewUserPage }); 
    await And('the Last Name field should be visible in the modal', null, { addNewUserPage }); 
    await And('the Title field should be visible in the modal', null, { addNewUserPage }); 
    await And('the Nickname field should be visible in the modal', null, { addNewUserPage }); 
  });

  test('ADD USER button is disabled when no fields are filled', { tag: ['@smokeBDD', '@Smoke', '@Regression'] }, async ({ Given, When, Then, And, addNewUserPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Users Management page', null, { addNewUserPage }); 
    await And('the user clicks the ADD NEW USER button', null, { addNewUserPage }); 
    await Then('the ADD USER button should be disabled', null, { addNewUserPage }); 
  });

  test('ADD USER button becomes enabled after all required fields are filled', { tag: ['@smokeBDD', '@Smoke', '@Regression'] }, async ({ Given, When, Then, And, addNewUserPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Users Management page', null, { addNewUserPage }); 
    await And('the user clicks the ADD NEW USER button', null, { addNewUserPage }); 
    await And('the user fills in all new user details', null, { addNewUserPage }); 
    await Then('the ADD USER button should be enabled', null, { addNewUserPage }); 
  });

  test('Invalid email format triggers a validation error on blur', { tag: ['@smokeBDD', '@Smoke', '@Regression'] }, async ({ Given, When, Then, And, addNewUserPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Users Management page', null, { addNewUserPage }); 
    await And('the user clicks the ADD NEW USER button', null, { addNewUserPage }); 
    await And('the user enters an invalid email "not-an-email"', null, { addNewUserPage }); 
    await And('the user moves focus away from the Email field', null, { addNewUserPage }); 
    await Then('an email validation error should be displayed', null, { page }); 
  });

  test('Valid email format does not trigger a validation error', { tag: ['@smokeBDD', '@Regression'] }, async ({ Given, When, Then, And, addNewUserPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Users Management page', null, { addNewUserPage }); 
    await And('the user clicks the ADD NEW USER button', null, { addNewUserPage }); 
    await And('the user enters a valid email "testuser@example.com"', null, { addNewUserPage }); 
    await And('the user moves focus away from the Email field', null, { addNewUserPage }); 
    await Then('no email validation error should be displayed', null, { page }); 
  });

  test('Admin creates a new user successfully and sees a success notification', { tag: ['@smokeBDD', '@Smoke', '@Regression'] }, async ({ Given, When, Then, And, addNewUserPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Users Management page', null, { addNewUserPage }); 
    await And('the user clicks the ADD NEW USER button', null, { addNewUserPage }); 
    await And('the user fills in all new user details', null, { addNewUserPage }); 
    await And('the user submits the new user form', null, { addNewUserPage }); 
    await Then('a user creation success notification should be displayed', null, { page }); 
  });

  test('Users grid refreshes automatically after a new user is saved', { tag: ['@smokeBDD', '@Regression'] }, async ({ Given, When, Then, And, addNewModalLayoutsPage, addNewUserPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Users Management page', null, { addNewUserPage }); 
    await And('the user clicks the ADD NEW USER button', null, { addNewUserPage }); 
    await And('the user fills in all new user details', null, { addNewUserPage }); 
    await And('the user submits the new user form', null, { addNewUserPage }); 
    await Then('the Users grid should refresh with the new user record', null, { addNewModalLayoutsPage }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('UI-Automation\\features\\AddNewUser.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":10,"tags":["@smokeBDD","@Smoke","@Regression"],"steps":[{"pwStepLine":7,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"When the user navigates to the Users Management page","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"Then the Users AG-Grid should be visible","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"And the ADD NEW USER button should be visible","stepMatchArguments":[]}]},
  {"pwTestLine":13,"pickleLine":20,"tags":["@smokeBDD","@Smoke","@Regression"],"steps":[{"pwStepLine":14,"gherkinStepLine":21,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":22,"keywordType":"Action","textWithKeyword":"When the user navigates to the Users Management page","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":23,"keywordType":"Action","textWithKeyword":"And the user clicks the ADD NEW USER button","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"Then the Email field should be visible in the modal","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"And the First Name field should be visible in the modal","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"And the Last Name field should be visible in the modal","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":27,"keywordType":"Outcome","textWithKeyword":"And the Title field should be visible in the modal","stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":28,"keywordType":"Outcome","textWithKeyword":"And the Nickname field should be visible in the modal","stepMatchArguments":[]}]},
  {"pwTestLine":24,"pickleLine":34,"tags":["@smokeBDD","@Smoke","@Regression"],"steps":[{"pwStepLine":25,"gherkinStepLine":35,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":36,"keywordType":"Action","textWithKeyword":"When the user navigates to the Users Management page","stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":37,"keywordType":"Action","textWithKeyword":"And the user clicks the ADD NEW USER button","stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":38,"keywordType":"Outcome","textWithKeyword":"Then the ADD USER button should be disabled","stepMatchArguments":[]}]},
  {"pwTestLine":31,"pickleLine":42,"tags":["@smokeBDD","@Smoke","@Regression"],"steps":[{"pwStepLine":32,"gherkinStepLine":43,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":44,"keywordType":"Action","textWithKeyword":"When the user navigates to the Users Management page","stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":45,"keywordType":"Action","textWithKeyword":"And the user clicks the ADD NEW USER button","stepMatchArguments":[]},{"pwStepLine":35,"gherkinStepLine":46,"keywordType":"Action","textWithKeyword":"And the user fills in all new user details","stepMatchArguments":[]},{"pwStepLine":36,"gherkinStepLine":47,"keywordType":"Outcome","textWithKeyword":"Then the ADD USER button should be enabled","stepMatchArguments":[]}]},
  {"pwTestLine":39,"pickleLine":53,"tags":["@smokeBDD","@Smoke","@Regression"],"steps":[{"pwStepLine":40,"gherkinStepLine":54,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":41,"gherkinStepLine":55,"keywordType":"Action","textWithKeyword":"When the user navigates to the Users Management page","stepMatchArguments":[]},{"pwStepLine":42,"gherkinStepLine":56,"keywordType":"Action","textWithKeyword":"And the user clicks the ADD NEW USER button","stepMatchArguments":[]},{"pwStepLine":43,"gherkinStepLine":57,"keywordType":"Action","textWithKeyword":"And the user enters an invalid email \"not-an-email\"","stepMatchArguments":[{"group":{"start":33,"value":"\"not-an-email\"","children":[{"start":34,"value":"not-an-email","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":44,"gherkinStepLine":58,"keywordType":"Action","textWithKeyword":"And the user moves focus away from the Email field","stepMatchArguments":[]},{"pwStepLine":45,"gherkinStepLine":59,"keywordType":"Outcome","textWithKeyword":"Then an email validation error should be displayed","stepMatchArguments":[]}]},
  {"pwTestLine":48,"pickleLine":63,"tags":["@smokeBDD","@Regression"],"steps":[{"pwStepLine":49,"gherkinStepLine":64,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":50,"gherkinStepLine":65,"keywordType":"Action","textWithKeyword":"When the user navigates to the Users Management page","stepMatchArguments":[]},{"pwStepLine":51,"gherkinStepLine":66,"keywordType":"Action","textWithKeyword":"And the user clicks the ADD NEW USER button","stepMatchArguments":[]},{"pwStepLine":52,"gherkinStepLine":67,"keywordType":"Action","textWithKeyword":"And the user enters a valid email \"testuser@example.com\"","stepMatchArguments":[{"group":{"start":30,"value":"\"testuser@example.com\"","children":[{"start":31,"value":"testuser@example.com","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":53,"gherkinStepLine":68,"keywordType":"Action","textWithKeyword":"And the user moves focus away from the Email field","stepMatchArguments":[]},{"pwStepLine":54,"gherkinStepLine":69,"keywordType":"Outcome","textWithKeyword":"Then no email validation error should be displayed","stepMatchArguments":[]}]},
  {"pwTestLine":57,"pickleLine":75,"tags":["@smokeBDD","@Smoke","@Regression"],"steps":[{"pwStepLine":58,"gherkinStepLine":76,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":59,"gherkinStepLine":77,"keywordType":"Action","textWithKeyword":"When the user navigates to the Users Management page","stepMatchArguments":[]},{"pwStepLine":60,"gherkinStepLine":78,"keywordType":"Action","textWithKeyword":"And the user clicks the ADD NEW USER button","stepMatchArguments":[]},{"pwStepLine":61,"gherkinStepLine":79,"keywordType":"Action","textWithKeyword":"And the user fills in all new user details","stepMatchArguments":[]},{"pwStepLine":62,"gherkinStepLine":80,"keywordType":"Action","textWithKeyword":"And the user submits the new user form","stepMatchArguments":[]},{"pwStepLine":63,"gherkinStepLine":81,"keywordType":"Outcome","textWithKeyword":"Then a user creation success notification should be displayed","stepMatchArguments":[]}]},
  {"pwTestLine":66,"pickleLine":85,"tags":["@smokeBDD","@Regression"],"steps":[{"pwStepLine":67,"gherkinStepLine":86,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":68,"gherkinStepLine":87,"keywordType":"Action","textWithKeyword":"When the user navigates to the Users Management page","stepMatchArguments":[]},{"pwStepLine":69,"gherkinStepLine":88,"keywordType":"Action","textWithKeyword":"And the user clicks the ADD NEW USER button","stepMatchArguments":[]},{"pwStepLine":70,"gherkinStepLine":89,"keywordType":"Action","textWithKeyword":"And the user fills in all new user details","stepMatchArguments":[]},{"pwStepLine":71,"gherkinStepLine":90,"keywordType":"Action","textWithKeyword":"And the user submits the new user form","stepMatchArguments":[]},{"pwStepLine":72,"gherkinStepLine":91,"keywordType":"Outcome","textWithKeyword":"Then the Users grid should refresh with the new user record","stepMatchArguments":[]}]},
]; // bdd-data-end