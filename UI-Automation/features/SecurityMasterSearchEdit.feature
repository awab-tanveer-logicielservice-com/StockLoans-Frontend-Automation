Feature: Security Master - Search, Edit & Contract Updates (SLL-188)
  As an authorized user of SLS V2
  I want to search, view and edit security records and update related contracts
  So that I can manage security data and trigger contract adjustments from a single screen

  # ── Happy Path ───────────────────────────────────────

  # Precondition: User is authenticated; Security Master page is open
  @smokeBDD @Smoke @Regression @SLL-188
  Scenario: User searches for a security by Symbol and results appear in the grid
    Given the user is logged in to the application
    When the user navigates to the Security Master page
    And the user enters a valid Symbol in the search field
    And the user submits the search
    Then matching security records should be displayed in the Ag-Grid

  # Precondition: User is authenticated; search has returned results
  @smokeBDD @Smoke @Regression @SLL-188
  Scenario: User selects a security record and the editable detail view is populated
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    And the user searches for and selects a security record
    Then the editable detail view should be visible
    And the Symbol field should be populated with the selected security's value
    And the CUSIP field should be populated with the selected security's value
    And the Description field should be populated with the selected security's value
    And the Exchange field should be populated with the selected security's value
    And the Volume field should be populated with the selected security's value
    And the Close Price field should be populated with the selected security's value
    And the Close Date field should be populated with the selected security's value
    And the Status field should be populated with the selected security's value

  # Precondition: User is authenticated; a security record is selected
  @smokeBDD @Smoke @Regression @SLL-188
  Scenario: User edits security fields and saves successfully
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    And the user searches for and selects a security record
    When the user modifies the Description field with a new value
    And the user clicks the Save button
    Then a success confirmation should be displayed
    And the Ag-Grid should refresh reflecting the updated security record

  # Precondition: User is authenticated; a security record is selected
  @smokeBDD @Smoke @Regression @SLL-188
  Scenario: User enables the Update Contract toggle and the contract sub-view appears
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    And the user searches for and selects a security record
    When the user enables the Update Contract toggle switch
    Then the contract update sub-view should be visible
    And the Existing Symbol field should be displayed
    And the Existing CUSIP field should be displayed
    And the Update action button should be displayed

  # Precondition: User is authenticated; contract sub-view is open
  @smokeBDD @Smoke @Regression @SLL-188
  Scenario: User fills contract update fields and clicks Update to commit changes
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    And the user searches for and selects a security record
    And the user enables the Update Contract toggle switch
    When the user enters a valid Existing Symbol
    And the user enters a valid Existing CUSIP
    And the user clicks the Update action button
    Then a success confirmation for the contract update should be displayed

  # ── Security Search ──────────────────────────────────

  # Precondition: User is authenticated; Security Master page is open
  @smokeBDD @Smoke @Regression @SLL-188
  Scenario: User searches by CUSIP and matching records are returned
    Given the user is logged in to the application
    When the user navigates to the Security Master page
    And the user enters a valid CUSIP in the search field
    And the user submits the search
    Then matching security records should be displayed in the Ag-Grid

  # Precondition: User is authenticated; Security Master page is open
  @smokeBDD @Regression @SLL-188
  Scenario: Search returns no results for a non-existent Symbol
    Given the user is logged in to the application
    When the user navigates to the Security Master page
    And the user enters a Symbol that does not exist
    And the user submits the search
    Then an empty state or no results message should be displayed in the Ag-Grid

  # Precondition: User is authenticated; a search with results has been performed
  @smokeBDD @Regression @SLL-188
  Scenario: Search field is cleared and grid resets to default state
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    And the user has performed a search with results
    When the user clears the search field
    Then the Ag-Grid should reset to its default state

  # Precondition: User is authenticated; Security Master page is open
  @smokeBDD @Regression @SLL-188
  Scenario: Search with partial Symbol returns relevant results
    Given the user is logged in to the application
    When the user navigates to the Security Master page
    And the user enters a partial Symbol in the search field
    And the user submits the search
    Then security records matching the partial Symbol should be displayed in the Ag-Grid

  # ── Editable Detail View ─────────────────────────────

  # Precondition: User is authenticated; a security record is selected
  @smokeBDD @Smoke @Regression @SLL-188
  Scenario: All editable fields are enabled when a security is selected
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    When the user searches for and selects a security record
    Then the Symbol input should be editable
    And the CUSIP input should be editable
    And the Description input should be editable
    And the Close Price input should be editable
    And the Close Date input should be editable

  # Precondition: User is authenticated; no security has been selected
  @smokeBDD @Regression @SLL-188
  Scenario: Detail view is empty or hidden before a security is selected
    Given the user is logged in to the application
    When the user navigates to the Security Master page
    Then the editable detail view should not be visible or should be empty

  # Precondition: User is authenticated; a security record is already selected
  @smokeBDD @Regression @SLL-188
  Scenario: Selecting a different security in the grid updates the detail view
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    And the user searches for and selects a security record
    When the user selects a different security record from the Ag-Grid
    Then the editable detail view should update with the new selection's data

  # ── Contract Update Toggle ───────────────────────────

  # Precondition: User is authenticated; a security record is selected
  @smokeBDD @Smoke @Regression @SLL-188
  Scenario: Update Contract toggle is visible in the detail view
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    When the user searches for and selects a security record
    Then the Update Contract toggle switch should be visible in the detail view

  # Precondition: User is authenticated; a security record is selected
  @smokeBDD @Smoke @Regression @SLL-188
  Scenario: Update Contract toggle is disabled by default
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    When the user searches for and selects a security record
    Then the Update Contract toggle switch should be in the disabled state

  # Precondition: User is authenticated; Update Contract toggle is enabled
  @smokeBDD @Smoke @Regression @SLL-188
  Scenario: Disabling the Update Contract toggle hides the contract sub-view
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    And the user searches for and selects a security record
    And the user enables the Update Contract toggle switch
    When the user disables the Update Contract toggle switch
    Then the contract update sub-view should no longer be visible

  # ── Contract Update Sub-view ─────────────────────────

  # Precondition: User is authenticated; contract sub-view is open; fields are empty
  @smokeBDD @Smoke @Regression @SLL-188
  Scenario: Update button is disabled when Existing Symbol and CUSIP are empty
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    And the user searches for and selects a security record
    When the user enables the Update Contract toggle switch
    Then the Update action button should be disabled

  # Precondition: User is authenticated; contract sub-view is open
  @smokeBDD @Regression @SLL-188
  Scenario: Update button becomes enabled when both Existing Symbol and CUSIP are filled
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    And the user searches for and selects a security record
    And the user enables the Update Contract toggle switch
    When the user enters a valid Existing Symbol
    And the user enters a valid Existing CUSIP
    Then the Update action button should be enabled

  # Precondition: User is authenticated; contract sub-view is open; only Symbol filled
  @smokeBDD @Regression @SLL-188
  Scenario: Update button remains disabled when only Existing Symbol is filled
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    And the user searches for and selects a security record
    And the user enables the Update Contract toggle switch
    When the user enters a valid Existing Symbol
    Then the Update action button should be disabled

  # Precondition: User is authenticated; contract sub-view is open; only CUSIP filled
  @smokeBDD @Regression @SLL-188
  Scenario: Update button remains disabled when only Existing CUSIP is filled
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    And the user searches for and selects a security record
    And the user enables the Update Contract toggle switch
    When the user enters a valid Existing CUSIP
    Then the Update action button should be disabled

  # ── Validation ───────────────────────────────────────

  # Precondition: User is authenticated; a security record is selected
  @smokeBDD @Regression @SLL-188
  Scenario: Non-numeric value in Close Price field shows validation error
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    And the user searches for and selects a security record
    When the user enters "abc" in the Close Price field
    Then a validation error should be displayed for the Close Price field

  # Precondition: User is authenticated; a security record is selected
  @smokeBDD @Regression @SLL-188
  Scenario: Negative value in Close Price field shows validation error
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    And the user searches for and selects a security record
    When the user enters "-50.00" in the Close Price field
    Then a validation error should be displayed for the Close Price field

  # Precondition: User is authenticated; a security record is selected
  @smokeBDD @Regression @SLL-188
  Scenario: Invalid date format in Close Date field shows validation error
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    And the user searches for and selects a security record
    When the user enters "99/99/9999" in the Close Date field
    Then a validation error should be displayed for the Close Date field

  # Precondition: User is authenticated; a security record is selected
  @smokeBDD @Regression @SLL-188
  Scenario: Clearing a required field disables the Save button
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    And the user searches for and selects a security record
    When the user clears the Symbol field
    Then the Save button should be disabled

  # ── UI / Acceptance Criteria ─────────────────────────

  # Precondition: User is authenticated; Security Master page is open
  @smokeBDD @Smoke @Regression @SLL-188
  Scenario: Security Master page uses Ag-Grid for search results display
    Given the user is logged in to the application
    When the user navigates to the Security Master page
    Then the security records should be displayed in an Ag-Grid component

  # Precondition: User is authenticated; a security record is selected
  @smokeBDD @Smoke @Regression @SLL-188
  Scenario: Detail view inputs are theme-aware and match SLS V2 styling
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    When the user searches for and selects a security record
    Then the detail view inputs should display with theme-aware styling

  # Precondition: User is authenticated; Security Master page is open
  @smokeBDD @Regression @SLL-188
  Scenario: Layout is presented as a single-screen view with no page navigation required
    Given the user is logged in to the application
    When the user navigates to the Security Master page
    Then the search, grid, and detail view should all be visible on a single screen

  # ── Business Rules ───────────────────────────────────

  # Precondition: User is authenticated; a security record is selected; toggle is off
  @smokeBDD @Smoke @Regression @SLL-188
  Scenario: Editing a security does not automatically trigger a contract update
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    And the user searches for and selects a security record
    When the user modifies a security field and saves
    Then no contract update should be triggered unless the Update Contract toggle is enabled

  # Precondition: User is authenticated; contract sub-view is open
  @smokeBDD @Regression @SLL-188
  Scenario: Contract update with a non-existent Existing Symbol shows an appropriate error
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    And the user searches for and selects a security record
    And the user enables the Update Contract toggle switch
    When the user enters a non-existent Symbol in the Existing Symbol field
    And the user enters a valid Existing CUSIP
    And the user clicks the Update action button
    Then an appropriate error or warning message should be displayed

  # Precondition: User is authenticated; a security record is selected and fields modified
  @smokeBDD @Regression @SLL-188
  Scenario: Cancelling the edit does not persist changes to the security record
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    And the user searches for and selects a security record
    When the user modifies a field in the detail view
    And the user cancels or navigates away without saving
    Then the security record should remain unchanged in the Ag-Grid

  # ── Edge Cases ───────────────────────────────────────

  # Precondition: User is authenticated; Security Master page is open
  @smokeBDD @Regression @SLL-188
  Scenario: Search field with only whitespace does not execute a search
    Given the user is logged in to the application
    When the user navigates to the Security Master page
    And the user enters only whitespace in the search field
    And the user submits the search
    Then no search should be executed or an appropriate message should be displayed

  # Precondition: User is authenticated; Security Master page is open
  @smokeBDD @Regression @SLL-188
  Scenario: Search with special characters is handled gracefully
    Given the user is logged in to the application
    When the user navigates to the Security Master page
    And the user enters "!@#$%" in the search field
    And the user submits the search
    Then the application should handle the special character search gracefully without errors

  # Precondition: User is authenticated; a security record is selected
  @smokeBDD @Regression @SLL-188
  Scenario: Volume field in detail view rejects negative values
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    And the user searches for and selects a security record
    When the user enters "-1" in the Volume field
    Then a validation error should be displayed for the Volume field

  # ── End-to-End ───────────────────────────────────────

  # Precondition: Fresh session; valid credentials; Security Master accessible
  @smokeBDD @Smoke @Regression @SLL-188
  Scenario: Full lifecycle — search security, edit fields, enable contract update, commit update, verify grid
    Given the user navigates to the application
    When the user logs in with valid credentials
    Then the user should be redirected to the dashboard
    When the user navigates to the Security Master page
    Then the Ag-Grid should be visible
    When the user enters a valid Symbol in the search field
    And the user submits the search
    Then matching security records should be displayed in the Ag-Grid
    When the user selects a security record from the grid
    Then the editable detail view should be populated
    And the Update Contract toggle switch should be visible
    When the user modifies the Close Price field with a valid value
    And the user enables the Update Contract toggle switch
    And the user enters a valid Existing Symbol
    And the user enters a valid Existing CUSIP
    And the user clicks the Update action button
    Then a success confirmation for the contract update should be displayed
    And the Ag-Grid should refresh reflecting the updated security record
