// Generated from: UI-Automation\features\ReportDateFiltersGrouping.feature
import { test } from "../../../step-definitions/fixtures.js";

test.describe('Report Component — Date Filters & Dynamic Grouping (SLL-210)', () => {

  test('User navigates to the Report page and the filter controls are displayed', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-210'] }, async ({ Given, When, Then, And, loginPage, page, reportPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Report page', null, { reportPage }); 
    await Then('the From Date picker should be visible', null, { reportPage }); 
    await And('the To Date picker should be visible', null, { reportPage }); 
    await And('the Report Type dropdown should be visible', null, { reportPage }); 
  });

  test('User selects a valid date range and generates a report successfully', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-210'] }, async ({ Given, When, Then, And, loginPage, page, reportPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Report page', null, { reportPage }); 
    await When('the user selects a valid From Date', null, { reportPage }); 
    await And('the user selects a To Date that is after the From Date', null, { reportPage }); 
    await And('the user selects a report type from the dropdown', null, { reportPage }); 
    await And('the user generates the report', null, { reportPage }); 
    await Then('report data should be displayed in the Ag-Grid', null, { reportPage }); 
  });

  test('User selects grouping by Corr and AccountNo and the grid reflects this grouping', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-210'] }, async ({ Given, When, Then, And, loginPage, page, reportPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Report page', null, { reportPage }); 
    await And('the user selects a valid date range', null, { reportPage }); 
    await When('the user selects the "Corr and AccountNo" grouping level', null, { reportPage }); 
    await And('the user generates the report', null, { reportPage }); 
    await Then('the Ag-Grid should display data grouped by Corr and AccountNo', null, { reportPage }); 
  });

  test('User selects grouping by Corr and Symbol and the grid reflects this grouping', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-210'] }, async ({ Given, When, Then, And, loginPage, page, reportPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Report page', null, { reportPage }); 
    await And('the user selects a valid date range', null, { reportPage }); 
    await When('the user selects the "Corr and Symbol" grouping level', null, { reportPage }); 
    await And('the user generates the report', null, { reportPage }); 
    await Then('the Ag-Grid should display data grouped by Corr and Symbol', null, { reportPage }); 
  });

  test('User selects grouping by Office and Symbol and the grid reflects this grouping', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-210'] }, async ({ Given, When, Then, And, loginPage, page, reportPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Report page', null, { reportPage }); 
    await And('the user selects a valid date range', null, { reportPage }); 
    await When('the user selects the "Office and Symbol" grouping level', null, { reportPage }); 
    await And('the user generates the report', null, { reportPage }); 
    await Then('the Ag-Grid should display data grouped by Office and Symbol', null, { reportPage }); 
  });

  test('User selects grouping by Office and AccountNo and the grid reflects this grouping', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-210'] }, async ({ Given, When, Then, And, loginPage, page, reportPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Report page', null, { reportPage }); 
    await And('the user selects a valid date range', null, { reportPage }); 
    await When('the user selects the "Office and AccountNo" grouping level', null, { reportPage }); 
    await And('the user generates the report', null, { reportPage }); 
    await Then('the Ag-Grid should display data grouped by Office and AccountNo', null, { reportPage }); 
  });

  test('Report Type dropdown defaults to the available report on page load', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-210'] }, async ({ Given, When, Then, loginPage, page, reportPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Report page', null, { reportPage }); 
    await Then('the Report Type dropdown should default to the single available report', null, { reportPage }); 
  });

  test('User selects a report type from the dropdown and the selection is reflected', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-210'] }, async ({ Given, When, Then, And, loginPage, page, reportPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Report page', null, { reportPage }); 
    await When('the user opens the Report Type dropdown', null, { reportPage }); 
    await And('the user selects a report type', null, { reportPage }); 
    await Then('the selected report type should be displayed in the dropdown', null, { reportPage }); 
  });

  test('User sets From Date and To Date to the same day and report generates successfully', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-210'] }, async ({ Given, When, Then, And, loginPage, page, reportPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Report page', null, { reportPage }); 
    await When('the user sets both From Date and To Date to the same date', null, { reportPage }); 
    await And('the user generates the report', null, { reportPage }); 
    await Then('report data for that single day should be displayed in the Ag-Grid', null, { reportPage }); 
  });

  test('User sets a wide date range spanning multiple months and report loads correctly', { tag: ['@smokeBDD', '@Regression', '@SLL-210'] }, async ({ Given, When, Then, And, loginPage, page, reportPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Report page', null, { reportPage }); 
    await When('the user selects a From Date several months before the To Date', null, { reportPage }); 
    await And('the user generates the report', null, { reportPage }); 
    await Then('report data for the entire date range should be displayed in the Ag-Grid', null, { reportPage }); 
  });

  test('Changing the date range and regenerating updates the grid with new results', { tag: ['@smokeBDD', '@Regression', '@SLL-210'] }, async ({ Given, When, Then, And, loginPage, page, reportPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Report page', null, { reportPage }); 
    await And('the user has already generated a report for a date range', null, { reportPage }); 
    await When('the user selects a different date range', null, { reportPage }); 
    await And('the user generates the report again', null, { reportPage }); 
    await Then('the Ag-Grid should refresh and display data for the new date range', null, { reportPage }); 
  });

  test('From Date set after To Date triggers a validation error and blocks report generation', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-210'] }, async ({ Given, When, Then, And, loginPage, page, reportPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Report page', null, { reportPage }); 
    await When('the user selects a From Date that is after the To Date', null, { reportPage }); 
    await And('the user attempts to generate the report', null, { reportPage }); 
    await Then('a validation error should be displayed indicating From Date cannot be after To Date', null, { reportPage }); 
    await And('the report should not be generated', null, { reportPage }); 
  });

  test('Report generation is blocked when From Date is missing', { tag: ['@smokeBDD', '@Regression', '@SLL-210'] }, async ({ Given, When, Then, And, loginPage, page, reportPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Report page', null, { reportPage }); 
    await When('the user selects only a To Date without entering a From Date', null, { reportPage }); 
    await And('the user attempts to generate the report', null, { reportPage }); 
    await Then('report generation should be blocked or a validation error should be displayed', null, { reportPage }); 
  });

  test('Report generation is blocked when To Date is missing', { tag: ['@smokeBDD', '@Regression', '@SLL-210'] }, async ({ Given, When, Then, And, loginPage, page, reportPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Report page', null, { reportPage }); 
    await When('the user selects only a From Date without entering a To Date', null, { reportPage }); 
    await And('the user attempts to generate the report', null, { reportPage }); 
    await Then('report generation should be blocked or a validation error should be displayed', null, { reportPage }); 
  });

  test('Invalid date format entered in From Date picker shows a validation error', { tag: ['@smokeBDD', '@Regression', '@SLL-210'] }, async ({ Given, When, Then, And, loginPage, page, reportPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Report page', null, { reportPage }); 
    await When('the user enters an invalid date format in the From Date picker', null, { reportPage }); 
    await Then('a validation error should be displayed for the From Date field', null, { reportPage }); 
  });

  test('Invalid date format entered in To Date picker shows a validation error', { tag: ['@smokeBDD', '@Regression', '@SLL-210'] }, async ({ Given, When, Then, And, loginPage, page, reportPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Report page', null, { reportPage }); 
    await When('the user enters an invalid date format in the To Date picker', null, { reportPage }); 
    await Then('a validation error should be displayed for the To Date field', null, { reportPage }); 
  });

  test('All four grouping options are available for selection', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-210'] }, async ({ Given, When, Then, loginPage, page, reportPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Report page', null, { reportPage }); 
    await Then('the grouping selector should offer "Corr and AccountNo", "Corr and Symbol", "Office and Symbol", and "Office and AccountNo" options', null, { reportPage }); 
  });

  test('Switching grouping level after report generation refreshes the grid with the new grouping', { tag: ['@smokeBDD', '@Regression', '@SLL-210'] }, async ({ Given, When, Then, And, loginPage, page, reportPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Report page', null, { reportPage }); 
    await And('the user has generated a report with "Corr and AccountNo" grouping', null, { reportPage }); 
    await When('the user switches the grouping to "Office and Symbol"', null, { reportPage }); 
    await And('the user regenerates the report', null, { reportPage }); 
    await Then('the Ag-Grid should display data regrouped by Office and Symbol', null, { reportPage }); 
  });

  test('Ag-Grid group rows can be expanded to show child records', { tag: ['@smokeBDD', '@Regression', '@SLL-210'] }, async ({ Given, When, Then, And, loginPage, page, reportPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Report page', null, { reportPage }); 
    await And('the user generates a report with any grouping level', null, { reportPage }); 
    await When('the user expands a group row in the Ag-Grid', null, { reportPage }); 
    await Then('the child records for that group should be displayed', null, { reportPage }); 
  });

  test('Ag-Grid group rows can be collapsed to hide child records', { tag: ['@smokeBDD', '@Regression', '@SLL-210'] }, async ({ Given, When, Then, And, loginPage, page, reportPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Report page', null, { reportPage }); 
    await And('the user generates a report with any grouping level', null, { reportPage }); 
    await And('the user has expanded a group row', null, { reportPage }); 
    await When('the user collapses the group row', null, { reportPage }); 
    await Then('the child records for that group should be hidden', null, { reportPage }); 
  });

  test('Report page uses Ag-Grid for data display and grouping', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-210'] }, async ({ Given, When, Then, loginPage, page, reportPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Report page', null, { reportPage }); 
    await Then('the data grid should be an Ag-Grid component', null, { reportPage }); 
  });

  test('Date pickers and form controls use theme-aware SLS V2 styling', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-210'] }, async ({ Given, When, Then, loginPage, page, reportPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Report page', null, { reportPage }); 
    await Then('the From Date picker, To Date picker, and Report Type dropdown should display with theme-aware styling', null, { reportPage }); 
  });

  test('Report page maintains a clean single-view layout consistent with V2 design', { tag: ['@smokeBDD', '@Regression', '@SLL-210'] }, async ({ Given, When, Then, loginPage, page, reportPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await When('the user navigates to the Report page', null, { reportPage }); 
    await Then('the filters, grouping controls, and data grid should all be visible on a single screen', null, { reportPage }); 
  });

  test('Report generated for a date range with no data shows an empty state in the grid', { tag: ['@smokeBDD', '@Regression', '@SLL-210'] }, async ({ Given, When, Then, And, loginPage, page, reportPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Report page', null, { reportPage }); 
    await When('the user selects a date range that contains no data', null, { reportPage }); 
    await And('the user generates the report', null, { reportPage }); 
    await Then('the report grid should display an empty state or no results message', null, { reportPage }); 
  });

  test('Report page resets the grid when filter inputs are cleared', { tag: ['@smokeBDD', '@Regression', '@SLL-210'] }, async ({ Given, When, Then, And, loginPage, page, reportPage, testUsers }) => { 
    await Given('the user is logged in to the application', null, { loginPage, page, testUsers }); 
    await And('the user navigates to the Report page', null, { reportPage }); 
    await And('the user has generated a report', null, { reportPage }); 
    await When('the user clears the date range inputs', null, { reportPage }); 
    await Then('the Ag-Grid should reset or no data should be displayed', null, { reportPage }); 
  });

  test('Full lifecycle — select date range, select grouping, generate report, expand groups, change grouping, regenerate', { tag: ['@smokeBDD', '@Smoke', '@Regression', '@SLL-210'] }, async ({ Given, When, Then, And, contractSummaryPage, loginPage, page, reportPage, testUsers }) => { 
    await Given('the user navigates to the application', null, { loginPage, page }); 
    await When('the user logs in with valid credentials', null, { loginPage, testUsers }); 
    await Then('the user should be redirected to the dashboard', null, { contractSummaryPage, page }); 
    await When('the user navigates to the Report page', null, { reportPage }); 
    await Then('the From Date picker, To Date picker, and Report Type dropdown should be visible', null, { reportPage }); 
    await When('the user selects a valid From Date', null, { reportPage }); 
    await And('the user selects a To Date that is after the From Date', null, { reportPage }); 
    await And('the user selects the "Corr and AccountNo" grouping level', null, { reportPage }); 
    await And('the user generates the report', null, { reportPage }); 
    await Then('report data should be displayed in the Ag-Grid grouped by Corr and AccountNo', null, { reportPage }); 
    await When('the user expands a group row in the Ag-Grid', null, { reportPage }); 
    await Then('child records for that group should be visible', null, { reportPage }); 
    await When('the user switches the grouping to "Office and Symbol"', null, { reportPage }); 
    await And('the user regenerates the report', null, { reportPage }); 
    await Then('the Ag-Grid should display data regrouped by Office and Symbol', null, { reportPage }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('UI-Automation\\features\\ReportDateFiltersGrouping.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":10,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-210"],"steps":[{"pwStepLine":7,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"When the user navigates to the Report page","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"Then the From Date picker should be visible","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"And the To Date picker should be visible","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"And the Report Type dropdown should be visible","stepMatchArguments":[]}]},
  {"pwTestLine":14,"pickleLine":19,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-210"],"steps":[{"pwStepLine":15,"gherkinStepLine":20,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":21,"keywordType":"Context","textWithKeyword":"And the user navigates to the Report page","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":22,"keywordType":"Action","textWithKeyword":"When the user selects a valid From Date","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":23,"keywordType":"Action","textWithKeyword":"And the user selects a To Date that is after the From Date","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":24,"keywordType":"Action","textWithKeyword":"And the user selects a report type from the dropdown","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":25,"keywordType":"Action","textWithKeyword":"And the user generates the report","stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"Then report data should be displayed in the Ag-Grid","stepMatchArguments":[]}]},
  {"pwTestLine":24,"pickleLine":30,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-210"],"steps":[{"pwStepLine":25,"gherkinStepLine":31,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":32,"keywordType":"Context","textWithKeyword":"And the user navigates to the Report page","stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":33,"keywordType":"Context","textWithKeyword":"And the user selects a valid date range","stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":34,"keywordType":"Action","textWithKeyword":"When the user selects the \"Corr and AccountNo\" grouping level","stepMatchArguments":[{"group":{"start":21,"value":"\"Corr and AccountNo\"","children":[{"start":22,"value":"Corr and AccountNo","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":29,"gherkinStepLine":35,"keywordType":"Action","textWithKeyword":"And the user generates the report","stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":36,"keywordType":"Outcome","textWithKeyword":"Then the Ag-Grid should display data grouped by Corr and AccountNo","stepMatchArguments":[]}]},
  {"pwTestLine":33,"pickleLine":40,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-210"],"steps":[{"pwStepLine":34,"gherkinStepLine":41,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":35,"gherkinStepLine":42,"keywordType":"Context","textWithKeyword":"And the user navigates to the Report page","stepMatchArguments":[]},{"pwStepLine":36,"gherkinStepLine":43,"keywordType":"Context","textWithKeyword":"And the user selects a valid date range","stepMatchArguments":[]},{"pwStepLine":37,"gherkinStepLine":44,"keywordType":"Action","textWithKeyword":"When the user selects the \"Corr and Symbol\" grouping level","stepMatchArguments":[{"group":{"start":21,"value":"\"Corr and Symbol\"","children":[{"start":22,"value":"Corr and Symbol","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":38,"gherkinStepLine":45,"keywordType":"Action","textWithKeyword":"And the user generates the report","stepMatchArguments":[]},{"pwStepLine":39,"gherkinStepLine":46,"keywordType":"Outcome","textWithKeyword":"Then the Ag-Grid should display data grouped by Corr and Symbol","stepMatchArguments":[]}]},
  {"pwTestLine":42,"pickleLine":50,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-210"],"steps":[{"pwStepLine":43,"gherkinStepLine":51,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":44,"gherkinStepLine":52,"keywordType":"Context","textWithKeyword":"And the user navigates to the Report page","stepMatchArguments":[]},{"pwStepLine":45,"gherkinStepLine":53,"keywordType":"Context","textWithKeyword":"And the user selects a valid date range","stepMatchArguments":[]},{"pwStepLine":46,"gherkinStepLine":54,"keywordType":"Action","textWithKeyword":"When the user selects the \"Office and Symbol\" grouping level","stepMatchArguments":[{"group":{"start":21,"value":"\"Office and Symbol\"","children":[{"start":22,"value":"Office and Symbol","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":47,"gherkinStepLine":55,"keywordType":"Action","textWithKeyword":"And the user generates the report","stepMatchArguments":[]},{"pwStepLine":48,"gherkinStepLine":56,"keywordType":"Outcome","textWithKeyword":"Then the Ag-Grid should display data grouped by Office and Symbol","stepMatchArguments":[]}]},
  {"pwTestLine":51,"pickleLine":60,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-210"],"steps":[{"pwStepLine":52,"gherkinStepLine":61,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":53,"gherkinStepLine":62,"keywordType":"Context","textWithKeyword":"And the user navigates to the Report page","stepMatchArguments":[]},{"pwStepLine":54,"gherkinStepLine":63,"keywordType":"Context","textWithKeyword":"And the user selects a valid date range","stepMatchArguments":[]},{"pwStepLine":55,"gherkinStepLine":64,"keywordType":"Action","textWithKeyword":"When the user selects the \"Office and AccountNo\" grouping level","stepMatchArguments":[{"group":{"start":21,"value":"\"Office and AccountNo\"","children":[{"start":22,"value":"Office and AccountNo","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":56,"gherkinStepLine":65,"keywordType":"Action","textWithKeyword":"And the user generates the report","stepMatchArguments":[]},{"pwStepLine":57,"gherkinStepLine":66,"keywordType":"Outcome","textWithKeyword":"Then the Ag-Grid should display data grouped by Office and AccountNo","stepMatchArguments":[]}]},
  {"pwTestLine":60,"pickleLine":72,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-210"],"steps":[{"pwStepLine":61,"gherkinStepLine":73,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":62,"gherkinStepLine":74,"keywordType":"Action","textWithKeyword":"When the user navigates to the Report page","stepMatchArguments":[]},{"pwStepLine":63,"gherkinStepLine":75,"keywordType":"Outcome","textWithKeyword":"Then the Report Type dropdown should default to the single available report","stepMatchArguments":[]}]},
  {"pwTestLine":66,"pickleLine":79,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-210"],"steps":[{"pwStepLine":67,"gherkinStepLine":80,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":68,"gherkinStepLine":81,"keywordType":"Context","textWithKeyword":"And the user navigates to the Report page","stepMatchArguments":[]},{"pwStepLine":69,"gherkinStepLine":82,"keywordType":"Action","textWithKeyword":"When the user opens the Report Type dropdown","stepMatchArguments":[]},{"pwStepLine":70,"gherkinStepLine":83,"keywordType":"Action","textWithKeyword":"And the user selects a report type","stepMatchArguments":[]},{"pwStepLine":71,"gherkinStepLine":84,"keywordType":"Outcome","textWithKeyword":"Then the selected report type should be displayed in the dropdown","stepMatchArguments":[]}]},
  {"pwTestLine":74,"pickleLine":90,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-210"],"steps":[{"pwStepLine":75,"gherkinStepLine":91,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":76,"gherkinStepLine":92,"keywordType":"Context","textWithKeyword":"And the user navigates to the Report page","stepMatchArguments":[]},{"pwStepLine":77,"gherkinStepLine":93,"keywordType":"Action","textWithKeyword":"When the user sets both From Date and To Date to the same date","stepMatchArguments":[]},{"pwStepLine":78,"gherkinStepLine":94,"keywordType":"Action","textWithKeyword":"And the user generates the report","stepMatchArguments":[]},{"pwStepLine":79,"gherkinStepLine":95,"keywordType":"Outcome","textWithKeyword":"Then report data for that single day should be displayed in the Ag-Grid","stepMatchArguments":[]}]},
  {"pwTestLine":82,"pickleLine":99,"tags":["@smokeBDD","@Regression","@SLL-210"],"steps":[{"pwStepLine":83,"gherkinStepLine":100,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":84,"gherkinStepLine":101,"keywordType":"Context","textWithKeyword":"And the user navigates to the Report page","stepMatchArguments":[]},{"pwStepLine":85,"gherkinStepLine":102,"keywordType":"Action","textWithKeyword":"When the user selects a From Date several months before the To Date","stepMatchArguments":[]},{"pwStepLine":86,"gherkinStepLine":103,"keywordType":"Action","textWithKeyword":"And the user generates the report","stepMatchArguments":[]},{"pwStepLine":87,"gherkinStepLine":104,"keywordType":"Outcome","textWithKeyword":"Then report data for the entire date range should be displayed in the Ag-Grid","stepMatchArguments":[]}]},
  {"pwTestLine":90,"pickleLine":108,"tags":["@smokeBDD","@Regression","@SLL-210"],"steps":[{"pwStepLine":91,"gherkinStepLine":109,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":92,"gherkinStepLine":110,"keywordType":"Context","textWithKeyword":"And the user navigates to the Report page","stepMatchArguments":[]},{"pwStepLine":93,"gherkinStepLine":111,"keywordType":"Context","textWithKeyword":"And the user has already generated a report for a date range","stepMatchArguments":[]},{"pwStepLine":94,"gherkinStepLine":112,"keywordType":"Action","textWithKeyword":"When the user selects a different date range","stepMatchArguments":[]},{"pwStepLine":95,"gherkinStepLine":113,"keywordType":"Action","textWithKeyword":"And the user generates the report again","stepMatchArguments":[]},{"pwStepLine":96,"gherkinStepLine":114,"keywordType":"Outcome","textWithKeyword":"Then the Ag-Grid should refresh and display data for the new date range","stepMatchArguments":[]}]},
  {"pwTestLine":99,"pickleLine":120,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-210"],"steps":[{"pwStepLine":100,"gherkinStepLine":121,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":101,"gherkinStepLine":122,"keywordType":"Context","textWithKeyword":"And the user navigates to the Report page","stepMatchArguments":[]},{"pwStepLine":102,"gherkinStepLine":123,"keywordType":"Action","textWithKeyword":"When the user selects a From Date that is after the To Date","stepMatchArguments":[]},{"pwStepLine":103,"gherkinStepLine":124,"keywordType":"Action","textWithKeyword":"And the user attempts to generate the report","stepMatchArguments":[]},{"pwStepLine":104,"gherkinStepLine":125,"keywordType":"Outcome","textWithKeyword":"Then a validation error should be displayed indicating From Date cannot be after To Date","stepMatchArguments":[]},{"pwStepLine":105,"gherkinStepLine":126,"keywordType":"Outcome","textWithKeyword":"And the report should not be generated","stepMatchArguments":[]}]},
  {"pwTestLine":108,"pickleLine":130,"tags":["@smokeBDD","@Regression","@SLL-210"],"steps":[{"pwStepLine":109,"gherkinStepLine":131,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":110,"gherkinStepLine":132,"keywordType":"Context","textWithKeyword":"And the user navigates to the Report page","stepMatchArguments":[]},{"pwStepLine":111,"gherkinStepLine":133,"keywordType":"Action","textWithKeyword":"When the user selects only a To Date without entering a From Date","stepMatchArguments":[]},{"pwStepLine":112,"gherkinStepLine":134,"keywordType":"Action","textWithKeyword":"And the user attempts to generate the report","stepMatchArguments":[]},{"pwStepLine":113,"gherkinStepLine":135,"keywordType":"Outcome","textWithKeyword":"Then report generation should be blocked or a validation error should be displayed","stepMatchArguments":[]}]},
  {"pwTestLine":116,"pickleLine":139,"tags":["@smokeBDD","@Regression","@SLL-210"],"steps":[{"pwStepLine":117,"gherkinStepLine":140,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":118,"gherkinStepLine":141,"keywordType":"Context","textWithKeyword":"And the user navigates to the Report page","stepMatchArguments":[]},{"pwStepLine":119,"gherkinStepLine":142,"keywordType":"Action","textWithKeyword":"When the user selects only a From Date without entering a To Date","stepMatchArguments":[]},{"pwStepLine":120,"gherkinStepLine":143,"keywordType":"Action","textWithKeyword":"And the user attempts to generate the report","stepMatchArguments":[]},{"pwStepLine":121,"gherkinStepLine":144,"keywordType":"Outcome","textWithKeyword":"Then report generation should be blocked or a validation error should be displayed","stepMatchArguments":[]}]},
  {"pwTestLine":124,"pickleLine":148,"tags":["@smokeBDD","@Regression","@SLL-210"],"steps":[{"pwStepLine":125,"gherkinStepLine":149,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":126,"gherkinStepLine":150,"keywordType":"Context","textWithKeyword":"And the user navigates to the Report page","stepMatchArguments":[]},{"pwStepLine":127,"gherkinStepLine":151,"keywordType":"Action","textWithKeyword":"When the user enters an invalid date format in the From Date picker","stepMatchArguments":[]},{"pwStepLine":128,"gherkinStepLine":152,"keywordType":"Outcome","textWithKeyword":"Then a validation error should be displayed for the From Date field","stepMatchArguments":[]}]},
  {"pwTestLine":131,"pickleLine":156,"tags":["@smokeBDD","@Regression","@SLL-210"],"steps":[{"pwStepLine":132,"gherkinStepLine":157,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":133,"gherkinStepLine":158,"keywordType":"Context","textWithKeyword":"And the user navigates to the Report page","stepMatchArguments":[]},{"pwStepLine":134,"gherkinStepLine":159,"keywordType":"Action","textWithKeyword":"When the user enters an invalid date format in the To Date picker","stepMatchArguments":[]},{"pwStepLine":135,"gherkinStepLine":160,"keywordType":"Outcome","textWithKeyword":"Then a validation error should be displayed for the To Date field","stepMatchArguments":[]}]},
  {"pwTestLine":138,"pickleLine":166,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-210"],"steps":[{"pwStepLine":139,"gherkinStepLine":167,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":140,"gherkinStepLine":168,"keywordType":"Action","textWithKeyword":"When the user navigates to the Report page","stepMatchArguments":[]},{"pwStepLine":141,"gherkinStepLine":169,"keywordType":"Outcome","textWithKeyword":"Then the grouping selector should offer \"Corr and AccountNo\", \"Corr and Symbol\", \"Office and Symbol\", and \"Office and AccountNo\" options","stepMatchArguments":[]}]},
  {"pwTestLine":144,"pickleLine":173,"tags":["@smokeBDD","@Regression","@SLL-210"],"steps":[{"pwStepLine":145,"gherkinStepLine":174,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":146,"gherkinStepLine":175,"keywordType":"Context","textWithKeyword":"And the user navigates to the Report page","stepMatchArguments":[]},{"pwStepLine":147,"gherkinStepLine":176,"keywordType":"Context","textWithKeyword":"And the user has generated a report with \"Corr and AccountNo\" grouping","stepMatchArguments":[{"group":{"start":37,"value":"\"Corr and AccountNo\"","children":[{"start":38,"value":"Corr and AccountNo","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":148,"gherkinStepLine":177,"keywordType":"Action","textWithKeyword":"When the user switches the grouping to \"Office and Symbol\"","stepMatchArguments":[{"group":{"start":34,"value":"\"Office and Symbol\"","children":[{"start":35,"value":"Office and Symbol","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":149,"gherkinStepLine":178,"keywordType":"Action","textWithKeyword":"And the user regenerates the report","stepMatchArguments":[]},{"pwStepLine":150,"gherkinStepLine":179,"keywordType":"Outcome","textWithKeyword":"Then the Ag-Grid should display data regrouped by Office and Symbol","stepMatchArguments":[]}]},
  {"pwTestLine":153,"pickleLine":183,"tags":["@smokeBDD","@Regression","@SLL-210"],"steps":[{"pwStepLine":154,"gherkinStepLine":184,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":155,"gherkinStepLine":185,"keywordType":"Context","textWithKeyword":"And the user navigates to the Report page","stepMatchArguments":[]},{"pwStepLine":156,"gherkinStepLine":186,"keywordType":"Context","textWithKeyword":"And the user generates a report with any grouping level","stepMatchArguments":[]},{"pwStepLine":157,"gherkinStepLine":187,"keywordType":"Action","textWithKeyword":"When the user expands a group row in the Ag-Grid","stepMatchArguments":[]},{"pwStepLine":158,"gherkinStepLine":188,"keywordType":"Outcome","textWithKeyword":"Then the child records for that group should be displayed","stepMatchArguments":[]}]},
  {"pwTestLine":161,"pickleLine":192,"tags":["@smokeBDD","@Regression","@SLL-210"],"steps":[{"pwStepLine":162,"gherkinStepLine":193,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":163,"gherkinStepLine":194,"keywordType":"Context","textWithKeyword":"And the user navigates to the Report page","stepMatchArguments":[]},{"pwStepLine":164,"gherkinStepLine":195,"keywordType":"Context","textWithKeyword":"And the user generates a report with any grouping level","stepMatchArguments":[]},{"pwStepLine":165,"gherkinStepLine":196,"keywordType":"Context","textWithKeyword":"And the user has expanded a group row","stepMatchArguments":[]},{"pwStepLine":166,"gherkinStepLine":197,"keywordType":"Action","textWithKeyword":"When the user collapses the group row","stepMatchArguments":[]},{"pwStepLine":167,"gherkinStepLine":198,"keywordType":"Outcome","textWithKeyword":"Then the child records for that group should be hidden","stepMatchArguments":[]}]},
  {"pwTestLine":170,"pickleLine":204,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-210"],"steps":[{"pwStepLine":171,"gherkinStepLine":205,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":172,"gherkinStepLine":206,"keywordType":"Action","textWithKeyword":"When the user navigates to the Report page","stepMatchArguments":[]},{"pwStepLine":173,"gherkinStepLine":207,"keywordType":"Outcome","textWithKeyword":"Then the data grid should be an Ag-Grid component","stepMatchArguments":[]}]},
  {"pwTestLine":176,"pickleLine":211,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-210"],"steps":[{"pwStepLine":177,"gherkinStepLine":212,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":178,"gherkinStepLine":213,"keywordType":"Action","textWithKeyword":"When the user navigates to the Report page","stepMatchArguments":[]},{"pwStepLine":179,"gherkinStepLine":214,"keywordType":"Outcome","textWithKeyword":"Then the From Date picker, To Date picker, and Report Type dropdown should display with theme-aware styling","stepMatchArguments":[]}]},
  {"pwTestLine":182,"pickleLine":218,"tags":["@smokeBDD","@Regression","@SLL-210"],"steps":[{"pwStepLine":183,"gherkinStepLine":219,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":184,"gherkinStepLine":220,"keywordType":"Action","textWithKeyword":"When the user navigates to the Report page","stepMatchArguments":[]},{"pwStepLine":185,"gherkinStepLine":221,"keywordType":"Outcome","textWithKeyword":"Then the filters, grouping controls, and data grid should all be visible on a single screen","stepMatchArguments":[]}]},
  {"pwTestLine":188,"pickleLine":227,"tags":["@smokeBDD","@Regression","@SLL-210"],"steps":[{"pwStepLine":189,"gherkinStepLine":228,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":190,"gherkinStepLine":229,"keywordType":"Context","textWithKeyword":"And the user navigates to the Report page","stepMatchArguments":[]},{"pwStepLine":191,"gherkinStepLine":230,"keywordType":"Action","textWithKeyword":"When the user selects a date range that contains no data","stepMatchArguments":[]},{"pwStepLine":192,"gherkinStepLine":231,"keywordType":"Action","textWithKeyword":"And the user generates the report","stepMatchArguments":[]},{"pwStepLine":193,"gherkinStepLine":232,"keywordType":"Outcome","textWithKeyword":"Then the report grid should display an empty state or no results message","stepMatchArguments":[]}]},
  {"pwTestLine":196,"pickleLine":236,"tags":["@smokeBDD","@Regression","@SLL-210"],"steps":[{"pwStepLine":197,"gherkinStepLine":237,"keywordType":"Context","textWithKeyword":"Given the user is logged in to the application","stepMatchArguments":[]},{"pwStepLine":198,"gherkinStepLine":238,"keywordType":"Context","textWithKeyword":"And the user navigates to the Report page","stepMatchArguments":[]},{"pwStepLine":199,"gherkinStepLine":239,"keywordType":"Context","textWithKeyword":"And the user has generated a report","stepMatchArguments":[]},{"pwStepLine":200,"gherkinStepLine":240,"keywordType":"Action","textWithKeyword":"When the user clears the date range inputs","stepMatchArguments":[]},{"pwStepLine":201,"gherkinStepLine":241,"keywordType":"Outcome","textWithKeyword":"Then the Ag-Grid should reset or no data should be displayed","stepMatchArguments":[]}]},
  {"pwTestLine":204,"pickleLine":247,"tags":["@smokeBDD","@Smoke","@Regression","@SLL-210"],"steps":[{"pwStepLine":205,"gherkinStepLine":248,"keywordType":"Context","textWithKeyword":"Given the user navigates to the application","stepMatchArguments":[]},{"pwStepLine":206,"gherkinStepLine":249,"keywordType":"Action","textWithKeyword":"When the user logs in with valid credentials","stepMatchArguments":[]},{"pwStepLine":207,"gherkinStepLine":250,"keywordType":"Outcome","textWithKeyword":"Then the user should be redirected to the dashboard","stepMatchArguments":[]},{"pwStepLine":208,"gherkinStepLine":251,"keywordType":"Action","textWithKeyword":"When the user navigates to the Report page","stepMatchArguments":[]},{"pwStepLine":209,"gherkinStepLine":252,"keywordType":"Outcome","textWithKeyword":"Then the From Date picker, To Date picker, and Report Type dropdown should be visible","stepMatchArguments":[]},{"pwStepLine":210,"gherkinStepLine":253,"keywordType":"Action","textWithKeyword":"When the user selects a valid From Date","stepMatchArguments":[]},{"pwStepLine":211,"gherkinStepLine":254,"keywordType":"Action","textWithKeyword":"And the user selects a To Date that is after the From Date","stepMatchArguments":[]},{"pwStepLine":212,"gherkinStepLine":255,"keywordType":"Action","textWithKeyword":"And the user selects the \"Corr and AccountNo\" grouping level","stepMatchArguments":[{"group":{"start":21,"value":"\"Corr and AccountNo\"","children":[{"start":22,"value":"Corr and AccountNo","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":213,"gherkinStepLine":256,"keywordType":"Action","textWithKeyword":"And the user generates the report","stepMatchArguments":[]},{"pwStepLine":214,"gherkinStepLine":257,"keywordType":"Outcome","textWithKeyword":"Then report data should be displayed in the Ag-Grid grouped by Corr and AccountNo","stepMatchArguments":[]},{"pwStepLine":215,"gherkinStepLine":258,"keywordType":"Action","textWithKeyword":"When the user expands a group row in the Ag-Grid","stepMatchArguments":[]},{"pwStepLine":216,"gherkinStepLine":259,"keywordType":"Outcome","textWithKeyword":"Then child records for that group should be visible","stepMatchArguments":[]},{"pwStepLine":217,"gherkinStepLine":260,"keywordType":"Action","textWithKeyword":"When the user switches the grouping to \"Office and Symbol\"","stepMatchArguments":[{"group":{"start":34,"value":"\"Office and Symbol\"","children":[{"start":35,"value":"Office and Symbol","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":218,"gherkinStepLine":261,"keywordType":"Action","textWithKeyword":"And the user regenerates the report","stepMatchArguments":[]},{"pwStepLine":219,"gherkinStepLine":262,"keywordType":"Outcome","textWithKeyword":"Then the Ag-Grid should display data regrouped by Office and Symbol","stepMatchArguments":[]}]},
]; // bdd-data-end