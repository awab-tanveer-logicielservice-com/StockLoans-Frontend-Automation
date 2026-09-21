Feature: Authorization Access Review System for User Role Changes (SLL-236)
  As a user of SLS V2
  I want to raise an access review request for a user role change, have it approved by two approvers
  and finally authorised by an Admin
  So that every role change is reviewed, auditable, and exportable for record-keeping

  # SLL-236 has no formal acceptance-criteria section - the criteria below are derived
  # from the ticket description and numbered so each scenario maps back to one:
  #   AC1  A user can initiate an access review request
  #   AC2  The requester can add two approvers to the request
  #   AC3  Each approver can Accept the access review request
  #   AC4  Each approver can Reject the access review request
  #   AC5  An Admin provides the final approval
  #   AC6  A user can export access review details for reporting and record-keeping
  #
  # Role note: the framework currently has a single configured test account
  # (utils/testdata.js). The "logged in as <role>" steps resolve dedicated
  # requester/approver/admin credentials from env vars when they are provided and
  # otherwise fall back to the primary account, so the role scenarios stay
  # expressive without silently passing on a wrong identity.

  # --- Happy Path ---

  # Precondition: User is authenticated and holds permission to raise access review requests
  @Smoke @Regression @SLL-236 @SLL-C1589
  Scenario: Requester initiates an access review request with two approvers and submits it successfully
    Given the user is logged in to the application
    When the user navigates to the Access Review page
    And the user clicks the Initiate Access Review Request button
    And the user selects a target user for the role change
    And the user selects a role change to be reviewed
    And the user adds two approvers to the access review request
    And the user enters a justification for the access review request
    And the user submits the access review request
    Then a success confirmation should be displayed for the access review request
    And the access review request should appear in the Access Review grid with status "Pending Approver Review"

  # --- Acceptance Criteria ---

  # Precondition: User is authenticated; Access Review page is accessible (AC1)
  @Smoke @Regression @SLL-236 @SLL-C1590
  Scenario: AC1 — Access Review page exposes the option to initiate a new access review request
    Given the user is logged in to the application
    When the user navigates to the Access Review page
    Then the Access Review page heading should be visible
    And the Initiate Access Review Request button should be visible

  # Precondition: An access review request form is open (AC2)
  @Smoke @Regression @SLL-236 @SLL-C1591
  Scenario: AC2 — Requester adds two approvers and both are listed on the request
    Given the user is logged in to the application
    And an access review request form is open
    When the user adds two approvers to the access review request
    Then both selected approvers should be listed on the access review request

  # Precondition: A submitted request exists awaiting the first approver's decision (AC3)
  @Smoke @Regression @SLL-236 @SLL-C1592
  Scenario: AC3 — Approver accepts an access review request
    Given the user is logged in as "approver one"
    And an access review request is pending the approver's decision
    When the approver accepts the access review request
    Then a success confirmation should be displayed for the access review request
    And the access review request status should be "Partially Approved"

  # Precondition: A submitted request exists awaiting the first approver's decision (AC4)
  @Smoke @Regression @SLL-236 @SLL-C1593
  Scenario: AC4 — Approver rejects an access review request
    Given the user is logged in as "approver one"
    And an access review request is pending the approver's decision
    When the approver rejects the access review request
    Then a success confirmation should be displayed for the access review request
    And the access review request status should be "Rejected"

  # Precondition: A request exists where both approvers have already accepted (AC5)
  @Smoke @Regression @SLL-236 @SLL-C1594
  Scenario: AC5 — Admin gives the final approval on a fully approved request
    Given the user is logged in as "admin"
    And an access review request has been accepted by both approvers
    When the admin gives the final approval on the access review request
    Then a success confirmation should be displayed for the access review request
    And the access review request status should be "Approved"

  # Precondition: At least one access review request exists in the grid (AC6)
  @Smoke @Regression @SLL-236 @SLL-C1595
  Scenario: AC6 — User exports access review details for reporting
    Given the user is logged in to the application
    When the user navigates to the Access Review page
    And the user exports the access review details as "CSV"
    Then the access review export file should be downloaded

  # --- Role-Based Access ---

  # Precondition: Requester is authenticated and owns an access review request
  @Smoke @Regression @SLL-236 @SLL-C1596
  Scenario: Requester can raise a request but the approve and reject actions are not available to them
    Given the user is logged in as "requester"
    And an access review request raised by the current user exists
    When the user opens the access review request details
    Then the Accept and Reject actions should not be available on the access review request

  # Precondition: Approver one is authenticated and has a request assigned to them
  @Regression @SLL-236 @SLL-C1597
  Scenario: Approver one sees the request in their pending queue with Accept and Reject available
    Given the user is logged in as "approver one"
    When the user navigates to the Access Review page
    And the user opens the access review pending approvals queue
    Then the access review request should be listed in the pending approvals queue
    And the Accept and Reject actions should be available on the access review request

  # Precondition: Approver two is authenticated and has a request assigned to them
  @Regression @SLL-236 @SLL-C1598
  Scenario: Approver two sees the request in their pending queue with Accept and Reject available
    Given the user is logged in as "approver two"
    When the user navigates to the Access Review page
    And the user opens the access review pending approvals queue
    Then the access review request should be listed in the pending approvals queue
    And the Accept and Reject actions should be available on the access review request

  # Precondition: Admin is authenticated; a request has both approver acceptances
  @Regression @SLL-236 @SLL-C1599
  Scenario: Admin sees requests awaiting final approval with the Final Approval action available
    Given the user is logged in as "admin"
    And an access review request has been accepted by both approvers
    When the user opens the access review request details
    Then the Final Approval action should be available on the access review request

  # --- Workflow States & Transitions ---

  # Precondition: A request has just been submitted by the requester
  @Regression @SLL-236 @SLL-C1600
  Scenario: Newly submitted request is in the Pending Approver Review state
    Given the user is logged in to the application
    And an access review request has just been submitted
    Then the access review request status should be "Pending Approver Review"

  # Precondition: A submitted request awaits both approver decisions
  @Regression @SLL-236 @SLL-C1601
  Scenario: Request moves to Partially Approved after the first approver accepts
    Given the user is logged in as "approver one"
    And an access review request is pending the approver's decision
    When the approver accepts the access review request
    Then the access review request status should be "Partially Approved"

  # Precondition: A request has one approver acceptance recorded
  @Regression @SLL-236 @SLL-C1602
  Scenario: Request moves to Pending Admin Approval after the second approver accepts
    Given the user is logged in as "approver two"
    And an access review request has been accepted by the first approver
    When the approver accepts the access review request
    Then the access review request status should be "Pending Admin Approval"

  # Precondition: A request has both approver acceptances recorded
  @Regression @SLL-236 @SLL-C1603
  Scenario: Request moves to Approved after the Admin final approval
    Given the user is logged in as "admin"
    And an access review request has been accepted by both approvers
    When the admin gives the final approval on the access review request
    Then the access review request status should be "Approved"

  # Precondition: A request has both approver acceptances recorded
  @Regression @SLL-236 @SLL-C1604
  Scenario: Request moves to Rejected when the Admin declines the final approval
    Given the user is logged in as "admin"
    And an access review request has been accepted by both approvers
    When the admin rejects the access review request at final approval
    Then the access review request status should be "Rejected"

  # Precondition: A submitted request awaits approver decisions
  @Regression @SLL-236 @SLL-C1605
  Scenario: Request moves to Rejected as soon as one approver rejects it
    Given the user is logged in as "approver one"
    And an access review request is pending the approver's decision
    When the approver rejects the access review request
    Then the access review request status should be "Rejected"

  # --- Status / Column Display ---

  # Precondition: At least one access review request exists in the grid
  @Smoke @Regression @SLL-236 @SLL-C1606
  Scenario: Access Review grid displays the expected reporting columns
    Given the user is logged in to the application
    When the user navigates to the Access Review page
    Then the Access Review grid should display the "Request ID" column
    And the Access Review grid should display the "Requester" column
    And the Access Review grid should display the "Target User" column
    And the Access Review grid should display the "Role" column
    And the Access Review grid should display the "Approvers" column
    And the Access Review grid should display the "Status" column
    And the Access Review grid should display the "Requested Date" column

  # Precondition: A request has progressed through an approver acceptance
  @Regression @SLL-236 @SLL-C1607
  Scenario: Approver decisions are reflected in the request audit trail
    Given the user is logged in to the application
    And an access review request has been accepted by the first approver
    When the user opens the access review request details
    Then the access review audit trail should record the approver decision

  # --- Positive Data Variations ---

  # Precondition: An access review request form is open
  @Regression @SLL-236 @SLL-C1608
  Scenario: Request with a single-word justification is accepted
    Given the user is logged in to the application
    And an access review request form is open
    When the user completes the access review request with justification "Onboarding"
    And the user submits the access review request
    Then a success confirmation should be displayed for the access review request

  # Precondition: An access review request form is open
  @Regression @SLL-236 @SLL-C1609
  Scenario: Request with a detailed multi-sentence justification is accepted
    Given the user is logged in to the application
    And an access review request form is open
    When the user completes the access review request with justification "User moved to the Securities Lending desk. Requires contract approval rights from 01 Oct."
    And the user submits the access review request
    Then a success confirmation should be displayed for the access review request

  # --- Business Rules & Restrictions ---

  # Precondition: A submitted request has no approver acceptances yet
  @Smoke @Regression @SLL-236 @SLL-C1610
  Scenario: Admin cannot give the final approval before both approvers have accepted
    Given the user is logged in as "admin"
    And an access review request is pending the approver's decision
    When the user opens the access review request details
    Then the Final Approval action should not be available on the access review request

  # Precondition: A request has one approver acceptance and no second decision
  @Regression @SLL-236 @SLL-C1611
  Scenario: Admin cannot give the final approval when only the first approver has accepted
    Given the user is logged in as "admin"
    And an access review request has been accepted by the first approver
    When the user opens the access review request details
    Then the Final Approval action should not be available on the access review request

  # Precondition: A request has already been rejected by an approver
  @Regression @SLL-236 @SLL-C1612
  Scenario: Rejected request cannot proceed to Admin final approval
    Given the user is logged in as "admin"
    And an access review request has been rejected by an approver
    When the user opens the access review request details
    Then the Final Approval action should not be available on the access review request
    And the access review request status should be "Rejected"

  # Precondition: An approver has already recorded a decision on the request
  @Regression @SLL-236 @SLL-C1613
  Scenario: Approver cannot record a second decision on the same request
    Given the user is logged in as "approver one"
    And an access review request has already been decided by the current approver
    When the user opens the access review request details
    Then the Accept and Reject actions should not be available on the access review request

  # Precondition: An access review request form is open
  @Smoke @Regression @SLL-236 @SLL-C1614
  Scenario: Requester cannot add themselves as an approver on their own request
    Given the user is logged in to the application
    And an access review request form is open
    When the user adds the requester themselves as an approver
    Then a validation error should be displayed for the access review request

  # Precondition: An access review request form is open
  @Smoke @Regression @SLL-236 @SLL-C1615
  Scenario: The same user cannot be added as both approvers on a request
    Given the user is logged in to the application
    And an access review request form is open
    When the user adds the same user as both approvers
    Then a validation error should be displayed for the access review request

  # Precondition: A request exists that the current user is not an approver on
  @Regression @SLL-236 @SLL-C1616
  Scenario: A user who is not an approver on the request cannot accept or reject it
    Given the user is logged in to the application
    And an access review request the current user is not an approver on exists
    When the user opens the access review request details
    Then the Accept and Reject actions should not be available on the access review request

  # Precondition: A request has both approver acceptances; current user is not an Admin
  @Smoke @Regression @SLL-236 @SLL-C1617
  Scenario: A non-admin user cannot give the final approval on a fully approved request
    Given the user is logged in as "requester"
    And an access review request has been accepted by both approvers
    When the user opens the access review request details
    Then the Final Approval action should not be available on the access review request

  # --- Validation / Negative ---
  # Scoped to the approver-count rule the ticket actually states ("add two
  # approvers"). Generic field-level validation (mandatory fields, approver
  # input format, rejection reasons, justification length) was removed from the
  # Vansah folder as out of scope for SLL-236 - see the note at the end of this file.

  # Precondition: An access review request form is open
  @Smoke @Regression @SLL-236 @SLL-C1620
  Scenario: Approver count below the limit — one approver is not enough to submit
    Given the user is logged in to the application
    And an access review request form is open
    When the user adds 1 approver to the access review request
    And the user submits the access review request
    Then a validation error should be displayed for the access review request
    And the access review request should not be submitted

  # Precondition: An access review request form is open
  @Smoke @Regression @SLL-236 @SLL-C1621
  Scenario: Approver count at the limit — exactly two approvers is accepted
    Given the user is logged in to the application
    And an access review request form is open
    When the user adds 2 approvers to the access review request
    And the user submits the access review request
    Then a success confirmation should be displayed for the access review request

  # --- Edge Cases ---

  # Precondition: Authenticated user with no access review requests raised or assigned
  @Regression @SLL-236 @SLL-C1624
  Scenario: Access Review page shows an empty state when no requests exist
    Given the user is logged in to the application
    When the user navigates to the Access Review page
    And the user filters the Access Review grid by status "No Match"
    Then the Access Review grid should display the empty state overlay

  # Precondition: An access review request form is open
  @Regression @SLL-236 @SLL-C1625
  Scenario: Special characters in the justification are handled without breaking the page
    Given the user is logged in to the application
    And an access review request form is open
    When the user completes the access review request with justification "<script>alert(1)</script> !@#$%^&*"
    And the user submits the access review request
    Then the Access Review page should not crash

  # Precondition: A request awaits both approver decisions
  @Regression @SLL-236 @SLL-C1627
  Scenario: Request state stays consistent when the page is reloaded mid-workflow
    Given the user is logged in as "approver one"
    And an access review request is pending the approver's decision
    When the approver accepts the access review request
    And the user reloads the Access Review page
    Then the access review request status should be "Partially Approved"

  # Precondition: An export has been triggered on a grid with no rows
  @Regression @SLL-236 @SLL-C1628
  Scenario: Exporting an empty Access Review grid does not break the page
    Given the user is logged in to the application
    When the user navigates to the Access Review page
    And the user filters the Access Review grid by status "No Match"
    And the user exports the access review details as "CSV"
    Then the Access Review page should not crash

  # --- Data-Driven ---

  # Precondition: A submitted request exists awaiting both approver decisions
  @Regression @SLL-236 @SLL-C1629
  Scenario Outline: Approver decision combinations resolve to the expected request status
    Given the user is logged in to the application
    And an access review request is pending the approver's decision
    When the first approver records the decision "<first>"
    And the second approver records the decision "<second>"
    Then the access review request status should be "<status>"

    Examples:
      | first  | second | status                 |
      | Accept | Accept | Pending Admin Approval |
      | Accept | Reject | Rejected               |
      | Reject | Accept | Rejected               |
      | Reject | Reject | Rejected               |

  # Precondition: At least one access review request exists in the grid
  @Regression @SLL-236 @SLL-C1630
  Scenario Outline: Access review details export in each supported format
    Given the user is logged in to the application
    When the user navigates to the Access Review page
    And the user exports the access review details as "<format>"
    Then the access review export file should be downloaded

    Examples:
      | format |
      | CSV    |
      | Excel  |
      | PDF    |

  # --- End-to-End ---

  # Precondition: Fresh session; valid credentials available; requester, two approvers and an Admin exist
  @Smoke @Regression @SLL-236 @SLL-C1631
  Scenario: Full lifecycle — raise request, two approver acceptances, Admin final approval, then export
    Given the user navigates to the application
    When the user logs in with valid credentials
    Then the user should be redirected to the dashboard
    When the user navigates to the Access Review page
    Then the Access Review page heading should be visible
    When the user clicks the Initiate Access Review Request button
    And the user selects a target user for the role change
    And the user selects a role change to be reviewed
    And the user adds two approvers to the access review request
    And the user enters a justification for the access review request
    And the user submits the access review request
    Then a success confirmation should be displayed for the access review request
    And the access review request status should be "Pending Approver Review"
    When the first approver records the decision "Accept"
    Then the access review request status should be "Partially Approved"
    When the second approver records the decision "Accept"
    Then the access review request status should be "Pending Admin Approval"
    When the admin gives the final approval on the access review request
    Then the access review request status should be "Approved"
    And the access review audit trail should record the approver decision
    When the user exports the access review details as "CSV"
    Then the access review export file should be downloaded

  # --- Removed from scope ---
  # These five cases were imported and then deleted from the Vansah folder as
  # out of scope for SLL-236, so they were dropped from this file too. Their
  # step definitions and page-object helpers were removed with them - restore
  # from git history if the scope changes.
  #   SLL-C1618  Submitting the request with a mandatory field left blank (Outline, 5 rows)
  #   SLL-C1619  Invalid approver input is rejected (Outline, 3 rows)
  #   SLL-C1622  Approver count above the limit - a third approver cannot be added
  #   SLL-C1623  Rejecting a request without a rejection reason is not allowed
  #   SLL-C1626  Justification at maximum allowed length is handled gracefully
