// Generated from: UI-Automation\features\ShortInterestRateAdjustment.feature
import { test } from "../../../step-definitions/fixtures.js";

test.describe('Short Interest Rate Adjustment Component (SLL-203)', () => {

  test('User navigates to Short Interest Rate Adjustment page and views data loaded in Ag-Grid', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-203'] }, async ({ Given, When, Then, And, loginPage, page, shortInterestRateAdjustmentPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Short Interest Rate Adjustment page', null, { shortInterestRateAdjustmentPage }); 
    await Then('the Short Interest Rate Adjustment grid should be visible', null, { shortInterestRateAdjustmentPage }); 
    await And('the grid should display rate data loaded from SLS V1 endpoints', null, { shortInterestRateAdjustmentPage }); 
  });

  test('Authorized user successfully adjusts a short interest rate and saves', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-203'] }, async ({ Given, When, Then, And, loginPage, page, shortInterestRateAdjustmentPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Short Interest Rate Adjustment page', null, { shortInterestRateAdjustmentPage }); 
    await When('the user selects the first row in the rate adjustment grid', null, { shortInterestRateAdjustmentPage }); 
    await And('the user enters a new rate value of "2.50" in the rate input field', null, { shortInterestRateAdjustmentPage }); 
    await And('the user clicks the save button', null, { shortInterestRateAdjustmentPage }); 
    await Then('a success confirmation message should be displayed', null, { shortInterestRateAdjustmentPage }); 
    await And('the grid should reflect the updated rate value', null, { shortInterestRateAdjustmentPage }); 
  });

  test('Authorized trader user can edit rate cells in the adjustment grid', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-203'] }, async ({ Given, When, Then, And, loginPage, page, shortInterestRateAdjustmentPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Short Interest Rate Adjustment page', null, { shortInterestRateAdjustmentPage }); 
    await When('the user selects the first row in the rate adjustment grid', null, { shortInterestRateAdjustmentPage }); 
    await Then('the rate input field should be editable', null, { shortInterestRateAdjustmentPage }); 
  });

  test('Read-only user cannot edit rate cells in the adjustment grid', { tag: ['@smokeBDD', '@Regression', '@SLL-203'] }, async ({ Given, When, Then, And, loginPage, page, shortInterestRateAdjustmentPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Short Interest Rate Adjustment page', null, { shortInterestRateAdjustmentPage }); 
    await When('the user attempts to edit a rate cell', null, { shortInterestRateAdjustmentPage }); 
    await Then('the rate input field should not be editable', null, { shortInterestRateAdjustmentPage }); 
    await And('an access restriction message should be displayed', null, { shortInterestRateAdjustmentPage }); 
  });

  test('Short Interest Rate Adjustment page displays correct Ag-Grid column headers', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-203'] }, async ({ Given, When, Then, And, loginPage, page, shortInterestRateAdjustmentPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Short Interest Rate Adjustment page', null, { shortInterestRateAdjustmentPage }); 
    await Then('the grid header row should be visible with expected column names', null, { shortInterestRateAdjustmentPage }); 
    await And('the grid should use the Ag-Grid component for data management', null, { shortInterestRateAdjustmentPage }); 
  });

  test('Short Interest Rate Adjustment page renders with theme-aware styling consistent with V2 design system', { tag: ['@smokeBDD', '@Regression', '@SLL-203'] }, async ({ Given, When, Then, loginPage, page, shortInterestRateAdjustmentPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Short Interest Rate Adjustment page', null, { shortInterestRateAdjustmentPage }); 
    await Then('the page container should be visible with V2 theme styling applied', null, { shortInterestRateAdjustmentPage }); 
  });

  test('User cannot save a rate adjustment without first selecting a row', { tag: ['@smokeBDD', '@Regression', '@SLL-203'] }, async ({ Given, When, Then, And, loginPage, page, shortInterestRateAdjustmentPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Short Interest Rate Adjustment page', null, { shortInterestRateAdjustmentPage }); 
    await When('the user clicks the save button without selecting any row', null, { shortInterestRateAdjustmentPage }); 
    await Then('the save action should be blocked', null, { shortInterestRateAdjustmentPage }); 
    await And('a row selection warning message should be displayed', null, { shortInterestRateAdjustmentPage }); 
  });

  test('User must select a row before the rate input field becomes active', { tag: ['@smokeBDD', '@Regression', '@SLL-203'] }, async ({ Given, When, Then, And, loginPage, page, shortInterestRateAdjustmentPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Short Interest Rate Adjustment page', null, { shortInterestRateAdjustmentPage }); 
    await Then('the rate input field should be disabled before any row is selected', null, { shortInterestRateAdjustmentPage }); 
    await When('the user selects the first row in the rate adjustment grid', null, { shortInterestRateAdjustmentPage }); 
    await Then('the rate input field should be enabled', null, { shortInterestRateAdjustmentPage }); 
  });

  test('User clears the rate field and attempts to save - validation error is shown', { tag: ['@smokeBDD', '@Regression', '@SLL-203'] }, async ({ Given, When, Then, And, loginPage, page, shortInterestRateAdjustmentPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Short Interest Rate Adjustment page', null, { shortInterestRateAdjustmentPage }); 
    await And('the user selects the first row in the rate adjustment grid', null, { shortInterestRateAdjustmentPage }); 
    await When('the user clears the rate input field', null, { shortInterestRateAdjustmentPage }); 
    await And('the user clicks the save button', null, { shortInterestRateAdjustmentPage }); 
    await Then('a validation error for the rate field should be displayed', null, { shortInterestRateAdjustmentPage }); 
    await And('the save action should not proceed', null, { shortInterestRateAdjustmentPage }); 
  });

  test('User enters a non-numeric value in the rate field - validation error is shown', { tag: ['@smokeBDD', '@Regression', '@SLL-203'] }, async ({ Given, When, Then, And, loginPage, page, shortInterestRateAdjustmentPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Short Interest Rate Adjustment page', null, { shortInterestRateAdjustmentPage }); 
    await And('the user selects the first row in the rate adjustment grid', null, { shortInterestRateAdjustmentPage }); 
    await When('the user enters a new rate value of "abc" in the rate input field', null, { shortInterestRateAdjustmentPage }); 
    await And('the user clicks the save button', null, { shortInterestRateAdjustmentPage }); 
    await Then('a validation error for the rate field should be displayed', null, { shortInterestRateAdjustmentPage }); 
  });

  test('User enters a negative rate value - validation error is shown', { tag: ['@smokeBDD', '@Regression', '@SLL-203'] }, async ({ Given, When, Then, And, loginPage, page, shortInterestRateAdjustmentPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Short Interest Rate Adjustment page', null, { shortInterestRateAdjustmentPage }); 
    await And('the user selects the first row in the rate adjustment grid', null, { shortInterestRateAdjustmentPage }); 
    await When('the user enters a new rate value of "-5.00" in the rate input field', null, { shortInterestRateAdjustmentPage }); 
    await And('the user clicks the save button', null, { shortInterestRateAdjustmentPage }); 
    await Then('a validation error for the rate field should be displayed', null, { shortInterestRateAdjustmentPage }); 
  });

  test.describe('User submits rate adjustment with various valid and boundary rate values', () => {

    test('Example #1', { tag: ['@smokeBDD', '@Regression', '@SLL-203'] }, async ({ Given, When, Then, And, loginPage, page, shortInterestRateAdjustmentPage, testUsers }) => { 
      await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
      await And('the user navigates to the Short Interest Rate Adjustment page', null, { shortInterestRateAdjustmentPage }); 
      await And('the user selects the first row in the rate adjustment grid', null, { shortInterestRateAdjustmentPage }); 
      await When('the user enters a new rate value of "0.00" in the rate input field', null, { shortInterestRateAdjustmentPage }); 
      await And('the user clicks the save button', null, { shortInterestRateAdjustmentPage }); 
      await Then('the expected outcome should be "success"', null, { shortInterestRateAdjustmentPage }); 
    });

    test('Example #2', { tag: ['@smokeBDD', '@Regression', '@SLL-203'] }, async ({ Given, When, Then, And, loginPage, page, shortInterestRateAdjustmentPage, testUsers }) => { 
      await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
      await And('the user navigates to the Short Interest Rate Adjustment page', null, { shortInterestRateAdjustmentPage }); 
      await And('the user selects the first row in the rate adjustment grid', null, { shortInterestRateAdjustmentPage }); 
      await When('the user enters a new rate value of "1.50" in the rate input field', null, { shortInterestRateAdjustmentPage }); 
      await And('the user clicks the save button', null, { shortInterestRateAdjustmentPage }); 
      await Then('the expected outcome should be "success"', null, { shortInterestRateAdjustmentPage }); 
    });

    test('Example #3', { tag: ['@smokeBDD', '@Regression', '@SLL-203'] }, async ({ Given, When, Then, And, loginPage, page, shortInterestRateAdjustmentPage, testUsers }) => { 
      await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
      await And('the user navigates to the Short Interest Rate Adjustment page', null, { shortInterestRateAdjustmentPage }); 
      await And('the user selects the first row in the rate adjustment grid', null, { shortInterestRateAdjustmentPage }); 
      await When('the user enters a new rate value of "99.99" in the rate input field', null, { shortInterestRateAdjustmentPage }); 
      await And('the user clicks the save button', null, { shortInterestRateAdjustmentPage }); 
      await Then('the expected outcome should be "success"', null, { shortInterestRateAdjustmentPage }); 
    });

    test('Example #4', { tag: ['@smokeBDD', '@Regression', '@SLL-203'] }, async ({ Given, When, Then, And, loginPage, page, shortInterestRateAdjustmentPage, testUsers }) => { 
      await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
      await And('the user navigates to the Short Interest Rate Adjustment page', null, { shortInterestRateAdjustmentPage }); 
      await And('the user selects the first row in the rate adjustment grid', null, { shortInterestRateAdjustmentPage }); 
      await When('the user enters a new rate value of "100.00" in the rate input field', null, { shortInterestRateAdjustmentPage }); 
      await And('the user clicks the save button', null, { shortInterestRateAdjustmentPage }); 
      await Then('the expected outcome should be "validation error"', null, { shortInterestRateAdjustmentPage }); 
    });

    test('Example #5', { tag: ['@smokeBDD', '@Regression', '@SLL-203'] }, async ({ Given, When, Then, And, loginPage, page, shortInterestRateAdjustmentPage, testUsers }) => { 
      await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
      await And('the user navigates to the Short Interest Rate Adjustment page', null, { shortInterestRateAdjustmentPage }); 
      await And('the user selects the first row in the rate adjustment grid', null, { shortInterestRateAdjustmentPage }); 
      await When('the user enters a new rate value of "-0.01" in the rate input field', null, { shortInterestRateAdjustmentPage }); 
      await And('the user clicks the save button', null, { shortInterestRateAdjustmentPage }); 
      await Then('the expected outcome should be "validation error"', null, { shortInterestRateAdjustmentPage }); 
    });

  });

  test('Short Interest Rate Adjustment grid shows empty state when no data is available', { tag: ['@smokeBDD', '@Regression', '@SLL-203'] }, async ({ Given, When, Then, And, loginPage, page, shortInterestRateAdjustmentPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Short Interest Rate Adjustment page', null, { shortInterestRateAdjustmentPage }); 
    await And('no rate records are present in the system', null, { shortInterestRateAdjustmentPage }); 
    await Then('the grid empty state overlay should be displayed', null, { shortInterestRateAdjustmentPage }); 
  });

  test('User enters maximum allowed characters in rate field', { tag: ['@smokeBDD', '@Regression', '@SLL-203'] }, async ({ Given, When, Then, And, loginPage, page, shortInterestRateAdjustmentPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Short Interest Rate Adjustment page', null, { shortInterestRateAdjustmentPage }); 
    await And('the user selects the first row in the rate adjustment grid', null, { shortInterestRateAdjustmentPage }); 
    await When('the user enters a rate value exceeding the maximum allowed length', null, { shortInterestRateAdjustmentPage }); 
    await Then('the rate input field should enforce the character limit', null, { shortInterestRateAdjustmentPage }); 
  });

  test('Grid displays an error state when SLS V1 endpoint fails to return data', { tag: ['@smokeBDD', '@Regression', '@SLL-203'] }, async ({ Given, When, Then, And, loginPage, page, shortInterestRateAdjustmentPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Short Interest Rate Adjustment page', null, { shortInterestRateAdjustmentPage }); 
    await And('the SLS V1 endpoint returns an error', null, { shortInterestRateAdjustmentPage }); 
    await Then('the grid should display a data load error message', null, { shortInterestRateAdjustmentPage }); 
  });

  test('Full lifecycle - user logs in, navigates to rate adjustment, modifies rate and confirms save', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-203'] }, async ({ Given, When, Then, And, contractSummaryPage, loginPage, page, shortInterestRateAdjustmentPage, testUsers }) => { 
    await Given('the user navigates to the application', null, { loginPage, page }); 
    await When('the user logs in with valid credentials', null, { loginPage, testUsers }); 
    await Then('the user should be redirected to the dashboard', null, { contractSummaryPage, page }); 
    await When('the user navigates to the Short Interest Rate Adjustment page', null, { shortInterestRateAdjustmentPage }); 
    await Then('the Short Interest Rate Adjustment grid should be visible', null, { shortInterestRateAdjustmentPage }); 
    await And('the grid should display rate data loaded from SLS V1 endpoints', null, { shortInterestRateAdjustmentPage }); 
    await When('the user selects the first row in the rate adjustment grid', null, { shortInterestRateAdjustmentPage }); 
    await And('the user enters a new rate value of "3.75" in the rate input field', null, { shortInterestRateAdjustmentPage }); 
    await And('the user clicks the save button', null, { shortInterestRateAdjustmentPage }); 
    await Then('a success confirmation message should be displayed', null, { shortInterestRateAdjustmentPage }); 
    await And('the grid should reflect the updated rate value', null, { shortInterestRateAdjustmentPage }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('UI-Automation\\features\\ShortInterestRateAdjustment.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":10,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-203"],"steps":[{"pwStepLine":7,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"When the user navigates to the Short Interest Rate Adjustment page","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"Then the Short Interest Rate Adjustment grid should be visible","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"And the grid should display rate data loaded from SLS V1 endpoints","stepMatchArguments":[]}]},
  {"pwTestLine":13,"pickleLine":18,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-203"],"steps":[{"pwStepLine":14,"gherkinStepLine":19,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":20,"keywordType":"Context","textWithKeyword":"And the user navigates to the Short Interest Rate Adjustment page","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":21,"keywordType":"Action","textWithKeyword":"When the user selects the first row in the rate adjustment grid","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":22,"keywordType":"Action","textWithKeyword":"And the user enters a new rate value of \"2.50\" in the rate input field","stepMatchArguments":[{"group":{"start":36,"value":"\"2.50\"","children":[{"start":37,"value":"2.50","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":18,"gherkinStepLine":23,"keywordType":"Action","textWithKeyword":"And the user clicks the save button","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"Then a success confirmation message should be displayed","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"And the grid should reflect the updated rate value","stepMatchArguments":[]}]},
  {"pwTestLine":23,"pickleLine":31,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-203"],"steps":[{"pwStepLine":24,"gherkinStepLine":32,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":33,"keywordType":"Context","textWithKeyword":"And the user navigates to the Short Interest Rate Adjustment page","stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":34,"keywordType":"Action","textWithKeyword":"When the user selects the first row in the rate adjustment grid","stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":35,"keywordType":"Outcome","textWithKeyword":"Then the rate input field should be editable","stepMatchArguments":[]}]},
  {"pwTestLine":30,"pickleLine":39,"tags":["@smokeBDD","@Regression","@SLL-203"],"steps":[{"pwStepLine":31,"gherkinStepLine":40,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":41,"keywordType":"Context","textWithKeyword":"And the user navigates to the Short Interest Rate Adjustment page","stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":42,"keywordType":"Action","textWithKeyword":"When the user attempts to edit a rate cell","stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":43,"keywordType":"Outcome","textWithKeyword":"Then the rate input field should not be editable","stepMatchArguments":[]},{"pwStepLine":35,"gherkinStepLine":44,"keywordType":"Outcome","textWithKeyword":"And an access restriction message should be displayed","stepMatchArguments":[]}]},
  {"pwTestLine":38,"pickleLine":50,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-203"],"steps":[{"pwStepLine":39,"gherkinStepLine":51,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":40,"gherkinStepLine":52,"keywordType":"Action","textWithKeyword":"When the user navigates to the Short Interest Rate Adjustment page","stepMatchArguments":[]},{"pwStepLine":41,"gherkinStepLine":53,"keywordType":"Outcome","textWithKeyword":"Then the grid header row should be visible with expected column names","stepMatchArguments":[]},{"pwStepLine":42,"gherkinStepLine":54,"keywordType":"Outcome","textWithKeyword":"And the grid should use the Ag-Grid component for data management","stepMatchArguments":[]}]},
  {"pwTestLine":45,"pickleLine":58,"tags":["@smokeBDD","@Regression","@SLL-203"],"steps":[{"pwStepLine":46,"gherkinStepLine":59,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":47,"gherkinStepLine":60,"keywordType":"Action","textWithKeyword":"When the user navigates to the Short Interest Rate Adjustment page","stepMatchArguments":[]},{"pwStepLine":48,"gherkinStepLine":61,"keywordType":"Outcome","textWithKeyword":"Then the page container should be visible with V2 theme styling applied","stepMatchArguments":[]}]},
  {"pwTestLine":51,"pickleLine":67,"tags":["@smokeBDD","@Regression","@SLL-203"],"steps":[{"pwStepLine":52,"gherkinStepLine":68,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":53,"gherkinStepLine":69,"keywordType":"Context","textWithKeyword":"And the user navigates to the Short Interest Rate Adjustment page","stepMatchArguments":[]},{"pwStepLine":54,"gherkinStepLine":70,"keywordType":"Action","textWithKeyword":"When the user clicks the save button without selecting any row","stepMatchArguments":[]},{"pwStepLine":55,"gherkinStepLine":71,"keywordType":"Outcome","textWithKeyword":"Then the save action should be blocked","stepMatchArguments":[]},{"pwStepLine":56,"gherkinStepLine":72,"keywordType":"Outcome","textWithKeyword":"And a row selection warning message should be displayed","stepMatchArguments":[]}]},
  {"pwTestLine":59,"pickleLine":76,"tags":["@smokeBDD","@Regression","@SLL-203"],"steps":[{"pwStepLine":60,"gherkinStepLine":77,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":61,"gherkinStepLine":78,"keywordType":"Context","textWithKeyword":"And the user navigates to the Short Interest Rate Adjustment page","stepMatchArguments":[]},{"pwStepLine":62,"gherkinStepLine":79,"keywordType":"Outcome","textWithKeyword":"Then the rate input field should be disabled before any row is selected","stepMatchArguments":[]},{"pwStepLine":63,"gherkinStepLine":80,"keywordType":"Action","textWithKeyword":"When the user selects the first row in the rate adjustment grid","stepMatchArguments":[]},{"pwStepLine":64,"gherkinStepLine":81,"keywordType":"Outcome","textWithKeyword":"Then the rate input field should be enabled","stepMatchArguments":[]}]},
  {"pwTestLine":67,"pickleLine":87,"tags":["@smokeBDD","@Regression","@SLL-203"],"steps":[{"pwStepLine":68,"gherkinStepLine":88,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":69,"gherkinStepLine":89,"keywordType":"Context","textWithKeyword":"And the user navigates to the Short Interest Rate Adjustment page","stepMatchArguments":[]},{"pwStepLine":70,"gherkinStepLine":90,"keywordType":"Context","textWithKeyword":"And the user selects the first row in the rate adjustment grid","stepMatchArguments":[]},{"pwStepLine":71,"gherkinStepLine":91,"keywordType":"Action","textWithKeyword":"When the user clears the rate input field","stepMatchArguments":[]},{"pwStepLine":72,"gherkinStepLine":92,"keywordType":"Action","textWithKeyword":"And the user clicks the save button","stepMatchArguments":[]},{"pwStepLine":73,"gherkinStepLine":93,"keywordType":"Outcome","textWithKeyword":"Then a validation error for the rate field should be displayed","stepMatchArguments":[]},{"pwStepLine":74,"gherkinStepLine":94,"keywordType":"Outcome","textWithKeyword":"And the save action should not proceed","stepMatchArguments":[]}]},
  {"pwTestLine":77,"pickleLine":98,"tags":["@smokeBDD","@Regression","@SLL-203"],"steps":[{"pwStepLine":78,"gherkinStepLine":99,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":79,"gherkinStepLine":100,"keywordType":"Context","textWithKeyword":"And the user navigates to the Short Interest Rate Adjustment page","stepMatchArguments":[]},{"pwStepLine":80,"gherkinStepLine":101,"keywordType":"Context","textWithKeyword":"And the user selects the first row in the rate adjustment grid","stepMatchArguments":[]},{"pwStepLine":81,"gherkinStepLine":102,"keywordType":"Action","textWithKeyword":"When the user enters a new rate value of \"abc\" in the rate input field","stepMatchArguments":[{"group":{"start":36,"value":"\"abc\"","children":[{"start":37,"value":"abc","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":82,"gherkinStepLine":103,"keywordType":"Action","textWithKeyword":"And the user clicks the save button","stepMatchArguments":[]},{"pwStepLine":83,"gherkinStepLine":104,"keywordType":"Outcome","textWithKeyword":"Then a validation error for the rate field should be displayed","stepMatchArguments":[]}]},
  {"pwTestLine":86,"pickleLine":108,"tags":["@smokeBDD","@Regression","@SLL-203"],"steps":[{"pwStepLine":87,"gherkinStepLine":109,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":88,"gherkinStepLine":110,"keywordType":"Context","textWithKeyword":"And the user navigates to the Short Interest Rate Adjustment page","stepMatchArguments":[]},{"pwStepLine":89,"gherkinStepLine":111,"keywordType":"Context","textWithKeyword":"And the user selects the first row in the rate adjustment grid","stepMatchArguments":[]},{"pwStepLine":90,"gherkinStepLine":112,"keywordType":"Action","textWithKeyword":"When the user enters a new rate value of \"-5.00\" in the rate input field","stepMatchArguments":[{"group":{"start":36,"value":"\"-5.00\"","children":[{"start":37,"value":"-5.00","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":91,"gherkinStepLine":113,"keywordType":"Action","textWithKeyword":"And the user clicks the save button","stepMatchArguments":[]},{"pwStepLine":92,"gherkinStepLine":114,"keywordType":"Outcome","textWithKeyword":"Then a validation error for the rate field should be displayed","stepMatchArguments":[]}]},
  {"pwTestLine":97,"pickleLine":128,"tags":["@smokeBDD","@Regression","@SLL-203"],"steps":[{"pwStepLine":98,"gherkinStepLine":119,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":99,"gherkinStepLine":120,"keywordType":"Context","textWithKeyword":"And the user navigates to the Short Interest Rate Adjustment page","stepMatchArguments":[]},{"pwStepLine":100,"gherkinStepLine":121,"keywordType":"Context","textWithKeyword":"And the user selects the first row in the rate adjustment grid","stepMatchArguments":[]},{"pwStepLine":101,"gherkinStepLine":122,"keywordType":"Action","textWithKeyword":"When the user enters a new rate value of \"0.00\" in the rate input field","stepMatchArguments":[{"group":{"start":36,"value":"\"0.00\"","children":[{"start":37,"value":"0.00","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":102,"gherkinStepLine":123,"keywordType":"Action","textWithKeyword":"And the user clicks the save button","stepMatchArguments":[]},{"pwStepLine":103,"gherkinStepLine":124,"keywordType":"Outcome","textWithKeyword":"Then the expected outcome should be \"success\"","stepMatchArguments":[{"group":{"start":31,"value":"\"success\"","children":[{"start":32,"value":"success","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":106,"pickleLine":129,"tags":["@smokeBDD","@Regression","@SLL-203"],"steps":[{"pwStepLine":107,"gherkinStepLine":119,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":108,"gherkinStepLine":120,"keywordType":"Context","textWithKeyword":"And the user navigates to the Short Interest Rate Adjustment page","stepMatchArguments":[]},{"pwStepLine":109,"gherkinStepLine":121,"keywordType":"Context","textWithKeyword":"And the user selects the first row in the rate adjustment grid","stepMatchArguments":[]},{"pwStepLine":110,"gherkinStepLine":122,"keywordType":"Action","textWithKeyword":"When the user enters a new rate value of \"1.50\" in the rate input field","stepMatchArguments":[{"group":{"start":36,"value":"\"1.50\"","children":[{"start":37,"value":"1.50","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":111,"gherkinStepLine":123,"keywordType":"Action","textWithKeyword":"And the user clicks the save button","stepMatchArguments":[]},{"pwStepLine":112,"gherkinStepLine":124,"keywordType":"Outcome","textWithKeyword":"Then the expected outcome should be \"success\"","stepMatchArguments":[{"group":{"start":31,"value":"\"success\"","children":[{"start":32,"value":"success","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":115,"pickleLine":130,"tags":["@smokeBDD","@Regression","@SLL-203"],"steps":[{"pwStepLine":116,"gherkinStepLine":119,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":117,"gherkinStepLine":120,"keywordType":"Context","textWithKeyword":"And the user navigates to the Short Interest Rate Adjustment page","stepMatchArguments":[]},{"pwStepLine":118,"gherkinStepLine":121,"keywordType":"Context","textWithKeyword":"And the user selects the first row in the rate adjustment grid","stepMatchArguments":[]},{"pwStepLine":119,"gherkinStepLine":122,"keywordType":"Action","textWithKeyword":"When the user enters a new rate value of \"99.99\" in the rate input field","stepMatchArguments":[{"group":{"start":36,"value":"\"99.99\"","children":[{"start":37,"value":"99.99","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":120,"gherkinStepLine":123,"keywordType":"Action","textWithKeyword":"And the user clicks the save button","stepMatchArguments":[]},{"pwStepLine":121,"gherkinStepLine":124,"keywordType":"Outcome","textWithKeyword":"Then the expected outcome should be \"success\"","stepMatchArguments":[{"group":{"start":31,"value":"\"success\"","children":[{"start":32,"value":"success","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":124,"pickleLine":131,"tags":["@smokeBDD","@Regression","@SLL-203"],"steps":[{"pwStepLine":125,"gherkinStepLine":119,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":126,"gherkinStepLine":120,"keywordType":"Context","textWithKeyword":"And the user navigates to the Short Interest Rate Adjustment page","stepMatchArguments":[]},{"pwStepLine":127,"gherkinStepLine":121,"keywordType":"Context","textWithKeyword":"And the user selects the first row in the rate adjustment grid","stepMatchArguments":[]},{"pwStepLine":128,"gherkinStepLine":122,"keywordType":"Action","textWithKeyword":"When the user enters a new rate value of \"100.00\" in the rate input field","stepMatchArguments":[{"group":{"start":36,"value":"\"100.00\"","children":[{"start":37,"value":"100.00","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":129,"gherkinStepLine":123,"keywordType":"Action","textWithKeyword":"And the user clicks the save button","stepMatchArguments":[]},{"pwStepLine":130,"gherkinStepLine":124,"keywordType":"Outcome","textWithKeyword":"Then the expected outcome should be \"validation error\"","stepMatchArguments":[{"group":{"start":31,"value":"\"validation error\"","children":[{"start":32,"value":"validation error","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":133,"pickleLine":132,"tags":["@smokeBDD","@Regression","@SLL-203"],"steps":[{"pwStepLine":134,"gherkinStepLine":119,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":135,"gherkinStepLine":120,"keywordType":"Context","textWithKeyword":"And the user navigates to the Short Interest Rate Adjustment page","stepMatchArguments":[]},{"pwStepLine":136,"gherkinStepLine":121,"keywordType":"Context","textWithKeyword":"And the user selects the first row in the rate adjustment grid","stepMatchArguments":[]},{"pwStepLine":137,"gherkinStepLine":122,"keywordType":"Action","textWithKeyword":"When the user enters a new rate value of \"-0.01\" in the rate input field","stepMatchArguments":[{"group":{"start":36,"value":"\"-0.01\"","children":[{"start":37,"value":"-0.01","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":138,"gherkinStepLine":123,"keywordType":"Action","textWithKeyword":"And the user clicks the save button","stepMatchArguments":[]},{"pwStepLine":139,"gherkinStepLine":124,"keywordType":"Outcome","textWithKeyword":"Then the expected outcome should be \"validation error\"","stepMatchArguments":[{"group":{"start":31,"value":"\"validation error\"","children":[{"start":32,"value":"validation error","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":144,"pickleLine":138,"tags":["@smokeBDD","@Regression","@SLL-203"],"steps":[{"pwStepLine":145,"gherkinStepLine":139,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":146,"gherkinStepLine":140,"keywordType":"Action","textWithKeyword":"When the user navigates to the Short Interest Rate Adjustment page","stepMatchArguments":[]},{"pwStepLine":147,"gherkinStepLine":141,"keywordType":"Action","textWithKeyword":"And no rate records are present in the system","stepMatchArguments":[]},{"pwStepLine":148,"gherkinStepLine":142,"keywordType":"Outcome","textWithKeyword":"Then the grid empty state overlay should be displayed","stepMatchArguments":[]}]},
  {"pwTestLine":151,"pickleLine":146,"tags":["@smokeBDD","@Regression","@SLL-203"],"steps":[{"pwStepLine":152,"gherkinStepLine":147,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":153,"gherkinStepLine":148,"keywordType":"Context","textWithKeyword":"And the user navigates to the Short Interest Rate Adjustment page","stepMatchArguments":[]},{"pwStepLine":154,"gherkinStepLine":149,"keywordType":"Context","textWithKeyword":"And the user selects the first row in the rate adjustment grid","stepMatchArguments":[]},{"pwStepLine":155,"gherkinStepLine":150,"keywordType":"Action","textWithKeyword":"When the user enters a rate value exceeding the maximum allowed length","stepMatchArguments":[]},{"pwStepLine":156,"gherkinStepLine":151,"keywordType":"Outcome","textWithKeyword":"Then the rate input field should enforce the character limit","stepMatchArguments":[]}]},
  {"pwTestLine":159,"pickleLine":155,"tags":["@smokeBDD","@Regression","@SLL-203"],"steps":[{"pwStepLine":160,"gherkinStepLine":156,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":161,"gherkinStepLine":157,"keywordType":"Action","textWithKeyword":"When the user navigates to the Short Interest Rate Adjustment page","stepMatchArguments":[]},{"pwStepLine":162,"gherkinStepLine":158,"keywordType":"Action","textWithKeyword":"And the SLS V1 endpoint returns an error","stepMatchArguments":[]},{"pwStepLine":163,"gherkinStepLine":159,"keywordType":"Outcome","textWithKeyword":"Then the grid should display a data load error message","stepMatchArguments":[]}]},
  {"pwTestLine":166,"pickleLine":165,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-203"],"steps":[{"pwStepLine":167,"gherkinStepLine":166,"keywordType":"Context","textWithKeyword":"Given the user navigates to the application","stepMatchArguments":[]},{"pwStepLine":168,"gherkinStepLine":167,"keywordType":"Action","textWithKeyword":"When the user logs in with valid credentials","stepMatchArguments":[]},{"pwStepLine":169,"gherkinStepLine":168,"keywordType":"Outcome","textWithKeyword":"Then the user should be redirected to the dashboard","stepMatchArguments":[]},{"pwStepLine":170,"gherkinStepLine":169,"keywordType":"Action","textWithKeyword":"When the user navigates to the Short Interest Rate Adjustment page","stepMatchArguments":[]},{"pwStepLine":171,"gherkinStepLine":170,"keywordType":"Outcome","textWithKeyword":"Then the Short Interest Rate Adjustment grid should be visible","stepMatchArguments":[]},{"pwStepLine":172,"gherkinStepLine":171,"keywordType":"Outcome","textWithKeyword":"And the grid should display rate data loaded from SLS V1 endpoints","stepMatchArguments":[]},{"pwStepLine":173,"gherkinStepLine":172,"keywordType":"Action","textWithKeyword":"When the user selects the first row in the rate adjustment grid","stepMatchArguments":[]},{"pwStepLine":174,"gherkinStepLine":173,"keywordType":"Action","textWithKeyword":"And the user enters a new rate value of \"3.75\" in the rate input field","stepMatchArguments":[{"group":{"start":36,"value":"\"3.75\"","children":[{"start":37,"value":"3.75","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":175,"gherkinStepLine":174,"keywordType":"Action","textWithKeyword":"And the user clicks the save button","stepMatchArguments":[]},{"pwStepLine":176,"gherkinStepLine":175,"keywordType":"Outcome","textWithKeyword":"Then a success confirmation message should be displayed","stepMatchArguments":[]},{"pwStepLine":177,"gherkinStepLine":176,"keywordType":"Outcome","textWithKeyword":"And the grid should reflect the updated rate value","stepMatchArguments":[]}]},
]; // bdd-data-end