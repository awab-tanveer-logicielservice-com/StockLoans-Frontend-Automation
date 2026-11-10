// Generated from: API-Automation\features\ApiContract.feature
import { test } from "../../../step-definitions/fixtures.js";

test.describe('Velocity JSON API - Transport contract and status codes (specification 1.5)', () => {

  test('Responses use application/json with UTF-8 charset', { tag: ['@Smoke', '@Regression', '@API', '@Contract', '@SLL-C1644'] }, async ({ Given, When, Then, And, api, world }) => {
    await Given('the client has no session token', null, { api, world });
    await When('the client logs on with valid credentials', null, { api, world });
    await Then('the HTTP response status should be 200', null, { world });
    await And('the response Content-Type header should be "application/json;charset=utf-8"', null, { world });
  });

  test.describe('Every entity URL answers a POST', () => {

    test('Example #1', { tag: ['@Regression', '@API', '@Contract', '@SLL-C1645'] }, async ({ Given, When, Then, api, authedApi, world }) => {
      await Given('the client has a valid session token', null, { authedApi, world });
      await When('the client POSTs a document with only the session token to "/quote"', null, { api, world });
      await Then('the response should be valid JSON', null, { world });
    });

    test('Example #2', { tag: ['@Regression', '@API', '@Contract', '@SLL-C1645'] }, async ({ Given, When, Then, api, authedApi, world }) => {
      await Given('the client has a valid session token', null, { authedApi, world });
      await When('the client POSTs a document with only the session token to "/limit"', null, { api, world });
      await Then('the response should be valid JSON', null, { world });
    });

    test('Example #3', { tag: ['@Regression', '@API', '@Contract', '@SLL-C1645'] }, async ({ Given, When, Then, api, authedApi, world }) => {
      await Given('the client has a valid session token', null, { authedApi, world });
      await When('the client POSTs a document with only the session token to "/overnight"', null, { api, world });
      await Then('the response should be valid JSON', null, { world });
    });

    test('Example #4', { tag: ['@Regression', '@API', '@Contract', '@SLL-C1645'] }, async ({ Given, When, Then, api, authedApi, world }) => {
      await Given('the client has a valid session token', null, { authedApi, world });
      await When('the client POSTs a document with only the session token to "/locate"', null, { api, world });
      await Then('the response should be valid JSON', null, { world });
    });

    test('Example #5', { tag: ['@Regression', '@API', '@Contract', '@SLL-C1645'] }, async ({ Given, When, Then, api, authedApi, world }) => {
      await Given('the client has a valid session token', null, { authedApi, world });
      await When('the client POSTs a document with only the session token to "/snapshot"', null, { api, world });
      await Then('the response should be valid JSON', null, { world });
    });

  });

  test.describe('Every endpoint carries a status object', () => {

    test('Example #1', { tag: ['@Regression', '@API', '@Contract', '@SLL-C1646'] }, async ({ Given, When, Then, api, authedApi, world }) => {
      await Given('the client has a valid session token', null, { authedApi, world });
      await When('the client POSTs a document with only the session token to "/quote"', null, { api, world });
      await Then('the response should carry a status object', null, { world });
    });

    test('Example #2', { tag: ['@Regression', '@API', '@Contract', '@SLL-C1646'] }, async ({ Given, When, Then, api, authedApi, world }) => {
      await Given('the client has a valid session token', null, { authedApi, world });
      await When('the client POSTs a document with only the session token to "/limit"', null, { api, world });
      await Then('the response should carry a status object', null, { world });
    });

    test('Example #3', { tag: ['@Regression', '@API', '@Contract', '@SLL-C1646'] }, async ({ Given, When, Then, api, authedApi, world }) => {
      await Given('the client has a valid session token', null, { authedApi, world });
      await When('the client POSTs a document with only the session token to "/overnight"', null, { api, world });
      await Then('the response should carry a status object', null, { world });
    });

    test('Example #4', { tag: ['@Regression', '@API', '@Contract', '@SLL-C1646'] }, async ({ Given, When, Then, api, authedApi, world }) => {
      await Given('the client has a valid session token', null, { authedApi, world });
      await When('the client POSTs a document with only the session token to "/locate"', null, { api, world });
      await Then('the response should carry a status object', null, { world });
    });

    test('Example #5', { tag: ['@Regression', '@API', '@Contract', '@SLL-C1646'] }, async ({ Given, When, Then, api, authedApi, world }) => {
      await Given('the client has a valid session token', null, { authedApi, world });
      await When('the client POSTs a document with only the session token to "/snapshot"', null, { api, world });
      await Then('the response should carry a status object', null, { world });
    });

  });

  test('Invalid JSON returns the documented early-authentication error', { tag: ['@Regression', '@API', '@Contract', '@Negative', '@SLL-C1647'] }, async ({ When, Then, And, api, world }) => {
    await When('the client POSTs the following document to "/logon":', {"docString":{"content":"{\"user\": \"invalid\", \"password\":}"}}, { api, world });
    await Then('the HTTP response status should be 401', null, { world });
    await And('the response should carry a status object', null, { world });
  });

  test.describe('An authenticated endpoint returns 401 without a valid token', () => {

    test('Example #1', { tag: ['@Regression', '@API', '@Contract', '@Negative', '@SLL-C1648'] }, async ({ Given, When, Then, api, world }) => {
      await Given('the client has an invalid session token "not-a-real-token-0000"', null, { api, world });
      await When('the client POSTs the following document to "/quote":', {"docString":{"content":"{\"token\": \"not-a-real-token-0000\", \"quoteReqId\": \"QR-contract\", \"cliOrdId\": \"CO-contract\", \"mpid\": \"TEST\", \"trader\": \"TEST\", \"symbol\": \"AAPL\", \"orderQty\": 100, \"orderPx\": 1.0}"}}, { api, world });
      await Then('the HTTP response status should be 401', null, { world });
    });

    test('Example #2', { tag: ['@Regression', '@API', '@Contract', '@Negative', '@SLL-C1648'] }, async ({ Given, When, Then, api, world }) => {
      await Given('the client has an invalid session token "not-a-real-token-0000"', null, { api, world });
      await When('the client POSTs the following document to "/limit":', {"docString":{"content":"{\"token\": \"not-a-real-token-0000\", \"quoteReqId\": \"QR-contract\", \"cliOrdId\": \"CO-contract\", \"mpid\": \"TEST\", \"trader\": \"TEST\", \"symbol\": \"AAPL\", \"orderQty\": 100, \"orderPx\": 1.0}"}}, { api, world });
      await Then('the HTTP response status should be 401', null, { world });
    });

    test('Example #3', { tag: ['@Regression', '@API', '@Contract', '@Negative', '@SLL-C1648'] }, async ({ Given, When, Then, api, world }) => {
      await Given('the client has an invalid session token "not-a-real-token-0000"', null, { api, world });
      await When('the client POSTs the following document to "/overnight":', {"docString":{"content":"{\"token\": \"not-a-real-token-0000\", \"quoteReqId\": \"QR-contract\", \"cliOrdId\": \"CO-contract\", \"mpid\": \"TEST\", \"trader\": \"TEST\", \"symbol\": \"AAPL\", \"orderQty\": 100, \"orderPx\": 1.0}"}}, { api, world });
      await Then('the HTTP response status should be 401', null, { world });
    });

    test('Example #4', { tag: ['@Regression', '@API', '@Contract', '@Negative', '@SLL-C1648'] }, async ({ Given, When, Then, api, world }) => {
      await Given('the client has an invalid session token "not-a-real-token-0000"', null, { api, world });
      await When('the client POSTs the following document to "/locate":', {"docString":{"content":"{\"token\": \"not-a-real-token-0000\", \"quoteReqId\": \"QR-contract\", \"cliOrdId\": \"CO-contract\", \"mpid\": \"TEST\", \"trader\": \"TEST\", \"symbol\": \"AAPL\", \"orderQty\": 100, \"orderPx\": 1.0}"}}, { api, world });
      await Then('the HTTP response status should be 401', null, { world });
    });

    test('Example #5', { tag: ['@Regression', '@API', '@Contract', '@Negative', '@SLL-C1648'] }, async ({ Given, When, Then, api, world }) => {
      await Given('the client has an invalid session token "not-a-real-token-0000"', null, { api, world });
      await When('the client POSTs the following document to "/snapshot":', {"docString":{"content":"{\"token\": \"not-a-real-token-0000\", \"quoteReqId\": \"QR-contract\", \"cliOrdId\": \"CO-contract\", \"mpid\": \"TEST\", \"trader\": \"TEST\", \"symbol\": \"AAPL\", \"orderQty\": 100, \"orderPx\": 1.0}"}}, { api, world });
      await Then('the HTTP response status should be 401', null, { world });
    });

  });

  test('A quote answers inside the latency budget', { tag: ['@Regression', '@API', '@Contract', '@SLL-C1649'] }, async ({ Given, When, Then, And, authedApi, party, world }) => {
    await Given('the client has a valid session token', null, { authedApi, world });
    await When('the client requests a quote for the test symbol', null, { authedApi, party, world });
    await Then('the HTTP response status should be 200', null, { world });
    await And('the response should arrive within 5000 ms', null, { world });
  });

  test('The APIs run in the documented order on one session', { tag: ['@Smoke', '@Regression', '@API', '@Contract', '@Workflow', '@OrderedWorkflow', '@SLL-C1650'] }, async ({ Given, When, Then, And, api, party, world }) => {
    await Given('a session established by this scenario', null, { api, world });
    await When('the same session requests a quote for the test symbol', null, { api, party, world });
    await And('the same session requests a quote list snapshot', null, { api, party, world });
    await And('the same session submits a limit order at the quoted price', null, { api, party, world });
    await And('the same session restates that order', null, { api, world });
    await And('the same session submits an overnight order for the test symbol', null, { api, party, world });
    await And('the same session logs out', null, { api, world });
    await Then('the ordered workflow should have succeeded', null, { world });
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('API-Automation\\features\\ApiContract.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":14,"tags":["@Smoke","@Regression","@API","@Contract","@SLL-C1644"],"steps":[{"pwStepLine":7,"gherkinStepLine":15,"keywordType":"Context","textWithKeyword":"Given the client has no session token","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":16,"keywordType":"Action","textWithKeyword":"When the client logs on with valid credentials","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":10,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"And the response Content-Type header should be \"application/json;charset=utf-8\"","stepMatchArguments":[{"group":{"start":43,"value":"\"application/json;charset=utf-8\"","children":[{"start":44,"value":"application/json;charset=utf-8","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":15,"pickleLine":28,"tags":["@Regression","@API","@Contract","@SLL-C1645"],"steps":[{"pwStepLine":16,"gherkinStepLine":22,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":23,"keywordType":"Action","textWithKeyword":"When the client POSTs a document with only the session token to \"/quote\"","stepMatchArguments":[{"group":{"start":59,"value":"\"/quote\"","children":[{"start":60,"value":"/quote","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":18,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"Then the response should be valid JSON","stepMatchArguments":[]}]},
  {"pwTestLine":21,"pickleLine":29,"tags":["@Regression","@API","@Contract","@SLL-C1645"],"steps":[{"pwStepLine":22,"gherkinStepLine":22,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":23,"keywordType":"Action","textWithKeyword":"When the client POSTs a document with only the session token to \"/limit\"","stepMatchArguments":[{"group":{"start":59,"value":"\"/limit\"","children":[{"start":60,"value":"/limit","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":24,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"Then the response should be valid JSON","stepMatchArguments":[]}]},
  {"pwTestLine":27,"pickleLine":30,"tags":["@Regression","@API","@Contract","@SLL-C1645"],"steps":[{"pwStepLine":28,"gherkinStepLine":22,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":23,"keywordType":"Action","textWithKeyword":"When the client POSTs a document with only the session token to \"/overnight\"","stepMatchArguments":[{"group":{"start":59,"value":"\"/overnight\"","children":[{"start":60,"value":"/overnight","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":30,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"Then the response should be valid JSON","stepMatchArguments":[]}]},
  {"pwTestLine":33,"pickleLine":31,"tags":["@Regression","@API","@Contract","@SLL-C1645"],"steps":[{"pwStepLine":34,"gherkinStepLine":22,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":35,"gherkinStepLine":23,"keywordType":"Action","textWithKeyword":"When the client POSTs a document with only the session token to \"/locate\"","stepMatchArguments":[{"group":{"start":59,"value":"\"/locate\"","children":[{"start":60,"value":"/locate","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":36,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"Then the response should be valid JSON","stepMatchArguments":[]}]},
  {"pwTestLine":39,"pickleLine":32,"tags":["@Regression","@API","@Contract","@SLL-C1645"],"steps":[{"pwStepLine":40,"gherkinStepLine":22,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":41,"gherkinStepLine":23,"keywordType":"Action","textWithKeyword":"When the client POSTs a document with only the session token to \"/snapshot\"","stepMatchArguments":[{"group":{"start":59,"value":"\"/snapshot\"","children":[{"start":60,"value":"/snapshot","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":42,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"Then the response should be valid JSON","stepMatchArguments":[]}]},
  {"pwTestLine":49,"pickleLine":44,"tags":["@Regression","@API","@Contract","@SLL-C1646"],"steps":[{"pwStepLine":50,"gherkinStepLine":38,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":51,"gherkinStepLine":39,"keywordType":"Action","textWithKeyword":"When the client POSTs a document with only the session token to \"/quote\"","stepMatchArguments":[{"group":{"start":59,"value":"\"/quote\"","children":[{"start":60,"value":"/quote","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":52,"gherkinStepLine":40,"keywordType":"Outcome","textWithKeyword":"Then the response should carry a status object","stepMatchArguments":[]}]},
  {"pwTestLine":55,"pickleLine":45,"tags":["@Regression","@API","@Contract","@SLL-C1646"],"steps":[{"pwStepLine":56,"gherkinStepLine":38,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":57,"gherkinStepLine":39,"keywordType":"Action","textWithKeyword":"When the client POSTs a document with only the session token to \"/limit\"","stepMatchArguments":[{"group":{"start":59,"value":"\"/limit\"","children":[{"start":60,"value":"/limit","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":58,"gherkinStepLine":40,"keywordType":"Outcome","textWithKeyword":"Then the response should carry a status object","stepMatchArguments":[]}]},
  {"pwTestLine":61,"pickleLine":46,"tags":["@Regression","@API","@Contract","@SLL-C1646"],"steps":[{"pwStepLine":62,"gherkinStepLine":38,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":63,"gherkinStepLine":39,"keywordType":"Action","textWithKeyword":"When the client POSTs a document with only the session token to \"/overnight\"","stepMatchArguments":[{"group":{"start":59,"value":"\"/overnight\"","children":[{"start":60,"value":"/overnight","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":64,"gherkinStepLine":40,"keywordType":"Outcome","textWithKeyword":"Then the response should carry a status object","stepMatchArguments":[]}]},
  {"pwTestLine":67,"pickleLine":47,"tags":["@Regression","@API","@Contract","@SLL-C1646"],"steps":[{"pwStepLine":68,"gherkinStepLine":38,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":69,"gherkinStepLine":39,"keywordType":"Action","textWithKeyword":"When the client POSTs a document with only the session token to \"/locate\"","stepMatchArguments":[{"group":{"start":59,"value":"\"/locate\"","children":[{"start":60,"value":"/locate","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":70,"gherkinStepLine":40,"keywordType":"Outcome","textWithKeyword":"Then the response should carry a status object","stepMatchArguments":[]}]},
  {"pwTestLine":73,"pickleLine":48,"tags":["@Regression","@API","@Contract","@SLL-C1646"],"steps":[{"pwStepLine":74,"gherkinStepLine":38,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":75,"gherkinStepLine":39,"keywordType":"Action","textWithKeyword":"When the client POSTs a document with only the session token to \"/snapshot\"","stepMatchArguments":[{"group":{"start":59,"value":"\"/snapshot\"","children":[{"start":60,"value":"/snapshot","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":76,"gherkinStepLine":40,"keywordType":"Outcome","textWithKeyword":"Then the response should carry a status object","stepMatchArguments":[]}]},
  {"pwTestLine":81,"pickleLine":53,"tags":["@Regression","@API","@Contract","@Negative","@SLL-C1647"],"steps":[{"pwStepLine":82,"gherkinStepLine":54,"keywordType":"Action","textWithKeyword":"When the client POSTs the following document to \"/logon\":","stepMatchArguments":[{"group":{"start":43,"value":"\"/logon\"","children":[{"start":44,"value":"/logon","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":83,"gherkinStepLine":58,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 401","stepMatchArguments":[{"group":{"start":35,"value":"401","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":84,"gherkinStepLine":59,"keywordType":"Outcome","textWithKeyword":"And the response should carry a status object","stepMatchArguments":[]}]},
  {"pwTestLine":89,"pickleLine":73,"tags":["@Regression","@API","@Contract","@Negative","@SLL-C1648"],"steps":[{"pwStepLine":90,"gherkinStepLine":64,"keywordType":"Context","textWithKeyword":"Given the client has an invalid session token \"not-a-real-token-0000\"","stepMatchArguments":[{"group":{"start":40,"value":"\"not-a-real-token-0000\"","children":[{"start":41,"value":"not-a-real-token-0000","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":91,"gherkinStepLine":65,"keywordType":"Action","textWithKeyword":"When the client POSTs the following document to \"/quote\":","stepMatchArguments":[{"group":{"start":43,"value":"\"/quote\"","children":[{"start":44,"value":"/quote","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":92,"gherkinStepLine":69,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 401","stepMatchArguments":[{"group":{"start":35,"value":"401","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":95,"pickleLine":74,"tags":["@Regression","@API","@Contract","@Negative","@SLL-C1648"],"steps":[{"pwStepLine":96,"gherkinStepLine":64,"keywordType":"Context","textWithKeyword":"Given the client has an invalid session token \"not-a-real-token-0000\"","stepMatchArguments":[{"group":{"start":40,"value":"\"not-a-real-token-0000\"","children":[{"start":41,"value":"not-a-real-token-0000","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":97,"gherkinStepLine":65,"keywordType":"Action","textWithKeyword":"When the client POSTs the following document to \"/limit\":","stepMatchArguments":[{"group":{"start":43,"value":"\"/limit\"","children":[{"start":44,"value":"/limit","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":98,"gherkinStepLine":69,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 401","stepMatchArguments":[{"group":{"start":35,"value":"401","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":101,"pickleLine":75,"tags":["@Regression","@API","@Contract","@Negative","@SLL-C1648"],"steps":[{"pwStepLine":102,"gherkinStepLine":64,"keywordType":"Context","textWithKeyword":"Given the client has an invalid session token \"not-a-real-token-0000\"","stepMatchArguments":[{"group":{"start":40,"value":"\"not-a-real-token-0000\"","children":[{"start":41,"value":"not-a-real-token-0000","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":103,"gherkinStepLine":65,"keywordType":"Action","textWithKeyword":"When the client POSTs the following document to \"/overnight\":","stepMatchArguments":[{"group":{"start":43,"value":"\"/overnight\"","children":[{"start":44,"value":"/overnight","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":104,"gherkinStepLine":69,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 401","stepMatchArguments":[{"group":{"start":35,"value":"401","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":107,"pickleLine":76,"tags":["@Regression","@API","@Contract","@Negative","@SLL-C1648"],"steps":[{"pwStepLine":108,"gherkinStepLine":64,"keywordType":"Context","textWithKeyword":"Given the client has an invalid session token \"not-a-real-token-0000\"","stepMatchArguments":[{"group":{"start":40,"value":"\"not-a-real-token-0000\"","children":[{"start":41,"value":"not-a-real-token-0000","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":109,"gherkinStepLine":65,"keywordType":"Action","textWithKeyword":"When the client POSTs the following document to \"/locate\":","stepMatchArguments":[{"group":{"start":43,"value":"\"/locate\"","children":[{"start":44,"value":"/locate","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":110,"gherkinStepLine":69,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 401","stepMatchArguments":[{"group":{"start":35,"value":"401","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":113,"pickleLine":77,"tags":["@Regression","@API","@Contract","@Negative","@SLL-C1648"],"steps":[{"pwStepLine":114,"gherkinStepLine":64,"keywordType":"Context","textWithKeyword":"Given the client has an invalid session token \"not-a-real-token-0000\"","stepMatchArguments":[{"group":{"start":40,"value":"\"not-a-real-token-0000\"","children":[{"start":41,"value":"not-a-real-token-0000","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":115,"gherkinStepLine":65,"keywordType":"Action","textWithKeyword":"When the client POSTs the following document to \"/snapshot\":","stepMatchArguments":[{"group":{"start":43,"value":"\"/snapshot\"","children":[{"start":44,"value":"/snapshot","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":116,"gherkinStepLine":69,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 401","stepMatchArguments":[{"group":{"start":35,"value":"401","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":121,"pickleLine":85,"tags":["@Regression","@API","@Contract","@SLL-C1649"],"steps":[{"pwStepLine":122,"gherkinStepLine":86,"keywordType":"Context","textWithKeyword":"Given the client has a valid session token","stepMatchArguments":[]},{"pwStepLine":123,"gherkinStepLine":87,"keywordType":"Action","textWithKeyword":"When the client requests a quote for the test symbol","stepMatchArguments":[]},{"pwStepLine":124,"gherkinStepLine":88,"keywordType":"Outcome","textWithKeyword":"Then the HTTP response status should be 200","stepMatchArguments":[{"group":{"start":35,"value":"200","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":125,"gherkinStepLine":89,"keywordType":"Outcome","textWithKeyword":"And the response should arrive within 5000 ms","stepMatchArguments":[{"group":{"start":34,"value":"5000","children":[]},"parameterTypeName":"int"}]}]},
  {"pwTestLine":128,"pickleLine":95,"tags":["@Smoke","@Regression","@API","@Contract","@Workflow","@OrderedWorkflow","@SLL-C1650"],"steps":[{"pwStepLine":129,"gherkinStepLine":96,"keywordType":"Context","textWithKeyword":"Given a session established by this scenario","stepMatchArguments":[]},{"pwStepLine":130,"gherkinStepLine":97,"keywordType":"Action","textWithKeyword":"When the same session requests a quote for the test symbol","stepMatchArguments":[]},{"pwStepLine":131,"gherkinStepLine":98,"keywordType":"Action","textWithKeyword":"And the same session requests a quote list snapshot","stepMatchArguments":[]},{"pwStepLine":132,"gherkinStepLine":99,"keywordType":"Action","textWithKeyword":"And the same session submits a limit order at the quoted price","stepMatchArguments":[]},{"pwStepLine":133,"gherkinStepLine":100,"keywordType":"Action","textWithKeyword":"And the same session restates that order","stepMatchArguments":[]},{"pwStepLine":134,"gherkinStepLine":101,"keywordType":"Action","textWithKeyword":"And the same session submits an overnight order for the test symbol","stepMatchArguments":[]},{"pwStepLine":135,"gherkinStepLine":102,"keywordType":"Action","textWithKeyword":"And the same session logs out","stepMatchArguments":[]},{"pwStepLine":136,"gherkinStepLine":103,"keywordType":"Outcome","textWithKeyword":"Then the ordered workflow should have succeeded","stepMatchArguments":[]}]},
]; // bdd-data-end