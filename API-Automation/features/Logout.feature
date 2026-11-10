Feature: Velocity JSON API - Logout (spec section 3, revised by specification 1.5)
  As a client of the Velocity Locate Services JSON API
  I want to remove my server-side token
  So that no further request can be made with it

  # Entity URL: /logout
  # "Removes server-side token thereby invalidating all subsequent requests."
  #
  # Specification 1.5 requires token in both the query string and JSON body.
  # Environment: Dev/Test only - see API-Automation/Config/env.js

  # --- Happy Path ---

  @Smoke @Regression @API @Logout @SLL-C1675
  Scenario: A logged-on client can log out
    Given the client has no session token
    When the client logs on with valid credentials
    Then a session token should be returned
    When the client logs out
    Then the HTTP response status should be 200
    And the response should be valid JSON
    And the response should match the logout schema
    And the logout response should not carry a token
    And the logout response should not carry a timestamp

  @Regression @API @Logout @SLL-C1676
  Scenario: The token is genuinely invalidated, not just forgotten by the client
    Given the client has no session token
    When the client logs on with valid credentials
    Then a session token should be returned
    When the client logs out
    Then the HTTP response status should be 200
    And the invalidated token should be rejected on a subsequent request

  # --- Negative Path ---

  @Regression @API @Logout @Negative @SLL-C1677
  Scenario: Logging out a token the server never issued is refused
    When the client logs out with a token it never held
    Then the HTTP response status should be 401
    Then the status message should not be empty

  @Regression @API @Logout @Negative @SLL-C1678
  Scenario: A logout document missing required fields is rejected
    Given the client has a valid session token
    When the client POSTs a document with only the session token to "/logout"
    Then the HTTP response status should be 400
