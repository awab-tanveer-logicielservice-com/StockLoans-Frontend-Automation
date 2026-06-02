// Generated from: UI-Automation\features\LendingPitTweaks.feature
import { test } from "../../../step-definitions/fixtures.js";

test.describe('Lending Pit UI Tweaks and Ag-Grid Migration (SLL-206)', () => {

  test('User navigates to Lending Pit page and it loads with Ag-Grid displaying data', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-206'] }, async ({ Given, When, Then, And, loginPage, page, searchLendingPitLookUpPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Lending Pit Lookup page', null, { searchLendingPitLookUpPage }); 
    await Then('the Lending Pit Ag-Grid should be visible', null, { searchLendingPitLookUpPage }); 
    await And('the grid should display data rows', null, { searchLendingPitLookUpPage }); 
  });

  test('User searches for a valid symbol and results are displayed in Ag-Grid', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-206'] }, async ({ Given, When, Then, And, loginPage, page, searchLendingPitLookUpPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Lending Pit Lookup page', null, { searchLendingPitLookUpPage }); 
    await When('the user enters a valid symbol in the search field', null, { searchLendingPitLookUpPage }); 
    await And('the user clicks the submit button', null, { searchLendingPitLookUpPage }); 
    await Then('the Lending Pit Ag-Grid should display matching results', null, { searchLendingPitLookUpPage }); 
  });

  test('Lending Pit page header styling is visually consistent with the rest of the application', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-206'] }, async ({ Given, When, Then, loginPage, page, searchLendingPitLookUpPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Lending Pit Lookup page', null, { searchLendingPitLookUpPage }); 
    await Then('the Lending Pit page header should be visible with consistent styling', null, { searchLendingPitLookUpPage }); 
  });

  test('Lending Pit buttons are styled consistently with the rest of the application', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-206'] }, async ({ Given, When, Then, loginPage, page, searchLendingPitLookUpPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Lending Pit Lookup page', null, { searchLendingPitLookUpPage }); 
    await Then('the Lending Pit page buttons should be visible with consistent styling', null, { searchLendingPitLookUpPage }); 
  });

  test('Lending Pit grid uses the Ag-Grid component instead of a legacy table', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-206'] }, async ({ Given, When, Then, loginPage, page, searchLendingPitLookUpPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Lending Pit Lookup page', null, { searchLendingPitLookUpPage }); 
    await Then('the Lending Pit grid should use the Ag-Grid component', null, { searchLendingPitLookUpPage }); 
  });

  test('Lending Pit headings are styled consistently with the rest of the application', { tag: ['@smokeBDD', '@Regression', '@SLL-206'] }, async ({ Given, When, Then, loginPage, page, searchLendingPitLookUpPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Lending Pit Lookup page', null, { searchLendingPitLookUpPage }); 
    await Then('the Lending Pit page headings should be visible with consistent styling', null, { searchLendingPitLookUpPage }); 
  });

  test('Lending Pit color scheme matches the application-wide design system', { tag: ['@smokeBDD', '@Regression', '@SLL-206'] }, async ({ Given, When, Then, loginPage, page, searchLendingPitLookUpPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Lending Pit Lookup page', null, { searchLendingPitLookUpPage }); 
    await Then('the Lending Pit page container should have consistent theme colors applied', null, { searchLendingPitLookUpPage }); 
  });

  test('Ag-Grid displays the expected columns matching the previous grid', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-206'] }, async ({ Given, When, Then, And, loginPage, page, searchLendingPitLookUpPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Lending Pit Lookup page', null, { searchLendingPitLookUpPage }); 
    await When('the user enters a valid symbol in the search field', null, { searchLendingPitLookUpPage }); 
    await And('the user clicks the submit button', null, { searchLendingPitLookUpPage }); 
    await Then('the results grid should display the "Symbol" column', null, { searchLendingPitLookUpPage }); 
    await And('the results grid should display the "Cusip" column', null, { searchLendingPitLookUpPage }); 
    await And('the results grid should display the "Description" column', null, { searchLendingPitLookUpPage }); 
  });

  test('Search functionality works correctly after switching to Ag-Grid', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-206'] }, async ({ Given, When, Then, And, loginPage, page, searchLendingPitLookUpPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Lending Pit Lookup page', null, { searchLendingPitLookUpPage }); 
    await When('the user enters a valid symbol in the search field', null, { searchLendingPitLookUpPage }); 
    await And('the user clicks the submit button', null, { searchLendingPitLookUpPage }); 
    await Then('the Lending Pit Ag-Grid should display matching results', null, { searchLendingPitLookUpPage }); 
    await And('the grid should contain a row matching the searched symbol', null, { searchLendingPitLookUpPage }); 
  });

  test('Ag-Grid column headers render correctly and match application styling', { tag: ['@smokeBDD', '@Regression', '@SLL-206'] }, async ({ Given, When, Then, loginPage, page, searchLendingPitLookUpPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Lending Pit Lookup page', null, { searchLendingPitLookUpPage }); 
    await Then('the Ag-Grid header row should be visible with correctly styled column headers', null, { searchLendingPitLookUpPage }); 
  });

  test('Row data in Ag-Grid is correctly populated from SLS V1 endpoints', { tag: ['@smokeBDD', '@Regression', '@SLL-206'] }, async ({ Given, When, Then, And, loginPage, page, searchLendingPitLookUpPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Lending Pit Lookup page', null, { searchLendingPitLookUpPage }); 
    await When('the user enters a valid symbol in the search field', null, { searchLendingPitLookUpPage }); 
    await And('the user clicks the submit button', null, { searchLendingPitLookUpPage }); 
    await Then('the Lending Pit Ag-Grid should display matching results', null, { searchLendingPitLookUpPage }); 
    await And('the grid rows should contain valid data values', null, { searchLendingPitLookUpPage }); 
  });

  test('Search submitted with empty Symbol/CUSIP field — no results or validation state shown', { tag: ['@smokeBDD', '@Regression', '@SLL-206'] }, async ({ Given, When, Then, loginPage, page, searchLendingPitLookUpPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Lending Pit Lookup page', null, { searchLendingPitLookUpPage }); 
    await When('the user clicks the submit button without entering a symbol', null, { searchLendingPitLookUpPage }); 
    await Then('the grid should display the empty state overlay or a validation message', null, { searchLendingPitLookUpPage }); 
  });

  test('Search with an unknown symbol — Ag-Grid shows empty no-results overlay', { tag: ['@smokeBDD', '@Regression', '@SLL-206'] }, async ({ Given, When, Then, And, loginPage, page, searchLendingPitLookUpPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Lending Pit Lookup page', null, { searchLendingPitLookUpPage }); 
    await When('the user enters "ZZZZINVALID" in the Lending Pit search field', null, { searchLendingPitLookUpPage }); 
    await And('the user clicks the submit button', null, { searchLendingPitLookUpPage }); 
    await Then('the Lending Pit Ag-Grid should display the empty state overlay', null, { searchLendingPitLookUpPage }); 
  });

  test('Search with special characters in Symbol field is handled gracefully', { tag: ['@smokeBDD', '@Regression', '@SLL-206'] }, async ({ Given, When, Then, And, loginPage, page, searchLendingPitLookUpPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Lending Pit Lookup page', null, { searchLendingPitLookUpPage }); 
    await When('the user enters "!@#$%" in the Lending Pit search field', null, { searchLendingPitLookUpPage }); 
    await And('the user clicks the submit button', null, { searchLendingPitLookUpPage }); 
    await Then('the page should not crash', null, { searchLendingPitLookUpPage }); 
    await And('the grid should display the empty state overlay or a validation message', null, { searchLendingPitLookUpPage }); 
  });

  test('Ag-Grid empty state overlay is visible before any search is performed', { tag: ['@smokeBDD', '@Regression', '@SLL-206'] }, async ({ Given, When, Then, loginPage, page, searchLendingPitLookUpPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Lending Pit Lookup page', null, { searchLendingPitLookUpPage }); 
    await Then('the Lending Pit Ag-Grid should display the empty state overlay', null, { searchLendingPitLookUpPage }); 
  });

  test('Ag-Grid columns remain correctly aligned after horizontal scrolling', { tag: ['@smokeBDD', '@Regression', '@SLL-206'] }, async ({ Given, When, Then, And, loginPage, page, searchLendingPitLookUpPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Lending Pit Lookup page', null, { searchLendingPitLookUpPage }); 
    await When('the user enters a valid symbol in the search field', null, { searchLendingPitLookUpPage }); 
    await And('the user clicks the submit button', null, { searchLendingPitLookUpPage }); 
    await Then('the Lending Pit Ag-Grid should display matching results', null, { searchLendingPitLookUpPage }); 
    await And('the grid columns should remain correctly aligned', null, { searchLendingPitLookUpPage }); 
  });

  test('Page retains visual consistency when browser viewport is resized', { tag: ['@smokeBDD', '@Regression', '@SLL-206'] }, async ({ Given, When, Then, loginPage, page, searchLendingPitLookUpPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Lending Pit Lookup page', null, { searchLendingPitLookUpPage }); 
    await Then('the Lending Pit page container should have consistent theme colors applied', null, { searchLendingPitLookUpPage }); 
  });

  test.describe('Multiple symbol searches with valid, invalid, and empty inputs', () => {

    test('Example #1', { tag: ['@smokeBDD', '@Regression', '@SLL-206'] }, async ({ Given, When, Then, And, loginPage, page, searchLendingPitLookUpPage, testUsers }) => { 
      await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
      await When('the user navigates to the Lending Pit Lookup page', null, { searchLendingPitLookUpPage }); 
      await When('the user enters "AAPL" in the Lending Pit search field', null, { searchLendingPitLookUpPage }); 
      await And('the user clicks the submit button', null, { searchLendingPitLookUpPage }); 
      await Then('the expected search outcome should be "results shown"', null, { searchLendingPitLookUpPage }); 
    });

    test('Example #2', { tag: ['@smokeBDD', '@Regression', '@SLL-206'] }, async ({ Given, When, Then, And, loginPage, page, searchLendingPitLookUpPage, testUsers }) => { 
      await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
      await When('the user navigates to the Lending Pit Lookup page', null, { searchLendingPitLookUpPage }); 
      await When('the user enters "MSFT" in the Lending Pit search field', null, { searchLendingPitLookUpPage }); 
      await And('the user clicks the submit button', null, { searchLendingPitLookUpPage }); 
      await Then('the expected search outcome should be "results shown"', null, { searchLendingPitLookUpPage }); 
    });

    test('Example #3', { tag: ['@smokeBDD', '@Regression', '@SLL-206'] }, async ({ Given, When, Then, And, loginPage, page, searchLendingPitLookUpPage, testUsers }) => { 
      await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
      await When('the user navigates to the Lending Pit Lookup page', null, { searchLendingPitLookUpPage }); 
      await When('the user enters "TSLA" in the Lending Pit search field', null, { searchLendingPitLookUpPage }); 
      await And('the user clicks the submit button', null, { searchLendingPitLookUpPage }); 
      await Then('the expected search outcome should be "results shown"', null, { searchLendingPitLookUpPage }); 
    });

    test('Example #4', { tag: ['@smokeBDD', '@Regression', '@SLL-206'] }, async ({ Given, When, Then, And, loginPage, page, searchLendingPitLookUpPage, testUsers }) => { 
      await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
      await When('the user navigates to the Lending Pit Lookup page', null, { searchLendingPitLookUpPage }); 
      await When('the user enters "ZZZZINVALID" in the Lending Pit search field', null, { searchLendingPitLookUpPage }); 
      await And('the user clicks the submit button', null, { searchLendingPitLookUpPage }); 
      await Then('the expected search outcome should be "empty grid"', null, { searchLendingPitLookUpPage }); 
    });

    test('Example #5', { tag: ['@smokeBDD', '@Regression', '@SLL-206'] }, async ({ Given, When, Then, And, loginPage, page, searchLendingPitLookUpPage, testUsers }) => { 
      await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
      await When('the user navigates to the Lending Pit Lookup page', null, { searchLendingPitLookUpPage }); 
      await When('the user enters "" in the Lending Pit search field', null, { searchLendingPitLookUpPage }); 
      await And('the user clicks the submit button', null, { searchLendingPitLookUpPage }); 
      await Then('the expected search outcome should be "empty grid"', null, { searchLendingPitLookUpPage }); 
    });

  });

  test('Full lifecycle — login, navigate to Lending Pit, verify Ag-Grid and consistent styling, search symbol, verify results', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-206'] }, async ({ Given, When, Then, And, contractSummaryPage, loginPage, page, searchLendingPitLookUpPage, testUsers }) => { 
    await Given('the user navigates to the application', null, { loginPage, page }); 
    await When('the user logs in with valid credentials', null, { loginPage, testUsers }); 
    await Then('the user should be redirected to the dashboard', null, { contractSummaryPage, page }); 
    await When('the user navigates to the Lending Pit Lookup page', null, { searchLendingPitLookUpPage }); 
    await Then('the Lending Pit page header should be visible with consistent styling', null, { searchLendingPitLookUpPage }); 
    await And('the Lending Pit grid should use the Ag-Grid component', null, { searchLendingPitLookUpPage }); 
    await When('the user enters a valid symbol in the search field', null, { searchLendingPitLookUpPage }); 
    await And('the user clicks the submit button', null, { searchLendingPitLookUpPage }); 
    await Then('the Lending Pit Ag-Grid should display matching results', null, { searchLendingPitLookUpPage }); 
    await And('the results grid should display the "Symbol" column', null, { searchLendingPitLookUpPage }); 
    await And('the results grid should display the "Cusip" column', null, { searchLendingPitLookUpPage }); 
    await And('the results grid should display the "Description" column', null, { searchLendingPitLookUpPage }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('UI-Automation\\features\\LendingPitTweaks.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":10,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-206"],"steps":[{"pwStepLine":7,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"When the user navigates to the Lending Pit Lookup page","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"Then the Lending Pit Ag-Grid should be visible","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"And the grid should display data rows","stepMatchArguments":[]}]},
  {"pwTestLine":13,"pickleLine":18,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-206"],"steps":[{"pwStepLine":14,"gherkinStepLine":19,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":20,"keywordType":"Action","textWithKeyword":"When the user navigates to the Lending Pit Lookup page","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":21,"keywordType":"Action","textWithKeyword":"When the user enters a valid symbol in the search field","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":22,"keywordType":"Action","textWithKeyword":"And the user clicks the submit button","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"Then the Lending Pit Ag-Grid should display matching results","stepMatchArguments":[]}]},
  {"pwTestLine":21,"pickleLine":29,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-206"],"steps":[{"pwStepLine":22,"gherkinStepLine":30,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":31,"keywordType":"Action","textWithKeyword":"When the user navigates to the Lending Pit Lookup page","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"Then the Lending Pit page header should be visible with consistent styling","stepMatchArguments":[]}]},
  {"pwTestLine":27,"pickleLine":36,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-206"],"steps":[{"pwStepLine":28,"gherkinStepLine":37,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":38,"keywordType":"Action","textWithKeyword":"When the user navigates to the Lending Pit Lookup page","stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":39,"keywordType":"Outcome","textWithKeyword":"Then the Lending Pit page buttons should be visible with consistent styling","stepMatchArguments":[]}]},
  {"pwTestLine":33,"pickleLine":43,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-206"],"steps":[{"pwStepLine":34,"gherkinStepLine":44,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":35,"gherkinStepLine":45,"keywordType":"Action","textWithKeyword":"When the user navigates to the Lending Pit Lookup page","stepMatchArguments":[]},{"pwStepLine":36,"gherkinStepLine":46,"keywordType":"Outcome","textWithKeyword":"Then the Lending Pit grid should use the Ag-Grid component","stepMatchArguments":[]}]},
  {"pwTestLine":39,"pickleLine":50,"tags":["@smokeBDD","@Regression","@SLL-206"],"steps":[{"pwStepLine":40,"gherkinStepLine":51,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":41,"gherkinStepLine":52,"keywordType":"Action","textWithKeyword":"When the user navigates to the Lending Pit Lookup page","stepMatchArguments":[]},{"pwStepLine":42,"gherkinStepLine":53,"keywordType":"Outcome","textWithKeyword":"Then the Lending Pit page headings should be visible with consistent styling","stepMatchArguments":[]}]},
  {"pwTestLine":45,"pickleLine":57,"tags":["@smokeBDD","@Regression","@SLL-206"],"steps":[{"pwStepLine":46,"gherkinStepLine":58,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":47,"gherkinStepLine":59,"keywordType":"Action","textWithKeyword":"When the user navigates to the Lending Pit Lookup page","stepMatchArguments":[]},{"pwStepLine":48,"gherkinStepLine":60,"keywordType":"Outcome","textWithKeyword":"Then the Lending Pit page container should have consistent theme colors applied","stepMatchArguments":[]}]},
  {"pwTestLine":51,"pickleLine":66,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-206"],"steps":[{"pwStepLine":52,"gherkinStepLine":67,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":53,"gherkinStepLine":68,"keywordType":"Action","textWithKeyword":"When the user navigates to the Lending Pit Lookup page","stepMatchArguments":[]},{"pwStepLine":54,"gherkinStepLine":69,"keywordType":"Action","textWithKeyword":"When the user enters a valid symbol in the search field","stepMatchArguments":[]},{"pwStepLine":55,"gherkinStepLine":70,"keywordType":"Action","textWithKeyword":"And the user clicks the submit button","stepMatchArguments":[]},{"pwStepLine":56,"gherkinStepLine":71,"keywordType":"Outcome","textWithKeyword":"Then the results grid should display the \"Symbol\" column","stepMatchArguments":[{"group":{"start":36,"value":"\"Symbol\"","children":[{"start":37,"value":"Symbol","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":57,"gherkinStepLine":72,"keywordType":"Outcome","textWithKeyword":"And the results grid should display the \"Cusip\" column","stepMatchArguments":[{"group":{"start":36,"value":"\"Cusip\"","children":[{"start":37,"value":"Cusip","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":58,"gherkinStepLine":73,"keywordType":"Outcome","textWithKeyword":"And the results grid should display the \"Description\" column","stepMatchArguments":[{"group":{"start":36,"value":"\"Description\"","children":[{"start":37,"value":"Description","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":61,"pickleLine":77,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-206"],"steps":[{"pwStepLine":62,"gherkinStepLine":78,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":63,"gherkinStepLine":79,"keywordType":"Action","textWithKeyword":"When the user navigates to the Lending Pit Lookup page","stepMatchArguments":[]},{"pwStepLine":64,"gherkinStepLine":80,"keywordType":"Action","textWithKeyword":"When the user enters a valid symbol in the search field","stepMatchArguments":[]},{"pwStepLine":65,"gherkinStepLine":81,"keywordType":"Action","textWithKeyword":"And the user clicks the submit button","stepMatchArguments":[]},{"pwStepLine":66,"gherkinStepLine":82,"keywordType":"Outcome","textWithKeyword":"Then the Lending Pit Ag-Grid should display matching results","stepMatchArguments":[]},{"pwStepLine":67,"gherkinStepLine":83,"keywordType":"Outcome","textWithKeyword":"And the grid should contain a row matching the searched symbol","stepMatchArguments":[]}]},
  {"pwTestLine":70,"pickleLine":87,"tags":["@smokeBDD","@Regression","@SLL-206"],"steps":[{"pwStepLine":71,"gherkinStepLine":88,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":72,"gherkinStepLine":89,"keywordType":"Action","textWithKeyword":"When the user navigates to the Lending Pit Lookup page","stepMatchArguments":[]},{"pwStepLine":73,"gherkinStepLine":90,"keywordType":"Outcome","textWithKeyword":"Then the Ag-Grid header row should be visible with correctly styled column headers","stepMatchArguments":[]}]},
  {"pwTestLine":76,"pickleLine":94,"tags":["@smokeBDD","@Regression","@SLL-206"],"steps":[{"pwStepLine":77,"gherkinStepLine":95,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":78,"gherkinStepLine":96,"keywordType":"Action","textWithKeyword":"When the user navigates to the Lending Pit Lookup page","stepMatchArguments":[]},{"pwStepLine":79,"gherkinStepLine":97,"keywordType":"Action","textWithKeyword":"When the user enters a valid symbol in the search field","stepMatchArguments":[]},{"pwStepLine":80,"gherkinStepLine":98,"keywordType":"Action","textWithKeyword":"And the user clicks the submit button","stepMatchArguments":[]},{"pwStepLine":81,"gherkinStepLine":99,"keywordType":"Outcome","textWithKeyword":"Then the Lending Pit Ag-Grid should display matching results","stepMatchArguments":[]},{"pwStepLine":82,"gherkinStepLine":100,"keywordType":"Outcome","textWithKeyword":"And the grid rows should contain valid data values","stepMatchArguments":[]}]},
  {"pwTestLine":85,"pickleLine":106,"tags":["@smokeBDD","@Regression","@SLL-206"],"steps":[{"pwStepLine":86,"gherkinStepLine":107,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":87,"gherkinStepLine":108,"keywordType":"Action","textWithKeyword":"When the user navigates to the Lending Pit Lookup page","stepMatchArguments":[]},{"pwStepLine":88,"gherkinStepLine":109,"keywordType":"Action","textWithKeyword":"When the user clicks the submit button without entering a symbol","stepMatchArguments":[]},{"pwStepLine":89,"gherkinStepLine":110,"keywordType":"Outcome","textWithKeyword":"Then the grid should display the empty state overlay or a validation message","stepMatchArguments":[]}]},
  {"pwTestLine":92,"pickleLine":114,"tags":["@smokeBDD","@Regression","@SLL-206"],"steps":[{"pwStepLine":93,"gherkinStepLine":115,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":94,"gherkinStepLine":116,"keywordType":"Action","textWithKeyword":"When the user navigates to the Lending Pit Lookup page","stepMatchArguments":[]},{"pwStepLine":95,"gherkinStepLine":117,"keywordType":"Action","textWithKeyword":"When the user enters \"ZZZZINVALID\" in the Lending Pit search field","stepMatchArguments":[{"group":{"start":16,"value":"\"ZZZZINVALID\"","children":[{"start":17,"value":"ZZZZINVALID","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":96,"gherkinStepLine":118,"keywordType":"Action","textWithKeyword":"And the user clicks the submit button","stepMatchArguments":[]},{"pwStepLine":97,"gherkinStepLine":119,"keywordType":"Outcome","textWithKeyword":"Then the Lending Pit Ag-Grid should display the empty state overlay","stepMatchArguments":[]}]},
  {"pwTestLine":100,"pickleLine":123,"tags":["@smokeBDD","@Regression","@SLL-206"],"steps":[{"pwStepLine":101,"gherkinStepLine":124,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":102,"gherkinStepLine":125,"keywordType":"Action","textWithKeyword":"When the user navigates to the Lending Pit Lookup page","stepMatchArguments":[]},{"pwStepLine":103,"gherkinStepLine":126,"keywordType":"Action","textWithKeyword":"When the user enters \"!@#$%\" in the Lending Pit search field","stepMatchArguments":[{"group":{"start":16,"value":"\"!@#$%\"","children":[{"start":17,"value":"!@#$%","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":104,"gherkinStepLine":127,"keywordType":"Action","textWithKeyword":"And the user clicks the submit button","stepMatchArguments":[]},{"pwStepLine":105,"gherkinStepLine":128,"keywordType":"Outcome","textWithKeyword":"Then the page should not crash","stepMatchArguments":[]},{"pwStepLine":106,"gherkinStepLine":129,"keywordType":"Outcome","textWithKeyword":"And the grid should display the empty state overlay or a validation message","stepMatchArguments":[]}]},
  {"pwTestLine":109,"pickleLine":135,"tags":["@smokeBDD","@Regression","@SLL-206"],"steps":[{"pwStepLine":110,"gherkinStepLine":136,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":111,"gherkinStepLine":137,"keywordType":"Action","textWithKeyword":"When the user navigates to the Lending Pit Lookup page","stepMatchArguments":[]},{"pwStepLine":112,"gherkinStepLine":138,"keywordType":"Outcome","textWithKeyword":"Then the Lending Pit Ag-Grid should display the empty state overlay","stepMatchArguments":[]}]},
  {"pwTestLine":115,"pickleLine":142,"tags":["@smokeBDD","@Regression","@SLL-206"],"steps":[{"pwStepLine":116,"gherkinStepLine":143,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":117,"gherkinStepLine":144,"keywordType":"Action","textWithKeyword":"When the user navigates to the Lending Pit Lookup page","stepMatchArguments":[]},{"pwStepLine":118,"gherkinStepLine":145,"keywordType":"Action","textWithKeyword":"When the user enters a valid symbol in the search field","stepMatchArguments":[]},{"pwStepLine":119,"gherkinStepLine":146,"keywordType":"Action","textWithKeyword":"And the user clicks the submit button","stepMatchArguments":[]},{"pwStepLine":120,"gherkinStepLine":147,"keywordType":"Outcome","textWithKeyword":"Then the Lending Pit Ag-Grid should display matching results","stepMatchArguments":[]},{"pwStepLine":121,"gherkinStepLine":148,"keywordType":"Outcome","textWithKeyword":"And the grid columns should remain correctly aligned","stepMatchArguments":[]}]},
  {"pwTestLine":124,"pickleLine":152,"tags":["@smokeBDD","@Regression","@SLL-206"],"steps":[{"pwStepLine":125,"gherkinStepLine":153,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":126,"gherkinStepLine":154,"keywordType":"Action","textWithKeyword":"When the user navigates to the Lending Pit Lookup page","stepMatchArguments":[]},{"pwStepLine":127,"gherkinStepLine":155,"keywordType":"Outcome","textWithKeyword":"Then the Lending Pit page container should have consistent theme colors applied","stepMatchArguments":[]}]},
  {"pwTestLine":132,"pickleLine":170,"tags":["@smokeBDD","@Regression","@SLL-206"],"steps":[{"pwStepLine":133,"gherkinStepLine":162,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":134,"gherkinStepLine":163,"keywordType":"Action","textWithKeyword":"When the user navigates to the Lending Pit Lookup page","stepMatchArguments":[]},{"pwStepLine":135,"gherkinStepLine":164,"keywordType":"Action","textWithKeyword":"When the user enters \"AAPL\" in the Lending Pit search field","stepMatchArguments":[{"group":{"start":16,"value":"\"AAPL\"","children":[{"start":17,"value":"AAPL","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":136,"gherkinStepLine":165,"keywordType":"Action","textWithKeyword":"And the user clicks the submit button","stepMatchArguments":[]},{"pwStepLine":137,"gherkinStepLine":166,"keywordType":"Outcome","textWithKeyword":"Then the expected search outcome should be \"results shown\"","stepMatchArguments":[{"group":{"start":38,"value":"\"results shown\"","children":[{"start":39,"value":"results shown","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":140,"pickleLine":171,"tags":["@smokeBDD","@Regression","@SLL-206"],"steps":[{"pwStepLine":141,"gherkinStepLine":162,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":142,"gherkinStepLine":163,"keywordType":"Action","textWithKeyword":"When the user navigates to the Lending Pit Lookup page","stepMatchArguments":[]},{"pwStepLine":143,"gherkinStepLine":164,"keywordType":"Action","textWithKeyword":"When the user enters \"MSFT\" in the Lending Pit search field","stepMatchArguments":[{"group":{"start":16,"value":"\"MSFT\"","children":[{"start":17,"value":"MSFT","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":144,"gherkinStepLine":165,"keywordType":"Action","textWithKeyword":"And the user clicks the submit button","stepMatchArguments":[]},{"pwStepLine":145,"gherkinStepLine":166,"keywordType":"Outcome","textWithKeyword":"Then the expected search outcome should be \"results shown\"","stepMatchArguments":[{"group":{"start":38,"value":"\"results shown\"","children":[{"start":39,"value":"results shown","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":148,"pickleLine":172,"tags":["@smokeBDD","@Regression","@SLL-206"],"steps":[{"pwStepLine":149,"gherkinStepLine":162,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":150,"gherkinStepLine":163,"keywordType":"Action","textWithKeyword":"When the user navigates to the Lending Pit Lookup page","stepMatchArguments":[]},{"pwStepLine":151,"gherkinStepLine":164,"keywordType":"Action","textWithKeyword":"When the user enters \"TSLA\" in the Lending Pit search field","stepMatchArguments":[{"group":{"start":16,"value":"\"TSLA\"","children":[{"start":17,"value":"TSLA","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":152,"gherkinStepLine":165,"keywordType":"Action","textWithKeyword":"And the user clicks the submit button","stepMatchArguments":[]},{"pwStepLine":153,"gherkinStepLine":166,"keywordType":"Outcome","textWithKeyword":"Then the expected search outcome should be \"results shown\"","stepMatchArguments":[{"group":{"start":38,"value":"\"results shown\"","children":[{"start":39,"value":"results shown","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":156,"pickleLine":173,"tags":["@smokeBDD","@Regression","@SLL-206"],"steps":[{"pwStepLine":157,"gherkinStepLine":162,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":158,"gherkinStepLine":163,"keywordType":"Action","textWithKeyword":"When the user navigates to the Lending Pit Lookup page","stepMatchArguments":[]},{"pwStepLine":159,"gherkinStepLine":164,"keywordType":"Action","textWithKeyword":"When the user enters \"ZZZZINVALID\" in the Lending Pit search field","stepMatchArguments":[{"group":{"start":16,"value":"\"ZZZZINVALID\"","children":[{"start":17,"value":"ZZZZINVALID","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":160,"gherkinStepLine":165,"keywordType":"Action","textWithKeyword":"And the user clicks the submit button","stepMatchArguments":[]},{"pwStepLine":161,"gherkinStepLine":166,"keywordType":"Outcome","textWithKeyword":"Then the expected search outcome should be \"empty grid\"","stepMatchArguments":[{"group":{"start":38,"value":"\"empty grid\"","children":[{"start":39,"value":"empty grid","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":164,"pickleLine":174,"tags":["@smokeBDD","@Regression","@SLL-206"],"steps":[{"pwStepLine":165,"gherkinStepLine":162,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":166,"gherkinStepLine":163,"keywordType":"Action","textWithKeyword":"When the user navigates to the Lending Pit Lookup page","stepMatchArguments":[]},{"pwStepLine":167,"gherkinStepLine":164,"keywordType":"Action","textWithKeyword":"When the user enters \"\" in the Lending Pit search field","stepMatchArguments":[{"group":{"start":16,"value":"\"\"","children":[{"start":17,"value":"","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":168,"gherkinStepLine":165,"keywordType":"Action","textWithKeyword":"And the user clicks the submit button","stepMatchArguments":[]},{"pwStepLine":169,"gherkinStepLine":166,"keywordType":"Outcome","textWithKeyword":"Then the expected search outcome should be \"empty grid\"","stepMatchArguments":[{"group":{"start":38,"value":"\"empty grid\"","children":[{"start":39,"value":"empty grid","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":174,"pickleLine":180,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-206"],"steps":[{"pwStepLine":175,"gherkinStepLine":181,"keywordType":"Context","textWithKeyword":"Given the user navigates to the application","stepMatchArguments":[]},{"pwStepLine":176,"gherkinStepLine":182,"keywordType":"Action","textWithKeyword":"When the user logs in with valid credentials","stepMatchArguments":[]},{"pwStepLine":177,"gherkinStepLine":183,"keywordType":"Outcome","textWithKeyword":"Then the user should be redirected to the dashboard","stepMatchArguments":[]},{"pwStepLine":178,"gherkinStepLine":184,"keywordType":"Action","textWithKeyword":"When the user navigates to the Lending Pit Lookup page","stepMatchArguments":[]},{"pwStepLine":179,"gherkinStepLine":185,"keywordType":"Outcome","textWithKeyword":"Then the Lending Pit page header should be visible with consistent styling","stepMatchArguments":[]},{"pwStepLine":180,"gherkinStepLine":186,"keywordType":"Outcome","textWithKeyword":"And the Lending Pit grid should use the Ag-Grid component","stepMatchArguments":[]},{"pwStepLine":181,"gherkinStepLine":187,"keywordType":"Action","textWithKeyword":"When the user enters a valid symbol in the search field","stepMatchArguments":[]},{"pwStepLine":182,"gherkinStepLine":188,"keywordType":"Action","textWithKeyword":"And the user clicks the submit button","stepMatchArguments":[]},{"pwStepLine":183,"gherkinStepLine":189,"keywordType":"Outcome","textWithKeyword":"Then the Lending Pit Ag-Grid should display matching results","stepMatchArguments":[]},{"pwStepLine":184,"gherkinStepLine":190,"keywordType":"Outcome","textWithKeyword":"And the results grid should display the \"Symbol\" column","stepMatchArguments":[{"group":{"start":36,"value":"\"Symbol\"","children":[{"start":37,"value":"Symbol","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":185,"gherkinStepLine":191,"keywordType":"Outcome","textWithKeyword":"And the results grid should display the \"Cusip\" column","stepMatchArguments":[{"group":{"start":36,"value":"\"Cusip\"","children":[{"start":37,"value":"Cusip","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":186,"gherkinStepLine":192,"keywordType":"Outcome","textWithKeyword":"And the results grid should display the \"Description\" column","stepMatchArguments":[{"group":{"start":36,"value":"\"Description\"","children":[{"start":37,"value":"Description","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end