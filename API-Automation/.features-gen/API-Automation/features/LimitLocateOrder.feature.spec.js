// Generated from: API-Automation\features\LimitLocateOrder.feature
import { test } from "../../../step-definitions/fixtures.js";

test.describe('Velocity JSON API - Limit-Locate-Order (spec section 5)', () => {

  test('A locate priced from a fresh quote is filled', { tag: ['@Smoke', '@Regression', '@API', '@Limit', '@SLL-C1651'] }, async ({ Given, When, Then, And, authedApi, party, world }) => {
    await Given('the client has a valid session token', null, { authedApi, world });
    await When('the client requests a quote for the test symbol', null, { authedApi, party, world });
    await Then('the quote should offer a positive price', null, { world });
    await And('the quoted price should be remembered for the locate request', null, { world });
    await When('the client submits a limit-locate-order at the quoted price', null, { authedApi, party, world });
    await Then('the HTTP response status should be 200', null, { world });
    await And('the response should match the order schema', null, { world });
    await And('the order response should indicate no error', null, { world });
    await And('the order status should be a fill', null, { world });
  });

  test('A filled locate returns an identifiable order', { tag: ['@Smoke', '@Regression', '@API', '@Limit', '@SLL-C1652'] }, async ({ Given, When, Then, And, authedApi, party, world }) => {
    await Given('the client has a valid session token', null, { authedApi, world });
    await When('the client requests a quote for the test symbol', null, { authedApi, party, world });
    await And('the quoted price should be remembered for the locate request', null, { world });
    await When('the client submits a limit-locate-order at the quoted price', null, { authedApi, party, world });
    await Then('the HTTP response status should be 200', null, { world });
    await And('the order should echo back the requested cliOrdId', null, { world });
    await And('the order should carry a locateId', null, { world });
    await And('the order should echo back the requested symbol and quantity', null, { world });
  });

  test('The price guarantee holds - execution is never above the limit', { tag: ['@Regression', '@API', '@Limit', '@SLL-C1653'] }, async ({ Given, When, Then, And, authedApi, party, world }) => {
    await Given('the client has a valid session token', null, { authedApi, world });
    await When('the client requests a quote for the test symbol', null, { authedApi, party, world });
    await And('the quoted price should be remembered for the locate request', null, { world });
    await When('the client submits a limit-locate-order at the quoted price', null, { authedApi, party, world });
    await Then('the HTTP response status should be 200', null, { world });
    await And('the executed price should not exceed the limit price', null, { world });
    await And('the executed quantity should not exceed the ordered quantity', null, { world });
  });

  test('A generously priced locate fills the full quantity', { tag: ['@Regression', '@API', '@Limit', '@SLL-C1654'] }, async ({ Given, When, Then, And, authedApi, party, world }) => {
    await Given('the client has a valid session token', null, { authedApi, world });
    await When('the client submits a limit-locate-order for "AAPL" quantity 100 at price 999.0', null, { authedApi, party, world });
    await Then('the HTTP response status should be 200', null, { world });
    await And('the response should match the order schema', null, { world });
    await And('the order response should indicate no error', null, { world });
    await And('the executed quantity should equal the ordered quantity', null, { world });
  });

  test('A locate priced below the market is reported as Price Too Low', { tag: ['@Regression', '@API', '@Limit', '@Negative', '@SLL-C1655'] }, async ({ Given, When, Then, And, authedApi, party, world }) => {
    await Given('the client has a valid session token', null, { authedApi, world });
    await When('the client submits a limit-locate-order at a price below the market', null, { authedApi, party, world });
    await Then('the HTTP response status should be 200', null, { world });
    await And('the status code should be "PRICE_TOO_LOW"', null, { world });
    await And('the order status should be "REJECTED"', null, { world });
  });

  test('A locate for an unrecognised symbol is rejected for no inventory', { tag: ['@Regression', '@API', '@Limit', '@Negative', '@SLL-C1656'] }, async ({ Given, When, Then, And, authedApi, party, world }) => {
    await Given('the client has a valid session token', null, { authedApi, world });
    await When('the client submits a limit-locate-order for "ZZZZQQ" quantity 100 at price 999.0', null, { authedApi, party, world });
    await Then('the HTTP response status should be 200', null, { world });
    await And('the status code should be "NO_INVENTORY"', null, { world });
    await And('the order status should be "REJECTED"', null, { world });
  });

  test('A quantity beyond what is permitted is refused', { tag: ['@Regression', '@API', '@Limit', '@Negative', '@SLL-C1657'] }, async ({ Given, When, Then, And, authedApi, party, world }) => {
    await Given('the client has a valid session token', null, { authedApi, world });
    await When('the client submits a limit-locate-order for "AAPL" quantity 100000000 at price 999.0', null, { authedApi, party, world });
    await Then('the HTTP response status should be 200', null, { world });
    await And('the status message should not be empty', null, { world });
    await And('the order status should be "REJECTED"', null, { world });
  });

  test('A limit document missing required fields is rejected', { tag: ['@Regression', '@API', '@Limit', '@Negative', '@SLL-C1658'] }, async ({ Given, When, Then, api, authedApi, world }) => {
    await Given('the client has a valid session token', null, { authedApi, world });
    await When('the client POSTs a document with only the session token to "/limit"', null, { api, world });
    await Then('the HTTP response status should be 400', null, { world });
  });

  test('A limit order with an invalid token is refused', { tag: ['@Regression', '@API', '@Limit', '@Negative', '@SLL-C1659'] }, async ({ Given, When, Then, api, world }) => {
    await Given('the client has an invalid session token "not-a-real-token-0000"', null, { api, world });
    await When('the client POSTs the following document to "/limit":', {"docString":{"content":"{\"token\": \"not-a-real-token-0000\", \"cliOrdId\": \"CO-bad-token\", \"mpid\": \"TEST\", \"trader\": \"TEST\", \"symbol\": \"AAPL\", \"orderQty\": 100, \"orderPx\": 1.0}"}}, { api, world });
    await Then('the HTTP response status should be 401', null, { world });
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('API-Automation\\features\\LimitLocateOrder.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":17,"tags":["@Smoke","@Regression","@API","@Limit","@SLL-C1651"],"steps":[{"pwStepLine":7,"gherkinStepLine":18,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":19,"keywordType":"Action","textWithKeyword":"When the client requests a quote for the test symbol","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"Then the quote should offer a positive price","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"And the quoted price should be remembered for the locate request","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":22,"keywordType":"Action","textWithKeyword":"When the client submits a limit-locate-order at the quoted price","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":13,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"And the response should match the order schema","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"And the order response should indicate no error","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"And the order status should be a fill","stepMatchArguments":[]}]},
  {"pwTestLine":18,"pickleLine":29,"tags":["@Smoke","@Regression","@API","@Limit","@SLL-C1652"],"steps":[{"pwStepLine":19,"gherkinStepLine":30,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":31,"keywordType":"Action","textWithKeyword":"When the client requests a quote for the test symbol","stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":32,"keywordType":"Action","textWithKeyword":"And the quoted price should be remembered for the locate request","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":33,"keywordType":"Action","textWithKeyword":"When the client submits a limit-locate-order at the quoted price","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":34,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":24,"gherkinStepLine":35,"keywordType":"Outcome","textWithKeyword":"And the order should echo back the requested cliOrdId","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":36,"keywordType":"Outcome","textWithKeyword":"And the order should carry a locateId","stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":37,"keywordType":"Outcome","textWithKeyword":"And the order should echo back the requested symbol and quantity","stepMatchArguments":[]}]},
  {"pwTestLine":29,"pickleLine":40,"tags":["@Regression","@API","@Limit","@SLL-C1653"],"steps":[{"pwStepLine":30,"gherkinStepLine":41,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":42,"keywordType":"Action","textWithKeyword":"When the client requests a quote for the test symbol","stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":43,"keywordType":"Action","textWithKeyword":"And the quoted price should be remembered for the locate request","stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":44,"keywordType":"Action","textWithKeyword":"When the client submits a limit-locate-order at the quoted price","stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":45,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":35,"gherkinStepLine":46,"keywordType":"Outcome","textWithKeyword":"And the executed price should not exceed the limit price","stepMatchArguments":[]},{"pwStepLine":36,"gherkinStepLine":47,"keywordType":"Outcome","textWithKeyword":"And the executed quantity should not exceed the ordered quantity","stepMatchArguments":[]}]},
  {"pwTestLine":39,"pickleLine":50,"tags":["@Regression","@API","@Limit","@SLL-C1654"],"steps":[{"pwStepLine":40,"gherkinStepLine":51,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":41,"gherkinStepLine":52,"keywordType":"Action","textWithKeyword":"When the client submits a limit-locate-order for \"AAPL\" quantity 100 at price 999.0","stepMatchArguments":[{"group":{"start":44,"value":"\"AAPL\"","children":[{"start":45,"value":"AAPL","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":60,"value":"100","children":[]},"parameterTypeName":"int"},{"group":{"start":73,"value":"999.0","children":[]},"parameterTypeName":"float"}]},{"pwStepLine":42,"gherkinStepLine":53,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":43,"gherkinStepLine":54,"keywordType":"Outcome","textWithKeyword":"And the response should match the order schema","stepMatchArguments":[]},{"pwStepLine":44,"gherkinStepLine":55,"keywordType":"Outcome","textWithKeyword":"And the order response should indicate no error","stepMatchArguments":[]},{"pwStepLine":45,"gherkinStepLine":56,"keywordType":"Outcome","textWithKeyword":"And the executed quantity should equal the ordered quantity","stepMatchArguments":[]}]},
  {"pwTestLine":48,"pickleLine":61,"tags":["@Regression","@API","@Limit","@Negative","@SLL-C1655"],"steps":[{"pwStepLine":49,"gherkinStepLine":62,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":50,"gherkinStepLine":63,"keywordType":"Action","textWithKeyword":"When the client submits a limit-locate-order at a price below the market","stepMatchArguments":[]},{"pwStepLine":51,"gherkinStepLine":64,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":52,"gherkinStepLine":65,"keywordType":"Outcome","textWithKeyword":"And the status code should be \"PRICE_TOO_LOW\"","stepMatchArguments":[{"group":{"start":26,"value":"\"PRICE_TOO_LOW\"","children":[{"start":27,"value":"PRICE_TOO_LOW","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":53,"gherkinStepLine":66,"keywordType":"Outcome","textWithKeyword":"And the order status should be \"REJECTED\"","stepMatchArguments":[{"group":{"start":27,"value":"\"REJECTED\"","children":[{"start":28,"value":"REJECTED","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":56,"pickleLine":69,"tags":["@Regression","@API","@Limit","@Negative","@SLL-C1656"],"steps":[{"pwStepLine":57,"gherkinStepLine":70,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":58,"gherkinStepLine":71,"keywordType":"Action","textWithKeyword":"When the client submits a limit-locate-order for \"ZZZZQQ\" quantity 100 at price 999.0","stepMatchArguments":[{"group":{"start":44,"value":"\"ZZZZQQ\"","children":[{"start":45,"value":"ZZZZQQ","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":62,"value":"100","children":[]},"parameterTypeName":"int"},{"group":{"start":75,"value":"999.0","children":[]},"parameterTypeName":"float"}]},{"pwStepLine":59,"gherkinStepLine":72,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":60,"gherkinStepLine":73,"keywordType":"Outcome","textWithKeyword":"And the status code should be \"NO_INVENTORY\"","stepMatchArguments":[{"group":{"start":26,"value":"\"NO_INVENTORY\"","children":[{"start":27,"value":"NO_INVENTORY","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":61,"gherkinStepLine":74,"keywordType":"Outcome","textWithKeyword":"And the order status should be \"REJECTED\"","stepMatchArguments":[{"group":{"start":27,"value":"\"REJECTED\"","children":[{"start":28,"value":"REJECTED","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":64,"pickleLine":77,"tags":["@Regression","@API","@Limit","@Negative","@SLL-C1657"],"steps":[{"pwStepLine":65,"gherkinStepLine":78,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":66,"gherkinStepLine":79,"keywordType":"Action","textWithKeyword":"When the client submits a limit-locate-order for \"AAPL\" quantity 100000000 at price 999.0","stepMatchArguments":[{"group":{"start":44,"value":"\"AAPL\"","children":[{"start":45,"value":"AAPL","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":60,"value":"100000000","children":[]},"parameterTypeName":"int"},{"group":{"start":79,"value":"999.0","children":[]},"parameterTypeName":"float"}]},{"pwStepLine":67,"gherkinStepLine":80,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":68,"gherkinStepLine":81,"keywordType":"Outcome","textWithKeyword":"And the status message should not be empty","stepMatchArguments":[]},{"pwStepLine":69,"gherkinStepLine":82,"keywordType":"Outcome","textWithKeyword":"And the order status should be \"REJECTED\"","stepMatchArguments":[{"group":{"start":27,"value":"\"REJECTED\"","children":[{"start":28,"value":"REJECTED","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":72,"pickleLine":85,"tags":["@Regression","@API","@Limit","@Negative","@SLL-C1658"],"steps":[{"pwStepLine":73,"gherkinStepLine":86,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":74,"gherkinStepLine":87,"keywordType":"Action","textWithKeyword":"When the client POSTs a document with only the session token to \"/limit\"","stepMatchArguments":[{"group":{"start":59,"value":"\"/limit\"","children":[{"start":60,"value":"/limit","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":75,"gherkinStepLine":88,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 400","stepMatchArguments":[{"group":{"start":35,"value":"400","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":78,"pickleLine":91,"tags":["@Regression","@API","@Limit","@Negative","@SLL-C1659"],"steps":[{"pwStepLine":79,"gherkinStepLine":92,"keywordType":"Context","textWithKeyword":"Given the client has an invalid session token \"not-a-real-token-0000\"","stepMatchArguments":[{"group":{"start":40,"value":"\"not-a-real-token-0000\"","children":[{"start":41,"value":"not-a-real-token-0000","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":80,"gherkinStepLine":93,"keywordType":"Action","textWithKeyword":"When the client POSTs the following document to \"/limit\":","stepMatchArguments":[{"group":{"start":43,"value":"\"/limit\"","children":[{"start":44,"value":"/limit","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":81,"gherkinStepLine":97,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 401","stepMatchArguments":[{"group":{"start":35,"value":"401","children":[]},"parameterTypeName":"int"}]}]},
]; // bdd-data-end