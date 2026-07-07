Feature: FPL Accounts - SLS Account Editable Dropdown Column (SLL-234)
  As an authorized user of SLS V2
  I want to select an SLS account from an editable dropdown in the FPL Accounts table
  So that I can dynamically update the record with the correct SLS account

  # ── Happy Path ───────────────────────────────────────────────────────────────

  # Precondition: User is authenticated; FPL Accounts grid is loaded with data
  @smokeBDD @Smoke @Regression @SLL-234 @SLL-C1564
  Scenario: User selects an SLS account from the editable dropdown and the record updates
    Given the user is logged in to the application
    When the user navigates to FPL Accounts
    And the user closes the sidebar
    Then the account row should be visible
    When the user clicks the SLS Account cell for a row
    Then the SLS Account dropdown should be visible with available options
    When the user selects the SLS account option "SOFI"
    Then the record should reflect the selected SLS account

  # ── Column Verification ───────────────────────────────────────────────────────

  # Precondition: User is authenticated; FPL Accounts page is accessible
  @smokeBDD @Smoke @Regression @SLL-234 @SLL-C1565
  Scenario: SLS Account column is present in the FPL Accounts table
    Given the user is logged in to the application
    When the user navigates to FPL Accounts
    And the user closes the sidebar
    Then the account row should be visible
    And the SLS Account column should be visible in the table

  # ── Dropdown Population ───────────────────────────────────────────────────────

  # Precondition: User is authenticated; FPL Accounts grid is loaded with at least one row
  @smokeBDD @Smoke @Regression @SLL-234 @SLL-C1566
  Scenario: SLS Account dropdown is populated with available SLS accounts
    Given the user is logged in to the application
    When the user navigates to FPL Accounts
    And the user closes the sidebar
    Then the account row should be visible
    When the user clicks the SLS Account cell for a row
    Then the SLS Account dropdown should contain at least one account option

  # ── Business Rules & Restrictions ────────────────────────────────────────────

  # Precondition: User is authenticated; SLS Account dropdown can be opened and dismissed
  @smokeBDD @Smoke @Regression @SLL-234 @SLL-C1567
  Scenario: User dismisses the SLS Account dropdown without making a selection
    Given the user is logged in to the application
    When the user navigates to FPL Accounts
    And the user closes the sidebar
    Then the account row should be visible
    When the user clicks the SLS Account cell for a row
    Then the SLS Account dropdown should be visible with available options
    When the user dismisses the SLS Account dropdown
    Then the account row should be visible

  # ── Data-Driven ───────────────────────────────────────────────────────────────

  # Precondition: User is authenticated; multiple SLS accounts are available in the dropdown
  @smokeBDD @Smoke @Regression @SLL-234 @SLL-C1568
  Scenario Outline: User selects different SLS accounts from the editable dropdown
    Given the user is logged in to the application
    When the user navigates to FPL Accounts
    And the user closes the sidebar
    Then the account row should be visible
    When the user clicks the SLS Account cell for a row
    Then the SLS Account dropdown should be visible with available options
    When the user selects the SLS account option "<slsAccount>"
    Then the record should reflect the selected SLS account

    Examples:
      | slsAccount |
      | SOFI       |
      | FPL Test   |
      | GTN        |

  # ── End-to-End ───────────────────────────────────────────────────────────────

  # Precondition: User is authenticated; covers full lifecycle from navigation to record update
  @smokeBDD @Smoke @Regression @SLL-234 @SLL-C1569
  Scenario: Full lifecycle - navigate to FPL Accounts, edit SLS Account dropdown and verify record update
    Given the user is logged in to the application
    When the user navigates to FPL Accounts
    And the user closes the sidebar
    Then the account row should be visible
    And the SLS Account column should be visible in the table
    When the user clicks the SLS Account cell for a row
    Then the SLS Account dropdown should be visible with available options
    And the SLS Account dropdown should contain at least one account option
    When the user selects the SLS account option "SOFI"
    Then the record should reflect the selected SLS account
