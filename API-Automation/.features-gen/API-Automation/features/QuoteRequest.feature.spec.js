// Generated from: API-Automation\features\QuoteRequest.feature
import { test } from "../../../step-definitions/fixtures.js";

test.describe('Velocity JSON API - Quote Request (spec section 4)', () => {

  test('A quote for an in-inventory symbol returns a price and a size', { tag: ['@Smoke', '@Regression', '@API', '@Quote', '@SLL-C1694'] }, async ({ Given, When, Then, And, authedApi, party, world }) => {
    await Given('the client has a valid session token', null, { authedApi, world });
    await When('the client requests a quote for the test symbol', null, { authedApi, party, world });
    await Then('the HTTP response status should be 200', null, { world });
    await And('the response should be valid JSON', null, { world });
    await And('the response should match the quote schema', null, { world });
    await And('the quote id should be -1', null, { world });
    await And('the quote should offer a positive price', null, { world });
    await And('the quote should report available inventory', null, { world });
  });

  test('A quote echoes back every field the client sent', { tag: ['@Regression', '@API', '@Quote', '@SLL-C1695'] }, async ({ Given, When, Then, And, authedApi, party, world }) => {
    await Given('the client has a valid session token', null, { authedApi, world });
    await When('the client requests a quote for the test symbol', null, { authedApi, party, world });
    await Then('the HTTP response status should be 200', null, { world });
    await And('the quote should echo back the requested symbol', null, { world });
    await And('the quote should echo back the requested quoteReqId', null, { world });
    await And('the quote should echo back the requesting mpid and trader', null, { party, world });
    await And('the quote should report the rounded requested quantity', null, { world });
  });

  test('A quantity below 100 shares is rounded down for quoting', { tag: ['@Regression', '@API', '@Quote', '@SLL-C1696'] }, async ({ Given, When, Then, And, authedApi, party, world }) => {
    await Given('the client has a valid session token', null, { authedApi, world });
    await When('the client requests a quote below one round lot', null, { authedApi, party, world });
    await Then('the HTTP response status should be 200', null, { world });
    await And('the response should match the quote schema', null, { world });
    await And('the quote should apply the under-lot rounding rule', null, { world });
  });

  test('A quote never offers more inventory than was asked for', { tag: ['@Regression', '@API', '@Quote', '@SLL-C1697'] }, async ({ Given, When, Then, And, authedApi, party, world }) => {
    await Given('the client has a valid session token', null, { authedApi, world });
    await When('the client requests a quote for the test symbol with quantity 150', null, { authedApi, party, world });
    await Then('the HTTP response status should be 200', null, { world });
    await And('the quote offerSize should not exceed the requested quantity', null, { world });
    await And('the quote should report the rounded requested quantity', null, { world });
  });

  test('Quoting repeatedly is allowed and each request id is echoed', { tag: ['@Regression', '@API', '@Quote', '@SLL-C1698'] }, async ({ Given, When, Then, And, authedApi, party, world }) => {
    await Given('the client has a valid session token', null, { authedApi, world });
    await When('the client requests 3 quotes for the test symbol', null, { authedApi, party, world });
    await Then('the HTTP response status should be 200', null, { world });
    await And('every quote in the batch should echo its request id', null, { world });
  });

  test('An unrecognised symbol returns no available inventory', { tag: ['@Regression', '@API', '@Quote', '@Negative', '@SLL-C1699'] }, async ({ Given, When, Then, And, authedApi, party, world }) => {
    await Given('the client has a valid session token', null, { authedApi, world });
    await When('the client requests a quote for the unknown symbol', null, { authedApi, party, world });
    await Then('the HTTP response status should be 200', null, { world });
    await And('the status code should be "NO_INVENTORY"', null, { world });
  });

  test('A quote request without a token is refused', { tag: ['@Regression', '@API', '@Quote', '@Negative', '@SLL-C1700'] }, async ({ Given, When, Then, api, world }) => {
    await Given('the client has no session token', null, { api, world });
    await When('the client POSTs the following document to "/quote":', {"docString":{"content":"{\"token\": \"\", \"quoteReqId\": \"QR-no-token\", \"mpid\": \"TEST\", \"trader\": \"TEST\", \"symbol\": \"AAPL\"}"}}, { api, world });
    await Then('the HTTP response status should be 401', null, { world });
  });

  test('A quote request with an invalid token is refused', { tag: ['@Regression', '@API', '@Quote', '@Negative', '@SLL-C1701'] }, async ({ Given, When, Then, api, world }) => {
    await Given('the client has an invalid session token "not-a-real-token-0000"', null, { api, world });
    await When('the client POSTs the following document to "/quote":', {"docString":{"content":"{\"token\": \"not-a-real-token-0000\", \"quoteReqId\": \"QR-bad-token\", \"mpid\": \"TEST\", \"trader\": \"TEST\", \"symbol\": \"AAPL\"}"}}, { api, world });
    await Then('the HTTP response status should be 401', null, { world });
  });

  test('A quote document missing required fields is rejected', { tag: ['@Regression', '@API', '@Quote', '@Negative', '@SLL-C1702'] }, async ({ Given, When, Then, api, authedApi, world }) => {
    await Given('the client has a valid session token', null, { authedApi, world });
    await When('the client POSTs a document with only the session token to "/quote"', null, { api, world });
    await Then('the HTTP response status should be 400', null, { world });
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('API-Automation\\features\\QuoteRequest.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":14,"tags":["@Smoke","@Regression","@API","@Quote","@SLL-C1694"],"steps":[{"pwStepLine":7,"gherkinStepLine":15,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":16,"keywordType":"Action","textWithKeyword":"When the client requests a quote for the test symbol","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":10,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"And the response should be valid JSON","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"And the response should match the quote schema","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"And the quote id should be -1","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"And the quote should offer a positive price","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"And the quote should report available inventory","stepMatchArguments":[]}]},
  {"pwTestLine":17,"pickleLine":25,"tags":["@Regression","@API","@Quote","@SLL-C1695"],"steps":[{"pwStepLine":18,"gherkinStepLine":26,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":27,"keywordType":"Action","textWithKeyword":"When the client requests a quote for the test symbol","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":28,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":21,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"And the quote should echo back the requested symbol","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"And the quote should echo back the requested quoteReqId","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":31,"keywordType":"Outcome","textWithKeyword":"And the quote should echo back the requesting mpid and trader","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"And the quote should report the rounded requested quantity","stepMatchArguments":[]}]},
  {"pwTestLine":27,"pickleLine":35,"tags":["@Regression","@API","@Quote","@SLL-C1696"],"steps":[{"pwStepLine":28,"gherkinStepLine":36,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":37,"keywordType":"Action","textWithKeyword":"When the client requests a quote below one round lot","stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":38,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":31,"gherkinStepLine":39,"keywordType":"Outcome","textWithKeyword":"And the response should match the quote schema","stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":40,"keywordType":"Outcome","textWithKeyword":"And the quote should apply the under-lot rounding rule","stepMatchArguments":[]}]},
  {"pwTestLine":35,"pickleLine":43,"tags":["@Regression","@API","@Quote","@SLL-C1697"],"steps":[{"pwStepLine":36,"gherkinStepLine":44,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":37,"gherkinStepLine":45,"keywordType":"Action","textWithKeyword":"When the client requests a quote for the test symbol with quantity 150","stepMatchArguments":[]},{"pwStepLine":38,"gherkinStepLine":46,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":39,"gherkinStepLine":47,"keywordType":"Outcome","textWithKeyword":"And the quote offerSize should not exceed the requested quantity","stepMatchArguments":[]},{"pwStepLine":40,"gherkinStepLine":48,"keywordType":"Outcome","textWithKeyword":"And the quote should report the rounded requested quantity","stepMatchArguments":[]}]},
  {"pwTestLine":43,"pickleLine":51,"tags":["@Regression","@API","@Quote","@SLL-C1698"],"steps":[{"pwStepLine":44,"gherkinStepLine":52,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":45,"gherkinStepLine":53,"keywordType":"Action","textWithKeyword":"When the client requests 3 quotes for the test symbol","stepMatchArguments":[{"group":{"start":20,"value":"3","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":46,"gherkinStepLine":54,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":47,"gherkinStepLine":55,"keywordType":"Outcome","textWithKeyword":"And every quote in the batch should echo its request id","stepMatchArguments":[]}]},
  {"pwTestLine":50,"pickleLine":60,"tags":["@Regression","@API","@Quote","@Negative","@SLL-C1699"],"steps":[{"pwStepLine":51,"gherkinStepLine":61,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":52,"gherkinStepLine":62,"keywordType":"Action","textWithKeyword":"When the client requests a quote for the unknown symbol","stepMatchArguments":[]},{"pwStepLine":53,"gherkinStepLine":63,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":54,"gherkinStepLine":64,"keywordType":"Outcome","textWithKeyword":"And the status code should be \"NO_INVENTORY\"","stepMatchArguments":[{"group":{"start":26,"value":"\"NO_INVENTORY\"","children":[{"start":27,"value":"NO_INVENTORY","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":57,"pickleLine":67,"tags":["@Regression","@API","@Quote","@Negative","@SLL-C1700"],"steps":[{"pwStepLine":58,"gherkinStepLine":68,"keywordType":"Context","textWithKeyword":"Given the client has no session token","stepMatchArguments":[]},{"pwStepLine":59,"gherkinStepLine":69,"keywordType":"Action","textWithKeyword":"When the client POSTs the following document to \"/quote\":","stepMatchArguments":[{"group":{"start":43,"value":"\"/quote\"","children":[{"start":44,"value":"/quote","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":60,"gherkinStepLine":73,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 401","stepMatchArguments":[{"group":{"start":35,"value":"401","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":63,"pickleLine":76,"tags":["@Regression","@API","@Quote","@Negative","@SLL-C1701"],"steps":[{"pwStepLine":64,"gherkinStepLine":77,"keywordType":"Context","textWithKeyword":"Given the client has an invalid session token \"not-a-real-token-0000\"","stepMatchArguments":[{"group":{"start":40,"value":"\"not-a-real-token-0000\"","children":[{"start":41,"value":"not-a-real-token-0000","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":65,"gherkinStepLine":78,"keywordType":"Action","textWithKeyword":"When the client POSTs the following document to \"/quote\":","stepMatchArguments":[{"group":{"start":43,"value":"\"/quote\"","children":[{"start":44,"value":"/quote","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":66,"gherkinStepLine":82,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 401","stepMatchArguments":[{"group":{"start":35,"value":"401","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":69,"pickleLine":85,"tags":["@Regression","@API","@Quote","@Negative","@SLL-C1702"],"steps":[{"pwStepLine":70,"gherkinStepLine":86,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":71,"gherkinStepLine":87,"keywordType":"Action","textWithKeyword":"When the client POSTs a document with only the session token to \"/quote\"","stepMatchArguments":[{"group":{"start":59,"value":"\"/quote\"","children":[{"start":60,"value":"/quote","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":72,"gherkinStepLine":88,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 400","stepMatchArguments":[{"group":{"start":35,"value":"400","children":[]},"parameterTypeName":"int"}]}]},
]; // bdd-data-end