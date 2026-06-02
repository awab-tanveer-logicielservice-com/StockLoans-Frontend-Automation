Feature: LCOR (SLL-208)
  As an authorized user of SLS V2
  I want to manage LCOR batch submissions
  So that I can submit, view, and validate LCOR records for the selected depository

  # ── Happy Path ───────────────────────────────────────

  @smokeBDD @Smoke @Regression @SLL-208
  Scenario: User navigates to LCOR and current-day records for the selected depository are displayed
    Given the user is logged in to the application
    When the user navigates to the LCOR page
    And the user selects a depository
    Then current-day LCOR records for the selected depository should be displayed in the grid

  @smokeBDD @Smoke @Regression @SLL-208
  Scenario: User submits a valid LCOR batch with required fields and it is accepted
    Given the user is logged in to the application
    And the user navigates to the LCOR page
    And the user selects a depository
    When the user enters a valid Contra Loanet ID
    And the user enters a valid Symbol or CUSIP
    And the user enters a valid Quantity
    And the user submits the LCOR batch
    Then the LCOR batch should be submitted successfully
    And the grid should refresh with the new LCOR record

  @smokeBDD @Smoke @Regression @SLL-208
  Scenario: User submits an LCOR batch with all advanced fields populated
    Given the user is logged in to the application
    And the user navigates to the LCOR page
    And the user selects a depository
    When the user enters all required LCOR fields
    And the user enters the minimum quantity
    And the user enters the minimum rebate
    And the user enters the maximum price
    And the user enters the dividend rate
    And the user enters the time limit
    And the user enters the profit center
    And the user enters a public comment
    And the user submits the LCOR batch
    Then the LCOR batch should be submitted successfully

  @smokeBDD @Smoke @Regression @SLL-208
  Scenario: User clicks a row in the LCOR grid and the pinned detail summary is displayed
    Given the user is logged in to the application
    And the user navigates to the LCOR page
    And the user selects a depository with existing LCOR records
    When the user clicks on an LCOR row in the grid
    Then the pinned detail summary for that record should be displayed at the bottom of the page

  @smokeBDD @Smoke @Regression @SLL-208
  Scenario: User resets the LCOR form and all fields are cleared
    Given the user is logged in to the application
    And the user navigates to the LCOR page
    When the user fills in LCOR batch fields
    And the user clicks the Reset button
    Then all LCOR form fields should be cleared

  # ── Form Validation ───────────────────────────────────

  @smokeBDD @Smoke @Regression @SLL-208
  Scenario: LCOR batch submission is blocked when Contra Loanet ID is missing
    Given the user is logged in to the application
    And the user navigates to the LCOR page
    When the user fills in all required LCOR fields except Contra Loanet ID
    Then the LCOR submission should be disabled or a validation error should be displayed

  @smokeBDD @Smoke @Regression @SLL-208
  Scenario: LCOR batch submission is blocked when Symbol or CUSIP is missing
    Given the user is logged in to the application
    And the user navigates to the LCOR page
    When the user fills in all required LCOR fields except Symbol or CUSIP
    Then the LCOR submission should be disabled or a validation error should be displayed

  @smokeBDD @Smoke @Regression @SLL-208
  Scenario: LCOR batch submission is blocked when Quantity is missing
    Given the user is logged in to the application
    And the user navigates to the LCOR page
    When the user fills in all required LCOR fields except Quantity
    Then the LCOR submission should be disabled or a validation error should be displayed

  @smokeBDD @Regression @SLL-208
  Scenario: Non-numeric value entered in Quantity field shows a validation error
    Given the user is logged in to the application
    And the user navigates to the LCOR page
    When the user enters "abc" in the Quantity field
    Then a validation error should be displayed for the Quantity field

  @smokeBDD @Regression @SLL-208
  Scenario: Negative value entered in Quantity field shows a validation error
    Given the user is logged in to the application
    And the user navigates to the LCOR page
    When the user enters "-100" in the Quantity field
    Then a validation error should be displayed for the Quantity field

  @smokeBDD @Regression @SLL-208
  Scenario: Non-numeric value entered in Min Rebate field shows a validation error
    Given the user is logged in to the application
    And the user navigates to the LCOR page
    When the user enters "abc" in the Min Rebate field
    Then a validation error should be displayed for the Min Rebate field

  # ── Depository Scoping ────────────────────────────────

  @smokeBDD @Smoke @Regression @SLL-208
  Scenario: LCOR grid only shows current-day records for the selected depository
    Given the user is logged in to the application
    And the user navigates to the LCOR page
    When the user selects a specific depository
    Then only current-day LCOR records for that depository should be displayed

  @smokeBDD @Regression @SLL-208
  Scenario: Changing the depository on the LCOR page refreshes the grid with the new depository records
    Given the user is logged in to the application
    And the user navigates to the LCOR page
    And the user selects a depository
    When the user changes to a different depository
    Then the grid should refresh with current-day records for the new depository only
