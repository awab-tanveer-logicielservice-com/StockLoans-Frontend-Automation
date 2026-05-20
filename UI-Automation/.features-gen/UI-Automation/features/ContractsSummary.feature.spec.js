// Generated from: UI-Automation\features\ContractsSummary.feature
import { test } from "../../../step-definitions/fixtures.js";

test.describe('Contracts Summary Component (SLL-191)', () => {

  test('User navigates to Contract Summary page and sees summary-level positions loaded for the selected depository', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-191'] }, async ({ Given, When, Then, And, contractSummaryPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Contract Summary page', null, { contractSummaryPage }); 
    await Then('the Contract Summary grid should be visible', null, { contractSummaryPage }); 
    await And('the grid should display summary rows grouped by symbol', null, { contractSummaryPage }); 
  });

  test('Summary grid displays aggregated borrow and loan rates, quantities, amounts, and all calculated fields', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-191'] }, async ({ Given, Then, And, contractSummaryPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Summary page', null, { contractSummaryPage }); 
    await Then('the grid should display the Borrow Rate column', null, { contractSummaryPage }); 
    await And('the grid should display the Loan Rate column', null, { contractSummaryPage }); 
    await And('the grid should display the Quantity column', null, { contractSummaryPage }); 
    await And('the grid should display the Spread column', null, { contractSummaryPage }); 
    await And('the grid should display the Imbalance column', null, { contractSummaryPage }); 
    await And('the grid should display the Cash/Net column', null, { contractSummaryPage }); 
    await And('the grid should display the Rebate column', null, { contractSummaryPage }); 
  });

  test('User filters by Symbol/CUSIP and grid updates to show only matching rows', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-191'] }, async ({ Given, When, Then, And, contractDetailsPage, contractSummaryPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Summary page', null, { contractSummaryPage }); 
    await When('the user enters a symbol in the Symbol/CUSIP filter', null, { contractDetailsPage, contractSummaryPage, page }); 
    await Then('the grid should display only rows matching the entered symbol', null, { contractSummaryPage }); 
  });

  test('User filters by DTC and grid updates correctly', { tag: ['@smokeBDD', '@Regression', '@SLL-191'] }, async ({ Given, When, Then, And, contractDetailsPage, contractSummaryPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Summary page', null, { contractSummaryPage }); 
    await When('the user enters a value in the DTC filter', null, { contractDetailsPage, contractSummaryPage, page }); 
    await Then('the grid should display only rows matching the entered DTC value', null, { contractSummaryPage }); 
  });

  test('User filters by LoanetId and grid updates correctly', { tag: ['@smokeBDD', '@Regression', '@SLL-191'] }, async ({ Given, When, Then, And, contractDetailsPage, contractSummaryPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Summary page', null, { contractSummaryPage }); 
    await When('the user enters a value in the LoanetId filter', null, { contractDetailsPage, contractSummaryPage, page }); 
    await Then('the grid should display only rows matching the entered LoanetId', null, { contractSummaryPage }); 
  });

  test('User filters by Contract No. and grid updates correctly', { tag: ['@smokeBDD', '@Regression', '@SLL-191'] }, async ({ Given, When, Then, And, contractDetailsPage, contractSummaryPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Summary page', null, { contractSummaryPage }); 
    await When('the user enters a value in the Contract No. filter', null, { contractDetailsPage, contractSummaryPage, page }); 
    await Then('the grid should display only rows matching the entered contract number', null, { contractSummaryPage }); 
  });

  test('User filters by Profit Center and grid updates correctly', { tag: ['@smokeBDD', '@Regression', '@SLL-191'] }, async ({ Given, When, Then, And, contractDetailsPage, contractSummaryPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Summary page', null, { contractSummaryPage }); 
    await When('the user enters a value in the Profit Center filter', null, { contractDetailsPage, contractSummaryPage, page }); 
    await Then('the grid should display only rows matching the entered profit center', null, { contractSummaryPage }); 
  });

  test('User changes Effective Date and summary grid data reloads for that date', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-191'] }, async ({ Given, When, Then, And, contractDetailsPage, contractSummaryPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Summary page', null, { contractSummaryPage }); 
    await When('the user changes the Effective Date filter to a different date', null, { contractDetailsPage, contractSummaryPage, page }); 
    await Then('the summary grid should reload with data for the selected effective date', null, { contractSummaryPage }); 
  });

  test('User enables the Details toggle and the lower detail panel becomes visible', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-191'] }, async ({ Given, When, Then, And, contractSummaryPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Summary page', null, { contractSummaryPage }); 
    await When('the user enables the Details toggle', null, { contractSummaryPage }); 
    await Then('the lower detail panel should be visible', null, { contractSummaryPage }); 
  });

  test('Detail panel syncs to the symbol of the currently selected summary row', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-191'] }, async ({ Given, When, Then, And, contractSummaryPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Summary page', null, { contractSummaryPage }); 
    await And('the user enables the Details toggle', null, { contractSummaryPage }); 
    await When('the user selects a summary row', null, { contractSummaryPage }); 
    await Then('the detail panel should display contracts for the selected row\'s symbol', null, { contractSummaryPage }); 
  });

  test('User selects a different summary row and detail panel updates to the new symbol', { tag: ['@smokeBDD', '@Regression', '@SLL-191'] }, async ({ Given, When, Then, And, contractSummaryPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Summary page', null, { contractSummaryPage }); 
    await And('the user enables the Details toggle', null, { contractSummaryPage }); 
    await And('the user selects a summary row', null, { contractSummaryPage }); 
    await When('the user selects a different summary row', null, { contractSummaryPage }); 
    await Then('the detail panel should update to display contracts for the newly selected symbol', null, { contractSummaryPage }); 
  });

  test('User disables the Details toggle and the detail panel is hidden', { tag: ['@smokeBDD', '@Regression', '@SLL-191'] }, async ({ Given, When, Then, And, contractSummaryPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Summary page', null, { contractSummaryPage }); 
    await And('the user enables the Details toggle', null, { contractSummaryPage }); 
    await When('the user disables the Details toggle', null, { contractSummaryPage }); 
    await Then('the lower detail panel should not be visible', null, { contractSummaryPage }); 
  });

  test('User double-clicks a summary row and is navigated to Contract Details prefiltered to that symbol', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-191'] }, async ({ Given, When, Then, And, contractSummaryPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Summary page', null, { contractSummaryPage }); 
    await When('the user double-clicks a summary row', null, { contractSummaryPage }); 
    await Then('the user should be navigated to the Contract Details page', null, { page }); 
    await And('the Contract Details page should be prefiltered to the double-clicked symbol', null, { page }); 
  });

  test('Contract Details page opened via double-click shows only contracts for the double-clicked symbol', { tag: ['@smokeBDD', '@Regression', '@SLL-191'] }, async ({ Given, When, Then, And, contractSummaryPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Summary page', null, { contractSummaryPage }); 
    await When('the user double-clicks a summary row', null, { contractSummaryPage }); 
    await Then('the Contract Details page should display only contracts matching the selected symbol', null, { page }); 
  });

  test('Full lifecycle — login, select depository, view summary, apply filter, verify pinned totals, toggle details, double-click row, verify Contract Details', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-191'] }, async ({ Given, When, Then, And, contractDetailsPage, contractSummaryPage, loginPage, page, testUsers }) => { 
    await Given('the user navigates to the application', null, { loginPage, page }); 
    await When('the user logs in with valid credentials', null, { loginPage, testUsers }); 
    await Then('the user should be redirected to the dashboard', null, { contractSummaryPage, page }); 
    await When('the user navigates to the Contract Summary page', null, { contractSummaryPage }); 
    await Then('the Contract Summary grid should be visible', null, { contractSummaryPage }); 
    await And('the pinned total row should be visible at the bottom of the grid', null, { contractSummaryPage }); 
    await When('the user enters a symbol in the Symbol/CUSIP filter', null, { contractDetailsPage, contractSummaryPage, page }); 
    await Then('the grid should display only rows matching the entered symbol', null, { contractSummaryPage }); 
    await And('the pinned total row should recalculate and reflect totals of only the filtered rows', null, { contractSummaryPage }); 
    await When('the user clears all active filters', null, { contractDetailsPage, contractSummaryPage, page }); 
    await And('the user enables the Details toggle', null, { contractSummaryPage }); 
    await And('the user selects a summary row', null, { contractSummaryPage }); 
    await Then('the detail panel should display contracts for the selected row\'s symbol', null, { contractSummaryPage }); 
    await When('the user double-clicks a summary row', null, { contractSummaryPage }); 
    await Then('the user should be navigated to the Contract Details page', null, { page }); 
    await And('the Contract Details page should be prefiltered to the double-clicked symbol', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('UI-Automation\\features\\ContractsSummary.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":9,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-191"],"steps":[{"pwStepLine":7,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"When the user navigates to the Contract Summary page","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"Then the Contract Summary grid should be visible","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"And the grid should display summary rows grouped by symbol","stepMatchArguments":[]}]},
  {"pwTestLine":13,"pickleLine":16,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-191"],"steps":[{"pwStepLine":14,"gherkinStepLine":17,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":18,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Summary page","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"Then the grid should display the Borrow Rate column","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"And the grid should display the Loan Rate column","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"And the grid should display the Quantity column","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"And the grid should display the Spread column","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"And the grid should display the Imbalance column","stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"And the grid should display the Cash/Net column","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"And the grid should display the Rebate column","stepMatchArguments":[]}]},
  {"pwTestLine":25,"pickleLine":30,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-191"],"steps":[{"pwStepLine":26,"gherkinStepLine":31,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":32,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Summary page","stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":33,"keywordType":"Action","textWithKeyword":"When the user enters a symbol in the Symbol/CUSIP filter","stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":34,"keywordType":"Outcome","textWithKeyword":"Then the grid should display only rows matching the entered symbol","stepMatchArguments":[]}]},
  {"pwTestLine":32,"pickleLine":37,"tags":["@smokeBDD","@Regression","@SLL-191"],"steps":[{"pwStepLine":33,"gherkinStepLine":38,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":39,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Summary page","stepMatchArguments":[]},{"pwStepLine":35,"gherkinStepLine":40,"keywordType":"Action","textWithKeyword":"When the user enters a value in the DTC filter","stepMatchArguments":[]},{"pwStepLine":36,"gherkinStepLine":41,"keywordType":"Outcome","textWithKeyword":"Then the grid should display only rows matching the entered DTC value","stepMatchArguments":[]}]},
  {"pwTestLine":39,"pickleLine":44,"tags":["@smokeBDD","@Regression","@SLL-191"],"steps":[{"pwStepLine":40,"gherkinStepLine":45,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":41,"gherkinStepLine":46,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Summary page","stepMatchArguments":[]},{"pwStepLine":42,"gherkinStepLine":47,"keywordType":"Action","textWithKeyword":"When the user enters a value in the LoanetId filter","stepMatchArguments":[]},{"pwStepLine":43,"gherkinStepLine":48,"keywordType":"Outcome","textWithKeyword":"Then the grid should display only rows matching the entered LoanetId","stepMatchArguments":[]}]},
  {"pwTestLine":46,"pickleLine":51,"tags":["@smokeBDD","@Regression","@SLL-191"],"steps":[{"pwStepLine":47,"gherkinStepLine":52,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":48,"gherkinStepLine":53,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Summary page","stepMatchArguments":[]},{"pwStepLine":49,"gherkinStepLine":54,"keywordType":"Action","textWithKeyword":"When the user enters a value in the Contract No. filter","stepMatchArguments":[]},{"pwStepLine":50,"gherkinStepLine":55,"keywordType":"Outcome","textWithKeyword":"Then the grid should display only rows matching the entered contract number","stepMatchArguments":[]}]},
  {"pwTestLine":53,"pickleLine":58,"tags":["@smokeBDD","@Regression","@SLL-191"],"steps":[{"pwStepLine":54,"gherkinStepLine":59,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":55,"gherkinStepLine":60,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Summary page","stepMatchArguments":[]},{"pwStepLine":56,"gherkinStepLine":61,"keywordType":"Action","textWithKeyword":"When the user enters a value in the Profit Center filter","stepMatchArguments":[]},{"pwStepLine":57,"gherkinStepLine":62,"keywordType":"Outcome","textWithKeyword":"Then the grid should display only rows matching the entered profit center","stepMatchArguments":[]}]},
  {"pwTestLine":60,"pickleLine":65,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-191"],"steps":[{"pwStepLine":61,"gherkinStepLine":66,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":62,"gherkinStepLine":67,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Summary page","stepMatchArguments":[]},{"pwStepLine":63,"gherkinStepLine":68,"keywordType":"Action","textWithKeyword":"When the user changes the Effective Date filter to a different date","stepMatchArguments":[]},{"pwStepLine":64,"gherkinStepLine":69,"keywordType":"Outcome","textWithKeyword":"Then the summary grid should reload with data for the selected effective date","stepMatchArguments":[]}]},
  {"pwTestLine":67,"pickleLine":74,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-191"],"steps":[{"pwStepLine":68,"gherkinStepLine":75,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":69,"gherkinStepLine":76,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Summary page","stepMatchArguments":[]},{"pwStepLine":70,"gherkinStepLine":77,"keywordType":"Action","textWithKeyword":"When the user enables the Details toggle","stepMatchArguments":[]},{"pwStepLine":71,"gherkinStepLine":78,"keywordType":"Outcome","textWithKeyword":"Then the lower detail panel should be visible","stepMatchArguments":[]}]},
  {"pwTestLine":74,"pickleLine":81,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-191"],"steps":[{"pwStepLine":75,"gherkinStepLine":82,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":76,"gherkinStepLine":83,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Summary page","stepMatchArguments":[]},{"pwStepLine":77,"gherkinStepLine":84,"keywordType":"Context","textWithKeyword":"And the user enables the Details toggle","stepMatchArguments":[]},{"pwStepLine":78,"gherkinStepLine":85,"keywordType":"Action","textWithKeyword":"When the user selects a summary row","stepMatchArguments":[]},{"pwStepLine":79,"gherkinStepLine":86,"keywordType":"Outcome","textWithKeyword":"Then the detail panel should display contracts for the selected row's symbol","stepMatchArguments":[]}]},
  {"pwTestLine":82,"pickleLine":89,"tags":["@smokeBDD","@Regression","@SLL-191"],"steps":[{"pwStepLine":83,"gherkinStepLine":90,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":84,"gherkinStepLine":91,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Summary page","stepMatchArguments":[]},{"pwStepLine":85,"gherkinStepLine":92,"keywordType":"Context","textWithKeyword":"And the user enables the Details toggle","stepMatchArguments":[]},{"pwStepLine":86,"gherkinStepLine":93,"keywordType":"Context","textWithKeyword":"And the user selects a summary row","stepMatchArguments":[]},{"pwStepLine":87,"gherkinStepLine":94,"keywordType":"Action","textWithKeyword":"When the user selects a different summary row","stepMatchArguments":[]},{"pwStepLine":88,"gherkinStepLine":95,"keywordType":"Outcome","textWithKeyword":"Then the detail panel should update to display contracts for the newly selected symbol","stepMatchArguments":[]}]},
  {"pwTestLine":91,"pickleLine":98,"tags":["@smokeBDD","@Regression","@SLL-191"],"steps":[{"pwStepLine":92,"gherkinStepLine":99,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":93,"gherkinStepLine":100,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Summary page","stepMatchArguments":[]},{"pwStepLine":94,"gherkinStepLine":101,"keywordType":"Context","textWithKeyword":"And the user enables the Details toggle","stepMatchArguments":[]},{"pwStepLine":95,"gherkinStepLine":102,"keywordType":"Action","textWithKeyword":"When the user disables the Details toggle","stepMatchArguments":[]},{"pwStepLine":96,"gherkinStepLine":103,"keywordType":"Outcome","textWithKeyword":"Then the lower detail panel should not be visible","stepMatchArguments":[]}]},
  {"pwTestLine":99,"pickleLine":108,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-191"],"steps":[{"pwStepLine":100,"gherkinStepLine":109,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":101,"gherkinStepLine":110,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Summary page","stepMatchArguments":[]},{"pwStepLine":102,"gherkinStepLine":111,"keywordType":"Action","textWithKeyword":"When the user double-clicks a summary row","stepMatchArguments":[]},{"pwStepLine":103,"gherkinStepLine":112,"keywordType":"Outcome","textWithKeyword":"Then the user should be navigated to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":104,"gherkinStepLine":113,"keywordType":"Outcome","textWithKeyword":"And the Contract Details page should be prefiltered to the double-clicked symbol","stepMatchArguments":[]}]},
  {"pwTestLine":107,"pickleLine":116,"tags":["@smokeBDD","@Regression","@SLL-191"],"steps":[{"pwStepLine":108,"gherkinStepLine":117,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":109,"gherkinStepLine":118,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Summary page","stepMatchArguments":[]},{"pwStepLine":110,"gherkinStepLine":119,"keywordType":"Action","textWithKeyword":"When the user double-clicks a summary row","stepMatchArguments":[]},{"pwStepLine":111,"gherkinStepLine":120,"keywordType":"Outcome","textWithKeyword":"Then the Contract Details page should display only contracts matching the selected symbol","stepMatchArguments":[]}]},
  {"pwTestLine":114,"pickleLine":125,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-191"],"steps":[{"pwStepLine":115,"gherkinStepLine":126,"keywordType":"Context","textWithKeyword":"Given the user navigates to the application","stepMatchArguments":[]},{"pwStepLine":116,"gherkinStepLine":127,"keywordType":"Action","textWithKeyword":"When the user logs in with valid credentials","stepMatchArguments":[]},{"pwStepLine":117,"gherkinStepLine":128,"keywordType":"Outcome","textWithKeyword":"Then the user should be redirected to the dashboard","stepMatchArguments":[]},{"pwStepLine":118,"gherkinStepLine":129,"keywordType":"Action","textWithKeyword":"When the user navigates to the Contract Summary page","stepMatchArguments":[]},{"pwStepLine":119,"gherkinStepLine":130,"keywordType":"Outcome","textWithKeyword":"Then the Contract Summary grid should be visible","stepMatchArguments":[]},{"pwStepLine":120,"gherkinStepLine":131,"keywordType":"Outcome","textWithKeyword":"And the pinned total row should be visible at the bottom of the grid","stepMatchArguments":[]},{"pwStepLine":121,"gherkinStepLine":132,"keywordType":"Action","textWithKeyword":"When the user enters a symbol in the Symbol/CUSIP filter","stepMatchArguments":[]},{"pwStepLine":122,"gherkinStepLine":133,"keywordType":"Outcome","textWithKeyword":"Then the grid should display only rows matching the entered symbol","stepMatchArguments":[]},{"pwStepLine":123,"gherkinStepLine":134,"keywordType":"Outcome","textWithKeyword":"And the pinned total row should recalculate and reflect totals of only the filtered rows","stepMatchArguments":[]},{"pwStepLine":124,"gherkinStepLine":135,"keywordType":"Action","textWithKeyword":"When the user clears all active filters","stepMatchArguments":[]},{"pwStepLine":125,"gherkinStepLine":136,"keywordType":"Action","textWithKeyword":"And the user enables the Details toggle","stepMatchArguments":[]},{"pwStepLine":126,"gherkinStepLine":137,"keywordType":"Action","textWithKeyword":"And the user selects a summary row","stepMatchArguments":[]},{"pwStepLine":127,"gherkinStepLine":138,"keywordType":"Outcome","textWithKeyword":"Then the detail panel should display contracts for the selected row's symbol","stepMatchArguments":[]},{"pwStepLine":128,"gherkinStepLine":139,"keywordType":"Action","textWithKeyword":"When the user double-clicks a summary row","stepMatchArguments":[]},{"pwStepLine":129,"gherkinStepLine":140,"keywordType":"Outcome","textWithKeyword":"Then the user should be navigated to the Contract Details page","stepMatchArguments":[]},{"pwStepLine":130,"gherkinStepLine":141,"keywordType":"Outcome","textWithKeyword":"And the Contract Details page should be prefiltered to the double-clicked symbol","stepMatchArguments":[]}]},
]; // bdd-data-end