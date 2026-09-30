Feature: Velocity JSON API - Limit-Locate-Order (spec 1.6)
  As a client of the Velocity Locate Services JSON API
  I want to request a locate at a price I specify
  So that I am guaranteed that price or better against available inventory

  # Entity URL: /limit
  # "request a limit-locate-order that guarantees the requested price or is
  # lower as indicated in inventory."
  #
  # Reading status.code on an order response: spec 1.9 says code 0 means "no
  # error" only when orderStatus is a fill (1 or 2). Code 0 on an unfilled
  # order means No Inventory. The steps below never read a bare 0 as success.
  # Environment: Dev/Test only - see API-Automation/Config/env.js

  # --- Happy Path: the spec 1.2 workflow, quote then locate ---

  @Smoke @Regression @API @Limit
  Scenario: A locate priced from a fresh quote is filled
    Given the client has a valid session token
    When the client requests a quote for the test symbol
    Then the quote should offer a positive price
    And the quoted price should be remembered for the locate request
    When the client submits a limit-locate-order at the quoted price
    Then the HTTP response status should be 200
    And the response should match the order schema
    And the order response should indicate no error
    And the order status should be a fill

  @Smoke @Regression @API @Limit
  Scenario: A filled locate returns an identifiable order
    Given the client has a valid session token
    When the client requests a quote for the test symbol
    And the quoted price should be remembered for the locate request
    When the client submits a limit-locate-order at the quoted price
    Then the HTTP response status should be 200
    And the order should echo back the requested cliOrdId
    And the order should carry a locateId
    And the order should echo back the requested symbol and quantity
    And the order type should not be overnight

  @Regression @API @Limit
  Scenario: The price guarantee holds - execution is never above the limit
    Given the client has a valid session token
    When the client requests a quote for the test symbol
    And the quoted price should be remembered for the locate request
    When the client submits a limit-locate-order at the quoted price
    Then the HTTP response status should be 200
    And the executed price should not exceed the limit price
    And the executed quantity should not exceed the ordered quantity

  @Regression @API @Limit
  Scenario: A generously priced locate fills the full quantity
    Given the client has a valid session token
    When the client submits a limit-locate-order for "AAPL" quantity 100 at price 999.0
    Then the HTTP response status should be 200
    And the response should match the order schema
    And the order response should indicate no error
    And the executed quantity should equal the ordered quantity

  # --- Negative Path ---

  @Regression @API @Limit @Negative
  Scenario: A locate priced below the market is reported as Price Too Low
    Given the client has a valid session token
    When the client submits a limit-locate-order at a price below the market
    Then the HTTP response status should be 200
    And the status code should be "PRICE_TOO_LOW"
    And the status message should not be empty

  @Regression @API @Limit @Negative
  Scenario: A locate for an unrecognised symbol is reported as Unknown Symbol
    Given the client has a valid session token
    When the client submits a limit-locate-order for "ZZZZQQ" quantity 100 at price 999.0
    Then the HTTP response status should be 200
    And the status code should be "UNKNOWN_SYMBOL"

  @Regression @API @Limit @Negative
  Scenario: A quantity beyond what is permitted is refused
    Given the client has a valid session token
    When the client submits a limit-locate-order for "AAPL" quantity 100000000 at price 999.0
    Then the HTTP response status should be 200
    And the status message should not be empty
    And the order status should be "REJECTED"

  @Regression @API @Limit @Negative
  Scenario: A limit document missing required fields is rejected
    When the client POSTs an empty document to "/limit"
    Then the HTTP response status should be 400

  @Regression @API @Limit @Negative
  Scenario: A limit order with an invalid token is refused
    Given the client has an invalid session token "not-a-real-token-0000"
    When the client POSTs the following document to "/limit":
      """
      {"token": "not-a-real-token-0000", "cliOrdId": "CO-bad-token", "mpid": "TEST", "trader": "TEST", "symbol": "AAPL", "orderQty": 100, "orderPx": 1.0}
      """
    Then the HTTP response status should be 401
