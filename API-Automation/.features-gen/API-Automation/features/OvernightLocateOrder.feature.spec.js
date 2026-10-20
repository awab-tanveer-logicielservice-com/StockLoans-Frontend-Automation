// Generated from: API-Automation\features\OvernightLocateOrder.feature
import { test } from "../../../step-definitions/fixtures.js";

test.describe('Velocity JSON API - Overnight-Locate-Order (spec 1.8)', () => {

  test('An overnight locate is accepted without a client price', { tag: ['@Smoke', '@Regression', '@API', '@Overnight', '@RequiresPriorDayFill'] }, async ({ Given, When, Then, And, authedApi, party, world }) => { 
    await Given('the client has a valid session token', null, { authedApi, world }); 
    await When('the client submits an overnight-locate-order for the test symbol', null, { authedApi, party, world }); 
    await Then('the HTTP response status should be 200', null, { world }); 
    await And('the response should be valid JSON', null, { world }); 
    await And('the response should match the order schema', null, { world }); 
    await And('the order response should indicate no error', null, { world }); 
  });

  test('An overnight locate is marked with order type 5', { tag: ['@Smoke', '@Regression', '@API', '@Overnight', '@RequiresPriorDayFill'] }, async ({ Given, When, Then, And, authedApi, party, world }) => { 
    await Given('the client has a valid session token', null, { authedApi, world }); 
    await When('the client submits an overnight-locate-order for the test symbol', null, { authedApi, party, world }); 
    await Then('the HTTP response status should be 200', null, { world }); 
    await And('the order type should be overnight', null, { world }); 
  });

  test('An overnight locate returns an identifiable order', { tag: ['@Regression', '@API', '@Overnight', '@RequiresPriorDayFill'] }, async ({ Given, When, Then, And, authedApi, party, world }) => { 
    await Given('the client has a valid session token', null, { authedApi, world }); 
    await When('the client submits an overnight-locate-order for the test symbol', null, { authedApi, party, world }); 
    await Then('the HTTP response status should be 200', null, { world }); 
    await And('the order should echo back the requested cliOrdId', null, { world }); 
    await And('the order should carry a locateId', null, { world }); 
    await And('the order should echo back the requested symbol and quantity', null, { world }); 
  });

  test('The server prices the overnight order itself', { tag: ['@Regression', '@API', '@Overnight', '@RequiresPriorDayFill'] }, async ({ Given, When, Then, And, authedApi, party, world }) => { 
    await Given('the client has a valid session token', null, { authedApi, world }); 
    await When('the client submits an overnight-locate-order for the test symbol', null, { authedApi, party, world }); 
    await Then('the HTTP response status should be 200', null, { world }); 
    await And('the executed quantity should not exceed the ordered quantity', null, { world }); 
  });

  test('A stray orderPx does not turn an overnight order into a limit order', { tag: ['@Regression', '@API', '@Overnight', '@RequiresPriorDayFill'] }, async ({ Given, When, Then, And, authedApi, party, world }) => { 
    await Given('the client has a valid session token', null, { authedApi, world }); 
    await When('the client submits an overnight-locate-order carrying an orderPx', null, { authedApi, party, world }); 
    await Then('the HTTP response status should be 200', null, { world }); 
    await And('the order type should be overnight', null, { world }); 
  });

  test('An overnight locate for an unrecognised symbol is reported as Unknown Symbol', { tag: ['@Regression', '@API', '@Overnight', '@Negative'] }, async ({ Given, When, Then, And, authedApi, party, world }) => { 
    await Given('the client has a valid session token', null, { authedApi, world }); 
    await When('the client submits an overnight-locate-order for "ZZZZQQ" quantity 100', null, { authedApi, party, world }); 
    await Then('the HTTP response status should be 200', null, { world }); 
    await And('the status code should be "UNKNOWN_SYMBOL"', null, { world }); 
  });

  test('An overnight document missing required fields is rejected', { tag: ['@Regression', '@API', '@Overnight', '@Negative'] }, async ({ When, Then, api, world }) => { 
    await When('the client POSTs an empty document to "/overnight"', null, { api, world }); 
    await Then('the HTTP response status should be 400', null, { world }); 
  });

  test('An overnight order with an invalid token is refused', { tag: ['@Regression', '@API', '@Overnight', '@Negative'] }, async ({ Given, When, Then, api, world }) => { 
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
  {"pwTestLine":6,"pickleLine":38,"tags":["@Smoke","@Regression","@API","@Overnight","@RequiresPriorDayFill"],"steps":[{"pwStepLine":7,"gherkinStepLine":39,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":40,"keywordType":"Action","textWithKeyword":"When the client submits an overnight-locate-order for the test symbol","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":41,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":10,"gherkinStepLine":42,"keywordType":"Outcome","textWithKeyword":"And the response should be valid JSON","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":43,"keywordType":"Outcome","textWithKeyword":"And the response should match the order schema","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":44,"keywordType":"Outcome","textWithKeyword":"And the order response should indicate no error","stepMatchArguments":[]}]},
  {"pwTestLine":15,"pickleLine":47,"tags":["@Smoke","@Regression","@API","@Overnight","@RequiresPriorDayFill"],"steps":[{"pwStepLine":16,"gherkinStepLine":48,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":49,"keywordType":"Action","textWithKeyword":"When the client submits an overnight-locate-order for the test symbol","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":50,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":19,"gherkinStepLine":51,"keywordType":"Outcome","textWithKeyword":"And the order type should be overnight","stepMatchArguments":[]}]},
  {"pwTestLine":22,"pickleLine":54,"tags":["@Regression","@API","@Overnight","@RequiresPriorDayFill"],"steps":[{"pwStepLine":23,"gherkinStepLine":55,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":56,"keywordType":"Action","textWithKeyword":"When the client submits an overnight-locate-order for the test symbol","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":57,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":26,"gherkinStepLine":58,"keywordType":"Outcome","textWithKeyword":"And the order should echo back the requested cliOrdId","stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":59,"keywordType":"Outcome","textWithKeyword":"And the order should carry a locateId","stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":60,"keywordType":"Outcome","textWithKeyword":"And the order should echo back the requested symbol and quantity","stepMatchArguments":[]}]},
  {"pwTestLine":31,"pickleLine":63,"tags":["@Regression","@API","@Overnight","@RequiresPriorDayFill"],"steps":[{"pwStepLine":32,"gherkinStepLine":64,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":65,"keywordType":"Action","textWithKeyword":"When the client submits an overnight-locate-order for the test symbol","stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":66,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":35,"gherkinStepLine":67,"keywordType":"Outcome","textWithKeyword":"And the executed quantity should not exceed the ordered quantity","stepMatchArguments":[]}]},
  {"pwTestLine":38,"pickleLine":76,"tags":["@Regression","@API","@Overnight","@RequiresPriorDayFill"],"steps":[{"pwStepLine":39,"gherkinStepLine":77,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":40,"gherkinStepLine":78,"keywordType":"Action","textWithKeyword":"When the client submits an overnight-locate-order carrying an orderPx","stepMatchArguments":[]},{"pwStepLine":41,"gherkinStepLine":79,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":42,"gherkinStepLine":80,"keywordType":"Outcome","textWithKeyword":"And the order type should be overnight","stepMatchArguments":[]}]},
  {"pwTestLine":45,"pickleLine":85,"tags":["@Regression","@API","@Overnight","@Negative"],"steps":[{"pwStepLine":46,"gherkinStepLine":86,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":47,"gherkinStepLine":87,"keywordType":"Action","textWithKeyword":"When the client submits an overnight-locate-order for \"ZZZZQQ\" quantity 100","stepMatchArguments":[{"group":{"start":49,"value":"\"ZZZZQQ\"","children":[{"start":50,"value":"ZZZZQQ","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":67,"value":"100","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":48,"gherkinStepLine":88,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":49,"gherkinStepLine":89,"keywordType":"Outcome","textWithKeyword":"And the status code should be \"UNKNOWN_SYMBOL\"","stepMatchArguments":[{"group":{"start":26,"value":"\"UNKNOWN_SYMBOL\"","children":[{"start":27,"value":"UNKNOWN_SYMBOL","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":52,"pickleLine":92,"tags":["@Regression","@API","@Overnight","@Negative"],"steps":[{"pwStepLine":53,"gherkinStepLine":93,"keywordType":"Action","textWithKeyword":"When the client POSTs an empty document to \"/overnight\"","stepMatchArguments":[{"group":{"start":38,"value":"\"/overnight\"","children":[{"start":39,"value":"/overnight","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":54,"gherkinStepLine":94,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 400","stepMatchArguments":[{"group":{"start":35,"value":"400","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":57,"pickleLine":97,"tags":["@Regression","@API","@Overnight","@Negative"],"steps":[{"pwStepLine":58,"gherkinStepLine":98,"keywordType":"Context","textWithKeyword":"Given the client has an invalid session token \"not-a-real-token-0000\"","stepMatchArguments":[{"group":{"start":40,"value":"\"not-a-real-token-0000\"","children":[{"start":41,"value":"not-a-real-token-0000","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":59,"gherkinStepLine":99,"keywordType":"Action","textWithKeyword":"When the client POSTs the following document to \"/overnight\":","stepMatchArguments":[{"group":{"start":43,"value":"\"/overnight\"","children":[{"start":44,"value":"/overnight","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":60,"gherkinStepLine":103,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 401","stepMatchArguments":[{"group":{"start":35,"value":"401","children":[]},"parameterTypeName":"int"}]}]},
]; // bdd-data-end