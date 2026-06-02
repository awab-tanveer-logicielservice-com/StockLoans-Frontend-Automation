Feature: Short Rate Adjustment (SRA)
  As a user of SLS V2
  I want to view and modify short rates via the Short Rate Adjustment module
  So that I can manage security short rates backed by SLS endpoints

  # ── Happy Path ───────────────────────────────────────

  # Precondition: User is authenticated
  @smokeBDD @Smoke @Regression @SRA
  Scenario: User navigates to Short Rate Adjustment page and views the grid
    Given the user is logged in to the application
    When the user navigates to the Short Rate Adjustment page
    Then the Short Rate Adjustment grid should be visible
    And the grid should display short rate data rows

  # Precondition: User is authenticated
  @smokeBDD @Smoke @Regression @SRA
  Scenario: Short Rate Adjustment grid displays the correct column headers
    Given the user is logged in to the application
    When the user navigates to the Short Rate Adjustment page
    Then the grid should display Symbol, Cusip, Rate and Source columns

  # Precondition: User is authenticated; at least one row exists
  @smokeBDD @Smoke @Regression @SRA
  Scenario: User selects the first row in the Short Rate Adjustment grid
    Given the user is logged in to the application
    And the user navigates to the Short Rate Adjustment page
    When the user selects the first row in the short rate grid
    Then the short rate row should be selected

  # Precondition: User is authenticated with edit permissions; at least one row exists
  @smokeBDD @Smoke @Regression @SRA
  Scenario: Authorized user successfully updates a short rate and saves
    Given the user is logged in to the application
    And the user navigates to the Short Rate Adjustment page
    When the user selects the first row in the short rate grid
    And the user enters a short rate value of "2.50"
    And the user saves the short rate change
    Then a short rate success confirmation should be displayed

  # ── UI & Structure ────────────────────────────────────

  # Precondition: User is authenticated
  @smokeBDD @Smoke @Regression @SRA
  Scenario: Short Rate Adjustment page uses Ag-Grid for data display
    Given the user is logged in to the application
    When the user navigates to the Short Rate Adjustment page
    Then the Short Rate Adjustment ag-grid root should be visible

  # ── Business Rules ───────────────────────────────────

  # Precondition: User is authenticated; grid has loaded
  @smokeBDD @Regression @SRA
  Scenario: Rate input is disabled before any row is selected and enabled after selection
    Given the user is logged in to the application
    And the user navigates to the Short Rate Adjustment page
    Then the short rate input should be inactive before any row is selected
    When the user selects the first row in the short rate grid
    Then the short rate input should be active

  # Precondition: User is authenticated; no row selected
  @smokeBDD @Regression @SRA
  Scenario: User cannot save a short rate without first selecting a row
    Given the user is logged in to the application
    And the user navigates to the Short Rate Adjustment page
    When the user tries to save without selecting any row
    Then the short rate save action should be blocked

  # ── Validation / Negative ────────────────────────────

  # Precondition: User is authenticated; a row is selected
  @smokeBDD @Regression @SRA
  Scenario: User clears the rate field and attempts to save - validation error shown
    Given the user is logged in to the application
    And the user navigates to the Short Rate Adjustment page
    And the user selects the first row in the short rate grid
    When the user clears the short rate input
    And the user saves the short rate change
    Then a short rate validation error should be displayed

  # Precondition: User is authenticated; a row is selected
  @smokeBDD @Regression @SRA
  Scenario: User enters a negative rate value - validation error shown
    Given the user is logged in to the application
    And the user navigates to the Short Rate Adjustment page
    And the user selects the first row in the short rate grid
    When the user enters a short rate value of "-1.00"
    And the user saves the short rate change
    Then a short rate validation error should be displayed

  # Precondition: User is authenticated; a row is selected
  @smokeBDD @Regression @SRA
  Scenario Outline: User submits various rate values and sees expected outcomes
    Given the user is logged in to the application
    And the user navigates to the Short Rate Adjustment page
    And the user selects the first row in the short rate grid
    When the user enters a short rate value of "<rate>"
    And the user saves the short rate change
    Then the short rate outcome should be "<outcome>"

    Examples:
      | rate   | outcome          |
      | 0.00   | success          |
      | 1.50   | success          |
      | 99.99  | success          |
      | -0.01  | validation error |

  # ── Edge Cases ───────────────────────────────────────

  # Precondition: User is authenticated; no data in system
  @smokeBDD @Regression @SRA
  Scenario: Short Rate Adjustment grid shows empty state when no data is available
    Given the user is logged in to the application
    When the user navigates to the Short Rate Adjustment page
    And no short rate records are present in the system
    Then the short rate grid empty state overlay should be displayed

  # ── End-to-End ───────────────────────────────────────

  # Precondition: Fresh session; valid credentials; at least one rate record exists
  @smokeBDD @Smoke @Regression @SRA
  Scenario: Full lifecycle - login, navigate to Short Rate Adjustment, update rate and confirm
    Given the user navigates to the application
    When the user logs in with valid credentials
    Then the user should be redirected to the dashboard
    When the user navigates to the Short Rate Adjustment page
    Then the Short Rate Adjustment grid should be visible
    And the grid should display short rate data rows
    When the user selects the first row in the short rate grid
    And the user enters a short rate value of "3.00"
    And the user saves the short rate change
    Then a short rate success confirmation should be displayed
