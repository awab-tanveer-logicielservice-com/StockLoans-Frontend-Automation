Feature: Contract Management, LCOR, and Contract Review Components (SLL-208)
  As an authorized user of SLS V2
  I want to manage contracts, submit LCOR batches, and review contracts
  So that I can perform the same operations available in the legacy SLS V1 screens

  # ══════════════════════════════════════════════════════
  # CONTRACT MANAGEMENT
  # ══════════════════════════════════════════════════════

  # ── Happy Path — Contract Management ────────────────

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

  # Precondition: User is authenticated; depository is selected; contract row is visible
  @smokeBDD @Smoke @Regression @SLL-208
  Scenario: User edits a notes or private comment field inline and saves successfully
    Given the user is logged in to the application
    And the user navigates to the Contract Management page
    And the user selects a depository
    When the user edits the notes field for a contract row in the grid
    And the user saves the inline edit
    Then the updated notes should be reflected in the grid

  # ── Depository Scoping — Contract Management ────────

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

  # ── Role-Based Access — Contract Management ─────────

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

  # ══════════════════════════════════════════════════════
  # LCOR
  # ══════════════════════════════════════════════════════

  # ── Happy Path — LCOR ────────────────────────────────

  # Precondition: User is authenticated; LCOR page is accessible
  @smokeBDD @Smoke @Regression @SLL-208
  Scenario: User navigates to LCOR and current-day records for the selected depository are displayed
    Given the user is logged in to the application
    When the user navigates to the LCOR page
    And the user selects a depository
    Then current-day LCOR records for the selected depository should be displayed in the grid

  # Precondition: User is authenticated; depository is selected
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

  # Precondition: User is authenticated; depository is selected
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

  # Precondition: User is authenticated; depository has existing LCOR records
  @smokeBDD @Smoke @Regression @SLL-208
  Scenario: User clicks a row in the LCOR grid and the pinned detail summary is displayed
    Given the user is logged in to the application
    And the user navigates to the LCOR page
    And the user selects a depository with existing LCOR records
    When the user clicks on an LCOR row in the grid
    Then the pinned detail summary for that record should be displayed at the bottom of the page

  # Precondition: User is authenticated; LCOR form fields have been filled
  @smokeBDD @Smoke @Regression @SLL-208
  Scenario: User resets the LCOR form and all fields are cleared
    Given the user is logged in to the application
    And the user navigates to the LCOR page
    When the user fills in LCOR batch fields
    And the user clicks the Reset button
    Then all LCOR form fields should be cleared

  # ── Form Validation — LCOR ───────────────────────────

  # Precondition: User is authenticated; LCOR page is open
  @smokeBDD @Smoke @Regression @SLL-208
  Scenario: LCOR batch submission is blocked when Contra Loanet ID is missing
    Given the user is logged in to the application
    And the user navigates to the LCOR page
    When the user fills in all required LCOR fields except Contra Loanet ID
    Then the LCOR submission should be disabled or a validation error should be displayed

  # Precondition: User is authenticated; LCOR page is open
  @smokeBDD @Smoke @Regression @SLL-208
  Scenario: LCOR batch submission is blocked when Symbol or CUSIP is missing
    Given the user is logged in to the application
    And the user navigates to the LCOR page
    When the user fills in all required LCOR fields except Symbol or CUSIP
    Then the LCOR submission should be disabled or a validation error should be displayed

  # Precondition: User is authenticated; LCOR page is open
  @smokeBDD @Smoke @Regression @SLL-208
  Scenario: LCOR batch submission is blocked when Quantity is missing
    Given the user is logged in to the application
    And the user navigates to the LCOR page
    When the user fills in all required LCOR fields except Quantity
    Then the LCOR submission should be disabled or a validation error should be displayed

  # Precondition: User is authenticated; LCOR page is open
  @smokeBDD @Regression @SLL-208
  Scenario: Non-numeric value entered in Quantity field shows a validation error
    Given the user is logged in to the application
    And the user navigates to the LCOR page
    When the user enters "abc" in the Quantity field
    Then a validation error should be displayed for the Quantity field

  # Precondition: User is authenticated; LCOR page is open
  @smokeBDD @Regression @SLL-208
  Scenario: Negative value entered in Quantity field shows a validation error
    Given the user is logged in to the application
    And the user navigates to the LCOR page
    When the user enters "-100" in the Quantity field
    Then a validation error should be displayed for the Quantity field

  # Precondition: User is authenticated; LCOR page is open
  @smokeBDD @Regression @SLL-208
  Scenario: Non-numeric value entered in Min Rebate field shows a validation error
    Given the user is logged in to the application
    And the user navigates to the LCOR page
    When the user enters "abc" in the Min Rebate field
    Then a validation error should be displayed for the Min Rebate field

  # ── Depository Scoping — LCOR ────────────────────────

  # Precondition: User is authenticated; a specific depository is selected
  @smokeBDD @Smoke @Regression @SLL-208
  Scenario: LCOR grid only shows current-day records for the selected depository
    Given the user is logged in to the application
    And the user navigates to the LCOR page
    When the user selects a specific depository
    Then only current-day LCOR records for that depository should be displayed

  # Precondition: User is authenticated; initial depository is already selected
  @smokeBDD @Regression @SLL-208
  Scenario: Changing the depository on the LCOR page refreshes the grid with the new depository's records
    Given the user is logged in to the application
    And the user navigates to the LCOR page
    And the user selects a depository
    When the user changes to a different depository
    Then the grid should refresh with current-day records for the new depository only

  # ══════════════════════════════════════════════════════
  # CONTRACT REVIEW
  # ══════════════════════════════════════════════════════

  # ── Happy Path — Contract Review ─────────────────────

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

  # ── Row Selection & Comments — Contract Review ───────

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

  # ── Date Loading — Contract Review ───────────────────

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

  # ── Role-Based Access — Contract Review ──────────────

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

  # ── End-to-End ───────────────────────────────────────

  # Precondition: Fresh session; valid credentials; all three modules accessible
  @smokeBDD @Smoke @Regression @SLL-208
  Scenario: Full lifecycle — Contract Management approve, LCOR batch submit, Contract Review submit
    Given the user navigates to the application
    When the user logs in with valid credentials
    Then the user should be redirected to the dashboard
    When the user navigates to the Contract Management page
    And the user selects a depository
    Then same-day contracts should be displayed in the grid
    When the user selects the Pends view
    Then pending contracts should be displayed
    When the user navigates to the LCOR page
    And the user selects a depository
    And the user enters all required LCOR fields
    And the user submits the LCOR batch
    Then the LCOR batch should be submitted successfully
    And the new record should appear in the LCOR grid
    When the user navigates to the Contract Review page
    And the user selects an unreviewed day from the list
    Then reviewable contracts should be loaded in the grid
    When the user selects contract rows and enters a comment
    And the user submits the review
    Then the review should be submitted successfully
    And the unreviewed-day list should refresh
