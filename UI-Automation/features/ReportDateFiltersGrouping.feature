Feature: Report Component — Date Filters & Dynamic Grouping (SLL-210)
  As an authorized user of SLS V2
  I want to generate reports using date range filters and dynamic grouping levels
  So that I can view and analyse organisational data grouped by Corr, Office, Symbol, and AccountNo

  # ── Happy Path ───────────────────────────────────────

  # Precondition: User is authenticated; Report page is accessible
  @smokeBDD @Smoke @Regression @SLL-210
  Scenario: User navigates to the Report page and the filter controls are displayed
    Given the user is logged in to the application
    When the user navigates to the Report page
    Then the From Date picker should be visible
    And the To Date picker should be visible
    And the Report Type dropdown should be visible

  # Precondition: User is authenticated; Report page is open
  @smokeBDD @Smoke @Regression @SLL-210
  Scenario: User selects a valid date range and generates a report successfully
    Given the user is logged in to the application
    And the user navigates to the Report page
    When the user selects a valid From Date
    And the user selects a To Date that is after the From Date
    And the user selects a report type from the dropdown
    And the user generates the report
    Then report data should be displayed in the Ag-Grid

  # Precondition: User is authenticated; valid date range is selected
  @smokeBDD @Smoke @Regression @SLL-210
  Scenario: User selects grouping by Corr and AccountNo and the grid reflects this grouping
    Given the user is logged in to the application
    And the user navigates to the Report page
    And the user selects a valid date range
    When the user selects the "Corr and AccountNo" grouping level
    And the user generates the report
    Then the Ag-Grid should display data grouped by Corr and AccountNo

  # Precondition: User is authenticated; valid date range is selected
  @smokeBDD @Smoke @Regression @SLL-210
  Scenario: User selects grouping by Corr and Symbol and the grid reflects this grouping
    Given the user is logged in to the application
    And the user navigates to the Report page
    And the user selects a valid date range
    When the user selects the "Corr and Symbol" grouping level
    And the user generates the report
    Then the Ag-Grid should display data grouped by Corr and Symbol

  # Precondition: User is authenticated; valid date range is selected
  @smokeBDD @Smoke @Regression @SLL-210
  Scenario: User selects grouping by Office and Symbol and the grid reflects this grouping
    Given the user is logged in to the application
    And the user navigates to the Report page
    And the user selects a valid date range
    When the user selects the "Office and Symbol" grouping level
    And the user generates the report
    Then the Ag-Grid should display data grouped by Office and Symbol

  # Precondition: User is authenticated; valid date range is selected
  @smokeBDD @Smoke @Regression @SLL-210
  Scenario: User selects grouping by Office and AccountNo and the grid reflects this grouping
    Given the user is logged in to the application
    And the user navigates to the Report page
    And the user selects a valid date range
    When the user selects the "Office and AccountNo" grouping level
    And the user generates the report
    Then the Ag-Grid should display data grouped by Office and AccountNo

  # ── Report Type Selection ────────────────────────────

  # Precondition: User is authenticated; Report page has just loaded
  @smokeBDD @Smoke @Regression @SLL-210
  Scenario: Report Type dropdown defaults to the available report on page load
    Given the user is logged in to the application
    When the user navigates to the Report page
    Then the Report Type dropdown should default to the single available report

  # Precondition: User is authenticated; Report page is open
  @smokeBDD @Smoke @Regression @SLL-210
  Scenario: User selects a report type from the dropdown and the selection is reflected
    Given the user is logged in to the application
    And the user navigates to the Report page
    When the user opens the Report Type dropdown
    And the user selects a report type
    Then the selected report type should be displayed in the dropdown

  # ── Date Range Filtering ─────────────────────────────

  # Precondition: User is authenticated; Report page is open
  @smokeBDD @Smoke @Regression @SLL-210
  Scenario: User sets From Date and To Date to the same day and report generates successfully
    Given the user is logged in to the application
    And the user navigates to the Report page
    When the user sets both From Date and To Date to the same date
    And the user generates the report
    Then report data for that single day should be displayed in the Ag-Grid

  # Precondition: User is authenticated; Report page is open
  @smokeBDD @Regression @SLL-210
  Scenario: User sets a wide date range spanning multiple months and report loads correctly
    Given the user is logged in to the application
    And the user navigates to the Report page
    When the user selects a From Date several months before the To Date
    And the user generates the report
    Then report data for the entire date range should be displayed in the Ag-Grid

  # Precondition: User is authenticated; a report has already been generated
  @smokeBDD @Regression @SLL-210
  Scenario: Changing the date range and regenerating updates the grid with new results
    Given the user is logged in to the application
    And the user navigates to the Report page
    And the user has already generated a report for a date range
    When the user selects a different date range
    And the user generates the report again
    Then the Ag-Grid should refresh and display data for the new date range

  # ── Date Validation ──────────────────────────────────

  # Precondition: User is authenticated; Report page is open
  @smokeBDD @Smoke @Regression @SLL-210
  Scenario: From Date set after To Date triggers a validation error and blocks report generation
    Given the user is logged in to the application
    And the user navigates to the Report page
    When the user selects a From Date that is after the To Date
    And the user attempts to generate the report
    Then a validation error should be displayed indicating From Date cannot be after To Date
    And the report should not be generated

  # Precondition: User is authenticated; Report page is open
  @smokeBDD @Regression @SLL-210
  Scenario: Report generation is blocked when From Date is missing
    Given the user is logged in to the application
    And the user navigates to the Report page
    When the user selects only a To Date without entering a From Date
    And the user attempts to generate the report
    Then report generation should be blocked or a validation error should be displayed

  # Precondition: User is authenticated; Report page is open
  @smokeBDD @Regression @SLL-210
  Scenario: Report generation is blocked when To Date is missing
    Given the user is logged in to the application
    And the user navigates to the Report page
    When the user selects only a From Date without entering a To Date
    And the user attempts to generate the report
    Then report generation should be blocked or a validation error should be displayed

  # Precondition: User is authenticated; Report page is open
  @smokeBDD @Regression @SLL-210
  Scenario: Invalid date format entered in From Date picker shows a validation error
    Given the user is logged in to the application
    And the user navigates to the Report page
    When the user enters an invalid date format in the From Date picker
    Then a validation error should be displayed for the From Date field

  # Precondition: User is authenticated; Report page is open
  @smokeBDD @Regression @SLL-210
  Scenario: Invalid date format entered in To Date picker shows a validation error
    Given the user is logged in to the application
    And the user navigates to the Report page
    When the user enters an invalid date format in the To Date picker
    Then a validation error should be displayed for the To Date field

  # ── Grouping Behavior ────────────────────────────────

  # Precondition: User is authenticated; Report page is open
  @smokeBDD @Smoke @Regression @SLL-210
  Scenario: All four grouping options are available for selection
    Given the user is logged in to the application
    When the user navigates to the Report page
    Then the grouping selector should offer "Corr and AccountNo", "Corr and Symbol", "Office and Symbol", and "Office and AccountNo" options

  # Precondition: User is authenticated; a report has been generated with Corr and AccountNo grouping
  @smokeBDD @Regression @SLL-210
  Scenario: Switching grouping level after report generation refreshes the grid with the new grouping
    Given the user is logged in to the application
    And the user navigates to the Report page
    And the user has generated a report with "Corr and AccountNo" grouping
    When the user switches the grouping to "Office and Symbol"
    And the user regenerates the report
    Then the Ag-Grid should display data regrouped by Office and Symbol

  # Precondition: User is authenticated; report has been generated with any grouping level
  @smokeBDD @Regression @SLL-210
  Scenario: Ag-Grid group rows can be expanded to show child records
    Given the user is logged in to the application
    And the user navigates to the Report page
    And the user generates a report with any grouping level
    When the user expands a group row in the Ag-Grid
    Then the child records for that group should be displayed

  # Precondition: User is authenticated; a group row has been expanded
  @smokeBDD @Regression @SLL-210
  Scenario: Ag-Grid group rows can be collapsed to hide child records
    Given the user is logged in to the application
    And the user navigates to the Report page
    And the user generates a report with any grouping level
    And the user has expanded a group row
    When the user collapses the group row
    Then the child records for that group should be hidden

  # ── UI & Design ──────────────────────────────────────

  # Precondition: User is authenticated; Report page is open
  @smokeBDD @Smoke @Regression @SLL-210
  Scenario: Report page uses Ag-Grid for data display and grouping
    Given the user is logged in to the application
    When the user navigates to the Report page
    Then the data grid should be an Ag-Grid component

  # Precondition: User is authenticated; Report page is open
  @smokeBDD @Smoke @Regression @SLL-210
  Scenario: Date pickers and form controls use theme-aware SLS V2 styling
    Given the user is logged in to the application
    When the user navigates to the Report page
    Then the From Date picker, To Date picker, and Report Type dropdown should display with theme-aware styling

  # Precondition: User is authenticated; Report page is open
  @smokeBDD @Regression @SLL-210
  Scenario: Report page maintains a clean single-view layout consistent with V2 design
    Given the user is logged in to the application
    When the user navigates to the Report page
    Then the filters, grouping controls, and data grid should all be visible on a single screen

  # ── Empty State & Edge Cases ─────────────────────────

  # Precondition: User is authenticated; date range with no data is known
  @smokeBDD @Regression @SLL-210
  Scenario: Report generated for a date range with no data shows an empty state in the grid
    Given the user is logged in to the application
    And the user navigates to the Report page
    When the user selects a date range that contains no data
    And the user generates the report
    Then the report grid should display an empty state or no results message

  # Precondition: User is authenticated; a report has been generated
  @smokeBDD @Regression @SLL-210
  Scenario: Report page resets the grid when filter inputs are cleared
    Given the user is logged in to the application
    And the user navigates to the Report page
    And the user has generated a report
    When the user clears the date range inputs
    Then the Ag-Grid should reset or no data should be displayed

  # ── End-to-End ───────────────────────────────────────

  # Precondition: Fresh session; valid credentials; Report page accessible
  @smokeBDD @Smoke @Regression @SLL-210
  Scenario: Full lifecycle — select date range, select grouping, generate report, expand groups, change grouping, regenerate
    Given the user navigates to the application
    When the user logs in with valid credentials
    Then the user should be redirected to the dashboard
    When the user navigates to the Report page
    Then the From Date picker, To Date picker, and Report Type dropdown should be visible
    When the user selects a valid From Date
    And the user selects a To Date that is after the From Date
    And the user selects the "Corr and AccountNo" grouping level
    And the user generates the report
    Then report data should be displayed in the Ag-Grid grouped by Corr and AccountNo
    When the user expands a group row in the Ag-Grid
    Then child records for that group should be visible
    When the user switches the grouping to "Office and Symbol"
    And the user regenerates the report
    Then the Ag-Grid should display data regrouped by Office and Symbol
