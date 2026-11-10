Feature: Velocity JSON API - Limit-Locate-Order (spec section 5)
  As a client of the Velocity Locate Services JSON API
  I want to request a locate at a price I specify
  So that I am guaranteed that price or better against available inventory

  # Entity URL: /limit
  # "request a limit-locate-order that guarantees the requested price or is
  # lower as indicated in inventory."
  #
  # orderStatus is authoritative. Code 0 on an unfilled order means No
  # Inventory; status.code -1 denotes a booked overnight order.
  # Environment: Dev/Test only - see API-Automation/Config/env.js

  # --- Happy Path: section 2 workflow, quote then locate ---

  @Smoke @Regression @API @Limit @SLL-C1651
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

  @Smoke @Regression @API @Limit @SLL-C1652
  Scenario: A filled locate returns an identifiable order
    Given the client has a valid session token
    When the client requests a quote for the test symbol
    And the quoted price should be remembered for the locate request
    When the client submits a limit-locate-order at the quoted price
    Then the HTTP response status should be 200
    And the order should echo back the requested cliOrdId
    And the order should carry a locateId
    And the order should echo back the requested symbol and quantity

  @Regression @API @Limit @SLL-C1653
  Scenario: The price guarantee holds - execution is never above the limit
    Given the client has a valid session token
    When the client requests a quote for the test symbol
    And the quoted price should be remembered for the locate request
    When the client submits a limit-locate-order at the quoted price
    Then the HTTP response status should be 200
    And the executed price should not exceed the limit price
    And the executed quantity should not exceed the ordered quantity

  @Regression @API @Limit @SLL-C1654
  Scenario: A generously priced locate fills the full quantity
    Given the client has a valid session token
    When the client submits a limit-locate-order for "AAPL" quantity 100 at price 999.0
    Then the HTTP response status should be 200
    And the response should match the order schema
    And the order response should indicate no error
    And the executed quantity should equal the ordered quantity

  # --- Negative Path ---

  @Regression @API @Limit @Negative @SLL-C1655
  Scenario: A locate priced below the market is reported as Price Too Low
    Given the client has a valid session token
    When the client submits a limit-locate-order at a price below the market
    Then the HTTP response status should be 200
    And the status code should be "PRICE_TOO_LOW"
    And the order status should be "REJECTED"

  @Regression @API @Limit @Negative @SLL-C1656
  Scenario: A locate for an unrecognised symbol is rejected for no inventory
    Given the client has a valid session token
    When the client submits a limit-locate-order for "ZZZZQQ" quantity 100 at price 999.0
    Then the HTTP response status should be 200
    And the status code should be "NO_INVENTORY"
    And the order status should be "REJECTED"

  @Regression @API @Limit @Negative @SLL-C1657
  Scenario: A quantity beyond what is permitted is refused
    Given the client has a valid session token
    When the client submits a limit-locate-order for "AAPL" quantity 100000000 at price 999.0
    Then the HTTP response status should be 200
    And the status message should not be empty
    And the order status should be "REJECTED"

  @Regression @API @Limit @Negative @SLL-C1658
  Scenario: A limit document missing required fields is rejected
    Given the client has a valid session token
    When the client POSTs a document with only the session token to "/limit"
    Then the HTTP response status should be 400

  @Regression @API @Limit @Negative @SLL-C1659
  Scenario: A limit order with an invalid token is refused
    Given the client has an invalid session token "not-a-real-token-0000"
    When the client POSTs the following document to "/limit":
      """
      {"token": "not-a-real-token-0000", "cliOrdId": "CO-bad-token", "mpid": "TEST", "trader": "TEST", "symbol": "AAPL", "orderQty": 100, "orderPx": 1.0}
      """
    Then the HTTP response status should be 401
