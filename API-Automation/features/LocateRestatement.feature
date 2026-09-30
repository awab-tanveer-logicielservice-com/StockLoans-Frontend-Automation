Feature: Velocity JSON API - Locate-Order Restatement (spec 1.9)
  As a client of the Velocity Locate Services JSON API
  I want to re-read an order I already placed
  So that I can confirm its current terms and fill state

  # Entity URL: /locate
  # "The response is the same as returned by the limit-locate-order."
  #
  # Spec note carried forward from 1.4: locateId was unified to string across
  # requests and responses, having previously been mixed string/number. The
  # steps assert the string type rather than coercing, so a regression here is
  # a visible failure.
  # Environment: Dev/Test only - see API-Automation/Config/env.js

  # --- Happy Path ---

  @Smoke @Regression @API @Restatement
  Scenario: An order can be restated by the client-assigned cliOrdId
    Given the client has a valid session token
    When the client submits a limit-locate-order for "AAPL" quantity 100 at price 999.0
    Then the HTTP response status should be 200
    And the order should carry a locateId
    When the client requests a restatement using the cliOrdId
    Then the HTTP response status should be 200
    And the response should match the order schema
    And the restatement should match the original order

  @Smoke @Regression @API @Restatement
  Scenario: An order can be restated by the server-assigned locateId
    Given the client has a valid session token
    When the client submits a limit-locate-order for "AAPL" quantity 100 at price 999.0
    Then the HTTP response status should be 200
    And the order should carry a locateId
    When the client requests a restatement using the locateId
    Then the HTTP response status should be 200
    And the response should match the order schema
    And the restatement should match the original order

  @Regression @API @Restatement
  Scenario: An overnight order can also be restated
    Given the client has a valid session token
    When the client submits an overnight-locate-order for the test symbol
    Then the HTTP response status should be 200
    And the order should carry a locateId
    When the client requests a restatement using the cliOrdId
    Then the HTTP response status should be 200
    And the response should match the order schema
    And the order type should be overnight

  @Regression @API @Restatement
  Scenario: Restating twice returns a stable answer
    Given the client has a valid session token
    When the client submits a limit-locate-order for "AAPL" quantity 100 at price 999.0
    Then the order should carry a locateId
    When the client requests a restatement using the cliOrdId
    Then the restatement should match the original order
    When the client requests a restatement using the cliOrdId
    Then the HTTP response status should be 200
    And the restatement should match the original order

  # --- Negative Path ---

  @Regression @API @Restatement @Negative
  Scenario: Restating an order that does not exist is refused
    Given the client has a valid session token
    When the client requests a restatement for an order that does not exist
    Then the HTTP response status should be 200
    And the status message should not be empty

  @Regression @API @Restatement @Negative
  Scenario: A restatement document missing required fields is rejected
    When the client POSTs an empty document to "/locate"
    Then the HTTP response status should be 400

  @Regression @API @Restatement @Negative
  Scenario: A restatement with an invalid token is refused
    Given the client has an invalid session token "not-a-real-token-0000"
    When the client POSTs the following document to "/locate":
      """
      {"token": "not-a-real-token-0000", "cliOrdId": "CO-bad-token", "locateId": ""}
      """
    Then the HTTP response status should be 401
