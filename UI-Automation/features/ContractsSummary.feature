Feature: Contracts Summary Component (SLL-191)
  As a user of SLS V2
  I want to view and interact with the Contract Summary screen
  So that I can monitor aggregated contract positions by depository with filtering, calculations, details panel, and navigation to Contract Details

  # ── Happy Path ───────────────────────────────────────

  @smokeBDD @Smoke @Regression @SLL-191
  Scenario: User navigates to Contract Summary page and sees summary-level positions loaded for the selected depository
    Given the user is logged in to the application
    When the user navigates to the Contract Summary page
    Then the Contract Summary grid should be visible
    And the grid should display summary rows grouped by symbol

  @smokeBDD @Smoke @Regression @SLL-191
  Scenario: Summary grid displays aggregated borrow and loan rates, quantities, amounts, and all calculated fields
    Given the user is logged in to the application
    And the user navigates to the Contract Summary page
    Then the grid should display the Borrow Rate column
    And the grid should display the Loan Rate column
    And the grid should display the Quantity column
    And the grid should display the Spread column
    And the grid should display the Imbalance column
    And the grid should display the Cash/Net column
    And the grid should display the Rebate column

  # ── Filter Behavior ──────────────────────────────────

  @smokeBDD @Smoke @Regression @SLL-191
  Scenario: User filters by Symbol/CUSIP and grid updates to show only matching rows
    Given the user is logged in to the application
    And the user navigates to the Contract Summary page
    When the user enters a symbol in the Symbol/CUSIP filter
    Then the grid should display only rows matching the entered symbol

  @smokeBDD @Regression @SLL-191
  Scenario: User filters by DTC and grid updates correctly
    Given the user is logged in to the application
    And the user navigates to the Contract Summary page
    When the user enters a value in the DTC filter
    Then the grid should display only rows matching the entered DTC value

  @smokeBDD @Regression @SLL-191
  Scenario: User filters by LoanetId and grid updates correctly
    Given the user is logged in to the application
    And the user navigates to the Contract Summary page
    When the user enters a value in the LoanetId filter
    Then the grid should display only rows matching the entered LoanetId

  @smokeBDD @Regression @SLL-191
  Scenario: User filters by Contract No. and grid updates correctly
    Given the user is logged in to the application
    And the user navigates to the Contract Summary page
    When the user enters a value in the Contract No. filter
    Then the grid should display only rows matching the entered contract number

  @smokeBDD @Regression @SLL-191
  Scenario: User filters by Profit Center and grid updates correctly
    Given the user is logged in to the application
    And the user navigates to the Contract Summary page
    When the user enters a value in the Profit Center filter
    Then the grid should display only rows matching the entered profit center

  @smokeBDD @Smoke @Regression @SLL-191
  Scenario: User changes Effective Date and summary grid data reloads for that date
    Given the user is logged in to the application
    And the user navigates to the Contract Summary page
    When the user changes the Effective Date filter to a different date
    Then the summary grid should reload with data for the selected effective date

  # ── Details Toggle & Row Selection ───────────────────

  @smokeBDD @Smoke @Regression @SLL-191
  Scenario: User enables the Details toggle and the lower detail panel becomes visible
    Given the user is logged in to the application
    And the user navigates to the Contract Summary page
    When the user enables the Details toggle
    Then the lower detail panel should be visible

  @smokeBDD @Smoke @Regression @SLL-191
  Scenario: Detail panel syncs to the symbol of the currently selected summary row
    Given the user is logged in to the application
    And the user navigates to the Contract Summary page
    And the user enables the Details toggle
    When the user selects a summary row
    Then the detail panel should display contracts for the selected row's symbol

  @smokeBDD @Regression @SLL-191
  Scenario: User selects a different summary row and detail panel updates to the new symbol
    Given the user is logged in to the application
    And the user navigates to the Contract Summary page
    And the user enables the Details toggle
    And the user selects a summary row
    When the user selects a different summary row
    Then the detail panel should update to display contracts for the newly selected symbol

  @smokeBDD @Regression @SLL-191
  Scenario: User disables the Details toggle and the detail panel is hidden
    Given the user is logged in to the application
    And the user navigates to the Contract Summary page
    And the user enables the Details toggle
    When the user disables the Details toggle
    Then the lower detail panel should not be visible

  # ── Double-click Navigation ──────────────────────────

  @smokeBDD @Smoke @Regression @SLL-191
  Scenario: User double-clicks a summary row and is navigated to Contract Details prefiltered to that symbol
    Given the user is logged in to the application
    And the user navigates to the Contract Summary page
    When the user double-clicks a summary row
    Then the user should be navigated to the Contract Details page
    And the Contract Details page should be prefiltered to the double-clicked symbol

  @smokeBDD @Regression @SLL-191
  Scenario: Contract Details page opened via double-click shows only contracts for the double-clicked symbol
    Given the user is logged in to the application
    And the user navigates to the Contract Summary page
    When the user double-clicks a summary row
    Then the Contract Details page should display only contracts matching the selected symbol

  # ── End-to-End ───────────────────────────────────────

  @smokeBDD @Smoke @Regression @SLL-191
  Scenario: Full lifecycle — login, select depository, view summary, apply filter, verify pinned totals, toggle details, double-click row, verify Contract Details
    Given the user navigates to the application
    When the user logs in with valid credentials
    Then the user should be redirected to the dashboard
    When the user navigates to the Contract Summary page
    Then the Contract Summary grid should be visible
    And the pinned total row should be visible at the bottom of the grid
    When the user enters a symbol in the Symbol/CUSIP filter
    Then the grid should display only rows matching the entered symbol
    And the pinned total row should recalculate and reflect totals of only the filtered rows
    When the user clears all active filters
    And the user enables the Details toggle
    And the user selects a summary row
    Then the detail panel should display contracts for the selected row's symbol
    When the user double-clicks a summary row
    Then the user should be navigated to the Contract Details page
    And the Contract Details page should be prefiltered to the double-clicked symbol
