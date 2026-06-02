import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { test } from './fixtures.js';

const { Given, When, Then } = createBdd(test);

// ── Navigation ────────────────────────────────────────────────────────────────

When('the user navigates to the Report page', async ({ reportPage }) => {
  await reportPage.navigateToPage();
});

// ── Filter Controls Visibility ────────────────────────────────────────────────

Then('the From Date picker should be visible', async ({ reportPage }) => {
  await reportPage.verifyFromDateVisible();
});

Then('the To Date picker should be visible', async ({ reportPage }) => {
  await reportPage.verifyToDateVisible();
});

Then('the Report Type dropdown should be visible', async ({ reportPage }) => {
  await reportPage.verifyReportTypeDropdownVisible();
});

Then('the From Date picker, To Date picker, and Report Type dropdown should be visible', async ({ reportPage }) => {
  await reportPage.verifyFilterControlsVisible();
});

Then('the From Date picker, To Date picker, and Report Type dropdown should display with theme-aware styling', async ({ reportPage }) => {
  await reportPage.verifyThemeStyling();
});

// ── Date Input Steps ──────────────────────────────────────────────────────────

When('the user selects a valid From Date', async ({ reportPage }) => {
  await reportPage.selectFromDate(reportPage.validFromDate);
});

When('the user selects a To Date that is after the From Date', async ({ reportPage }) => {
  await reportPage.selectToDate(reportPage.validToDate);
});

When('the user selects a valid date range', async ({ reportPage }) => {
  await reportPage.selectValidDateRange();
});

When('the user sets both From Date and To Date to the same date', async ({ reportPage }) => {
  await reportPage.selectSameDayRange();
});

When('the user selects a From Date several months before the To Date', async ({ reportPage }) => {
  await reportPage.selectWideDateRange();
});

When('the user selects a From Date that is after the To Date', async ({ reportPage }) => {
  await reportPage.selectReversedDateRange();
});

When('the user selects only a To Date without entering a From Date', async ({ reportPage }) => {
  await reportPage.selectOnlyToDate();
});

When('the user selects only a From Date without entering a To Date', async ({ reportPage }) => {
  await reportPage.selectOnlyFromDate();
});

When('the user enters an invalid date format in the From Date picker', async ({ reportPage }) => {
  await reportPage.enterInvalidFromDate();
});

When('the user enters an invalid date format in the To Date picker', async ({ reportPage }) => {
  await reportPage.enterInvalidToDate();
});

When('the user selects a different date range', async ({ reportPage }) => {
  await reportPage.selectWideDateRange();
});

When('the user clears the date range inputs', async ({ reportPage }) => {
  await reportPage.clearDateRange();
});

When('the user selects a date range that contains no data', async ({ reportPage }) => {
  await reportPage.selectFromDate(reportPage.emptyRangeFrom);
  await reportPage.selectToDate(reportPage.emptyRangeTo);
});

// ── Report Type Steps ─────────────────────────────────────────────────────────

When('the user selects a report type from the dropdown', async ({ reportPage }) => {
  await reportPage.selectReportType();
});

When('the user opens the Report Type dropdown', async ({ reportPage }) => {
  await reportPage.openReportTypeDropdown();
});

When('the user selects a report type', async ({ reportPage }) => {
  await reportPage.selectReportType();
});

Then('the Report Type dropdown should default to the single available report', async ({ reportPage }) => {
  await reportPage.verifyReportTypeDefault();
});

Then('the selected report type should be displayed in the dropdown', async ({ reportPage }) => {
  await reportPage.verifySelectedReportTypeReflected();
});

// ── Grouping Steps ────────────────────────────────────────────────────────────

When('the user selects the {string} grouping level', async ({ reportPage }, groupingLabel) => {
  await reportPage.selectGroupingLevel(groupingLabel);
});

When('the user switches the grouping to {string}', async ({ reportPage }, groupingLabel) => {
  await reportPage.selectGroupingLevel(groupingLabel);
});

Then('the grouping selector should offer "Corr and AccountNo", "Corr and Symbol", "Office and Symbol", and "Office and AccountNo" options', async ({ reportPage }) => {
  await reportPage.verifyAllGroupingOptionsPresent();
});

// Precondition steps that set up state before a scenario's When/Then
Given('the user has generated a report with {string} grouping', async ({ reportPage }, groupingLabel) => {
  await reportPage.navigateToPage();
  await reportPage.selectValidDateRange();
  await reportPage.selectReportType();
  await reportPage.selectGroupingLevel(groupingLabel);
  await reportPage.clickGenerate();
});

// ── Generate Report Steps ─────────────────────────────────────────────────────

When('the user generates the report', async ({ reportPage }) => {
  await reportPage.clickGenerate();
});

When('the user generates the report again', async ({ reportPage }) => {
  await reportPage.clickGenerate();
});

