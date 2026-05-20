@smokeBDD @Smoke @Regression @SLL-204
Feature: Memo Seg - Create instruction batches and perform UN-SEG actions

  # ── Happy Path ───────────────────────────────────────

  # Precondition: User is authenticated and on the application dashboard
  @smokeBDD @Smoke @Regression @SLL-204
  Scenario: User creates a valid memo seg batch and views populated summary and detail grids
    Given the user is logged in to the application
    And the user navigates to the Memo Seg page
    When the user enters "AAPL 100" in the memo seg text input
    And the user submits the memo seg batch
    Then the summary grid should display a batch entry for symbol "AAPL"
    And the detail grid should display the batch details for symbol "AAPL"

  # ── Role-Based Access ────────────────────────────────

  # Precondition: User is authenticated with valid credentials
  @smokeBDD @Smoke @Regression @SLL-204
  Scenario: Authenticated user can access the Memo Seg page and see the text input area
    Given the user is logged in to the application
    And the user navigates to the Memo Seg page
    Then the Memo Seg page should be visible with the text input area

  # ── Business Rules & Restrictions ────────────────────

  # Precondition: User is on the Memo Seg page with no batch data submitted
  @smokeBDD @Smoke @Regression @SLL-204
  Scenario: UN-SEG button is visible on the Memo Seg page before any batch is submitted
    Given the user is logged in to the application
    And the user navigates to the Memo Seg page
    When the user views the Memo Seg page without submitting a batch
    Then the UN-SEG button should be visible on the Memo Seg page

  # Precondition: User has submitted a valid batch and the summary grid is populated
  @smokeBDD @Smoke @Regression @SLL-204
  Scenario: User performs UN-SEG action on a grouped row in the summary grid
    Given the user is logged in to the application
    And the user navigates to the Memo Seg page
    And the user enters "AAPL 100" in the memo seg text input
    And the user submits the memo seg batch
    When the user selects a grouped row in the summary grid
    And the user clicks the UN-SEG button
    Then the UN-SEG action should complete successfully

  # Precondition: User has submitted multiple symbols in a single batch
  @smokeBDD @Smoke @Regression @SLL-204
  Scenario: Summary grid groups batch rows by symbol after submission
    Given the user is logged in to the application
    And the user navigates to the Memo Seg page
    When the user enters multiple symbols with quantities in the memo seg text input
    And the user submits the memo seg batch
    Then the summary grid should display rows grouped by symbol

  # Precondition: Batch has been submitted but no grouped row has been selected
  @smokeBDD @Smoke @Regression @SLL-204
  Scenario: UN-SEG button remains visible after batch submission with no row selected
    Given the user is logged in to the application
    And the user navigates to the Memo Seg page
    And the user enters "AAPL 100" in the memo seg text input
    And the user submits the memo seg batch
    When the user views the summary grid without selecting a row
    Then the UN-SEG button should be visible on the Memo Seg page

  # ── Validation / Negative ────────────────────────────

  # Precondition: User is on the Memo Seg page with an empty text input
  @smokeBDD @Smoke @Regression @SLL-204
  Scenario: User submits an empty text input and receives a required field validation error
    Given the user is logged in to the application
    And the user navigates to the Memo Seg page
    When the user submits the memo seg batch without entering any data
    Then a validation error should be displayed indicating input is required

  # Precondition: User is on the Memo Seg page
  @smokeBDD @Smoke @Regression @SLL-204
  Scenario: User enters a symbol without quantity and receives a validation error
    Given the user is logged in to the application
    And the user navigates to the Memo Seg page
    When the user enters "AAPL" in the memo seg text input
    And the user submits the memo seg batch
    Then a validation error should be displayed for missing quantity

  # Precondition: User is on the Memo Seg page
  @smokeBDD @Smoke @Regression @SLL-204
  Scenario: User enters a non-numeric quantity and receives a format validation error
    Given the user is logged in to the application
    And the user navigates to the Memo Seg page
    When the user enters "AAPL ABC" in the memo seg text input
    And the user submits the memo seg batch
    Then a validation error should be displayed for invalid quantity format

  # Precondition: User is on the Memo Seg page
  @smokeBDD @Smoke @Regression @SLL-204
  Scenario Outline: User enters a boundary quantity value and receives the expected system response
    Given the user is logged in to the application
    And the user navigates to the Memo Seg page
    When the user enters "AAPL <quantity>" in the memo seg text input
    And the user submits the memo seg batch
    Then the system should show "<expected_outcome>"

    Examples:
      | quantity | expected_outcome           |
      | 0        | validation error           |
      | 1        | batch created successfully |
      | 9999999  | batch created successfully |

  # ── Edge Cases ───────────────────────────────────────

  # Precondition: User is on the Memo Seg page
  @smokeBDD @Smoke @Regression @SLL-204
  Scenario: User enters special characters as symbol and receives a validation error
    Given the user is logged in to the application
    And the user navigates to the Memo Seg page
    When the user enters "@#$% 100" in the memo seg text input
    And the user submits the memo seg batch
    Then a validation error should be displayed for invalid symbol format

  # Precondition: User has already submitted a batch and both grids are populated
  @smokeBDD @Smoke @Regression @SLL-204
  Scenario: Clearing the text input after batch submission resets both summary and detail grids
    Given the user is logged in to the application
    And the user navigates to the Memo Seg page
    And the user enters "AAPL 100" in the memo seg text input
    And the user submits the memo seg batch
    When the user clears the memo seg text input
    Then the summary grid and detail grid should be reset to empty state

  # Precondition: User has submitted a batch and the detail grid is rendered
  @smokeBDD @Smoke @Regression @SLL-204
  Scenario: Detail grid displays the correct column headers after batch submission
    Given the user is logged in to the application
    And the user navigates to the Memo Seg page
    And the user enters "AAPL 100" in the memo seg text input
    And the user submits the memo seg batch
    Then the detail grid should display the correct column headers

  # ── End-to-End ───────────────────────────────────────

  # Precondition: User is authenticated; SLSV1 backend is connected and responsive
  @smokeBDD @Smoke @Regression @SLL-204
  Scenario: Full lifecycle - user creates a memo seg batch and completes a UN-SEG action end to end
    Given the user is logged in to the application
    And the user navigates to the Memo Seg page
    When the user enters "AAPL 500" in the memo seg text input
    And the user submits the memo seg batch
    Then the summary grid should display a batch entry for symbol "AAPL"
    And the detail grid should display the batch details for symbol "AAPL"
    When the user selects a grouped row in the summary grid
    And the user clicks the UN-SEG button
    Then the UN-SEG action should complete successfully
    And the grids should reflect the updated state after UN-SEG
