// Generated from: API-Automation\features\OvernightLocateOrder.feature
import { test } from "../../../step-definitions/fixtures.js";

test.describe('Velocity JSON API - Overnight-Locate-Order (spec section 7)', () => {

  test('A prior-day locate can be carried without a client price', { tag: ['@Smoke', '@Regression', '@API', '@Overnight', '@RequiresPriorDayFill', '@SLL-C1679'] }, async ({ Given, When, Then, And, authedApi, party, world }) => {
    await Given('the client has a valid session token', null, { authedApi, world });
    await When('the client submits an overnight-locate-order for the test symbol', null, { authedApi, party, world });
    await Then('the HTTP response status should be 200', null, { world });
    await And('the response should be valid JSON', null, { world });
    await And('the response should match the order schema', null, { world });
    await And('the overnight order should be booked', null, { world });
    await And('the overnight response should have a null cliOrdId', null, { world });
    await And('the order should carry a locateId', null, { world });
    await And('the order should echo back the requested symbol and quantity', null, { world });
    await And('the executed quantity should not exceed the ordered quantity', null, { world });
  });

  test('An overnight locate for an unrecognised symbol is rejected for no inventory', { tag: ['@Regression', '@API', '@Overnight', '@Negative', '@SLL-C1684'] }, async ({ Given, When, Then, And, authedApi, party, world }) => {
    await Given('the client has a valid session token', null, { authedApi, world });
    await When('the client submits an overnight-locate-order for "ZZZZQQ" quantity 100', null, { authedApi, party, world });
    await Then('the HTTP response status should be 200', null, { world });
    await And('the status code should be "NO_INVENTORY"', null, { world });
    await And('the order status should be "REJECTED"', null, { world });
  });

  test('An overnight document missing required fields is rejected', { tag: ['@Regression', '@API', '@Overnight', '@Negative', '@SLL-C1685'] }, async ({ Given, When, Then, api, authedApi, world }) => {
    await Given('the client has a valid session token', null, { authedApi, world });
    await When('the client POSTs a document with only the session token to "/overnight"', null, { api, world });
    await Then('the HTTP response status should be 400', null, { world });
  });

  test('An overnight order with an invalid token is refused', { tag: ['@Regression', '@API', '@Overnight', '@Negative', '@SLL-C1686'] }, async ({ Given, When, Then, api, world }) => {
    await Given('the client has an invalid session token "not-a-real-token-0000"', null, { api, world });
    await When('the client POSTs the following document to "/overnight":', {"docString":{"content":"{\"token\": \"not-a-real-token-0000\", \"cliOrdId\": \"CO-bad-token\", \"mpid\": \"TEST\", \"trader\": \"TEST\", \"symbol\": \"AAPL\", \"orderQty\": 100}"}}, { api, world });
    await Then('the HTTP response status should be 401', null, { world });
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('API-Automation\\features\\OvernightLocateOrder.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":34,"tags":["@Smoke","@Regression","@API","@Overnight","@RequiresPriorDayFill","@SLL-C1679"],"steps":[{"pwStepLine":7,"gherkinStepLine":35,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":36,"keywordType":"Action","textWithKeyword":"When the client submits an overnight-locate-order for the test symbol","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":37,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":10,"gherkinStepLine":38,"keywordType":"Outcome","textWithKeyword":"And the response should be valid JSON","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":39,"keywordType":"Outcome","textWithKeyword":"And the response should match the order schema","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":40,"keywordType":"Outcome","textWithKeyword":"And the overnight order should be booked","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":41,"keywordType":"Outcome","textWithKeyword":"And the overnight response should have a null cliOrdId","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":42,"keywordType":"Outcome","textWithKeyword":"And the order should carry a locateId","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":43,"keywordType":"Outcome","textWithKeyword":"And the order should echo back the requested symbol and quantity","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":44,"keywordType":"Outcome","textWithKeyword":"And the executed quantity should not exceed the ordered quantity","stepMatchArguments":[]}]},
  {"pwTestLine":19,"pickleLine":49,"tags":["@Regression","@API","@Overnight","@Negative","@SLL-C1684"],"steps":[{"pwStepLine":20,"gherkinStepLine":50,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":51,"keywordType":"Action","textWithKeyword":"When the client submits an overnight-locate-order for \"ZZZZQQ\" quantity 100","stepMatchArguments":[{"group":{"start":49,"value":"\"ZZZZQQ\"","children":[{"start":50,"value":"ZZZZQQ","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":67,"value":"100","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":22,"gherkinStepLine":52,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":23,"gherkinStepLine":53,"keywordType":"Outcome","textWithKeyword":"And the status code should be \"NO_INVENTORY\"","stepMatchArguments":[{"group":{"start":26,"value":"\"NO_INVENTORY\"","children":[{"start":27,"value":"NO_INVENTORY","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":24,"gherkinStepLine":54,"keywordType":"Outcome","textWithKeyword":"And the order status should be \"REJECTED\"","stepMatchArguments":[{"group":{"start":27,"value":"\"REJECTED\"","children":[{"start":28,"value":"REJECTED","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":27,"pickleLine":57,"tags":["@Regression","@API","@Overnight","@Negative","@SLL-C1685"],"steps":[{"pwStepLine":28,"gherkinStepLine":58,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":59,"keywordType":"Action","textWithKeyword":"When the client POSTs a document with only the session token to \"/overnight\"","stepMatchArguments":[{"group":{"start":59,"value":"\"/overnight\"","children":[{"start":60,"value":"/overnight","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":30,"gherkinStepLine":60,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 400","stepMatchArguments":[{"group":{"start":35,"value":"400","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":33,"pickleLine":63,"tags":["@Regression","@API","@Overnight","@Negative","@SLL-C1686"],"steps":[{"pwStepLine":34,"gherkinStepLine":64,"keywordType":"Context","textWithKeyword":"Given the client has an invalid session token \"not-a-real-token-0000\"","stepMatchArguments":[{"group":{"start":40,"value":"\"not-a-real-token-0000\"","children":[{"start":41,"value":"not-a-real-token-0000","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":35,"gherkinStepLine":65,"keywordType":"Action","textWithKeyword":"When the client POSTs the following document to \"/overnight\":","stepMatchArguments":[{"group":{"start":43,"value":"\"/overnight\"","children":[{"start":44,"value":"/overnight","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":36,"gherkinStepLine":69,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 401","stepMatchArguments":[{"group":{"start":35,"value":"401","children":[]},"parameterTypeName":"int"}]}]},
]; // bdd-data-end