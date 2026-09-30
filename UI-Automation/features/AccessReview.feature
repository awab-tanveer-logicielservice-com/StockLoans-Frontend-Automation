Feature: Access Reviews — Authorization Access Review for User Role Changes (SLL-236)
  As a user of SLS V2
  I want to certify every user's roles through a two-reviewer workflow with an admin sign-off
  So that role changes are agreed, applied from a final snapshot, confirmed, and auditable

  # --- How the built screen actually works ---
  # Verified against QA (https://qa-sls-v2.web.app). The screen is an access
  # *certification* over a snapshot of every user's roles - not a single-user
  # role-change request. Landing: /access-reviews, detail: /access-reviews/{id}.
  #
  #   initiator picks Reviewer 1 + Reviewer 2
  #     -> PENDING REVIEW           R1 flags role changes via MODIFY, then Submit Flags
  #     -> AWAITING SECOND REVIEW   R2 agrees/disagrees each flag, then Sign Off
  #     -> AWAITING ADMIN ACTION    INITIATOR applies flags, Generate Final Snapshot
  #     -> AWAITING CONFIRMATION    INITIATOR confirms on the Final Snapshot tab
  #     -> COMPLETE
  #
  # NOTE 1: AWAITING CONFIRMATION is not in the SLL-236 description; the build
  # adds it after the Final Snapshot is generated.
  #
  # NOTE 2: whoever STARTS a review COMPLETES it. Generate Final Snapshot belongs
  # to the initiator, not to an admin account - the banner reads "Your turn
  # (Admin)" but only the initiator sees it and only they get an enabled button.
  # Verified on QA review #30 (initiated by Awab): Awab saw the banner and an
  # enabled button, "Myadmin" saw neither.
  #
  # NOTE 3: at AWAITING CONFIRMATION both parties confirm, each entering a
  # comment, and the order matters - the other reviewer first, the initiator
  # last. The initiator's confirm is the one that completes the review.
  #
  # Two real accounts drive this, referred to by the display names the Reviewer
  # dropdowns show (see utils/testdata.js):
  #   "Awab"    - initiator and Reviewer 2
  #   "Myadmin" - Reviewer 1 and the admin
  #
  # ENVIRONMENT: both accounts exist only in the QA Firebase project, so run with
  #   BASE_URL=https://qa-sls-v2.web.app/login
  #
  # The lifecycle scenario really applies a role change, so it deliberately flags
  # "Reveal beta features on the website" - the least consequential of the 14
  # roles, so a completed run cannot lock the suite out of the app.

  # --- Happy Path - Full Lifecycle ---

  # Precondition: QA env; the "Awab" and "Myadmin" accounts both exist and can log in
  @Smoke @Regression @SLL-236 @SLL-C1632
  Scenario: Full access review lifecycle — initiate, flag, agree, final snapshot, confirm
    Given the user is logged in as "Awab"
    When the user navigates to the Access Reviews page
    And the user initiates an access review with "Myadmin" as Reviewer 1 and "Awab" as Reviewer 2
    Then the access review status should be "PENDING REVIEW"

    # Reviewer 1 flags a role change on the user snapshot
    When the user signs in as "Myadmin"
    And the user opens the latest access review
    Then the turn banner should mention "Reviewer 1"
    When the user flags a role change for "Myadmin" on the User Snapshot tab
    And the user submits the flags
    Then the access review status should be "AWAITING SECOND REVIEW"

    # Reviewer 2 agrees with the flag and signs off
    When the user signs in as "Awab"
    And the user opens the latest access review
    Then the turn banner should mention "Reviewer 2"
    When the user agrees with every flag on the Flags & Actions tab
    And the user enters an overall sign-off comment
    And the user signs off the access review
    Then the access review status should be "AWAITING ADMIN ACTION"

    # The INITIATOR applies the agreed flags and closes the review out - whoever
    # starts a review completes it. No sign-in here: Reviewer 2 is also the
    # initiator ("Awab"), so this continues in the same session.
    Then the turn banner should mention "Admin"
    When the user generates the final snapshot
    Then the access review status should be "AWAITING CONFIRMATION"

    # BOTH parties confirm with a comment, and ORDER MATTERS: the other reviewer
    # confirms first, the INITIATOR confirms last, and that last confirm is what
    # completes the review. Each PUTs /access-review/{id}/confirm; the initiator's
    # is the one that flips the status to COMPLETE.
    When the user signs in as "Myadmin"
    And the user reopens the same access review
    And the user confirms the final state
    When the user signs in as "Awab"
    And the user reopens the same access review
    And the user confirms the final state
    Then the access review status should be "COMPLETE"
    And the access review should appear as "COMPLETE" in the Access Reviews grid

  # --- Landing Page ---

  # Precondition: User is authenticated on QA
  @Smoke @Regression @SLL-236 @SLL-C1633
  Scenario: Access Reviews page loads with its heading, primary action, and status legend
    Given the user is logged in as "Awab"
    When the user navigates to the Access Reviews page
    Then the Access Reviews page heading should be visible
    And the New Access Review button should be visible
    And the status legend should show "Pending review"
    And the status legend should show "Awaiting 2nd review"
    And the status legend should show "Awaiting admin"
    And the status legend should show "Awaiting confirmation"
    And the status legend should show "Complete"

  # Precondition: User is authenticated; at least one review exists
  @Smoke @Regression @SLL-236 @SLL-C1634
  Scenario: Access Reviews grid shows the expected reporting columns
    Given the user is logged in as "Awab"
    When the user navigates to the Access Reviews page
    Then the Access Reviews grid should display the "Review ID" column
    And the Access Reviews grid should display the "Status" column
    And the Access Reviews grid should display the "Initiated By" column
    And the Access Reviews grid should display the "Reviewer 1" column
    And the Access Reviews grid should display the "Reviewer 2" column
    And the Access Reviews grid should display the "Created" column
    And the Access Reviews grid should display the "Completed" column
    And the Access Reviews grid should contain at least one review

  # Precondition: User is authenticated; the Access Reviews nav link is present
  @Regression @SLL-236 @SLL-C1635
  Scenario: Access Reviews is reachable from the sidebar navigation
    Given the user is logged in as "Awab"
    When the user opens the Access Reviews link from the navigation
    Then the Access Reviews page heading should be visible

  # --- Initiate Dialog ---

  # Precondition: User is authenticated; the Initiate dialog is open
  @Smoke @Regression @SLL-236 @SLL-C1636
  Scenario: Initiate Review stays disabled until both reviewers are selected
    Given the user is logged in as "Awab"
    When the user navigates to the Access Reviews page
    And the user opens the Initiate Access Review dialog
    Then the Initiate Review button should be disabled
    When the user selects "Myadmin" as Reviewer 1
    Then the Initiate Review button should be disabled
    When the user selects "Awab" as Reviewer 2
    Then the Initiate Review button should be enabled

  # Precondition: User is authenticated; the Initiate dialog is open
  @Regression @SLL-236 @SLL-C1637
  Scenario: Cancelling the Initiate dialog does not create a review
    Given the user is logged in as "Awab"
    When the user navigates to the Access Reviews page
    And the user notes the current latest review id
    And the user opens the Initiate Access Review dialog
    And the user selects "Myadmin" as Reviewer 1
    And the user cancels the Initiate Access Review dialog
    Then the latest review id should be unchanged

  # --- Stage Gating ---

  # Precondition: A review exists in PENDING REVIEW with Myadmin as Reviewer 1
  @Regression @SLL-236 @SLL-C1638
  Scenario: A review awaiting first review exposes User Snapshot but not Flags & Actions
    Given the user is logged in as "Myadmin"
    And an access review exists in status "PENDING REVIEW"
    When the user opens that access review
    Then the "User Snapshot" tab should be visible
    And the "Sign-Off History" tab should be visible
    And the "Flags & Actions" tab should not be present

  # Precondition: A review exists in AWAITING SECOND REVIEW
  @Regression @SLL-236 @SLL-C1639
  Scenario: A review awaiting second review exposes the Flags & Actions tab
    Given the user is logged in as "Awab"
    And an access review exists in status "AWAITING SECOND REVIEW"
    When the user opens that access review
    Then the "Flags & Actions" tab should be visible
    And the Flags & Actions grid should list at least one flag

  # --- Export ---

  # Precondition: A completed review exists
  @Smoke @Regression @SLL-236 @SLL-C1640
  Scenario: Access review details can be exported from the detail page
    Given the user is logged in as "Awab"
    And an access review exists in status "COMPLETE"
    When the user opens that access review
    And the user exports the access review
    Then the access review export file should be downloaded

  # --- Audit Trail ---

  # Precondition: A completed review exists with recorded sign-offs
  @Regression @SLL-236 @SLL-C1641
  Scenario: Sign-Off History records the reviewer decisions on a completed review
    Given the user is logged in as "Awab"
    And an access review exists in status "COMPLETE"
    When the user opens that access review
    Then the Sign-Off History should record a sign-off

  # --- Edge Cases ---

  # Precondition: User is authenticated; the grid supports per-column filtering
  @Regression @SLL-236 @SLL-C1642
  Scenario: Filtering the grid by a status that matches nothing shows the empty state
    Given the user is logged in as "Awab"
    When the user navigates to the Access Reviews page
    And the user filters the "status" column by "ZZZNOMATCH"
    Then the Access Reviews grid should display the empty state overlay

  # Precondition: User is authenticated; a review detail page is open
  @Regression @SLL-236 @SLL-C1643
  Scenario: Reloading a review detail page preserves its status
    Given the user is logged in as "Awab"
    When the user navigates to the Access Reviews page
    And the user opens the latest access review
    And the user notes the detail status
    And the user reloads the Access Reviews page
    And the user opens the latest access review
    Then the detail status should be unchanged
