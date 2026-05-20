Feature: Remember Me Functionality in Login Component (SLL-171)
  As a user of SLS V2
  I want a Remember Me option on the login page
  So that my credentials are saved and automatically populated on subsequent visits for a faster login experience

  # ── Happy Path ───────────────────────────────────────

  # Precondition: User is not logged in; login page is open
  @smokeBDD @Smoke @Regression @SLL-171
  Scenario: Remember Me checkbox is visible on the login page
    Given the user is on the login page
    Then the Remember Me checkbox should be visible on the login form

  # Precondition: User is not logged in; login page is open
  @smokeBDD @Smoke @Regression @SLL-171
  Scenario: Remember Me checkbox is unchecked by default
    Given the user is on the login page
    Then the Remember Me checkbox should be unchecked by default

  # Precondition: User is not logged in; login page is open
  @smokeBDD @Smoke @Regression @SLL-171
  Scenario: User checks Remember Me and logs in — credentials are populated on next visit
    Given the user is on the login page
    When the user enters a valid email address
    And the user enters a valid password
    And the user checks the Remember Me checkbox
    And the user clicks the Login button
    And the user logs out and navigates back to the login page
    Then the Email field should be automatically populated with the saved email
    And the Password field should be automatically populated with the saved password

  # Precondition: User previously logged in with Remember Me enabled
  @smokeBDD @Smoke @Regression @SLL-171
  Scenario: Remember Me checkbox is checked on return visit when credentials were previously saved
    Given the user previously logged in with Remember Me enabled
    When the user navigates back to the login page
    Then the Remember Me checkbox should be checked
    And the login fields should be pre-filled with the stored credentials

  # Precondition: User previously logged in with Remember Me enabled
  @smokeBDD @Smoke @Regression @SLL-171
  Scenario: User with pre-filled credentials can log in immediately without re-entering details
    Given the user previously logged in with Remember Me enabled
    When the user navigates back to the login page
    Then the login fields should be pre-filled
    When the user clicks the Login button
    Then the user should be authenticated and redirected to the dashboard

  # ── Remember Me Disabled ─────────────────────────────

  # Precondition: User is not logged in; login page is open
  @smokeBDD @Smoke @Regression @SLL-171
  Scenario: User logs in without checking Remember Me — credentials are not saved
    Given the user is on the login page
    When the user enters a valid email address
    And the user enters a valid password
    And the Remember Me checkbox is unchecked
    And the user clicks the Login button
    And the user logs out and navigates back to the login page
    Then the Email field should be empty
    And the Password field should be empty

  # Precondition: User previously logged in without enabling Remember Me
  @smokeBDD @Regression @SLL-171
  Scenario: Remember Me checkbox remains unchecked on return visit when not previously enabled
    Given the user previously logged in without enabling Remember Me
    When the user navigates back to the login page
    Then the Remember Me checkbox should be unchecked
    And the login fields should be empty

  # ── Storing & Clearing Credentials ───────────────────

  # Precondition: User is not logged in; login page is open
  @smokeBDD @Smoke @Regression @SLL-171
  Scenario: Credentials are stored in localStorage when Remember Me is enabled
    Given the user is on the login page
    When the user enters valid credentials
    And the user checks the Remember Me checkbox
    And the user clicks the Login button
    Then the credentials should be stored in localStorage

  # Precondition: User is not logged in; login page is open
  @smokeBDD @Smoke @Regression @SLL-171
  Scenario: Credentials are not stored in localStorage when Remember Me is disabled
    Given the user is on the login page
    When the user enters valid credentials
    And the Remember Me checkbox is unchecked
    And the user clicks the Login button
    Then no credentials should be stored in localStorage

  # Precondition: User previously saved credentials via Remember Me
  @smokeBDD @Smoke @Regression @SLL-171
  Scenario: Stored credentials are cleared when the user unchecks Remember Me and logs in
    Given the user previously logged in with Remember Me enabled
    And the user navigates back to the login page with pre-filled credentials
    When the user unchecks the Remember Me checkbox
    And the user clicks the Login button
    And the user logs out and navigates back to the login page
    Then the Email field should be empty
    And the Password field should be empty
    And no credentials should remain in localStorage

  # Precondition: User has pre-filled credentials from a Remember Me session
  @smokeBDD @Regression @SLL-171
  Scenario: Stored credentials are cleared when the user manually unchecks Remember Me without logging in
    Given the user navigates to the login page with pre-filled credentials from a previous Remember Me session
    When the user unchecks the Remember Me checkbox
    Then the Remember Me checkbox should be unchecked

  # ── Credential Population Behavior ───────────────────

  # Precondition: User previously logged in with Remember Me enabled
  @smokeBDD @Smoke @Regression @SLL-171
  Scenario: Both email and password fields are auto-populated when Remember Me was previously enabled
    Given the user previously logged in with Remember Me enabled
    When the user navigates to the login page
    Then both the Email and Password fields should be auto-populated with the saved values

  # Precondition: User is on login page with pre-filled credentials
  @smokeBDD @Regression @SLL-171
  Scenario: Auto-populated credentials can be edited before submitting login
    Given the user navigates to the login page with pre-filled credentials from a previous Remember Me session
    When the user clears the Email field and enters a different email
    And the user clicks the Login button using the pre-filled credentials
    Then the login should be attempted with the newly entered email

  # Precondition: User previously logged in with Remember Me enabled
  @smokeBDD @Regression @SLL-171
  Scenario: Auto-populated password field remains masked
    Given the user previously logged in with Remember Me enabled
    When the user navigates back to the login page
    Then the auto-populated password should be displayed as masked characters

  # ── Multiple Users ────────────────────────────────────

  # Precondition: A previous user's credentials are saved via Remember Me
  @smokeBDD @Regression @SLL-171
  Scenario: Logging in with Remember Me overwrites previously saved credentials for a different user
    Given a previous user's credentials are saved in localStorage via Remember Me
    When a new user logs in with Remember Me enabled using different credentials
    And the new user logs out and navigates back to the login page
    Then the login fields should be populated with the new user's credentials only

  # ── Interaction with Login Flow ───────────────────────

  # Precondition: User is on login page with pre-filled credentials from Remember Me
  @smokeBDD @Smoke @Regression @SLL-171
  Scenario: Remember Me does not bypass Firebase Authentication — valid credentials are still required
    Given the user navigates to the login page with pre-filled credentials from a previous Remember Me session
    When the user clicks the Login button
    Then the login should still be authenticated via Firebase
    And access should only be granted if the credentials are valid

  # ── End-to-End ───────────────────────────────────────

  # Precondition: Fresh session; valid credentials available
  @smokeBDD @Smoke @Regression @SLL-171
  Scenario: Full lifecycle — login with Remember Me, logout, return and verify pre-fill, uncheck and verify cleared
    Given the user navigates to the application
    Then the login page should be displayed
    When the user enters a valid email address
    And the user enters a valid password
    And the user checks the Remember Me checkbox
    And the user clicks the Login button
    Then the user should be authenticated and redirected to the dashboard
    When the user logs out
    Then the user should be on the login page
    And the Email and Password fields should be pre-filled with the saved credentials
    And the Remember Me checkbox should be checked
    When the user unchecks the Remember Me checkbox
    And the user logs in again
    And the user logs out and navigates back to the login page
    Then the Email field should be empty
    And the Password field should be empty
    And the Remember Me checkbox should be unchecked
