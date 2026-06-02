Feature: User Management - User Roles & Permission Management (SLL-180)
  As an authorized administrator of SLS V2
  I want to manage role assignments for users via the User Roles sub-page
  So that I can control what each user is permitted to do within the application

  # ── Happy Path ───────────────────────────────────────

  # Precondition: User is authenticated as admin; User Management page is accessible
  @smokeBDD @Smoke @Regression @SLL-180
  Scenario: Admin navigates to User Details and the User Roles sub-page is accessible
    Given the user is logged in to the application
    When the user navigates to the User Management page
    And the user opens a User Details record
    Then the User Roles sub-page should be visible within User Details

  # Precondition: User is authenticated as admin; User Roles sub-page is open
  @smokeBDD @Smoke @Regression @SLL-180
  Scenario: User Roles sub-page displays all available permission roles
    Given the user is logged in to the application
    And the user navigates to the User Roles sub-page for a selected user
    Then all 14 permission roles should be listed on the page

  # Precondition: User is authenticated as admin; User Roles sub-page is open
  @smokeBDD @Smoke @Regression @SLL-180
  Scenario: Admin assigns a role to a user and saves successfully
    Given the user is logged in to the application
    And the user navigates to the User Roles sub-page for a selected user
    When the user adds the "Can enter contracts" role
    And the user saves the role changes
    Then a success confirmation should be displayed
    And the "Can enter contracts" role should be shown as assigned for that user

  # Precondition: User is authenticated as admin; "Can approve contracts" is already assigned
  @smokeBDD @Smoke @Regression @SLL-180
  Scenario: Admin removes an assigned role from a user and saves successfully
    Given the user is logged in to the application
    And the user navigates to the User Roles sub-page for a selected user
    And the "Can approve contracts" role is currently assigned to the user
    When the user removes the "Can approve contracts" role
    And the user saves the role changes
    Then a success confirmation should be displayed
    And the "Can approve contracts" role should no longer be assigned to that user

  # Precondition: User is authenticated as admin; User Roles sub-page is open
  @smokeBDD @Smoke @Regression @SLL-180
  Scenario: Admin assigns multiple roles at once and saves successfully
    Given the user is logged in to the application
    And the user navigates to the User Roles sub-page for a selected user
    When the user adds the "Can edit contracts" role
    And the user adds the "Can view a list of users" role
    And the user adds the "Can review contracts" role
    And the user saves the role changes
    Then a success confirmation should be displayed
    And all three roles should be shown as assigned for that user

  # ── Role Visibility ──────────────────────────────────

  # Precondition: User is authenticated as admin; User Roles sub-page is open
  @smokeBDD @Smoke @Regression @SLL-180
  Scenario: "Creates Entities" role is visible on the User Roles sub-page
    Given the user is logged in to the application
    And the user navigates to the User Roles sub-page for a selected user
    Then the "Creates Entities" role should be listed

  # Precondition: User is authenticated as admin; User Roles sub-page is open
  @smokeBDD @Smoke @Regression @SLL-180
  Scenario: "Can enter contracts" role is visible on the User Roles sub-page
    Given the user is logged in to the application
    And the user navigates to the User Roles sub-page for a selected user
    Then the "Can enter contracts" role should be listed

  # Precondition: User is authenticated as admin; User Roles sub-page is open
  @smokeBDD @Smoke @Regression @SLL-180
  Scenario: "Can approve contracts" role is visible on the User Roles sub-page
    Given the user is logged in to the application
    And the user navigates to the User Roles sub-page for a selected user
    Then the "Can approve contracts" role should be listed

  # Precondition: User is authenticated as admin; User Roles sub-page is open
  @smokeBDD @Smoke @Regression @SLL-180
  Scenario: "Can edit contracts" role is visible on the User Roles sub-page
    Given the user is logged in to the application
    And the user navigates to the User Roles sub-page for a selected user
    Then the "Can edit contracts" role should be listed

  # Precondition: User is authenticated as admin; User Roles sub-page is open
  @smokeBDD @Smoke @Regression @SLL-180
  Scenario: "Can view a list of users" role is visible on the User Roles sub-page
    Given the user is logged in to the application
    And the user navigates to the User Roles sub-page for a selected user
    Then the "Can view a list of users" role should be listed

  # Precondition: User is authenticated as admin; User Roles sub-page is open
  @smokeBDD @Smoke @Regression @SLL-180
  Scenario: "Can create, update, destroy users" role is visible on the User Roles sub-page
    Given the user is logged in to the application
    And the user navigates to the User Roles sub-page for a selected user
    Then the "Can create, update, destroy users" role should be listed

  # Precondition: User is authenticated as admin; User Roles sub-page is open
  @smokeBDD @Smoke @Regression @SLL-180
  Scenario: "Can update instrument data" role is visible on the User Roles sub-page
    Given the user is logged in to the application
    And the user navigates to the User Roles sub-page for a selected user
    Then the "Can update instrument data" role should be listed

  # Precondition: User is authenticated as admin; User Roles sub-page is open
  @smokeBDD @Smoke @Regression @SLL-180
  Scenario: "Can view FPL Accounts and Positions" role is visible on the User Roles sub-page
    Given the user is logged in to the application
    And the user navigates to the User Roles sub-page for a selected user
    Then the "Can view FPL Accounts and Positions" role should be listed

  # Precondition: User is authenticated as admin; User Roles sub-page is open
  @smokeBDD @Smoke @Regression @SLL-180
  Scenario: "Can manage FPL Accounts" role is visible on the User Roles sub-page
    Given the user is logged in to the application
    And the user navigates to the User Roles sub-page for a selected user
    Then the "Can manage FPL Accounts" role should be listed

  # Precondition: User is authenticated as admin; User Roles sub-page is open
  @smokeBDD @Smoke @Regression @SLL-180
  Scenario: "Can trade from FPL Positions" role is visible on the User Roles sub-page
    Given the user is logged in to the application
    And the user navigates to the User Roles sub-page for a selected user
    Then the "Can trade from FPL Positions" role should be listed

  # Precondition: User is authenticated as admin; User Roles sub-page is open
  @smokeBDD @Smoke @Regression @SLL-180
  Scenario: "Can review contracts" role is visible on the User Roles sub-page
    Given the user is logged in to the application
    And the user navigates to the User Roles sub-page for a selected user
    Then the "Can review contracts" role should be listed

  # Precondition: User is authenticated as admin; User Roles sub-page is open
  @smokeBDD @Smoke @Regression @SLL-180
  Scenario: "Can use LCOR functionality" role is visible on the User Roles sub-page
    Given the user is logged in to the application
    And the user navigates to the User Roles sub-page for a selected user
    Then the "Can use LCOR functionality" role should be listed

  # Precondition: User is authenticated as admin; User Roles sub-page is open
  @smokeBDD @Smoke @Regression @SLL-180
  Scenario: "Can use Memoseg functionality" role is visible on the User Roles sub-page
    Given the user is logged in to the application
    And the user navigates to the User Roles sub-page for a selected user
    Then the "Can use Memoseg functionality" role should be listed

  # Precondition: User is authenticated as admin; User Roles sub-page is open
  @smokeBDD @Smoke @Regression @SLL-180
  Scenario: "Reveal beta features on the website" role is visible on the User Roles sub-page
    Given the user is logged in to the application
    And the user navigates to the User Roles sub-page for a selected user
    Then the "Reveal beta features on the website" role should be listed

  # ── Adding Roles ─────────────────────────────────────

  # Precondition: User is authenticated as admin; User Roles sub-page is open
  @smokeBDD @Regression @SLL-180
  Scenario: Admin can add the "Creates Entities" role to a user
    Given the user is logged in to the application
    And the user navigates to the User Roles sub-page for a selected user
    When the user adds the "Creates Entities" role
    And the user saves the role changes
    Then the "Creates Entities" role should be shown as assigned for that user

  # Precondition: User is authenticated as admin; User Roles sub-page is open
  @smokeBDD @Regression @SLL-180
  Scenario: Admin can add the "Can manage FPL Accounts" role to a user
    Given the user is logged in to the application
    And the user navigates to the User Roles sub-page for a selected user
    When the user adds the "Can manage FPL Accounts" role
    And the user saves the role changes
    Then the "Can manage FPL Accounts" role should be shown as assigned for that user

  # Precondition: User is authenticated as admin; User Roles sub-page is open
  @smokeBDD @Regression @SLL-180
  Scenario: Admin can add the "Can use LCOR functionality" role to a user
    Given the user is logged in to the application
    And the user navigates to the User Roles sub-page for a selected user
    When the user adds the "Can use LCOR functionality" role
    And the user saves the role changes
    Then the "Can use LCOR functionality" role should be shown as assigned for that user

  # Precondition: User is authenticated as admin; User Roles sub-page is open
  @smokeBDD @Regression @SLL-180
  Scenario: Admin can add the "Reveal beta features on the website" role to a user
    Given the user is logged in to the application
    And the user navigates to the User Roles sub-page for a selected user
    When the user adds the "Reveal beta features on the website" role
    And the user saves the role changes
    Then the "Reveal beta features on the website" role should be shown as assigned for that user

  # ── Removing Roles ───────────────────────────────────

  # Precondition: User is authenticated as admin; "Can trade from FPL Positions" is assigned
  @smokeBDD @Regression @SLL-180
  Scenario: Admin can remove the "Can trade from FPL Positions" role from a user
    Given the user is logged in to the application
    And the user navigates to the User Roles sub-page for a selected user
    And the "Can trade from FPL Positions" role is currently assigned to the user
    When the user removes the "Can trade from FPL Positions" role
    And the user saves the role changes
    Then the "Can trade from FPL Positions" role should no longer be assigned to that user

  # Precondition: User is authenticated as admin; "Can use Memoseg functionality" is assigned
  @smokeBDD @Regression @SLL-180
  Scenario: Admin can remove the "Can use Memoseg functionality" role from a user
    Given the user is logged in to the application
    And the user navigates to the User Roles sub-page for a selected user
    And the "Can use Memoseg functionality" role is currently assigned to the user
    When the user removes the "Can use Memoseg functionality" role
    And the user saves the role changes
    Then the "Can use Memoseg functionality" role should no longer be assigned to that user

  # Precondition: User is authenticated as admin; multiple roles are assigned
  @smokeBDD @Regression @SLL-180
  Scenario: Admin removes all roles from a user and saves successfully
    Given the user is logged in to the application
    And the user navigates to the User Roles sub-page for a selected user
    And multiple roles are currently assigned to the user
    When the user removes all assigned roles
    And the user saves the role changes
    Then a success confirmation should be displayed
    And no roles should be shown as assigned for that user

  # ── Save and Cancel Behaviour ────────────────────────

  # Precondition: User is authenticated as admin; a role change has been made but not saved
  @smokeBDD @Smoke @Regression @SLL-180
  Scenario: Cancelling role changes does not persist updates
    Given the user is logged in to the application
    And the user navigates to the User Roles sub-page for a selected user
    When the user adds the "Can create, update, destroy users" role
    And the user cancels without saving
    Then the role assignment should remain unchanged for that user

  # Precondition: User is authenticated as admin; a role change has been made
  @smokeBDD @Regression @SLL-180
  Scenario: Save button is available after a role change is made
    Given the user is logged in to the application
    And the user navigates to the User Roles sub-page for a selected user
    When the user adds or removes any role
    Then the save action should be available

  # Precondition: User is authenticated as admin; a role change has been made but not saved
  @smokeBDD @Regression @SLL-180
  Scenario: Navigating away without saving does not persist role changes
    Given the user is logged in to the application
    And the user navigates to the User Roles sub-page for a selected user
    When the user adds the "Can update instrument data" role
    And the user navigates away from the page without saving
    Then the role assignment should remain unchanged when returning to the User Roles sub-page

  # ── Role-Based Access ────────────────────────────────

  # Precondition: User is authenticated as administrator
  @smokeBDD @Smoke @Regression @SLL-180
  Scenario: Only admin users can access the User Roles sub-page
    Given the user is logged in as an administrator
    When the user navigates to the User Roles sub-page for a selected user
    Then the User Roles sub-page should be accessible and editable

  # Precondition: User is authenticated without administrator privileges
  @smokeBDD @Regression @SLL-180
  Scenario: Non-admin user cannot access or modify the User Roles sub-page
    Given the user is logged in without administrator privileges
    When the user attempts to navigate to the User Roles sub-page
    Then access should be denied or the page should not be editable

  # ── Persistence & State ──────────────────────────────

  # Precondition: User is authenticated as admin; role has been assigned and saved
  @smokeBDD @Smoke @Regression @SLL-180
  Scenario: Assigned roles persist after page reload
    Given the user is logged in to the application
    And the user navigates to the User Roles sub-page for a selected user
    And the user adds the "Can view FPL Accounts and Positions" role and saves
    When the user reloads the User Roles sub-page for the same user
    Then the "Can view FPL Accounts and Positions" role should still be shown as assigned

  # Precondition: User is authenticated as admin; role has been removed and saved
  @smokeBDD @Regression @SLL-180
  Scenario: Removed roles do not reappear after page reload
    Given the user is logged in to the application
    And the user navigates to the User Roles sub-page for a selected user
    And the user removes the "Can review contracts" role and saves
    When the user reloads the User Roles sub-page for the same user
    Then the "Can review contracts" role should not be shown as assigned

  # Precondition: User is authenticated as admin; role change made for User A
  @smokeBDD @Regression @SLL-180
  Scenario: Role changes for one user do not affect another user's roles
    Given the user is logged in to the application
    And the user assigns "Can enter contracts" to User A and saves
    When the user navigates to the User Roles sub-page for User B
    Then User B's role assignments should be independent of User A's changes

  # ── Edge Cases ───────────────────────────────────────

  # Precondition: User is authenticated as admin; User Roles sub-page is open
  @smokeBDD @Regression @SLL-180
  Scenario: All 14 roles can be assigned to a single user simultaneously
    Given the user is logged in to the application
    And the user navigates to the User Roles sub-page for a selected user
    When the user adds all 14 available permission roles
    And the user saves the role changes
    Then a success confirmation should be displayed
    And all 14 roles should be shown as assigned for that user

  # Precondition: User is authenticated as admin; selected user has no roles assigned
  @smokeBDD @Regression @SLL-180
  Scenario: User with no roles assigned shows an empty or default role state
    Given the user is logged in to the application
    When the user navigates to the User Roles sub-page for a user with no assigned roles
    Then the role list should indicate no roles are currently assigned

  # ── End-to-End ───────────────────────────────────────

  # Precondition: Fresh session; valid admin credentials; User Management accessible
  @smokeBDD @Smoke @Regression @SLL-180
  Scenario: Full lifecycle — login, navigate to User Management, open User Details, assign roles, save, verify
    Given the user navigates to the application
    When the user logs in with valid credentials
    Then the user should be redirected to the dashboard
    When the user navigates to the User Management page
    And the user opens a User Details record
    Then the User Roles sub-page should be visible
    When the user adds the "Can enter contracts" role
    And the user adds the "Can approve contracts" role
    And the user adds the "Can use Memoseg functionality" role
    And the user saves the role changes
    Then a success confirmation should be displayed
    And all three roles should be shown as assigned for that user
    When the user removes the "Can approve contracts" role
    And the user saves the role changes
    Then a success confirmation should be displayed
    And the "Can approve contracts" role should no longer be assigned to that user
