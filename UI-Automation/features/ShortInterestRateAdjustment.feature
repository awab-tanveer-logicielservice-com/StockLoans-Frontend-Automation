Feature: Short Interest Rate Adjustment Component (SLL-203)
  As a user of SLS V2
  I want to adjust short interest rates via the Short Interest Rate Adjustment module
  So that I can precisely modify rates with data managed through Ag-Grid and synced with SLS V1 endpoints

  # ── Happy Path ───────────────────────────────────────

  # Precondition: User is authenticated and the Short Interest Rate Adjustment page is accessible
  @smokeBDD @Smoke @Regression @SLL-203
  Scenario: User navigates to Short Interest Rate Adjustment page and views data loaded in Ag-Grid
    Given the user is logged in to the application
    When the user navigates to the Short Interest Rate Adjustment page
    Then the Short Interest Rate Adjustment grid should be visible
    And the grid should display rate data loaded from SLS V1 endpoints

  # Precondition: User is authenticated with trade permissions; at least one rate record exists in the grid
  @smokeBDD @Smoke @Regression @SLL-203
  Scenario: Authorized user successfully adjusts a short interest rate and saves
    Given the user is logged in to the application
    And the user navigates to the Short Interest Rate Adjustment page
    When the user selects the first row in the rate adjustment grid
    And the user enters a new rate value of "2.50" in the rate input field
    And the user clicks the save button
    Then a success confirmation message should be displayed
    And the grid should reflect the updated rate value

  # ── Role-Based Access ────────────────────────────────

  # Precondition: User is authenticated with trade/admin permissions
  @smokeBDD @Smoke @Regression @SLL-203
  Scenario: Authorized trader user can edit rate cells in the adjustment grid
    Given the user is logged in to the application
    And the user navigates to the Short Interest Rate Adjustment page
    When the user selects the first row in the rate adjustment grid
    Then the rate input field should be editable

  # Precondition: User is authenticated with read-only permissions
  @smokeBDD @Regression @SLL-203
  Scenario: Read-only user cannot edit rate cells in the adjustment grid
    Given the user is logged in to the application
    And the user navigates to the Short Interest Rate Adjustment page
    When the user attempts to edit a rate cell
    Then the rate input field should not be editable
    And an access restriction message should be displayed

  # ── UI & Theme Consistency ───────────────────────────

  # Precondition: User is authenticated
  @smokeBDD @Smoke @Regression @SLL-203
  Scenario: Short Interest Rate Adjustment page displays correct Ag-Grid column headers
    Given the user is logged in to the application
    When the user navigates to the Short Interest Rate Adjustment page
    Then the grid header row should be visible with expected column names
    And the grid should use the Ag-Grid component for data management

  # Precondition: User is authenticated; application is in default theme
  @smokeBDD @Regression @SLL-203
  Scenario: Short Interest Rate Adjustment page renders with theme-aware styling consistent with V2 design system
    Given the user is logged in to the application
    When the user navigates to the Short Interest Rate Adjustment page
    Then the page container should be visible with V2 theme styling applied

  # ── Business Rules & Restrictions ────────────────────

  # Precondition: User is authenticated; no row selected
  @smokeBDD @Regression @SLL-203
  Scenario: User cannot save a rate adjustment without first selecting a row
    Given the user is logged in to the application
    And the user navigates to the Short Interest Rate Adjustment page
    When the user clicks the save button without selecting any row
    Then the save action should be blocked
    And a row selection warning message should be displayed

  # Precondition: User is authenticated; at least one row exists in the grid
  @smokeBDD @Regression @SLL-203
  Scenario: User must select a row before the rate input field becomes active
    Given the user is logged in to the application
    And the user navigates to the Short Interest Rate Adjustment page
    Then the rate input field should be disabled before any row is selected
    When the user selects the first row in the rate adjustment grid
    Then the rate input field should be enabled

  # ── Validation / Negative ────────────────────────────

  # Precondition: User is authenticated; a row is selected
  @smokeBDD @Regression @SLL-203
  Scenario: User clears the rate field and attempts to save - validation error is shown
    Given the user is logged in to the application
    And the user navigates to the Short Interest Rate Adjustment page
    And the user selects the first row in the rate adjustment grid
    When the user clears the rate input field
    And the user clicks the save button
    Then a validation error for the rate field should be displayed
    And the save action should not proceed

  # Precondition: User is authenticated; a row is selected
  @smokeBDD @Regression @SLL-203
  Scenario: User enters a non-numeric value in the rate field - validation error is shown
    Given the user is logged in to the application
    And the user navigates to the Short Interest Rate Adjustment page
    And the user selects the first row in the rate adjustment grid
    When the user enters a new rate value of "abc" in the rate input field
    And the user clicks the save button
    Then a validation error for the rate field should be displayed

  # Precondition: User is authenticated; a row is selected
  @smokeBDD @Regression @SLL-203
  Scenario: User enters a negative rate value - validation error is shown
    Given the user is logged in to the application
    And the user navigates to the Short Interest Rate Adjustment page
    And the user selects the first row in the rate adjustment grid
    When the user enters a new rate value of "-5.00" in the rate input field
    And the user clicks the save button
    Then a validation error for the rate field should be displayed

  # Precondition: User is authenticated; a row is selected
  @smokeBDD @Regression @SLL-203
  Scenario Outline: User submits rate adjustment with various valid and boundary rate values
    Given the user is logged in to the application
    And the user navigates to the Short Interest Rate Adjustment page
    And the user selects the first row in the rate adjustment grid
    When the user enters a new rate value of "<rate>" in the rate input field
    And the user clicks the save button
    Then the expected outcome should be "<outcome>"

    Examples:
      | rate      | outcome              |
      | 0.00      | success              |
      | 1.50      | success              |
      | 99.99     | success              |
      | 100.00    | validation error     |
      | -0.01     | validation error     |

  # ── Edge Cases ───────────────────────────────────────

  # Precondition: User is authenticated; no rate data exists in the system
  @smokeBDD @Regression @SLL-203
  Scenario: Short Interest Rate Adjustment grid shows empty state when no data is available
    Given the user is logged in to the application
    When the user navigates to the Short Interest Rate Adjustment page
    And no rate records are present in the system
    Then the grid empty state overlay should be displayed

  # Precondition: User is authenticated; a row is selected
  @smokeBDD @Regression @SLL-203
  Scenario: User enters maximum allowed characters in rate field
    Given the user is logged in to the application
    And the user navigates to the Short Interest Rate Adjustment page
    And the user selects the first row in the rate adjustment grid
    When the user enters a rate value exceeding the maximum allowed length
    Then the rate input field should enforce the character limit

  # Precondition: User is authenticated; SLS V1 endpoint is temporarily unavailable
  @smokeBDD @Regression @SLL-203
  Scenario: Grid displays an error state when SLS V1 endpoint fails to return data
    Given the user is logged in to the application
    When the user navigates to the Short Interest Rate Adjustment page
    And the SLS V1 endpoint returns an error
    Then the grid should display a data load error message

  # ── End-to-End ───────────────────────────────────────

  # Precondition: Fresh session; valid credentials available; rate record exists
  @smokeBDD @Smoke @Regression @SLL-203
  Scenario: Full lifecycle - user logs in, navigates to rate adjustment, modifies rate and confirms save
    Given the user navigates to the application
    When the user logs in with valid credentials
    Then the user should be redirected to the dashboard
    When the user navigates to the Short Interest Rate Adjustment page
    Then the Short Interest Rate Adjustment grid should be visible
    And the grid should display rate data loaded from SLS V1 endpoints
    When the user selects the first row in the rate adjustment grid
    And the user enters a new rate value of "3.75" in the rate input field
    And the user clicks the save button
    Then a success confirmation message should be displayed
    And the grid should reflect the updated rate value
