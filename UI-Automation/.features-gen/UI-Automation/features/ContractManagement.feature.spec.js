// Generated from: UI-Automation\features\ContractManagement.feature
import { test } from "../../../step-definitions/fixtures.js";

test.describe('Contract Management (SLL-208)', () => {

  test('User navigates to Contract Management and same-day contracts are displayed', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-208'] }, async ({ Given, When, Then, And, contractManagementPage, lcorPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Contract Management page', null, { contractManagementPage }); 
    await And('the user selects a depository', null, { lcorPage }); 
    await Then('same-day contracts for the selected depository should be displayed in the grid', null, { contractManagementPage }); 
  });

  test('User switches to the Pends view and only pending contracts are shown', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-208'] }, async ({ Given, When, Then, And, contractManagementPage, lcorPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Management page', null, { contractManagementPage }); 
    await And('the user selects a depository', null, { lcorPage }); 
    await When('the user selects the Pends view', null, { contractManagementPage }); 
    await Then('only pending contracts should be displayed in the grid', null, { contractManagementPage }); 
  });

  test('User switches to the Made view and only made contracts are shown', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-208'] }, async ({ Given, When, Then, And, contractManagementPage, lcorPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Management page', null, { contractManagementPage }); 
    await And('the user selects a depository', null, { lcorPage }); 
    await When('the user selects the Made view', null, { contractManagementPage }); 
    await Then('only made contracts should be displayed in the grid', null, { contractManagementPage }); 
  });

  test('User switches to the All view and all same-day contracts are shown', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-208'] }, async ({ Given, When, Then, And, contractManagementPage, lcorPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Management page', null, { contractManagementPage }); 
    await And('the user selects a depository', null, { lcorPage }); 
    await When('the user selects the All view', null, { contractManagementPage }); 
    await Then('all same-day contracts for the selected depository should be displayed in the grid', null, { contractManagementPage }); 
  });

  test('Changing the selected depository refreshes the grid with the new depository\'s contracts', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-208'] }, async ({ Given, When, Then, And, contractManagementPage, lcorPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Management page', null, { contractManagementPage }); 
    await And('the user selects a depository', null, { lcorPage }); 
    await When('the user changes to a different depository', null, { lcorPage }); 
    await Then('the grid should refresh and display same-day contracts for the new depository only', null, { contractManagementPage }); 
  });

  test('Contracts from other depositories are not shown for the selected depository', { tag: ['@smokeBDD', '@Regression', '@SLL-208'] }, async ({ Given, When, Then, And, contractManagementPage, lcorPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Management page', null, { contractManagementPage }); 
    await When('the user selects a specific depository', null, { lcorPage }); 
    await Then('only contracts belonging to that depository should be visible in the grid', null, { contractManagementPage }); 
  });

  test('Authorized user approves a submitted contract row successfully', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-208'] }, async ({ Given, When, Then, And, contractManagementPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in with contract approval permissions', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Management page', null, { contractManagementPage }); 
    await And('the user selects a depository with submitted contracts', null, { contractManagementPage }); 
    await When('the user selects a submitted contract row', null, { contractManagementPage }); 
    await And('the user clicks the Approve action', null, { contractManagementPage }); 
    await Then('the contract should be marked as approved', null, { contractManagementPage }); 
    await And('the grid should reflect the updated status', null, { contractManagementPage }); 
  });

  test('Authorized user denies a submitted contract row successfully', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-208'] }, async ({ Given, When, Then, And, contractManagementPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in with contract approval permissions', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Management page', null, { contractManagementPage }); 
    await And('the user selects a depository with submitted contracts', null, { contractManagementPage }); 
    await When('the user selects a submitted contract row', null, { contractManagementPage }); 
    await And('the user clicks the Deny action', null, { contractManagementPage }); 
    await Then('the contract should be marked as denied', null, { contractManagementPage }); 
    await And('the grid should reflect the updated status', null, { contractManagementPage }); 
  });

  test('Authorized user updates DTC status to Made for a contract', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-208'] }, async ({ Given, When, Then, And, contractManagementPage, lcorPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in with DTC update permissions', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Management page', null, { contractManagementPage }); 
    await And('the user selects a depository', null, { lcorPage }); 
    await When('the user toggles the DTC status of a contract to Made', null, { contractManagementPage }); 
    await Then('the contract DTC status should be updated to Made in the grid', null, { contractManagementPage }); 
  });

  test('Authorized user updates DTC status to Pending for a contract', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-208'] }, async ({ Given, When, Then, And, contractManagementPage, lcorPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in with DTC update permissions', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Management page', null, { contractManagementPage }); 
    await And('the user selects a depository', null, { lcorPage }); 
    await When('the user toggles the DTC status of a contract to Pending', null, { contractManagementPage }); 
    await Then('the contract DTC status should be updated to Pending in the grid', null, { contractManagementPage }); 
  });

  test('User edits a notes or private comment field inline and saves successfully', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-208'] }, async ({ Given, When, Then, And, contractManagementPage, lcorPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Management page', null, { contractManagementPage }); 
    await And('the user selects a depository', null, { lcorPage }); 
    await When('the user edits the notes field for a contract row in the grid', null, { contractManagementPage }); 
    await And('the user saves the inline edit', null, { contractManagementPage }); 
    await Then('the updated notes should be reflected in the grid', null, { contractManagementPage }); 
  });

  test('User without approval permissions cannot approve or deny contracts', { tag: ['@smokeBDD', '@Regression', '@SLL-208'] }, async ({ Given, When, Then, And, contractManagementPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in without contract approval permissions', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Contract Management page', null, { contractManagementPage }); 
    await And('the user selects a depository with submitted contracts', null, { contractManagementPage }); 
    await Then('the Approve and Deny actions should not be available for that user', null, { contractManagementPage }); 
  });

  test('User without DTC update permissions cannot toggle the DTC status', { tag: ['@smokeBDD', '@Regression', '@SLL-208'] }, async ({ Given, When, Then, And, contractManagementPage, lcorPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in without DTC update permissions', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Contract Management page', null, { contractManagementPage }); 
    await And('the user selects a depository', null, { lcorPage }); 
    await Then('the DTC status toggle should not be available for that user', null, { contractManagementPage }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('UI-Automation\\features\\ContractManagement.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":10,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-208"],"steps":[{"pwStepLine":7,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"When the user navigates to the Contract Management page","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":13,"keywordType":"Action","textWithKeyword":"And the user selects a depository","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Then same-day contracts for the selected depository should be displayed in the grid","stepMatchArguments":[]}]},
  {"pwTestLine":13,"pickleLine":18,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-208"],"steps":[{"pwStepLine":14,"gherkinStepLine":19,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":20,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Management page","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":21,"keywordType":"Context","textWithKeyword":"And the user selects a depository","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":22,"keywordType":"Action","textWithKeyword":"When the user selects the Pends view","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"Then only pending contracts should be displayed in the grid","stepMatchArguments":[]}]},
  {"pwTestLine":21,"pickleLine":27,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-208"],"steps":[{"pwStepLine":22,"gherkinStepLine":28,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":29,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Management page","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":30,"keywordType":"Context","textWithKeyword":"And the user selects a depository","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":31,"keywordType":"Action","textWithKeyword":"When the user selects the Made view","stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"Then only made contracts should be displayed in the grid","stepMatchArguments":[]}]},
  {"pwTestLine":29,"pickleLine":36,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-208"],"steps":[{"pwStepLine":30,"gherkinStepLine":37,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":38,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Management page","stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":39,"keywordType":"Context","textWithKeyword":"And the user selects a depository","stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":40,"keywordType":"Action","textWithKeyword":"When the user selects the All view","stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":41,"keywordType":"Outcome","textWithKeyword":"Then all same-day contracts for the selected depository should be displayed in the grid","stepMatchArguments":[]}]},
  {"pwTestLine":37,"pickleLine":47,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-208"],"steps":[{"pwStepLine":38,"gherkinStepLine":48,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":39,"gherkinStepLine":49,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Management page","stepMatchArguments":[]},{"pwStepLine":40,"gherkinStepLine":50,"keywordType":"Context","textWithKeyword":"And the user selects a depository","stepMatchArguments":[]},{"pwStepLine":41,"gherkinStepLine":51,"keywordType":"Action","textWithKeyword":"When the user changes to a different depository","stepMatchArguments":[]},{"pwStepLine":42,"gherkinStepLine":52,"keywordType":"Outcome","textWithKeyword":"Then the grid should refresh and display same-day contracts for the new depository only","stepMatchArguments":[]}]},
  {"pwTestLine":45,"pickleLine":56,"tags":["@smokeBDD","@Regression","@SLL-208"],"steps":[{"pwStepLine":46,"gherkinStepLine":57,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":47,"gherkinStepLine":58,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Management page","stepMatchArguments":[]},{"pwStepLine":48,"gherkinStepLine":59,"keywordType":"Action","textWithKeyword":"When the user selects a specific depository","stepMatchArguments":[]},{"pwStepLine":49,"gherkinStepLine":60,"keywordType":"Outcome","textWithKeyword":"Then only contracts belonging to that depository should be visible in the grid","stepMatchArguments":[]}]},
  {"pwTestLine":52,"pickleLine":66,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-208"],"steps":[{"pwStepLine":53,"gherkinStepLine":67,"keywordType":"Context","textWithKeyword":"Given the user is logged in with contract approval permissions","stepMatchArguments":[]},{"pwStepLine":54,"gherkinStepLine":68,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Management page","stepMatchArguments":[]},{"pwStepLine":55,"gherkinStepLine":69,"keywordType":"Context","textWithKeyword":"And the user selects a depository with submitted contracts","stepMatchArguments":[]},{"pwStepLine":56,"gherkinStepLine":70,"keywordType":"Action","textWithKeyword":"When the user selects a submitted contract row","stepMatchArguments":[]},{"pwStepLine":57,"gherkinStepLine":71,"keywordType":"Action","textWithKeyword":"And the user clicks the Approve action","stepMatchArguments":[]},{"pwStepLine":58,"gherkinStepLine":72,"keywordType":"Outcome","textWithKeyword":"Then the contract should be marked as approved","stepMatchArguments":[]},{"pwStepLine":59,"gherkinStepLine":73,"keywordType":"Outcome","textWithKeyword":"And the grid should reflect the updated status","stepMatchArguments":[]}]},
  {"pwTestLine":62,"pickleLine":77,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-208"],"steps":[{"pwStepLine":63,"gherkinStepLine":78,"keywordType":"Context","textWithKeyword":"Given the user is logged in with contract approval permissions","stepMatchArguments":[]},{"pwStepLine":64,"gherkinStepLine":79,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Management page","stepMatchArguments":[]},{"pwStepLine":65,"gherkinStepLine":80,"keywordType":"Context","textWithKeyword":"And the user selects a depository with submitted contracts","stepMatchArguments":[]},{"pwStepLine":66,"gherkinStepLine":81,"keywordType":"Action","textWithKeyword":"When the user selects a submitted contract row","stepMatchArguments":[]},{"pwStepLine":67,"gherkinStepLine":82,"keywordType":"Action","textWithKeyword":"And the user clicks the Deny action","stepMatchArguments":[]},{"pwStepLine":68,"gherkinStepLine":83,"keywordType":"Outcome","textWithKeyword":"Then the contract should be marked as denied","stepMatchArguments":[]},{"pwStepLine":69,"gherkinStepLine":84,"keywordType":"Outcome","textWithKeyword":"And the grid should reflect the updated status","stepMatchArguments":[]}]},
  {"pwTestLine":72,"pickleLine":90,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-208"],"steps":[{"pwStepLine":73,"gherkinStepLine":91,"keywordType":"Context","textWithKeyword":"Given the user is logged in with DTC update permissions","stepMatchArguments":[]},{"pwStepLine":74,"gherkinStepLine":92,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Management page","stepMatchArguments":[]},{"pwStepLine":75,"gherkinStepLine":93,"keywordType":"Context","textWithKeyword":"And the user selects a depository","stepMatchArguments":[]},{"pwStepLine":76,"gherkinStepLine":94,"keywordType":"Action","textWithKeyword":"When the user toggles the DTC status of a contract to Made","stepMatchArguments":[]},{"pwStepLine":77,"gherkinStepLine":95,"keywordType":"Outcome","textWithKeyword":"Then the contract DTC status should be updated to Made in the grid","stepMatchArguments":[]}]},
  {"pwTestLine":80,"pickleLine":99,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-208"],"steps":[{"pwStepLine":81,"gherkinStepLine":100,"keywordType":"Context","textWithKeyword":"Given the user is logged in with DTC update permissions","stepMatchArguments":[]},{"pwStepLine":82,"gherkinStepLine":101,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Management page","stepMatchArguments":[]},{"pwStepLine":83,"gherkinStepLine":102,"keywordType":"Context","textWithKeyword":"And the user selects a depository","stepMatchArguments":[]},{"pwStepLine":84,"gherkinStepLine":103,"keywordType":"Action","textWithKeyword":"When the user toggles the DTC status of a contract to Pending","stepMatchArguments":[]},{"pwStepLine":85,"gherkinStepLine":104,"keywordType":"Outcome","textWithKeyword":"Then the contract DTC status should be updated to Pending in the grid","stepMatchArguments":[]}]},
  {"pwTestLine":88,"pickleLine":110,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-208"],"steps":[{"pwStepLine":89,"gherkinStepLine":111,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":90,"gherkinStepLine":112,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Management page","stepMatchArguments":[]},{"pwStepLine":91,"gherkinStepLine":113,"keywordType":"Context","textWithKeyword":"And the user selects a depository","stepMatchArguments":[]},{"pwStepLine":92,"gherkinStepLine":114,"keywordType":"Action","textWithKeyword":"When the user edits the notes field for a contract row in the grid","stepMatchArguments":[]},{"pwStepLine":93,"gherkinStepLine":115,"keywordType":"Action","textWithKeyword":"And the user saves the inline edit","stepMatchArguments":[]},{"pwStepLine":94,"gherkinStepLine":116,"keywordType":"Outcome","textWithKeyword":"Then the updated notes should be reflected in the grid","stepMatchArguments":[]}]},
  {"pwTestLine":97,"pickleLine":122,"tags":["@smokeBDD","@Regression","@SLL-208"],"steps":[{"pwStepLine":98,"gherkinStepLine":123,"keywordType":"Context","textWithKeyword":"Given the user is logged in without contract approval permissions","stepMatchArguments":[]},{"pwStepLine":99,"gherkinStepLine":124,"keywordType":"Action","textWithKeyword":"When the user navigates to the Contract Management page","stepMatchArguments":[]},{"pwStepLine":100,"gherkinStepLine":125,"keywordType":"Action","textWithKeyword":"And the user selects a depository with submitted contracts","stepMatchArguments":[]},{"pwStepLine":101,"gherkinStepLine":126,"keywordType":"Outcome","textWithKeyword":"Then the Approve and Deny actions should not be available for that user","stepMatchArguments":[]}]},
  {"pwTestLine":104,"pickleLine":130,"tags":["@smokeBDD","@Regression","@SLL-208"],"steps":[{"pwStepLine":105,"gherkinStepLine":131,"keywordType":"Context","textWithKeyword":"Given the user is logged in without DTC update permissions","stepMatchArguments":[]},{"pwStepLine":106,"gherkinStepLine":132,"keywordType":"Action","textWithKeyword":"When the user navigates to the Contract Management page","stepMatchArguments":[]},{"pwStepLine":107,"gherkinStepLine":133,"keywordType":"Action","textWithKeyword":"And the user selects a depository","stepMatchArguments":[]},{"pwStepLine":108,"gherkinStepLine":134,"keywordType":"Outcome","textWithKeyword":"Then the DTC status toggle should not be available for that user","stepMatchArguments":[]}]},
]; // bdd-data-end