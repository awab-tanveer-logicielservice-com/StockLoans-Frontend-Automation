// Generated from: API-Automation\features\LocateRestatement.feature
import { test } from "../../../step-definitions/fixtures.js";

test.describe('Velocity JSON API - Locate-Order Restatement (spec section 8)', () => {

  test('An order can be restated by the client-assigned cliOrdId', { tag: ['@Smoke', '@Regression', '@API', '@Restatement', '@SLL-C1660'] }, async ({ Given, When, Then, And, authedApi, party, world }) => {
    await Given('the client has a valid session token', null, { authedApi, world });
    await When('the client submits a limit-locate-order for "AAPL" quantity 100 at price 999.0', null, { authedApi, party, world });
    await Then('the HTTP response status should be 200', null, { world });
    await And('the order should carry a locateId', null, { world });
    await When('the client requests a restatement using the cliOrdId', null, { authedApi, world });
    await Then('the HTTP response status should be 200', null, { world });
    await And('the response should match the order schema', null, { world });
    await And('the restatement should match the original order', null, { world });
  });

  test('An order can be restated by the server-assigned locateId', { tag: ['@Smoke', '@Regression', '@API', '@Restatement', '@SLL-C1661'] }, async ({ Given, When, Then, And, authedApi, party, world }) => {
    await Given('the client has a valid session token', null, { authedApi, world });
    await When('the client submits a limit-locate-order for "AAPL" quantity 100 at price 999.0', null, { authedApi, party, world });
    await Then('the HTTP response status should be 200', null, { world });
    await And('the order should carry a locateId', null, { world });
    await When('the client requests a restatement using the locateId', null, { authedApi, world });
    await Then('the HTTP response status should be 200', null, { world });
    await And('the response should match the order schema', null, { world });
    await And('the restatement should match the original order', null, { world });
  });

  test('Restating twice returns a stable answer', { tag: ['@Regression', '@API', '@Restatement', '@SLL-C1663'] }, async ({ Given, When, Then, And, authedApi, party, world }) => {
    await Given('the client has a valid session token', null, { authedApi, world });
    await When('the client submits a limit-locate-order for "AAPL" quantity 100 at price 999.0', null, { authedApi, party, world });
    await Then('the order should carry a locateId', null, { world });
    await When('the client requests a restatement using the cliOrdId', null, { authedApi, world });
    await Then('the restatement should match the original order', null, { world });
    await When('the client requests a restatement using the cliOrdId', null, { authedApi, world });
    await Then('the HTTP response status should be 200', null, { world });
    await And('the restatement should match the original order', null, { world });
  });

  test('Restating an order that does not exist is refused', { tag: ['@Regression', '@API', '@Restatement', '@Negative', '@SLL-C1664'] }, async ({ Given, When, Then, And, authedApi, world }) => {
    await Given('the client has a valid session token', null, { authedApi, world });
    await When('the client requests a restatement for an order that does not exist', null, { authedApi, world });
    await Then('the HTTP response status should be 200', null, { world });
    await And('the status code should be 5', null, { world });
    await And('the order status should be "REJECTED"', null, { world });
  });

  test('A restatement document missing required fields is rejected', { tag: ['@Regression', '@API', '@Restatement', '@Negative', '@SLL-C1665'] }, async ({ Given, When, Then, And, api, authedApi, world }) => {
    await Given('the client has a valid session token', null, { authedApi, world });
    await When('the client POSTs a document with only the session token to "/locate"', null, { api, world });
    await Then('the HTTP response status should be 200', null, { world });
    await And('the status code should be 20', null, { world });
  });

  test('A restatement with an invalid token is refused', { tag: ['@Regression', '@API', '@Restatement', '@Negative', '@SLL-C1666'] }, async ({ Given, When, Then, api, world }) => {
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
  {"pwTestLine":6,"pickleLine":16,"tags":["@Smoke","@Regression","@API","@Restatement","@SLL-C1660"],"steps":[{"pwStepLine":7,"gherkinStepLine":17,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":18,"keywordType":"Action","textWithKeyword":"When the client submits a limit-locate-order for \"AAPL\" quantity 100 at price 999.0","stepMatchArguments":[{"group":{"start":44,"value":"\"AAPL\"","children":[{"start":45,"value":"AAPL","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":60,"value":"100","children":[]},"parameterTypeName":"int"},{"group":{"start":73,"value":"999.0","children":[]},"parameterTypeName":"float"}]},{"pwStepLine":9,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":10,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"And the order should carry a locateId","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":21,"keywordType":"Action","textWithKeyword":"When the client requests a restatement using the cliOrdId","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":13,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"And the response should match the order schema","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"And the restatement should match the original order","stepMatchArguments":[]}]},
  {"pwTestLine":17,"pickleLine":27,"tags":["@Smoke","@Regression","@API","@Restatement","@SLL-C1661"],"steps":[{"pwStepLine":18,"gherkinStepLine":28,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":29,"keywordType":"Action","textWithKeyword":"When the client submits a limit-locate-order for \"AAPL\" quantity 100 at price 999.0","stepMatchArguments":[{"group":{"start":44,"value":"\"AAPL\"","children":[{"start":45,"value":"AAPL","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":60,"value":"100","children":[]},"parameterTypeName":"int"},{"group":{"start":73,"value":"999.0","children":[]},"parameterTypeName":"float"}]},{"pwStepLine":20,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":21,"gherkinStepLine":31,"keywordType":"Outcome","textWithKeyword":"And the order should carry a locateId","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":32,"keywordType":"Action","textWithKeyword":"When the client requests a restatement using the locateId","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":33,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":24,"gherkinStepLine":34,"keywordType":"Outcome","textWithKeyword":"And the response should match the order schema","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":35,"keywordType":"Outcome","textWithKeyword":"And the restatement should match the original order","stepMatchArguments":[]}]},
  {"pwTestLine":28,"pickleLine":38,"tags":["@Regression","@API","@Restatement","@SLL-C1663"],"steps":[{"pwStepLine":29,"gherkinStepLine":39,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":40,"keywordType":"Action","textWithKeyword":"When the client submits a limit-locate-order for \"AAPL\" quantity 100 at price 999.0","stepMatchArguments":[{"group":{"start":44,"value":"\"AAPL\"","children":[{"start":45,"value":"AAPL","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":60,"value":"100","children":[]},"parameterTypeName":"int"},{"group":{"start":73,"value":"999.0","children":[]},"parameterTypeName":"float"}]},{"pwStepLine":31,"gherkinStepLine":41,"keywordType":"Outcome","textWithKeyword":"Then the order should carry a locateId","stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":42,"keywordType":"Action","textWithKeyword":"When the client requests a restatement using the cliOrdId","stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":43,"keywordType":"Outcome","textWithKeyword":"Then the restatement should match the original order","stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":44,"keywordType":"Action","textWithKeyword":"When the client requests a restatement using the cliOrdId","stepMatchArguments":[]},{"pwStepLine":35,"gherkinStepLine":45,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":36,"gherkinStepLine":46,"keywordType":"Outcome","textWithKeyword":"And the restatement should match the original order","stepMatchArguments":[]}]},
  {"pwTestLine":39,"pickleLine":51,"tags":["@Regression","@API","@Restatement","@Negative","@SLL-C1664"],"steps":[{"pwStepLine":40,"gherkinStepLine":52,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":41,"gherkinStepLine":53,"keywordType":"Action","textWithKeyword":"When the client requests a restatement for an order that does not exist","stepMatchArguments":[]},{"pwStepLine":42,"gherkinStepLine":54,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":43,"gherkinStepLine":55,"keywordType":"Outcome","textWithKeyword":"And the status code should be 5","stepMatchArguments":[{"group":{"start":26,"value":"5","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":44,"gherkinStepLine":56,"keywordType":"Outcome","textWithKeyword":"And the order status should be \"REJECTED\"","stepMatchArguments":[{"group":{"start":27,"value":"\"REJECTED\"","children":[{"start":28,"value":"REJECTED","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":47,"pickleLine":59,"tags":["@Regression","@API","@Restatement","@Negative","@SLL-C1665"],"steps":[{"pwStepLine":48,"gherkinStepLine":60,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":49,"gherkinStepLine":61,"keywordType":"Action","textWithKeyword":"When the client POSTs a document with only the session token to \"/locate\"","stepMatchArguments":[{"group":{"start":59,"value":"\"/locate\"","children":[{"start":60,"value":"/locate","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":50,"gherkinStepLine":62,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":51,"gherkinStepLine":63,"keywordType":"Outcome","textWithKeyword":"And the status code should be 20","stepMatchArguments":[{"group":{"start":26,"value":"20","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":54,"pickleLine":66,"tags":["@Regression","@API","@Restatement","@Negative","@SLL-C1666"],"steps":[{"pwStepLine":55,"gherkinStepLine":67,"keywordType":"Context","textWithKeyword":"Given the client has an invalid session token \"not-a-real-token-0000\"","stepMatchArguments":[{"group":{"start":40,"value":"\"not-a-real-token-0000\"","children":[{"start":41,"value":"not-a-real-token-0000","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":56,"gherkinStepLine":68,"keywordType":"Action","textWithKeyword":"When the client POSTs the following document to \"/locate\":","stepMatchArguments":[{"group":{"start":43,"value":"\"/locate\"","children":[{"start":44,"value":"/locate","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":57,"gherkinStepLine":72,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 401","stepMatchArguments":[{"group":{"start":35,"value":"401","children":[]},"parameterTypeName":"int"}]}]},
]; // bdd-data-end