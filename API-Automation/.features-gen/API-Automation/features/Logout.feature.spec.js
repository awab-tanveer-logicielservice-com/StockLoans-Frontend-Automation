// Generated from: API-Automation\features\Logout.feature
import { test } from "../../../step-definitions/fixtures.js";

test.describe('Velocity JSON API - Logout (spec 1.4)', () => {

  test('A logged-on client can log out', { tag: ['@Smoke', '@Regression', '@API', '@Logout'] }, async ({ Given, When, Then, And, api, world }) => { 
    await Given('the client has no session token', null, { api, world }); 
    await When('the client logs on with valid credentials', null, { api, world }); 
    await Then('a session token should be returned', null, { api, world }); 
    await When('the client logs out', null, { api, world }); 
    await Then('the HTTP response status should be 200', null, { world }); 
    await And('the response should be valid JSON', null, { world }); 
    await And('the response should match the logout schema', null, { world }); 
    await And('the logout response should not carry a token', null, { world }); 
  });

  test('The token is genuinely invalidated, not just forgotten by the client', { tag: ['@Regression', '@API', '@Logout'] }, async ({ Given, When, Then, And, api, world }) => { 
    await Given('the client has no session token', null, { api, world }); 
    await When('the client logs on with valid credentials', null, { api, world }); 
    await Then('a session token should be returned', null, { api, world }); 
    await When('the client logs out', null, { api, world }); 
    await Then('the HTTP response status should be 200', null, { world }); 
    await And('the invalidated token should be rejected on a subsequent request', null, { api, world }); 
  });

  test('Logging out a token the server never issued is refused', { tag: ['@Regression', '@API', '@Logout', '@Negative'] }, async ({ When, Then, api, world }) => { 
    await When('the client logs out with a token it never held', null, { api, world }); 
    await Then('the status message should not be empty', null, { world }); 
  });

  test('A logout document missing required fields is rejected', { tag: ['@Regression', '@API', '@Logout', '@Negative'] }, async ({ When, Then, api, world }) => { 
    await When('the client POSTs an empty document to "/logout"', null, { api, world }); 
    await Then('the HTTP response status should be 400', null, { world }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('API-Automation\\features\\Logout.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":13,"tags":["@Smoke","@Regression","@API","@Logout"],"steps":[{"pwStepLine":7,"gherkinStepLine":14,"keywordType":"Context","textWithKeyword":"Given the client has no session token","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":15,"keywordType":"Action","textWithKeyword":"When the client logs on with valid credentials","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"Then a session token should be returned","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":17,"keywordType":"Action","textWithKeyword":"When the client logs out","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":12,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"And the response should be valid JSON","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"And the response should match the logout schema","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"And the logout response should not carry a token","stepMatchArguments":[]}]},
  {"pwTestLine":17,"pickleLine":24,"tags":["@Regression","@API","@Logout"],"steps":[{"pwStepLine":18,"gherkinStepLine":25,"keywordType":"Context","textWithKeyword":"Given the client has no session token","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":26,"keywordType":"Action","textWithKeyword":"When the client logs on with valid credentials","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":27,"keywordType":"Outcome","textWithKeyword":"Then a session token should be returned","stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":28,"keywordType":"Action","textWithKeyword":"When the client logs out","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":23,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"And the invalidated token should be rejected on a subsequent request","stepMatchArguments":[]}]},
  {"pwTestLine":26,"pickleLine":35,"tags":["@Regression","@API","@Logout","@Negative"],"steps":[{"pwStepLine":27,"gherkinStepLine":36,"keywordType":"Action","textWithKeyword":"When the client logs out with a token it never held","stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":37,"keywordType":"Outcome","textWithKeyword":"Then the status message should not be empty","stepMatchArguments":[]}]},
  {"pwTestLine":31,"pickleLine":40,"tags":["@Regression","@API","@Logout","@Negative"],"steps":[{"pwStepLine":32,"gherkinStepLine":41,"keywordType":"Action","textWithKeyword":"When the client POSTs an empty document to \"/logout\"","stepMatchArguments":[{"group":{"start":38,"value":"\"/logout\"","children":[{"start":39,"value":"/logout","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":33,"gherkinStepLine":42,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 400","stepMatchArguments":[{"group":{"start":35,"value":"400","children":[]},"parameterTypeName":"int"}]}]},
]; // bdd-data-end