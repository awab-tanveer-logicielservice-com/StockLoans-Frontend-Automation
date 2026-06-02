Feature: Bulk Import Component for Contract Management (SLL-205)
  As an authorized user of SLS V2
  I want to bulk import Borrow and Loan contracts via a two-stage interface
  So that I can review imported data in Grid 1 and submit records to Grid 2 submission history

  # ── Happy Path ───────────────────────────────────────

  # Precondition: User is authenticated; valid Counterparty, Symbol/CUSIP, Qty, and Rate data is available
  @smokeBDD @Smoke @Regression @SLL-205
  Scenario: User imports a valid Borrow contract with all mandatory fields and sees data appear in Grid 1
    Given the user is logged in to the application
    And the user navigates to the Bulk Import page
    When the user selects the "Borrow" toggle
    And the user selects a valid counterparty
    And the user enters a valid symbol or CUSIP
    And the user enters a valid quantity
    And the user enters a valid rate
    And the user clicks the import button
    Then Grid 1 should display the imported contract record
    And the imported record should show a comment for the import

  # Precondition: User is authenticated; Loan contract data is available
  @smokeBDD @Smoke @Regression @SLL-205
  Scenario: User imports a valid Loan contract and verifies Grid 1 displays imported records with comments
    Given the user is logged in to the application
    And the user navigates to the Bulk Import page
    When the user selects the "Loan" toggle
    And the user selects a valid counterparty
    And the user enters a valid symbol or CUSIP
    And the user enters a valid quantity
    And the user enters a valid rate
    And the user clicks the import button
    Then Grid 1 should display the imported contract record
    And the imported record should show a comment for the import

  # Precondition: User is authenticated; at least one record exists in Grid 1
  @smokeBDD @Smoke @Regression @SLL-205
  Scenario: User selects imported rows in Grid 1 and submits — records move to Grid 2
    Given the user is logged in to the application
    And the user navigates to the Bulk Import page
    And at least one imported record exists in Grid 1
    When the user selects the first row in Grid 1
    And the user submits the selected rows
    Then the submitted record should appear in Grid 2
    And Grid 1 should no longer contain the submitted record

  # ── Role-Based Access ────────────────────────────────

  # Precondition: User is authenticated with trade/operator permissions
  @smokeBDD @Smoke @Regression @SLL-205
  Scenario: Authorized user can access the Bulk Import page and perform a full import
    Given the user is logged in to the application
    When the user navigates to the Bulk Import page
    Then the Bulk Import page should be visible
    And the import controls should be enabled

  # Precondition: User is authenticated with read-only permissions
  @smokeBDD @Regression @SLL-205
  Scenario: Read-only user can view the Bulk Import page but submit action is blocked
    Given the user is logged in to the application
    And the user navigates to the Bulk Import page
    When the user attempts to click the submit button without permissions
    Then the submit action should be blocked
    And a Bulk Import access restriction message should be displayed

  # ── Business Rules & Restrictions ────────────────────

  # Precondition: User is authenticated; Bulk Import page is open
  @smokeBDD @Smoke @Regression @SLL-205
  Scenario: Borrow toggle is active by default and user can switch to Loan
    Given the user is logged in to the application
    When the user navigates to the Bulk Import page
    Then the "Borrow" toggle should be selected by default
    When the user selects the "Loan" toggle
    Then the "Loan" toggle should be active

  # Precondition: User is authenticated; no rows selected in Grid 1
  @smokeBDD @Regression @SLL-205
  Scenario: User cannot submit without selecting any rows in Grid 1
    Given the user is logged in to the application
    And the user navigates to the Bulk Import page
    And at least one imported record exists in Grid 1
    When the user clicks the submit button without selecting any rows
    Then the submit action should be blocked
    And a Bulk Import row selection warning should be displayed

  # Precondition: User is authenticated; imported record exists in Grid 1
  @smokeBDD @Smoke @Regression @SLL-205
  Scenario: After successful submission Grid 1 rows are removed and appear in Grid 2
    Given the user is logged in to the application
    And the user navigates to the Bulk Import page
    And at least one imported record exists in Grid 1
    When the user selects the first row in Grid 1
    And the user submits the selected rows
    Then Grid 1 should no longer contain the submitted record
    And the submitted record should appear in Grid 2

  # Precondition: User is authenticated; at least one record has been submitted
  @smokeBDD @Smoke @Regression @SLL-205
  Scenario: Grid 2 displays Contract number, Submitter Name, and Modified Time columns after submission
    Given the user is logged in to the application
    And the user navigates to the Bulk Import page
    And at least one imported record exists in Grid 1
    When the user selects the first row in Grid 1
    And the user submits the selected rows
    Then Grid 2 should display the "Contract #" column
    And Grid 2 should display the "Submitter Name" column
    And Grid 2 should display the "Modified Time" column

  # Precondition: User is authenticated; Bulk Import page is open
  @smokeBDD @Regression @SLL-205
  Scenario: User imports with all additional settings and values persist in Grid 1
    Given the user is logged in to the application
    And the user navigates to the Bulk Import page
    When the user selects the "Borrow" toggle
    And the user selects a valid counterparty
    And the user enters a valid symbol or CUSIP
    And the user enters a valid quantity
    And the user enters a valid rate
    And the user enters a batch code
    And the user sets a spec flag
    And the user enters a profit center
    And the user enters a div rate
    And the user enters a margin value
    And the user selects a rounding option
    And the user clicks the import button
    Then Grid 1 should display the imported contract record with all additional settings

  # ── Validation / Negative ────────────────────────────

  # Precondition: User is authenticated; Bulk Import page is open
  @smokeBDD @Regression @SLL-205
  Scenario: Import attempted with Counterparty missing — validation error shown
    Given the user is logged in to the application
    And the user navigates to the Bulk Import page
    When the user selects the "Borrow" toggle
    And the user enters a valid symbol or CUSIP
    And the user enters a valid quantity
    And the user enters a valid rate
    And the user clicks the import button
    Then a validation error for the Counterparty field should be displayed

  # Precondition: User is authenticated; Bulk Import page is open
  @smokeBDD @Regression @SLL-205
  Scenario: Import attempted with Symbol/CUSIP missing — validation error shown
    Given the user is logged in to the application
    And the user navigates to the Bulk Import page
    When the user selects the "Borrow" toggle
    And the user selects a valid counterparty
    And the user enters a valid quantity
    And the user enters a valid rate
    And the user clicks the import button
    Then a validation error for the Symbol/CUSIP field should be displayed

  # Precondition: User is authenticated; Bulk Import page is open
  @smokeBDD @Regression @SLL-205
  Scenario: Import attempted with Qty missing — validation error shown
    Given the user is logged in to the application
    And the user navigates to the Bulk Import page
    When the user selects the "Borrow" toggle
    And the user selects a valid counterparty
    And the user enters a valid symbol or CUSIP
    And the user enters a valid rate
    And the user clicks the import button
    Then a validation error for the Qty field should be displayed

  # Precondition: User is authenticated; Bulk Import page is open
  @smokeBDD @Regression @SLL-205
  Scenario: Import attempted with Rate missing — validation error shown
    Given the user is logged in to the application
    And the user navigates to the Bulk Import page
    When the user selects the "Borrow" toggle
    And the user selects a valid counterparty
    And the user enters a valid symbol or CUSIP
    And the user enters a valid quantity
    And the user clicks the import button
    Then a validation error for the Rate field should be displayed

  # Precondition: User is authenticated; Bulk Import page is open
  @smokeBDD @Regression @SLL-205
  Scenario: Non-numeric value entered in Qty field — validation error shown
    Given the user is logged in to the application
    And the user navigates to the Bulk Import page
    When the user enters "abc" in the quantity field
    And the user clicks the import button
    Then a validation error for the Qty field should be displayed

  # Precondition: User is authenticated; Bulk Import page is open
  @smokeBDD @Regression @SLL-205
  Scenario: Non-numeric value entered in Rate field — validation error shown
    Given the user is logged in to the application
    And the user navigates to the Bulk Import page
    When the user enters "xyz" in the rate field
    And the user clicks the import button
    Then a validation error for the Rate field should be displayed

  # Precondition: User is authenticated; Bulk Import page is open
  @smokeBDD @Regression @SLL-205
  Scenario: Qty of zero entered — boundary validation error shown
    Given the user is logged in to the application
    And the user navigates to the Bulk Import page
    When the user enters "0" in the quantity field
    And the user clicks the import button
    Then a validation error for the Qty field should be displayed

  # Precondition: User is authenticated; Bulk Import page is open
  @smokeBDD @Regression @SLL-205
  Scenario: Negative Qty entered — validation error shown
    Given the user is logged in to the application
    And the user navigates to the Bulk Import page
    When the user enters "-100" in the quantity field
    And the user clicks the import button
    Then a validation error for the Qty field should be displayed

  # Precondition: User is authenticated; Bulk Import page is open
  @smokeBDD @Regression @SLL-205
  Scenario: Qty above maximum allowed value — boundary validation error shown
    Given the user is logged in to the application
    And the user navigates to the Bulk Import page
    When the user enters "999999999999" in the quantity field
    And the user clicks the import button
    Then a validation error for the Qty field should be displayed

  # Precondition: User is authenticated; Bulk Import page is open
  @smokeBDD @Regression @SLL-205
  Scenario Outline: Multiple Borrow and Loan import entries with various data combinations
    Given the user is logged in to the application
    And the user navigates to the Bulk Import page
    When the user selects the "<contractType>" toggle
    And the user selects a valid counterparty
    And the user enters "<symbol>" in the symbol or CUSIP field
    And the user enters "<qty>" in the quantity field
    And the user enters "<rate>" in the rate field
    And the user clicks the import button
    Then the expected import outcome should be "<outcome>"

    Examples:
      | contractType | symbol | qty    | rate | outcome           |
      | Borrow       | AAPL   | 1000   | 1.50 | success           |
      | Loan         | MSFT   | 500    | 2.75 | success           |
      | Borrow       | TSLA   | 250    | 0.50 | success           |
      | Borrow       |        | 100    | 1.00 | validation error  |
      | Loan         | GOOG   | -50    | 1.25 | validation error  |

  # ── Edge Cases ───────────────────────────────────────

  # Precondition: User is authenticated; no imports have been performed
  @smokeBDD @Regression @SLL-205
  Scenario: Grid 1 shows empty state overlay when no imports have been made
    Given the user is logged in to the application
    When the user navigates to the Bulk Import page
    Then Grid 1 should display the empty state overlay

  # Precondition: User is authenticated; no submissions have been made
  @smokeBDD @Regression @SLL-205
  Scenario: Grid 2 shows empty state overlay when no submissions exist
    Given the user is logged in to the application
    When the user navigates to the Bulk Import page
    Then Grid 2 should display the empty state overlay

  # Precondition: User is authenticated; Bulk Import page is open
  @smokeBDD @Regression @SLL-205
  Scenario: Symbol/CUSIP field with special characters triggers appropriate validation error
    Given the user is logged in to the application
    And the user navigates to the Bulk Import page
    When the user enters "!@#$%" in the symbol or CUSIP field
    And the user clicks the import button
    Then a validation error for the Symbol/CUSIP field should be displayed

  # Precondition: User is authenticated; multiple records exist in Grid 1
  @smokeBDD @Regression @SLL-205
  Scenario: User selects all rows in Grid 1 and submits in bulk — all records move to Grid 2
    Given the user is logged in to the application
    And the user navigates to the Bulk Import page
    And multiple imported records exist in Grid 1
    When the user selects all rows in Grid 1
    And the user submits the selected rows
    Then all selected records should appear in Grid 2
    And Grid 1 should be empty after bulk submission

  # ── End-to-End ───────────────────────────────────────

  # Precondition: Fresh session; valid credentials available; Counterparty and Symbol data available
  @smokeBDD @Smoke @Regression @SLL-205
  Scenario: Full lifecycle — login, set Borrow toggle, fill mandatory fields, import, review Grid 1, select rows, submit, verify Grid 2
    Given the user navigates to the application
    When the user logs in with valid credentials
    Then the user should be redirected to the dashboard
    When the user navigates to the Bulk Import page
    Then the "Borrow" toggle should be selected by default
    When the user selects a valid counterparty
    And the user enters a valid symbol or CUSIP
    And the user enters a valid quantity
    And the user enters a valid rate
    And the user clicks the import button
    Then Grid 1 should display the imported contract record
    And the imported record should show a comment for the import
    When the user selects the first row in Grid 1
    And the user submits the selected rows
    Then the submitted record should appear in Grid 2
    And Grid 2 should display the "Contract #" column
    And Grid 2 should display the "Submitter Name" column
    And Grid 2 should display the "Modified Time" column
