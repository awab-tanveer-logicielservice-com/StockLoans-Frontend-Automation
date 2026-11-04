// Generated from: API-Automation\features\Logon.feature
import { test } from "../../../step-definitions/fixtures.js";

test.describe('Velocity JSON API - Logon (spec section 3)', () => {

  test('Valid credentials return a session token', { tag: ['@Smoke', '@Regression', '@API', '@Logon', '@SLL-C1667'] }, async ({ Given, When, Then, And, api, world }) => {
    await Given('the client has no session token', null, { api, world });
    await When('the client logs on with valid credentials', null, { api, world });
    await Then('the HTTP response status should be 200', null, { world });
    await And('the response should be valid JSON', null, { world });
    await And('the response should match the logon schema', null, { world });
    await And('a session token should be returned', null, { api, world });
    await And('the returned user should match the requested user', null, { world });
  });

  test('Logon response carries the mandated JSON content type', { tag: ['@Regression', '@API', '@Logon', '@SLL-C1668'] }, async ({ Given, When, Then, And, api, world }) => {
    await Given('the client has no session token', null, { api, world });
    await When('the client logs on with valid credentials', null, { api, world });
    await Then('the HTTP response status should be 200', null, { world });
    await And('the response Content-Type header should be "application/json;charset=utf-8"', null, { world });
  });

  test('The optional callbackUrl field is accepted', { tag: ['@Regression', '@API', '@Logon', '@SLL-C1669'] }, async ({ Given, When, Then, And, api, world }) => {
    await Given('the client has no session token', null, { api, world });
    await When('the client logs on with a callbackUrl', null, { api, world });
    await Then('the HTTP response status should be 200', null, { world });
    await And('the response should match the logon schema', null, { world });
    await And('a session token should be returned', null, { api, world });
  });

  test('Re-logging on issues a fresh token at any time', { tag: ['@Regression', '@API', '@Logon', '@SLL-C1670'] }, async ({ Given, When, Then, And, api, world }) => {
    await Given('the client has no session token', null, { api, world });
    await When('the client logs on with valid credentials', null, { api, world });
    await Then('a session token should be returned', null, { api, world });
    await When('the client logs on again', null, { api, world });
    await Then('the HTTP response status should be 200', null, { world });
    await And('a session token should be returned', null, { api, world });
    await And('the new token should differ from the previous token', null, { world });
  });

  test('A wrong password is refused and no token is issued', { tag: ['@Regression', '@API', '@Logon', '@Negative', '@SLL-C1671'] }, async ({ Given, When, Then, And, api, world }) => {
    await Given('the client has no session token', null, { api, world });
    await When('the client logs on with an invalid password', null, { api, world });
    await Then('no session token should be returned', null, { world });
    await And('the status message should not be empty', null, { world });
  });

  test('An unknown user is refused and no token is issued', { tag: ['@Regression', '@API', '@Logon', '@Negative', '@SLL-C1672'] }, async ({ Given, When, Then, And, api, world }) => {
    await Given('the client has no session token', null, { api, world });
    await When('the client logs on with an unknown user', null, { api, world });
    await Then('no session token should be returned', null, { world });
    await And('the status message should not be empty', null, { world });
  });

  test('A logon document missing required fields is rejected', { tag: ['@Regression', '@API', '@Logon', '@Negative', '@SLL-C1673'] }, async ({ When, Then, api, world }) => {
    await When('the client POSTs an empty document to "/logon"', null, { api, world });
    await Then('the HTTP response status should be 500', null, { world });
  });

  test('A malformed JSON document is rejected', { tag: ['@Regression', '@API', '@Logon', '@Negative', '@SLL-C1674'] }, async ({ When, Then, api, world }) => {
    await When('the client POSTs the following document to "/logon":', {"docString":{"content":"{\"user\": \"someone\", \"password\":}"}}, { api, world });
    await Then('the HTTP response status should be 401', null, { world });
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('API-Automation\\features\\Logon.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":13,"tags":["@Smoke","@Regression","@API","@Logon","@SLL-C1667"],"steps":[{"pwStepLine":7,"gherkinStepLine":14,"keywordType":"Context","textWithKeyword":"Given the client has no session token","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":15,"keywordType":"Action","textWithKeyword":"When the client logs on with valid credentials","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":10,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"And the response should be valid JSON","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"And the response should match the logon schema","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"And a session token should be returned","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"And the returned user should match the requested user","stepMatchArguments":[]}]},
  {"pwTestLine":16,"pickleLine":23,"tags":["@Regression","@API","@Logon","@SLL-C1668"],"steps":[{"pwStepLine":17,"gherkinStepLine":24,"keywordType":"Context","textWithKeyword":"Given the client has no session token","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":25,"keywordType":"Action","textWithKeyword":"When the client logs on with valid credentials","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":20,"gherkinStepLine":27,"keywordType":"Outcome","textWithKeyword":"And the response Content-Type header should be \"application/json;charset=utf-8\"","stepMatchArguments":[{"group":{"start":43,"value":"\"application/json;charset=utf-8\"","children":[{"start":44,"value":"application/json;charset=utf-8","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":23,"pickleLine":30,"tags":["@Regression","@API","@Logon","@SLL-C1669"],"steps":[{"pwStepLine":24,"gherkinStepLine":31,"keywordType":"Context","textWithKeyword":"Given the client has no session token","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":32,"keywordType":"Action","textWithKeyword":"When the client logs on with a callbackUrl","stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":33,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":27,"gherkinStepLine":34,"keywordType":"Outcome","textWithKeyword":"And the response should match the logon schema","stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":35,"keywordType":"Outcome","textWithKeyword":"And a session token should be returned","stepMatchArguments":[]}]},
  {"pwTestLine":31,"pickleLine":38,"tags":["@Regression","@API","@Logon","@SLL-C1670"],"steps":[{"pwStepLine":32,"gherkinStepLine":39,"keywordType":"Context","textWithKeyword":"Given the client has no session token","stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":40,"keywordType":"Action","textWithKeyword":"When the client logs on with valid credentials","stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":41,"keywordType":"Outcome","textWithKeyword":"Then a session token should be returned","stepMatchArguments":[]},{"pwStepLine":35,"gherkinStepLine":42,"keywordType":"Action","textWithKeyword":"When the client logs on again","stepMatchArguments":[]},{"pwStepLine":36,"gherkinStepLine":43,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":37,"gherkinStepLine":44,"keywordType":"Outcome","textWithKeyword":"And a session token should be returned","stepMatchArguments":[]},{"pwStepLine":38,"gherkinStepLine":45,"keywordType":"Outcome","textWithKeyword":"And the new token should differ from the previous token","stepMatchArguments":[]}]},
  {"pwTestLine":41,"pickleLine":50,"tags":["@Regression","@API","@Logon","@Negative","@SLL-C1671"],"steps":[{"pwStepLine":42,"gherkinStepLine":51,"keywordType":"Context","textWithKeyword":"Given the client has no session token","stepMatchArguments":[]},{"pwStepLine":43,"gherkinStepLine":52,"keywordType":"Action","textWithKeyword":"When the client logs on with an invalid password","stepMatchArguments":[]},{"pwStepLine":44,"gherkinStepLine":53,"keywordType":"Outcome","textWithKeyword":"Then no session token should be returned","stepMatchArguments":[]},{"pwStepLine":45,"gherkinStepLine":54,"keywordType":"Outcome","textWithKeyword":"And the status message should not be empty","stepMatchArguments":[]}]},
  {"pwTestLine":48,"pickleLine":57,"tags":["@Regression","@API","@Logon","@Negative","@SLL-C1672"],"steps":[{"pwStepLine":49,"gherkinStepLine":58,"keywordType":"Context","textWithKeyword":"Given the client has no session token","stepMatchArguments":[]},{"pwStepLine":50,"gherkinStepLine":59,"keywordType":"Action","textWithKeyword":"When the client logs on with an unknown user","stepMatchArguments":[]},{"pwStepLine":51,"gherkinStepLine":60,"keywordType":"Outcome","textWithKeyword":"Then no session token should be returned","stepMatchArguments":[]},{"pwStepLine":52,"gherkinStepLine":61,"keywordType":"Outcome","textWithKeyword":"And the status message should not be empty","stepMatchArguments":[]}]},
  {"pwTestLine":55,"pickleLine":64,"tags":["@Regression","@API","@Logon","@Negative","@SLL-C1673"],"steps":[{"pwStepLine":56,"gherkinStepLine":65,"keywordType":"Action","textWithKeyword":"When the client POSTs an empty document to \"/logon\"","stepMatchArguments":[{"group":{"start":38,"value":"\"/logon\"","children":[{"start":39,"value":"/logon","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":57,"gherkinStepLine":66,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 500","stepMatchArguments":[{"group":{"start":35,"value":"500","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":60,"pickleLine":69,"tags":["@Regression","@API","@Logon","@Negative","@SLL-C1674"],"steps":[{"pwStepLine":61,"gherkinStepLine":70,"keywordType":"Action","textWithKeyword":"When the client POSTs the following document to \"/logon\":","stepMatchArguments":[{"group":{"start":43,"value":"\"/logon\"","children":[{"start":44,"value":"/logon","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":62,"gherkinStepLine":74,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 401","stepMatchArguments":[{"group":{"start":35,"value":"401","children":[]},"parameterTypeName":"int"}]}]},
]; // bdd-data-end