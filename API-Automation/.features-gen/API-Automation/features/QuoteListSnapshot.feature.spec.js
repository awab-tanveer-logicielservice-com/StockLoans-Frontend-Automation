// Generated from: API-Automation\features\QuoteListSnapshot.feature
import { test } from "../../../step-definitions/fixtures.js";

test.describe('Velocity JSON API - Quote List Snapshot (spec 1.10)', () => {

  test('The snapshot returns the current inventory price list', { tag: ['@Smoke', '@Regression', '@API', '@Snapshot'] }, async ({ Given, When, Then, And, authedApi, party, world }) => { 
    await Given('the client has a valid session token', null, { authedApi, world }); 
    await When('the client requests a quote list snapshot', null, { authedApi, party, world }); 
    await Then('the HTTP response status should be 200', null, { world }); 
    await And('the response should be valid JSON', null, { world }); 
    await And('the response should match the snapshot schema', null, { world }); 
    await And('the snapshot should contain a price list', null, { world }); 
  });

  test('Every entry in the snapshot is a symbol with a positive price', { tag: ['@Regression', '@API', '@Snapshot'] }, async ({ Given, When, Then, And, authedApi, party, world }) => { 
    await Given('the client has a valid session token', null, { authedApi, world }); 
    await When('the client requests a quote list snapshot', null, { authedApi, party, world }); 
    await Then('the HTTP response status should be 200', null, { world }); 
    await And('the snapshot should contain a price list', null, { world }); 
    await And('every snapshot entry should have a symbol and a price', null, { world }); 
  });

  test('The snapshot echoes back the request header fields', { tag: ['@Regression', '@API', '@Snapshot'] }, async ({ Given, When, Then, And, authedApi, party, world }) => { 
    await Given('the client has a valid session token', null, { authedApi, world }); 
    await When('the client requests a quote list snapshot', null, { authedApi, party, world }); 
    await Then('the HTTP response status should be 200', null, { world }); 
    await And('the snapshot should echo back the symbol "snapshot"', null, { world }); 
  });

  test('A symbol held in inventory appears in the snapshot', { tag: ['@Regression', '@API', '@Snapshot'] }, async ({ Given, When, Then, And, authedApi, party, world }) => { 
    await Given('the client has a valid session token', null, { authedApi, world }); 
    await When('the client requests a quote list snapshot', null, { authedApi, party, world }); 
    await Then('the HTTP response status should be 200', null, { world }); 
    await And('the snapshot should contain a price list', null, { world }); 
    await And('the snapshot should include the test symbol', null, { world }); 
  });

  test('A price taken from the snapshot is usable for a limit-locate-order', { tag: ['@Regression', '@API', '@Snapshot'] }, async ({ Given, When, Then, And, authedApi, party, world }) => { 
    await Given('the client has a valid session token', null, { authedApi, world }); 
    await When('the client requests a quote list snapshot', null, { authedApi, party, world }); 
    await Then('the snapshot should contain a price list', null, { world }); 
    await And('the snapshot should include the test symbol', null, { world }); 
    await When('the client submits a limit-locate-order at the snapshot price', null, { authedApi, party, world }); 
    await Then('the HTTP response status should be 200', null, { world }); 
    await And('the response should match the order schema', null, { world }); 
    await And('the executed price should not exceed the limit price', null, { world }); 
  });

  test('A snapshot document missing required fields is rejected', { tag: ['@Regression', '@API', '@Snapshot', '@Negative'] }, async ({ When, Then, api, world }) => { 
    await When('the client POSTs an empty document to "/snapshot"', null, { api, world }); 
    await Then('the HTTP response status should be 400', null, { world }); 
  });

  test('A snapshot request with an invalid token is refused', { tag: ['@Regression', '@API', '@Snapshot', '@Negative'] }, async ({ Given, When, Then, api, world }) => { 
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
  {"pwTestLine":6,"pickleLine":21,"tags":["@Smoke","@Regression","@API","@Snapshot"],"steps":[{"pwStepLine":7,"gherkinStepLine":22,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":23,"keywordType":"Action","textWithKeyword":"When the client requests a quote list snapshot","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":10,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"And the response should be valid JSON","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"And the response should match the snapshot schema","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":27,"keywordType":"Outcome","textWithKeyword":"And the snapshot should contain a price list","stepMatchArguments":[]}]},
  {"pwTestLine":15,"pickleLine":30,"tags":["@Regression","@API","@Snapshot"],"steps":[{"pwStepLine":16,"gherkinStepLine":31,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":32,"keywordType":"Action","textWithKeyword":"When the client requests a quote list snapshot","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":33,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":19,"gherkinStepLine":34,"keywordType":"Outcome","textWithKeyword":"And the snapshot should contain a price list","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":35,"keywordType":"Outcome","textWithKeyword":"And every snapshot entry should have a symbol and a price","stepMatchArguments":[]}]},
  {"pwTestLine":23,"pickleLine":38,"tags":["@Regression","@API","@Snapshot"],"steps":[{"pwStepLine":24,"gherkinStepLine":39,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":40,"keywordType":"Action","textWithKeyword":"When the client requests a quote list snapshot","stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":41,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":27,"gherkinStepLine":42,"keywordType":"Outcome","textWithKeyword":"And the snapshot should echo back the symbol \"snapshot\"","stepMatchArguments":[{"group":{"start":41,"value":"\"snapshot\"","children":[{"start":42,"value":"snapshot","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":30,"pickleLine":45,"tags":["@Regression","@API","@Snapshot"],"steps":[{"pwStepLine":31,"gherkinStepLine":46,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":47,"keywordType":"Action","textWithKeyword":"When the client requests a quote list snapshot","stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":48,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":34,"gherkinStepLine":49,"keywordType":"Outcome","textWithKeyword":"And the snapshot should contain a price list","stepMatchArguments":[]},{"pwStepLine":35,"gherkinStepLine":50,"keywordType":"Outcome","textWithKeyword":"And the snapshot should include the test symbol","stepMatchArguments":[]}]},
  {"pwTestLine":38,"pickleLine":55,"tags":["@Regression","@API","@Snapshot"],"steps":[{"pwStepLine":39,"gherkinStepLine":56,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":40,"gherkinStepLine":57,"keywordType":"Action","textWithKeyword":"When the client requests a quote list snapshot","stepMatchArguments":[]},{"pwStepLine":41,"gherkinStepLine":58,"keywordType":"Outcome","textWithKeyword":"Then the snapshot should contain a price list","stepMatchArguments":[]},{"pwStepLine":42,"gherkinStepLine":59,"keywordType":"Outcome","textWithKeyword":"And the snapshot should include the test symbol","stepMatchArguments":[]},{"pwStepLine":43,"gherkinStepLine":60,"keywordType":"Action","textWithKeyword":"When the client submits a limit-locate-order at the snapshot price","stepMatchArguments":[]},{"pwStepLine":44,"gherkinStepLine":61,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":45,"gherkinStepLine":62,"keywordType":"Outcome","textWithKeyword":"And the response should match the order schema","stepMatchArguments":[]},{"pwStepLine":46,"gherkinStepLine":63,"keywordType":"Outcome","textWithKeyword":"And the executed price should not exceed the limit price","stepMatchArguments":[]}]},
  {"pwTestLine":49,"pickleLine":68,"tags":["@Regression","@API","@Snapshot","@Negative"],"steps":[{"pwStepLine":50,"gherkinStepLine":69,"keywordType":"Action","textWithKeyword":"When the client POSTs an empty document to \"/snapshot\"","stepMatchArguments":[{"group":{"start":38,"value":"\"/snapshot\"","children":[{"start":39,"value":"/snapshot","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":51,"gherkinStepLine":70,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 400","stepMatchArguments":[{"group":{"start":35,"value":"400","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":54,"pickleLine":73,"tags":["@Regression","@API","@Snapshot","@Negative"],"steps":[{"pwStepLine":55,"gherkinStepLine":74,"keywordType":"Context","textWithKeyword":"Given the client has an invalid session token \"not-a-real-token-0000\"","stepMatchArguments":[{"group":{"start":40,"value":"\"not-a-real-token-0000\"","children":[{"start":41,"value":"not-a-real-token-0000","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":56,"gherkinStepLine":75,"keywordType":"Action","textWithKeyword":"When the client POSTs the following document to \"/snapshot\":","stepMatchArguments":[{"group":{"start":43,"value":"\"/snapshot\"","children":[{"start":44,"value":"/snapshot","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":57,"gherkinStepLine":79,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 401","stepMatchArguments":[{"group":{"start":35,"value":"401","children":[]},"parameterTypeName":"int"}]}]},
]; // bdd-data-end