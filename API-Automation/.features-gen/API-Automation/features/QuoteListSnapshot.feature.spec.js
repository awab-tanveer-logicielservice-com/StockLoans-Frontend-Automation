// Generated from: API-Automation\features\QuoteListSnapshot.feature
import { test } from "../../../step-definitions/fixtures.js";

test.describe('Velocity JSON API - Quote List Snapshot (spec section 6)', () => {

  test('The snapshot returns the current inventory price list', { tag: ['@Smoke', '@Regression', '@API', '@Snapshot', '@SLL-C1687'] }, async ({ Given, When, Then, And, authedApi, party, world }) => {
    await Given('the client has a valid session token', null, { authedApi, world });
    await When('the client requests a quote list snapshot', null, { authedApi, party, world });
    await Then('the HTTP response status should be 200', null, { world });
    await And('the response should be valid JSON', null, { world });
    await And('the response should match the snapshot schema', null, { world });
    await And('the snapshot should contain a price list', null, { world });
  });

  test('Every entry in the snapshot is a symbol with a positive price', { tag: ['@Regression', '@API', '@Snapshot', '@SLL-C1688'] }, async ({ Given, When, Then, And, authedApi, party, world }) => {
    await Given('the client has a valid session token', null, { authedApi, world });
    await When('the client requests a quote list snapshot', null, { authedApi, party, world });
    await Then('the HTTP response status should be 200', null, { world });
    await And('the snapshot should contain a price list', null, { world });
    await And('every snapshot entry should have a symbol and a price', null, { world });
  });

  test('The snapshot echoes back the request header fields', { tag: ['@Regression', '@API', '@Snapshot', '@SLL-C1689'] }, async ({ Given, When, Then, And, authedApi, party, world }) => {
    await Given('the client has a valid session token', null, { authedApi, world });
    await When('the client requests a quote list snapshot', null, { authedApi, party, world });
    await Then('the HTTP response status should be 200', null, { world });
    await And('the snapshot should echo back the requested symbol', null, { world });
  });

  test('A symbol held in inventory appears in the snapshot', { tag: ['@Regression', '@API', '@Snapshot', '@SLL-C1690'] }, async ({ Given, When, Then, And, authedApi, party, world }) => {
    await Given('the client has a valid session token', null, { authedApi, world });
    await When('the client requests a quote list snapshot', null, { authedApi, party, world });
    await Then('the HTTP response status should be 200', null, { world });
    await And('the snapshot should contain a price list', null, { world });
    await And('the snapshot should include the test symbol', null, { world });
  });

  test('A price taken from the snapshot is usable for a limit-locate-order', { tag: ['@Regression', '@API', '@Snapshot', '@SLL-C1691'] }, async ({ Given, When, Then, And, authedApi, party, world }) => {
    await Given('the client has a valid session token', null, { authedApi, world });
    await When('the client requests a quote list snapshot', null, { authedApi, party, world });
    await Then('the snapshot should contain a price list', null, { world });
    await And('the snapshot should include the test symbol', null, { world });
    await When('the client submits a limit-locate-order at the snapshot price', null, { authedApi, party, world });
    await Then('the HTTP response status should be 200', null, { world });
    await And('the response should match the order schema', null, { world });
    await And('the executed price should not exceed the limit price', null, { world });
  });

  test('A snapshot document missing required fields is rejected', { tag: ['@Regression', '@API', '@Snapshot', '@Negative', '@SLL-C1692'] }, async ({ Given, When, Then, api, authedApi, world }) => {
    await Given('the client has a valid session token', null, { authedApi, world });
    await When('the client POSTs a document with only the session token to "/snapshot"', null, { api, world });
    await Then('the HTTP response status should be 400', null, { world });
  });

  test('A snapshot request with an invalid token is refused', { tag: ['@Regression', '@API', '@Snapshot', '@Negative', '@SLL-C1693'] }, async ({ Given, When, Then, api, world }) => {
    await Given('the client has an invalid session token "not-a-real-token-0000"', null, { api, world });
    await When('the client POSTs the following document to "/snapshot":', {"docString":{"content":"{\"token\": \"not-a-real-token-0000\", \"quoteReqId\": \"QR-bad-token\", \"mpid\": \"TEST\", \"symbol\": \"snapshot\"}"}}, { api, world });
    await Then('the HTTP response status should be 401', null, { world });
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('API-Automation\\features\\QuoteListSnapshot.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":17,"tags":["@Smoke","@Regression","@API","@Snapshot","@SLL-C1687"],"steps":[{"pwStepLine":7,"gherkinStepLine":18,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":19,"keywordType":"Action","textWithKeyword":"When the client requests a quote list snapshot","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":10,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"And the response should be valid JSON","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"And the response should match the snapshot schema","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"And the snapshot should contain a price list","stepMatchArguments":[]}]},
  {"pwTestLine":15,"pickleLine":26,"tags":["@Regression","@API","@Snapshot","@SLL-C1688"],"steps":[{"pwStepLine":16,"gherkinStepLine":27,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":28,"keywordType":"Action","textWithKeyword":"When the client requests a quote list snapshot","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":19,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"And the snapshot should contain a price list","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":31,"keywordType":"Outcome","textWithKeyword":"And every snapshot entry should have a symbol and a price","stepMatchArguments":[]}]},
  {"pwTestLine":23,"pickleLine":34,"tags":["@Regression","@API","@Snapshot","@SLL-C1689"],"steps":[{"pwStepLine":24,"gherkinStepLine":35,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":36,"keywordType":"Action","textWithKeyword":"When the client requests a quote list snapshot","stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":37,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":27,"gherkinStepLine":38,"keywordType":"Outcome","textWithKeyword":"And the snapshot should echo back the requested symbol","stepMatchArguments":[]}]},
  {"pwTestLine":30,"pickleLine":41,"tags":["@Regression","@API","@Snapshot","@SLL-C1690"],"steps":[{"pwStepLine":31,"gherkinStepLine":42,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":43,"keywordType":"Action","textWithKeyword":"When the client requests a quote list snapshot","stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":44,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":34,"gherkinStepLine":45,"keywordType":"Outcome","textWithKeyword":"And the snapshot should contain a price list","stepMatchArguments":[]},{"pwStepLine":35,"gherkinStepLine":46,"keywordType":"Outcome","textWithKeyword":"And the snapshot should include the test symbol","stepMatchArguments":[]}]},
  {"pwTestLine":38,"pickleLine":51,"tags":["@Regression","@API","@Snapshot","@SLL-C1691"],"steps":[{"pwStepLine":39,"gherkinStepLine":52,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":40,"gherkinStepLine":53,"keywordType":"Action","textWithKeyword":"When the client requests a quote list snapshot","stepMatchArguments":[]},{"pwStepLine":41,"gherkinStepLine":54,"keywordType":"Outcome","textWithKeyword":"Then the snapshot should contain a price list","stepMatchArguments":[]},{"pwStepLine":42,"gherkinStepLine":55,"keywordType":"Outcome","textWithKeyword":"And the snapshot should include the test symbol","stepMatchArguments":[]},{"pwStepLine":43,"gherkinStepLine":56,"keywordType":"Action","textWithKeyword":"When the client submits a limit-locate-order at the snapshot price","stepMatchArguments":[]},{"pwStepLine":44,"gherkinStepLine":57,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":45,"gherkinStepLine":58,"keywordType":"Outcome","textWithKeyword":"And the response should match the order schema","stepMatchArguments":[]},{"pwStepLine":46,"gherkinStepLine":59,"keywordType":"Outcome","textWithKeyword":"And the executed price should not exceed the limit price","stepMatchArguments":[]}]},
  {"pwTestLine":49,"pickleLine":64,"tags":["@Regression","@API","@Snapshot","@Negative","@SLL-C1692"],"steps":[{"pwStepLine":50,"gherkinStepLine":65,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":51,"gherkinStepLine":66,"keywordType":"Action","textWithKeyword":"When the client POSTs a document with only the session token to \"/snapshot\"","stepMatchArguments":[{"group":{"start":59,"value":"\"/snapshot\"","children":[{"start":60,"value":"/snapshot","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":52,"gherkinStepLine":67,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 400","stepMatchArguments":[{"group":{"start":35,"value":"400","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":55,"pickleLine":70,"tags":["@Regression","@API","@Snapshot","@Negative","@SLL-C1693"],"steps":[{"pwStepLine":56,"gherkinStepLine":71,"keywordType":"Context","textWithKeyword":"Given the client has an invalid session token \"not-a-real-token-0000\"","stepMatchArguments":[{"group":{"start":40,"value":"\"not-a-real-token-0000\"","children":[{"start":41,"value":"not-a-real-token-0000","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":57,"gherkinStepLine":72,"keywordType":"Action","textWithKeyword":"When the client POSTs the following document to \"/snapshot\":","stepMatchArguments":[{"group":{"start":43,"value":"\"/snapshot\"","children":[{"start":44,"value":"/snapshot","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":58,"gherkinStepLine":76,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 401","stepMatchArguments":[{"group":{"start":35,"value":"401","children":[]},"parameterTypeName":"int"}]}]},
]; // bdd-data-end