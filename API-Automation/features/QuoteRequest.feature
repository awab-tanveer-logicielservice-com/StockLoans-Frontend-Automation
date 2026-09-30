Feature: Velocity JSON API - Quote Request (spec 1.5)
  As a client of the Velocity Locate Services JSON API
  I want to ask for the cost per share and the inventory available for a symbol
  So that I can price a limit-locate-order before I place it

  # Entity URL: /quote
  # Spec 1.2 workflow: quote as many times as necessary, then locate using the
  # inventory and price the quote returned.
  # Environment: Dev/Test only - see API-Automation/Config/env.js

  # --- Happy Path ---

  @Smoke @Regression @API @Quote
  Scenario: A quote for an in-inventory symbol returns a price and a size
    Given the client has a valid session token
    When the client requests a quote for the test symbol
    Then the HTTP response status should be 200
    And the response should be valid JSON
    And the response should match the quote schema
    And the quote should carry a server-assigned id
    And the quote should offer a positive price
    And the quote should report available inventory

  @Regression @API @Quote
  Scenario: A quote echoes back every field the client sent
    Given the client has a valid session token
    When the client requests a quote for the test symbol
    Then the HTTP response status should be 200
    And the quote should echo back the requested symbol
    And the quote should echo back the requested quoteReqId
    And the quote should echo back the requesting mpid and trader

  @Regression @API @Quote
  Scenario: orderQty is optional on a quote request
    Given the client has a valid session token
    When the client requests a quote for "AAPL" without a quantity
    Then the HTTP response status should be 200
    And the response should match the quote schema

  @Regression @API @Quote
  Scenario: A quote never offers more inventory than was asked for
    Given the client has a valid session token
    When the client requests a quote for "AAPL" with quantity 100
    Then the HTTP response status should be 200
    And the quote offerSize should not exceed the requested quantity

  @Regression @API @Quote
  Scenario: Quoting repeatedly is allowed and each quote is distinct
    Given the client has a valid session token
    When the client requests 3 quotes for the test symbol
    Then the HTTP response status should be 200
    And every quote in the batch should have a distinct id

  # --- Negative Path ---

  @Regression @API @Quote @Negative
  Scenario: An unrecognised symbol is reported as Unknown Symbol
    Given the client has a valid session token
    When the client requests a quote for the unknown symbol
    Then the HTTP response status should be 200
    And the status code should be "UNKNOWN_SYMBOL"
    And the status message should not be empty

  @Regression @API @Quote @Negative
  Scenario: A quote request without a token is refused
    Given the client has no session token
    When the client POSTs the following document to "/quote":
      """
      {"token": "", "quoteReqId": "QR-no-token", "mpid": "TEST", "trader": "TEST", "symbol": "AAPL"}
      """
    Then the HTTP response status should be 401

  @Regression @API @Quote @Negative
  Scenario: A quote request with an invalid token is refused
    Given the client has an invalid session token "not-a-real-token-0000"
    When the client POSTs the following document to "/quote":
      """
      {"token": "not-a-real-token-0000", "quoteReqId": "QR-bad-token", "mpid": "TEST", "trader": "TEST", "symbol": "AAPL"}
      """
    Then the HTTP response status should be 401

  @Regression @API @Quote @Negative
  Scenario: A quote document missing required fields is rejected
    When the client POSTs an empty document to "/quote"
    Then the HTTP response status should be 400
