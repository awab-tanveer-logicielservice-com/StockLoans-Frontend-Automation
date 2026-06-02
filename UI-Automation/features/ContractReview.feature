Feature: Contract Review (SLL-208)
  As an authorized user of SLS V2
  I want to review contracts
  So that I can perform the contract review operations available in the legacy SLS V1 screens

  # ── Happy Path ───────────────────────────────────────

  # Precondition: User is authenticated; Contract Review page is accessible
  @smokeBDD @Smoke @Regression @SLL-208
  Scenario: User navigates to Contract Review and loads contracts by selecting a date
    Given the user is logged in to the application
    When the user navigates to the Contract Review page
    And the user selects a specific date
    Then reviewable contracts for the chosen date should be displayed in the grid

  # Precondition: User is authenticated; Contract Review page is open
  @smokeBDD @Smoke @Regression @SLL-208
  Scenario: Contract Review page displays a list of unreviewed days on load
    Given the user is logged in to the application
    When the user navigates to the Contract Review page
    Then a list of unreviewed days should be displayed for selection

  # Precondition: User is authenticated; unreviewed days list is visible
  @smokeBDD @Smoke @Regression @SLL-208
  Scenario: User selects an unreviewed day from the list and reviewable contracts are loaded
    Given the user is logged in to the application
    And the user navigates to the Contract Review page
    When the user selects an unreviewed day from the list
    Then reviewable contracts for that day should be displayed in the grid

  # Precondition: User is authenticated with contract review permissions; contracts are loaded
  @smokeBDD @Smoke @Regression @SLL-208
  Scenario: User selects contract rows, enters a comment, and submits a review successfully
    Given the user is logged in with contract review permissions
    And the user navigates to the Contract Review page
    And the user loads contracts for a reviewable date
    When the user selects one or more contract rows
    And the user enters a review comment
    And the user submits the review
    Then the review should be submitted successfully
    And the unreviewed-day list should refresh to exclude the reviewed day

  # Precondition: User is authenticated with contract review permissions; review has been submitted
  @smokeBDD @Smoke @Regression @SLL-208
  Scenario: Unreviewed-day list refreshes after a successful review submission
    Given the user is logged in with contract review permissions
    And the user navigates to the Contract Review page
    And the user submits a review for an unreviewed day
    Then the unreviewed-day list should no longer include the reviewed day

  # ── Row Selection & Comments ─────────────────────────

  # Precondition: User is authenticated; contracts are loaded for a reviewable date
  @smokeBDD @Smoke @Regression @SLL-208
  Scenario: User can select multiple contract rows for review submission
    Given the user is logged in to the application
    And the user navigates to the Contract Review page
    And the user loads contracts for a reviewable date
    When the user selects multiple contract rows
    Then all selected rows should be highlighted for review

  # Precondition: User is authenticated with review permissions; contracts are loaded
  @smokeBDD @Regression @SLL-208
  Scenario: Review submission is blocked when no contract rows are selected
    Given the user is logged in with contract review permissions
    And the user navigates to the Contract Review page
    And the user loads contracts for a reviewable date
    When the user does not select any contract rows
    Then the review submission should be disabled or a validation message should be displayed

  # Precondition: User is authenticated with review permissions; rows are selected
  @smokeBDD @Regression @SLL-208
  Scenario: User can edit the review comment before submitting
    Given the user is logged in with contract review permissions
    And the user navigates to the Contract Review page
    And the user loads contracts for a reviewable date
    And the user selects contract rows
    When the user enters a comment and then edits it before submitting
    Then the updated comment should be used upon submission

  # ── Date Loading ─────────────────────────────────────

  # Precondition: User is authenticated; Contract Review page is open
  @smokeBDD @Regression @SLL-208
  Scenario: Selecting a date with no reviewable contracts shows an empty state
    Given the user is logged in to the application
    And the user navigates to the Contract Review page
    When the user selects a date that has no reviewable contracts
    Then an empty state or appropriate message should be displayed in the grid

  # Precondition: User is authenticated; Contract Review page is open
  @smokeBDD @Regression @SLL-208
  Scenario: Invalid date entry in the date selector shows a validation error
    Given the user is logged in to the application
    And the user navigates to the Contract Review page
    When the user enters an invalid date in the date selector
    Then a validation error should be displayed

  # ── Role-Based Access ────────────────────────────────

  # Precondition: User is authenticated with contract review permissions
  @smokeBDD @Smoke @Regression @SLL-208
  Scenario: Authorized user can submit a contract review
    Given the user is logged in with contract review permissions
    When the user navigates to the Contract Review page
    Then the review submission controls should be visible and enabled

  # Precondition: User is authenticated without contract review permissions
  @smokeBDD @Regression @SLL-208
  Scenario: User without review permissions cannot submit a contract review
    Given the user is logged in without contract review permissions
    When the user navigates to the Contract Review page
    Then the review submission controls should not be available or should be disabled