When('the user regenerates the report', async ({ reportPage }) => {
  await reportPage.clickGenerate();
});

When('the user generates a report with any grouping level', async ({ reportPage }) => {
  await reportPage.selectValidDateRange();
  await reportPage.selectGroupingLevel('Corr and Symbol');
  await reportPage.clickGenerate();
});

When('the user attempts to generate the report', async ({ reportPage }) => {
  await reportPage.clickGenerate();
});

// Precondition steps
Given('the user has already generated a report for a date range', async ({ reportPage }) => {
  await reportPage.selectValidDateRange();
  await reportPage.selectReportType();
  await reportPage.clickGenerate();
});

Given('the user has generated a report', async ({ reportPage }) => {
  await reportPage.selectValidDateRange();
  await reportPage.selectReportType();
  await reportPage.clickGenerate();
});

Given('the user has expanded a group row', async ({ reportPage }) => {
  await reportPage.expandFirstGroupRow();
});

// ── Grid & Data Assertion Steps ───────────────────────────────────────────────

Then('report data should be displayed in the Ag-Grid', async ({ reportPage }) => {
  await reportPage.verifyReportDataDisplayed();
});

Then('report data for that single day should be displayed in the Ag-Grid', async ({ reportPage }) => {
  await reportPage.verifyReportDataDisplayed();
});

Then('report data for the entire date range should be displayed in the Ag-Grid', async ({ reportPage }) => {
  await reportPage.verifyReportDataDisplayed();
});

Then('the Ag-Grid should refresh and display data for the new date range', async ({ reportPage }) => {
  await reportPage.verifyReportDataDisplayed();
});

Then('the Ag-Grid should display data grouped by Corr and AccountNo', async ({ reportPage }) => {
  await reportPage.verifyGroupedBy('Corr and AccountNo');
});

Then('the Ag-Grid should display data grouped by Corr and Symbol', async ({ reportPage }) => {
  await reportPage.verifyGroupedBy('Corr and Symbol');
});

Then('the Ag-Grid should display data grouped by Office and Symbol', async ({ reportPage }) => {
  await reportPage.verifyGroupedBy('Office and Symbol');
});

Then('the Ag-Grid should display data grouped by Office and AccountNo', async ({ reportPage }) => {
  await reportPage.verifyGroupedBy('Office and AccountNo');
});

Then('the Ag-Grid should display data regrouped by Office and Symbol', async ({ reportPage }) => {
  await reportPage.verifyGroupedBy('Office and Symbol');
});

Then('report data should be displayed in the Ag-Grid grouped by Corr and AccountNo', async ({ reportPage }) => {
  await reportPage.verifyGroupedBy('Corr and AccountNo');
});

Then('the data grid should be an Ag-Grid component', async ({ reportPage }) => {
  await reportPage.verifyAgGridComponent();
});

// ── Group Row Expand / Collapse ───────────────────────────────────────────────

When('the user expands a group row in the Ag-Grid', async ({ reportPage }) => {
  await reportPage.expandFirstGroupRow();
});

When('the user collapses the group row', async ({ reportPage }) => {
  await reportPage.collapseFirstGroupRow();
});

Then('the child records for that group should be displayed', async ({ reportPage }) => {
  await reportPage.verifyChildRecordsVisible();
});

Then('the child records for that group should be hidden', async ({ reportPage }) => {
  await reportPage.verifyChildRecordsHidden();
});

Then('child records for that group should be visible', async ({ reportPage }) => {
  await reportPage.verifyChildRecordsVisible();
});

// ── Validation Steps ──────────────────────────────────────────────────────────

Then('a validation error should be displayed indicating From Date cannot be after To Date', async ({ reportPage }) => {
  await reportPage.verifyDateRangeValidationError();
});

Then('the report should not be generated', async ({ reportPage }) => {
  await reportPage.verifyReportNotGenerated();
});

Then('report generation should be blocked or a validation error should be displayed', async ({ reportPage }) => {
  await reportPage.verifyGenerationBlocked();
});

Then('a validation error should be displayed for the From Date field', async ({ reportPage }) => {
  await reportPage.verifyFromDateError();
});

Then('a validation error should be displayed for the To Date field', async ({ reportPage }) => {
  await reportPage.verifyToDateError();
});

// ── Empty State & Reset ───────────────────────────────────────────────────────

Then('the report grid should display an empty state or no results message', async ({ reportPage }) => {
  await reportPage.verifyEmptyStateInGrid();
});

Then('the Ag-Grid should reset or no data should be displayed', async ({ reportPage }) => {
  await reportPage.verifyGridReset();
});

// ── Layout ────────────────────────────────────────────────────────────────────

Then('the filters, grouping controls, and data grid should all be visible on a single screen', async ({ reportPage }) => {
  await reportPage.verifySingleScreenLayout();
});
