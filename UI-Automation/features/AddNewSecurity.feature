Feature: Security Master - Add New Security Functionality (SLL-187)
  As an authorized user of SLS V2
  I want to add new security records via the Security Master module
  So that I can create securities using a modal dialog with validated fields that refresh the Ag-Grid on success

  # ── Happy Path ───────────────────────────────────────

  # Precondition: User is authenticated; Security Master page is open
  @smokeBDD @Smoke @Regression @SLL-187
  Scenario: User clicks Add Security button and the modal dialog opens
    Given the user is logged in to the application
    When the user navigates to the Security Master page
    And the user clicks the Add New Security button
    Then the Add New Security modal should be visible

  # Precondition: User is authenticated; Security Master page is open
  @smokeBDD @Smoke @Regression @SLL-187
  Scenario: User fills all required fields and saves — new security record is created and Ag-Grid refreshes
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    And the user clicks the Add New Security button
    When the user fills in all required security fields
    And the user clicks the Save button
    Then a success confirmation should be displayed
    And the Security Master Ag-Grid should refresh with the new security record

  # Precondition: User is authenticated; Security Master page is open
  @smokeBDD @Smoke @Regression @SLL-187
  Scenario: User fills all required and optional fields and saves successfully
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    And the user clicks the Add New Security button
    When the user fills in all required security fields
    And the user fills in all optional security fields
    And the user clicks the Save button
    Then a success confirmation should be displayed
    And the Security Master Ag-Grid should refresh with the new security record

  # ── Role-Based Access ────────────────────────────────

  # Precondition: User is authenticated with write permissions
  @smokeBDD @Smoke @Regression @SLL-187
  Scenario: Authorized user can see and click the Add Security button on the toolbar
    Given the user is logged in to the application
    When the user navigates to the Security Master page
    Then the Add New Security button should be visible and enabled on the toolbar

  # Precondition: User is authenticated with read-only permissions
  @smokeBDD @Regression @SLL-187
  Scenario: Read-only user cannot see or access the Add Security button
    Given the user is logged in to the application
    When the user navigates to the Security Master page
    Then the Add New Security button should not be available for the read-only user

  # ── Acceptance Criteria / UI ─────────────────────────

  # Precondition: User is authenticated; Security Master page is open
  @smokeBDD @Smoke @Regression @SLL-187
  Scenario: Add Security button is visible on the Security Master toolbar
    Given the user is logged in to the application
    When the user navigates to the Security Master page
    Then the Add New Security button should be visible on the Security Master toolbar

  # Precondition: User is authenticated; Add Security button clicked
  @smokeBDD @Smoke @Regression @SLL-187
  Scenario: Modal opens centered on screen with theme-aware styling applied
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    When the user clicks the Add New Security button
    Then the Add New Security modal should be visible
    And the modal should be centered with theme-aware styling

  # Precondition: User is authenticated; modal is open
  @smokeBDD @Smoke @Regression @SLL-187
  Scenario: Modal contains all required fields — Symbol, CUSIP, Description, Close Price, Close Date
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    When the user clicks the Add New Security button
    Then the Symbol input field should be visible in the modal
    And the CUSIP input field should be visible in the modal
    And the Description input field should be visible in the modal
    And the Close Price input field should be visible in the modal
    And the Close Date input field should be visible in the modal

  # Precondition: User is authenticated; modal is open
  @smokeBDD @Regression @SLL-187
  Scenario: Modal contains optional fields — Exchange, Volume, Status
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    When the user clicks the Add New Security button
    Then the Exchange input field should be visible in the modal
    And the Volume input field should be visible in the modal
    And the Status input field should be visible in the modal

  # Precondition: User is authenticated; modal is open with empty form
  @smokeBDD @Smoke @Regression @SLL-187
  Scenario: Save button is disabled when the form is empty
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    When the user clicks the Add New Security button
    Then the Save button should be disabled

  # Precondition: User is authenticated; modal is open
  @smokeBDD @Smoke @Regression @SLL-187
  Scenario: Save button becomes enabled only when all required fields are populated
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    And the user clicks the Add New Security button
    When the user fills in all required security fields
    Then the Save button should be enabled

  # Precondition: User is authenticated; new security was saved successfully
  @smokeBDD @Smoke @Regression @SLL-187
  Scenario: Ag-Grid refreshes after a new security is successfully created
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    And the user clicks the Add New Security button
    When the user fills in all required security fields
    And the user clicks the Save button
    Then the Security Master Ag-Grid should refresh with the new security record

  # Precondition: User is authenticated; modal form is filled and saved
  @smokeBDD @Smoke @Regression @SLL-187
  Scenario: Modal closes after successful save
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    And the user clicks the Add New Security button
    When the user fills in all required security fields
    And the user clicks the Save button
    Then the Add New Security modal should be closed

  # ── Validation — Required Fields Missing ─────────────

  # Precondition: User is authenticated; modal is open; all fields except Symbol are filled
  @smokeBDD @Regression @SLL-187
  Scenario: Save button remains disabled when Symbol is missing
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    And the user clicks the Add New Security button
    When the user fills in all required security fields except Symbol
    Then the Save button should be disabled

  # Precondition: User is authenticated; modal is open; all fields except CUSIP are filled
  @smokeBDD @Regression @SLL-187
  Scenario: Save button remains disabled when CUSIP is missing
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    And the user clicks the Add New Security button
    When the user fills in all required security fields except CUSIP
    Then the Save button should be disabled

  # Precondition: User is authenticated; modal is open; all fields except Description are filled
  @smokeBDD @Regression @SLL-187
  Scenario: Save button remains disabled when Description is missing
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    And the user clicks the Add New Security button
    When the user fills in all required security fields except Description
    Then the Save button should be disabled

  # Precondition: User is authenticated; modal is open; all fields except Close Price are filled
  @smokeBDD @Regression @SLL-187
  Scenario: Save button remains disabled when Close Price is missing
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    And the user clicks the Add New Security button
    When the user fills in all required security fields except Close Price
    Then the Save button should be disabled

  # Precondition: User is authenticated; modal is open; all fields except Close Date are filled
  @smokeBDD @Regression @SLL-187
  Scenario: Save button remains disabled when Close Date is missing
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    And the user clicks the Add New Security button
    When the user fills in all required security fields except Close Date
    Then the Save button should be disabled

  # ── Validation — Invalid Format ──────────────────────

  # Precondition: User is authenticated; modal is open
  @smokeBDD @Regression @SLL-187
  Scenario: Non-numeric value entered in Close Price field — validation error shown
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    And the user clicks the Add New Security button
    When the user enters "abc" in the Close Price field
    Then a validation error should be displayed for the Close Price field

  # Precondition: User is authenticated; modal is open
  @smokeBDD @Regression @SLL-187
  Scenario: Non-numeric value entered in Volume field — validation error shown
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    And the user clicks the Add New Security button
    When the user enters "xyz" in the Volume field
    Then a validation error should be displayed for the Volume field

  # Precondition: User is authenticated; modal is open
  @smokeBDD @Regression @SLL-187
  Scenario: Negative value entered in Close Price — validation error shown
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    And the user clicks the Add New Security button
    When the user enters "-50.00" in the Close Price field
    Then a validation error should be displayed for the Close Price field

  # Precondition: User is authenticated; modal is open
  @smokeBDD @Regression @SLL-187
  Scenario: Negative value entered in Volume — validation error shown
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    And the user clicks the Add New Security button
    When the user enters "-100" in the Volume field
    Then a validation error should be displayed for the Volume field

  # Precondition: User is authenticated; modal is open
  @smokeBDD @Regression @SLL-187
  Scenario: Invalid date format entered in Close Date — validation error shown
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    And the user clicks the Add New Security button
    When the user enters "99/99/9999" in the Close Date field
    Then a validation error should be displayed for the Close Date field

  # ── Boundary / Quantity ──────────────────────────────

  # Precondition: User is authenticated; modal is open
  @smokeBDD @Regression @SLL-187
  Scenario: Volume at minimum boundary zero is accepted
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    And the user clicks the Add New Security button
    When the user enters "0" in the Volume field
    Then no validation error should be displayed for the Volume field

  # Precondition: User is authenticated; modal is open
  @smokeBDD @Regression @SLL-187
  Scenario: Volume below minimum boundary negative is rejected
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    And the user clicks the Add New Security button
    When the user enters "-1" in the Volume field
    Then a validation error should be displayed for the Volume field

  # Precondition: User is authenticated; modal is open
  @smokeBDD @Regression @SLL-187
  Scenario: Very large Volume value is accepted or boundary error is shown
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    And the user clicks the Add New Security button
    When the user enters "999999999999" in the Volume field
    Then the Volume field should either accept the value or display a boundary validation error

  # ── Business Rules ───────────────────────────────────

  # Precondition: User is authenticated; modal is open
  @smokeBDD @Smoke @Regression @SLL-187
  Scenario: Optional fields can be left blank and form saves successfully with only required fields
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    And the user clicks the Add New Security button
    When the user fills in all required security fields
    And the user clicks the Save button
    Then a success confirmation should be displayed

  # Precondition: User is authenticated; modal is open
  @smokeBDD @Smoke @Regression @SLL-187
  Scenario: User cancels the modal without saving — no record is created and Ag-Grid is unchanged
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    And the user clicks the Add New Security button
    When the user closes the modal without saving
    Then the Add New Security modal should be closed
    And the Security Master Ag-Grid should remain unchanged

  # Precondition: User is authenticated; a security was just created
  @smokeBDD @Smoke @Regression @SLL-187
  Scenario: Newly created security appears in the Ag-Grid after successful save
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    And the user clicks the Add New Security button
    When the user fills in all required security fields
    And the user clicks the Save button
    Then the Security Master Ag-Grid should refresh with the new security record

  # ── Edge Cases ───────────────────────────────────────

  # Precondition: User is authenticated; modal is open
  @smokeBDD @Regression @SLL-187
  Scenario: Symbol field with special characters is handled appropriately
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    And the user clicks the Add New Security button
    When the user enters "!@#$%" in the Symbol field
    And the user fills in all other required security fields
    And the user clicks the Save button
    Then the application should handle the special character input appropriately

  # Precondition: User is authenticated; modal is open
  @smokeBDD @Regression @SLL-187
  Scenario: CUSIP field at maximum allowed length is accepted
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    And the user clicks the Add New Security button
    When the user enters a CUSIP value at the maximum allowed length
    Then no validation error should be displayed for the CUSIP field

  # Precondition: User is authenticated; modal is open
  @smokeBDD @Regression @SLL-187
  Scenario: Description field with maximum allowed characters is accepted
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    And the user clicks the Add New Security button
    When the user enters a Description value at the maximum allowed length
    Then no validation error should be displayed for the Description field

  # Precondition: User is authenticated; a security with the same Symbol already exists
  @smokeBDD @Regression @SLL-187
  Scenario: User submits a duplicate Symbol — appropriate error or warning is shown
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    And the user clicks the Add New Security button
    When the user fills in all required fields using an existing Symbol
    And the user clicks the Save button
    Then an appropriate error or warning message should be displayed

  # ── Data-Driven ──────────────────────────────────────

  # Precondition: User is authenticated; Security Master page is open
  @smokeBDD @Regression @SLL-187
  Scenario Outline: Multiple combinations of security field values including valid, missing, and invalid inputs
    Given the user is logged in to the application
    And the user navigates to the Security Master page
    And the user clicks the Add New Security button
    When the user enters "<symbol>" in the Symbol field
    And the user enters "<cusip>" in the CUSIP field
    And the user enters "<closePrice>" in the Close Price field
    Then the expected form outcome should be "<outcome>"

    Examples:
      | symbol | cusip     | closePrice | outcome          |
      | AAPL   | 037833100 | 150.00     | save enabled     |
      | MSFT   | 594918104 | 280.50     | save enabled     |
      | TSLA   | 88160R101 | 720.00     | save enabled     |
      |        | 037833100 | 150.00     | save disabled    |
      | GOOG   | 02079K305 | abc        | validation error |

  # ── End-to-End ───────────────────────────────────────

  # Precondition: Fresh session; valid credentials; Security Master accessible
  @smokeBDD @Smoke @Regression @SLL-187
  Scenario: Full lifecycle — login, navigate to Security Master, click Add Security, fill all fields, save, verify new record in Ag-Grid
    Given the user navigates to the application
    When the user logs in with valid credentials
    Then the user should be redirected to the dashboard
    When the user navigates to the Security Master page
    Then the Add New Security button should be visible on the Security Master toolbar
    When the user clicks the Add New Security button
    Then the Add New Security modal should be visible
    And the Save button should be disabled
    When the user fills in all required security fields
    Then the Save button should be enabled
    When the user clicks the Save button
    Then a success confirmation should be displayed
    And the Add New Security modal should be closed
    And the Security Master Ag-Grid should refresh with the new security record
