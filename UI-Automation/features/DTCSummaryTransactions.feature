Feature: DTC Summary and DTC Transactions Components (SLL-209)
  As an authorized user of SLS V2
  I want to view DTC summary data and transaction activity for a selected depository
  So that I can monitor and filter DTC position and transaction information effectively

  # ══════════════════════════════════════════════════════
  # DTC SUMMARY
  # ══════════════════════════════════════════════════════

  # ── Happy Path — DTC Summary ─────────────────────────

  # Precondition: User is authenticated; DTC Summary page is accessible
  @smokeBDD @Smoke @Regression @SLL-209
  Scenario: User navigates to DTC Summary and summary rows for the selected depository are displayed
    Given the user is logged in to the application
    When the user navigates to the DTC Summary page
    And the user selects a depository
    Then DTC summary rows for the selected depository should be displayed in the grid

  # Precondition: User is authenticated; depository is selected; summary rows are visible
  @smokeBDD @Smoke @Regression @SLL-209
  Scenario: DTC Summary grid displays position and activity fields for each row
    Given the user is logged in to the application
    And the user navigates to the DTC Summary page
    And the user selects a depository
    Then the summary grid should display quantity, made new borrow, made new loan, made return borrow, made return loan, and pending value fields

  # Precondition: User is authenticated; depository is selected
  @smokeBDD @Smoke @Regression @SLL-209
  Scenario: User filters DTC Summary by Symbol and matching rows are returned
    Given the user is logged in to the application
    And the user navigates to the DTC Summary page
    And the user selects a depository
    When the user enters a valid Symbol in the summary filter input
    Then only summary rows matching that Symbol should be displayed in the grid

  # Precondition: User is authenticated; depository is selected
  @smokeBDD @Smoke @Regression @SLL-209
  Scenario: User filters DTC Summary by CUSIP and matching rows are returned
    Given the user is logged in to the application
    And the user navigates to the DTC Summary page
    And the user selects a depository
    When the user enters a valid CUSIP in the summary filter input
    Then only summary rows matching that CUSIP should be displayed in the grid

  # Precondition: User is authenticated; depository is selected
  @smokeBDD @Smoke @Regression @SLL-209
  Scenario: User enters multiple space-delimited Symbols and all matching rows are returned
    Given the user is logged in to the application
    And the user navigates to the DTC Summary page
    And the user selects a depository
    When the user enters multiple Symbols separated by spaces in the summary filter input
    Then summary rows matching any of the entered Symbols should be displayed in the grid

  # Precondition: User is authenticated; depository has summary rows
  @smokeBDD @Smoke @Regression @SLL-209
  Scenario: User clicks the details toggle for a selected summary row and the detail panel opens
    Given the user is logged in to the application
    And the user navigates to the DTC Summary page
    And the user selects a depository with summary rows
    When the user selects a summary row
    And the user clicks the details toggle
    Then the lower transaction detail panel should be visible
    And detail transactions for the selected symbol or CUSIP should be displayed

  # Precondition: User is authenticated; detail panel is open
  @smokeBDD @Smoke @Regression @SLL-209
  Scenario: Detail panel filters by Contra and only matching transactions are shown
    Given the user is logged in to the application
    And the user navigates to the DTC Summary page
    And the user selects a depository and opens the detail panel
    When the user enters a Contra value in the detail panel filter
    Then only transactions matching that Contra should be displayed in the detail panel

  # Precondition: User is authenticated; detail panel is open
  @smokeBDD @Smoke @Regression @SLL-209
  Scenario: Detail panel filters by Reason Code and only matching transactions are shown
    Given the user is logged in to the application
    And the user navigates to the DTC Summary page
    And the user selects a depository and opens the detail panel
    When the user enters a Reason Code in the detail panel filter
    Then only transactions matching that Reason Code should be displayed in the detail panel

  # Precondition: User is authenticated; detail panel is open
  @smokeBDD @Smoke @Regression @SLL-209
  Scenario: Detail panel filters by Action and only matching transactions are shown
    Given the user is logged in to the application
    And the user navigates to the DTC Summary page
    And the user selects a depository and opens the detail panel
    When the user enters an Action value in the detail panel filter
    Then only transactions matching that Action should be displayed in the detail panel

  # Precondition: User is authenticated; summary filter and detail panel are active
  @smokeBDD @Smoke @Regression @SLL-209
  Scenario: User clears the summary filter and detail panel results are also reset
    Given the user is logged in to the application
    And the user navigates to the DTC Summary page
    And the user selects a depository
    And the user has entered a Symbol filter and opened the detail panel
    When the user clicks the Clear button on the summary filter
    Then the summary filter input should be cleared
    And the detail panel filters and results should be cleared

  # ── Row Selection Driving Details — DTC Summary ──────

  # Precondition: User is authenticated; detail panel is open for a summary row
  @smokeBDD @Smoke @Regression @SLL-209
  Scenario: Selecting a different summary row updates the detail panel with the new row's transactions
    Given the user is logged in to the application
    And the user navigates to the DTC Summary page
    And the user selects a depository and opens the detail panel for a row
    When the user selects a different summary row
    Then the detail panel should refresh with transactions for the newly selected symbol or CUSIP

  # Precondition: User is authenticated; summary filter is entered; no row explicitly selected
  @smokeBDD @Regression @SLL-209
  Scenario: Detail panel is driven by the summary filter when no row is explicitly selected
    Given the user is logged in to the application
    And the user navigates to the DTC Summary page
    And the user selects a depository
    When the user enters a Symbol in the summary filter without selecting a row
    And the user opens the detail panel
    Then the detail panel should display transactions matching the entered summary filter

  # ── Filter Behavior — DTC Summary ───────────────────

  # Precondition: User is authenticated; DTC Summary page is open
  @smokeBDD @Smoke @Regression @SLL-209
  Scenario: Summary filter input converts entered text to uppercase automatically
    Given the user is logged in to the application
    And the user navigates to the DTC Summary page
    When the user enters a lowercase symbol in the summary filter input
    Then the input should display the value in uppercase

  # Precondition: User is authenticated; depository is selected
  @smokeBDD @Regression @SLL-209
  Scenario: Entering a Symbol that does not exist returns no results in the summary grid
    Given the user is logged in to the application
    And the user navigates to the DTC Summary page
    And the user selects a depository
    When the user enters a Symbol that does not exist in the summary filter
    Then an empty state or no results message should be displayed in the summary grid

  # ── Depository Scoping — DTC Summary ────────────────

  # Precondition: User is authenticated; initial depository is selected
  @smokeBDD @Smoke @Regression @SLL-209
  Scenario: Changing the depository refreshes the DTC Summary grid with the new depository's data
    Given the user is logged in to the application
    And the user navigates to the DTC Summary page
    And the user selects a depository
    When the user changes to a different depository
    Then the summary grid should refresh and display rows for the new depository only

  # Precondition: User is authenticated; a specific depository is selected
  @smokeBDD @Regression @SLL-209
  Scenario: DTC Summary grid does not show rows belonging to other depositories
    Given the user is logged in to the application
    And the user navigates to the DTC Summary page
    When the user selects a specific depository
    Then only DTC summary rows for that depository should be visible in the grid

  # ── Number and Date Formatting — DTC Summary ────────

  # Precondition: User is authenticated; depository with summary data is selected
  @smokeBDD @Regression @SLL-209
  Scenario: Quantity and position values in the DTC Summary grid are formatted correctly
    Given the user is logged in to the application
    And the user navigates to the DTC Summary page
    And the user selects a depository with summary data
    Then numeric values in the summary grid should be displayed with correct number formatting

  # ══════════════════════════════════════════════════════
  # DTC TRANSACTIONS
  # ══════════════════════════════════════════════════════

  # ── Happy Path — DTC Transactions ───────────────────

  # Precondition: User is authenticated; DTC Transactions page is accessible
  @smokeBDD @Smoke @Regression @SLL-209
  Scenario: User navigates to DTC Transactions and transaction rows for the selected depository are displayed
    Given the user is logged in to the application
    When the user navigates to the DTC Transactions page
    And the user selects a depository
    Then DTC transaction rows for the selected depository should be displayed in the grid

  # Precondition: User is authenticated; depository is selected
  @smokeBDD @Smoke @Regression @SLL-209
  Scenario: User filters DTC Transactions by Symbol and matching transactions are returned
    Given the user is logged in to the application
    And the user navigates to the DTC Transactions page
    And the user selects a depository
    When the user enters a valid Symbol in the Symbol or CUSIP filter
    Then only transactions matching that Symbol should be displayed in the grid

  # Precondition: User is authenticated; depository is selected
  @smokeBDD @Smoke @Regression @SLL-209
  Scenario: User filters DTC Transactions by CUSIP and matching transactions are returned
    Given the user is logged in to the application
    And the user navigates to the DTC Transactions page
    And the user selects a depository
    When the user enters a valid CUSIP in the Symbol or CUSIP filter
    Then only transactions matching that CUSIP should be displayed in the grid

  # Precondition: User is authenticated; depository is selected
  @smokeBDD @Smoke @Regression @SLL-209
  Scenario: User filters DTC Transactions by Contra and matching transactions are returned
    Given the user is logged in to the application
    And the user navigates to the DTC Transactions page
    And the user selects a depository
    When the user enters a Contra value in the Contra filter
    Then only transactions matching that Contra should be displayed in the grid

  # Precondition: User is authenticated; depository is selected
  @smokeBDD @Smoke @Regression @SLL-209
  Scenario: User filters DTC Transactions by Reason Code and matching transactions are returned
    Given the user is logged in to the application
    And the user navigates to the DTC Transactions page
    And the user selects a depository
    When the user enters a Reason Code in the Reason Code filter
    Then only transactions matching that Reason Code should be displayed in the grid

  # Precondition: User is authenticated; depository is selected
  @smokeBDD @Smoke @Regression @SLL-209
  Scenario: User filters DTC Transactions by Action and matching transactions are returned
    Given the user is logged in to the application
    And the user navigates to the DTC Transactions page
    And the user selects a depository
    When the user enters an Action value in the Action filter
    Then only transactions matching that Action should be displayed in the grid

  # Precondition: User is authenticated; depository is selected
  @smokeBDD @Smoke @Regression @SLL-209
  Scenario: User applies multiple filters simultaneously and results are narrowed accordingly
    Given the user is logged in to the application
    And the user navigates to the DTC Transactions page
    And the user selects a depository
    When the user enters a Symbol in the Symbol or CUSIP filter
    And the user enters a Reason Code in the Reason Code filter
    Then only transactions matching both filter values should be displayed in the grid

  # ── Multi-Value Filter Behavior — DTC Transactions ───

  # Precondition: User is authenticated; depository is selected
  @smokeBDD @Smoke @Regression @SLL-209
  Scenario: User enters multiple space-delimited Symbols in the filter and all matching transactions are returned
    Given the user is logged in to the application
    And the user navigates to the DTC Transactions page
    And the user selects a depository
    When the user enters multiple Symbols separated by spaces in the Symbol or CUSIP filter
    Then transactions matching any of the entered Symbols should be displayed in the grid

  # Precondition: User is authenticated; depository is selected
  @smokeBDD @Smoke @Regression @SLL-209
  Scenario: User enters multiple space-delimited Contra values and all matching transactions are returned
    Given the user is logged in to the application
    And the user navigates to the DTC Transactions page
    And the user selects a depository
    When the user enters multiple Contra values separated by spaces in the Contra filter
    Then transactions matching any of the entered Contra values should be displayed in the grid

  # Precondition: User is authenticated; DTC Transactions page is open
  @smokeBDD @Regression @SLL-209
  Scenario: Filter inputs convert entered text to uppercase automatically
    Given the user is logged in to the application
    And the user navigates to the DTC Transactions page
    When the user enters a lowercase value in any filter input
    Then the input should display the value in uppercase

  # ── Clear and Reset — DTC Transactions ───────────────

  # Precondition: User is authenticated; one or more filters are active
  @smokeBDD @Smoke @Regression @SLL-209
  Scenario: User clears all filters and the full transaction list for the depository is restored
    Given the user is logged in to the application
    And the user navigates to the DTC Transactions page
    And the user selects a depository
    And the user has applied one or more filters
    When the user clears all filter inputs
    Then all DTC transactions for the selected depository should be displayed in the grid

  # Precondition: User is authenticated; depository is selected
  @smokeBDD @Regression @SLL-209
  Scenario: Entering a filter value that matches no transactions shows an empty state
    Given the user is logged in to the application
    And the user navigates to the DTC Transactions page
    And the user selects a depository
    When the user enters a Symbol that does not exist in the filter
    Then an empty state or no results message should be displayed in the grid

  # ── Read-Only Grid — DTC Transactions ────────────────

  # Precondition: User is authenticated; depository is selected; transactions are visible
  @smokeBDD @Smoke @Regression @SLL-209
  Scenario: DTC Transactions grid is read-only and does not allow inline editing
    Given the user is logged in to the application
    And the user navigates to the DTC Transactions page
    And the user selects a depository
    When the user attempts to edit a cell in the transactions grid
    Then the grid should not allow any edits

  # ── Depository Scoping — DTC Transactions ────────────

  # Precondition: User is authenticated; initial depository is selected
  @smokeBDD @Smoke @Regression @SLL-209
  Scenario: Changing the depository refreshes the DTC Transactions grid with the new depository's data
    Given the user is logged in to the application
    And the user navigates to the DTC Transactions page
    And the user selects a depository
    When the user changes to a different depository
    Then the transactions grid should refresh and display rows for the new depository only

  # Precondition: User is authenticated; a specific depository is selected
  @smokeBDD @Regression @SLL-209
  Scenario: DTC Transactions grid does not show rows belonging to other depositories
    Given the user is logged in to the application
    And the user navigates to the DTC Transactions page
    When the user selects a specific depository
    Then only DTC transactions for that depository should be visible in the grid

  # ── Formatting — DTC Transactions ────────────────────

  # Precondition: User is authenticated; depository with transaction data is selected
  @smokeBDD @Regression @SLL-209
  Scenario: Quantity, amount, and time values in the DTC Transactions grid are formatted correctly
    Given the user is logged in to the application
    And the user navigates to the DTC Transactions page
    And the user selects a depository with transaction data
    Then quantity, amount, and time values should be displayed with correct formatting in the grid

  # ── End-to-End ───────────────────────────────────────

  # Precondition: Fresh session; valid credentials; DTC Summary and DTC Transactions accessible
  @smokeBDD @Smoke @Regression @SLL-209
  Scenario: Full lifecycle — filter DTC Summary by Symbol, open detail panel, then filter DTC Transactions
    Given the user navigates to the application
    When the user logs in with valid credentials
    Then the user should be redirected to the dashboard
    When the user navigates to the DTC Summary page
    And the user selects a depository
    Then DTC summary rows should be displayed in the grid
    When the user enters a valid Symbol in the summary filter input
    Then matching summary rows should be displayed
    When the user selects a summary row and clicks the details toggle
    Then the detail panel should open and display transactions for the selected symbol
    When the user enters a Reason Code in the detail panel filter
    Then the detail panel should narrow to matching transactions
    When the user clicks Clear on the summary filter
    Then the summary filter and detail panel should be reset
    When the user navigates to the DTC Transactions page
    And the user selects a depository
    And the user enters multiple Symbols separated by spaces in the Symbol or CUSIP filter
    Then transactions matching any of the entered Symbols should be displayed in the grid
