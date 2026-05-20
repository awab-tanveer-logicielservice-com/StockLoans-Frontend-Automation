// Generated from: UI-Automation\features\memosegFeature.feature
import { test } from "../../../step-definitions/fixtures.js";

test.describe('Memo Seg - Create instruction batches and perform UN-SEG actions', () => {

  test('User creates a valid memo seg batch and views populated summary and detail grids', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-204'] }, async ({ Given, When, Then, And, loginPage, memoSegPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Memo Seg page', null, { memoSegPage }); 
    await When('the user enters "AAPL 100" in the memo seg text input', null, { memoSegPage }); 
    await And('the user submits the memo seg batch', null, { memoSegPage }); 
    await Then('the summary grid should display a batch entry for symbol "AAPL"', null, { memoSegPage }); 
    await And('the detail grid should display the batch details for symbol "AAPL"', null, { memoSegPage }); 
  });

  test('Authenticated user can access the Memo Seg page and see the text input area', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-204'] }, async ({ Given, Then, And, loginPage, memoSegPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Memo Seg page', null, { memoSegPage }); 
    await Then('the Memo Seg page should be visible with the text input area', null, { memoSegPage }); 
  });

  test('UN-SEG button is visible on the Memo Seg page before any batch is submitted', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-204'] }, async ({ Given, When, Then, And, loginPage, memoSegPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Memo Seg page', null, { memoSegPage }); 
    await When('the user views the Memo Seg page without submitting a batch', null, { memoSegPage }); 
    await Then('the UN-SEG button should be visible on the Memo Seg page', null, { memoSegPage }); 
  });

  test('User performs UN-SEG action on a grouped row in the summary grid', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-204'] }, async ({ Given, When, Then, And, loginPage, memoSegPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Memo Seg page', null, { memoSegPage }); 
    await And('the user enters "AAPL 100" in the memo seg text input', null, { memoSegPage }); 
    await And('the user submits the memo seg batch', null, { memoSegPage }); 
    await When('the user selects a grouped row in the summary grid', null, { memoSegPage }); 
    await And('the user clicks the UN-SEG button', null, { memoSegPage }); 
    await Then('the UN-SEG action should complete successfully', null, { memoSegPage }); 
  });

  test('Summary grid groups batch rows by symbol after submission', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-204'] }, async ({ Given, When, Then, And, loginPage, memoSegPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Memo Seg page', null, { memoSegPage }); 
    await When('the user enters multiple symbols with quantities in the memo seg text input', null, { memoSegPage }); 
    await And('the user submits the memo seg batch', null, { memoSegPage }); 
    await Then('the summary grid should display rows grouped by symbol', null, { memoSegPage }); 
  });

  test('UN-SEG button remains visible after batch submission with no row selected', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-204'] }, async ({ Given, When, Then, And, loginPage, memoSegPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Memo Seg page', null, { memoSegPage }); 
    await And('the user enters "AAPL 100" in the memo seg text input', null, { memoSegPage }); 
    await And('the user submits the memo seg batch', null, { memoSegPage }); 
    await When('the user views the summary grid without selecting a row', null, { memoSegPage }); 
    await Then('the UN-SEG button should be visible on the Memo Seg page', null, { memoSegPage }); 
  });

  test('User submits an empty text input and receives a required field validation error', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-204'] }, async ({ Given, When, Then, And, loginPage, memoSegPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Memo Seg page', null, { memoSegPage }); 
    await When('the user submits the memo seg batch without entering any data', null, { memoSegPage }); 
    await Then('a validation error should be displayed indicating input is required', null, { memoSegPage }); 
  });

  test('User enters a symbol without quantity and receives a validation error', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-204'] }, async ({ Given, When, Then, And, loginPage, memoSegPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Memo Seg page', null, { memoSegPage }); 
    await When('the user enters "AAPL" in the memo seg text input', null, { memoSegPage }); 
    await And('the user submits the memo seg batch', null, { memoSegPage }); 
    await Then('a validation error should be displayed for missing quantity', null, { memoSegPage }); 
  });

  test('User enters a non-numeric quantity and receives a format validation error', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-204'] }, async ({ Given, When, Then, And, loginPage, memoSegPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Memo Seg page', null, { memoSegPage }); 
    await When('the user enters "AAPL ABC" in the memo seg text input', null, { memoSegPage }); 
    await And('the user submits the memo seg batch', null, { memoSegPage }); 
    await Then('a validation error should be displayed for invalid quantity format', null, { memoSegPage }); 
  });

  test.describe('User enters a boundary quantity value and receives the expected system response', () => {

    test('Example #1', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-204'] }, async ({ Given, When, Then, And, loginPage, memoSegPage, page, testUsers }) => { 
      await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
      await And('the user navigates to the Memo Seg page', null, { memoSegPage }); 
      await When('the user enters "AAPL 0" in the memo seg text input', null, { memoSegPage }); 
      await And('the user submits the memo seg batch', null, { memoSegPage }); 
      await Then('the system should show "validation error"', null, { memoSegPage }); 
    });

    test('Example #2', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-204'] }, async ({ Given, When, Then, And, loginPage, memoSegPage, page, testUsers }) => { 
      await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
      await And('the user navigates to the Memo Seg page', null, { memoSegPage }); 
      await When('the user enters "AAPL 1" in the memo seg text input', null, { memoSegPage }); 
      await And('the user submits the memo seg batch', null, { memoSegPage }); 
      await Then('the system should show "batch created successfully"', null, { memoSegPage }); 
    });

    test('Example #3', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-204'] }, async ({ Given, When, Then, And, loginPage, memoSegPage, page, testUsers }) => { 
      await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
      await And('the user navigates to the Memo Seg page', null, { memoSegPage }); 
      await When('the user enters "AAPL 9999999" in the memo seg text input', null, { memoSegPage }); 
      await And('the user submits the memo seg batch', null, { memoSegPage }); 
      await Then('the system should show "batch created successfully"', null, { memoSegPage }); 
    });

  });

  test('User enters special characters as symbol and receives a validation error', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-204'] }, async ({ Given, When, Then, And, loginPage, memoSegPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Memo Seg page', null, { memoSegPage }); 
    await When('the user enters "@#$% 100" in the memo seg text input', null, { memoSegPage }); 
    await And('the user submits the memo seg batch', null, { memoSegPage }); 
    await Then('a validation error should be displayed for invalid symbol format', null, { memoSegPage }); 
  });

  test('Clearing the text input after batch submission resets both summary and detail grids', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-204'] }, async ({ Given, When, Then, And, loginPage, memoSegPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Memo Seg page', null, { memoSegPage }); 
    await And('the user enters "AAPL 100" in the memo seg text input', null, { memoSegPage }); 
    await And('the user submits the memo seg batch', null, { memoSegPage }); 
    await When('the user clears the memo seg text input', null, { memoSegPage }); 
    await Then('the summary grid and detail grid should be reset to empty state', null, { memoSegPage }); 
  });

  test('Detail grid displays the correct column headers after batch submission', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-204'] }, async ({ Given, Then, And, loginPage, memoSegPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Memo Seg page', null, { memoSegPage }); 
    await And('the user enters "AAPL 100" in the memo seg text input', null, { memoSegPage }); 
    await And('the user submits the memo seg batch', null, { memoSegPage }); 
    await Then('the detail grid should display the correct column headers', null, { memoSegPage }); 
  });

  test('Full lifecycle - user creates a memo seg batch and completes a UN-SEG action end to end', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-204'] }, async ({ Given, When, Then, And, loginPage, memoSegPage, page, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Memo Seg page', null, { memoSegPage }); 
    await When('the user enters "AAPL 500" in the memo seg text input', null, { memoSegPage }); 
    await And('the user submits the memo seg batch', null, { memoSegPage }); 
    await Then('the summary grid should display a batch entry for symbol "AAPL"', null, { memoSegPage }); 
    await And('the detail grid should display the batch details for symbol "AAPL"', null, { memoSegPage }); 
    await When('the user selects a grouped row in the summary grid', null, { memoSegPage }); 
    await And('the user clicks the UN-SEG button', null, { memoSegPage }); 
    await Then('the UN-SEG action should complete successfully', null, { memoSegPage }); 
    await And('the grids should reflect the updated state after UN-SEG', null, { memoSegPage }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('UI-Automation\\features\\memosegFeature.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":8,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-204"],"steps":[{"pwStepLine":7,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And the user navigates to the Memo Seg page","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"When the user enters \"AAPL 100\" in the memo seg text input","stepMatchArguments":[{"group":{"start":16,"value":"\"AAPL 100\"","children":[{"start":17,"value":"AAPL 100","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":10,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"And the user submits the memo seg batch","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"Then the summary grid should display a batch entry for symbol \"AAPL\"","stepMatchArguments":[{"group":{"start":57,"value":"\"AAPL\"","children":[{"start":58,"value":"AAPL","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"And the detail grid should display the batch details for symbol \"AAPL\"","stepMatchArguments":[{"group":{"start":60,"value":"\"AAPL\"","children":[{"start":61,"value":"AAPL","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":15,"pickleLine":20,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-204"],"steps":[{"pwStepLine":16,"gherkinStepLine":21,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":22,"keywordType":"Context","textWithKeyword":"And the user navigates to the Memo Seg page","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"Then the Memo Seg page should be visible with the text input area","stepMatchArguments":[]}]},
  {"pwTestLine":21,"pickleLine":29,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-204"],"steps":[{"pwStepLine":22,"gherkinStepLine":30,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":31,"keywordType":"Context","textWithKeyword":"And the user navigates to the Memo Seg page","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":32,"keywordType":"Action","textWithKeyword":"When the user views the Memo Seg page without submitting a batch","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":33,"keywordType":"Outcome","textWithKeyword":"Then the UN-SEG button should be visible on the Memo Seg page","stepMatchArguments":[]}]},
  {"pwTestLine":28,"pickleLine":37,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-204"],"steps":[{"pwStepLine":29,"gherkinStepLine":38,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":39,"keywordType":"Context","textWithKeyword":"And the user navigates to the Memo Seg page","stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":40,"keywordType":"Context","textWithKeyword":"And the user enters \"AAPL 100\" in the memo seg text input","stepMatchArguments":[{"group":{"start":16,"value":"\"AAPL 100\"","children":[{"start":17,"value":"AAPL 100","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":32,"gherkinStepLine":41,"keywordType":"Context","textWithKeyword":"And the user submits the memo seg batch","stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":42,"keywordType":"Action","textWithKeyword":"When the user selects a grouped row in the summary grid","stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":43,"keywordType":"Action","textWithKeyword":"And the user clicks the UN-SEG button","stepMatchArguments":[]},{"pwStepLine":35,"gherkinStepLine":44,"keywordType":"Outcome","textWithKeyword":"Then the UN-SEG action should complete successfully","stepMatchArguments":[]}]},
  {"pwTestLine":38,"pickleLine":48,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-204"],"steps":[{"pwStepLine":39,"gherkinStepLine":49,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":40,"gherkinStepLine":50,"keywordType":"Context","textWithKeyword":"And the user navigates to the Memo Seg page","stepMatchArguments":[]},{"pwStepLine":41,"gherkinStepLine":51,"keywordType":"Action","textWithKeyword":"When the user enters multiple symbols with quantities in the memo seg text input","stepMatchArguments":[]},{"pwStepLine":42,"gherkinStepLine":52,"keywordType":"Action","textWithKeyword":"And the user submits the memo seg batch","stepMatchArguments":[]},{"pwStepLine":43,"gherkinStepLine":53,"keywordType":"Outcome","textWithKeyword":"Then the summary grid should display rows grouped by symbol","stepMatchArguments":[]}]},
  {"pwTestLine":46,"pickleLine":57,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-204"],"steps":[{"pwStepLine":47,"gherkinStepLine":58,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":48,"gherkinStepLine":59,"keywordType":"Context","textWithKeyword":"And the user navigates to the Memo Seg page","stepMatchArguments":[]},{"pwStepLine":49,"gherkinStepLine":60,"keywordType":"Context","textWithKeyword":"And the user enters \"AAPL 100\" in the memo seg text input","stepMatchArguments":[{"group":{"start":16,"value":"\"AAPL 100\"","children":[{"start":17,"value":"AAPL 100","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":50,"gherkinStepLine":61,"keywordType":"Context","textWithKeyword":"And the user submits the memo seg batch","stepMatchArguments":[]},{"pwStepLine":51,"gherkinStepLine":62,"keywordType":"Action","textWithKeyword":"When the user views the summary grid without selecting a row","stepMatchArguments":[]},{"pwStepLine":52,"gherkinStepLine":63,"keywordType":"Outcome","textWithKeyword":"Then the UN-SEG button should be visible on the Memo Seg page","stepMatchArguments":[]}]},
  {"pwTestLine":55,"pickleLine":69,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-204"],"steps":[{"pwStepLine":56,"gherkinStepLine":70,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":57,"gherkinStepLine":71,"keywordType":"Context","textWithKeyword":"And the user navigates to the Memo Seg page","stepMatchArguments":[]},{"pwStepLine":58,"gherkinStepLine":72,"keywordType":"Action","textWithKeyword":"When the user submits the memo seg batch without entering any data","stepMatchArguments":[]},{"pwStepLine":59,"gherkinStepLine":73,"keywordType":"Outcome","textWithKeyword":"Then a validation error should be displayed indicating input is required","stepMatchArguments":[]}]},
  {"pwTestLine":62,"pickleLine":77,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-204"],"steps":[{"pwStepLine":63,"gherkinStepLine":78,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":64,"gherkinStepLine":79,"keywordType":"Context","textWithKeyword":"And the user navigates to the Memo Seg page","stepMatchArguments":[]},{"pwStepLine":65,"gherkinStepLine":80,"keywordType":"Action","textWithKeyword":"When the user enters \"AAPL\" in the memo seg text input","stepMatchArguments":[{"group":{"start":16,"value":"\"AAPL\"","children":[{"start":17,"value":"AAPL","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":66,"gherkinStepLine":81,"keywordType":"Action","textWithKeyword":"And the user submits the memo seg batch","stepMatchArguments":[]},{"pwStepLine":67,"gherkinStepLine":82,"keywordType":"Outcome","textWithKeyword":"Then a validation error should be displayed for missing quantity","stepMatchArguments":[]}]},
  {"pwTestLine":70,"pickleLine":86,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-204"],"steps":[{"pwStepLine":71,"gherkinStepLine":87,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":72,"gherkinStepLine":88,"keywordType":"Context","textWithKeyword":"And the user navigates to the Memo Seg page","stepMatchArguments":[]},{"pwStepLine":73,"gherkinStepLine":89,"keywordType":"Action","textWithKeyword":"When the user enters \"AAPL ABC\" in the memo seg text input","stepMatchArguments":[{"group":{"start":16,"value":"\"AAPL ABC\"","children":[{"start":17,"value":"AAPL ABC","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":74,"gherkinStepLine":90,"keywordType":"Action","textWithKeyword":"And the user submits the memo seg batch","stepMatchArguments":[]},{"pwStepLine":75,"gherkinStepLine":91,"keywordType":"Outcome","textWithKeyword":"Then a validation error should be displayed for invalid quantity format","stepMatchArguments":[]}]},
  {"pwTestLine":80,"pickleLine":104,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-204"],"steps":[{"pwStepLine":81,"gherkinStepLine":96,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":82,"gherkinStepLine":97,"keywordType":"Context","textWithKeyword":"And the user navigates to the Memo Seg page","stepMatchArguments":[]},{"pwStepLine":83,"gherkinStepLine":98,"keywordType":"Action","textWithKeyword":"When the user enters \"AAPL 0\" in the memo seg text input","stepMatchArguments":[{"group":{"start":16,"value":"\"AAPL 0\"","children":[{"start":17,"value":"AAPL 0","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":84,"gherkinStepLine":99,"keywordType":"Action","textWithKeyword":"And the user submits the memo seg batch","stepMatchArguments":[]},{"pwStepLine":85,"gherkinStepLine":100,"keywordType":"Outcome","textWithKeyword":"Then the system should show \"validation error\"","stepMatchArguments":[{"group":{"start":23,"value":"\"validation error\"","children":[{"start":24,"value":"validation error","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":88,"pickleLine":105,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-204"],"steps":[{"pwStepLine":89,"gherkinStepLine":96,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":90,"gherkinStepLine":97,"keywordType":"Context","textWithKeyword":"And the user navigates to the Memo Seg page","stepMatchArguments":[]},{"pwStepLine":91,"gherkinStepLine":98,"keywordType":"Action","textWithKeyword":"When the user enters \"AAPL 1\" in the memo seg text input","stepMatchArguments":[{"group":{"start":16,"value":"\"AAPL 1\"","children":[{"start":17,"value":"AAPL 1","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":92,"gherkinStepLine":99,"keywordType":"Action","textWithKeyword":"And the user submits the memo seg batch","stepMatchArguments":[]},{"pwStepLine":93,"gherkinStepLine":100,"keywordType":"Outcome","textWithKeyword":"Then the system should show \"batch created successfully\"","stepMatchArguments":[{"group":{"start":23,"value":"\"batch created successfully\"","children":[{"start":24,"value":"batch created successfully","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":96,"pickleLine":106,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-204"],"steps":[{"pwStepLine":97,"gherkinStepLine":96,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":98,"gherkinStepLine":97,"keywordType":"Context","textWithKeyword":"And the user navigates to the Memo Seg page","stepMatchArguments":[]},{"pwStepLine":99,"gherkinStepLine":98,"keywordType":"Action","textWithKeyword":"When the user enters \"AAPL 9999999\" in the memo seg text input","stepMatchArguments":[{"group":{"start":16,"value":"\"AAPL 9999999\"","children":[{"start":17,"value":"AAPL 9999999","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":100,"gherkinStepLine":99,"keywordType":"Action","textWithKeyword":"And the user submits the memo seg batch","stepMatchArguments":[]},{"pwStepLine":101,"gherkinStepLine":100,"keywordType":"Outcome","textWithKeyword":"Then the system should show \"batch created successfully\"","stepMatchArguments":[{"group":{"start":23,"value":"\"batch created successfully\"","children":[{"start":24,"value":"batch created successfully","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":106,"pickleLine":112,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-204"],"steps":[{"pwStepLine":107,"gherkinStepLine":113,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":108,"gherkinStepLine":114,"keywordType":"Context","textWithKeyword":"And the user navigates to the Memo Seg page","stepMatchArguments":[]},{"pwStepLine":109,"gherkinStepLine":115,"keywordType":"Action","textWithKeyword":"When the user enters \"@#$% 100\" in the memo seg text input","stepMatchArguments":[{"group":{"start":16,"value":"\"@#$% 100\"","children":[{"start":17,"value":"@#$% 100","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":110,"gherkinStepLine":116,"keywordType":"Action","textWithKeyword":"And the user submits the memo seg batch","stepMatchArguments":[]},{"pwStepLine":111,"gherkinStepLine":117,"keywordType":"Outcome","textWithKeyword":"Then a validation error should be displayed for invalid symbol format","stepMatchArguments":[]}]},
  {"pwTestLine":114,"pickleLine":121,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-204"],"steps":[{"pwStepLine":115,"gherkinStepLine":122,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":116,"gherkinStepLine":123,"keywordType":"Context","textWithKeyword":"And the user navigates to the Memo Seg page","stepMatchArguments":[]},{"pwStepLine":117,"gherkinStepLine":124,"keywordType":"Context","textWithKeyword":"And the user enters \"AAPL 100\" in the memo seg text input","stepMatchArguments":[{"group":{"start":16,"value":"\"AAPL 100\"","children":[{"start":17,"value":"AAPL 100","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":118,"gherkinStepLine":125,"keywordType":"Context","textWithKeyword":"And the user submits the memo seg batch","stepMatchArguments":[]},{"pwStepLine":119,"gherkinStepLine":126,"keywordType":"Action","textWithKeyword":"When the user clears the memo seg text input","stepMatchArguments":[]},{"pwStepLine":120,"gherkinStepLine":127,"keywordType":"Outcome","textWithKeyword":"Then the summary grid and detail grid should be reset to empty state","stepMatchArguments":[]}]},
  {"pwTestLine":123,"pickleLine":131,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-204"],"steps":[{"pwStepLine":124,"gherkinStepLine":132,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":125,"gherkinStepLine":133,"keywordType":"Context","textWithKeyword":"And the user navigates to the Memo Seg page","stepMatchArguments":[]},{"pwStepLine":126,"gherkinStepLine":134,"keywordType":"Context","textWithKeyword":"And the user enters \"AAPL 100\" in the memo seg text input","stepMatchArguments":[{"group":{"start":16,"value":"\"AAPL 100\"","children":[{"start":17,"value":"AAPL 100","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":127,"gherkinStepLine":135,"keywordType":"Context","textWithKeyword":"And the user submits the memo seg batch","stepMatchArguments":[]},{"pwStepLine":128,"gherkinStepLine":136,"keywordType":"Outcome","textWithKeyword":"Then the detail grid should display the correct column headers","stepMatchArguments":[]}]},
  {"pwTestLine":131,"pickleLine":142,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-204"],"steps":[{"pwStepLine":132,"gherkinStepLine":143,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":133,"gherkinStepLine":144,"keywordType":"Context","textWithKeyword":"And the user navigates to the Memo Seg page","stepMatchArguments":[]},{"pwStepLine":134,"gherkinStepLine":145,"keywordType":"Action","textWithKeyword":"When the user enters \"AAPL 500\" in the memo seg text input","stepMatchArguments":[{"group":{"start":16,"value":"\"AAPL 500\"","children":[{"start":17,"value":"AAPL 500","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":135,"gherkinStepLine":146,"keywordType":"Action","textWithKeyword":"And the user submits the memo seg batch","stepMatchArguments":[]},{"pwStepLine":136,"gherkinStepLine":147,"keywordType":"Outcome","textWithKeyword":"Then the summary grid should display a batch entry for symbol \"AAPL\"","stepMatchArguments":[{"group":{"start":57,"value":"\"AAPL\"","children":[{"start":58,"value":"AAPL","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":137,"gherkinStepLine":148,"keywordType":"Outcome","textWithKeyword":"And the detail grid should display the batch details for symbol \"AAPL\"","stepMatchArguments":[{"group":{"start":60,"value":"\"AAPL\"","children":[{"start":61,"value":"AAPL","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":138,"gherkinStepLine":149,"keywordType":"Action","textWithKeyword":"When the user selects a grouped row in the summary grid","stepMatchArguments":[]},{"pwStepLine":139,"gherkinStepLine":150,"keywordType":"Action","textWithKeyword":"And the user clicks the UN-SEG button","stepMatchArguments":[]},{"pwStepLine":140,"gherkinStepLine":151,"keywordType":"Outcome","textWithKeyword":"Then the UN-SEG action should complete successfully","stepMatchArguments":[]},{"pwStepLine":141,"gherkinStepLine":152,"keywordType":"Outcome","textWithKeyword":"And the grids should reflect the updated state after UN-SEG","stepMatchArguments":[]}]},
]; // bdd-data-end