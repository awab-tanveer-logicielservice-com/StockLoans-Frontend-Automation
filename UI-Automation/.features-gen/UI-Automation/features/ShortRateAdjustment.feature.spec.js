// Generated from: UI-Automation\features\ShortRateAdjustment.feature
import { test } from "../../../step-definitions/fixtures.js";

test.describe('Short Rate Adjustment (SRA)', () => {

  test('User navigates to Short Rate Adjustment page and views the grid', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SRA'] }, async ({ Given, When, Then, And, loginPage, page, shortRateAdjustmentPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Short Rate Adjustment page', null, { shortRateAdjustmentPage }); 
    await Then('the Short Rate Adjustment grid should be visible', null, { shortRateAdjustmentPage }); 
    await And('the grid should display short rate data rows', null, { shortRateAdjustmentPage }); 
  });

  test('Short Rate Adjustment grid displays the correct column headers', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SRA'] }, async ({ Given, When, Then, loginPage, page, shortRateAdjustmentPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Short Rate Adjustment page', null, { shortRateAdjustmentPage }); 
    await Then('the grid should display Symbol, Cusip, Rate and Source columns', null, { shortRateAdjustmentPage }); 
  });

  test('User selects the first row in the Short Rate Adjustment grid', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SRA'] }, async ({ Given, When, Then, And, loginPage, page, shortRateAdjustmentPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Short Rate Adjustment page', null, { shortRateAdjustmentPage }); 
    await When('the user selects the first row in the short rate grid', null, { shortRateAdjustmentPage }); 
    await Then('the short rate row should be selected', null, { shortRateAdjustmentPage }); 
  });

  test('Authorized user successfully updates a short rate and saves', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SRA'] }, async ({ Given, When, Then, And, loginPage, page, shortRateAdjustmentPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Short Rate Adjustment page', null, { shortRateAdjustmentPage }); 
    await When('the user selects the first row in the short rate grid', null, { shortRateAdjustmentPage }); 
    await And('the user enters a short rate value of "2.50"', null, { shortRateAdjustmentPage }); 
    await And('the user saves the short rate change', null, { shortRateAdjustmentPage }); 
    await Then('a short rate success confirmation should be displayed', null, { shortRateAdjustmentPage }); 
  });

  test('Short Rate Adjustment page uses Ag-Grid for data display', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SRA'] }, async ({ Given, When, Then, loginPage, page, shortRateAdjustmentPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Short Rate Adjustment page', null, { shortRateAdjustmentPage }); 
    await Then('the Short Rate Adjustment ag-grid root should be visible', null, { shortRateAdjustmentPage }); 
  });

  test('Rate input is disabled before any row is selected and enabled after selection', { tag: ['@smokeBDD', '@Regression', '@SRA'] }, async ({ Given, When, Then, And, loginPage, page, shortRateAdjustmentPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Short Rate Adjustment page', null, { shortRateAdjustmentPage }); 
    await Then('the short rate input should be inactive before any row is selected', null, { shortRateAdjustmentPage }); 
    await When('the user selects the first row in the short rate grid', null, { shortRateAdjustmentPage }); 
    await Then('the short rate input should be active', null, { shortRateAdjustmentPage }); 
  });

  test('User cannot save a short rate without first selecting a row', { tag: ['@smokeBDD', '@Regression', '@SRA'] }, async ({ Given, When, Then, And, loginPage, page, shortRateAdjustmentPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Short Rate Adjustment page', null, { shortRateAdjustmentPage }); 
    await When('the user tries to save without selecting any row', null, { shortRateAdjustmentPage }); 
    await Then('the short rate save action should be blocked', null, { shortRateAdjustmentPage }); 
  });

  test('User clears the rate field and attempts to save - validation error shown', { tag: ['@smokeBDD', '@Regression', '@SRA'] }, async ({ Given, When, Then, And, loginPage, page, shortRateAdjustmentPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Short Rate Adjustment page', null, { shortRateAdjustmentPage }); 
    await And('the user selects the first row in the short rate grid', null, { shortRateAdjustmentPage }); 
    await When('the user clears the short rate input', null, { shortRateAdjustmentPage }); 
    await And('the user saves the short rate change', null, { shortRateAdjustmentPage }); 
    await Then('a short rate validation error should be displayed', null, { shortRateAdjustmentPage }); 
  });

  test('User enters a negative rate value - validation error shown', { tag: ['@smokeBDD', '@Regression', '@SRA'] }, async ({ Given, When, Then, And, loginPage, page, shortRateAdjustmentPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Short Rate Adjustment page', null, { shortRateAdjustmentPage }); 
    await And('the user selects the first row in the short rate grid', null, { shortRateAdjustmentPage }); 
    await When('the user enters a short rate value of "-1.00"', null, { shortRateAdjustmentPage }); 
    await And('the user saves the short rate change', null, { shortRateAdjustmentPage }); 
    await Then('a short rate validation error should be displayed', null, { shortRateAdjustmentPage }); 
  });

  test.describe('User submits various rate values and sees expected outcomes', () => {

    test('Example #1', { tag: ['@smokeBDD', '@Regression', '@SRA'] }, async ({ Given, When, Then, And, loginPage, page, shortRateAdjustmentPage, testUsers }) => { 
      await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
      await And('the user navigates to the Short Rate Adjustment page', null, { shortRateAdjustmentPage }); 
      await And('the user selects the first row in the short rate grid', null, { shortRateAdjustmentPage }); 
      await When('the user enters a short rate value of "0.00"', null, { shortRateAdjustmentPage }); 
      await And('the user saves the short rate change', null, { shortRateAdjustmentPage }); 
      await Then('the short rate outcome should be "success"', null, { shortRateAdjustmentPage }); 
    });

    test('Example #2', { tag: ['@smokeBDD', '@Regression', '@SRA'] }, async ({ Given, When, Then, And, loginPage, page, shortRateAdjustmentPage, testUsers }) => { 
      await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
      await And('the user navigates to the Short Rate Adjustment page', null, { shortRateAdjustmentPage }); 
      await And('the user selects the first row in the short rate grid', null, { shortRateAdjustmentPage }); 
      await When('the user enters a short rate value of "1.50"', null, { shortRateAdjustmentPage }); 
      await And('the user saves the short rate change', null, { shortRateAdjustmentPage }); 
      await Then('the short rate outcome should be "success"', null, { shortRateAdjustmentPage }); 
    });

    test('Example #3', { tag: ['@smokeBDD', '@Regression', '@SRA'] }, async ({ Given, When, Then, And, loginPage, page, shortRateAdjustmentPage, testUsers }) => { 
      await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
      await And('the user navigates to the Short Rate Adjustment page', null, { shortRateAdjustmentPage }); 
      await And('the user selects the first row in the short rate grid', null, { shortRateAdjustmentPage }); 
      await When('the user enters a short rate value of "99.99"', null, { shortRateAdjustmentPage }); 
      await And('the user saves the short rate change', null, { shortRateAdjustmentPage }); 
      await Then('the short rate outcome should be "success"', null, { shortRateAdjustmentPage }); 
    });

    test('Example #4', { tag: ['@smokeBDD', '@Regression', '@SRA'] }, async ({ Given, When, Then, And, loginPage, page, shortRateAdjustmentPage, testUsers }) => { 
      await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
      await And('the user navigates to the Short Rate Adjustment page', null, { shortRateAdjustmentPage }); 
      await And('the user selects the first row in the short rate grid', null, { shortRateAdjustmentPage }); 
      await When('the user enters a short rate value of "-0.01"', null, { shortRateAdjustmentPage }); 
      await And('the user saves the short rate change', null, { shortRateAdjustmentPage }); 
      await Then('the short rate outcome should be "validation error"', null, { shortRateAdjustmentPage }); 
    });

  });

  test('Short Rate Adjustment grid shows empty state when no data is available', { tag: ['@smokeBDD', '@Regression', '@SRA'] }, async ({ Given, When, Then, And, loginPage, page, shortRateAdjustmentPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Short Rate Adjustment page', null, { shortRateAdjustmentPage }); 
    await And('no short rate records are present in the system', null, { shortRateAdjustmentPage }); 
    await Then('the short rate grid empty state overlay should be displayed', null, { shortRateAdjustmentPage }); 
  });

  test('Full lifecycle - login, navigate to Short Rate Adjustment, update rate and confirm', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SRA'] }, async ({ Given, When, Then, And, contractSummaryPage, loginPage, page, shortRateAdjustmentPage, testUsers }) => { 
    await Given('the user navigates to the application', null, { loginPage, page }); 
    await When('the user logs in with valid credentials', null, { loginPage, testUsers }); 
    await Then('the user should be redirected to the dashboard', null, { contractSummaryPage, page }); 
    await When('the user navigates to the Short Rate Adjustment page', null, { shortRateAdjustmentPage }); 
    await Then('the Short Rate Adjustment grid should be visible', null, { shortRateAdjustmentPage }); 
    await And('the grid should display short rate data rows', null, { shortRateAdjustmentPage }); 
    await When('the user selects the first row in the short rate grid', null, { shortRateAdjustmentPage }); 
    await And('the user enters a short rate value of "3.00"', null, { shortRateAdjustmentPage }); 
    await And('the user saves the short rate change', null, { shortRateAdjustmentPage }); 
    await Then('a short rate success confirmation should be displayed', null, { shortRateAdjustmentPage }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('UI-Automation\\features\\ShortRateAdjustment.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":10,"tags":["@smokeBDD","@Smoke","@Regression","@SRA"],"steps":[{"pwStepLine":7,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"When the user navigates to the Short Rate Adjustment page","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"Then the Short Rate Adjustment grid should be visible","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"And the grid should display short rate data rows","stepMatchArguments":[]}]},
  {"pwTestLine":13,"pickleLine":18,"tags":["@smokeBDD","@Smoke","@Regression","@SRA"],"steps":[{"pwStepLine":14,"gherkinStepLine":19,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":20,"keywordType":"Action","textWithKeyword":"When the user navigates to the Short Rate Adjustment page","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"Then the grid should display Symbol, Cusip, Rate and Source columns","stepMatchArguments":[]}]},
  {"pwTestLine":19,"pickleLine":25,"tags":["@smokeBDD","@Smoke","@Regression","@SRA"],"steps":[{"pwStepLine":20,"gherkinStepLine":26,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":27,"keywordType":"Context","textWithKeyword":"And the user navigates to the Short Rate Adjustment page","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":28,"keywordType":"Action","textWithKeyword":"When the user selects the first row in the short rate grid","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"Then the short rate row should be selected","stepMatchArguments":[]}]},
  {"pwTestLine":26,"pickleLine":33,"tags":["@smokeBDD","@Smoke","@Regression","@SRA"],"steps":[{"pwStepLine":27,"gherkinStepLine":34,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":35,"keywordType":"Context","textWithKeyword":"And the user navigates to the Short Rate Adjustment page","stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":36,"keywordType":"Action","textWithKeyword":"When the user selects the first row in the short rate grid","stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":37,"keywordType":"Action","textWithKeyword":"And the user enters a short rate value of \"2.50\"","stepMatchArguments":[{"group":{"start":38,"value":"\"2.50\"","children":[{"start":39,"value":"2.50","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":31,"gherkinStepLine":38,"keywordType":"Action","textWithKeyword":"And the user saves the short rate change","stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":39,"keywordType":"Outcome","textWithKeyword":"Then a short rate success confirmation should be displayed","stepMatchArguments":[]}]},
  {"pwTestLine":35,"pickleLine":45,"tags":["@smokeBDD","@Smoke","@Regression","@SRA"],"steps":[{"pwStepLine":36,"gherkinStepLine":46,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":37,"gherkinStepLine":47,"keywordType":"Action","textWithKeyword":"When the user navigates to the Short Rate Adjustment page","stepMatchArguments":[]},{"pwStepLine":38,"gherkinStepLine":48,"keywordType":"Outcome","textWithKeyword":"Then the Short Rate Adjustment ag-grid root should be visible","stepMatchArguments":[]}]},
  {"pwTestLine":41,"pickleLine":54,"tags":["@smokeBDD","@Regression","@SRA"],"steps":[{"pwStepLine":42,"gherkinStepLine":55,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":43,"gherkinStepLine":56,"keywordType":"Context","textWithKeyword":"And the user navigates to the Short Rate Adjustment page","stepMatchArguments":[]},{"pwStepLine":44,"gherkinStepLine":57,"keywordType":"Outcome","textWithKeyword":"Then the short rate input should be inactive before any row is selected","stepMatchArguments":[]},{"pwStepLine":45,"gherkinStepLine":58,"keywordType":"Action","textWithKeyword":"When the user selects the first row in the short rate grid","stepMatchArguments":[]},{"pwStepLine":46,"gherkinStepLine":59,"keywordType":"Outcome","textWithKeyword":"Then the short rate input should be active","stepMatchArguments":[]}]},
  {"pwTestLine":49,"pickleLine":63,"tags":["@smokeBDD","@Regression","@SRA"],"steps":[{"pwStepLine":50,"gherkinStepLine":64,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":51,"gherkinStepLine":65,"keywordType":"Context","textWithKeyword":"And the user navigates to the Short Rate Adjustment page","stepMatchArguments":[]},{"pwStepLine":52,"gherkinStepLine":66,"keywordType":"Action","textWithKeyword":"When the user tries to save without selecting any row","stepMatchArguments":[]},{"pwStepLine":53,"gherkinStepLine":67,"keywordType":"Outcome","textWithKeyword":"Then the short rate save action should be blocked","stepMatchArguments":[]}]},
  {"pwTestLine":56,"pickleLine":73,"tags":["@smokeBDD","@Regression","@SRA"],"steps":[{"pwStepLine":57,"gherkinStepLine":74,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":58,"gherkinStepLine":75,"keywordType":"Context","textWithKeyword":"And the user navigates to the Short Rate Adjustment page","stepMatchArguments":[]},{"pwStepLine":59,"gherkinStepLine":76,"keywordType":"Context","textWithKeyword":"And the user selects the first row in the short rate grid","stepMatchArguments":[]},{"pwStepLine":60,"gherkinStepLine":77,"keywordType":"Action","textWithKeyword":"When the user clears the short rate input","stepMatchArguments":[]},{"pwStepLine":61,"gherkinStepLine":78,"keywordType":"Action","textWithKeyword":"And the user saves the short rate change","stepMatchArguments":[]},{"pwStepLine":62,"gherkinStepLine":79,"keywordType":"Outcome","textWithKeyword":"Then a short rate validation error should be displayed","stepMatchArguments":[]}]},
  {"pwTestLine":65,"pickleLine":83,"tags":["@smokeBDD","@Regression","@SRA"],"steps":[{"pwStepLine":66,"gherkinStepLine":84,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":67,"gherkinStepLine":85,"keywordType":"Context","textWithKeyword":"And the user navigates to the Short Rate Adjustment page","stepMatchArguments":[]},{"pwStepLine":68,"gherkinStepLine":86,"keywordType":"Context","textWithKeyword":"And the user selects the first row in the short rate grid","stepMatchArguments":[]},{"pwStepLine":69,"gherkinStepLine":87,"keywordType":"Action","textWithKeyword":"When the user enters a short rate value of \"-1.00\"","stepMatchArguments":[{"group":{"start":38,"value":"\"-1.00\"","children":[{"start":39,"value":"-1.00","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":70,"gherkinStepLine":88,"keywordType":"Action","textWithKeyword":"And the user saves the short rate change","stepMatchArguments":[]},{"pwStepLine":71,"gherkinStepLine":89,"keywordType":"Outcome","textWithKeyword":"Then a short rate validation error should be displayed","stepMatchArguments":[]}]},
  {"pwTestLine":76,"pickleLine":103,"tags":["@smokeBDD","@Regression","@SRA"],"steps":[{"pwStepLine":77,"gherkinStepLine":94,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":78,"gherkinStepLine":95,"keywordType":"Context","textWithKeyword":"And the user navigates to the Short Rate Adjustment page","stepMatchArguments":[]},{"pwStepLine":79,"gherkinStepLine":96,"keywordType":"Context","textWithKeyword":"And the user selects the first row in the short rate grid","stepMatchArguments":[]},{"pwStepLine":80,"gherkinStepLine":97,"keywordType":"Action","textWithKeyword":"When the user enters a short rate value of \"0.00\"","stepMatchArguments":[{"group":{"start":38,"value":"\"0.00\"","children":[{"start":39,"value":"0.00","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":81,"gherkinStepLine":98,"keywordType":"Action","textWithKeyword":"And the user saves the short rate change","stepMatchArguments":[]},{"pwStepLine":82,"gherkinStepLine":99,"keywordType":"Outcome","textWithKeyword":"Then the short rate outcome should be \"success\"","stepMatchArguments":[{"group":{"start":33,"value":"\"success\"","children":[{"start":34,"value":"success","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":85,"pickleLine":104,"tags":["@smokeBDD","@Regression","@SRA"],"steps":[{"pwStepLine":86,"gherkinStepLine":94,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":87,"gherkinStepLine":95,"keywordType":"Context","textWithKeyword":"And the user navigates to the Short Rate Adjustment page","stepMatchArguments":[]},{"pwStepLine":88,"gherkinStepLine":96,"keywordType":"Context","textWithKeyword":"And the user selects the first row in the short rate grid","stepMatchArguments":[]},{"pwStepLine":89,"gherkinStepLine":97,"keywordType":"Action","textWithKeyword":"When the user enters a short rate value of \"1.50\"","stepMatchArguments":[{"group":{"start":38,"value":"\"1.50\"","children":[{"start":39,"value":"1.50","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":90,"gherkinStepLine":98,"keywordType":"Action","textWithKeyword":"And the user saves the short rate change","stepMatchArguments":[]},{"pwStepLine":91,"gherkinStepLine":99,"keywordType":"Outcome","textWithKeyword":"Then the short rate outcome should be \"success\"","stepMatchArguments":[{"group":{"start":33,"value":"\"success\"","children":[{"start":34,"value":"success","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":94,"pickleLine":105,"tags":["@smokeBDD","@Regression","@SRA"],"steps":[{"pwStepLine":95,"gherkinStepLine":94,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":96,"gherkinStepLine":95,"keywordType":"Context","textWithKeyword":"And the user navigates to the Short Rate Adjustment page","stepMatchArguments":[]},{"pwStepLine":97,"gherkinStepLine":96,"keywordType":"Context","textWithKeyword":"And the user selects the first row in the short rate grid","stepMatchArguments":[]},{"pwStepLine":98,"gherkinStepLine":97,"keywordType":"Action","textWithKeyword":"When the user enters a short rate value of \"99.99\"","stepMatchArguments":[{"group":{"start":38,"value":"\"99.99\"","children":[{"start":39,"value":"99.99","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":99,"gherkinStepLine":98,"keywordType":"Action","textWithKeyword":"And the user saves the short rate change","stepMatchArguments":[]},{"pwStepLine":100,"gherkinStepLine":99,"keywordType":"Outcome","textWithKeyword":"Then the short rate outcome should be \"success\"","stepMatchArguments":[{"group":{"start":33,"value":"\"success\"","children":[{"start":34,"value":"success","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":103,"pickleLine":106,"tags":["@smokeBDD","@Regression","@SRA"],"steps":[{"pwStepLine":104,"gherkinStepLine":94,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":105,"gherkinStepLine":95,"keywordType":"Context","textWithKeyword":"And the user navigates to the Short Rate Adjustment page","stepMatchArguments":[]},{"pwStepLine":106,"gherkinStepLine":96,"keywordType":"Context","textWithKeyword":"And the user selects the first row in the short rate grid","stepMatchArguments":[]},{"pwStepLine":107,"gherkinStepLine":97,"keywordType":"Action","textWithKeyword":"When the user enters a short rate value of \"-0.01\"","stepMatchArguments":[{"group":{"start":38,"value":"\"-0.01\"","children":[{"start":39,"value":"-0.01","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":108,"gherkinStepLine":98,"keywordType":"Action","textWithKeyword":"And the user saves the short rate change","stepMatchArguments":[]},{"pwStepLine":109,"gherkinStepLine":99,"keywordType":"Outcome","textWithKeyword":"Then the short rate outcome should be \"validation error\"","stepMatchArguments":[{"group":{"start":33,"value":"\"validation error\"","children":[{"start":34,"value":"validation error","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":114,"pickleLine":112,"tags":["@smokeBDD","@Regression","@SRA"],"steps":[{"pwStepLine":115,"gherkinStepLine":113,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":116,"gherkinStepLine":114,"keywordType":"Action","textWithKeyword":"When the user navigates to the Short Rate Adjustment page","stepMatchArguments":[]},{"pwStepLine":117,"gherkinStepLine":115,"keywordType":"Action","textWithKeyword":"And no short rate records are present in the system","stepMatchArguments":[]},{"pwStepLine":118,"gherkinStepLine":116,"keywordType":"Outcome","textWithKeyword":"Then the short rate grid empty state overlay should be displayed","stepMatchArguments":[]}]},
  {"pwTestLine":121,"pickleLine":122,"tags":["@smokeBDD","@Smoke","@Regression","@SRA"],"steps":[{"pwStepLine":122,"gherkinStepLine":123,"keywordType":"Context","textWithKeyword":"Given the user navigates to the application","stepMatchArguments":[]},{"pwStepLine":123,"gherkinStepLine":124,"keywordType":"Action","textWithKeyword":"When the user logs in with valid credentials","stepMatchArguments":[]},{"pwStepLine":124,"gherkinStepLine":125,"keywordType":"Outcome","textWithKeyword":"Then the user should be redirected to the dashboard","stepMatchArguments":[]},{"pwStepLine":125,"gherkinStepLine":126,"keywordType":"Action","textWithKeyword":"When the user navigates to the Short Rate Adjustment page","stepMatchArguments":[]},{"pwStepLine":126,"gherkinStepLine":127,"keywordType":"Outcome","textWithKeyword":"Then the Short Rate Adjustment grid should be visible","stepMatchArguments":[]},{"pwStepLine":127,"gherkinStepLine":128,"keywordType":"Outcome","textWithKeyword":"And the grid should display short rate data rows","stepMatchArguments":[]},{"pwStepLine":128,"gherkinStepLine":129,"keywordType":"Action","textWithKeyword":"When the user selects the first row in the short rate grid","stepMatchArguments":[]},{"pwStepLine":129,"gherkinStepLine":130,"keywordType":"Action","textWithKeyword":"And the user enters a short rate value of \"3.00\"","stepMatchArguments":[{"group":{"start":38,"value":"\"3.00\"","children":[{"start":39,"value":"3.00","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":130,"gherkinStepLine":131,"keywordType":"Action","textWithKeyword":"And the user saves the short rate change","stepMatchArguments":[]},{"pwStepLine":131,"gherkinStepLine":132,"keywordType":"Outcome","textWithKeyword":"Then a short rate success confirmation should be displayed","stepMatchArguments":[]}]},
]; // bdd-data-end