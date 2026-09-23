// Generated from: API-Automation\features\QuoteRequest.feature
import { test } from "../../../step-definitions/fixtures.js";

test.describe('Velocity JSON API - Quote Request (spec 1.5)', () => {

  test('A quote for an in-inventory symbol returns a price and a size', { tag: ['@Smoke', '@Regression', '@API', '@Quote'] }, async ({ Given, When, Then, And, authedApi, party, world }) => { 
    await Given('the client has a valid session token', null, { authedApi, world }); 
    await When('the client requests a quote for the test symbol', null, { authedApi, party, world }); 
    await Then('the HTTP response status should be 200', null, { world }); 
    await And('the response should be valid JSON', null, { world }); 
    await And('the response should match the quote schema', null, { world }); 
    await And('the quote should carry a server-assigned id', null, { world }); 
    await And('the quote should offer a positive price', null, { world }); 
    await And('the quote should report available inventory', null, { world }); 
  });

  test('A quote echoes back every field the client sent', { tag: ['@Regression', '@API', '@Quote'] }, async ({ Given, When, Then, And, authedApi, party, world }) => { 
    await Given('the client has a valid session token', null, { authedApi, world }); 
    await When('the client requests a quote for the test symbol', null, { authedApi, party, world }); 
    await Then('the HTTP response status should be 200', null, { world }); 
    await And('the quote should echo back the requested symbol', null, { world }); 
    await And('the quote should echo back the requested quoteReqId', null, { world }); 
    await And('the quote should echo back the requesting mpid and trader', null, { party, world }); 
  });

  test('orderQty is optional on a quote request', { tag: ['@Regression', '@API', '@Quote'] }, async ({ Given, When, Then, And, authedApi, party, world }) => { 
    await Given('the client has a valid session token', null, { authedApi, world }); 
    await When('the client requests a quote for "AAPL" without a quantity', null, { authedApi, party, world }); 
    await Then('the HTTP response status should be 200', null, { world }); 
    await And('the response should match the quote schema', null, { world }); 
  });

  test('A quote never offers more inventory than was asked for', { tag: ['@Regression', '@API', '@Quote'] }, async ({ Given, When, Then, And, authedApi, party, world }) => { 
    await Given('the client has a valid session token', null, { authedApi, world }); 
    await When('the client requests a quote for "AAPL" with quantity 100', null, { authedApi, party, world }); 
    await Then('the HTTP response status should be 200', null, { world }); 
    await And('the quote offerSize should not exceed the requested quantity', null, { world }); 
  });

  test('Quoting repeatedly is allowed and each quote is distinct', { tag: ['@Regression', '@API', '@Quote'] }, async ({ Given, When, Then, And, authedApi, party, world }) => { 
    await Given('the client has a valid session token', null, { authedApi, world }); 
    await When('the client requests 3 quotes for the test symbol', null, { authedApi, party, world }); 
    await Then('the HTTP response status should be 200', null, { world }); 
    await And('every quote in the batch should have a distinct id', null, { world }); 
  });

  test('An unrecognised symbol is reported as Unknown Symbol', { tag: ['@Regression', '@API', '@Quote', '@Negative'] }, async ({ Given, When, Then, And, authedApi, party, world }) => { 
    await Given('the client has a valid session token', null, { authedApi, world }); 
    await When('the client requests a quote for the unknown symbol', null, { authedApi, party, world }); 
    await Then('the HTTP response status should be 200', null, { world }); 
    await And('the status code should be "UNKNOWN_SYMBOL"', null, { world }); 
    await And('the status message should not be empty', null, { world }); 
  });

  test('A quote request without a token is refused', { tag: ['@Regression', '@API', '@Quote', '@Negative'] }, async ({ Given, When, Then, api, world }) => { 
    await Given('the client has no session token', null, { api, world }); 
    await When('the client POSTs the following document to "/quote":', {"docString":{"content":"{\"token\": \"\", \"quoteReqId\": \"QR-no-token\", \"mpid\": \"TEST\", \"trader\": \"TEST\", \"symbol\": \"AAPL\"}"}}, { api, world }); 
    await Then('the HTTP response status should be 401', null, { world }); 
  });

  test('A quote request with an invalid token is refused', { tag: ['@Regression', '@API', '@Quote', '@Negative'] }, async ({ Given, When, Then, api, world }) => { 
    await Given('the client has an invalid session token "not-a-real-token-0000"', null, { api, world }); 
    await When('the client POSTs the following document to "/quote":', {"docString":{"content":"{\"token\": \"not-a-real-token-0000\", \"quoteReqId\": \"QR-bad-token\", \"mpid\": \"TEST\", \"trader\": \"TEST\", \"symbol\": \"AAPL\"}"}}, { api, world }); 
    await Then('the HTTP response status should be 401', null, { world }); 
  });

  test('A quote document missing required fields is rejected', { tag: ['@Regression', '@API', '@Quote', '@Negative'] }, async ({ When, Then, api, world }) => { 
    await When('the client POSTs an empty document to "/quote"', null, { api, world }); 
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
  {"pwTestLine":6,"pickleLine":14,"tags":["@Smoke","@Regression","@API","@Quote"],"steps":[{"pwStepLine":7,"gherkinStepLine":15,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":16,"keywordType":"Action","textWithKeyword":"When the client requests a quote for the test symbol","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":10,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"And the response should be valid JSON","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"And the response should match the quote schema","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"And the quote should carry a server-assigned id","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"And the quote should offer a positive price","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"And the quote should report available inventory","stepMatchArguments":[]}]},
  {"pwTestLine":17,"pickleLine":25,"tags":["@Regression","@API","@Quote"],"steps":[{"pwStepLine":18,"gherkinStepLine":26,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":27,"keywordType":"Action","textWithKeyword":"When the client requests a quote for the test symbol","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":28,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":21,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"And the quote should echo back the requested symbol","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"And the quote should echo back the requested quoteReqId","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":31,"keywordType":"Outcome","textWithKeyword":"And the quote should echo back the requesting mpid and trader","stepMatchArguments":[]}]},
  {"pwTestLine":26,"pickleLine":34,"tags":["@Regression","@API","@Quote"],"steps":[{"pwStepLine":27,"gherkinStepLine":35,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":36,"keywordType":"Action","textWithKeyword":"When the client requests a quote for \"AAPL\" without a quantity","stepMatchArguments":[{"group":{"start":32,"value":"\"AAPL\"","children":[{"start":33,"value":"AAPL","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":29,"gherkinStepLine":37,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":30,"gherkinStepLine":38,"keywordType":"Outcome","textWithKeyword":"And the response should match the quote schema","stepMatchArguments":[]}]},
  {"pwTestLine":33,"pickleLine":41,"tags":["@Regression","@API","@Quote"],"steps":[{"pwStepLine":34,"gherkinStepLine":42,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":35,"gherkinStepLine":43,"keywordType":"Action","textWithKeyword":"When the client requests a quote for \"AAPL\" with quantity 100","stepMatchArguments":[{"group":{"start":32,"value":"\"AAPL\"","children":[{"start":33,"value":"AAPL","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":53,"value":"100","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":36,"gherkinStepLine":44,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":37,"gherkinStepLine":45,"keywordType":"Outcome","textWithKeyword":"And the quote offerSize should not exceed the requested quantity","stepMatchArguments":[]}]},
  {"pwTestLine":40,"pickleLine":48,"tags":["@Regression","@API","@Quote"],"steps":[{"pwStepLine":41,"gherkinStepLine":49,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":42,"gherkinStepLine":50,"keywordType":"Action","textWithKeyword":"When the client requests 3 quotes for the test symbol","stepMatchArguments":[{"group":{"start":20,"value":"3","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":43,"gherkinStepLine":51,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":44,"gherkinStepLine":52,"keywordType":"Outcome","textWithKeyword":"And every quote in the batch should have a distinct id","stepMatchArguments":[]}]},
  {"pwTestLine":47,"pickleLine":57,"tags":["@Regression","@API","@Quote","@Negative"],"steps":[{"pwStepLine":48,"gherkinStepLine":58,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":49,"gherkinStepLine":59,"keywordType":"Action","textWithKeyword":"When the client requests a quote for the unknown symbol","stepMatchArguments":[]},{"pwStepLine":50,"gherkinStepLine":60,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":51,"gherkinStepLine":61,"keywordType":"Outcome","textWithKeyword":"And the status code should be \"UNKNOWN_SYMBOL\"","stepMatchArguments":[{"group":{"start":26,"value":"\"UNKNOWN_SYMBOL\"","children":[{"start":27,"value":"UNKNOWN_SYMBOL","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":52,"gherkinStepLine":62,"keywordType":"Outcome","textWithKeyword":"And the status message should not be empty","stepMatchArguments":[]}]},
  {"pwTestLine":55,"pickleLine":65,"tags":["@Regression","@API","@Quote","@Negative"],"steps":[{"pwStepLine":56,"gherkinStepLine":66,"keywordType":"Context","textWithKeyword":"Given the client has no session token","stepMatchArguments":[]},{"pwStepLine":57,"gherkinStepLine":67,"keywordType":"Action","textWithKeyword":"When the client POSTs the following document to \"/quote\":","stepMatchArguments":[{"group":{"start":43,"value":"\"/quote\"","children":[{"start":44,"value":"/quote","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":58,"gherkinStepLine":71,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 401","stepMatchArguments":[{"group":{"start":35,"value":"401","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":61,"pickleLine":74,"tags":["@Regression","@API","@Quote","@Negative"],"steps":[{"pwStepLine":62,"gherkinStepLine":75,"keywordType":"Context","textWithKeyword":"Given the client has an invalid session token \"not-a-real-token-0000\"","stepMatchArguments":[{"group":{"start":40,"value":"\"not-a-real-token-0000\"","children":[{"start":41,"value":"not-a-real-token-0000","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":63,"gherkinStepLine":76,"keywordType":"Action","textWithKeyword":"When the client POSTs the following document to \"/quote\":","stepMatchArguments":[{"group":{"start":43,"value":"\"/quote\"","children":[{"start":44,"value":"/quote","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":64,"gherkinStepLine":80,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 401","stepMatchArguments":[{"group":{"start":35,"value":"401","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":67,"pickleLine":83,"tags":["@Regression","@API","@Quote","@Negative"],"steps":[{"pwStepLine":68,"gherkinStepLine":84,"keywordType":"Action","textWithKeyword":"When the client POSTs an empty document to \"/quote\"","stepMatchArguments":[{"group":{"start":38,"value":"\"/quote\"","children":[{"start":39,"value":"/quote","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":69,"gherkinStepLine":85,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 400","stepMatchArguments":[{"group":{"start":35,"value":"400","children":[]},"parameterTypeName":"int"}]}]},
]; // bdd-data-end