Feature: Lending Pit UI Tweaks and Ag-Grid Migration (SLL-206)
  As a user of SLS V2
  I want the Lending Pit page to be visually consistent with the rest of the application
  So that the header, buttons, grid, and headings match the app-wide design system and Ag-Grid is used

  # ── Happy Path ───────────────────────────────────────

  # Precondition: User is authenticated; Lending Pit page is accessible with data
  @smokeBDD @Smoke @Regression @SLL-206
  Scenario: User navigates to Lending Pit page and it loads with Ag-Grid displaying data
    Given the user is logged in to the application
    When the user navigates to the Lending Pit Lookup page
    Then the Lending Pit Ag-Grid should be visible
    And the grid should display data rows

  # Precondition: User is authenticated; a valid symbol exists in the system
  @smokeBDD @Smoke @Regression @SLL-206
  Scenario: User searches for a valid symbol and results are displayed in Ag-Grid
    Given the user is logged in to the application
    When the user navigates to the Lending Pit Lookup page
    When the user enters a valid symbol in the search field
    And the user clicks the submit button
    Then the Lending Pit Ag-Grid should display matching results

  # ── Acceptance Criteria / UI Consistency ─────────────

  # Precondition: User is authenticated; Lending Pit page is open
  @smokeBDD @Smoke @Regression @SLL-206
  Scenario: Lending Pit page header styling is visually consistent with the rest of the application
    Given the user is logged in to the application
    When the user navigates to the Lending Pit Lookup page
    Then the Lending Pit page header should be visible with consistent styling

  # Precondition: User is authenticated; Lending Pit page is open
  @smokeBDD @Smoke @Regression @SLL-206
  Scenario: Lending Pit buttons are styled consistently with the rest of the application
    Given the user is logged in to the application
    When the user navigates to the Lending Pit Lookup page
    Then the Lending Pit page buttons should be visible with consistent styling

  # Precondition: User is authenticated; Lending Pit page is open
  @smokeBDD @Smoke @Regression @SLL-206
  Scenario: Lending Pit grid uses the Ag-Grid component instead of a legacy table
    Given the user is logged in to the application
    When the user navigates to the Lending Pit Lookup page
    Then the Lending Pit grid should use the Ag-Grid component

  # Precondition: User is authenticated; Lending Pit page is open
  @smokeBDD @Regression @SLL-206
  Scenario: Lending Pit headings are styled consistently with the rest of the application
    Given the user is logged in to the application
    When the user navigates to the Lending Pit Lookup page
    Then the Lending Pit page headings should be visible with consistent styling

  # Precondition: User is authenticated; Lending Pit page is open
  @smokeBDD @Regression @SLL-206
  Scenario: Lending Pit color scheme matches the application-wide design system
    Given the user is logged in to the application
    When the user navigates to the Lending Pit Lookup page
    Then the Lending Pit page container should have consistent theme colors applied

  # ── Business Rules & Restrictions ────────────────────

  # Precondition: User is authenticated; Lending Pit has search results
  @smokeBDD @Smoke @Regression @SLL-206
  Scenario: Ag-Grid displays the expected columns matching the previous grid
    Given the user is logged in to the application
    When the user navigates to the Lending Pit Lookup page
    When the user enters a valid symbol in the search field
    And the user clicks the submit button
    Then the results grid should display the "Symbol" column
    And the results grid should display the "Cusip" column
    And the results grid should display the "Description" column

  # Precondition: User is authenticated; Lending Pit page is open
  @smokeBDD @Smoke @Regression @SLL-206
  Scenario: Search functionality works correctly after switching to Ag-Grid
    Given the user is logged in to the application
    When the user navigates to the Lending Pit Lookup page
    When the user enters a valid symbol in the search field
    And the user clicks the submit button
    Then the Lending Pit Ag-Grid should display matching results
    And the grid should contain a row matching the searched symbol

  # Precondition: User is authenticated; Lending Pit page is open
  @smokeBDD @Regression @SLL-206
  Scenario: Ag-Grid column headers render correctly and match application styling
    Given the user is logged in to the application
    When the user navigates to the Lending Pit Lookup page
    Then the Ag-Grid header row should be visible with correctly styled column headers

  # Precondition: User is authenticated; Lending Pit has search results loaded
  @smokeBDD @Regression @SLL-206
  Scenario: Row data in Ag-Grid is correctly populated from SLS V1 endpoints
    Given the user is logged in to the application
    When the user navigates to the Lending Pit Lookup page
    When the user enters a valid symbol in the search field
    And the user clicks the submit button
    Then the Lending Pit Ag-Grid should display matching results
    And the grid rows should contain valid data values

  # ── Validation / Negative ────────────────────────────

  # Precondition: User is authenticated; Lending Pit page is open
  @smokeBDD @Regression @SLL-206
  Scenario: Search submitted with empty Symbol/CUSIP field — no results or validation state shown
    Given the user is logged in to the application
    When the user navigates to the Lending Pit Lookup page
    When the user clicks the submit button without entering a symbol
    Then the grid should display the empty state overlay or a validation message

  # Precondition: User is authenticated; Lending Pit page is open
  @smokeBDD @Regression @SLL-206
  Scenario: Search with an unknown symbol — Ag-Grid shows empty no-results overlay
    Given the user is logged in to the application
    When the user navigates to the Lending Pit Lookup page
    When the user enters "ZZZZINVALID" in the Lending Pit search field
    And the user clicks the submit button
    Then the Lending Pit Ag-Grid should display the empty state overlay

  # Precondition: User is authenticated; Lending Pit page is open
  @smokeBDD @Regression @SLL-206
  Scenario: Search with special characters in Symbol field is handled gracefully
    Given the user is logged in to the application
    When the user navigates to the Lending Pit Lookup page
    When the user enters "!@#$%" in the Lending Pit search field
    And the user clicks the submit button
    Then the page should not crash
    And the grid should display the empty state overlay or a validation message

  # ── Edge Cases ───────────────────────────────────────

  # Precondition: User is authenticated; Lending Pit page is freshly loaded with no search performed
  @smokeBDD @Regression @SLL-206
  Scenario: Ag-Grid empty state overlay is visible before any search is performed
    Given the user is logged in to the application
    When the user navigates to the Lending Pit Lookup page
    Then the Lending Pit Ag-Grid should display the empty state overlay

  # Precondition: User is authenticated; Lending Pit has results with many columns
  @smokeBDD @Regression @SLL-206
  Scenario: Ag-Grid columns remain correctly aligned after horizontal scrolling
    Given the user is logged in to the application
    When the user navigates to the Lending Pit Lookup page
    When the user enters a valid symbol in the search field
    And the user clicks the submit button
    Then the Lending Pit Ag-Grid should display matching results
    And the grid columns should remain correctly aligned

  # Precondition: User is authenticated; Lending Pit page is open
  @smokeBDD @Regression @SLL-206
  Scenario: Page retains visual consistency when browser viewport is resized
    Given the user is logged in to the application
    When the user navigates to the Lending Pit Lookup page
    Then the Lending Pit page container should have consistent theme colors applied

  # ── Data-Driven ──────────────────────────────────────

  # Precondition: User is authenticated; Lending Pit page is open
  @smokeBDD @Regression @SLL-206
  Scenario Outline: Multiple symbol searches with valid, invalid, and empty inputs
    Given the user is logged in to the application
    When the user navigates to the Lending Pit Lookup page
    When the user enters "<symbol>" in the Lending Pit search field
    And the user clicks the submit button
    Then the expected search outcome should be "<outcome>"

    Examples:
      | symbol       | outcome       |
      | AAPL         | results shown |
      | MSFT         | results shown |
      | TSLA         | results shown |
      | ZZZZINVALID  | empty grid    |
      |              | empty grid    |

  # ── End-to-End ───────────────────────────────────────

  # Precondition: Fresh session; valid credentials available; Lending Pit has data
  @smokeBDD @Smoke @Regression @SLL-206
  Scenario: Full lifecycle — login, navigate to Lending Pit, verify Ag-Grid and consistent styling, search symbol, verify results
    Given the user navigates to the application
    When the user logs in with valid credentials
    Then the user should be redirected to the dashboard
    When the user navigates to the Lending Pit Lookup page
    Then the Lending Pit page header should be visible with consistent styling
    And the Lending Pit grid should use the Ag-Grid component
    When the user enters a valid symbol in the search field
    And the user clicks the submit button
    Then the Lending Pit Ag-Grid should display matching results
    And the results grid should display the "Symbol" column
    And the results grid should display the "Cusip" column
    And the results grid should display the "Description" column
