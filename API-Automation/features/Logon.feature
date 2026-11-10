Feature: Velocity JSON API - Logon (spec section 3)
  As a client of the Velocity Locate Services JSON API
  I want to exchange a preassigned UserID and password for a session token
  So that I can authenticate every subsequent quote and locate request

  # Entity URL: /logon
  # Tokens expire at 8:01 PM US Eastern on issuance day, regardless of activity.
  # Environment: Dev/Test only - see API-Automation/Config/env.js

  # --- Happy Path ---

  @Smoke @Regression @API @Logon @SLL-C1667
  Scenario: Valid credentials return a session token
    Given the client has no session token
    When the client logs on with valid credentials
    Then the HTTP response status should be 200
    And the response should be valid JSON
    And the response should match the logon schema
    And a session token should be returned
    And the returned user should match the requested user

  @Regression @API @Logon @SLL-C1668
  Scenario: Logon response carries the mandated JSON content type
    Given the client has no session token
    When the client logs on with valid credentials
    Then the HTTP response status should be 200
    And the response Content-Type header should be "application/json;charset=utf-8"

  @Regression @API @Logon @SLL-C1669
  Scenario: The optional callbackUrl field is accepted
    Given the client has no session token
    When the client logs on with a callbackUrl
    Then the HTTP response status should be 200
    And the response should match the logon schema
    And a session token should be returned

  @Regression @API @Logon @SLL-C1670
  Scenario: Re-logging on issues a fresh token at any time
    Given the client has no session token
    When the client logs on with valid credentials
    Then a session token should be returned
    When the client logs on again
    Then the HTTP response status should be 200
    And a session token should be returned
    And the new token should differ from the previous token

  # --- Negative Path ---

  @Regression @API @Logon @Negative @SLL-C1671
  Scenario: A wrong password is refused and no token is issued
    Given the client has no session token
    When the client logs on with an invalid password
    Then no session token should be returned
    And the status message should not be empty

  @Regression @API @Logon @Negative @SLL-C1672
  Scenario: An unknown user is refused and no token is issued
    Given the client has no session token
    When the client logs on with an unknown user
    Then no session token should be returned
    And the status message should not be empty

  @Regression @API @Logon @Negative @SLL-C1673
  Scenario: A logon document missing required fields is rejected
    When the client POSTs an empty document to "/logon"
    Then the HTTP response status should be 500

  @Regression @API @Logon @Negative @SLL-C1674
  Scenario: A malformed JSON document is rejected
    When the client POSTs the following document to "/logon":
      """
      {"user": "someone", "password":}
      """
    Then the HTTP response status should be 401
