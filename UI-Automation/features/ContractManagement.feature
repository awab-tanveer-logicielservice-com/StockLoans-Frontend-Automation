Feature: Contract Management (SLL-208)
  As an authorized user of SLS V2
  I want to manage contracts for the selected depository
  So that I can view, filter, approve, deny, and update contract DTC status

  # ── Happy Path ───────────────────────────────────────────────────────────────

  # Precondition: User is authenticated; Contract Management page is accessible
  @smokeBDD @Smoke @Regression @SLL-208
  Scenario: User navigates to Contract Management and same-day contracts are displayed
    Given the user is logged in to the application
    When the user navigates to the Contract Management page
    And the user selects a depository
    Then same-day contracts for the selected depository should be displayed in the grid

  # Precondition: User is authenticated; depository is selected
  @smokeBDD @Smoke @Regression @SLL-208
  Scenario: User switches to the Pends view and only pending contracts are shown
    Given the user is logged in to the application
    And the user navigates to the Contract Management page
    And the user selects a depository
    When the user selects the Pends view
    Then only pending contracts should be displayed in the grid

  # Precondition: User is authenticated; depository is selected
  @smokeBDD @Smoke @Regression @SLL-208
  Scenario: User switches to the Made view and only made contracts are shown
    Given the user is logged in to the application
    And the user navigates to the Contract Management page
    And the user selects a depository
    When the user selects the Made view
    Then only made contracts should be displayed in the grid

  # Precondition: User is authenticated; depository is selected
  @smokeBDD @Smoke @Regression @SLL-208
  Scenario: User switches to the All view and all same-day contracts are shown
    Given the user is logged in to the application
    And the user navigates to the Contract Management page
    And the user selects a depository
    When the user selects the All view
    Then all same-day contracts for the selected depository should be displayed in the grid

  # ── Depository Scoping ────────────────────────────────────────────────────────

  # Precondition: User is authenticated; initial depository is already selected
  @smokeBDD @Smoke @Regression @SLL-208
  Scenario: Changing the selected depository refreshes the grid with the new depository's contracts
    Given the user is logged in to the application
    And the user navigates to the Contract Management page
    And the user selects a depository
    When the user changes to a different depository
    Then the grid should refresh and display same-day contracts for the new depository only

  # Precondition: User is authenticated; a specific depository is selected
  @smokeBDD @Regression @SLL-208
  Scenario: Contracts from other depositories are not shown for the selected depository
    Given the user is logged in to the application
    And the user navigates to the Contract Management page
    When the user selects a specific depository
    Then only contracts belonging to that depository should be visible in the grid

  # ── Contract Actions ──────────────────────────────────────────────────────────

  # Precondition: User is authenticated with contract approval permissions; submitted contracts exist
  @smokeBDD @Smoke @Regression @SLL-208
  Scenario: Authorized user approves a submitted contract row successfully
    Given the user is logged in with contract approval permissions
    And the user navigates to the Contract Management page
    And the user selects a depository with submitted contracts
    When the user selects a submitted contract row
    And the user clicks the Approve action
    Then the contract should be marked as approved
    And the grid should reflect the updated status

  # Precondition: User is authenticated with contract approval permissions; submitted contracts exist
  @smokeBDD @Smoke @Regression @SLL-208
  Scenario: Authorized user denies a submitted contract row successfully
    Given the user is logged in with contract approval permissions
    And the user navigates to the Contract Management page
    And the user selects a depository with submitted contracts
    When the user selects a submitted contract row
    And the user clicks the Deny action
    Then the contract should be marked as denied
    And the grid should reflect the updated status

  # ── DTC Status ────────────────────────────────────────────────────────────────

  # Precondition: User is authenticated with DTC update permissions; depository is selected
  @smokeBDD @Smoke @Regression @SLL-208
  Scenario: Authorized user updates DTC status to Made for a contract
    Given the user is logged in with DTC update permissions
    And the user navigates to the Contract Management page
    And the user selects a depository
    When the user toggles the DTC status of a contract to Made
    Then the contract DTC status should be updated to Made in the grid

  # Precondition: User is authenticated with DTC update permissions; depository is selected
  @smokeBDD @Smoke @Regression @SLL-208
  Scenario: Authorized user updates DTC status to Pending for a contract
    Given the user is logged in with DTC update permissions
    And the user navigates to the Contract Management page
    And the user selects a depository
    When the user toggles the DTC status of a contract to Pending
    Then the contract DTC status should be updated to Pending in the grid

  # ── Inline Edit ───────────────────────────────────────────────────────────────

  # Precondition: User is authenticated; depository is selected; contract row is visible
  @smokeBDD @Smoke @Regression @SLL-208
  Scenario: User edits a notes or private comment field inline and saves successfully
    Given the user is logged in to the application
    And the user navigates to the Contract Management page
    And the user selects a depository
    When the user edits the notes field for a contract row in the grid
    And the user saves the inline edit
    Then the updated notes should be reflected in the grid

  # ── Role-Based Access ─────────────────────────────────────────────────────────

  # Precondition: User is authenticated without contract approval permissions
  @smokeBDD @Regression @SLL-208
  Scenario: User without approval permissions cannot approve or deny contracts
    Given the user is logged in without contract approval permissions
    When the user navigates to the Contract Management page
    And the user selects a depository with submitted contracts
    Then the Approve and Deny actions should not be available for that user

  # Precondition: User is authenticated without DTC update permissions
  @smokeBDD @Regression @SLL-208
  Scenario: User without DTC update permissions cannot toggle the DTC status
    Given the user is logged in without DTC update permissions
    When the user navigates to the Contract Management page
    And the user selects a depository
    Then the DTC status toggle should not be available for that user
