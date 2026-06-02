// Generated from: UI-Automation\features\LCOR.feature
import { test } from "../../../step-definitions/fixtures.js";

test.describe('LCOR (SLL-208)', () => {

  test('User navigates to LCOR and current-day records for the selected depository are displayed', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-208'] }, async ({ Given, When, Then, And, lcorPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the LCOR page', null, { lcorPage }); 
    await And('the user selects a depository', null, { lcorPage }); 
    await Then('current-day LCOR records for the selected depository should be displayed in the grid', null, { lcorPage }); 
  });

  test('User submits a valid LCOR batch with required fields and it is accepted', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-208'] }, async ({ Given, When, Then, And, lcorPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the LCOR page', null, { lcorPage }); 
    await And('the user selects a depository', null, { lcorPage }); 
    await When('the user enters a valid Contra Loanet ID', null, { lcorPage }); 
    await And('the user enters a valid Symbol or CUSIP', null, { lcorPage }); 
    await And('the user enters a valid Quantity', null, { lcorPage }); 
    await And('the user submits the LCOR batch', null, { lcorPage }); 
    await Then('the LCOR batch should be submitted successfully', null, { lcorPage }); 
    await And('the grid should refresh with the new LCOR record', null, { lcorPage }); 
  });

  test('User submits an LCOR batch with all advanced fields populated', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-208'] }, async ({ Given, When, Then, And, lcorPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the LCOR page', null, { lcorPage }); 
    await And('the user selects a depository', null, { lcorPage }); 
    await When('the user enters all required LCOR fields', null, { lcorPage }); 
    await And('the user enters the minimum quantity', null, { lcorPage }); 
    await And('the user enters the minimum rebate', null, { lcorPage }); 
    await And('the user enters the maximum price', null, { lcorPage }); 
    await And('the user enters the dividend rate', null, { lcorPage }); 
    await And('the user enters the time limit', null, { lcorPage }); 
    await And('the user enters the profit center', null, { lcorPage }); 
    await And('the user enters a public comment', null, { lcorPage }); 
    await And('the user submits the LCOR batch', null, { lcorPage }); 
    await Then('the LCOR batch should be submitted successfully', null, { lcorPage }); 
  });

  test('User clicks a row in the LCOR grid and the pinned detail summary is displayed', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-208'] }, async ({ Given, When, Then, And, lcorPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the LCOR page', null, { lcorPage }); 
    await And('the user selects a depository with existing LCOR records', null, { lcorPage }); 
    await When('the user clicks on an LCOR row in the grid', null, { lcorPage }); 
    await Then('the pinned detail summary for that record should be displayed at the bottom of the page', null, { lcorPage }); 
  });

  test('User resets the LCOR form and all fields are cleared', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-208'] }, async ({ Given, When, Then, And, lcorPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the LCOR page', null, { lcorPage }); 
    await When('the user fills in LCOR batch fields', null, { lcorPage }); 
    await And('the user clicks the Reset button', null, { lcorPage }); 
    await Then('all LCOR form fields should be cleared', null, { lcorPage }); 
  });

  test('LCOR batch submission is blocked when Contra Loanet ID is missing', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-208'] }, async ({ Given, When, Then, And, lcorPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the LCOR page', null, { lcorPage }); 
    await When('the user fills in all required LCOR fields except Contra Loanet ID', null, { lcorPage }); 
    await Then('the LCOR submission should be disabled or a validation error should be displayed', null, { lcorPage }); 
  });

  test('LCOR batch submission is blocked when Symbol or CUSIP is missing', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-208'] }, async ({ Given, When, Then, And, lcorPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the LCOR page', null, { lcorPage }); 
    await When('the user fills in all required LCOR fields except Symbol or CUSIP', null, { lcorPage }); 
    await Then('the LCOR submission should be disabled or a validation error should be displayed', null, { lcorPage }); 
  });

  test('LCOR batch submission is blocked when Quantity is missing', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-208'] }, async ({ Given, When, Then, And, lcorPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the LCOR page', null, { lcorPage }); 
    await When('the user fills in all required LCOR fields except Quantity', null, { lcorPage }); 
    await Then('the LCOR submission should be disabled or a validation error should be displayed', null, { lcorPage }); 
  });

  test('Non-numeric value entered in Quantity field shows a validation error', { tag: ['@smokeBDD', '@Regression', '@SLL-208'] }, async ({ Given, When, Then, And, lcorPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the LCOR page', null, { lcorPage }); 
    await When('the user enters "abc" in the Quantity field', null, { lcorPage }); 
    await Then('a validation error should be displayed for the Quantity field', null, { lcorPage }); 
  });

  test('Negative value entered in Quantity field shows a validation error', { tag: ['@smokeBDD', '@Regression', '@SLL-208'] }, async ({ Given, When, Then, And, lcorPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the LCOR page', null, { lcorPage }); 
    await When('the user enters "-100" in the Quantity field', null, { lcorPage }); 
    await Then('a validation error should be displayed for the Quantity field', null, { lcorPage }); 
  });

  test('Non-numeric value entered in Min Rebate field shows a validation error', { tag: ['@smokeBDD', '@Regression', '@SLL-208'] }, async ({ Given, When, Then, And, lcorPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the LCOR page', null, { lcorPage }); 
    await When('the user enters "abc" in the Min Rebate field', null, { lcorPage }); 
    await Then('a validation error should be displayed for the Min Rebate field', null, { lcorPage }); 
  });

  test('LCOR grid only shows current-day records for the selected depository', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-208'] }, async ({ Given, When, Then, And, lcorPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the LCOR page', null, { lcorPage }); 
    await When('the user selects a specific depository', null, { lcorPage }); 
    await Then('only current-day LCOR records for that depository should be displayed', null, { lcorPage }); 
  });

  test('Changing the depository on the LCOR page refreshes the grid with the new depository records', { tag: ['@smokeBDD', '@Regression', '@SLL-208'] }, async ({ Given, When, Then, And, lcorPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the LCOR page', null, { lcorPage }); 
    await And('the user selects a depository', null, { lcorPage }); 
    await When('the user changes to a different depository', null, { lcorPage }); 
    await Then('the grid should refresh with current-day records for the new depository only', null, { lcorPage }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('UI-Automation\\features\\LCOR.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":9,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-208"],"steps":[{"pwStepLine":7,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"When the user navigates to the LCOR page","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"And the user selects a depository","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"Then current-day LCOR records for the selected depository should be displayed in the grid","stepMatchArguments":[]}]},
  {"pwTestLine":13,"pickleLine":16,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-208"],"steps":[{"pwStepLine":14,"gherkinStepLine":17,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":18,"keywordType":"Context","textWithKeyword":"And the user navigates to the LCOR page","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":19,"keywordType":"Context","textWithKeyword":"And the user selects a depository","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":20,"keywordType":"Action","textWithKeyword":"When the user enters a valid Contra Loanet ID","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":21,"keywordType":"Action","textWithKeyword":"And the user enters a valid Symbol or CUSIP","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":22,"keywordType":"Action","textWithKeyword":"And the user enters a valid Quantity","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":23,"keywordType":"Action","textWithKeyword":"And the user submits the LCOR batch","stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"Then the LCOR batch should be submitted successfully","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"And the grid should refresh with the new LCOR record","stepMatchArguments":[]}]},
  {"pwTestLine":25,"pickleLine":28,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-208"],"steps":[{"pwStepLine":26,"gherkinStepLine":29,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":30,"keywordType":"Context","textWithKeyword":"And the user navigates to the LCOR page","stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":31,"keywordType":"Context","textWithKeyword":"And the user selects a depository","stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":32,"keywordType":"Action","textWithKeyword":"When the user enters all required LCOR fields","stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":33,"keywordType":"Action","textWithKeyword":"And the user enters the minimum quantity","stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":34,"keywordType":"Action","textWithKeyword":"And the user enters the minimum rebate","stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":35,"keywordType":"Action","textWithKeyword":"And the user enters the maximum price","stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":36,"keywordType":"Action","textWithKeyword":"And the user enters the dividend rate","stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":37,"keywordType":"Action","textWithKeyword":"And the user enters the time limit","stepMatchArguments":[]},{"pwStepLine":35,"gherkinStepLine":38,"keywordType":"Action","textWithKeyword":"And the user enters the profit center","stepMatchArguments":[]},{"pwStepLine":36,"gherkinStepLine":39,"keywordType":"Action","textWithKeyword":"And the user enters a public comment","stepMatchArguments":[]},{"pwStepLine":37,"gherkinStepLine":40,"keywordType":"Action","textWithKeyword":"And the user submits the LCOR batch","stepMatchArguments":[]},{"pwStepLine":38,"gherkinStepLine":41,"keywordType":"Outcome","textWithKeyword":"Then the LCOR batch should be submitted successfully","stepMatchArguments":[]}]},
  {"pwTestLine":41,"pickleLine":44,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-208"],"steps":[{"pwStepLine":42,"gherkinStepLine":45,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":43,"gherkinStepLine":46,"keywordType":"Context","textWithKeyword":"And the user navigates to the LCOR page","stepMatchArguments":[]},{"pwStepLine":44,"gherkinStepLine":47,"keywordType":"Context","textWithKeyword":"And the user selects a depository with existing LCOR records","stepMatchArguments":[]},{"pwStepLine":45,"gherkinStepLine":48,"keywordType":"Action","textWithKeyword":"When the user clicks on an LCOR row in the grid","stepMatchArguments":[]},{"pwStepLine":46,"gherkinStepLine":49,"keywordType":"Outcome","textWithKeyword":"Then the pinned detail summary for that record should be displayed at the bottom of the page","stepMatchArguments":[]}]},
  {"pwTestLine":49,"pickleLine":52,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-208"],"steps":[{"pwStepLine":50,"gherkinStepLine":53,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":51,"gherkinStepLine":54,"keywordType":"Context","textWithKeyword":"And the user navigates to the LCOR page","stepMatchArguments":[]},{"pwStepLine":52,"gherkinStepLine":55,"keywordType":"Action","textWithKeyword":"When the user fills in LCOR batch fields","stepMatchArguments":[]},{"pwStepLine":53,"gherkinStepLine":56,"keywordType":"Action","textWithKeyword":"And the user clicks the Reset button","stepMatchArguments":[]},{"pwStepLine":54,"gherkinStepLine":57,"keywordType":"Outcome","textWithKeyword":"Then all LCOR form fields should be cleared","stepMatchArguments":[]}]},
  {"pwTestLine":57,"pickleLine":62,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-208"],"steps":[{"pwStepLine":58,"gherkinStepLine":63,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":59,"gherkinStepLine":64,"keywordType":"Context","textWithKeyword":"And the user navigates to the LCOR page","stepMatchArguments":[]},{"pwStepLine":60,"gherkinStepLine":65,"keywordType":"Action","textWithKeyword":"When the user fills in all required LCOR fields except Contra Loanet ID","stepMatchArguments":[]},{"pwStepLine":61,"gherkinStepLine":66,"keywordType":"Outcome","textWithKeyword":"Then the LCOR submission should be disabled or a validation error should be displayed","stepMatchArguments":[]}]},
  {"pwTestLine":64,"pickleLine":69,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-208"],"steps":[{"pwStepLine":65,"gherkinStepLine":70,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":66,"gherkinStepLine":71,"keywordType":"Context","textWithKeyword":"And the user navigates to the LCOR page","stepMatchArguments":[]},{"pwStepLine":67,"gherkinStepLine":72,"keywordType":"Action","textWithKeyword":"When the user fills in all required LCOR fields except Symbol or CUSIP","stepMatchArguments":[]},{"pwStepLine":68,"gherkinStepLine":73,"keywordType":"Outcome","textWithKeyword":"Then the LCOR submission should be disabled or a validation error should be displayed","stepMatchArguments":[]}]},
  {"pwTestLine":71,"pickleLine":76,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-208"],"steps":[{"pwStepLine":72,"gherkinStepLine":77,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":73,"gherkinStepLine":78,"keywordType":"Context","textWithKeyword":"And the user navigates to the LCOR page","stepMatchArguments":[]},{"pwStepLine":74,"gherkinStepLine":79,"keywordType":"Action","textWithKeyword":"When the user fills in all required LCOR fields except Quantity","stepMatchArguments":[]},{"pwStepLine":75,"gherkinStepLine":80,"keywordType":"Outcome","textWithKeyword":"Then the LCOR submission should be disabled or a validation error should be displayed","stepMatchArguments":[]}]},
  {"pwTestLine":78,"pickleLine":83,"tags":["@smokeBDD","@Regression","@SLL-208"],"steps":[{"pwStepLine":79,"gherkinStepLine":84,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":80,"gherkinStepLine":85,"keywordType":"Context","textWithKeyword":"And the user navigates to the LCOR page","stepMatchArguments":[]},{"pwStepLine":81,"gherkinStepLine":86,"keywordType":"Action","textWithKeyword":"When the user enters \"abc\" in the Quantity field","stepMatchArguments":[{"group":{"start":16,"value":"\"abc\"","children":[{"start":17,"value":"abc","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":82,"gherkinStepLine":87,"keywordType":"Outcome","textWithKeyword":"Then a validation error should be displayed for the Quantity field","stepMatchArguments":[]}]},
  {"pwTestLine":85,"pickleLine":90,"tags":["@smokeBDD","@Regression","@SLL-208"],"steps":[{"pwStepLine":86,"gherkinStepLine":91,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":87,"gherkinStepLine":92,"keywordType":"Context","textWithKeyword":"And the user navigates to the LCOR page","stepMatchArguments":[]},{"pwStepLine":88,"gherkinStepLine":93,"keywordType":"Action","textWithKeyword":"When the user enters \"-100\" in the Quantity field","stepMatchArguments":[{"group":{"start":16,"value":"\"-100\"","children":[{"start":17,"value":"-100","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":89,"gherkinStepLine":94,"keywordType":"Outcome","textWithKeyword":"Then a validation error should be displayed for the Quantity field","stepMatchArguments":[]}]},
  {"pwTestLine":92,"pickleLine":97,"tags":["@smokeBDD","@Regression","@SLL-208"],"steps":[{"pwStepLine":93,"gherkinStepLine":98,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":94,"gherkinStepLine":99,"keywordType":"Context","textWithKeyword":"And the user navigates to the LCOR page","stepMatchArguments":[]},{"pwStepLine":95,"gherkinStepLine":100,"keywordType":"Action","textWithKeyword":"When the user enters \"abc\" in the Min Rebate field","stepMatchArguments":[{"group":{"start":16,"value":"\"abc\"","children":[{"start":17,"value":"abc","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":96,"gherkinStepLine":101,"keywordType":"Outcome","textWithKeyword":"Then a validation error should be displayed for the Min Rebate field","stepMatchArguments":[]}]},
  {"pwTestLine":99,"pickleLine":106,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-208"],"steps":[{"pwStepLine":100,"gherkinStepLine":107,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":101,"gherkinStepLine":108,"keywordType":"Context","textWithKeyword":"And the user navigates to the LCOR page","stepMatchArguments":[]},{"pwStepLine":102,"gherkinStepLine":109,"keywordType":"Action","textWithKeyword":"When the user selects a specific depository","stepMatchArguments":[]},{"pwStepLine":103,"gherkinStepLine":110,"keywordType":"Outcome","textWithKeyword":"Then only current-day LCOR records for that depository should be displayed","stepMatchArguments":[]}]},
  {"pwTestLine":106,"pickleLine":113,"tags":["@smokeBDD","@Regression","@SLL-208"],"steps":[{"pwStepLine":107,"gherkinStepLine":114,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":108,"gherkinStepLine":115,"keywordType":"Context","textWithKeyword":"And the user navigates to the LCOR page","stepMatchArguments":[]},{"pwStepLine":109,"gherkinStepLine":116,"keywordType":"Context","textWithKeyword":"And the user selects a depository","stepMatchArguments":[]},{"pwStepLine":110,"gherkinStepLine":117,"keywordType":"Action","textWithKeyword":"When the user changes to a different depository","stepMatchArguments":[]},{"pwStepLine":111,"gherkinStepLine":118,"keywordType":"Outcome","textWithKeyword":"Then the grid should refresh with current-day records for the new depository only","stepMatchArguments":[]}]},
]; // bdd-data-end