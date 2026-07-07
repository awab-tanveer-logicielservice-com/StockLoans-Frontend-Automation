// Generated from: UI-Automation\features\BulkImportFPLMode.feature
import { test } from "../../../step-definitions/fixtures.js";

test.describe('Bulk Import FPL Mode Workflow (SLL-232)', () => {

  test('User activates FPL Mode in Bulk Import and the FPL-specific interface is displayed', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-232', '@SLL-C1571'] }, async ({ Given, When, Then, And, bulkImportPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Bulk Import page', null, { bulkImportPage }); 
    await And('the user activates FPL Mode', null, { bulkImportPage }); 
    await Then('the FPL Mode interface should be displayed', null, { bulkImportPage }); 
  });

  test('User imports a valid FPL allocation with symbol and quantity and record appears in Grid 1 with system-driven pricing', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-232', '@SLL-C1572'] }, async ({ Given, When, Then, And, bulkImportPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Bulk Import page', null, { bulkImportPage }); 
    await When('the user activates FPL Mode', null, { bulkImportPage }); 
    await And('the user enters a valid FPL symbol', null, { bulkImportPage }); 
    await And('the user enters a valid FPL quantity', null, { bulkImportPage }); 
    await And('the user clicks the FPL import button', null, { bulkImportPage }); 
    await Then('Grid 1 should display the imported FPL allocation record', null, { bulkImportPage }); 
    await And('the system should apply pricing automatically for the FPL allocation', null, { bulkImportPage }); 
  });

  test('Authorized user can activate FPL Mode and the FPL import controls are enabled', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-232', '@SLL-C1573'] }, async ({ Given, When, Then, And, bulkImportPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Bulk Import page', null, { bulkImportPage }); 
    await And('the user activates FPL Mode', null, { bulkImportPage }); 
    await Then('the FPL Mode interface should be displayed', null, { bulkImportPage }); 
    await And('the FPL import controls should be enabled', null, { bulkImportPage }); 
  });

  test('Read-only user cannot submit FPL allocations from Grid 1', { tag: ['@smokeBDD', '@Regression', '@SLL-232', '@SLL-C1574'] }, async ({ Given, When, Then, And, bulkImportPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Bulk Import page', null, { bulkImportPage }); 
    await When('the user activates FPL Mode', null, { bulkImportPage }); 
    await And('the user attempts to click the submit button without permissions', null, { bulkImportPage }); 
    await Then('the submit action should be blocked', null, { bulkImportPage }); 
    await And('a Bulk Import access restriction message should be displayed', null, { bulkImportPage }); 
  });

  test('FPL Mode uses system-driven pricing and rate entry is not required', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-232', '@SLL-C1575'] }, async ({ Given, When, Then, And, bulkImportPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Bulk Import page', null, { bulkImportPage }); 
    await And('the user activates FPL Mode', null, { bulkImportPage }); 
    await Then('the rate field should not be required in FPL Mode', null, { bulkImportPage }); 
  });

  test('User cannot submit without selecting any FPL rows in Grid 1', { tag: ['@smokeBDD', '@Regression', '@SLL-232', '@SLL-C1576'] }, async ({ Given, When, Then, And, bulkImportPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Bulk Import page', null, { bulkImportPage }); 
    await And('the user activates FPL Mode', null, { bulkImportPage }); 
    await And('at least one FPL allocation record exists in Grid 1', null, { bulkImportPage }); 
    await When('the user clicks the submit button without selecting any rows', null, { bulkImportPage }); 
    await Then('the submit action should be blocked', null, { bulkImportPage }); 
    await And('a Bulk Import row selection warning should be displayed', null, { bulkImportPage }); 
  });

  test('User switches from FPL Mode back to standard import mode and the standard form is restored', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-232', '@SLL-C1577'] }, async ({ Given, When, Then, And, bulkImportPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Bulk Import page', null, { bulkImportPage }); 
    await And('the user activates FPL Mode', null, { bulkImportPage }); 
    await Then('the FPL Mode interface should be displayed', null, { bulkImportPage }); 
    await When('the user switches back to standard import mode', null, { bulkImportPage }); 
    await Then('the standard import interface should be displayed', null, { bulkImportPage }); 
  });

  test('After successful FPL submission Grid 1 rows are cleared and record appears in Grid 2 history', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-232', '@SLL-C1578'] }, async ({ Given, When, Then, And, bulkImportPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Bulk Import page', null, { bulkImportPage }); 
    await And('the user activates FPL Mode', null, { bulkImportPage }); 
    await And('at least one FPL allocation record exists in Grid 1', null, { bulkImportPage }); 
    await When('the user selects the first row in Grid 1', null, { bulkImportPage }); 
    await And('the user submits the selected rows', null, { bulkImportPage }); 
    await Then('Grid 1 should no longer contain the submitted record', null, { bulkImportPage }); 
    await And('the submitted record should appear in Grid 2', null, { bulkImportPage }); 
  });

  test('Import attempted in FPL Mode with Symbol missing — validation error shown', { tag: ['@smokeBDD', '@Regression', '@SLL-232', '@SLL-C1579'] }, async ({ Given, When, Then, And, bulkImportPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Bulk Import page', null, { bulkImportPage }); 
    await When('the user activates FPL Mode', null, { bulkImportPage }); 
    await And('the user enters "100" as the FPL allocation quantity', null, { bulkImportPage }); 
    await And('the user clicks the FPL import button', null, { bulkImportPage }); 
    await Then('a validation error for the FPL Symbol field should be displayed', null, { bulkImportPage }); 
  });

  test('Import attempted in FPL Mode with Quantity missing — validation error shown', { tag: ['@smokeBDD', '@Regression', '@SLL-232', '@SLL-C1580'] }, async ({ Given, When, Then, And, bulkImportPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Bulk Import page', null, { bulkImportPage }); 
    await When('the user activates FPL Mode', null, { bulkImportPage }); 
    await And('the user enters "AAPL" as the FPL symbol', null, { bulkImportPage }); 
    await And('the user clicks the FPL import button', null, { bulkImportPage }); 
    await Then('a validation error for the FPL Quantity field should be displayed', null, { bulkImportPage }); 
  });

  test('Non-numeric value entered as FPL Quantity — validation error shown', { tag: ['@smokeBDD', '@Regression', '@SLL-232', '@SLL-C1581'] }, async ({ Given, When, Then, And, bulkImportPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Bulk Import page', null, { bulkImportPage }); 
    await When('the user activates FPL Mode', null, { bulkImportPage }); 
    await And('the user enters "abc" as the FPL allocation quantity', null, { bulkImportPage }); 
    await And('the user clicks the FPL import button', null, { bulkImportPage }); 
    await Then('a validation error for the FPL Quantity field should be displayed', null, { bulkImportPage }); 
  });

  test('Zero quantity entered in FPL Mode — boundary validation error shown', { tag: ['@smokeBDD', '@Regression', '@SLL-232', '@SLL-C1582'] }, async ({ Given, When, Then, And, bulkImportPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Bulk Import page', null, { bulkImportPage }); 
    await When('the user activates FPL Mode', null, { bulkImportPage }); 
    await And('the user enters "0" as the FPL allocation quantity', null, { bulkImportPage }); 
    await And('the user clicks the FPL import button', null, { bulkImportPage }); 
    await Then('a validation error for the FPL Quantity field should be displayed', null, { bulkImportPage }); 
  });

  test('Negative quantity entered in FPL Mode — boundary validation error shown', { tag: ['@smokeBDD', '@Regression', '@SLL-232', '@SLL-C1583'] }, async ({ Given, When, Then, And, bulkImportPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Bulk Import page', null, { bulkImportPage }); 
    await When('the user activates FPL Mode', null, { bulkImportPage }); 
    await And('the user enters "-500" as the FPL allocation quantity', null, { bulkImportPage }); 
    await And('the user clicks the FPL import button', null, { bulkImportPage }); 
    await Then('a validation error for the FPL Quantity field should be displayed', null, { bulkImportPage }); 
  });

  test('Quantity above maximum allowed value in FPL Mode — boundary validation error shown', { tag: ['@smokeBDD', '@Regression', '@SLL-232', '@SLL-C1584'] }, async ({ Given, When, Then, And, bulkImportPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Bulk Import page', null, { bulkImportPage }); 
    await When('the user activates FPL Mode', null, { bulkImportPage }); 
    await And('the user enters "999999999999" as the FPL allocation quantity', null, { bulkImportPage }); 
    await And('the user clicks the FPL import button', null, { bulkImportPage }); 
    await Then('a validation error for the FPL Quantity field should be displayed', null, { bulkImportPage }); 
  });

  test('Grid 1 shows empty state overlay when FPL Mode is first activated with no allocations', { tag: ['@smokeBDD', '@Regression', '@SLL-232', '@SLL-C1585'] }, async ({ Given, When, Then, And, bulkImportPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Bulk Import page', null, { bulkImportPage }); 
    await And('the user activates FPL Mode', null, { bulkImportPage }); 
    await Then('Grid 1 should display the empty state overlay', null, { bulkImportPage }); 
  });

  test('Grid 1 displays a status column for real-time FPL allocation status tracking', { tag: ['@smokeBDD', '@Regression', '@SLL-232', '@SLL-C1586'] }, async ({ Given, When, Then, And, bulkImportPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Bulk Import page', null, { bulkImportPage }); 
    await When('the user activates FPL Mode', null, { bulkImportPage }); 
    await And('the user enters a valid FPL symbol', null, { bulkImportPage }); 
    await And('the user enters a valid FPL quantity', null, { bulkImportPage }); 
    await And('the user clicks the FPL import button', null, { bulkImportPage }); 
    await Then('Grid 1 should display the imported FPL allocation record', null, { bulkImportPage }); 
    await And('Grid 1 should show a status column for FPL allocations', null, { bulkImportPage }); 
  });

  test.describe('Multiple FPL allocation entries with various symbol and quantity combinations', () => {

    test('Example #1', { tag: ['@smokeBDD', '@Regression', '@SLL-232', '@SLL-C1587'] }, async ({ Given, When, Then, And, bulkImportPage, loginPage, page, testUsers }) => { 
      await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
      await And('the user navigates to the Bulk Import page', null, { bulkImportPage }); 
      await When('the user activates FPL Mode', null, { bulkImportPage }); 
      await And('the user enters "AAPL" as the FPL symbol', null, { bulkImportPage }); 
      await And('the user enters "1000" as the FPL allocation quantity', null, { bulkImportPage }); 
      await And('the user clicks the FPL import button', null, { bulkImportPage }); 
      await Then('the expected FPL import outcome should be "success"', null, { bulkImportPage }); 
    });

    test('Example #2', { tag: ['@smokeBDD', '@Regression', '@SLL-232', '@SLL-C1587'] }, async ({ Given, When, Then, And, bulkImportPage, loginPage, page, testUsers }) => { 
      await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
      await And('the user navigates to the Bulk Import page', null, { bulkImportPage }); 
      await When('the user activates FPL Mode', null, { bulkImportPage }); 
      await And('the user enters "MSFT" as the FPL symbol', null, { bulkImportPage }); 
      await And('the user enters "500" as the FPL allocation quantity', null, { bulkImportPage }); 
      await And('the user clicks the FPL import button', null, { bulkImportPage }); 
      await Then('the expected FPL import outcome should be "success"', null, { bulkImportPage }); 
    });

    test('Example #3', { tag: ['@smokeBDD', '@Regression', '@SLL-232', '@SLL-C1587'] }, async ({ Given, When, Then, And, bulkImportPage, loginPage, page, testUsers }) => { 
      await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
      await And('the user navigates to the Bulk Import page', null, { bulkImportPage }); 
      await When('the user activates FPL Mode', null, { bulkImportPage }); 
      await And('the user enters "TSLA" as the FPL symbol', null, { bulkImportPage }); 
      await And('the user enters "250" as the FPL allocation quantity', null, { bulkImportPage }); 
      await And('the user clicks the FPL import button', null, { bulkImportPage }); 
      await Then('the expected FPL import outcome should be "success"', null, { bulkImportPage }); 
    });

    test('Example #4', { tag: ['@smokeBDD', '@Regression', '@SLL-232', '@SLL-C1587'] }, async ({ Given, When, Then, And, bulkImportPage, loginPage, page, testUsers }) => { 
      await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
      await And('the user navigates to the Bulk Import page', null, { bulkImportPage }); 
      await When('the user activates FPL Mode', null, { bulkImportPage }); 
      await And('the user enters "" as the FPL symbol', null, { bulkImportPage }); 
      await And('the user enters "100" as the FPL allocation quantity', null, { bulkImportPage }); 
      await And('the user clicks the FPL import button', null, { bulkImportPage }); 
      await Then('the expected FPL import outcome should be "validation error"', null, { bulkImportPage }); 
    });

    test('Example #5', { tag: ['@smokeBDD', '@Regression', '@SLL-232', '@SLL-C1587'] }, async ({ Given, When, Then, And, bulkImportPage, loginPage, page, testUsers }) => { 
      await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
      await And('the user navigates to the Bulk Import page', null, { bulkImportPage }); 
      await When('the user activates FPL Mode', null, { bulkImportPage }); 
      await And('the user enters "GOOG" as the FPL symbol', null, { bulkImportPage }); 
      await And('the user enters "-50" as the FPL allocation quantity', null, { bulkImportPage }); 
      await And('the user clicks the FPL import button', null, { bulkImportPage }); 
      await Then('the expected FPL import outcome should be "validation error"', null, { bulkImportPage }); 
    });

  });

  test('Full FPL Mode lifecycle — login, activate FPL Mode, enter symbol and quantity, import, review Grid 1 status, select and submit, verify Grid 2 history', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-232', '@SLL-C1588'] }, async ({ Given, When, Then, And, bulkImportPage, contractSummaryPage, loginPage, page, testUsers }) => { 
    await Given('the user navigates to the application', null, { loginPage, page }); 
    await When('the user logs in with valid credentials', null, { loginPage, testUsers }); 
    await Then('the user should be redirected to the dashboard', null, { contractSummaryPage, page }); 
    await When('the user navigates to the Bulk Import page', null, { bulkImportPage }); 
    await And('the user activates FPL Mode', null, { bulkImportPage }); 
    await Then('the FPL Mode interface should be displayed', null, { bulkImportPage }); 
    await When('the user enters a valid FPL symbol', null, { bulkImportPage }); 
    await And('the user enters a valid FPL quantity', null, { bulkImportPage }); 
    await And('the user clicks the FPL import button', null, { bulkImportPage }); 
    await Then('Grid 1 should display the imported FPL allocation record', null, { bulkImportPage }); 
    await And('Grid 1 should show a status column for FPL allocations', null, { bulkImportPage }); 
    await And('the system should apply pricing automatically for the FPL allocation', null, { bulkImportPage }); 
    await When('the user selects the first row in Grid 1', null, { bulkImportPage }); 
    await And('the user submits the selected rows', null, { bulkImportPage }); 
    await Then('the submitted record should appear in Grid 2', null, { bulkImportPage }); 
    await And('Grid 2 should display the FPL submission history', null, { bulkImportPage }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('UI-Automation\\features\\BulkImportFPLMode.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":10,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-232","@SLL-C1571"],"steps":[{"pwStepLine":7,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"When the user navigates to the Bulk Import page","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":13,"keywordType":"Action","textWithKeyword":"And the user activates FPL Mode","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Then the FPL Mode interface should be displayed","stepMatchArguments":[]}]},
  {"pwTestLine":13,"pickleLine":18,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-232","@SLL-C1572"],"steps":[{"pwStepLine":14,"gherkinStepLine":19,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":20,"keywordType":"Context","textWithKeyword":"And the user navigates to the Bulk Import page","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":21,"keywordType":"Action","textWithKeyword":"When the user activates FPL Mode","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":22,"keywordType":"Action","textWithKeyword":"And the user enters a valid FPL symbol","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":23,"keywordType":"Action","textWithKeyword":"And the user enters a valid FPL quantity","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":24,"keywordType":"Action","textWithKeyword":"And the user clicks the FPL import button","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"Then Grid 1 should display the imported FPL allocation record","stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"And the system should apply pricing automatically for the FPL allocation","stepMatchArguments":[]}]},
  {"pwTestLine":24,"pickleLine":32,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-232","@SLL-C1573"],"steps":[{"pwStepLine":25,"gherkinStepLine":33,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":34,"keywordType":"Action","textWithKeyword":"When the user navigates to the Bulk Import page","stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":35,"keywordType":"Action","textWithKeyword":"And the user activates FPL Mode","stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":36,"keywordType":"Outcome","textWithKeyword":"Then the FPL Mode interface should be displayed","stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":37,"keywordType":"Outcome","textWithKeyword":"And the FPL import controls should be enabled","stepMatchArguments":[]}]},
  {"pwTestLine":32,"pickleLine":41,"tags":["@smokeBDD","@Regression","@SLL-232","@SLL-C1574"],"steps":[{"pwStepLine":33,"gherkinStepLine":42,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":43,"keywordType":"Context","textWithKeyword":"And the user navigates to the Bulk Import page","stepMatchArguments":[]},{"pwStepLine":35,"gherkinStepLine":44,"keywordType":"Action","textWithKeyword":"When the user activates FPL Mode","stepMatchArguments":[]},{"pwStepLine":36,"gherkinStepLine":45,"keywordType":"Action","textWithKeyword":"And the user attempts to click the submit button without permissions","stepMatchArguments":[]},{"pwStepLine":37,"gherkinStepLine":46,"keywordType":"Outcome","textWithKeyword":"Then the submit action should be blocked","stepMatchArguments":[]},{"pwStepLine":38,"gherkinStepLine":47,"keywordType":"Outcome","textWithKeyword":"And a Bulk Import access restriction message should be displayed","stepMatchArguments":[]}]},
  {"pwTestLine":41,"pickleLine":53,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-232","@SLL-C1575"],"steps":[{"pwStepLine":42,"gherkinStepLine":54,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":43,"gherkinStepLine":55,"keywordType":"Action","textWithKeyword":"When the user navigates to the Bulk Import page","stepMatchArguments":[]},{"pwStepLine":44,"gherkinStepLine":56,"keywordType":"Action","textWithKeyword":"And the user activates FPL Mode","stepMatchArguments":[]},{"pwStepLine":45,"gherkinStepLine":57,"keywordType":"Outcome","textWithKeyword":"Then the rate field should not be required in FPL Mode","stepMatchArguments":[]}]},
  {"pwTestLine":48,"pickleLine":61,"tags":["@smokeBDD","@Regression","@SLL-232","@SLL-C1576"],"steps":[{"pwStepLine":49,"gherkinStepLine":62,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":50,"gherkinStepLine":63,"keywordType":"Context","textWithKeyword":"And the user navigates to the Bulk Import page","stepMatchArguments":[]},{"pwStepLine":51,"gherkinStepLine":64,"keywordType":"Context","textWithKeyword":"And the user activates FPL Mode","stepMatchArguments":[]},{"pwStepLine":52,"gherkinStepLine":65,"keywordType":"Context","textWithKeyword":"And at least one FPL allocation record exists in Grid 1","stepMatchArguments":[]},{"pwStepLine":53,"gherkinStepLine":66,"keywordType":"Action","textWithKeyword":"When the user clicks the submit button without selecting any rows","stepMatchArguments":[]},{"pwStepLine":54,"gherkinStepLine":67,"keywordType":"Outcome","textWithKeyword":"Then the submit action should be blocked","stepMatchArguments":[]},{"pwStepLine":55,"gherkinStepLine":68,"keywordType":"Outcome","textWithKeyword":"And a Bulk Import row selection warning should be displayed","stepMatchArguments":[]}]},
  {"pwTestLine":58,"pickleLine":72,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-232","@SLL-C1577"],"steps":[{"pwStepLine":59,"gherkinStepLine":73,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":60,"gherkinStepLine":74,"keywordType":"Action","textWithKeyword":"When the user navigates to the Bulk Import page","stepMatchArguments":[]},{"pwStepLine":61,"gherkinStepLine":75,"keywordType":"Action","textWithKeyword":"And the user activates FPL Mode","stepMatchArguments":[]},{"pwStepLine":62,"gherkinStepLine":76,"keywordType":"Outcome","textWithKeyword":"Then the FPL Mode interface should be displayed","stepMatchArguments":[]},{"pwStepLine":63,"gherkinStepLine":77,"keywordType":"Action","textWithKeyword":"When the user switches back to standard import mode","stepMatchArguments":[]},{"pwStepLine":64,"gherkinStepLine":78,"keywordType":"Outcome","textWithKeyword":"Then the standard import interface should be displayed","stepMatchArguments":[]}]},
  {"pwTestLine":67,"pickleLine":82,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-232","@SLL-C1578"],"steps":[{"pwStepLine":68,"gherkinStepLine":83,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":69,"gherkinStepLine":84,"keywordType":"Context","textWithKeyword":"And the user navigates to the Bulk Import page","stepMatchArguments":[]},{"pwStepLine":70,"gherkinStepLine":85,"keywordType":"Context","textWithKeyword":"And the user activates FPL Mode","stepMatchArguments":[]},{"pwStepLine":71,"gherkinStepLine":86,"keywordType":"Context","textWithKeyword":"And at least one FPL allocation record exists in Grid 1","stepMatchArguments":[]},{"pwStepLine":72,"gherkinStepLine":87,"keywordType":"Action","textWithKeyword":"When the user selects the first row in Grid 1","stepMatchArguments":[]},{"pwStepLine":73,"gherkinStepLine":88,"keywordType":"Action","textWithKeyword":"And the user submits the selected rows","stepMatchArguments":[]},{"pwStepLine":74,"gherkinStepLine":89,"keywordType":"Outcome","textWithKeyword":"Then Grid 1 should no longer contain the submitted record","stepMatchArguments":[]},{"pwStepLine":75,"gherkinStepLine":90,"keywordType":"Outcome","textWithKeyword":"And the submitted record should appear in Grid 2","stepMatchArguments":[]}]},
  {"pwTestLine":78,"pickleLine":96,"tags":["@smokeBDD","@Regression","@SLL-232","@SLL-C1579"],"steps":[{"pwStepLine":79,"gherkinStepLine":97,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":80,"gherkinStepLine":98,"keywordType":"Context","textWithKeyword":"And the user navigates to the Bulk Import page","stepMatchArguments":[]},{"pwStepLine":81,"gherkinStepLine":99,"keywordType":"Action","textWithKeyword":"When the user activates FPL Mode","stepMatchArguments":[]},{"pwStepLine":82,"gherkinStepLine":100,"keywordType":"Action","textWithKeyword":"And the user enters \"100\" as the FPL allocation quantity","stepMatchArguments":[{"group":{"start":16,"value":"\"100\"","children":[{"start":17,"value":"100","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":83,"gherkinStepLine":101,"keywordType":"Action","textWithKeyword":"And the user clicks the FPL import button","stepMatchArguments":[]},{"pwStepLine":84,"gherkinStepLine":102,"keywordType":"Outcome","textWithKeyword":"Then a validation error for the FPL Symbol field should be displayed","stepMatchArguments":[]}]},
  {"pwTestLine":87,"pickleLine":106,"tags":["@smokeBDD","@Regression","@SLL-232","@SLL-C1580"],"steps":[{"pwStepLine":88,"gherkinStepLine":107,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":89,"gherkinStepLine":108,"keywordType":"Context","textWithKeyword":"And the user navigates to the Bulk Import page","stepMatchArguments":[]},{"pwStepLine":90,"gherkinStepLine":109,"keywordType":"Action","textWithKeyword":"When the user activates FPL Mode","stepMatchArguments":[]},{"pwStepLine":91,"gherkinStepLine":110,"keywordType":"Action","textWithKeyword":"And the user enters \"AAPL\" as the FPL symbol","stepMatchArguments":[{"group":{"start":16,"value":"\"AAPL\"","children":[{"start":17,"value":"AAPL","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":92,"gherkinStepLine":111,"keywordType":"Action","textWithKeyword":"And the user clicks the FPL import button","stepMatchArguments":[]},{"pwStepLine":93,"gherkinStepLine":112,"keywordType":"Outcome","textWithKeyword":"Then a validation error for the FPL Quantity field should be displayed","stepMatchArguments":[]}]},
  {"pwTestLine":96,"pickleLine":116,"tags":["@smokeBDD","@Regression","@SLL-232","@SLL-C1581"],"steps":[{"pwStepLine":97,"gherkinStepLine":117,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":98,"gherkinStepLine":118,"keywordType":"Context","textWithKeyword":"And the user navigates to the Bulk Import page","stepMatchArguments":[]},{"pwStepLine":99,"gherkinStepLine":119,"keywordType":"Action","textWithKeyword":"When the user activates FPL Mode","stepMatchArguments":[]},{"pwStepLine":100,"gherkinStepLine":120,"keywordType":"Action","textWithKeyword":"And the user enters \"abc\" as the FPL allocation quantity","stepMatchArguments":[{"group":{"start":16,"value":"\"abc\"","children":[{"start":17,"value":"abc","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":101,"gherkinStepLine":121,"keywordType":"Action","textWithKeyword":"And the user clicks the FPL import button","stepMatchArguments":[]},{"pwStepLine":102,"gherkinStepLine":122,"keywordType":"Outcome","textWithKeyword":"Then a validation error for the FPL Quantity field should be displayed","stepMatchArguments":[]}]},
  {"pwTestLine":105,"pickleLine":126,"tags":["@smokeBDD","@Regression","@SLL-232","@SLL-C1582"],"steps":[{"pwStepLine":106,"gherkinStepLine":127,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":107,"gherkinStepLine":128,"keywordType":"Context","textWithKeyword":"And the user navigates to the Bulk Import page","stepMatchArguments":[]},{"pwStepLine":108,"gherkinStepLine":129,"keywordType":"Action","textWithKeyword":"When the user activates FPL Mode","stepMatchArguments":[]},{"pwStepLine":109,"gherkinStepLine":130,"keywordType":"Action","textWithKeyword":"And the user enters \"0\" as the FPL allocation quantity","stepMatchArguments":[{"group":{"start":16,"value":"\"0\"","children":[{"start":17,"value":"0","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":110,"gherkinStepLine":131,"keywordType":"Action","textWithKeyword":"And the user clicks the FPL import button","stepMatchArguments":[]},{"pwStepLine":111,"gherkinStepLine":132,"keywordType":"Outcome","textWithKeyword":"Then a validation error for the FPL Quantity field should be displayed","stepMatchArguments":[]}]},
  {"pwTestLine":114,"pickleLine":136,"tags":["@smokeBDD","@Regression","@SLL-232","@SLL-C1583"],"steps":[{"pwStepLine":115,"gherkinStepLine":137,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":116,"gherkinStepLine":138,"keywordType":"Context","textWithKeyword":"And the user navigates to the Bulk Import page","stepMatchArguments":[]},{"pwStepLine":117,"gherkinStepLine":139,"keywordType":"Action","textWithKeyword":"When the user activates FPL Mode","stepMatchArguments":[]},{"pwStepLine":118,"gherkinStepLine":140,"keywordType":"Action","textWithKeyword":"And the user enters \"-500\" as the FPL allocation quantity","stepMatchArguments":[{"group":{"start":16,"value":"\"-500\"","children":[{"start":17,"value":"-500","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":119,"gherkinStepLine":141,"keywordType":"Action","textWithKeyword":"And the user clicks the FPL import button","stepMatchArguments":[]},{"pwStepLine":120,"gherkinStepLine":142,"keywordType":"Outcome","textWithKeyword":"Then a validation error for the FPL Quantity field should be displayed","stepMatchArguments":[]}]},
  {"pwTestLine":123,"pickleLine":146,"tags":["@smokeBDD","@Regression","@SLL-232","@SLL-C1584"],"steps":[{"pwStepLine":124,"gherkinStepLine":147,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":125,"gherkinStepLine":148,"keywordType":"Context","textWithKeyword":"And the user navigates to the Bulk Import page","stepMatchArguments":[]},{"pwStepLine":126,"gherkinStepLine":149,"keywordType":"Action","textWithKeyword":"When the user activates FPL Mode","stepMatchArguments":[]},{"pwStepLine":127,"gherkinStepLine":150,"keywordType":"Action","textWithKeyword":"And the user enters \"999999999999\" as the FPL allocation quantity","stepMatchArguments":[{"group":{"start":16,"value":"\"999999999999\"","children":[{"start":17,"value":"999999999999","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":128,"gherkinStepLine":151,"keywordType":"Action","textWithKeyword":"And the user clicks the FPL import button","stepMatchArguments":[]},{"pwStepLine":129,"gherkinStepLine":152,"keywordType":"Outcome","textWithKeyword":"Then a validation error for the FPL Quantity field should be displayed","stepMatchArguments":[]}]},
  {"pwTestLine":132,"pickleLine":158,"tags":["@smokeBDD","@Regression","@SLL-232","@SLL-C1585"],"steps":[{"pwStepLine":133,"gherkinStepLine":159,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":134,"gherkinStepLine":160,"keywordType":"Action","textWithKeyword":"When the user navigates to the Bulk Import page","stepMatchArguments":[]},{"pwStepLine":135,"gherkinStepLine":161,"keywordType":"Action","textWithKeyword":"And the user activates FPL Mode","stepMatchArguments":[]},{"pwStepLine":136,"gherkinStepLine":162,"keywordType":"Outcome","textWithKeyword":"Then Grid 1 should display the empty state overlay","stepMatchArguments":[]}]},
  {"pwTestLine":139,"pickleLine":166,"tags":["@smokeBDD","@Regression","@SLL-232","@SLL-C1586"],"steps":[{"pwStepLine":140,"gherkinStepLine":167,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":141,"gherkinStepLine":168,"keywordType":"Context","textWithKeyword":"And the user navigates to the Bulk Import page","stepMatchArguments":[]},{"pwStepLine":142,"gherkinStepLine":169,"keywordType":"Action","textWithKeyword":"When the user activates FPL Mode","stepMatchArguments":[]},{"pwStepLine":143,"gherkinStepLine":170,"keywordType":"Action","textWithKeyword":"And the user enters a valid FPL symbol","stepMatchArguments":[]},{"pwStepLine":144,"gherkinStepLine":171,"keywordType":"Action","textWithKeyword":"And the user enters a valid FPL quantity","stepMatchArguments":[]},{"pwStepLine":145,"gherkinStepLine":172,"keywordType":"Action","textWithKeyword":"And the user clicks the FPL import button","stepMatchArguments":[]},{"pwStepLine":146,"gherkinStepLine":173,"keywordType":"Outcome","textWithKeyword":"Then Grid 1 should display the imported FPL allocation record","stepMatchArguments":[]},{"pwStepLine":147,"gherkinStepLine":174,"keywordType":"Outcome","textWithKeyword":"And Grid 1 should show a status column for FPL allocations","stepMatchArguments":[]}]},
  {"pwTestLine":152,"pickleLine":191,"tags":["@smokeBDD","@Regression","@SLL-232","@SLL-C1587"],"steps":[{"pwStepLine":153,"gherkinStepLine":181,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":154,"gherkinStepLine":182,"keywordType":"Context","textWithKeyword":"And the user navigates to the Bulk Import page","stepMatchArguments":[]},{"pwStepLine":155,"gherkinStepLine":183,"keywordType":"Action","textWithKeyword":"When the user activates FPL Mode","stepMatchArguments":[]},{"pwStepLine":156,"gherkinStepLine":184,"keywordType":"Action","textWithKeyword":"And the user enters \"AAPL\" as the FPL symbol","stepMatchArguments":[{"group":{"start":16,"value":"\"AAPL\"","children":[{"start":17,"value":"AAPL","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":157,"gherkinStepLine":185,"keywordType":"Action","textWithKeyword":"And the user enters \"1000\" as the FPL allocation quantity","stepMatchArguments":[{"group":{"start":16,"value":"\"1000\"","children":[{"start":17,"value":"1000","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":158,"gherkinStepLine":186,"keywordType":"Action","textWithKeyword":"And the user clicks the FPL import button","stepMatchArguments":[]},{"pwStepLine":159,"gherkinStepLine":187,"keywordType":"Outcome","textWithKeyword":"Then the expected FPL import outcome should be \"success\"","stepMatchArguments":[{"group":{"start":42,"value":"\"success\"","children":[{"start":43,"value":"success","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":162,"pickleLine":192,"tags":["@smokeBDD","@Regression","@SLL-232","@SLL-C1587"],"steps":[{"pwStepLine":163,"gherkinStepLine":181,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":164,"gherkinStepLine":182,"keywordType":"Context","textWithKeyword":"And the user navigates to the Bulk Import page","stepMatchArguments":[]},{"pwStepLine":165,"gherkinStepLine":183,"keywordType":"Action","textWithKeyword":"When the user activates FPL Mode","stepMatchArguments":[]},{"pwStepLine":166,"gherkinStepLine":184,"keywordType":"Action","textWithKeyword":"And the user enters \"MSFT\" as the FPL symbol","stepMatchArguments":[{"group":{"start":16,"value":"\"MSFT\"","children":[{"start":17,"value":"MSFT","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":167,"gherkinStepLine":185,"keywordType":"Action","textWithKeyword":"And the user enters \"500\" as the FPL allocation quantity","stepMatchArguments":[{"group":{"start":16,"value":"\"500\"","children":[{"start":17,"value":"500","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":168,"gherkinStepLine":186,"keywordType":"Action","textWithKeyword":"And the user clicks the FPL import button","stepMatchArguments":[]},{"pwStepLine":169,"gherkinStepLine":187,"keywordType":"Outcome","textWithKeyword":"Then the expected FPL import outcome should be \"success\"","stepMatchArguments":[{"group":{"start":42,"value":"\"success\"","children":[{"start":43,"value":"success","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":172,"pickleLine":193,"tags":["@smokeBDD","@Regression","@SLL-232","@SLL-C1587"],"steps":[{"pwStepLine":173,"gherkinStepLine":181,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":174,"gherkinStepLine":182,"keywordType":"Context","textWithKeyword":"And the user navigates to the Bulk Import page","stepMatchArguments":[]},{"pwStepLine":175,"gherkinStepLine":183,"keywordType":"Action","textWithKeyword":"When the user activates FPL Mode","stepMatchArguments":[]},{"pwStepLine":176,"gherkinStepLine":184,"keywordType":"Action","textWithKeyword":"And the user enters \"TSLA\" as the FPL symbol","stepMatchArguments":[{"group":{"start":16,"value":"\"TSLA\"","children":[{"start":17,"value":"TSLA","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":177,"gherkinStepLine":185,"keywordType":"Action","textWithKeyword":"And the user enters \"250\" as the FPL allocation quantity","stepMatchArguments":[{"group":{"start":16,"value":"\"250\"","children":[{"start":17,"value":"250","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":178,"gherkinStepLine":186,"keywordType":"Action","textWithKeyword":"And the user clicks the FPL import button","stepMatchArguments":[]},{"pwStepLine":179,"gherkinStepLine":187,"keywordType":"Outcome","textWithKeyword":"Then the expected FPL import outcome should be \"success\"","stepMatchArguments":[{"group":{"start":42,"value":"\"success\"","children":[{"start":43,"value":"success","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":182,"pickleLine":194,"tags":["@smokeBDD","@Regression","@SLL-232","@SLL-C1587"],"steps":[{"pwStepLine":183,"gherkinStepLine":181,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":184,"gherkinStepLine":182,"keywordType":"Context","textWithKeyword":"And the user navigates to the Bulk Import page","stepMatchArguments":[]},{"pwStepLine":185,"gherkinStepLine":183,"keywordType":"Action","textWithKeyword":"When the user activates FPL Mode","stepMatchArguments":[]},{"pwStepLine":186,"gherkinStepLine":184,"keywordType":"Action","textWithKeyword":"And the user enters \"\" as the FPL symbol","stepMatchArguments":[{"group":{"start":16,"value":"\"\"","children":[{"start":17,"value":"","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":187,"gherkinStepLine":185,"keywordType":"Action","textWithKeyword":"And the user enters \"100\" as the FPL allocation quantity","stepMatchArguments":[{"group":{"start":16,"value":"\"100\"","children":[{"start":17,"value":"100","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":188,"gherkinStepLine":186,"keywordType":"Action","textWithKeyword":"And the user clicks the FPL import button","stepMatchArguments":[]},{"pwStepLine":189,"gherkinStepLine":187,"keywordType":"Outcome","textWithKeyword":"Then the expected FPL import outcome should be \"validation error\"","stepMatchArguments":[{"group":{"start":42,"value":"\"validation error\"","children":[{"start":43,"value":"validation error","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":192,"pickleLine":195,"tags":["@smokeBDD","@Regression","@SLL-232","@SLL-C1587"],"steps":[{"pwStepLine":193,"gherkinStepLine":181,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":194,"gherkinStepLine":182,"keywordType":"Context","textWithKeyword":"And the user navigates to the Bulk Import page","stepMatchArguments":[]},{"pwStepLine":195,"gherkinStepLine":183,"keywordType":"Action","textWithKeyword":"When the user activates FPL Mode","stepMatchArguments":[]},{"pwStepLine":196,"gherkinStepLine":184,"keywordType":"Action","textWithKeyword":"And the user enters \"GOOG\" as the FPL symbol","stepMatchArguments":[{"group":{"start":16,"value":"\"GOOG\"","children":[{"start":17,"value":"GOOG","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":197,"gherkinStepLine":185,"keywordType":"Action","textWithKeyword":"And the user enters \"-50\" as the FPL allocation quantity","stepMatchArguments":[{"group":{"start":16,"value":"\"-50\"","children":[{"start":17,"value":"-50","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":198,"gherkinStepLine":186,"keywordType":"Action","textWithKeyword":"And the user clicks the FPL import button","stepMatchArguments":[]},{"pwStepLine":199,"gherkinStepLine":187,"keywordType":"Outcome","textWithKeyword":"Then the expected FPL import outcome should be \"validation error\"","stepMatchArguments":[{"group":{"start":42,"value":"\"validation error\"","children":[{"start":43,"value":"validation error","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":204,"pickleLine":201,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-232","@SLL-C1588"],"steps":[{"pwStepLine":205,"gherkinStepLine":202,"keywordType":"Context","textWithKeyword":"Given the user navigates to the application","stepMatchArguments":[]},{"pwStepLine":206,"gherkinStepLine":203,"keywordType":"Action","textWithKeyword":"When the user logs in with valid credentials","stepMatchArguments":[]},{"pwStepLine":207,"gherkinStepLine":204,"keywordType":"Outcome","textWithKeyword":"Then the user should be redirected to the dashboard","stepMatchArguments":[]},{"pwStepLine":208,"gherkinStepLine":205,"keywordType":"Action","textWithKeyword":"When the user navigates to the Bulk Import page","stepMatchArguments":[]},{"pwStepLine":209,"gherkinStepLine":206,"keywordType":"Action","textWithKeyword":"And the user activates FPL Mode","stepMatchArguments":[]},{"pwStepLine":210,"gherkinStepLine":207,"keywordType":"Outcome","textWithKeyword":"Then the FPL Mode interface should be displayed","stepMatchArguments":[]},{"pwStepLine":211,"gherkinStepLine":208,"keywordType":"Action","textWithKeyword":"When the user enters a valid FPL symbol","stepMatchArguments":[]},{"pwStepLine":212,"gherkinStepLine":209,"keywordType":"Action","textWithKeyword":"And the user enters a valid FPL quantity","stepMatchArguments":[]},{"pwStepLine":213,"gherkinStepLine":210,"keywordType":"Action","textWithKeyword":"And the user clicks the FPL import button","stepMatchArguments":[]},{"pwStepLine":214,"gherkinStepLine":211,"keywordType":"Outcome","textWithKeyword":"Then Grid 1 should display the imported FPL allocation record","stepMatchArguments":[]},{"pwStepLine":215,"gherkinStepLine":212,"keywordType":"Outcome","textWithKeyword":"And Grid 1 should show a status column for FPL allocations","stepMatchArguments":[]},{"pwStepLine":216,"gherkinStepLine":213,"keywordType":"Outcome","textWithKeyword":"And the system should apply pricing automatically for the FPL allocation","stepMatchArguments":[]},{"pwStepLine":217,"gherkinStepLine":214,"keywordType":"Action","textWithKeyword":"When the user selects the first row in Grid 1","stepMatchArguments":[]},{"pwStepLine":218,"gherkinStepLine":215,"keywordType":"Action","textWithKeyword":"And the user submits the selected rows","stepMatchArguments":[]},{"pwStepLine":219,"gherkinStepLine":216,"keywordType":"Outcome","textWithKeyword":"Then the submitted record should appear in Grid 2","stepMatchArguments":[]},{"pwStepLine":220,"gherkinStepLine":217,"keywordType":"Outcome","textWithKeyword":"And Grid 2 should display the FPL submission history","stepMatchArguments":[]}]},
]; // bdd-data-end