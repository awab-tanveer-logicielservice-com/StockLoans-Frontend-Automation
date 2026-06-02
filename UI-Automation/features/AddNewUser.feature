Feature: Add New User — Admin User Management (SLL-Users)
  As an authorized administrator of SLS V2
  I want to create new platform users via the Users admin page
  So that I can grant access to new team members

  # ── Navigation & Page Load ────────────────────────────

  # Precondition: Admin is authenticated
  @smokeBDD @Smoke @Regression
  Scenario: Admin navigates to the Users Management page
    Given the user is logged in to the application
    When the user navigates to the Users Management page
    Then the Users AG-Grid should be visible
    And the ADD NEW USER button should be visible

  # ── Modal Open ────────────────────────────────────────

  # Precondition: Admin is on the Users page
  @smokeBDD @Smoke @Regression
  Scenario: Opening the Add New User modal reveals all required fields
    Given the user is logged in to the application
    When the user navigates to the Users Management page
    And the user clicks the ADD NEW USER button
    Then the Email field should be visible in the modal
    And the First Name field should be visible in the modal
    And the Last Name field should be visible in the modal
    And the Title field should be visible in the modal
    And the Nickname field should be visible in the modal

  # ── Button State ──────────────────────────────────────

  # Precondition: Modal is open, no fields filled
  @smokeBDD @Smoke @Regression
  Scenario: ADD USER button is disabled when no fields are filled
    Given the user is logged in to the application
    When the user navigates to the Users Management page
    And the user clicks the ADD NEW USER button
    Then the ADD USER button should be disabled

  # Precondition: Modal is open
  @smokeBDD @Smoke @Regression
  Scenario: ADD USER button becomes enabled after all required fields are filled
    Given the user is logged in to the application
    When the user navigates to the Users Management page
    And the user clicks the ADD NEW USER button
    And the user fills in all new user details
    Then the ADD USER button should be enabled

  # ── Email Validation ─────────────────────────────────

  # Precondition: Modal is open
  @smokeBDD @Smoke @Regression
  Scenario: Invalid email format triggers a validation error on blur
    Given the user is logged in to the application
    When the user navigates to the Users Management page
    And the user clicks the ADD NEW USER button
    And the user enters an invalid email "not-an-email"
    And the user moves focus away from the Email field
    Then an email validation error should be displayed

  # Precondition: Modal is open
  @smokeBDD @Regression
  Scenario: Valid email format does not trigger a validation error
    Given the user is logged in to the application
    When the user navigates to the Users Management page
    And the user clicks the ADD NEW USER button
    And the user enters a valid email "testuser@example.com"
    And the user moves focus away from the Email field
    Then no email validation error should be displayed

  # ── Create User ───────────────────────────────────────

  # Precondition: All fields are filled with valid data
  @smokeBDD @Smoke @Regression
  Scenario: Admin creates a new user successfully and sees a success notification
    Given the user is logged in to the application
    When the user navigates to the Users Management page
    And the user clicks the ADD NEW USER button
    And the user fills in all new user details
    And the user submits the new user form
    Then a user creation success notification should be displayed

  # Precondition: User was just created successfully
  @smokeBDD @Regression
  Scenario: Users grid refreshes automatically after a new user is saved
    Given the user is logged in to the application
    When the user navigates to the Users Management page
    And the user clicks the ADD NEW USER button
    And the user fills in all new user details
    And the user submits the new user form
    Then the Users grid should refresh with the new user record
