// Generated from: UI-Automation\features\BulkSnapshot.feature
import { test } from "../../../step-definitions/fixtures.js";

test.describe('Bulk Snapshot Screen — Renamed from Lending Pit Lookup (SLL-232)', () => {

  test('User navigates to Bulk Snapshot page and it loads with the correct heading and empty state', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-232'] }, async ({ Given, When, Then, And, bulkSnapshotPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Bulk Snapshot page', null, { bulkSnapshotPage }); 
    await Then('the Bulk Snapshot page heading should be visible', null, { bulkSnapshotPage }); 
    await And('the Bulk Snapshot empty state should show "No Data Available" with "Start Searching" button', null, { bulkSnapshotPage }); 
  });

  test('User enters a valid symbol and fetches rates — results are displayed in the grid', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-232'] }, async ({ Given, When, Then, And, bulkSnapshotPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Bulk Snapshot page', null, { bulkSnapshotPage }); 
    await When('the user enters a valid symbol in the Bulk Snapshot search field', null, { bulkSnapshotPage }); 
    await And('the user clicks the Bulk Snapshot Fetch Rates button', null, { bulkSnapshotPage }); 
    await Then('the Bulk Snapshot Ag-Grid should display matching results', null, { bulkSnapshotPage }); 
  });

  test('User enters multiple symbols and fetches rates — results are displayed for all symbols', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-232'] }, async ({ Given, When, Then, And, bulkSnapshotPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Bulk Snapshot page', null, { bulkSnapshotPage }); 
    await When('the user enters multiple symbols in the Bulk Snapshot search field', null, { bulkSnapshotPage }); 
    await And('the user clicks the Bulk Snapshot Fetch Rates button', null, { bulkSnapshotPage }); 
    await Then('the Bulk Snapshot Ag-Grid should display matching results', null, { bulkSnapshotPage }); 
  });

  test('Navigation menu shows "Bulk Snapshot" as the screen name', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-232'] }, async ({ Given, When, Then, bulkSnapshotPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user opens the navigation menu', null, { bulkSnapshotPage }); 
    await Then('the navigation link for "Bulk Snapshot" should be visible', null, { bulkSnapshotPage }); 
  });

  test('Bulk Snapshot page heading displays the new screen name', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-232'] }, async ({ Given, When, Then, bulkSnapshotPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Bulk Snapshot page', null, { bulkSnapshotPage }); 
    await Then('the Bulk Snapshot page heading should be visible', null, { bulkSnapshotPage }); 
  });

  test('Bulk Snapshot form shows Fetch Rates button, Clear button, and Use Cached Rates checkbox', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-232'] }, async ({ Given, When, Then, And, bulkSnapshotPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Bulk Snapshot page', null, { bulkSnapshotPage }); 
    await Then('the Bulk Snapshot Fetch Rates button should be visible', null, { bulkSnapshotPage }); 
    await And('the Bulk Snapshot Clear button should be visible', null, { bulkSnapshotPage }); 
    await And('the Use Cached Rates checkbox should be visible and checked by default', null, { bulkSnapshotPage }); 
  });

  test('Bulk Snapshot grid displays the expected Symbol, Cusip, and Description columns', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-232'] }, async ({ Given, When, Then, And, bulkSnapshotPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Bulk Snapshot page', null, { bulkSnapshotPage }); 
    await When('the user enters a valid symbol in the Bulk Snapshot search field', null, { bulkSnapshotPage }); 
    await And('the user clicks the Bulk Snapshot Fetch Rates button', null, { bulkSnapshotPage }); 
    await Then('the Bulk Snapshot results grid should display the "Symbol" column', null, { bulkSnapshotPage }); 
    await And('the Bulk Snapshot results grid should display the "Cusip" column', null, { bulkSnapshotPage }); 
    await And('the Bulk Snapshot results grid should display the "Description" column', null, { bulkSnapshotPage }); 
  });

  test('Search results contain a row matching the searched symbol', { tag: ['@smokeBDD', '@Regression', '@SLL-232'] }, async ({ Given, When, Then, And, bulkSnapshotPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Bulk Snapshot page', null, { bulkSnapshotPage }); 
    await When('the user enters a valid symbol in the Bulk Snapshot search field', null, { bulkSnapshotPage }); 
    await And('the user clicks the Bulk Snapshot Fetch Rates button', null, { bulkSnapshotPage }); 
    await Then('the Bulk Snapshot Ag-Grid should display matching results', null, { bulkSnapshotPage }); 
    await And('the Bulk Snapshot grid should contain a row matching the searched symbol', null, { bulkSnapshotPage }); 
  });

  test('Bulk Snapshot grid rows contain valid populated data values', { tag: ['@smokeBDD', '@Regression', '@SLL-232'] }, async ({ Given, When, Then, And, bulkSnapshotPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Bulk Snapshot page', null, { bulkSnapshotPage }); 
    await When('the user enters a valid symbol in the Bulk Snapshot search field', null, { bulkSnapshotPage }); 
    await And('the user clicks the Bulk Snapshot Fetch Rates button', null, { bulkSnapshotPage }); 
    await Then('the Bulk Snapshot Ag-Grid should display matching results', null, { bulkSnapshotPage }); 
    await And('the Bulk Snapshot grid rows should contain valid data values', null, { bulkSnapshotPage }); 
  });

  test('Clicking the Clear button resets the Symbol or Cusip textarea', { tag: ['@smokeBDD', '@Regression', '@SLL-232'] }, async ({ Given, When, Then, And, bulkSnapshotPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Bulk Snapshot page', null, { bulkSnapshotPage }); 
    await When('the user enters a valid symbol in the Bulk Snapshot search field', null, { bulkSnapshotPage }); 
    await And('the user clicks the Bulk Snapshot Clear button', null, { bulkSnapshotPage }); 
    await Then('the Bulk Snapshot symbol textarea should be empty', null, { bulkSnapshotPage }); 
  });

  test('Clicking Fetch Rates with empty textarea shows no results or empty state', { tag: ['@smokeBDD', '@Regression', '@SLL-232'] }, async ({ Given, When, Then, bulkSnapshotPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Bulk Snapshot page', null, { bulkSnapshotPage }); 
    await When('the user clicks the Bulk Snapshot Fetch Rates button without entering a symbol', null, { bulkSnapshotPage }); 
    await Then('the Bulk Snapshot grid should display the empty state overlay or a validation message', null, { bulkSnapshotPage }); 
  });

  test('Searching an unknown symbol shows the empty state or no-results overlay', { tag: ['@smokeBDD', '@Regression', '@SLL-232'] }, async ({ Given, When, Then, And, bulkSnapshotPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Bulk Snapshot page', null, { bulkSnapshotPage }); 
    await When('the user enters "ZZZZINVALID" in the Bulk Snapshot search field', null, { bulkSnapshotPage }); 
    await And('the user clicks the Bulk Snapshot Fetch Rates button', null, { bulkSnapshotPage }); 
    await Then('the Bulk Snapshot Ag-Grid should display the empty state overlay', null, { bulkSnapshotPage }); 
  });

  test('Searching with special characters in the symbol field is handled gracefully', { tag: ['@smokeBDD', '@Regression', '@SLL-232'] }, async ({ Given, When, Then, And, bulkSnapshotPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Bulk Snapshot page', null, { bulkSnapshotPage }); 
    await When('the user enters "!@#$%" in the Bulk Snapshot search field', null, { bulkSnapshotPage }); 
    await And('the user clicks the Bulk Snapshot Fetch Rates button', null, { bulkSnapshotPage }); 
    await Then('the Bulk Snapshot page should not crash', null, { bulkSnapshotPage }); 
    await And('the Bulk Snapshot grid should display the empty state overlay or a validation message', null, { bulkSnapshotPage }); 
  });

  test('Bulk Snapshot page shows "No Data Available" empty state before any search is performed', { tag: ['@smokeBDD', '@Regression', '@SLL-232'] }, async ({ Given, When, Then, bulkSnapshotPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Bulk Snapshot page', null, { bulkSnapshotPage }); 
    await Then('the Bulk Snapshot Ag-Grid should display the empty state overlay', null, { bulkSnapshotPage }); 
  });

  test('Grid columns remain correctly aligned after results are loaded', { tag: ['@smokeBDD', '@Regression', '@SLL-232'] }, async ({ Given, When, Then, And, bulkSnapshotPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Bulk Snapshot page', null, { bulkSnapshotPage }); 
    await When('the user enters a valid symbol in the Bulk Snapshot search field', null, { bulkSnapshotPage }); 
    await And('the user clicks the Bulk Snapshot Fetch Rates button', null, { bulkSnapshotPage }); 
    await Then('the Bulk Snapshot Ag-Grid should display matching results', null, { bulkSnapshotPage }); 
    await And('the Bulk Snapshot grid columns should remain correctly aligned', null, { bulkSnapshotPage }); 
  });

  test.describe('Multiple symbol searches with valid, invalid, and empty inputs', () => {

    test('Example #1', { tag: ['@smokeBDD', '@Regression', '@SLL-232'] }, async ({ Given, When, Then, And, bulkSnapshotPage, loginPage, page, testUsers }) => { 
      await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
      await When('the user navigates to the Bulk Snapshot page', null, { bulkSnapshotPage }); 
      await When('the user enters "AAPL" in the Bulk Snapshot search field', null, { bulkSnapshotPage }); 
      await And('the user clicks the Bulk Snapshot Fetch Rates button', null, { bulkSnapshotPage }); 
      await Then('the Bulk Snapshot expected search outcome should be "results shown"', null, { bulkSnapshotPage }); 
    });

    test('Example #2', { tag: ['@smokeBDD', '@Regression', '@SLL-232'] }, async ({ Given, When, Then, And, bulkSnapshotPage, loginPage, page, testUsers }) => { 
      await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
      await When('the user navigates to the Bulk Snapshot page', null, { bulkSnapshotPage }); 
      await When('the user enters "MSFT" in the Bulk Snapshot search field', null, { bulkSnapshotPage }); 
      await And('the user clicks the Bulk Snapshot Fetch Rates button', null, { bulkSnapshotPage }); 
      await Then('the Bulk Snapshot expected search outcome should be "results shown"', null, { bulkSnapshotPage }); 
    });

    test('Example #3', { tag: ['@smokeBDD', '@Regression', '@SLL-232'] }, async ({ Given, When, Then, And, bulkSnapshotPage, loginPage, page, testUsers }) => { 
      await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
      await When('the user navigates to the Bulk Snapshot page', null, { bulkSnapshotPage }); 
      await When('the user enters "TSLA" in the Bulk Snapshot search field', null, { bulkSnapshotPage }); 
      await And('the user clicks the Bulk Snapshot Fetch Rates button', null, { bulkSnapshotPage }); 
      await Then('the Bulk Snapshot expected search outcome should be "results shown"', null, { bulkSnapshotPage }); 
    });

    test('Example #4', { tag: ['@smokeBDD', '@Regression', '@SLL-232'] }, async ({ Given, When, Then, And, bulkSnapshotPage, loginPage, page, testUsers }) => { 
      await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
      await When('the user navigates to the Bulk Snapshot page', null, { bulkSnapshotPage }); 
      await When('the user enters "ZZZZINVALID" in the Bulk Snapshot search field', null, { bulkSnapshotPage }); 
      await And('the user clicks the Bulk Snapshot Fetch Rates button', null, { bulkSnapshotPage }); 
      await Then('the Bulk Snapshot expected search outcome should be "empty grid"', null, { bulkSnapshotPage }); 
    });

    test('Example #5', { tag: ['@smokeBDD', '@Regression', '@SLL-232'] }, async ({ Given, When, Then, And, bulkSnapshotPage, loginPage, page, testUsers }) => { 
      await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
      await When('the user navigates to the Bulk Snapshot page', null, { bulkSnapshotPage }); 
      await When('the user enters "" in the Bulk Snapshot search field', null, { bulkSnapshotPage }); 
      await And('the user clicks the Bulk Snapshot Fetch Rates button', null, { bulkSnapshotPage }); 
      await Then('the Bulk Snapshot expected search outcome should be "empty grid"', null, { bulkSnapshotPage }); 
    });

  });

  test('Full lifecycle — login, verify Bulk Snapshot navigation and rename, search symbols, verify results', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-232'] }, async ({ Given, When, Then, And, bulkSnapshotPage, contractSummaryPage, loginPage, page, testUsers }) => { 
    await Given('the user navigates to the application', null, { loginPage, page }); 
    await When('the user logs in with valid credentials', null, { loginPage, testUsers }); 
    await Then('the user should be redirected to the dashboard', null, { contractSummaryPage, page }); 
    await When('the user opens the navigation menu', null, { bulkSnapshotPage }); 
    await Then('the navigation link for "Bulk Snapshot" should be visible', null, { bulkSnapshotPage }); 
    await When('the user navigates to the Bulk Snapshot page', null, { bulkSnapshotPage }); 
    await Then('the Bulk Snapshot page heading should be visible', null, { bulkSnapshotPage }); 
    await And('the Bulk Snapshot empty state should show "No Data Available" with "Start Searching" button', null, { bulkSnapshotPage }); 
    await When('the user enters multiple symbols in the Bulk Snapshot search field', null, { bulkSnapshotPage }); 
    await And('the user clicks the Bulk Snapshot Fetch Rates button', null, { bulkSnapshotPage }); 
    await Then('the Bulk Snapshot Ag-Grid should display matching results', null, { bulkSnapshotPage }); 
    await And('the Bulk Snapshot results grid should display the "Symbol" column', null, { bulkSnapshotPage }); 
    await And('the Bulk Snapshot results grid should display the "Cusip" column', null, { bulkSnapshotPage }); 
    await And('the Bulk Snapshot results grid should display the "Description" column', null, { bulkSnapshotPage }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('UI-Automation\\features\\BulkSnapshot.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":10,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-232"],"steps":[{"pwStepLine":7,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"When the user navigates to the Bulk Snapshot page","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"Then the Bulk Snapshot page heading should be visible","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"And the Bulk Snapshot empty state should show \"No Data Available\" with \"Start Searching\" button","stepMatchArguments":[]}]},
  {"pwTestLine":13,"pickleLine":18,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-232"],"steps":[{"pwStepLine":14,"gherkinStepLine":19,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":20,"keywordType":"Action","textWithKeyword":"When the user navigates to the Bulk Snapshot page","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":21,"keywordType":"Action","textWithKeyword":"When the user enters a valid symbol in the Bulk Snapshot search field","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":22,"keywordType":"Action","textWithKeyword":"And the user clicks the Bulk Snapshot Fetch Rates button","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"Then the Bulk Snapshot Ag-Grid should display matching results","stepMatchArguments":[]}]},
  {"pwTestLine":21,"pickleLine":27,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-232"],"steps":[{"pwStepLine":22,"gherkinStepLine":28,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":29,"keywordType":"Action","textWithKeyword":"When the user navigates to the Bulk Snapshot page","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":30,"keywordType":"Action","textWithKeyword":"When the user enters multiple symbols in the Bulk Snapshot search field","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":31,"keywordType":"Action","textWithKeyword":"And the user clicks the Bulk Snapshot Fetch Rates button","stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"Then the Bulk Snapshot Ag-Grid should display matching results","stepMatchArguments":[]}]},
  {"pwTestLine":29,"pickleLine":38,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-232"],"steps":[{"pwStepLine":30,"gherkinStepLine":39,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":40,"keywordType":"Action","textWithKeyword":"When the user opens the navigation menu","stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":41,"keywordType":"Outcome","textWithKeyword":"Then the navigation link for \"Bulk Snapshot\" should be visible","stepMatchArguments":[{"group":{"start":24,"value":"\"Bulk Snapshot\"","children":[{"start":25,"value":"Bulk Snapshot","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":35,"pickleLine":45,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-232"],"steps":[{"pwStepLine":36,"gherkinStepLine":46,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":37,"gherkinStepLine":47,"keywordType":"Action","textWithKeyword":"When the user navigates to the Bulk Snapshot page","stepMatchArguments":[]},{"pwStepLine":38,"gherkinStepLine":48,"keywordType":"Outcome","textWithKeyword":"Then the Bulk Snapshot page heading should be visible","stepMatchArguments":[]}]},
  {"pwTestLine":41,"pickleLine":54,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-232"],"steps":[{"pwStepLine":42,"gherkinStepLine":55,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":43,"gherkinStepLine":56,"keywordType":"Action","textWithKeyword":"When the user navigates to the Bulk Snapshot page","stepMatchArguments":[]},{"pwStepLine":44,"gherkinStepLine":57,"keywordType":"Outcome","textWithKeyword":"Then the Bulk Snapshot Fetch Rates button should be visible","stepMatchArguments":[]},{"pwStepLine":45,"gherkinStepLine":58,"keywordType":"Outcome","textWithKeyword":"And the Bulk Snapshot Clear button should be visible","stepMatchArguments":[]},{"pwStepLine":46,"gherkinStepLine":59,"keywordType":"Outcome","textWithKeyword":"And the Use Cached Rates checkbox should be visible and checked by default","stepMatchArguments":[]}]},
  {"pwTestLine":49,"pickleLine":63,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-232"],"steps":[{"pwStepLine":50,"gherkinStepLine":64,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":51,"gherkinStepLine":65,"keywordType":"Action","textWithKeyword":"When the user navigates to the Bulk Snapshot page","stepMatchArguments":[]},{"pwStepLine":52,"gherkinStepLine":66,"keywordType":"Action","textWithKeyword":"When the user enters a valid symbol in the Bulk Snapshot search field","stepMatchArguments":[]},{"pwStepLine":53,"gherkinStepLine":67,"keywordType":"Action","textWithKeyword":"And the user clicks the Bulk Snapshot Fetch Rates button","stepMatchArguments":[]},{"pwStepLine":54,"gherkinStepLine":68,"keywordType":"Outcome","textWithKeyword":"Then the Bulk Snapshot results grid should display the \"Symbol\" column","stepMatchArguments":[{"group":{"start":50,"value":"\"Symbol\"","children":[{"start":51,"value":"Symbol","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":55,"gherkinStepLine":69,"keywordType":"Outcome","textWithKeyword":"And the Bulk Snapshot results grid should display the \"Cusip\" column","stepMatchArguments":[{"group":{"start":50,"value":"\"Cusip\"","children":[{"start":51,"value":"Cusip","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":56,"gherkinStepLine":70,"keywordType":"Outcome","textWithKeyword":"And the Bulk Snapshot results grid should display the \"Description\" column","stepMatchArguments":[{"group":{"start":50,"value":"\"Description\"","children":[{"start":51,"value":"Description","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":59,"pickleLine":74,"tags":["@smokeBDD","@Regression","@SLL-232"],"steps":[{"pwStepLine":60,"gherkinStepLine":75,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":61,"gherkinStepLine":76,"keywordType":"Action","textWithKeyword":"When the user navigates to the Bulk Snapshot page","stepMatchArguments":[]},{"pwStepLine":62,"gherkinStepLine":77,"keywordType":"Action","textWithKeyword":"When the user enters a valid symbol in the Bulk Snapshot search field","stepMatchArguments":[]},{"pwStepLine":63,"gherkinStepLine":78,"keywordType":"Action","textWithKeyword":"And the user clicks the Bulk Snapshot Fetch Rates button","stepMatchArguments":[]},{"pwStepLine":64,"gherkinStepLine":79,"keywordType":"Outcome","textWithKeyword":"Then the Bulk Snapshot Ag-Grid should display matching results","stepMatchArguments":[]},{"pwStepLine":65,"gherkinStepLine":80,"keywordType":"Outcome","textWithKeyword":"And the Bulk Snapshot grid should contain a row matching the searched symbol","stepMatchArguments":[]}]},
  {"pwTestLine":68,"pickleLine":84,"tags":["@smokeBDD","@Regression","@SLL-232"],"steps":[{"pwStepLine":69,"gherkinStepLine":85,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":70,"gherkinStepLine":86,"keywordType":"Action","textWithKeyword":"When the user navigates to the Bulk Snapshot page","stepMatchArguments":[]},{"pwStepLine":71,"gherkinStepLine":87,"keywordType":"Action","textWithKeyword":"When the user enters a valid symbol in the Bulk Snapshot search field","stepMatchArguments":[]},{"pwStepLine":72,"gherkinStepLine":88,"keywordType":"Action","textWithKeyword":"And the user clicks the Bulk Snapshot Fetch Rates button","stepMatchArguments":[]},{"pwStepLine":73,"gherkinStepLine":89,"keywordType":"Outcome","textWithKeyword":"Then the Bulk Snapshot Ag-Grid should display matching results","stepMatchArguments":[]},{"pwStepLine":74,"gherkinStepLine":90,"keywordType":"Outcome","textWithKeyword":"And the Bulk Snapshot grid rows should contain valid data values","stepMatchArguments":[]}]},
  {"pwTestLine":77,"pickleLine":94,"tags":["@smokeBDD","@Regression","@SLL-232"],"steps":[{"pwStepLine":78,"gherkinStepLine":95,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":79,"gherkinStepLine":96,"keywordType":"Action","textWithKeyword":"When the user navigates to the Bulk Snapshot page","stepMatchArguments":[]},{"pwStepLine":80,"gherkinStepLine":97,"keywordType":"Action","textWithKeyword":"When the user enters a valid symbol in the Bulk Snapshot search field","stepMatchArguments":[]},{"pwStepLine":81,"gherkinStepLine":98,"keywordType":"Action","textWithKeyword":"And the user clicks the Bulk Snapshot Clear button","stepMatchArguments":[]},{"pwStepLine":82,"gherkinStepLine":99,"keywordType":"Outcome","textWithKeyword":"Then the Bulk Snapshot symbol textarea should be empty","stepMatchArguments":[]}]},
  {"pwTestLine":85,"pickleLine":105,"tags":["@smokeBDD","@Regression","@SLL-232"],"steps":[{"pwStepLine":86,"gherkinStepLine":106,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":87,"gherkinStepLine":107,"keywordType":"Action","textWithKeyword":"When the user navigates to the Bulk Snapshot page","stepMatchArguments":[]},{"pwStepLine":88,"gherkinStepLine":108,"keywordType":"Action","textWithKeyword":"When the user clicks the Bulk Snapshot Fetch Rates button without entering a symbol","stepMatchArguments":[]},{"pwStepLine":89,"gherkinStepLine":109,"keywordType":"Outcome","textWithKeyword":"Then the Bulk Snapshot grid should display the empty state overlay or a validation message","stepMatchArguments":[]}]},
  {"pwTestLine":92,"pickleLine":113,"tags":["@smokeBDD","@Regression","@SLL-232"],"steps":[{"pwStepLine":93,"gherkinStepLine":114,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":94,"gherkinStepLine":115,"keywordType":"Action","textWithKeyword":"When the user navigates to the Bulk Snapshot page","stepMatchArguments":[]},{"pwStepLine":95,"gherkinStepLine":116,"keywordType":"Action","textWithKeyword":"When the user enters \"ZZZZINVALID\" in the Bulk Snapshot search field","stepMatchArguments":[{"group":{"start":16,"value":"\"ZZZZINVALID\"","children":[{"start":17,"value":"ZZZZINVALID","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":96,"gherkinStepLine":117,"keywordType":"Action","textWithKeyword":"And the user clicks the Bulk Snapshot Fetch Rates button","stepMatchArguments":[]},{"pwStepLine":97,"gherkinStepLine":118,"keywordType":"Outcome","textWithKeyword":"Then the Bulk Snapshot Ag-Grid should display the empty state overlay","stepMatchArguments":[]}]},
  {"pwTestLine":100,"pickleLine":122,"tags":["@smokeBDD","@Regression","@SLL-232"],"steps":[{"pwStepLine":101,"gherkinStepLine":123,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":102,"gherkinStepLine":124,"keywordType":"Action","textWithKeyword":"When the user navigates to the Bulk Snapshot page","stepMatchArguments":[]},{"pwStepLine":103,"gherkinStepLine":125,"keywordType":"Action","textWithKeyword":"When the user enters \"!@#$%\" in the Bulk Snapshot search field","stepMatchArguments":[{"group":{"start":16,"value":"\"!@#$%\"","children":[{"start":17,"value":"!@#$%","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":104,"gherkinStepLine":126,"keywordType":"Action","textWithKeyword":"And the user clicks the Bulk Snapshot Fetch Rates button","stepMatchArguments":[]},{"pwStepLine":105,"gherkinStepLine":127,"keywordType":"Outcome","textWithKeyword":"Then the Bulk Snapshot page should not crash","stepMatchArguments":[]},{"pwStepLine":106,"gherkinStepLine":128,"keywordType":"Outcome","textWithKeyword":"And the Bulk Snapshot grid should display the empty state overlay or a validation message","stepMatchArguments":[]}]},
  {"pwTestLine":109,"pickleLine":134,"tags":["@smokeBDD","@Regression","@SLL-232"],"steps":[{"pwStepLine":110,"gherkinStepLine":135,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":111,"gherkinStepLine":136,"keywordType":"Action","textWithKeyword":"When the user navigates to the Bulk Snapshot page","stepMatchArguments":[]},{"pwStepLine":112,"gherkinStepLine":137,"keywordType":"Outcome","textWithKeyword":"Then the Bulk Snapshot Ag-Grid should display the empty state overlay","stepMatchArguments":[]}]},
  {"pwTestLine":115,"pickleLine":141,"tags":["@smokeBDD","@Regression","@SLL-232"],"steps":[{"pwStepLine":116,"gherkinStepLine":142,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":117,"gherkinStepLine":143,"keywordType":"Action","textWithKeyword":"When the user navigates to the Bulk Snapshot page","stepMatchArguments":[]},{"pwStepLine":118,"gherkinStepLine":144,"keywordType":"Action","textWithKeyword":"When the user enters a valid symbol in the Bulk Snapshot search field","stepMatchArguments":[]},{"pwStepLine":119,"gherkinStepLine":145,"keywordType":"Action","textWithKeyword":"And the user clicks the Bulk Snapshot Fetch Rates button","stepMatchArguments":[]},{"pwStepLine":120,"gherkinStepLine":146,"keywordType":"Outcome","textWithKeyword":"Then the Bulk Snapshot Ag-Grid should display matching results","stepMatchArguments":[]},{"pwStepLine":121,"gherkinStepLine":147,"keywordType":"Outcome","textWithKeyword":"And the Bulk Snapshot grid columns should remain correctly aligned","stepMatchArguments":[]}]},
  {"pwTestLine":126,"pickleLine":162,"tags":["@smokeBDD","@Regression","@SLL-232"],"steps":[{"pwStepLine":127,"gherkinStepLine":154,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":128,"gherkinStepLine":155,"keywordType":"Action","textWithKeyword":"When the user navigates to the Bulk Snapshot page","stepMatchArguments":[]},{"pwStepLine":129,"gherkinStepLine":156,"keywordType":"Action","textWithKeyword":"When the user enters \"AAPL\" in the Bulk Snapshot search field","stepMatchArguments":[{"group":{"start":16,"value":"\"AAPL\"","children":[{"start":17,"value":"AAPL","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":130,"gherkinStepLine":157,"keywordType":"Action","textWithKeyword":"And the user clicks the Bulk Snapshot Fetch Rates button","stepMatchArguments":[]},{"pwStepLine":131,"gherkinStepLine":158,"keywordType":"Outcome","textWithKeyword":"Then the Bulk Snapshot expected search outcome should be \"results shown\"","stepMatchArguments":[{"group":{"start":52,"value":"\"results shown\"","children":[{"start":53,"value":"results shown","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":134,"pickleLine":163,"tags":["@smokeBDD","@Regression","@SLL-232"],"steps":[{"pwStepLine":135,"gherkinStepLine":154,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":136,"gherkinStepLine":155,"keywordType":"Action","textWithKeyword":"When the user navigates to the Bulk Snapshot page","stepMatchArguments":[]},{"pwStepLine":137,"gherkinStepLine":156,"keywordType":"Action","textWithKeyword":"When the user enters \"MSFT\" in the Bulk Snapshot search field","stepMatchArguments":[{"group":{"start":16,"value":"\"MSFT\"","children":[{"start":17,"value":"MSFT","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":138,"gherkinStepLine":157,"keywordType":"Action","textWithKeyword":"And the user clicks the Bulk Snapshot Fetch Rates button","stepMatchArguments":[]},{"pwStepLine":139,"gherkinStepLine":158,"keywordType":"Outcome","textWithKeyword":"Then the Bulk Snapshot expected search outcome should be \"results shown\"","stepMatchArguments":[{"group":{"start":52,"value":"\"results shown\"","children":[{"start":53,"value":"results shown","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":142,"pickleLine":164,"tags":["@smokeBDD","@Regression","@SLL-232"],"steps":[{"pwStepLine":143,"gherkinStepLine":154,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":144,"gherkinStepLine":155,"keywordType":"Action","textWithKeyword":"When the user navigates to the Bulk Snapshot page","stepMatchArguments":[]},{"pwStepLine":145,"gherkinStepLine":156,"keywordType":"Action","textWithKeyword":"When the user enters \"TSLA\" in the Bulk Snapshot search field","stepMatchArguments":[{"group":{"start":16,"value":"\"TSLA\"","children":[{"start":17,"value":"TSLA","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":146,"gherkinStepLine":157,"keywordType":"Action","textWithKeyword":"And the user clicks the Bulk Snapshot Fetch Rates button","stepMatchArguments":[]},{"pwStepLine":147,"gherkinStepLine":158,"keywordType":"Outcome","textWithKeyword":"Then the Bulk Snapshot expected search outcome should be \"results shown\"","stepMatchArguments":[{"group":{"start":52,"value":"\"results shown\"","children":[{"start":53,"value":"results shown","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":150,"pickleLine":165,"tags":["@smokeBDD","@Regression","@SLL-232"],"steps":[{"pwStepLine":151,"gherkinStepLine":154,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":152,"gherkinStepLine":155,"keywordType":"Action","textWithKeyword":"When the user navigates to the Bulk Snapshot page","stepMatchArguments":[]},{"pwStepLine":153,"gherkinStepLine":156,"keywordType":"Action","textWithKeyword":"When the user enters \"ZZZZINVALID\" in the Bulk Snapshot search field","stepMatchArguments":[{"group":{"start":16,"value":"\"ZZZZINVALID\"","children":[{"start":17,"value":"ZZZZINVALID","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":154,"gherkinStepLine":157,"keywordType":"Action","textWithKeyword":"And the user clicks the Bulk Snapshot Fetch Rates button","stepMatchArguments":[]},{"pwStepLine":155,"gherkinStepLine":158,"keywordType":"Outcome","textWithKeyword":"Then the Bulk Snapshot expected search outcome should be \"empty grid\"","stepMatchArguments":[{"group":{"start":52,"value":"\"empty grid\"","children":[{"start":53,"value":"empty grid","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":158,"pickleLine":166,"tags":["@smokeBDD","@Regression","@SLL-232"],"steps":[{"pwStepLine":159,"gherkinStepLine":154,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":160,"gherkinStepLine":155,"keywordType":"Action","textWithKeyword":"When the user navigates to the Bulk Snapshot page","stepMatchArguments":[]},{"pwStepLine":161,"gherkinStepLine":156,"keywordType":"Action","textWithKeyword":"When the user enters \"\" in the Bulk Snapshot search field","stepMatchArguments":[{"group":{"start":16,"value":"\"\"","children":[{"start":17,"value":"","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":162,"gherkinStepLine":157,"keywordType":"Action","textWithKeyword":"And the user clicks the Bulk Snapshot Fetch Rates button","stepMatchArguments":[]},{"pwStepLine":163,"gherkinStepLine":158,"keywordType":"Outcome","textWithKeyword":"Then the Bulk Snapshot expected search outcome should be \"empty grid\"","stepMatchArguments":[{"group":{"start":52,"value":"\"empty grid\"","children":[{"start":53,"value":"empty grid","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":168,"pickleLine":172,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-232"],"steps":[{"pwStepLine":169,"gherkinStepLine":173,"keywordType":"Context","textWithKeyword":"Given the user navigates to the application","stepMatchArguments":[]},{"pwStepLine":170,"gherkinStepLine":174,"keywordType":"Action","textWithKeyword":"When the user logs in with valid credentials","stepMatchArguments":[]},{"pwStepLine":171,"gherkinStepLine":175,"keywordType":"Outcome","textWithKeyword":"Then the user should be redirected to the dashboard","stepMatchArguments":[]},{"pwStepLine":172,"gherkinStepLine":176,"keywordType":"Action","textWithKeyword":"When the user opens the navigation menu","stepMatchArguments":[]},{"pwStepLine":173,"gherkinStepLine":177,"keywordType":"Outcome","textWithKeyword":"Then the navigation link for \"Bulk Snapshot\" should be visible","stepMatchArguments":[{"group":{"start":24,"value":"\"Bulk Snapshot\"","children":[{"start":25,"value":"Bulk Snapshot","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":174,"gherkinStepLine":178,"keywordType":"Action","textWithKeyword":"When the user navigates to the Bulk Snapshot page","stepMatchArguments":[]},{"pwStepLine":175,"gherkinStepLine":179,"keywordType":"Outcome","textWithKeyword":"Then the Bulk Snapshot page heading should be visible","stepMatchArguments":[]},{"pwStepLine":176,"gherkinStepLine":180,"keywordType":"Outcome","textWithKeyword":"And the Bulk Snapshot empty state should show \"No Data Available\" with \"Start Searching\" button","stepMatchArguments":[]},{"pwStepLine":177,"gherkinStepLine":181,"keywordType":"Action","textWithKeyword":"When the user enters multiple symbols in the Bulk Snapshot search field","stepMatchArguments":[]},{"pwStepLine":178,"gherkinStepLine":182,"keywordType":"Action","textWithKeyword":"And the user clicks the Bulk Snapshot Fetch Rates button","stepMatchArguments":[]},{"pwStepLine":179,"gherkinStepLine":183,"keywordType":"Outcome","textWithKeyword":"Then the Bulk Snapshot Ag-Grid should display matching results","stepMatchArguments":[]},{"pwStepLine":180,"gherkinStepLine":184,"keywordType":"Outcome","textWithKeyword":"And the Bulk Snapshot results grid should display the \"Symbol\" column","stepMatchArguments":[{"group":{"start":50,"value":"\"Symbol\"","children":[{"start":51,"value":"Symbol","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":181,"gherkinStepLine":185,"keywordType":"Outcome","textWithKeyword":"And the Bulk Snapshot results grid should display the \"Cusip\" column","stepMatchArguments":[{"group":{"start":50,"value":"\"Cusip\"","children":[{"start":51,"value":"Cusip","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":182,"gherkinStepLine":186,"keywordType":"Outcome","textWithKeyword":"And the Bulk Snapshot results grid should display the \"Description\" column","stepMatchArguments":[{"group":{"start":50,"value":"\"Description\"","children":[{"start":51,"value":"Description","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end