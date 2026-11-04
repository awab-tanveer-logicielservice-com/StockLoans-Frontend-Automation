// Generated from: API-Automation\features\Logout.feature
import { test } from "../../../step-definitions/fixtures.js";

test.describe('Velocity JSON API - Logout (spec section 3, revised by specification 1.5)', () => {

  test('A logged-on client can log out', { tag: ['@Smoke', '@Regression', '@API', '@Logout', '@SLL-C1675'] }, async ({ Given, When, Then, And, api, world }) => {
    await Given('the client has no session token', null, { api, world });
    await When('the client logs on with valid credentials', null, { api, world });
    await Then('a session token should be returned', null, { api, world });
    await When('the client logs out', null, { api, world });
    await Then('the HTTP response status should be 200', null, { world });
    await And('the response should be valid JSON', null, { world });
    await And('the response should match the logout schema', null, { world });
    await And('the logout response should not carry a token', null, { world });
    await And('the logout response should not carry a timestamp', null, { world });
  });

  test('The token is genuinely invalidated, not just forgotten by the client', { tag: ['@Regression', '@API', '@Logout', '@SLL-C1676'] }, async ({ Given, When, Then, And, api, world }) => {
    await Given('the client has no session token', null, { api, world });
    await When('the client logs on with valid credentials', null, { api, world });
    await Then('a session token should be returned', null, { api, world });
    await When('the client logs out', null, { api, world });
    await Then('the HTTP response status should be 200', null, { world });
    await And('the invalidated token should be rejected on a subsequent request', null, { api, world });
  });

  test('Logging out a token the server never issued is refused', { tag: ['@Regression', '@API', '@Logout', '@Negative', '@SLL-C1677'] }, async ({ When, Then, api, world }) => {
    await When('the client logs out with a token it never held', null, { api, world });
    await Then('the HTTP response status should be 401', null, { world });
    await Then('the status message should not be empty', null, { world });
  });

  test('A logout document missing required fields is rejected', { tag: ['@Regression', '@API', '@Logout', '@Negative', '@SLL-C1678'] }, async ({ Given, When, Then, api, authedApi, world }) => {
    await Given('the client has a valid session token', null, { authedApi, world });
    await When('the client POSTs a document with only the session token to "/logout"', null, { api, world });
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
  {"pwTestLine":6,"pickleLine":15,"tags":["@Smoke","@Regression","@API","@Logout","@SLL-C1675"],"steps":[{"pwStepLine":7,"gherkinStepLine":16,"keywordType":"Context","textWithKeyword":"Given the client has no session token","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":17,"keywordType":"Action","textWithKeyword":"When the client logs on with valid credentials","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"Then a session token should be returned","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":19,"keywordType":"Action","textWithKeyword":"When the client logs out","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":12,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"And the response should be valid JSON","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"And the response should match the logout schema","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"And the logout response should not carry a token","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"And the logout response should not carry a timestamp","stepMatchArguments":[]}]},
  {"pwTestLine":18,"pickleLine":27,"tags":["@Regression","@API","@Logout","@SLL-C1676"],"steps":[{"pwStepLine":19,"gherkinStepLine":28,"keywordType":"Context","textWithKeyword":"Given the client has no session token","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":29,"keywordType":"Action","textWithKeyword":"When the client logs on with valid credentials","stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"Then a session token should be returned","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":31,"keywordType":"Action","textWithKeyword":"When the client logs out","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":24,"gherkinStepLine":33,"keywordType":"Outcome","textWithKeyword":"And the invalidated token should be rejected on a subsequent request","stepMatchArguments":[]}]},
  {"pwTestLine":27,"pickleLine":38,"tags":["@Regression","@API","@Logout","@Negative","@SLL-C1677"],"steps":[{"pwStepLine":28,"gherkinStepLine":39,"keywordType":"Action","textWithKeyword":"When the client logs out with a token it never held","stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":40,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 401","stepMatchArguments":[{"group":{"start":35,"value":"401","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":30,"gherkinStepLine":41,"keywordType":"Outcome","textWithKeyword":"Then the status message should not be empty","stepMatchArguments":[]}]},
  {"pwTestLine":33,"pickleLine":44,"tags":["@Regression","@API","@Logout","@Negative","@SLL-C1678"],"steps":[{"pwStepLine":34,"gherkinStepLine":45,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":35,"gherkinStepLine":46,"keywordType":"Action","textWithKeyword":"When the client POSTs a document with only the session token to \"/logout\"","stepMatchArguments":[{"group":{"start":59,"value":"\"/logout\"","children":[{"start":60,"value":"/logout","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":36,"gherkinStepLine":47,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 400","stepMatchArguments":[{"group":{"start":35,"value":"400","children":[]},"parameterTypeName":"int"}]}]},
]; // bdd-data-end