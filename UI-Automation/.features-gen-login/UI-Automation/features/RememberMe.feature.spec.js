// Generated from: UI-Automation\features\RememberMe.feature
import { test } from "../../../step-definitions/fixtures.js";

test.describe('Remember Me Functionality in Login Component (SLL-171)', () => {

  test('Remember Me checkbox is visible on the login page', { tag: ['@Smoke', '@Regression', '@SLL-171'] }, async ({ Given, Then, page, rememberMePage }) => { 
    await Given('the user is on the login page', null, { page, rememberMePage }); 
    await Then('the Remember Me checkbox should be visible on the login form', null, { rememberMePage }); 
  });

  test('Remember Me checkbox is unchecked by default', { tag: ['@Smoke', '@Regression', '@SLL-171'] }, async ({ Given, Then, page, rememberMePage }) => { 
    await Given('the user is on the login page', null, { page, rememberMePage }); 
    await Then('the Remember Me checkbox should be unchecked by default', null, { rememberMePage }); 
  });

  test('User checks Remember Me and logs in — credentials are populated on next visit', { tag: ['@Smoke', '@Regression', '@SLL-171'] }, async ({ Given, When, Then, And, page, rememberMePage, testUsers }) => { 
    await Given('the user is on the login page', null, { page, rememberMePage }); 
    await When('the user enters a valid email address', null, { rememberMePage, testUsers }); 
    await And('the user enters a valid password', null, { rememberMePage, testUsers }); 
    await And('the user checks the Remember Me checkbox', null, { rememberMePage }); 
    await And('the user clicks the Login button', null, { rememberMePage }); 
    await And('the user logs out and navigates back to the login page', null, { rememberMePage }); 
    await Then('the Email field should be automatically populated with the saved email', null, { rememberMePage }); 
    await And('the Password field should be automatically populated with the saved password', null, { rememberMePage }); 
  });

  test('Remember Me checkbox is checked on return visit when credentials were previously saved', { tag: ['@Smoke', '@Regression', '@SLL-171'] }, async ({ Given, When, Then, And, page, rememberMePage, testUsers }) => { 
    await Given('the user previously logged in with Remember Me enabled', null, { page, rememberMePage, testUsers }); 
    await When('the user navigates back to the login page', null, { rememberMePage }); 
    await Then('the Remember Me checkbox should be checked', null, { rememberMePage }); 
    await And('the login fields should be pre-filled with the stored credentials', null, { rememberMePage }); 
  });

  test('User with pre-filled credentials can log in immediately without re-entering details', { tag: ['@Smoke', '@Regression', '@SLL-171'] }, async ({ Given, When, Then, page, rememberMePage, testUsers }) => { 
    await Given('the user previously logged in with Remember Me enabled', null, { page, rememberMePage, testUsers }); 
    await When('the user navigates back to the login page', null, { rememberMePage }); 
    await Then('the login fields should be pre-filled', null, { rememberMePage }); 
    await When('the user clicks the Login button', null, { rememberMePage }); 
    await Then('the user should be authenticated and redirected to the dashboard', null, { rememberMePage }); 
  });

  test('User logs in without checking Remember Me — credentials are not saved', { tag: ['@Smoke', '@Regression', '@SLL-171'] }, async ({ Given, When, Then, And, page, rememberMePage, testUsers }) => { 
    await Given('the user is on the login page', null, { page, rememberMePage }); 
    await When('the user enters a valid email address', null, { rememberMePage, testUsers }); 
    await And('the user enters a valid password', null, { rememberMePage, testUsers }); 
    await And('the Remember Me checkbox is unchecked', null, { rememberMePage }); 
    await And('the user clicks the Login button', null, { rememberMePage }); 
    await And('the user logs out and navigates back to the login page', null, { rememberMePage }); 
    await Then('the Email field should be empty', null, { rememberMePage }); 
    await And('the Password field should be empty', null, { rememberMePage }); 
  });

  test('Remember Me checkbox remains unchecked on return visit when not previously enabled', { tag: ['@Regression', '@SLL-171'] }, async ({ Given, When, Then, And, page, rememberMePage, testUsers }) => { 
    await Given('the user previously logged in without enabling Remember Me', null, { page, rememberMePage, testUsers }); 
    await When('the user navigates back to the login page', null, { rememberMePage }); 
    await Then('the Remember Me checkbox should be unchecked', null, { rememberMePage }); 
    await And('the login fields should be empty', null, { rememberMePage }); 
  });

  test('Credentials are stored in localStorage when Remember Me is enabled', { tag: ['@Smoke', '@Regression', '@SLL-171'] }, async ({ Given, When, Then, And, page, rememberMePage, testUsers }) => { 
    await Given('the user is on the login page', null, { page, rememberMePage }); 
    await When('the user enters valid credentials', null, { rememberMePage, testUsers }); 
    await And('the user checks the Remember Me checkbox', null, { rememberMePage }); 
    await And('the user clicks the Login button', null, { rememberMePage }); 
    await Then('the credentials should be stored in localStorage', null, { rememberMePage }); 
  });

  test('Credentials are not stored in localStorage when Remember Me is disabled', { tag: ['@Smoke', '@Regression', '@SLL-171'] }, async ({ Given, When, Then, And, page, rememberMePage, testUsers }) => { 
    await Given('the user is on the login page', null, { page, rememberMePage }); 
    await When('the user enters valid credentials', null, { rememberMePage, testUsers }); 
    await And('the Remember Me checkbox is unchecked', null, { rememberMePage }); 
    await And('the user clicks the Login button', null, { rememberMePage }); 
    await Then('no credentials should be stored in localStorage', null, { rememberMePage }); 
  });

  test('Stored credentials are cleared when the user unchecks Remember Me and logs in', { tag: ['@Smoke', '@Regression', '@SLL-171'] }, async ({ Given, When, Then, And, page, rememberMePage, testUsers }) => { 
    await Given('the user previously logged in with Remember Me enabled', null, { page, rememberMePage, testUsers }); 
    await And('the user navigates back to the login page with pre-filled credentials', null, { rememberMePage }); 
    await When('the user unchecks the Remember Me checkbox', null, { rememberMePage }); 
    await And('the user clicks the Login button', null, { rememberMePage }); 
    await And('the user logs out and navigates back to the login page', null, { rememberMePage }); 
    await Then('the Email field should be empty', null, { rememberMePage }); 
    await And('the Password field should be empty', null, { rememberMePage }); 
    await And('no credentials should remain in localStorage', null, { rememberMePage }); 
  });

  test('Stored credentials are cleared when the user manually unchecks Remember Me without logging in', { tag: ['@Regression', '@SLL-171'] }, async ({ Given, When, Then, page, rememberMePage, testUsers }) => { 
    await Given('the user navigates to the login page with pre-filled credentials from a previous Remember Me session', null, { page, rememberMePage, testUsers }); 
    await When('the user unchecks the Remember Me checkbox', null, { rememberMePage }); 
    await Then('the Remember Me checkbox should be unchecked', null, { rememberMePage }); 
  });

  test('Both email and password fields are auto-populated when Remember Me was previously enabled', { tag: ['@Smoke', '@Regression', '@SLL-171'] }, async ({ Given, When, Then, page, rememberMePage, testUsers }) => { 
    await Given('the user previously logged in with Remember Me enabled', null, { page, rememberMePage, testUsers }); 
    await When('the user navigates to the login page', null, { rememberMePage }); 
    await Then('both the Email and Password fields should be auto-populated with the saved values', null, { rememberMePage }); 
  });

  test('Auto-populated credentials can be edited before submitting login', { tag: ['@Regression', '@SLL-171'] }, async ({ Given, When, Then, And, page, rememberMePage, testUsers }) => { 
    await Given('the user navigates to the login page with pre-filled credentials from a previous Remember Me session', null, { page, rememberMePage, testUsers }); 
    await When('the user clears the Email field and enters a different email', null, { rememberMePage }); 
    await And('the user clicks the Login button using the pre-filled credentials', null, { rememberMePage }); 
    await Then('the login should be attempted with the newly entered email', null, { rememberMePage }); 
  });

  test('Auto-populated password field remains masked', { tag: ['@Regression', '@SLL-171'] }, async ({ Given, When, Then, page, rememberMePage, testUsers }) => { 
    await Given('the user previously logged in with Remember Me enabled', null, { page, rememberMePage, testUsers }); 
    await When('the user navigates back to the login page', null, { rememberMePage }); 
    await Then('the auto-populated password should be displayed as masked characters', null, { rememberMePage }); 
  });

  test('Logging in with Remember Me overwrites previously saved credentials for a different user', { tag: ['@Regression', '@SLL-171'] }, async ({ Given, When, Then, And, page, rememberMePage, testUsers }) => { 
    await Given('a previous user\'s credentials are saved in localStorage via Remember Me', null, { page, rememberMePage }); 
    await When('a new user logs in with Remember Me enabled using different credentials', null, { rememberMePage, testUsers }); 
    await And('the new user logs out and navigates back to the login page', null, { rememberMePage }); 
    await Then('the login fields should be populated with the new user\'s credentials only', null, { rememberMePage, testUsers }); 
  });

  test('Remember Me does not bypass Firebase Authentication — valid credentials are still required', { tag: ['@Smoke', '@Regression', '@SLL-171'] }, async ({ Given, When, Then, And, page, rememberMePage, testUsers }) => { 
    await Given('the user navigates to the login page with pre-filled credentials from a previous Remember Me session', null, { page, rememberMePage, testUsers }); 
    await When('the user clicks the Login button', null, { rememberMePage }); 
    await Then('the login should still be authenticated via Firebase', null, { rememberMePage }); 
    await And('access should only be granted if the credentials are valid', null, { rememberMePage }); 
  });

  test('Full lifecycle — login with Remember Me, logout, return and verify pre-fill, uncheck and verify cleared', { tag: ['@Smoke', '@Regression', '@SLL-171'] }, async ({ Given, When, Then, And, loginPage, page, rememberMePage, testUsers }) => { 
    await Given('the user navigates to the application', null, { loginPage, page }); 
    await Then('the login page should be displayed', null, { rememberMePage }); 
    await When('the user enters a valid email address', null, { rememberMePage, testUsers }); 
    await And('the user enters a valid password', null, { rememberMePage, testUsers }); 
    await And('the user checks the Remember Me checkbox', null, { rememberMePage }); 
    await And('the user clicks the Login button', null, { rememberMePage }); 
    await Then('the user should be authenticated and redirected to the dashboard', null, { rememberMePage }); 
    await When('the user logs out', null, { rememberMePage }); 
    await Then('the user should be on the login page', null, { rememberMePage }); 
    await And('the Email and Password fields should be pre-filled with the saved credentials', null, { rememberMePage }); 
    await And('the Remember Me checkbox should be checked', null, { rememberMePage }); 
    await When('the user unchecks the Remember Me checkbox', null, { rememberMePage }); 
    await And('the user logs in again', null, { rememberMePage, testUsers }); 
    await And('the user logs out and navigates back to the login page', null, { rememberMePage }); 
    await Then('the Email field should be empty', null, { rememberMePage }); 
    await And('the Password field should be empty', null, { rememberMePage }); 
    await And('the Remember Me checkbox should be unchecked', null, { rememberMePage }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('UI-Automation\\features\\RememberMe.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":10,"tags":["@Smoke","@Regression","@SLL-171"],"steps":[{"pwStepLine":7,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given the user is on the login page","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"Then the Remember Me checkbox should be visible on the login form","stepMatchArguments":[]}]},
  {"pwTestLine":11,"pickleLine":16,"tags":["@Smoke","@Regression","@SLL-171"],"steps":[{"pwStepLine":12,"gherkinStepLine":17,"keywordType":"Context","textWithKeyword":"Given the user is on the login page","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"Then the Remember Me checkbox should be unchecked by default","stepMatchArguments":[]}]},
  {"pwTestLine":16,"pickleLine":22,"tags":["@Smoke","@Regression","@SLL-171"],"steps":[{"pwStepLine":17,"gherkinStepLine":23,"keywordType":"Context","textWithKeyword":"Given the user is on the login page","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":24,"keywordType":"Action","textWithKeyword":"When the user enters a valid email address","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":25,"keywordType":"Action","textWithKeyword":"And the user enters a valid password","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":26,"keywordType":"Action","textWithKeyword":"And the user checks the Remember Me checkbox","stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":27,"keywordType":"Action","textWithKeyword":"And the user clicks the Login button","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":28,"keywordType":"Action","textWithKeyword":"And the user logs out and navigates back to the login page","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"Then the Email field should be automatically populated with the saved email","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"And the Password field should be automatically populated with the saved password","stepMatchArguments":[]}]},
  {"pwTestLine":27,"pickleLine":34,"tags":["@Smoke","@Regression","@SLL-171"],"steps":[{"pwStepLine":28,"gherkinStepLine":35,"keywordType":"Context","textWithKeyword":"Given the user previously logged in with Remember Me enabled","stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":36,"keywordType":"Action","textWithKeyword":"When the user navigates back to the login page","stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":37,"keywordType":"Outcome","textWithKeyword":"Then the Remember Me checkbox should be checked","stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":38,"keywordType":"Outcome","textWithKeyword":"And the login fields should be pre-filled with the stored credentials","stepMatchArguments":[]}]},
  {"pwTestLine":34,"pickleLine":42,"tags":["@Smoke","@Regression","@SLL-171"],"steps":[{"pwStepLine":35,"gherkinStepLine":43,"keywordType":"Context","textWithKeyword":"Given the user previously logged in with Remember Me enabled","stepMatchArguments":[]},{"pwStepLine":36,"gherkinStepLine":44,"keywordType":"Action","textWithKeyword":"When the user navigates back to the login page","stepMatchArguments":[]},{"pwStepLine":37,"gherkinStepLine":45,"keywordType":"Outcome","textWithKeyword":"Then the login fields should be pre-filled","stepMatchArguments":[]},{"pwStepLine":38,"gherkinStepLine":46,"keywordType":"Action","textWithKeyword":"When the user clicks the Login button","stepMatchArguments":[]},{"pwStepLine":39,"gherkinStepLine":47,"keywordType":"Outcome","textWithKeyword":"Then the user should be authenticated and redirected to the dashboard","stepMatchArguments":[]}]},
  {"pwTestLine":42,"pickleLine":53,"tags":["@Smoke","@Regression","@SLL-171"],"steps":[{"pwStepLine":43,"gherkinStepLine":54,"keywordType":"Context","textWithKeyword":"Given the user is on the login page","stepMatchArguments":[]},{"pwStepLine":44,"gherkinStepLine":55,"keywordType":"Action","textWithKeyword":"When the user enters a valid email address","stepMatchArguments":[]},{"pwStepLine":45,"gherkinStepLine":56,"keywordType":"Action","textWithKeyword":"And the user enters a valid password","stepMatchArguments":[]},{"pwStepLine":46,"gherkinStepLine":57,"keywordType":"Action","textWithKeyword":"And the Remember Me checkbox is unchecked","stepMatchArguments":[]},{"pwStepLine":47,"gherkinStepLine":58,"keywordType":"Action","textWithKeyword":"And the user clicks the Login button","stepMatchArguments":[]},{"pwStepLine":48,"gherkinStepLine":59,"keywordType":"Action","textWithKeyword":"And the user logs out and navigates back to the login page","stepMatchArguments":[]},{"pwStepLine":49,"gherkinStepLine":60,"keywordType":"Outcome","textWithKeyword":"Then the Email field should be empty","stepMatchArguments":[]},{"pwStepLine":50,"gherkinStepLine":61,"keywordType":"Outcome","textWithKeyword":"And the Password field should be empty","stepMatchArguments":[]}]},
  {"pwTestLine":53,"pickleLine":65,"tags":["@Regression","@SLL-171"],"steps":[{"pwStepLine":54,"gherkinStepLine":66,"keywordType":"Context","textWithKeyword":"Given the user previously logged in without enabling Remember Me","stepMatchArguments":[]},{"pwStepLine":55,"gherkinStepLine":67,"keywordType":"Action","textWithKeyword":"When the user navigates back to the login page","stepMatchArguments":[]},{"pwStepLine":56,"gherkinStepLine":68,"keywordType":"Outcome","textWithKeyword":"Then the Remember Me checkbox should be unchecked","stepMatchArguments":[]},{"pwStepLine":57,"gherkinStepLine":69,"keywordType":"Outcome","textWithKeyword":"And the login fields should be empty","stepMatchArguments":[]}]},
  {"pwTestLine":60,"pickleLine":75,"tags":["@Smoke","@Regression","@SLL-171"],"steps":[{"pwStepLine":61,"gherkinStepLine":76,"keywordType":"Context","textWithKeyword":"Given the user is on the login page","stepMatchArguments":[]},{"pwStepLine":62,"gherkinStepLine":77,"keywordType":"Action","textWithKeyword":"When the user enters valid credentials","stepMatchArguments":[]},{"pwStepLine":63,"gherkinStepLine":78,"keywordType":"Action","textWithKeyword":"And the user checks the Remember Me checkbox","stepMatchArguments":[]},{"pwStepLine":64,"gherkinStepLine":79,"keywordType":"Action","textWithKeyword":"And the user clicks the Login button","stepMatchArguments":[]},{"pwStepLine":65,"gherkinStepLine":80,"keywordType":"Outcome","textWithKeyword":"Then the credentials should be stored in localStorage","stepMatchArguments":[]}]},
  {"pwTestLine":68,"pickleLine":84,"tags":["@Smoke","@Regression","@SLL-171"],"steps":[{"pwStepLine":69,"gherkinStepLine":85,"keywordType":"Context","textWithKeyword":"Given the user is on the login page","stepMatchArguments":[]},{"pwStepLine":70,"gherkinStepLine":86,"keywordType":"Action","textWithKeyword":"When the user enters valid credentials","stepMatchArguments":[]},{"pwStepLine":71,"gherkinStepLine":87,"keywordType":"Action","textWithKeyword":"And the Remember Me checkbox is unchecked","stepMatchArguments":[]},{"pwStepLine":72,"gherkinStepLine":88,"keywordType":"Action","textWithKeyword":"And the user clicks the Login button","stepMatchArguments":[]},{"pwStepLine":73,"gherkinStepLine":89,"keywordType":"Outcome","textWithKeyword":"Then no credentials should be stored in localStorage","stepMatchArguments":[]}]},
  {"pwTestLine":76,"pickleLine":93,"tags":["@Smoke","@Regression","@SLL-171"],"steps":[{"pwStepLine":77,"gherkinStepLine":94,"keywordType":"Context","textWithKeyword":"Given the user previously logged in with Remember Me enabled","stepMatchArguments":[]},{"pwStepLine":78,"gherkinStepLine":95,"keywordType":"Context","textWithKeyword":"And the user navigates back to the login page with pre-filled credentials","stepMatchArguments":[]},{"pwStepLine":79,"gherkinStepLine":96,"keywordType":"Action","textWithKeyword":"When the user unchecks the Remember Me checkbox","stepMatchArguments":[]},{"pwStepLine":80,"gherkinStepLine":97,"keywordType":"Action","textWithKeyword":"And the user clicks the Login button","stepMatchArguments":[]},{"pwStepLine":81,"gherkinStepLine":98,"keywordType":"Action","textWithKeyword":"And the user logs out and navigates back to the login page","stepMatchArguments":[]},{"pwStepLine":82,"gherkinStepLine":99,"keywordType":"Outcome","textWithKeyword":"Then the Email field should be empty","stepMatchArguments":[]},{"pwStepLine":83,"gherkinStepLine":100,"keywordType":"Outcome","textWithKeyword":"And the Password field should be empty","stepMatchArguments":[]},{"pwStepLine":84,"gherkinStepLine":101,"keywordType":"Outcome","textWithKeyword":"And no credentials should remain in localStorage","stepMatchArguments":[]}]},
  {"pwTestLine":87,"pickleLine":105,"tags":["@Regression","@SLL-171"],"steps":[{"pwStepLine":88,"gherkinStepLine":106,"keywordType":"Context","textWithKeyword":"Given the user navigates to the login page with pre-filled credentials from a previous Remember Me session","stepMatchArguments":[]},{"pwStepLine":89,"gherkinStepLine":107,"keywordType":"Action","textWithKeyword":"When the user unchecks the Remember Me checkbox","stepMatchArguments":[]},{"pwStepLine":90,"gherkinStepLine":108,"keywordType":"Outcome","textWithKeyword":"Then the Remember Me checkbox should be unchecked","stepMatchArguments":[]}]},
  {"pwTestLine":93,"pickleLine":114,"tags":["@Smoke","@Regression","@SLL-171"],"steps":[{"pwStepLine":94,"gherkinStepLine":115,"keywordType":"Context","textWithKeyword":"Given the user previously logged in with Remember Me enabled","stepMatchArguments":[]},{"pwStepLine":95,"gherkinStepLine":116,"keywordType":"Action","textWithKeyword":"When the user navigates to the login page","stepMatchArguments":[]},{"pwStepLine":96,"gherkinStepLine":117,"keywordType":"Outcome","textWithKeyword":"Then both the Email and Password fields should be auto-populated with the saved values","stepMatchArguments":[]}]},
  {"pwTestLine":99,"pickleLine":121,"tags":["@Regression","@SLL-171"],"steps":[{"pwStepLine":100,"gherkinStepLine":122,"keywordType":"Context","textWithKeyword":"Given the user navigates to the login page with pre-filled credentials from a previous Remember Me session","stepMatchArguments":[]},{"pwStepLine":101,"gherkinStepLine":123,"keywordType":"Action","textWithKeyword":"When the user clears the Email field and enters a different email","stepMatchArguments":[]},{"pwStepLine":102,"gherkinStepLine":124,"keywordType":"Action","textWithKeyword":"And the user clicks the Login button using the pre-filled credentials","stepMatchArguments":[]},{"pwStepLine":103,"gherkinStepLine":125,"keywordType":"Outcome","textWithKeyword":"Then the login should be attempted with the newly entered email","stepMatchArguments":[]}]},
  {"pwTestLine":106,"pickleLine":129,"tags":["@Regression","@SLL-171"],"steps":[{"pwStepLine":107,"gherkinStepLine":130,"keywordType":"Context","textWithKeyword":"Given the user previously logged in with Remember Me enabled","stepMatchArguments":[]},{"pwStepLine":108,"gherkinStepLine":131,"keywordType":"Action","textWithKeyword":"When the user navigates back to the login page","stepMatchArguments":[]},{"pwStepLine":109,"gherkinStepLine":132,"keywordType":"Outcome","textWithKeyword":"Then the auto-populated password should be displayed as masked characters","stepMatchArguments":[]}]},
  {"pwTestLine":112,"pickleLine":138,"tags":["@Regression","@SLL-171"],"steps":[{"pwStepLine":113,"gherkinStepLine":139,"keywordType":"Context","textWithKeyword":"Given a previous user's credentials are saved in localStorage via Remember Me","stepMatchArguments":[]},{"pwStepLine":114,"gherkinStepLine":140,"keywordType":"Action","textWithKeyword":"When a new user logs in with Remember Me enabled using different credentials","stepMatchArguments":[]},{"pwStepLine":115,"gherkinStepLine":141,"keywordType":"Action","textWithKeyword":"And the new user logs out and navigates back to the login page","stepMatchArguments":[]},{"pwStepLine":116,"gherkinStepLine":142,"keywordType":"Outcome","textWithKeyword":"Then the login fields should be populated with the new user's credentials only","stepMatchArguments":[]}]},
  {"pwTestLine":119,"pickleLine":148,"tags":["@Smoke","@Regression","@SLL-171"],"steps":[{"pwStepLine":120,"gherkinStepLine":149,"keywordType":"Context","textWithKeyword":"Given the user navigates to the login page with pre-filled credentials from a previous Remember Me session","stepMatchArguments":[]},{"pwStepLine":121,"gherkinStepLine":150,"keywordType":"Action","textWithKeyword":"When the user clicks the Login button","stepMatchArguments":[]},{"pwStepLine":122,"gherkinStepLine":151,"keywordType":"Outcome","textWithKeyword":"Then the login should still be authenticated via Firebase","stepMatchArguments":[]},{"pwStepLine":123,"gherkinStepLine":152,"keywordType":"Outcome","textWithKeyword":"And access should only be granted if the credentials are valid","stepMatchArguments":[]}]},
  {"pwTestLine":126,"pickleLine":158,"tags":["@Smoke","@Regression","@SLL-171"],"steps":[{"pwStepLine":127,"gherkinStepLine":159,"keywordType":"Context","textWithKeyword":"Given the user navigates to the application","stepMatchArguments":[]},{"pwStepLine":128,"gherkinStepLine":160,"keywordType":"Outcome","textWithKeyword":"Then the login page should be displayed","stepMatchArguments":[]},{"pwStepLine":129,"gherkinStepLine":161,"keywordType":"Action","textWithKeyword":"When the user enters a valid email address","stepMatchArguments":[]},{"pwStepLine":130,"gherkinStepLine":162,"keywordType":"Action","textWithKeyword":"And the user enters a valid password","stepMatchArguments":[]},{"pwStepLine":131,"gherkinStepLine":163,"keywordType":"Action","textWithKeyword":"And the user checks the Remember Me checkbox","stepMatchArguments":[]},{"pwStepLine":132,"gherkinStepLine":164,"keywordType":"Action","textWithKeyword":"And the user clicks the Login button","stepMatchArguments":[]},{"pwStepLine":133,"gherkinStepLine":165,"keywordType":"Outcome","textWithKeyword":"Then the user should be authenticated and redirected to the dashboard","stepMatchArguments":[]},{"pwStepLine":134,"gherkinStepLine":166,"keywordType":"Action","textWithKeyword":"When the user logs out","stepMatchArguments":[]},{"pwStepLine":135,"gherkinStepLine":167,"keywordType":"Outcome","textWithKeyword":"Then the user should be on the login page","stepMatchArguments":[]},{"pwStepLine":136,"gherkinStepLine":168,"keywordType":"Outcome","textWithKeyword":"And the Email and Password fields should be pre-filled with the saved credentials","stepMatchArguments":[]},{"pwStepLine":137,"gherkinStepLine":169,"keywordType":"Outcome","textWithKeyword":"And the Remember Me checkbox should be checked","stepMatchArguments":[]},{"pwStepLine":138,"gherkinStepLine":170,"keywordType":"Action","textWithKeyword":"When the user unchecks the Remember Me checkbox","stepMatchArguments":[]},{"pwStepLine":139,"gherkinStepLine":171,"keywordType":"Action","textWithKeyword":"And the user logs in again","stepMatchArguments":[]},{"pwStepLine":140,"gherkinStepLine":172,"keywordType":"Action","textWithKeyword":"And the user logs out and navigates back to the login page","stepMatchArguments":[]},{"pwStepLine":141,"gherkinStepLine":173,"keywordType":"Outcome","textWithKeyword":"Then the Email field should be empty","stepMatchArguments":[]},{"pwStepLine":142,"gherkinStepLine":174,"keywordType":"Outcome","textWithKeyword":"And the Password field should be empty","stepMatchArguments":[]},{"pwStepLine":143,"gherkinStepLine":175,"keywordType":"Outcome","textWithKeyword":"And the Remember Me checkbox should be unchecked","stepMatchArguments":[]}]},
]; // bdd-data-end