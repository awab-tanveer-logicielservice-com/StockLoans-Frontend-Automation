Feature: Velocity JSON API - Logon (spec 1.3)
  As a client of the Velocity Locate Services JSON API
  I want to exchange a preassigned UserID and password for a session token
  So that I can authenticate every subsequent quote and locate request

  # Entity URL: /logon
  # Tokens expire after 2 hours of inactivity or at 8:10 PM ET, whichever comes
  # first. A new token can be acquired at any time by re-logging on.
  # Environment: Dev/Test only - see API-Automation/Config/env.js

  # --- Happy Path ---

  @Smoke @Regression @API @Logon
  Scenario: Valid credentials return a session token
    Given the client has no session token
    When the client logs on with valid credentials
    Then the HTTP response status should be 200
    And the response should be valid JSON
    And the response should match the logon schema
    And a session token should be returned
    And the returned user should match the requested user

  @Regression @API @Logon
  Scenario: Logon response carries the mandated JSON content type
    Given the client has no session token
    When the client logs on with valid credentials
    Then the HTTP response status should be 200
    And the response Content-Type header should be "application/json"

  @Regression @API @Logon
  Scenario: The optional callbackUrl field is accepted
    Given the client has no session token
    When the client logs on with a callbackUrl
    Then the HTTP response status should be 200
    And the response should match the logon schema
    And a session token should be returned

  @Regression @API @Logon
  Scenario: Re-logging on issues a fresh token at any time
    Given the client has no session token
    When the client logs on with valid credentials
    Then a session token should be returned
    When the client logs on again
    Then the HTTP response status should be 200
    And a session token should be returned
    And the new token should differ from the previous token

  # --- Negative Path ---

  @Regression @API @Logon @Negative
  Scenario: A wrong password is refused and no token is issued
    Given the client has no session token
    When the client logs on with an invalid password
    Then no session token should be returned
    And the status message should not be empty

  @Regression @API @Logon @Negative
  Scenario: An unknown user is refused and no token is issued
    Given the client has no session token
    When the client logs on with an unknown user
    Then no session token should be returned
    And the status message should not be empty

  @Regression @API @Logon @Negative
  Scenario: A logon document missing required fields is rejected
    When the client POSTs an empty document to "/logon"
    Then the HTTP response status should be 400

  @Regression @API @Logon @Negative
  Scenario: A malformed JSON document is rejected
    When the client POSTs the following document to "/logon":
      """
      {"user": "someone", "password":}
      """
    Then the HTTP response status should be 400
