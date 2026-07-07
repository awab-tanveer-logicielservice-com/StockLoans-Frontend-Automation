Feature: Bulk Snapshot Screen — Renamed from Lending Pit Lookup (SLL-232)
  As a user of SLS V2
  I want the screen formerly known as "Lending Pit Lookup" to be renamed to "Bulk Snapshot"
  So that the navigation link, page heading, and URL consistently reflect the new screen name

  # ── Happy Path ───────────────────────────────────────

  # Precondition: User is authenticated; Bulk Snapshot page is accessible
  @smokeBDD @Smoke @Regression @SLL-232
  Scenario: User navigates to Bulk Snapshot page and it loads with the correct heading and empty state
    Given the user is logged in to the application
    When the user navigates to the Bulk Snapshot page
    Then the Bulk Snapshot page heading should be visible
    And the Bulk Snapshot empty state should show "No Data Available" with "Start Searching" button

  # Precondition: User is authenticated; a valid symbol exists in the system
  @smokeBDD @Smoke @Regression @SLL-232
  Scenario: User enters a valid symbol and fetches rates — results are displayed in the grid
    Given the user is logged in to the application
    When the user navigates to the Bulk Snapshot page
    When the user enters a valid symbol in the Bulk Snapshot search field
    And the user clicks the Bulk Snapshot Fetch Rates button
    Then the Bulk Snapshot Ag-Grid should display matching results

  # Precondition: User is authenticated; a valid symbol exists in the system
  @smokeBDD @Smoke @Regression @SLL-232
  Scenario: User enters multiple symbols and fetches rates — results are displayed for all symbols
    Given the user is logged in to the application
    When the user navigates to the Bulk Snapshot page
    When the user enters multiple symbols in the Bulk Snapshot search field
    And the user clicks the Bulk Snapshot Fetch Rates button
    Then the Bulk Snapshot Ag-Grid should display matching results

  # ── Acceptance Criteria — Screen Rename Verification ─

  # Precondition: User is authenticated; navigation menu is accessible
  @smokeBDD @Smoke @Regression @SLL-232
  Scenario: Navigation menu shows "Bulk Snapshot" as the screen name
    Given the user is logged in to the application
    When the user opens the navigation menu
    Then the navigation link for "Bulk Snapshot" should be visible

  # Precondition: User is authenticated; Bulk Snapshot page is open
  @smokeBDD @Smoke @Regression @SLL-232
  Scenario: Bulk Snapshot page heading displays the new screen name
    Given the user is logged in to the application
    When the user navigates to the Bulk Snapshot page
    Then the Bulk Snapshot page heading should be visible

  # ── Business Rules & Restrictions ────────────────────

  # Precondition: User is authenticated; Bulk Snapshot page is open
  @smokeBDD @Smoke @Regression @SLL-232
  Scenario: Bulk Snapshot form shows Fetch Rates button, Clear button, and Use Cached Rates checkbox
    Given the user is logged in to the application
    When the user navigates to the Bulk Snapshot page
    Then the Bulk Snapshot Fetch Rates button should be visible
    And the Bulk Snapshot Clear button should be visible
    And the Use Cached Rates checkbox should be visible and checked by default

  # Precondition: User is authenticated; Bulk Snapshot page has results loaded
  @smokeBDD @Smoke @Regression @SLL-232
  Scenario: Bulk Snapshot grid displays the expected Symbol, Cusip, and Description columns
    Given the user is logged in to the application
    When the user navigates to the Bulk Snapshot page
    When the user enters a valid symbol in the Bulk Snapshot search field
    And the user clicks the Bulk Snapshot Fetch Rates button
    Then the Bulk Snapshot results grid should display the "Symbol" column
    And the Bulk Snapshot results grid should display the "Cusip" column
    And the Bulk Snapshot results grid should display the "Description" column

  # Precondition: User is authenticated; search results are loaded
  @smokeBDD @Regression @SLL-232
  Scenario: Search results contain a row matching the searched symbol
    Given the user is logged in to the application
    When the user navigates to the Bulk Snapshot page
    When the user enters a valid symbol in the Bulk Snapshot search field
    And the user clicks the Bulk Snapshot Fetch Rates button
    Then the Bulk Snapshot Ag-Grid should display matching results
    And the Bulk Snapshot grid should contain a row matching the searched symbol

  # Precondition: User is authenticated; search results are loaded
  @smokeBDD @Regression @SLL-232
  Scenario: Bulk Snapshot grid rows contain valid populated data values
    Given the user is logged in to the application
    When the user navigates to the Bulk Snapshot page
    When the user enters a valid symbol in the Bulk Snapshot search field
    And the user clicks the Bulk Snapshot Fetch Rates button
    Then the Bulk Snapshot Ag-Grid should display matching results
    And the Bulk Snapshot grid rows should contain valid data values

  # Precondition: User is authenticated; symbols have been entered in the textarea
  @smokeBDD @Regression @SLL-232
  Scenario: Clicking the Clear button resets the Symbol or Cusip textarea
    Given the user is logged in to the application
    When the user navigates to the Bulk Snapshot page
    When the user enters a valid symbol in the Bulk Snapshot search field
    And the user clicks the Bulk Snapshot Clear button
    Then the Bulk Snapshot symbol textarea should be empty

  # ── Validation / Negative ─────────────────────────────

  # Precondition: User is authenticated; Bulk Snapshot page is open with empty textarea
  @smokeBDD @Regression @SLL-232
  Scenario: Clicking Fetch Rates with empty textarea shows no results or empty state
    Given the user is logged in to the application
    When the user navigates to the Bulk Snapshot page
    When the user clicks the Bulk Snapshot Fetch Rates button without entering a symbol
    Then the Bulk Snapshot grid should display the empty state overlay or a validation message

  # Precondition: User is authenticated; Bulk Snapshot page is open
  @smokeBDD @Regression @SLL-232
  Scenario: Searching an unknown symbol shows the empty state or no-results overlay
    Given the user is logged in to the application
    When the user navigates to the Bulk Snapshot page
    When the user enters "ZZZZINVALID" in the Bulk Snapshot search field
    And the user clicks the Bulk Snapshot Fetch Rates button
    Then the Bulk Snapshot Ag-Grid should display the empty state overlay

  # Precondition: User is authenticated; Bulk Snapshot page is open
  @smokeBDD @Regression @SLL-232
  Scenario: Searching with special characters in the symbol field is handled gracefully
    Given the user is logged in to the application
    When the user navigates to the Bulk Snapshot page
    When the user enters "!@#$%" in the Bulk Snapshot search field
    And the user clicks the Bulk Snapshot Fetch Rates button
    Then the Bulk Snapshot page should not crash
    And the Bulk Snapshot grid should display the empty state overlay or a validation message

  # ── Edge Cases ───────────────────────────────────────

  # Precondition: User is authenticated; Bulk Snapshot page freshly loaded with no search performed
  @smokeBDD @Regression @SLL-232
  Scenario: Bulk Snapshot page shows "No Data Available" empty state before any search is performed
    Given the user is logged in to the application
    When the user navigates to the Bulk Snapshot page
    Then the Bulk Snapshot Ag-Grid should display the empty state overlay

  # Precondition: User is authenticated; Bulk Snapshot page has results with multiple columns
  @smokeBDD @Regression @SLL-232
  Scenario: Grid columns remain correctly aligned after results are loaded
    Given the user is logged in to the application
    When the user navigates to the Bulk Snapshot page
    When the user enters a valid symbol in the Bulk Snapshot search field
    And the user clicks the Bulk Snapshot Fetch Rates button
    Then the Bulk Snapshot Ag-Grid should display matching results
    And the Bulk Snapshot grid columns should remain correctly aligned

  # ── Data-Driven ──────────────────────────────────────

  # Precondition: User is authenticated; Bulk Snapshot page is open
  @smokeBDD @Regression @SLL-232
  Scenario Outline: Multiple symbol searches with valid, invalid, and empty inputs
    Given the user is logged in to the application
    When the user navigates to the Bulk Snapshot page
    When the user enters "<symbol>" in the Bulk Snapshot search field
    And the user clicks the Bulk Snapshot Fetch Rates button
    Then the Bulk Snapshot expected search outcome should be "<outcome>"

    Examples:
      | symbol      | outcome       |
      | AAPL        | results shown |
      | MSFT        | results shown |
      | TSLA        | results shown |
      | ZZZZINVALID | empty grid    |
      |             | empty grid    |

  # ── End-to-End ───────────────────────────────────────

  # Precondition: Fresh session; valid credentials available; Bulk Snapshot has data
  @smokeBDD @Smoke @Regression @SLL-232
  Scenario: Full lifecycle — login, verify Bulk Snapshot navigation and rename, search symbols, verify results
    Given the user navigates to the application
    When the user logs in with valid credentials
    Then the user should be redirected to the dashboard
    When the user opens the navigation menu
    Then the navigation link for "Bulk Snapshot" should be visible
    When the user navigates to the Bulk Snapshot page
    Then the Bulk Snapshot page heading should be visible
    And the Bulk Snapshot empty state should show "No Data Available" with "Start Searching" button
    When the user enters multiple symbols in the Bulk Snapshot search field
    And the user clicks the Bulk Snapshot Fetch Rates button
    Then the Bulk Snapshot Ag-Grid should display matching results
    And the Bulk Snapshot results grid should display the "Symbol" column
    And the Bulk Snapshot results grid should display the "Cusip" column
    And the Bulk Snapshot results grid should display the "Description" column
