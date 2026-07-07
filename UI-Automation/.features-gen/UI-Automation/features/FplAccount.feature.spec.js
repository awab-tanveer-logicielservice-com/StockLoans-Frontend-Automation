// Generated from: UI-Automation\features\FplAccount.feature
import { test } from "../../../step-definitions/fixtures.js";

test.describe('FPL Accounts - SLS Account Editable Dropdown Column (SLL-234)', () => {

  test('User selects an SLS account from the editable dropdown and the record updates', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-234', '@SLL-C1564'] }, async ({ Given, When, Then, And, fplAccountPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to FPL Accounts', null, { fplAccountPage }); 
    await And('the user closes the sidebar', null, { fplAccountPage }); 
    await Then('the account row should be visible', null, { fplAccountPage }); 
    await When('the user clicks the SLS Account cell for a row', null, { fplAccountPage }); 
    await Then('the SLS Account dropdown should be visible with available options', null, { fplAccountPage }); 
    await When('the user selects the SLS account option "SOFI"', null, { fplAccountPage }); 
    await Then('the record should reflect the selected SLS account', null, { fplAccountPage }); 
  });

  test('SLS Account column is present in the FPL Accounts table', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-234', '@SLL-C1565'] }, async ({ Given, When, Then, And, fplAccountPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to FPL Accounts', null, { fplAccountPage }); 
    await And('the user closes the sidebar', null, { fplAccountPage }); 
    await Then('the account row should be visible', null, { fplAccountPage }); 
    await And('the SLS Account column should be visible in the table', null, { fplAccountPage }); 
  });

  test('SLS Account dropdown is populated with available SLS accounts', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-234', '@SLL-C1566'] }, async ({ Given, When, Then, And, fplAccountPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to FPL Accounts', null, { fplAccountPage }); 
    await And('the user closes the sidebar', null, { fplAccountPage }); 
    await Then('the account row should be visible', null, { fplAccountPage }); 
    await When('the user clicks the SLS Account cell for a row', null, { fplAccountPage }); 
    await Then('the SLS Account dropdown should contain at least one account option', null, { fplAccountPage }); 
  });

  test('User dismisses the SLS Account dropdown without making a selection', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-234', '@SLL-C1567'] }, async ({ Given, When, Then, And, fplAccountPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to FPL Accounts', null, { fplAccountPage }); 
    await And('the user closes the sidebar', null, { fplAccountPage }); 
    await Then('the account row should be visible', null, { fplAccountPage }); 
    await When('the user clicks the SLS Account cell for a row', null, { fplAccountPage }); 
    await Then('the SLS Account dropdown should be visible with available options', null, { fplAccountPage }); 
    await When('the user dismisses the SLS Account dropdown', null, { fplAccountPage }); 
    await Then('the account row should be visible', null, { fplAccountPage }); 
  });

  test.describe('User selects different SLS accounts from the editable dropdown', () => {

    test('Example #1', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-234', '@SLL-C1568'] }, async ({ Given, When, Then, And, fplAccountPage, loginPage, page, testUsers }) => { 
      await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
      await When('the user navigates to FPL Accounts', null, { fplAccountPage }); 
      await And('the user closes the sidebar', null, { fplAccountPage }); 
      await Then('the account row should be visible', null, { fplAccountPage }); 
      await When('the user clicks the SLS Account cell for a row', null, { fplAccountPage }); 
      await Then('the SLS Account dropdown should be visible with available options', null, { fplAccountPage }); 
      await When('the user selects the SLS account option "SOFI"', null, { fplAccountPage }); 
      await Then('the record should reflect the selected SLS account', null, { fplAccountPage }); 
    });

    test('Example #2', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-234', '@SLL-C1568'] }, async ({ Given, When, Then, And, fplAccountPage, loginPage, page, testUsers }) => { 
      await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
      await When('the user navigates to FPL Accounts', null, { fplAccountPage }); 
      await And('the user closes the sidebar', null, { fplAccountPage }); 
      await Then('the account row should be visible', null, { fplAccountPage }); 
      await When('the user clicks the SLS Account cell for a row', null, { fplAccountPage }); 
      await Then('the SLS Account dropdown should be visible with available options', null, { fplAccountPage }); 
      await When('the user selects the SLS account option "FPL Test"', null, { fplAccountPage }); 
      await Then('the record should reflect the selected SLS account', null, { fplAccountPage }); 
    });

    test('Example #3', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-234', '@SLL-C1568'] }, async ({ Given, When, Then, And, fplAccountPage, loginPage, page, testUsers }) => { 
      await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
      await When('the user navigates to FPL Accounts', null, { fplAccountPage }); 
      await And('the user closes the sidebar', null, { fplAccountPage }); 
      await Then('the account row should be visible', null, { fplAccountPage }); 
      await When('the user clicks the SLS Account cell for a row', null, { fplAccountPage }); 
      await Then('the SLS Account dropdown should be visible with available options', null, { fplAccountPage }); 
      await When('the user selects the SLS account option "GTN"', null, { fplAccountPage }); 
      await Then('the record should reflect the selected SLS account', null, { fplAccountPage }); 
    });

  });

  test('Full lifecycle - navigate to FPL Accounts, edit SLS Account dropdown and verify record update', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-234', '@SLL-C1569'] }, async ({ Given, When, Then, And, fplAccountPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to FPL Accounts', null, { fplAccountPage }); 
    await And('the user closes the sidebar', null, { fplAccountPage }); 
    await Then('the account row should be visible', null, { fplAccountPage }); 
    await And('the SLS Account column should be visible in the table', null, { fplAccountPage }); 
    await When('the user clicks the SLS Account cell for a row', null, { fplAccountPage }); 
    await Then('the SLS Account dropdown should be visible with available options', null, { fplAccountPage }); 
    await And('the SLS Account dropdown should contain at least one account option', null, { fplAccountPage }); 
    await When('the user selects the SLS account option "SOFI"', null, { fplAccountPage }); 
    await Then('the record should reflect the selected SLS account', null, { fplAccountPage }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('UI-Automation\\features\\FplAccount.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":10,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-234","@SLL-C1564"],"steps":[{"pwStepLine":7,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"When the user navigates to FPL Accounts","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":13,"keywordType":"Action","textWithKeyword":"And the user closes the sidebar","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Then the account row should be visible","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":15,"keywordType":"Action","textWithKeyword":"When the user clicks the SLS Account cell for a row","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"Then the SLS Account dropdown should be visible with available options","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":17,"keywordType":"Action","textWithKeyword":"When the user selects the SLS account option \"SOFI\"","stepMatchArguments":[{"group":{"start":40,"value":"\"SOFI\"","children":[{"start":41,"value":"SOFI","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":14,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"Then the record should reflect the selected SLS account","stepMatchArguments":[]}]},
  {"pwTestLine":17,"pickleLine":24,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-234","@SLL-C1565"],"steps":[{"pwStepLine":18,"gherkinStepLine":25,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":26,"keywordType":"Action","textWithKeyword":"When the user navigates to FPL Accounts","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":27,"keywordType":"Action","textWithKeyword":"And the user closes the sidebar","stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":28,"keywordType":"Outcome","textWithKeyword":"Then the account row should be visible","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"And the SLS Account column should be visible in the table","stepMatchArguments":[]}]},
  {"pwTestLine":25,"pickleLine":35,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-234","@SLL-C1566"],"steps":[{"pwStepLine":26,"gherkinStepLine":36,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":37,"keywordType":"Action","textWithKeyword":"When the user navigates to FPL Accounts","stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":38,"keywordType":"Action","textWithKeyword":"And the user closes the sidebar","stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":39,"keywordType":"Outcome","textWithKeyword":"Then the account row should be visible","stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":40,"keywordType":"Action","textWithKeyword":"When the user clicks the SLS Account cell for a row","stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":41,"keywordType":"Outcome","textWithKeyword":"Then the SLS Account dropdown should contain at least one account option","stepMatchArguments":[]}]},
  {"pwTestLine":34,"pickleLine":47,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-234","@SLL-C1567"],"steps":[{"pwStepLine":35,"gherkinStepLine":48,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":36,"gherkinStepLine":49,"keywordType":"Action","textWithKeyword":"When the user navigates to FPL Accounts","stepMatchArguments":[]},{"pwStepLine":37,"gherkinStepLine":50,"keywordType":"Action","textWithKeyword":"And the user closes the sidebar","stepMatchArguments":[]},{"pwStepLine":38,"gherkinStepLine":51,"keywordType":"Outcome","textWithKeyword":"Then the account row should be visible","stepMatchArguments":[]},{"pwStepLine":39,"gherkinStepLine":52,"keywordType":"Action","textWithKeyword":"When the user clicks the SLS Account cell for a row","stepMatchArguments":[]},{"pwStepLine":40,"gherkinStepLine":53,"keywordType":"Outcome","textWithKeyword":"Then the SLS Account dropdown should be visible with available options","stepMatchArguments":[]},{"pwStepLine":41,"gherkinStepLine":54,"keywordType":"Action","textWithKeyword":"When the user dismisses the SLS Account dropdown","stepMatchArguments":[]},{"pwStepLine":42,"gherkinStepLine":55,"keywordType":"Outcome","textWithKeyword":"Then the account row should be visible","stepMatchArguments":[]}]},
  {"pwTestLine":47,"pickleLine":73,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-234","@SLL-C1568"],"steps":[{"pwStepLine":48,"gherkinStepLine":62,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":49,"gherkinStepLine":63,"keywordType":"Action","textWithKeyword":"When the user navigates to FPL Accounts","stepMatchArguments":[]},{"pwStepLine":50,"gherkinStepLine":64,"keywordType":"Action","textWithKeyword":"And the user closes the sidebar","stepMatchArguments":[]},{"pwStepLine":51,"gherkinStepLine":65,"keywordType":"Outcome","textWithKeyword":"Then the account row should be visible","stepMatchArguments":[]},{"pwStepLine":52,"gherkinStepLine":66,"keywordType":"Action","textWithKeyword":"When the user clicks the SLS Account cell for a row","stepMatchArguments":[]},{"pwStepLine":53,"gherkinStepLine":67,"keywordType":"Outcome","textWithKeyword":"Then the SLS Account dropdown should be visible with available options","stepMatchArguments":[]},{"pwStepLine":54,"gherkinStepLine":68,"keywordType":"Action","textWithKeyword":"When the user selects the SLS account option \"SOFI\"","stepMatchArguments":[{"group":{"start":40,"value":"\"SOFI\"","children":[{"start":41,"value":"SOFI","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":55,"gherkinStepLine":69,"keywordType":"Outcome","textWithKeyword":"Then the record should reflect the selected SLS account","stepMatchArguments":[]}]},
  {"pwTestLine":58,"pickleLine":74,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-234","@SLL-C1568"],"steps":[{"pwStepLine":59,"gherkinStepLine":62,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":60,"gherkinStepLine":63,"keywordType":"Action","textWithKeyword":"When the user navigates to FPL Accounts","stepMatchArguments":[]},{"pwStepLine":61,"gherkinStepLine":64,"keywordType":"Action","textWithKeyword":"And the user closes the sidebar","stepMatchArguments":[]},{"pwStepLine":62,"gherkinStepLine":65,"keywordType":"Outcome","textWithKeyword":"Then the account row should be visible","stepMatchArguments":[]},{"pwStepLine":63,"gherkinStepLine":66,"keywordType":"Action","textWithKeyword":"When the user clicks the SLS Account cell for a row","stepMatchArguments":[]},{"pwStepLine":64,"gherkinStepLine":67,"keywordType":"Outcome","textWithKeyword":"Then the SLS Account dropdown should be visible with available options","stepMatchArguments":[]},{"pwStepLine":65,"gherkinStepLine":68,"keywordType":"Action","textWithKeyword":"When the user selects the SLS account option \"FPL Test\"","stepMatchArguments":[{"group":{"start":40,"value":"\"FPL Test\"","children":[{"start":41,"value":"FPL Test","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":66,"gherkinStepLine":69,"keywordType":"Outcome","textWithKeyword":"Then the record should reflect the selected SLS account","stepMatchArguments":[]}]},
  {"pwTestLine":69,"pickleLine":75,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-234","@SLL-C1568"],"steps":[{"pwStepLine":70,"gherkinStepLine":62,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":71,"gherkinStepLine":63,"keywordType":"Action","textWithKeyword":"When the user navigates to FPL Accounts","stepMatchArguments":[]},{"pwStepLine":72,"gherkinStepLine":64,"keywordType":"Action","textWithKeyword":"And the user closes the sidebar","stepMatchArguments":[]},{"pwStepLine":73,"gherkinStepLine":65,"keywordType":"Outcome","textWithKeyword":"Then the account row should be visible","stepMatchArguments":[]},{"pwStepLine":74,"gherkinStepLine":66,"keywordType":"Action","textWithKeyword":"When the user clicks the SLS Account cell for a row","stepMatchArguments":[]},{"pwStepLine":75,"gherkinStepLine":67,"keywordType":"Outcome","textWithKeyword":"Then the SLS Account dropdown should be visible with available options","stepMatchArguments":[]},{"pwStepLine":76,"gherkinStepLine":68,"keywordType":"Action","textWithKeyword":"When the user selects the SLS account option \"GTN\"","stepMatchArguments":[{"group":{"start":40,"value":"\"GTN\"","children":[{"start":41,"value":"GTN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":77,"gherkinStepLine":69,"keywordType":"Outcome","textWithKeyword":"Then the record should reflect the selected SLS account","stepMatchArguments":[]}]},
  {"pwTestLine":82,"pickleLine":81,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-234","@SLL-C1569"],"steps":[{"pwStepLine":83,"gherkinStepLine":82,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":84,"gherkinStepLine":83,"keywordType":"Action","textWithKeyword":"When the user navigates to FPL Accounts","stepMatchArguments":[]},{"pwStepLine":85,"gherkinStepLine":84,"keywordType":"Action","textWithKeyword":"And the user closes the sidebar","stepMatchArguments":[]},{"pwStepLine":86,"gherkinStepLine":85,"keywordType":"Outcome","textWithKeyword":"Then the account row should be visible","stepMatchArguments":[]},{"pwStepLine":87,"gherkinStepLine":86,"keywordType":"Outcome","textWithKeyword":"And the SLS Account column should be visible in the table","stepMatchArguments":[]},{"pwStepLine":88,"gherkinStepLine":87,"keywordType":"Action","textWithKeyword":"When the user clicks the SLS Account cell for a row","stepMatchArguments":[]},{"pwStepLine":89,"gherkinStepLine":88,"keywordType":"Outcome","textWithKeyword":"Then the SLS Account dropdown should be visible with available options","stepMatchArguments":[]},{"pwStepLine":90,"gherkinStepLine":89,"keywordType":"Outcome","textWithKeyword":"And the SLS Account dropdown should contain at least one account option","stepMatchArguments":[]},{"pwStepLine":91,"gherkinStepLine":90,"keywordType":"Action","textWithKeyword":"When the user selects the SLS account option \"SOFI\"","stepMatchArguments":[{"group":{"start":40,"value":"\"SOFI\"","children":[{"start":41,"value":"SOFI","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":92,"gherkinStepLine":91,"keywordType":"Outcome","textWithKeyword":"Then the record should reflect the selected SLS account","stepMatchArguments":[]}]},
]; // bdd-data-end