// Generated from: UI-Automation\features\ContractReview.feature
import { test } from "../../../step-definitions/fixtures.js";

test.describe('Contract Review (SLL-208)', () => {

  test('User navigates to Contract Review and loads contracts by selecting a date', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-208'] }, async ({ Given, When, Then, And, contractReviewPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Contract Review page', null, { contractReviewPage }); 
    await And('the user selects a specific date', null, { contractReviewPage }); 
    await Then('reviewable contracts for the chosen date should be displayed in the grid', null, { contractReviewPage }); 
  });

  test('Contract Review page displays a list of unreviewed days on load', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-208'] }, async ({ Given, When, Then, contractReviewPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Contract Review page', null, { contractReviewPage }); 
    await Then('a list of unreviewed days should be displayed for selection', null, { contractReviewPage }); 
  });

  test('User selects an unreviewed day from the list and reviewable contracts are loaded', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-208'] }, async ({ Given, When, Then, And, contractReviewPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Review page', null, { contractReviewPage }); 
    await When('the user selects an unreviewed day from the list', null, { contractReviewPage }); 
    await Then('reviewable contracts for that day should be displayed in the grid', null, { contractReviewPage }); 
  });

  test('User selects contract rows, enters a comment, and submits a review successfully', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-208'] }, async ({ Given, When, Then, And, contractReviewPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in with contract review permissions', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Review page', null, { contractReviewPage }); 
    await And('the user loads contracts for a reviewable date', null, { contractReviewPage }); 
    await When('the user selects one or more contract rows', null, { contractReviewPage }); 
    await And('the user enters a review comment', null, { contractReviewPage }); 
    await And('the user submits the review', null, { contractReviewPage }); 
    await Then('the review should be submitted successfully', null, { contractReviewPage }); 
    await And('the unreviewed-day list should refresh to exclude the reviewed day', null, { contractReviewPage }); 
  });

  test('Unreviewed-day list refreshes after a successful review submission', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-208'] }, async ({ Given, Then, And, contractReviewPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in with contract review permissions', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Review page', null, { contractReviewPage }); 
    await And('the user submits a review for an unreviewed day', null, { contractReviewPage }); 
    await Then('the unreviewed-day list should no longer include the reviewed day', null, { contractReviewPage }); 
  });

  test('User can select multiple contract rows for review submission', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-208'] }, async ({ Given, When, Then, And, contractDetailsPage, contractReviewPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Review page', null, { contractReviewPage }); 
    await And('the user loads contracts for a reviewable date', null, { contractReviewPage }); 
    await When('the user selects multiple contract rows', null, { contractDetailsPage }); 
    await Then('all selected rows should be highlighted for review', null, { contractReviewPage }); 
  });

  test('Review submission is blocked when no contract rows are selected', { tag: ['@smokeBDD', '@Regression', '@SLL-208'] }, async ({ Given, When, Then, And, contractReviewPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in with contract review permissions', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Review page', null, { contractReviewPage }); 
    await And('the user loads contracts for a reviewable date', null, { contractReviewPage }); 
    await When('the user does not select any contract rows'); 
    await Then('the review submission should be disabled or a validation message should be displayed', null, { contractReviewPage }); 
  });

  test('User can edit the review comment before submitting', { tag: ['@smokeBDD', '@Regression', '@SLL-208'] }, async ({ Given, When, Then, And, contractReviewPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in with contract review permissions', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Review page', null, { contractReviewPage }); 
    await And('the user loads contracts for a reviewable date', null, { contractReviewPage }); 
    await And('the user selects contract rows', null, { contractReviewPage }); 
    await When('the user enters a comment and then edits it before submitting', null, { contractReviewPage }); 
    await Then('the updated comment should be used upon submission', null, { contractReviewPage }); 
  });

  test('Selecting a date with no reviewable contracts shows an empty state', { tag: ['@smokeBDD', '@Regression', '@SLL-208'] }, async ({ Given, When, Then, And, contractReviewPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Review page', null, { contractReviewPage }); 
    await When('the user selects a date that has no reviewable contracts', null, { contractReviewPage }); 
    await Then('an empty state or appropriate message should be displayed in the grid', null, { contractReviewPage }); 
  });

  test('Invalid date entry in the date selector shows a validation error', { tag: ['@smokeBDD', '@Regression', '@SLL-208'] }, async ({ Given, When, Then, And, contractReviewPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Contract Review page', null, { contractReviewPage }); 
    await When('the user enters an invalid date in the date selector', null, { contractReviewPage }); 
    await Then('a validation error should be displayed', null, { contractReviewPage }); 
  });

  test('Authorized user can submit a contract review', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-208'] }, async ({ Given, When, Then, contractReviewPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in with contract review permissions', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Contract Review page', null, { contractReviewPage }); 
    await Then('the review submission controls should be visible and enabled', null, { contractReviewPage }); 
  });

  test('User without review permissions cannot submit a contract review', { tag: ['@smokeBDD', '@Regression', '@SLL-208'] }, async ({ Given, When, Then, contractReviewPage, loginPage, page, testUsers }) => { 
    await Given('the user is logged in without contract review permissions', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Contract Review page', null, { contractReviewPage }); 
    await Then('the review submission controls should not be available or should be disabled', null, { contractReviewPage }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('UI-Automation\\features\\ContractReview.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":10,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-208"],"steps":[{"pwStepLine":7,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"When the user navigates to the Contract Review page","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":13,"keywordType":"Action","textWithKeyword":"And the user selects a specific date","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Then reviewable contracts for the chosen date should be displayed in the grid","stepMatchArguments":[]}]},
  {"pwTestLine":13,"pickleLine":18,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-208"],"steps":[{"pwStepLine":14,"gherkinStepLine":19,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":20,"keywordType":"Action","textWithKeyword":"When the user navigates to the Contract Review page","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"Then a list of unreviewed days should be displayed for selection","stepMatchArguments":[]}]},
  {"pwTestLine":19,"pickleLine":25,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-208"],"steps":[{"pwStepLine":20,"gherkinStepLine":26,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":27,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Review page","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":28,"keywordType":"Action","textWithKeyword":"When the user selects an unreviewed day from the list","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"Then reviewable contracts for that day should be displayed in the grid","stepMatchArguments":[]}]},
  {"pwTestLine":26,"pickleLine":33,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-208"],"steps":[{"pwStepLine":27,"gherkinStepLine":34,"keywordType":"Context","textWithKeyword":"Given the user is logged in with contract review permissions","stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":35,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Review page","stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":36,"keywordType":"Context","textWithKeyword":"And the user loads contracts for a reviewable date","stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":37,"keywordType":"Action","textWithKeyword":"When the user selects one or more contract rows","stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":38,"keywordType":"Action","textWithKeyword":"And the user enters a review comment","stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":39,"keywordType":"Action","textWithKeyword":"And the user submits the review","stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":40,"keywordType":"Outcome","textWithKeyword":"Then the review should be submitted successfully","stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":41,"keywordType":"Outcome","textWithKeyword":"And the unreviewed-day list should refresh to exclude the reviewed day","stepMatchArguments":[]}]},
  {"pwTestLine":37,"pickleLine":45,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-208"],"steps":[{"pwStepLine":38,"gherkinStepLine":46,"keywordType":"Context","textWithKeyword":"Given the user is logged in with contract review permissions","stepMatchArguments":[]},{"pwStepLine":39,"gherkinStepLine":47,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Review page","stepMatchArguments":[]},{"pwStepLine":40,"gherkinStepLine":48,"keywordType":"Context","textWithKeyword":"And the user submits a review for an unreviewed day","stepMatchArguments":[]},{"pwStepLine":41,"gherkinStepLine":49,"keywordType":"Outcome","textWithKeyword":"Then the unreviewed-day list should no longer include the reviewed day","stepMatchArguments":[]}]},
  {"pwTestLine":44,"pickleLine":55,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-208"],"steps":[{"pwStepLine":45,"gherkinStepLine":56,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":46,"gherkinStepLine":57,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Review page","stepMatchArguments":[]},{"pwStepLine":47,"gherkinStepLine":58,"keywordType":"Context","textWithKeyword":"And the user loads contracts for a reviewable date","stepMatchArguments":[]},{"pwStepLine":48,"gherkinStepLine":59,"keywordType":"Action","textWithKeyword":"When the user selects multiple contract rows","stepMatchArguments":[]},{"pwStepLine":49,"gherkinStepLine":60,"keywordType":"Outcome","textWithKeyword":"Then all selected rows should be highlighted for review","stepMatchArguments":[]}]},
  {"pwTestLine":52,"pickleLine":64,"tags":["@smokeBDD","@Regression","@SLL-208"],"steps":[{"pwStepLine":53,"gherkinStepLine":65,"keywordType":"Context","textWithKeyword":"Given the user is logged in with contract review permissions","stepMatchArguments":[]},{"pwStepLine":54,"gherkinStepLine":66,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Review page","stepMatchArguments":[]},{"pwStepLine":55,"gherkinStepLine":67,"keywordType":"Context","textWithKeyword":"And the user loads contracts for a reviewable date","stepMatchArguments":[]},{"pwStepLine":56,"gherkinStepLine":68,"keywordType":"Action","textWithKeyword":"When the user does not select any contract rows","stepMatchArguments":[]},{"pwStepLine":57,"gherkinStepLine":69,"keywordType":"Outcome","textWithKeyword":"Then the review submission should be disabled or a validation message should be displayed","stepMatchArguments":[]}]},
  {"pwTestLine":60,"pickleLine":73,"tags":["@smokeBDD","@Regression","@SLL-208"],"steps":[{"pwStepLine":61,"gherkinStepLine":74,"keywordType":"Context","textWithKeyword":"Given the user is logged in with contract review permissions","stepMatchArguments":[]},{"pwStepLine":62,"gherkinStepLine":75,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Review page","stepMatchArguments":[]},{"pwStepLine":63,"gherkinStepLine":76,"keywordType":"Context","textWithKeyword":"And the user loads contracts for a reviewable date","stepMatchArguments":[]},{"pwStepLine":64,"gherkinStepLine":77,"keywordType":"Context","textWithKeyword":"And the user selects contract rows","stepMatchArguments":[]},{"pwStepLine":65,"gherkinStepLine":78,"keywordType":"Action","textWithKeyword":"When the user enters a comment and then edits it before submitting","stepMatchArguments":[]},{"pwStepLine":66,"gherkinStepLine":79,"keywordType":"Outcome","textWithKeyword":"Then the updated comment should be used upon submission","stepMatchArguments":[]}]},
  {"pwTestLine":69,"pickleLine":85,"tags":["@smokeBDD","@Regression","@SLL-208"],"steps":[{"pwStepLine":70,"gherkinStepLine":86,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":71,"gherkinStepLine":87,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Review page","stepMatchArguments":[]},{"pwStepLine":72,"gherkinStepLine":88,"keywordType":"Action","textWithKeyword":"When the user selects a date that has no reviewable contracts","stepMatchArguments":[]},{"pwStepLine":73,"gherkinStepLine":89,"keywordType":"Outcome","textWithKeyword":"Then an empty state or appropriate message should be displayed in the grid","stepMatchArguments":[]}]},
  {"pwTestLine":76,"pickleLine":93,"tags":["@smokeBDD","@Regression","@SLL-208"],"steps":[{"pwStepLine":77,"gherkinStepLine":94,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":78,"gherkinStepLine":95,"keywordType":"Context","textWithKeyword":"And the user navigates to the Contract Review page","stepMatchArguments":[]},{"pwStepLine":79,"gherkinStepLine":96,"keywordType":"Action","textWithKeyword":"When the user enters an invalid date in the date selector","stepMatchArguments":[]},{"pwStepLine":80,"gherkinStepLine":97,"keywordType":"Outcome","textWithKeyword":"Then a validation error should be displayed","stepMatchArguments":[]}]},
  {"pwTestLine":83,"pickleLine":103,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-208"],"steps":[{"pwStepLine":84,"gherkinStepLine":104,"keywordType":"Context","textWithKeyword":"Given the user is logged in with contract review permissions","stepMatchArguments":[]},{"pwStepLine":85,"gherkinStepLine":105,"keywordType":"Action","textWithKeyword":"When the user navigates to the Contract Review page","stepMatchArguments":[]},{"pwStepLine":86,"gherkinStepLine":106,"keywordType":"Outcome","textWithKeyword":"Then the review submission controls should be visible and enabled","stepMatchArguments":[]}]},
  {"pwTestLine":89,"pickleLine":110,"tags":["@smokeBDD","@Regression","@SLL-208"],"steps":[{"pwStepLine":90,"gherkinStepLine":111,"keywordType":"Context","textWithKeyword":"Given the user is logged in without contract review permissions","stepMatchArguments":[]},{"pwStepLine":91,"gherkinStepLine":112,"keywordType":"Action","textWithKeyword":"When the user navigates to the Contract Review page","stepMatchArguments":[]},{"pwStepLine":92,"gherkinStepLine":113,"keywordType":"Outcome","textWithKeyword":"Then the review submission controls should not be available or should be disabled","stepMatchArguments":[]}]},
]; // bdd-data-end