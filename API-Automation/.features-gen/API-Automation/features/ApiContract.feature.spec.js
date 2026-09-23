// Generated from: API-Automation\features\ApiContract.feature
import { test } from "../../../step-definitions/fixtures.js";

test.describe('Velocity JSON API - Transport contract and status codes (spec 1.1, 1.7, 1.9, 1.11)', () => {

  test('Responses use application/json with no media type parameters', { tag: ['@Smoke', '@Regression', '@API', '@Contract'] }, async ({ Given, When, Then, And, api, world }) => { 
    await Given('the client has no session token', null, { api, world }); 
    await When('the client logs on with valid credentials', null, { api, world }); 
    await Then('the HTTP response status should be 200', null, { world }); 
    await And('the response Content-Type header should be "application/json"', null, { world }); 
  });

  test.describe('Every entity URL answers a POST', () => {

    test('Example #1', { tag: ['@Regression', '@API', '@Contract'] }, async ({ Given, When, Then, api, authedApi, world }) => { 
      await Given('the client has a valid session token', null, { authedApi, world }); 
      await When('the client POSTs an empty document to "/quote"', null, { api, world }); 
      await Then('the response should be valid JSON', null, { world }); 
    });

    test('Example #2', { tag: ['@Regression', '@API', '@Contract'] }, async ({ Given, When, Then, api, authedApi, world }) => { 
      await Given('the client has a valid session token', null, { authedApi, world }); 
      await When('the client POSTs an empty document to "/limit"', null, { api, world }); 
      await Then('the response should be valid JSON', null, { world }); 
    });

    test('Example #3', { tag: ['@Regression', '@API', '@Contract'] }, async ({ Given, When, Then, api, authedApi, world }) => { 
      await Given('the client has a valid session token', null, { authedApi, world }); 
      await When('the client POSTs an empty document to "/overnight"', null, { api, world }); 
      await Then('the response should be valid JSON', null, { world }); 
    });

    test('Example #4', { tag: ['@Regression', '@API', '@Contract'] }, async ({ Given, When, Then, api, authedApi, world }) => { 
      await Given('the client has a valid session token', null, { authedApi, world }); 
      await When('the client POSTs an empty document to "/locate"', null, { api, world }); 
      await Then('the response should be valid JSON', null, { world }); 
    });

    test('Example #5', { tag: ['@Regression', '@API', '@Contract'] }, async ({ Given, When, Then, api, authedApi, world }) => { 
      await Given('the client has a valid session token', null, { authedApi, world }); 
      await When('the client POSTs an empty document to "/snapshot"', null, { api, world }); 
      await Then('the response should be valid JSON', null, { world }); 
    });

  });

  test.describe('Every endpoint carries a status object', () => {

    test('Example #1', { tag: ['@Regression', '@API', '@Contract'] }, async ({ Given, When, Then, api, authedApi, world }) => { 
      await Given('the client has a valid session token', null, { authedApi, world }); 
      await When('the client POSTs an empty document to "/quote"', null, { api, world }); 
      await Then('the response should carry a status object', null, { world }); 
    });

    test('Example #2', { tag: ['@Regression', '@API', '@Contract'] }, async ({ Given, When, Then, api, authedApi, world }) => { 
      await Given('the client has a valid session token', null, { authedApi, world }); 
      await When('the client POSTs an empty document to "/limit"', null, { api, world }); 
      await Then('the response should carry a status object', null, { world }); 
    });

    test('Example #3', { tag: ['@Regression', '@API', '@Contract'] }, async ({ Given, When, Then, api, authedApi, world }) => { 
      await Given('the client has a valid session token', null, { authedApi, world }); 
      await When('the client POSTs an empty document to "/overnight"', null, { api, world }); 
      await Then('the response should carry a status object', null, { world }); 
    });

    test('Example #4', { tag: ['@Regression', '@API', '@Contract'] }, async ({ Given, When, Then, api, authedApi, world }) => { 
      await Given('the client has a valid session token', null, { authedApi, world }); 
      await When('the client POSTs an empty document to "/locate"', null, { api, world }); 
      await Then('the response should carry a status object', null, { world }); 
    });

    test('Example #5', { tag: ['@Regression', '@API', '@Contract'] }, async ({ Given, When, Then, api, authedApi, world }) => { 
      await Given('the client has a valid session token', null, { authedApi, world }); 
      await When('the client POSTs an empty document to "/snapshot"', null, { api, world }); 
      await Then('the response should carry a status object', null, { world }); 
    });

  });

  test.describe('A malformed document returns 400 Bad Request', () => {

    test('Example #1', { tag: ['@Regression', '@API', '@Contract', '@Negative'] }, async ({ When, Then, api, world }) => { 
      await When('the client POSTs the following document to "/logon":', {"docString":{"content":"{\"token\": \"abc\", \"symbol\":}"}}, { api, world }); 
      await Then('the HTTP response status should be 400', null, { world }); 
    });

    test('Example #2', { tag: ['@Regression', '@API', '@Contract', '@Negative'] }, async ({ When, Then, api, world }) => { 
      await When('the client POSTs the following document to "/logout":', {"docString":{"content":"{\"token\": \"abc\", \"symbol\":}"}}, { api, world }); 
      await Then('the HTTP response status should be 400', null, { world }); 
    });

    test('Example #3', { tag: ['@Regression', '@API', '@Contract', '@Negative'] }, async ({ When, Then, api, world }) => { 
      await When('the client POSTs the following document to "/quote":', {"docString":{"content":"{\"token\": \"abc\", \"symbol\":}"}}, { api, world }); 
      await Then('the HTTP response status should be 400', null, { world }); 
    });

    test('Example #4', { tag: ['@Regression', '@API', '@Contract', '@Negative'] }, async ({ When, Then, api, world }) => { 
      await When('the client POSTs the following document to "/limit":', {"docString":{"content":"{\"token\": \"abc\", \"symbol\":}"}}, { api, world }); 
      await Then('the HTTP response status should be 400', null, { world }); 
    });

    test('Example #5', { tag: ['@Regression', '@API', '@Contract', '@Negative'] }, async ({ When, Then, api, world }) => { 
      await When('the client POSTs the following document to "/overnight":', {"docString":{"content":"{\"token\": \"abc\", \"symbol\":}"}}, { api, world }); 
      await Then('the HTTP response status should be 400', null, { world }); 
    });

    test('Example #6', { tag: ['@Regression', '@API', '@Contract', '@Negative'] }, async ({ When, Then, api, world }) => { 
      await When('the client POSTs the following document to "/locate":', {"docString":{"content":"{\"token\": \"abc\", \"symbol\":}"}}, { api, world }); 
      await Then('the HTTP response status should be 400', null, { world }); 
    });

    test('Example #7', { tag: ['@Regression', '@API', '@Contract', '@Negative'] }, async ({ When, Then, api, world }) => { 
      await When('the client POSTs the following document to "/snapshot":', {"docString":{"content":"{\"token\": \"abc\", \"symbol\":}"}}, { api, world }); 
      await Then('the HTTP response status should be 400', null, { world }); 
    });

  });

  test.describe('An authenticated endpoint returns 401 without a valid token', () => {

    test('Example #1', { tag: ['@Regression', '@API', '@Contract', '@Negative'] }, async ({ Given, When, Then, api, world }) => { 
      await Given('the client has an invalid session token "not-a-real-token-0000"', null, { api, world }); 
      await When('the client POSTs the following document to "/quote":', {"docString":{"content":"{\"token\": \"not-a-real-token-0000\", \"quoteReqId\": \"QR-contract\", \"cliOrdId\": \"CO-contract\", \"mpid\": \"TEST\", \"trader\": \"TEST\", \"symbol\": \"AAPL\", \"orderQty\": 100, \"orderPx\": 1.0}"}}, { api, world }); 
      await Then('the HTTP response status should be 401', null, { world }); 
    });

    test('Example #2', { tag: ['@Regression', '@API', '@Contract', '@Negative'] }, async ({ Given, When, Then, api, world }) => { 
      await Given('the client has an invalid session token "not-a-real-token-0000"', null, { api, world }); 
      await When('the client POSTs the following document to "/limit":', {"docString":{"content":"{\"token\": \"not-a-real-token-0000\", \"quoteReqId\": \"QR-contract\", \"cliOrdId\": \"CO-contract\", \"mpid\": \"TEST\", \"trader\": \"TEST\", \"symbol\": \"AAPL\", \"orderQty\": 100, \"orderPx\": 1.0}"}}, { api, world }); 
      await Then('the HTTP response status should be 401', null, { world }); 
    });

    test('Example #3', { tag: ['@Regression', '@API', '@Contract', '@Negative'] }, async ({ Given, When, Then, api, world }) => { 
      await Given('the client has an invalid session token "not-a-real-token-0000"', null, { api, world }); 
      await When('the client POSTs the following document to "/overnight":', {"docString":{"content":"{\"token\": \"not-a-real-token-0000\", \"quoteReqId\": \"QR-contract\", \"cliOrdId\": \"CO-contract\", \"mpid\": \"TEST\", \"trader\": \"TEST\", \"symbol\": \"AAPL\", \"orderQty\": 100, \"orderPx\": 1.0}"}}, { api, world }); 
      await Then('the HTTP response status should be 401', null, { world }); 
    });

    test('Example #4', { tag: ['@Regression', '@API', '@Contract', '@Negative'] }, async ({ Given, When, Then, api, world }) => { 
      await Given('the client has an invalid session token "not-a-real-token-0000"', null, { api, world }); 
      await When('the client POSTs the following document to "/locate":', {"docString":{"content":"{\"token\": \"not-a-real-token-0000\", \"quoteReqId\": \"QR-contract\", \"cliOrdId\": \"CO-contract\", \"mpid\": \"TEST\", \"trader\": \"TEST\", \"symbol\": \"AAPL\", \"orderQty\": 100, \"orderPx\": 1.0}"}}, { api, world }); 
      await Then('the HTTP response status should be 401', null, { world }); 
    });

    test('Example #5', { tag: ['@Regression', '@API', '@Contract', '@Negative'] }, async ({ Given, When, Then, api, world }) => { 
      await Given('the client has an invalid session token "not-a-real-token-0000"', null, { api, world }); 
      await When('the client POSTs the following document to "/snapshot":', {"docString":{"content":"{\"token\": \"not-a-real-token-0000\", \"quoteReqId\": \"QR-contract\", \"cliOrdId\": \"CO-contract\", \"mpid\": \"TEST\", \"trader\": \"TEST\", \"symbol\": \"AAPL\", \"orderQty\": 100, \"orderPx\": 1.0}"}}, { api, world }); 
      await Then('the HTTP response status should be 401', null, { world }); 
    });

  });

  test('A quote answers inside the latency budget', { tag: ['@Regression', '@API', '@Contract'] }, async ({ Given, When, Then, And, authedApi, party, world }) => { 
    await Given('the client has a valid session token', null, { authedApi, world }); 
    await When('the client requests a quote for the test symbol', null, { authedApi, party, world }); 
    await Then('the HTTP response status should be 200', null, { world }); 
    await And('the response should arrive within 5000 ms', null, { world }); 
  });

  test('The documented workflow runs end to end on a single session', { tag: ['@Smoke', '@Regression', '@API', '@Contract', '@Workflow'] }, async ({ Given, When, Then, And, api, party, world }) => { 
    await Given('a session established by this scenario', null, { api, world }); 
    await When('the same session requests a quote for the test symbol', null, { api, party, world }); 
    await Then('the HTTP response status should be 200', null, { world }); 
    await And('the quote should offer a positive price', null, { world }); 
    await When('the same session locates at the quoted price', null, { api, party, world }); 
    await Then('the HTTP response status should be 200', null, { world }); 
    await And('the order should carry a locateId', null, { world }); 
    await When('the same session restates that order', null, { api, world }); 
    await Then('the HTTP response status should be 200', null, { world }); 
    await When('the same session logs out', null, { api, world }); 
    await Then('the HTTP response status should be 200', null, { world }); 
    await And('the whole workflow should have succeeded', null, { world }); 
    await And('the invalidated token should be rejected on a subsequent request', null, { api, world }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('API-Automation\\features\\ApiContract.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":15,"tags":["@Smoke","@Regression","@API","@Contract"],"steps":[{"pwStepLine":7,"gherkinStepLine":16,"keywordType":"Context","textWithKeyword":"Given the client has no session token","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":17,"keywordType":"Action","textWithKeyword":"When the client logs on with valid credentials","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":10,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"And the response Content-Type header should be \"application/json\"","stepMatchArguments":[{"group":{"start":43,"value":"\"application/json\"","children":[{"start":44,"value":"application/json","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":15,"pickleLine":29,"tags":["@Regression","@API","@Contract"],"steps":[{"pwStepLine":16,"gherkinStepLine":23,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":24,"keywordType":"Action","textWithKeyword":"When the client POSTs an empty document to \"/quote\"","stepMatchArguments":[{"group":{"start":38,"value":"\"/quote\"","children":[{"start":39,"value":"/quote","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":18,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"Then the response should be valid JSON","stepMatchArguments":[]}]},
  {"pwTestLine":21,"pickleLine":30,"tags":["@Regression","@API","@Contract"],"steps":[{"pwStepLine":22,"gherkinStepLine":23,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":24,"keywordType":"Action","textWithKeyword":"When the client POSTs an empty document to \"/limit\"","stepMatchArguments":[{"group":{"start":38,"value":"\"/limit\"","children":[{"start":39,"value":"/limit","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":24,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"Then the response should be valid JSON","stepMatchArguments":[]}]},
  {"pwTestLine":27,"pickleLine":31,"tags":["@Regression","@API","@Contract"],"steps":[{"pwStepLine":28,"gherkinStepLine":23,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":24,"keywordType":"Action","textWithKeyword":"When the client POSTs an empty document to \"/overnight\"","stepMatchArguments":[{"group":{"start":38,"value":"\"/overnight\"","children":[{"start":39,"value":"/overnight","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":30,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"Then the response should be valid JSON","stepMatchArguments":[]}]},
  {"pwTestLine":33,"pickleLine":32,"tags":["@Regression","@API","@Contract"],"steps":[{"pwStepLine":34,"gherkinStepLine":23,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":35,"gherkinStepLine":24,"keywordType":"Action","textWithKeyword":"When the client POSTs an empty document to \"/locate\"","stepMatchArguments":[{"group":{"start":38,"value":"\"/locate\"","children":[{"start":39,"value":"/locate","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":36,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"Then the response should be valid JSON","stepMatchArguments":[]}]},
  {"pwTestLine":39,"pickleLine":33,"tags":["@Regression","@API","@Contract"],"steps":[{"pwStepLine":40,"gherkinStepLine":23,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":41,"gherkinStepLine":24,"keywordType":"Action","textWithKeyword":"When the client POSTs an empty document to \"/snapshot\"","stepMatchArguments":[{"group":{"start":38,"value":"\"/snapshot\"","children":[{"start":39,"value":"/snapshot","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":42,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"Then the response should be valid JSON","stepMatchArguments":[]}]},
  {"pwTestLine":49,"pickleLine":45,"tags":["@Regression","@API","@Contract"],"steps":[{"pwStepLine":50,"gherkinStepLine":39,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":51,"gherkinStepLine":40,"keywordType":"Action","textWithKeyword":"When the client POSTs an empty document to \"/quote\"","stepMatchArguments":[{"group":{"start":38,"value":"\"/quote\"","children":[{"start":39,"value":"/quote","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":52,"gherkinStepLine":41,"keywordType":"Outcome","textWithKeyword":"Then the response should carry a status object","stepMatchArguments":[]}]},
  {"pwTestLine":55,"pickleLine":46,"tags":["@Regression","@API","@Contract"],"steps":[{"pwStepLine":56,"gherkinStepLine":39,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":57,"gherkinStepLine":40,"keywordType":"Action","textWithKeyword":"When the client POSTs an empty document to \"/limit\"","stepMatchArguments":[{"group":{"start":38,"value":"\"/limit\"","children":[{"start":39,"value":"/limit","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":58,"gherkinStepLine":41,"keywordType":"Outcome","textWithKeyword":"Then the response should carry a status object","stepMatchArguments":[]}]},
  {"pwTestLine":61,"pickleLine":47,"tags":["@Regression","@API","@Contract"],"steps":[{"pwStepLine":62,"gherkinStepLine":39,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":63,"gherkinStepLine":40,"keywordType":"Action","textWithKeyword":"When the client POSTs an empty document to \"/overnight\"","stepMatchArguments":[{"group":{"start":38,"value":"\"/overnight\"","children":[{"start":39,"value":"/overnight","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":64,"gherkinStepLine":41,"keywordType":"Outcome","textWithKeyword":"Then the response should carry a status object","stepMatchArguments":[]}]},
  {"pwTestLine":67,"pickleLine":48,"tags":["@Regression","@API","@Contract"],"steps":[{"pwStepLine":68,"gherkinStepLine":39,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":69,"gherkinStepLine":40,"keywordType":"Action","textWithKeyword":"When the client POSTs an empty document to \"/locate\"","stepMatchArguments":[{"group":{"start":38,"value":"\"/locate\"","children":[{"start":39,"value":"/locate","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":70,"gherkinStepLine":41,"keywordType":"Outcome","textWithKeyword":"Then the response should carry a status object","stepMatchArguments":[]}]},
  {"pwTestLine":73,"pickleLine":49,"tags":["@Regression","@API","@Contract"],"steps":[{"pwStepLine":74,"gherkinStepLine":39,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":75,"gherkinStepLine":40,"keywordType":"Action","textWithKeyword":"When the client POSTs an empty document to \"/snapshot\"","stepMatchArguments":[{"group":{"start":38,"value":"\"/snapshot\"","children":[{"start":39,"value":"/snapshot","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":76,"gherkinStepLine":41,"keywordType":"Outcome","textWithKeyword":"Then the response should carry a status object","stepMatchArguments":[]}]},
  {"pwTestLine":83,"pickleLine":65,"tags":["@Regression","@API","@Contract","@Negative"],"steps":[{"pwStepLine":84,"gherkinStepLine":57,"keywordType":"Action","textWithKeyword":"When the client POSTs the following document to \"/logon\":","stepMatchArguments":[{"group":{"start":43,"value":"\"/logon\"","children":[{"start":44,"value":"/logon","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":85,"gherkinStepLine":61,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 400","stepMatchArguments":[{"group":{"start":35,"value":"400","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":88,"pickleLine":66,"tags":["@Regression","@API","@Contract","@Negative"],"steps":[{"pwStepLine":89,"gherkinStepLine":57,"keywordType":"Action","textWithKeyword":"When the client POSTs the following document to \"/logout\":","stepMatchArguments":[{"group":{"start":43,"value":"\"/logout\"","children":[{"start":44,"value":"/logout","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":90,"gherkinStepLine":61,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 400","stepMatchArguments":[{"group":{"start":35,"value":"400","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":93,"pickleLine":67,"tags":["@Regression","@API","@Contract","@Negative"],"steps":[{"pwStepLine":94,"gherkinStepLine":57,"keywordType":"Action","textWithKeyword":"When the client POSTs the following document to \"/quote\":","stepMatchArguments":[{"group":{"start":43,"value":"\"/quote\"","children":[{"start":44,"value":"/quote","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":95,"gherkinStepLine":61,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 400","stepMatchArguments":[{"group":{"start":35,"value":"400","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":98,"pickleLine":68,"tags":["@Regression","@API","@Contract","@Negative"],"steps":[{"pwStepLine":99,"gherkinStepLine":57,"keywordType":"Action","textWithKeyword":"When the client POSTs the following document to \"/limit\":","stepMatchArguments":[{"group":{"start":43,"value":"\"/limit\"","children":[{"start":44,"value":"/limit","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":100,"gherkinStepLine":61,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 400","stepMatchArguments":[{"group":{"start":35,"value":"400","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":103,"pickleLine":69,"tags":["@Regression","@API","@Contract","@Negative"],"steps":[{"pwStepLine":104,"gherkinStepLine":57,"keywordType":"Action","textWithKeyword":"When the client POSTs the following document to \"/overnight\":","stepMatchArguments":[{"group":{"start":43,"value":"\"/overnight\"","children":[{"start":44,"value":"/overnight","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":105,"gherkinStepLine":61,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 400","stepMatchArguments":[{"group":{"start":35,"value":"400","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":108,"pickleLine":70,"tags":["@Regression","@API","@Contract","@Negative"],"steps":[{"pwStepLine":109,"gherkinStepLine":57,"keywordType":"Action","textWithKeyword":"When the client POSTs the following document to \"/locate\":","stepMatchArguments":[{"group":{"start":43,"value":"\"/locate\"","children":[{"start":44,"value":"/locate","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":110,"gherkinStepLine":61,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 400","stepMatchArguments":[{"group":{"start":35,"value":"400","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":113,"pickleLine":71,"tags":["@Regression","@API","@Contract","@Negative"],"steps":[{"pwStepLine":114,"gherkinStepLine":57,"keywordType":"Action","textWithKeyword":"When the client POSTs the following document to \"/snapshot\":","stepMatchArguments":[{"group":{"start":43,"value":"\"/snapshot\"","children":[{"start":44,"value":"/snapshot","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":115,"gherkinStepLine":61,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 400","stepMatchArguments":[{"group":{"start":35,"value":"400","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":122,"pickleLine":85,"tags":["@Regression","@API","@Contract","@Negative"],"steps":[{"pwStepLine":123,"gherkinStepLine":76,"keywordType":"Context","textWithKeyword":"Given the client has an invalid session token \"not-a-real-token-0000\"","stepMatchArguments":[{"group":{"start":40,"value":"\"not-a-real-token-0000\"","children":[{"start":41,"value":"not-a-real-token-0000","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":124,"gherkinStepLine":77,"keywordType":"Action","textWithKeyword":"When the client POSTs the following document to \"/quote\":","stepMatchArguments":[{"group":{"start":43,"value":"\"/quote\"","children":[{"start":44,"value":"/quote","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":125,"gherkinStepLine":81,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 401","stepMatchArguments":[{"group":{"start":35,"value":"401","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":128,"pickleLine":86,"tags":["@Regression","@API","@Contract","@Negative"],"steps":[{"pwStepLine":129,"gherkinStepLine":76,"keywordType":"Context","textWithKeyword":"Given the client has an invalid session token \"not-a-real-token-0000\"","stepMatchArguments":[{"group":{"start":40,"value":"\"not-a-real-token-0000\"","children":[{"start":41,"value":"not-a-real-token-0000","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":130,"gherkinStepLine":77,"keywordType":"Action","textWithKeyword":"When the client POSTs the following document to \"/limit\":","stepMatchArguments":[{"group":{"start":43,"value":"\"/limit\"","children":[{"start":44,"value":"/limit","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":131,"gherkinStepLine":81,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 401","stepMatchArguments":[{"group":{"start":35,"value":"401","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":134,"pickleLine":87,"tags":["@Regression","@API","@Contract","@Negative"],"steps":[{"pwStepLine":135,"gherkinStepLine":76,"keywordType":"Context","textWithKeyword":"Given the client has an invalid session token \"not-a-real-token-0000\"","stepMatchArguments":[{"group":{"start":40,"value":"\"not-a-real-token-0000\"","children":[{"start":41,"value":"not-a-real-token-0000","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":136,"gherkinStepLine":77,"keywordType":"Action","textWithKeyword":"When the client POSTs the following document to \"/overnight\":","stepMatchArguments":[{"group":{"start":43,"value":"\"/overnight\"","children":[{"start":44,"value":"/overnight","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":137,"gherkinStepLine":81,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 401","stepMatchArguments":[{"group":{"start":35,"value":"401","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":140,"pickleLine":88,"tags":["@Regression","@API","@Contract","@Negative"],"steps":[{"pwStepLine":141,"gherkinStepLine":76,"keywordType":"Context","textWithKeyword":"Given the client has an invalid session token \"not-a-real-token-0000\"","stepMatchArguments":[{"group":{"start":40,"value":"\"not-a-real-token-0000\"","children":[{"start":41,"value":"not-a-real-token-0000","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":142,"gherkinStepLine":77,"keywordType":"Action","textWithKeyword":"When the client POSTs the following document to \"/locate\":","stepMatchArguments":[{"group":{"start":43,"value":"\"/locate\"","children":[{"start":44,"value":"/locate","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":143,"gherkinStepLine":81,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 401","stepMatchArguments":[{"group":{"start":35,"value":"401","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":146,"pickleLine":89,"tags":["@Regression","@API","@Contract","@Negative"],"steps":[{"pwStepLine":147,"gherkinStepLine":76,"keywordType":"Context","textWithKeyword":"Given the client has an invalid session token \"not-a-real-token-0000\"","stepMatchArguments":[{"group":{"start":40,"value":"\"not-a-real-token-0000\"","children":[{"start":41,"value":"not-a-real-token-0000","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":148,"gherkinStepLine":77,"keywordType":"Action","textWithKeyword":"When the client POSTs the following document to \"/snapshot\":","stepMatchArguments":[{"group":{"start":43,"value":"\"/snapshot\"","children":[{"start":44,"value":"/snapshot","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":149,"gherkinStepLine":81,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 401","stepMatchArguments":[{"group":{"start":35,"value":"401","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":154,"pickleLine":97,"tags":["@Regression","@API","@Contract"],"steps":[{"pwStepLine":155,"gherkinStepLine":98,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":156,"gherkinStepLine":99,"keywordType":"Action","textWithKeyword":"When the client requests a quote for the test symbol","stepMatchArguments":[]},{"pwStepLine":157,"gherkinStepLine":100,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":158,"gherkinStepLine":101,"keywordType":"Outcome","textWithKeyword":"And the response should arrive within 5000 ms","stepMatchArguments":[{"group":{"start":34,"value":"5000","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":161,"pickleLine":109,"tags":["@Smoke","@Regression","@API","@Contract","@Workflow"],"steps":[{"pwStepLine":162,"gherkinStepLine":110,"keywordType":"Context","textWithKeyword":"Given a session established by this scenario","stepMatchArguments":[]},{"pwStepLine":163,"gherkinStepLine":111,"keywordType":"Action","textWithKeyword":"When the same session requests a quote for the test symbol","stepMatchArguments":[]},{"pwStepLine":164,"gherkinStepLine":112,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":165,"gherkinStepLine":113,"keywordType":"Outcome","textWithKeyword":"And the quote should offer a positive price","stepMatchArguments":[]},{"pwStepLine":166,"gherkinStepLine":114,"keywordType":"Action","textWithKeyword":"When the same session locates at the quoted price","stepMatchArguments":[]},{"pwStepLine":167,"gherkinStepLine":115,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":168,"gherkinStepLine":116,"keywordType":"Outcome","textWithKeyword":"And the order should carry a locateId","stepMatchArguments":[]},{"pwStepLine":169,"gherkinStepLine":117,"keywordType":"Action","textWithKeyword":"When the same session restates that order","stepMatchArguments":[]},{"pwStepLine":170,"gherkinStepLine":118,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":171,"gherkinStepLine":119,"keywordType":"Action","textWithKeyword":"When the same session logs out","stepMatchArguments":[]},{"pwStepLine":172,"gherkinStepLine":120,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":173,"gherkinStepLine":121,"keywordType":"Outcome","textWithKeyword":"And the whole workflow should have succeeded","stepMatchArguments":[]},{"pwStepLine":174,"gherkinStepLine":122,"keywordType":"Outcome","textWithKeyword":"And the invalidated token should be rejected on a subsequent request","stepMatchArguments":[]}]},
]; // bdd-data-end