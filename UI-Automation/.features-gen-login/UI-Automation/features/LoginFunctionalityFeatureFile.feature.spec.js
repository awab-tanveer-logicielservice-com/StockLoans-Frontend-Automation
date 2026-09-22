// Generated from: UI-Automation\features\LoginFunctionalityFeatureFile.feature
import { test } from "../../../step-definitions/fixtures.js";

test.describe('Login Functionality - Firebase Authentication', () => {

  test('Successful login with valid credentials redirects to Contract Summary dashboard', { tag: ['@Smoke', '@Regression', '@SLL-169'] }, async ({ Given, When, Then, And, contractDetailsPage, contractSummaryPage, loginPage, page, testUsers }) => { 
    await Given('the user navigates to the application', null, { loginPage, page }); 
    await When('the user logs in with valid credentials', null, { loginPage, testUsers }); 
    await Then('the user should be redirected to the dashboard', null, { contractSummaryPage, page }); 
    await And('the Contract Summary grid should be visible', null, { contractSummaryPage }); 
    await And('the grid should display summary rows grouped by symbol', null, { contractSummaryPage }); 
    await When('the user enters "AAPL" in the Symbol/CUSIP filter', null, { contractDetailsPage, contractSummaryPage, page }); 
    await Then('the grid should display only rows matching the entered symbol', null, { contractSummaryPage }); 
    await Given('the user selects a summary row', null, { contractSummaryPage }); 
    await And('the user enables the Details toggle', null, { contractSummaryPage }); 
    await Then('the lower detail panel should be visible', null, { contractSummaryPage }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('UI-Automation\\features\\LoginFunctionalityFeatureFile.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":8,"tags":["@Smoke","@Regression","@SLL-169"],"steps":[{"pwStepLine":7,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"Given the user navigates to the application","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"When the user logs in with valid credentials","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"Then the user should be redirected to the dashboard","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"And the Contract Summary grid should be visible","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"And the grid should display summary rows grouped by symbol","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":14,"keywordType":"Action","textWithKeyword":"When the user enters \"AAPL\" in the Symbol/CUSIP filter","stepMatchArguments":[{"group":{"start":16,"value":"\"AAPL\"","children":[{"start":17,"value":"AAPL","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Then the grid should display only rows matching the entered symbol","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":16,"keywordType":"Context","textWithKeyword":"Given the user selects a summary row","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":17,"keywordType":"Context","textWithKeyword":"And the user enables the Details toggle","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"Then the lower detail panel should be visible","stepMatchArguments":[]}]},
]; // bdd-data-end