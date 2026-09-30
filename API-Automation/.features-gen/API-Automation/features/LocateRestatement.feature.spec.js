// Generated from: API-Automation\features\LocateRestatement.feature
import { test } from "../../../step-definitions/fixtures.js";

test.describe('Velocity JSON API - Locate-Order Restatement (spec 1.9)', () => {

  test('An order can be restated by the client-assigned cliOrdId', { tag: ['@Smoke', '@Regression', '@API', '@Restatement'] }, async ({ Given, When, Then, And, authedApi, party, world }) => { 
    await Given('the client has a valid session token', null, { authedApi, world }); 
    await When('the client submits a limit-locate-order for "AAPL" quantity 100 at price 999.0', null, { authedApi, party, world }); 
    await Then('the HTTP response status should be 200', null, { world }); 
    await And('the order should carry a locateId', null, { world }); 
    await When('the client requests a restatement using the cliOrdId', null, { authedApi, world }); 
    await Then('the HTTP response status should be 200', null, { world }); 
    await And('the response should match the order schema', null, { world }); 
    await And('the restatement should match the original order', null, { world }); 
  });

  test('An order can be restated by the server-assigned locateId', { tag: ['@Smoke', '@Regression', '@API', '@Restatement'] }, async ({ Given, When, Then, And, authedApi, party, world }) => { 
    await Given('the client has a valid session token', null, { authedApi, world }); 
    await When('the client submits a limit-locate-order for "AAPL" quantity 100 at price 999.0', null, { authedApi, party, world }); 
    await Then('the HTTP response status should be 200', null, { world }); 
    await And('the order should carry a locateId', null, { world }); 
    await When('the client requests a restatement using the locateId', null, { authedApi, world }); 
    await Then('the HTTP response status should be 200', null, { world }); 
    await And('the response should match the order schema', null, { world }); 
    await And('the restatement should match the original order', null, { world }); 
  });

  test('An overnight order can also be restated', { tag: ['@Regression', '@API', '@Restatement'] }, async ({ Given, When, Then, And, authedApi, party, world }) => { 
    await Given('the client has a valid session token', null, { authedApi, world }); 
    await When('the client submits an overnight-locate-order for the test symbol', null, { authedApi, party, world }); 
    await Then('the HTTP response status should be 200', null, { world }); 
    await And('the order should carry a locateId', null, { world }); 
    await When('the client requests a restatement using the cliOrdId', null, { authedApi, world }); 
    await Then('the HTTP response status should be 200', null, { world }); 
    await And('the response should match the order schema', null, { world }); 
    await And('the order type should be overnight', null, { world }); 
  });

  test('Restating twice returns a stable answer', { tag: ['@Regression', '@API', '@Restatement'] }, async ({ Given, When, Then, And, authedApi, party, world }) => { 
    await Given('the client has a valid session token', null, { authedApi, world }); 
    await When('the client submits a limit-locate-order for "AAPL" quantity 100 at price 999.0', null, { authedApi, party, world }); 
    await Then('the order should carry a locateId', null, { world }); 
    await When('the client requests a restatement using the cliOrdId', null, { authedApi, world }); 
    await Then('the restatement should match the original order', null, { world }); 
    await When('the client requests a restatement using the cliOrdId', null, { authedApi, world }); 
    await Then('the HTTP response status should be 200', null, { world }); 
    await And('the restatement should match the original order', null, { world }); 
  });

  test('Restating an order that does not exist is refused', { tag: ['@Regression', '@API', '@Restatement', '@Negative'] }, async ({ Given, When, Then, And, authedApi, world }) => { 
    await Given('the client has a valid session token', null, { authedApi, world }); 
    await When('the client requests a restatement for an order that does not exist', null, { authedApi, world }); 
    await Then('the HTTP response status should be 200', null, { world }); 
    await And('the status message should not be empty', null, { world }); 
  });

  test('A restatement document missing required fields is rejected', { tag: ['@Regression', '@API', '@Restatement', '@Negative'] }, async ({ When, Then, api, world }) => { 
    await When('the client POSTs an empty document to "/locate"', null, { api, world }); 
    await Then('the HTTP response status should be 400', null, { world }); 
  });

  test('A restatement with an invalid token is refused', { tag: ['@Regression', '@API', '@Restatement', '@Negative'] }, async ({ Given, When, Then, api, world }) => { 
    await Given('the client has an invalid session token "not-a-real-token-0000"', null, { api, world }); 
    await When('the client POSTs the following document to "/locate":', {"docString":{"content":"{\"token\": \"not-a-real-token-0000\", \"cliOrdId\": \"CO-bad-token\", \"locateId\": \"\"}"}}, { api, world }); 
    await Then('the HTTP response status should be 401', null, { world }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('API-Automation\\features\\LocateRestatement.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":18,"tags":["@Smoke","@Regression","@API","@Restatement"],"steps":[{"pwStepLine":7,"gherkinStepLine":19,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":20,"keywordType":"Action","textWithKeyword":"When the client submits a limit-locate-order for \"AAPL\" quantity 100 at price 999.0","stepMatchArguments":[{"group":{"start":44,"value":"\"AAPL\"","children":[{"start":45,"value":"AAPL","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":60,"value":"100","children":[]},"parameterTypeName":"int"},{"group":{"start":73,"value":"999.0","children":[]},"parameterTypeName":"float"}]},{"pwStepLine":9,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":10,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"And the order should carry a locateId","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":23,"keywordType":"Action","textWithKeyword":"When the client requests a restatement using the cliOrdId","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":13,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"And the response should match the order schema","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"And the restatement should match the original order","stepMatchArguments":[]}]},
  {"pwTestLine":17,"pickleLine":29,"tags":["@Smoke","@Regression","@API","@Restatement"],"steps":[{"pwStepLine":18,"gherkinStepLine":30,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":31,"keywordType":"Action","textWithKeyword":"When the client submits a limit-locate-order for \"AAPL\" quantity 100 at price 999.0","stepMatchArguments":[{"group":{"start":44,"value":"\"AAPL\"","children":[{"start":45,"value":"AAPL","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":60,"value":"100","children":[]},"parameterTypeName":"int"},{"group":{"start":73,"value":"999.0","children":[]},"parameterTypeName":"float"}]},{"pwStepLine":20,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":21,"gherkinStepLine":33,"keywordType":"Outcome","textWithKeyword":"And the order should carry a locateId","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":34,"keywordType":"Action","textWithKeyword":"When the client requests a restatement using the locateId","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":35,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":24,"gherkinStepLine":36,"keywordType":"Outcome","textWithKeyword":"And the response should match the order schema","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":37,"keywordType":"Outcome","textWithKeyword":"And the restatement should match the original order","stepMatchArguments":[]}]},
  {"pwTestLine":28,"pickleLine":40,"tags":["@Regression","@API","@Restatement"],"steps":[{"pwStepLine":29,"gherkinStepLine":41,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":42,"keywordType":"Action","textWithKeyword":"When the client submits an overnight-locate-order for the test symbol","stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":43,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":32,"gherkinStepLine":44,"keywordType":"Outcome","textWithKeyword":"And the order should carry a locateId","stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":45,"keywordType":"Action","textWithKeyword":"When the client requests a restatement using the cliOrdId","stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":46,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":35,"gherkinStepLine":47,"keywordType":"Outcome","textWithKeyword":"And the response should match the order schema","stepMatchArguments":[]},{"pwStepLine":36,"gherkinStepLine":48,"keywordType":"Outcome","textWithKeyword":"And the order type should be overnight","stepMatchArguments":[]}]},
  {"pwTestLine":39,"pickleLine":51,"tags":["@Regression","@API","@Restatement"],"steps":[{"pwStepLine":40,"gherkinStepLine":52,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":41,"gherkinStepLine":53,"keywordType":"Action","textWithKeyword":"When the client submits a limit-locate-order for \"AAPL\" quantity 100 at price 999.0","stepMatchArguments":[{"group":{"start":44,"value":"\"AAPL\"","children":[{"start":45,"value":"AAPL","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":60,"value":"100","children":[]},"parameterTypeName":"int"},{"group":{"start":73,"value":"999.0","children":[]},"parameterTypeName":"float"}]},{"pwStepLine":42,"gherkinStepLine":54,"keywordType":"Outcome","textWithKeyword":"Then the order should carry a locateId","stepMatchArguments":[]},{"pwStepLine":43,"gherkinStepLine":55,"keywordType":"Action","textWithKeyword":"When the client requests a restatement using the cliOrdId","stepMatchArguments":[]},{"pwStepLine":44,"gherkinStepLine":56,"keywordType":"Outcome","textWithKeyword":"Then the restatement should match the original order","stepMatchArguments":[]},{"pwStepLine":45,"gherkinStepLine":57,"keywordType":"Action","textWithKeyword":"When the client requests a restatement using the cliOrdId","stepMatchArguments":[]},{"pwStepLine":46,"gherkinStepLine":58,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":47,"gherkinStepLine":59,"keywordType":"Outcome","textWithKeyword":"And the restatement should match the original order","stepMatchArguments":[]}]},
  {"pwTestLine":50,"pickleLine":64,"tags":["@Regression","@API","@Restatement","@Negative"],"steps":[{"pwStepLine":51,"gherkinStepLine":65,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":52,"gherkinStepLine":66,"keywordType":"Action","textWithKeyword":"When the client requests a restatement for an order that does not exist","stepMatchArguments":[]},{"pwStepLine":53,"gherkinStepLine":67,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":54,"gherkinStepLine":68,"keywordType":"Outcome","textWithKeyword":"And the status message should not be empty","stepMatchArguments":[]}]},
  {"pwTestLine":57,"pickleLine":71,"tags":["@Regression","@API","@Restatement","@Negative"],"steps":[{"pwStepLine":58,"gherkinStepLine":72,"keywordType":"Action","textWithKeyword":"When the client POSTs an empty document to \"/locate\"","stepMatchArguments":[{"group":{"start":38,"value":"\"/locate\"","children":[{"start":39,"value":"/locate","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":59,"gherkinStepLine":73,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 400","stepMatchArguments":[{"group":{"start":35,"value":"400","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":62,"pickleLine":76,"tags":["@Regression","@API","@Restatement","@Negative"],"steps":[{"pwStepLine":63,"gherkinStepLine":77,"keywordType":"Context","textWithKeyword":"Given the client has an invalid session token \"not-a-real-token-0000\"","stepMatchArguments":[{"group":{"start":40,"value":"\"not-a-real-token-0000\"","children":[{"start":41,"value":"not-a-real-token-0000","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":64,"gherkinStepLine":78,"keywordType":"Action","textWithKeyword":"When the client POSTs the following document to \"/locate\":","stepMatchArguments":[{"group":{"start":43,"value":"\"/locate\"","children":[{"start":44,"value":"/locate","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":65,"gherkinStepLine":82,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 401","stepMatchArguments":[{"group":{"start":35,"value":"401","children":[]},"parameterTypeName":"int"}]}]},
]; // bdd-data-end