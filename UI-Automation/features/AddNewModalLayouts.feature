Feature: Add New Modal Layouts — Users, Counterparty, and Entity (SLL-207)
  As an authorized user of SLS V2
  I want to add new records via theme-aware modal dialogs in the Users, Counterparty, and Entity modules
  So that I can create records consistently using a standardized interface aligned with the SLS V2 design system

  # ── Happy Path — Users ───────────────────────────────

  # Precondition: User is authenticated; Users module is open
  @smokeBDD @Smoke @Regression @SLL-207
  Scenario: User clicks Add New button on the Users module and the modal opens
    Given the user is logged in to the application
    When the user navigates to the Users module
    And the user clicks the Add New button
    Then the Add New User modal should be visible

  # Precondition: User is authenticated; Add New User modal is open
  @smokeBDD @Smoke @Regression @SLL-207
  Scenario: User fills all required fields in the Add New User modal and saves successfully
    Given the user is logged in to the application
    And the user navigates to the Users module
    And the user clicks the Add New button
    When the user fills in all required fields in the Add New User modal
    And the user clicks the Save button
    Then a success confirmation should be displayed
    And the Users grid should refresh with the new user record

  # Precondition: User is authenticated; new user record saved successfully
  @smokeBDD @Smoke @Regression @SLL-207
  Scenario: Add New User modal closes after a successful save
    Given the user is logged in to the application
    And the user navigates to the Users module
    And the user clicks the Add New button
    When the user fills in all required fields in the Add New User modal
    And the user clicks the Save button
    Then the Add New User modal should be closed

  # ── Happy Path — Counterparty ────────────────────────

  # Precondition: User is authenticated; Counterparty module is open
  @smokeBDD @Smoke @Regression @SLL-207
  Scenario: User clicks Add New button on the Counterparty module and the modal opens
    Given the user is logged in to the application
    When the user navigates to the Counterparty module
    And the user clicks the Add New button
    Then the Add New Counterparty modal should be visible

  # Precondition: User is authenticated; Add New Counterparty modal is open
  @smokeBDD @Smoke @Regression @SLL-207
  Scenario: User fills all required fields in the Add New Counterparty modal and saves successfully
    Given the user is logged in to the application
    And the user navigates to the Counterparty module
    And the user clicks the Add New button
    When the user fills in all required fields in the Add New Counterparty modal
    And the user clicks the Save button
    Then a success confirmation should be displayed
    And the Counterparty grid should refresh with the new counterparty record

  # Precondition: User is authenticated; new counterparty record saved successfully
  @smokeBDD @Smoke @Regression @SLL-207
  Scenario: Add New Counterparty modal closes after a successful save
    Given the user is logged in to the application
    And the user navigates to the Counterparty module
    And the user clicks the Add New button
    When the user fills in all required fields in the Add New Counterparty modal
    And the user clicks the Save button
    Then the Add New Counterparty modal should be closed

  # ── Happy Path — Entity ──────────────────────────────

  # Precondition: User is authenticated; Entity module is open
  @smokeBDD @Smoke @Regression @SLL-207
  Scenario: User clicks Add New button on the Entity module and the modal opens
    Given the user is logged in to the application
    When the user navigates to the Entity module
    And the user clicks the Add New button
    Then the Add New Entity modal should be visible

  # Precondition: User is authenticated; Add New Entity modal is open
  @smokeBDD @Smoke @Regression @SLL-207
  Scenario: User fills all required fields in the Add New Entity modal and saves successfully
    Given the user is logged in to the application
    And the user navigates to the Entity module
    And the user clicks the Add New button
    When the user fills in all required fields in the Add New Entity modal
    And the user clicks the Save button
    Then a success confirmation should be displayed
    And the Entity grid should refresh with the new entity record

  # Precondition: User is authenticated; new entity record saved successfully
  @smokeBDD @Smoke @Regression @SLL-207
  Scenario: Add New Entity modal closes after a successful save
    Given the user is logged in to the application
    And the user navigates to the Entity module
    And the user clicks the Add New button
    When the user fills in all required fields in the Add New Entity modal
    And the user clicks the Save button
    Then the Add New Entity modal should be closed

  # ── Modal UI & Styling ───────────────────────────────

  # Precondition: User is authenticated; Add New User modal is open
  @smokeBDD @Smoke @Regression @SLL-207
  Scenario: Add New User modal is centered on screen with theme-aware styling
    Given the user is logged in to the application
    And the user navigates to the Users module
    When the user clicks the Add New button
    Then the Add New User modal should be centered with theme-aware styling

  # Precondition: User is authenticated; Add New Counterparty modal is open
  @smokeBDD @Smoke @Regression @SLL-207
  Scenario: Add New Counterparty modal is centered on screen with theme-aware styling
    Given the user is logged in to the application
    And the user navigates to the Counterparty module
    When the user clicks the Add New button
    Then the Add New Counterparty modal should be centered with theme-aware styling

  # Precondition: User is authenticated; Add New Entity modal is open
  @smokeBDD @Smoke @Regression @SLL-207
  Scenario: Add New Entity modal is centered on screen with theme-aware styling
    Given the user is logged in to the application
    And the user navigates to the Entity module
    When the user clicks the Add New button
    Then the Add New Entity modal should be centered with theme-aware styling

  # Precondition: User is authenticated; all three modules are accessible
  @smokeBDD @Regression @SLL-207
  Scenario: All three Add New modals share a consistent layout aligned with the SLS V2 design system
    Given the user is logged in to the application
    When the user opens the Add New modal on the Users module
    And the user opens the Add New modal on the Counterparty module
    And the user opens the Add New modal on the Entity module
    Then all three modals should have a consistent layout and styling

  # ── Add New Button Visibility ────────────────────────

  # Precondition: User is authenticated; Users module is open
  @smokeBDD @Smoke @Regression @SLL-207
  Scenario: Add New button is visible and enabled on the Users module toolbar
    Given the user is logged in to the application
    When the user navigates to the Users module
    Then the Add New button should be visible and enabled on the toolbar

  # Precondition: User is authenticated; Counterparty module is open
  @smokeBDD @Smoke @Regression @SLL-207
  Scenario: Add New button is visible and enabled on the Counterparty module toolbar
    Given the user is logged in to the application
    When the user navigates to the Counterparty module
    Then the Add New button should be visible and enabled on the toolbar

  # Precondition: User is authenticated; Entity module is open
  @smokeBDD @Smoke @Regression @SLL-207
  Scenario: Add New button is visible and enabled on the Entity module toolbar
    Given the user is logged in to the application
    When the user navigates to the Entity module
    Then the Add New button should be visible and enabled on the toolbar

  # ── Save Button State ────────────────────────────────

  # Precondition: User is authenticated; Add New User modal is open with empty form
  @smokeBDD @Smoke @Regression @SLL-207
  Scenario: Save button is disabled when the Add New User modal form is empty
    Given the user is logged in to the application
    And the user navigates to the Users module
    When the user clicks the Add New button
    Then the Save button should be disabled

  # Precondition: User is authenticated; Add New Counterparty modal is open with empty form
  @smokeBDD @Smoke @Regression @SLL-207
  Scenario: Save button is disabled when the Add New Counterparty modal form is empty
    Given the user is logged in to the application
    And the user navigates to the Counterparty module
    When the user clicks the Add New button
    Then the Save button should be disabled

  # Precondition: User is authenticated; Add New Entity modal is open with empty form
  @smokeBDD @Smoke @Regression @SLL-207
  Scenario: Save button is disabled when the Add New Entity modal form is empty
    Given the user is logged in to the application
    And the user navigates to the Entity module
    When the user clicks the Add New button
    Then the Save button should be disabled

  # Precondition: User is authenticated; Add New User modal is open
  @smokeBDD @Smoke @Regression @SLL-207
  Scenario: Save button becomes enabled when all required fields are populated in the Add New User modal
    Given the user is logged in to the application
    And the user navigates to the Users module
    And the user clicks the Add New button
    When the user fills in all required fields in the Add New User modal
    Then the Save button should be enabled

  # Precondition: User is authenticated; Add New Counterparty modal is open
  @smokeBDD @Smoke @Regression @SLL-207
  Scenario: Save button becomes enabled when all required fields are populated in the Add New Counterparty modal
    Given the user is logged in to the application
    And the user navigates to the Counterparty module
    And the user clicks the Add New button
    When the user fills in all required fields in the Add New Counterparty modal
    Then the Save button should be enabled

  # Precondition: User is authenticated; Add New Entity modal is open
  @smokeBDD @Smoke @Regression @SLL-207
  Scenario: Save button becomes enabled when all required fields are populated in the Add New Entity modal
    Given the user is logged in to the application
    And the user navigates to the Entity module
    And the user clicks the Add New button
    When the user fills in all required fields in the Add New Entity modal
    Then the Save button should be enabled

  # ── Cancel / Close Behaviour ─────────────────────────

  # Precondition: User is authenticated; Add New User modal is open
  @smokeBDD @Smoke @Regression @SLL-207
  Scenario: User cancels the Add New User modal without saving — no record created and grid unchanged
    Given the user is logged in to the application
    And the user navigates to the Users module
    And the user clicks the Add New button
    When the user closes the modal without saving
    Then the Add New User modal should be closed
    And the Users grid should remain unchanged

  # Precondition: User is authenticated; Add New Counterparty modal is open
  @smokeBDD @Smoke @Regression @SLL-207
  Scenario: User cancels the Add New Counterparty modal without saving — no record created and grid unchanged
    Given the user is logged in to the application
    And the user navigates to the Counterparty module
    And the user clicks the Add New button
    When the user closes the modal without saving
    Then the Add New Counterparty modal should be closed
    And the Counterparty grid should remain unchanged

  # Precondition: User is authenticated; Add New Entity modal is open
  @smokeBDD @Smoke @Regression @SLL-207
  Scenario: User cancels the Add New Entity modal without saving — no record created and grid unchanged
    Given the user is logged in to the application
    And the user navigates to the Entity module
    And the user clicks the Add New button
    When the user closes the modal without saving
    Then the Add New Entity modal should be closed
    And the Entity grid should remain unchanged

  # ── Validation ───────────────────────────────────────

  # Precondition: User is authenticated; Add New User modal is open
  @smokeBDD @Regression @SLL-207
  Scenario: Submitting Add New User modal with a missing required field keeps Save disabled
    Given the user is logged in to the application
    And the user navigates to the Users module
    And the user clicks the Add New button
    When the user fills in all required fields except one in the Add New User modal
    Then the Save button should be disabled

  # Precondition: User is authenticated; Add New Counterparty modal is open
  @smokeBDD @Regression @SLL-207
  Scenario: Submitting Add New Counterparty modal with a missing required field keeps Save disabled
    Given the user is logged in to the application
    And the user navigates to the Counterparty module
    And the user clicks the Add New button
    When the user fills in all required fields except one in the Add New Counterparty modal
    Then the Save button should be disabled

  # Precondition: User is authenticated; Add New Entity modal is open
  @smokeBDD @Regression @SLL-207
  Scenario: Submitting Add New Entity modal with a missing required field keeps Save disabled
    Given the user is logged in to the application
    And the user navigates to the Entity module
    And the user clicks the Add New button
    When the user fills in all required fields except one in the Add New Entity modal
    Then the Save button should be disabled

  # Precondition: User is authenticated; existing user record details are known
  @smokeBDD @Regression @SLL-207
  Scenario: Duplicate record submission in Add New User modal shows an appropriate error
    Given the user is logged in to the application
    And the user navigates to the Users module
    And the user clicks the Add New button
    When the user fills in all required fields using details of an existing user
    And the user clicks the Save button
    Then an appropriate error or warning message should be displayed

  # Precondition: User is authenticated; existing counterparty record details are known
  @smokeBDD @Regression @SLL-207
  Scenario: Duplicate record submission in Add New Counterparty modal shows an appropriate error
    Given the user is logged in to the application
    And the user navigates to the Counterparty module
    And the user clicks the Add New button
    When the user fills in all required fields using details of an existing counterparty
    And the user clicks the Save button
    Then an appropriate error or warning message should be displayed

  # Precondition: User is authenticated; existing entity record details are known
  @smokeBDD @Regression @SLL-207
  Scenario: Duplicate record submission in Add New Entity modal shows an appropriate error
    Given the user is logged in to the application
    And the user navigates to the Entity module
    And the user clicks the Add New button
    When the user fills in all required fields using details of an existing entity
    And the user clicks the Save button
    Then an appropriate error or warning message should be displayed

  # ── Role-Based Access ────────────────────────────────

  # Precondition: User is authenticated with read-only permissions
  @smokeBDD @Regression @SLL-207
  Scenario: Read-only user cannot access the Add New button on the Users module
    Given the user is logged in with read-only permissions
    When the user navigates to the Users module
    Then the Add New button should not be available or should be disabled

  # Precondition: User is authenticated with read-only permissions
  @smokeBDD @Regression @SLL-207
  Scenario: Read-only user cannot access the Add New button on the Counterparty module
    Given the user is logged in with read-only permissions
    When the user navigates to the Counterparty module
    Then the Add New button should not be available or should be disabled

  # Precondition: User is authenticated with read-only permissions
  @smokeBDD @Regression @SLL-207
  Scenario: Read-only user cannot access the Add New button on the Entity module
    Given the user is logged in with read-only permissions
    When the user navigates to the Entity module
    Then the Add New button should not be available or should be disabled

  # ── End-to-End ───────────────────────────────────────

  # Precondition: Fresh session; valid credentials; Users, Counterparty, and Entity modules accessible
  @smokeBDD @Smoke @Regression @SLL-207
  Scenario: Full lifecycle — add new User, Counterparty, and Entity records and verify all grids refresh
    Given the user navigates to the application
    When the user logs in with valid credentials
    Then the user should be redirected to the dashboard
    When the user navigates to the Users module
    And the user clicks the Add New button
    Then the Add New User modal should be visible
    And the Save button should be disabled
    When the user fills in all required fields in the Add New User modal
    And the user clicks the Save button
    Then a success confirmation should be displayed
    And the Users grid should refresh with the new user record
    When the user navigates to the Counterparty module
    And the user clicks the Add New button
    Then the Add New Counterparty modal should be visible
    When the user fills in all required fields in the Add New Counterparty modal
    And the user clicks the Save button
    Then a success confirmation should be displayed
    And the Counterparty grid should refresh with the new counterparty record
    When the user navigates to the Entity module
    And the user clicks the Add New button
    Then the Add New Entity modal should be visible
    When the user fills in all required fields in the Add New Entity modal
    And the user clicks the Save button
    Then a success confirmation should be displayed
    And the Entity grid should refresh with the new entity record
