Feature: Velocity JSON API - Quote Request (spec section 4)
  As a client of the Velocity Locate Services JSON API
  I want to ask for the cost per share and the inventory available for a symbol
  So that I can price a limit-locate-order before I place it

  # Entity URL: /quote
  # Section 2 workflow: quote as many times as necessary, then locate using the
  # inventory and price the quote returned.
  # Environment: Dev/Test only - see API-Automation/Config/env.js

  # --- Happy Path ---

  @Smoke @Regression @API @Quote @SLL-C1694
  Scenario: A quote for an in-inventory symbol returns a price and a size
    Given the client has a valid session token
    When the client requests a quote for the test symbol
    Then the HTTP response status should be 200
    And the response should be valid JSON
    And the response should match the quote schema
    And the quote id should be -1
    And the quote should offer a positive price
    And the quote should report available inventory

  @Regression @API @Quote @SLL-C1695
  Scenario: A quote echoes back every field the client sent
    Given the client has a valid session token
    When the client requests a quote for the test symbol
    Then the HTTP response status should be 200
    And the quote should echo back the requested symbol
    And the quote should echo back the requested quoteReqId
    And the quote should echo back the requesting mpid and trader
    And the quote should report the rounded requested quantity

  @Regression @API @Quote @SLL-C1696
  Scenario: A quantity below 100 shares is rounded down for quoting
    Given the client has a valid session token
    When the client requests a quote below one round lot
    Then the HTTP response status should be 200
    And the response should match the quote schema
    And the quote should apply the under-lot rounding rule

  @Regression @API @Quote @SLL-C1697
  Scenario: A quote never offers more inventory than was asked for
    Given the client has a valid session token
    When the client requests a quote for the test symbol with quantity 150
    Then the HTTP response status should be 200
    And the quote offerSize should not exceed the requested quantity
    And the quote should report the rounded requested quantity

  @Regression @API @Quote @SLL-C1698
  Scenario: Quoting repeatedly is allowed and each request id is echoed
    Given the client has a valid session token
    When the client requests 3 quotes for the test symbol
    Then the HTTP response status should be 200
    And every quote in the batch should echo its request id

  # --- Negative Path ---

  @Regression @API @Quote @Negative @SLL-C1699
  Scenario: An unrecognised symbol returns no available inventory
    Given the client has a valid session token
    When the client requests a quote for the unknown symbol
    Then the HTTP response status should be 200
    And the status code should be "NO_INVENTORY"

  @Regression @API @Quote @Negative @SLL-C1700
  Scenario: A quote request without a token is refused
    Given the client has no session token
    When the client POSTs the following document to "/quote":
      """
      {"token": "", "quoteReqId": "QR-no-token", "mpid": "TEST", "trader": "TEST", "symbol": "AAPL"}
      """
    Then the HTTP response status should be 401

  @Regression @API @Quote @Negative @SLL-C1701
  Scenario: A quote request with an invalid token is refused
    Given the client has an invalid session token "not-a-real-token-0000"
    When the client POSTs the following document to "/quote":
      """
      {"token": "not-a-real-token-0000", "quoteReqId": "QR-bad-token", "mpid": "TEST", "trader": "TEST", "symbol": "AAPL"}
      """
    Then the HTTP response status should be 401

  @Regression @API @Quote @Negative @SLL-C1702
  Scenario: A quote document missing required fields is rejected
    Given the client has a valid session token
    When the client POSTs a document with only the session token to "/quote"
    Then the HTTP response status should be 400
