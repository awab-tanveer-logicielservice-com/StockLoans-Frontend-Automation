Feature: Velocity JSON API - Locate-Order Restatement (spec section 8)
  As a client of the Velocity Locate Services JSON API
  I want to re-read an order I already placed
  So that I can confirm its current terms and fill state

  # Entity URL: /locate
  # "The response is the same as returned by the limit-locate-order."
  #
  # Requests require both cliOrdId and locateId. Responses use numeric
  # locateId; a numeric string is also accepted as a request value.
  # Environment: Dev/Test only - see API-Automation/Config/env.js

  # --- Happy Path ---

  @Smoke @Regression @API @Restatement @SLL-C1660
  Scenario: An order can be restated by the client-assigned cliOrdId
    Given the client has a valid session token
    When the client submits a limit-locate-order for "AAPL" quantity 100 at price 999.0
    Then the HTTP response status should be 200
    And the order should carry a locateId
    When the client requests a restatement using the cliOrdId
    Then the HTTP response status should be 200
    And the response should match the order schema
    And the restatement should match the original order

  @Smoke @Regression @API @Restatement @SLL-C1661
  Scenario: An order can be restated by the server-assigned locateId
    Given the client has a valid session token
    When the client submits a limit-locate-order for "AAPL" quantity 100 at price 999.0
    Then the HTTP response status should be 200
    And the order should carry a locateId
    When the client requests a restatement using the locateId
    Then the HTTP response status should be 200
    And the response should match the order schema
    And the restatement should match the original order

  @Regression @API @Restatement @SLL-C1663
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

  @Regression @API @Restatement @Negative @SLL-C1664
  Scenario: Restating an order that does not exist is refused
    Given the client has a valid session token
    When the client requests a restatement for an order that does not exist
    Then the HTTP response status should be 200
    And the status code should be 5
    And the order status should be "REJECTED"

  @Regression @API @Restatement @Negative @SLL-C1665
  Scenario: A restatement document missing required fields is rejected
    Given the client has a valid session token
    When the client POSTs a document with only the session token to "/locate"
    Then the HTTP response status should be 200
    And the status code should be 20

  @Regression @API @Restatement @Negative @SLL-C1666
  Scenario: A restatement with an invalid token is refused
    Given the client has an invalid session token "not-a-real-token-0000"
    When the client POSTs the following document to "/locate":
      """
      {"token": "not-a-real-token-0000", "cliOrdId": "CO-bad-token", "locateId": ""}
      """
    Then the HTTP response status should be 401
