Feature: Contract Details Component (SLL-192)
  As a user of SLS V2
  I want to view and interact with the Contract Details screen
  So that I can manage contracts with filtering, P&L calculations, Trade, ReRate, Recall, and Return actions

  # ── Happy Path ───────────────────────────────────────

  # Precondition: User is authenticated; a depository with contracts is selected
  @smokeBDD @Smoke @Regression @SLL-192
  Scenario: User navigates to Contract Details and sees contracts for the selected depository and effective date
    Given the user is logged in to the application
    When the user navigates to the Contract Details page
    Then the Contract Details grid should be visible
    And the grid should display contract rows for the selected depository

  # Precondition: User is authenticated; contracts exist for the selected depository
  @smokeBDD @Smoke @Regression @SLL-192
  Scenario: Grid displays contracts with all expected columns
    Given the user is logged in to the application
    When the user navigates to the Contract Details page
    Then the grid should display the Symbol column
    And the grid should display the DTC column
    And the grid should display the Contract No. column
    And the grid should display the Profit Center column

  # ── Role-Based Access ────────────────────────────────

  # Precondition: User is authenticated with trade/contract action permissions
  @smokeBDD @Smoke @Regression @SLL-192
  Scenario: Authorized user can access Trade, ReRate, Recall, and Return action controls
    Given the user is logged in to the application
    When the user navigates to the Contract Details page
    Then the Trade action control should be visible and enabled
    And the ReRate action control should be visible
    And the Recall action control should be visible
    And the Return action control should be visible

  # Precondition: User is authenticated with read-only permissions
  @smokeBDD @Regression @SLL-192
  Scenario: Read-only user cannot access Trade, ReRate, Recall, or Return action dialogs
    Given the user is logged in to the application
    When the user navigates to the Contract Details page
    Then the Trade, ReRate, Recall, and Return action controls should not be available for the read-only user

  # ── Filter Behavior ──────────────────────────────────

  # Precondition: User is authenticated; contracts with multiple symbols exist
  @smokeBDD @Smoke @Regression @SLL-192
  Scenario: User filters by Symbol/CUSIP and grid shows only matching contracts
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    When the user enters a symbol in the Symbol/CUSIP filter
    Then the grid should display only contracts matching the entered symbol

  # Precondition: User is authenticated; contracts with different DTC values exist
  @smokeBDD @Regression @SLL-192
  Scenario: User filters by DTC and grid updates correctly
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    When the user enters a value in the DTC filter
    Then the grid should display only contracts matching the entered DTC value

  # Precondition: User is authenticated; contracts with different LoanetId values exist
  @smokeBDD @Regression @SLL-192
  Scenario: User filters by LoanetId and grid updates correctly
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    When the user enters a value in the LoanetId filter
    Then the grid should display only contracts matching the entered LoanetId

  # Precondition: User is authenticated; multiple contract numbers exist
  @smokeBDD @Regression @SLL-192
  Scenario: User filters by Contract No. and grid updates correctly
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    When the user enters a value in the Contract No. filter
    Then the grid should display only contracts matching the entered contract number

  # Precondition: User is authenticated; contracts with different profit centers exist
  @smokeBDD @Regression @SLL-192
  Scenario: User filters by Profit Center and grid updates correctly
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    When the user enters a value in the Profit Center filter
    Then the grid should display only contracts matching the entered profit center

  # Precondition: User is authenticated; contracts within a date range exist
  @smokeBDD @Regression @SLL-192
  Scenario: User filters by Start Date range and grid updates correctly
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    When the user enters a start date range in the Start Date filter
    Then the grid should display only contracts within the entered date range

  # Precondition: User is authenticated; Start Date preset options are available
  @smokeBDD @Regression @SLL-192
  Scenario: User applies a Start Date preset and grid updates correctly
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    When the user selects a Start Date preset option
    Then the grid should display contracts matching the selected preset date range

  # Precondition: User is authenticated; contracts exist on multiple effective dates
  @smokeBDD @Smoke @Regression @SLL-192
  Scenario: User changes Effective Date and grid reloads with data for the new date
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    When the user changes the Effective Date to a different date
    Then the Contract Details grid should reload with contracts for the new effective date

  # Precondition: User is authenticated; multiple depositories are available
  @smokeBDD @Smoke @Regression @SLL-192
  Scenario: User changes selected depository and grid reloads with new depository contracts
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    When the user changes the selected depository
    Then the Contract Details grid should reload with data for the newly selected depository

  # ── Live Quote Banner ────────────────────────────────

  # Precondition: User is authenticated; Symbol filter is applied to a single symbol
  @smokeBDD @Smoke @Regression @SLL-192
  Scenario: Live quote banner appears when grid is filtered down to a single symbol
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    When the user enters a symbol in the Symbol/CUSIP filter
    Then the live quote snapshot banner should be visible

  # Precondition: User is authenticated; multiple symbols are visible in the grid
  @smokeBDD @Regression @SLL-192
  Scenario: Live quote banner is hidden when multiple symbols are visible in the grid
    Given the user is logged in to the application
    When the user navigates to the Contract Details page
    Then the live quote snapshot banner should not be visible

  # ── Master-Detail History ────────────────────────────

  # Precondition: User is authenticated; contract rows with history are available
  @smokeBDD @Smoke @Regression @SLL-192
  Scenario: User expands a contract row and sees contract history detail
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    When the user expands the first contract row
    Then the contract history detail panel should be visible

  # Precondition: User is authenticated; a contract row is expanded
  @smokeBDD @Regression @SLL-192
  Scenario: User collapses an expanded history row and the detail is hidden
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    And the user expands the first contract row
    When the user collapses the expanded contract row
    Then the contract history detail panel should not be visible

  # ── Pinned Totals & P&L Recalculation ───────────────

  # Precondition: User is authenticated; Open, Warning, and Closed contracts exist
  @smokeBDD @Smoke @Regression @SLL-192
  Scenario: Pinned totals include only Open and Warning contracts — Closed contracts are excluded
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    Then the pinned total row should reflect totals from Open and Warning contracts only

  # Precondition: User is authenticated; contracts with different rates and quantities exist
  @smokeBDD @Regression @SLL-192
  Scenario: Weighted average Borrow Rate and Loan Rate are calculated quantity-based
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    Then the Borrow Rate in the pinned totals should reflect the quantity-weighted average
    And the Loan Rate in the pinned totals should reflect the quantity-weighted average

  # Precondition: User is authenticated; borrow and loan contracts exist
  @smokeBDD @Regression @SLL-192
  Scenario: Inventory equals Borrow Qty minus Loan Qty in pinned totals
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    Then the Inventory value in pinned totals should equal Borrow Qty minus Loan Qty

  # Precondition: User is authenticated; borrow and loan amounts exist
  @smokeBDD @Regression @SLL-192
  Scenario: Net equals Loan Amount minus Borrow Amount in pinned totals
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    Then the Net value in pinned totals should equal Loan Amount minus Borrow Amount

  # Precondition: User is authenticated; matched borrow and loan contracts exist
  @smokeBDD @Regression @SLL-192
  Scenario: Match P&L uses daily spread between weighted borrow and loan rates on matched dollar amount
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    Then the Match P&L value should reflect the daily spread calculation on the matched dollar amount

  # Precondition: User is authenticated; net dollar imbalance exists
  @smokeBDD @Regression @SLL-192
  Scenario: Funding P&L uses net dollar imbalance at 4.33 funding rate plus rebate-rate debit logic
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    Then the Funding P&L value should reflect the net dollar imbalance at the 4.33 funding rate

  # Precondition: User is authenticated; P&L values are visible
  @smokeBDD @Regression @SLL-192
  Scenario: Total P&L equals Funding plus Match
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    Then the Total P&L value should equal Funding plus Match

  # Precondition: User is authenticated; a Symbol filter is applied
  @smokeBDD @Smoke @Regression @SLL-192
  Scenario: Pinned totals recalculate correctly after a Symbol/CUSIP filter is applied
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    When the user enters a symbol in the Symbol/CUSIP filter
    Then the pinned total row should recalculate to reflect only the filtered contracts

  # Precondition: User is authenticated; a filter has been previously applied
  @smokeBDD @Regression @SLL-192
  Scenario: Pinned totals recalculate correctly after all filters are cleared
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    And the user enters a symbol in the Symbol/CUSIP filter
    When the user clears all active filters
    Then the pinned total row should recalculate to reflect all Open and Warning contracts

  # Precondition: User is authenticated; a filter matching no rows is applied
  @smokeBDD @Regression @SLL-192
  Scenario: Pinned totals show zeros when all contracts are filtered out
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    When the user enters "ZZZZINVALID" in the Symbol/CUSIP filter
    Then the grid should show no matching rows
    And the pinned total row should display zero values

  # ── Profit Center Edit ───────────────────────────────

  # Precondition: User is authenticated; Effective Date is today
  @smokeBDD @Smoke @Regression @SLL-192
  Scenario: Profit Center field is editable when Effective Date is today
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    And the Effective Date is set to today
    Then the Profit Center field should be editable

  # Precondition: User is authenticated; Effective Date is a past date
  @smokeBDD @Regression @SLL-192
  Scenario: Profit Center field is read-only when Effective Date is a past date
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    When the user changes the Effective Date to a past date
    Then the Profit Center field should not be editable

  # Precondition: User is authenticated; Effective Date is today; a row is selected
  @smokeBDD @Regression @SLL-192
  Scenario: Valid single-character Profit Center update submits successfully
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    And the Effective Date is set to today
    When the user updates the Profit Center field with a single character value
    Then the Profit Center update should be submitted successfully

  # Precondition: User is authenticated; Effective Date is today
  @smokeBDD @Regression @SLL-192
  Scenario: Blank Profit Center update is accepted and submits successfully
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    And the Effective Date is set to today
    When the user clears the Profit Center field and submits
    Then the Profit Center update should be submitted successfully

  # Precondition: User is authenticated; Effective Date is today
  @smokeBDD @Regression @SLL-192
  Scenario: Multi-character Profit Center value is rejected with a validation error
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    And the Effective Date is set to today
    When the user enters a multi-character value in the Profit Center field
    Then a validation error should be displayed for the Profit Center field

  # ── Trade Panel ──────────────────────────────────────

  # Precondition: User is authenticated; contract rows are visible; Trade access is permitted
  @smokeBDD @Smoke @Regression @SLL-192
  Scenario: User opens Trade panel for a single Borrow and submits successfully
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    When the user opens the Trade panel
    And the user selects the Borrow trade type
    And the user fills in all required Trade fields
    And the user submits the Trade form
    Then a trade success confirmation should be displayed
    And the Trade panel should close

  # Precondition: User is authenticated; contract rows are visible; Trade access is permitted
  @smokeBDD @Smoke @Regression @SLL-192
  Scenario: User opens Trade panel for a single Loan and submits successfully
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    When the user opens the Trade panel
    And the user selects the Loan trade type
    And the user fills in all required Trade fields
    And the user submits the Trade form
    Then a trade success confirmation should be displayed
    And the Trade panel should close

  # Precondition: User is authenticated; Trade access is permitted
  @smokeBDD @Smoke @Regression @SLL-192
  Scenario: User opens Trade panel in Match mode and two linked trades are created
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    When the user opens the Trade panel
    And the user selects both Borrow and Loan trade types
    And the user fills in the Borrow side fields
    And the user fills in the Loan side specific fields
    And the user submits the Trade form
    Then two linked trade submissions should be created successfully

  # Precondition: User is authenticated; Trade panel opened from Contract Details context
  @smokeBDD @Smoke @Regression @SLL-192
  Scenario: Symbol is prefilled when Trade panel is opened from Contract Details context
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    When the user opens the Trade panel from a contract row
    Then the symbol field in the Trade panel should be prefilled with the contract symbol

  # Precondition: User is authenticated; Trade panel is open
  @smokeBDD @Regression @SLL-192
  Scenario: Trade form validates all required fields before allowing submit
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    When the user opens the Trade panel
    And the user submits the Trade form without filling required fields
    Then validation errors should be displayed for counterparty, quantity, symbol, and rebate rate

  # Precondition: User is authenticated; Trade panel is open; invalid counterparty entered
  @smokeBDD @Regression @SLL-192
  Scenario: Trade form validates counterparty before allowing submit
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    When the user opens the Trade panel
    And the user enters an invalid counterparty
    And the user submits the Trade form
    Then a validation error should be displayed for the counterparty field

  # Precondition: User is authenticated; Trade panel is open; invalid symbol entered
  @smokeBDD @Regression @SLL-192
  Scenario: Trade form validates symbol/CUSIP before allowing submit
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    When the user opens the Trade panel
    And the user enters an invalid symbol or CUSIP
    And the user submits the Trade form
    Then a validation error should be displayed for the symbol field

  # Precondition: User is authenticated; Trade panel is open in Match mode
  @smokeBDD @Regression @SLL-192
  Scenario: In Match mode Loan side shows symbol and quantity read-only from Borrow side
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    When the user opens the Trade panel
    And the user selects both Borrow and Loan trade types
    Then the Loan side symbol and quantity fields should be read-only and copied from the Borrow side

  # Precondition: User is authenticated; Trade panel is in Match mode
  @smokeBDD @Regression @SLL-192
  Scenario: In Match mode Loan side requires its own counterparty, rebate rate, margin, and rounding
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    When the user opens the Trade panel
    And the user selects both Borrow and Loan trade types
    Then the Loan side should require its own counterparty field
    And the Loan side should require its own rebate rate field

  # ── ReRate Dialog ────────────────────────────────────

  # Precondition: User is authenticated; today's effective date; at least one Open contract selected
  @smokeBDD @Smoke @Regression @SLL-192
  Scenario: ReRate dialog is enabled only when today's effective date is selected and at least one Open contract is selected
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    And the Effective Date is set to today
    When the user selects an Open contract row
    Then the ReRate action control should be enabled

  # Precondition: User is authenticated; no contract row is selected
  @smokeBDD @Regression @SLL-192
  Scenario: ReRate dialog is disabled when no contract is selected
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    Then the ReRate action control should be disabled

  # Precondition: User is authenticated; Effective Date is a past date
  @smokeBDD @Regression @SLL-192
  Scenario: ReRate dialog is disabled for a past effective date
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    When the user changes the Effective Date to a past date
    Then the ReRate action control should be disabled

  # Precondition: User is authenticated; only Closed or Warning contracts are selected
  @smokeBDD @Regression @SLL-192
  Scenario: ReRate dialog is disabled when only Closed or Warning contracts are selected
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    And the Effective Date is set to today
    When the user selects only a Closed contract row
    Then the ReRate action control should be disabled

  # Precondition: User is authenticated; exactly one Open contract is selected
  @smokeBDD @Regression @SLL-192
  Scenario: Single selected contract shows a contract summary line in the ReRate dialog
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    And the Effective Date is set to today
    When the user selects one Open contract row
    And the user opens the ReRate dialog
    Then a contract summary line should be visible in the ReRate dialog

  # Precondition: User is authenticated; multiple Open contracts selected; today's date
  @smokeBDD @Smoke @Regression @SLL-192
  Scenario: ReRate submit sends request for all selected contract IDs and shows success feedback
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    And the Effective Date is set to today
    When the user selects multiple Open contract rows
    And the user opens the ReRate dialog
    And the user enters a valid rebate rate
    And the user submits the ReRate dialog
    Then a success message should be displayed
    And the contract selection should be cleared

  # Precondition: User is authenticated; ReRate dialog is open
  @smokeBDD @Regression @SLL-192
  Scenario: Empty rebate rate input is rejected with a validation error in ReRate dialog
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    And the Effective Date is set to today
    When the user selects an Open contract row
    And the user opens the ReRate dialog
    And the user submits the ReRate dialog without entering a rate
    Then a validation error should be displayed for the rebate rate field

  # Precondition: User is authenticated; ReRate dialog is open
  @smokeBDD @Regression @SLL-192
  Scenario: Non-numeric rebate rate input is rejected with a validation error in ReRate dialog
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    And the Effective Date is set to today
    When the user selects an Open contract row
    And the user opens the ReRate dialog
    And the user enters a non-numeric value in the rebate rate field
    And the user submits the ReRate dialog
    Then a validation error should be displayed for the rebate rate field

  # ── Recall Dialog ────────────────────────────────────

  # Precondition: User is authenticated; today's date; exactly one Open loan-side contract selected
  @smokeBDD @Smoke @Regression @SLL-192
  Scenario: Recall dialog is enabled for exactly one selected Open loan-side contract on today's date
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    And the Effective Date is set to today
    When the user selects exactly one Open loan-side contract row
    Then the Recall action control should be enabled

  # Precondition: User is authenticated; a borrow-side contract is selected
  @smokeBDD @Regression @SLL-192
  Scenario: Recall dialog is not available for borrow-side contracts
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    And the Effective Date is set to today
    When the user selects a borrow-side contract row
    Then the Recall action control should be disabled

  # Precondition: User is authenticated; more than one contract is selected
  @smokeBDD @Regression @SLL-192
  Scenario: Recall dialog is not available when more than one contract is selected
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    And the Effective Date is set to today
    When the user selects multiple contract rows
    Then the Recall action control should be disabled

  # Precondition: User is authenticated; Effective Date is a past date
  @smokeBDD @Regression @SLL-192
  Scenario: Recall dialog is disabled for a past effective date
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    When the user changes the Effective Date to a past date
    Then the Recall action control should be disabled

  # Precondition: User is authenticated; Recall dialog is open
  @smokeBDD @Regression @SLL-192
  Scenario: Recall quantity exceeding the contract quantity is rejected
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    And the Effective Date is set to today
    When the user selects exactly one Open loan-side contract row
    And the user opens the Recall dialog
    And the user enters a recall quantity greater than the contract quantity
    And the user submits the Recall dialog
    Then a validation error should be displayed for the recall quantity field

  # Precondition: User is authenticated; Recall dialog open with valid quantity
  @smokeBDD @Smoke @Regression @SLL-192
  Scenario: Valid Recall quantity submits successfully and shows success feedback
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    And the Effective Date is set to today
    When the user selects exactly one Open loan-side contract row
    And the user opens the Recall dialog
    And the user enters a valid recall quantity
    And the user submits the Recall dialog
    Then a success message should be displayed
    And the contract selection should be cleared

  # ── Return Dialog ────────────────────────────────────

  # Precondition: User is authenticated; today's date; exactly one Open borrow-side contract selected
  @smokeBDD @Smoke @Regression @SLL-192
  Scenario: Return dialog is enabled for exactly one selected Open borrow-side contract on today's date
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    And the Effective Date is set to today
    When the user selects exactly one Open borrow-side contract row
    Then the Return action control should be enabled

  # Precondition: User is authenticated; a loan-side contract is selected
  @smokeBDD @Regression @SLL-192
  Scenario: Return dialog is not available for loan-side contracts
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    And the Effective Date is set to today
    When the user selects a loan-side contract row
    Then the Return action control should be disabled

  # Precondition: User is authenticated; more than one contract is selected
  @smokeBDD @Regression @SLL-192
  Scenario: Return dialog is not available when more than one contract is selected
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    And the Effective Date is set to today
    When the user selects multiple contract rows
    Then the Return action control should be disabled

  # Precondition: User is authenticated; Effective Date is a past date
  @smokeBDD @Regression @SLL-192
  Scenario: Return dialog is disabled for a past effective date
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    When the user changes the Effective Date to a past date
    Then the Return action control should be disabled

  # Precondition: User is authenticated; Return dialog is open
  @smokeBDD @Regression @SLL-192
  Scenario: Return quantity exceeding the contract quantity is rejected
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    And the Effective Date is set to today
    When the user selects exactly one Open borrow-side contract row
    And the user opens the Return dialog
    And the user enters a return quantity greater than the contract quantity
    And the user submits the Return dialog
    Then a validation error should be displayed for the return quantity field

  # Precondition: User is authenticated; contract start date is today; Return dialog is open
  @smokeBDD @Smoke @Regression @SLL-192
  Scenario: Same-day return acknowledgement is required when contract start date is today
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    And the Effective Date is set to today
    When the user selects an Open borrow-side contract with a start date of today
    And the user opens the Return dialog
    Then the same-day return acknowledgement checkbox should be required before submit

  # Precondition: User is authenticated; Return dialog open with valid fields
  @smokeBDD @Smoke @Regression @SLL-192
  Scenario: Valid Return submits with contract ID, quantity, spec flag, and batch code and shows success feedback
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    And the Effective Date is set to today
    When the user selects exactly one Open borrow-side contract row
    And the user opens the Return dialog
    And the user enters a valid return quantity, batch code, and delivery code
    And the user submits the Return dialog
    Then a success message should be displayed
    And the contract selection should be cleared

  # ── Validation / Negative ────────────────────────────

  # Precondition: User is authenticated; selected depository has no contracts
  @smokeBDD @Regression @SLL-192
  Scenario: Selected depository with no contracts shows empty grid and empty pinned totals
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    And the selected depository has no contracts
    Then the grid should display the empty state overlay
    And the pinned total row should display zero values

  # Precondition: User is authenticated; Symbol filter returns no matches
  @smokeBDD @Regression @SLL-192
  Scenario: Filtering by a Symbol with no matching contracts shows empty grid and zeroed pinned totals
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    When the user enters "ZZZZINVALID" in the Symbol/CUSIP filter
    Then the grid should show no matching rows
    And the pinned total row should display zero values

  # ── Data-Driven ──────────────────────────────────────

  # Precondition: User is authenticated; contracts exist for multiple filter values
  @smokeBDD @Regression @SLL-192
  Scenario Outline: Multiple filter combinations with valid, partial, and no-match inputs
    Given the user is logged in to the application
    And the user navigates to the Contract Details page
    When the user filters by "<filterType>" with value "<filterValue>"
    Then the expected filter outcome should be "<outcome>"

    Examples:
      | filterType    | filterValue  | outcome        |
      | Symbol/CUSIP  | AAPL         | rows shown     |
      | Symbol/CUSIP  | MSFT         | rows shown     |
      | DTC           | 0005         | rows shown     |
      | Symbol/CUSIP  | ZZZZINVALID  | empty grid     |
      | Profit Center | INVALID_PC   | empty grid     |

  # ── End-to-End ───────────────────────────────────────

  # Precondition: Fresh session; valid credentials; depository with Open contracts available
  @smokeBDD @Smoke @Regression @SLL-192
  Scenario: Full lifecycle — login, navigate to Contract Details, filter, verify live quote, expand history, verify pinned totals, submit Trade
    Given the user navigates to the application
    When the user logs in with valid credentials
    Then the user should be redirected to the dashboard
    When the user navigates to the Contract Details page
    Then the Contract Details grid should be visible
    When the user enters a symbol in the Symbol/CUSIP filter
    Then the live quote snapshot banner should be visible
    And the pinned total row should recalculate to reflect only the filtered contracts
    When the user expands the first contract row
    Then the contract history detail panel should be visible
    When the user opens the Trade panel
    And the user selects the Borrow trade type
    And the user fills in all required Trade fields
    And the user submits the Trade form
    Then a trade success confirmation should be displayed
    And the Trade panel should close
