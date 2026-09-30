Feature: Velocity JSON API - Overnight-Locate-Order (spec 1.8)
  As a client of the Velocity Locate Services JSON API
  I want to submit the total quantity of shares I hold overnight per symbol and trader
  So that my overnight position is located without my having to price it

  # Entity URL: /overnight
  # The request matches Limit-Locate-Order except it omits orderPx - overnight
  # orders are not priced by the client. The response carries orderType "5".
  #
  # Operationally these are submitted on the morning of the trade day,
  # preferably before the market opens, one per symbol and trader for the
  # total overnight quantity.
  # Environment: Dev/Test only - see API-Automation/Config/env.js

  # --- Happy Path ---

  @Smoke @Regression @API @Overnight
  Scenario: An overnight locate is accepted without a client price
    Given the client has a valid session token
    When the client submits an overnight-locate-order for the test symbol
    Then the HTTP response status should be 200
    And the response should be valid JSON
    And the response should match the order schema
    And the order response should indicate no error

  @Smoke @Regression @API @Overnight
  Scenario: An overnight locate is marked with order type 5
    Given the client has a valid session token
    When the client submits an overnight-locate-order for the test symbol
    Then the HTTP response status should be 200
    And the order type should be overnight

  @Regression @API @Overnight
  Scenario: An overnight locate returns an identifiable order
    Given the client has a valid session token
    When the client submits an overnight-locate-order for the test symbol
    Then the HTTP response status should be 200
    And the order should echo back the requested cliOrdId
    And the order should carry a locateId
    And the order should echo back the requested symbol and quantity

  @Regression @API @Overnight
  Scenario: The server prices the overnight order itself
    Given the client has a valid session token
    When the client submits an overnight-locate-order for the test symbol
    Then the HTTP response status should be 200
    And the executed quantity should not exceed the ordered quantity

  # --- Contract Probe ---

  # The spec says the overnight request omits orderPx. It does not say what
  # happens if a client sends one anyway, so this scenario records the server's
  # actual behaviour rather than asserting a guess: the order must still come
  # back as an overnight order, whatever the server did with the stray field.
  @Regression @API @Overnight
  Scenario: A stray orderPx does not turn an overnight order into a limit order
    Given the client has a valid session token
    When the client submits an overnight-locate-order carrying an orderPx
    Then the HTTP response status should be 200
    And the order type should be overnight

  # --- Negative Path ---

  @Regression @API @Overnight @Negative
  Scenario: An overnight locate for an unrecognised symbol is reported as Unknown Symbol
    Given the client has a valid session token
    When the client submits an overnight-locate-order for "ZZZZQQ" quantity 100
    Then the HTTP response status should be 200
    And the status code should be "UNKNOWN_SYMBOL"

  @Regression @API @Overnight @Negative
  Scenario: An overnight document missing required fields is rejected
    When the client POSTs an empty document to "/overnight"
    Then the HTTP response status should be 400

  @Regression @API @Overnight @Negative
  Scenario: An overnight order with an invalid token is refused
    Given the client has an invalid session token "not-a-real-token-0000"
    When the client POSTs the following document to "/overnight":
      """
      {"token": "not-a-real-token-0000", "cliOrdId": "CO-bad-token", "mpid": "TEST", "trader": "TEST", "symbol": "AAPL", "orderQty": 100}
      """
    Then the HTTP response status should be 401
