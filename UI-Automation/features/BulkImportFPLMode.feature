Feature: Bulk Import FPL Mode Workflow (SLL-232)
  As an authorized SLS V2 user
  I want to activate FPL Mode in the Bulk Import component
  So that I can submit symbol-based FPL allocations with system-driven pricing to the contract management system

  # ── Happy Path ───────────────────────────────────────

  # Precondition: User is authenticated; FPL Mode toggle is available in the Bulk Import component
  @smokeBDD @Smoke @Regression @SLL-232 @SLL-C1571
  Scenario: User activates FPL Mode in Bulk Import and the FPL-specific interface is displayed
    Given the user is logged in to the application
    When the user navigates to the Bulk Import page
    And the user activates FPL Mode
    Then the FPL Mode interface should be displayed

  # Precondition: User is authenticated; FPL Mode is active; valid symbol and quantity are available
  @smokeBDD @Smoke @Regression @SLL-232 @SLL-C1572
  Scenario: User imports a valid FPL allocation with symbol and quantity and record appears in Grid 1 with system-driven pricing
    Given the user is logged in to the application
    And the user navigates to the Bulk Import page
    When the user activates FPL Mode
    And the user enters a valid FPL symbol
    And the user enters a valid FPL quantity
    And the user clicks the FPL import button
    Then Grid 1 should display the imported FPL allocation record
    And the system should apply pricing automatically for the FPL allocation

  # ── Role-Based Access ────────────────────────────────

  # Precondition: User is authenticated with trade/operator permissions
  @smokeBDD @Smoke @Regression @SLL-232 @SLL-C1573
  Scenario: Authorized user can activate FPL Mode and the FPL import controls are enabled
    Given the user is logged in to the application
    When the user navigates to the Bulk Import page
    And the user activates FPL Mode
    Then the FPL Mode interface should be displayed
    And the FPL import controls should be enabled

  # Precondition: User is authenticated with read-only permissions
  @smokeBDD @Regression @SLL-232 @SLL-C1574
  Scenario: Read-only user cannot submit FPL allocations from Grid 1
    Given the user is logged in to the application
    And the user navigates to the Bulk Import page
    When the user activates FPL Mode
    And the user attempts to click the submit button without permissions
    Then the submit action should be blocked
    And a Bulk Import access restriction message should be displayed

  # ── Business Rules & Restrictions ────────────────────────────────────────────

  # Precondition: User is authenticated; FPL Mode is active in Bulk Import
  @smokeBDD @Smoke @Regression @SLL-232 @SLL-C1575
  Scenario: FPL Mode uses system-driven pricing and rate entry is not required
    Given the user is logged in to the application
    When the user navigates to the Bulk Import page
    And the user activates FPL Mode
    Then the rate field should not be required in FPL Mode

  # Precondition: User is authenticated; FPL Mode is active; at least one record exists in Grid 1
  @smokeBDD @Regression @SLL-232 @SLL-C1576
  Scenario: User cannot submit without selecting any FPL rows in Grid 1
    Given the user is logged in to the application
    And the user navigates to the Bulk Import page
    And the user activates FPL Mode
    And at least one FPL allocation record exists in Grid 1
    When the user clicks the submit button without selecting any rows
    Then the submit action should be blocked
    And a Bulk Import row selection warning should be displayed

  # Precondition: User is authenticated; FPL Mode is active
  @smokeBDD @Smoke @Regression @SLL-232 @SLL-C1577
  Scenario: User switches from FPL Mode back to standard import mode and the standard form is restored
    Given the user is logged in to the application
    When the user navigates to the Bulk Import page
    And the user activates FPL Mode
    Then the FPL Mode interface should be displayed
    When the user switches back to standard import mode
    Then the standard import interface should be displayed

  # Precondition: User is authenticated; FPL Mode is active; at least one allocation record exists in Grid 1
  @smokeBDD @Smoke @Regression @SLL-232 @SLL-C1578
  Scenario: After successful FPL submission Grid 1 rows are cleared and record appears in Grid 2 history
    Given the user is logged in to the application
    And the user navigates to the Bulk Import page
    And the user activates FPL Mode
    And at least one FPL allocation record exists in Grid 1
    When the user selects the first row in Grid 1
    And the user submits the selected rows
    Then Grid 1 should no longer contain the submitted record
    And the submitted record should appear in Grid 2

  # ── Validation / Negative ────────────────────────────

  # Precondition: User is authenticated; FPL Mode is active; no symbol is entered
  @smokeBDD @Regression @SLL-232 @SLL-C1579
  Scenario: Import attempted in FPL Mode with Symbol missing — validation error shown
    Given the user is logged in to the application
    And the user navigates to the Bulk Import page
    When the user activates FPL Mode
    And the user enters "100" as the FPL allocation quantity
    And the user clicks the FPL import button
    Then a validation error for the FPL Symbol field should be displayed

  # Precondition: User is authenticated; FPL Mode is active; no quantity is entered
  @smokeBDD @Regression @SLL-232 @SLL-C1580
  Scenario: Import attempted in FPL Mode with Quantity missing — validation error shown
    Given the user is logged in to the application
    And the user navigates to the Bulk Import page
    When the user activates FPL Mode
    And the user enters "AAPL" as the FPL symbol
    And the user clicks the FPL import button
    Then a validation error for the FPL Quantity field should be displayed

  # Precondition: User is authenticated; FPL Mode is active
  @smokeBDD @Regression @SLL-232 @SLL-C1581
  Scenario: Non-numeric value entered as FPL Quantity — validation error shown
    Given the user is logged in to the application
    And the user navigates to the Bulk Import page
    When the user activates FPL Mode
    And the user enters "abc" as the FPL allocation quantity
    And the user clicks the FPL import button
    Then a validation error for the FPL Quantity field should be displayed

  # Precondition: User is authenticated; FPL Mode is active
  @smokeBDD @Regression @SLL-232 @SLL-C1582
  Scenario: Zero quantity entered in FPL Mode — boundary validation error shown
    Given the user is logged in to the application
    And the user navigates to the Bulk Import page
    When the user activates FPL Mode
    And the user enters "0" as the FPL allocation quantity
    And the user clicks the FPL import button
    Then a validation error for the FPL Quantity field should be displayed

  # Precondition: User is authenticated; FPL Mode is active
  @smokeBDD @Regression @SLL-232 @SLL-C1583
  Scenario: Negative quantity entered in FPL Mode — boundary validation error shown
    Given the user is logged in to the application
    And the user navigates to the Bulk Import page
    When the user activates FPL Mode
    And the user enters "-500" as the FPL allocation quantity
    And the user clicks the FPL import button
    Then a validation error for the FPL Quantity field should be displayed

  # Precondition: User is authenticated; FPL Mode is active
  @smokeBDD @Regression @SLL-232 @SLL-C1584
  Scenario: Quantity above maximum allowed value in FPL Mode — boundary validation error shown
    Given the user is logged in to the application
    And the user navigates to the Bulk Import page
    When the user activates FPL Mode
    And the user enters "999999999999" as the FPL allocation quantity
    And the user clicks the FPL import button
    Then a validation error for the FPL Quantity field should be displayed

  # ── Edge Cases ───────────────────────────────────────

  # Precondition: User is authenticated; FPL Mode just activated with no prior allocations
  @smokeBDD @Regression @SLL-232 @SLL-C1585
  Scenario: Grid 1 shows empty state overlay when FPL Mode is first activated with no allocations
    Given the user is logged in to the application
    When the user navigates to the Bulk Import page
    And the user activates FPL Mode
    Then Grid 1 should display the empty state overlay

  # Precondition: User is authenticated; FPL Mode is active; one allocation has been imported
  @smokeBDD @Regression @SLL-232 @SLL-C1586
  Scenario: Grid 1 displays a status column for real-time FPL allocation status tracking
    Given the user is logged in to the application
    And the user navigates to the Bulk Import page
    When the user activates FPL Mode
    And the user enters a valid FPL symbol
    And the user enters a valid FPL quantity
    And the user clicks the FPL import button
    Then Grid 1 should display the imported FPL allocation record
    And Grid 1 should show a status column for FPL allocations

  # ── Data-Driven ──────────────────────────────────────

  # Precondition: User is authenticated; FPL Mode is available; various symbol/quantity inputs are provided
  @smokeBDD @Regression @SLL-232 @SLL-C1587
  Scenario Outline: Multiple FPL allocation entries with various symbol and quantity combinations
    Given the user is logged in to the application
    And the user navigates to the Bulk Import page
    When the user activates FPL Mode
    And the user enters "<symbol>" as the FPL symbol
    And the user enters "<qty>" as the FPL allocation quantity
    And the user clicks the FPL import button
    Then the expected FPL import outcome should be "<outcome>"

    Examples:
      | symbol | qty          | outcome          |
      | AAPL   | 1000         | success          |
      | MSFT   | 500          | success          |
      | TSLA   | 250          | success          |
      |        | 100          | validation error |
      | GOOG   | -50          | validation error |

  # ── End-to-End ───────────────────────────────────────

  # Precondition: Fresh session; valid credentials; FPL Mode is available in the Bulk Import component
  @smokeBDD @Smoke @Regression @SLL-232 @SLL-C1588
  Scenario: Full FPL Mode lifecycle — login, activate FPL Mode, enter symbol and quantity, import, review Grid 1 status, select and submit, verify Grid 2 history
    Given the user navigates to the application
    When the user logs in with valid credentials
    Then the user should be redirected to the dashboard
    When the user navigates to the Bulk Import page
    And the user activates FPL Mode
    Then the FPL Mode interface should be displayed
    When the user enters a valid FPL symbol
    And the user enters a valid FPL quantity
    And the user clicks the FPL import button
    Then Grid 1 should display the imported FPL allocation record
    And Grid 1 should show a status column for FPL allocations
    And the system should apply pricing automatically for the FPL allocation
    When the user selects the first row in Grid 1
    And the user submits the selected rows
    Then the submitted record should appear in Grid 2
    And Grid 2 should display the FPL submission history
