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
  #
  # Precondition, confirmed 2026-10-20: an overnight order is built from
  # locates that FILLED ON THE PREVIOUS BUSINESS DAY for the same
  # MPID + trader + symbol + account. A symbol located same-day, or never
  # located at all, returns status.code 96 "No Prior Locate to Overnight" -
  # this is not an inventory/unknown-symbol failure, it is this precondition
  # not being met. See API-Automation/VELOCITY_API_FINDINGS_2026-10-14.md,
  # "Resolved - not a bug", item A, for how this was confirmed.
  #
  # Consequence: the happy-path scenarios below are tagged @RequiresPriorDayFill
  # and are NOT part of the default `npm run test:api` / `test:api:smoke` run
  # (see the exclusion in package.json and the Conventions section of
  # README.md). They only pass when VELOCITY_TEST_SYMBOL names a
  # symbol/trader/MPID combination that filled a limit-locate on the
  # immediately preceding business day - run deliberately with
  # `npm run test:api:overnight`, not as part of an unattended CI run.
  # Environment: Dev/Test only - see API-Automation/Config/env.js

  # --- Happy Path ---

  @Smoke @Regression @API @Overnight @RequiresPriorDayFill
  Scenario: An overnight locate is accepted without a client price
    Given the client has a valid session token
    When the client submits an overnight-locate-order for the test symbol
    Then the HTTP response status should be 200
    And the response should be valid JSON
    And the response should match the order schema
    And the order response should indicate no error

  @Smoke @Regression @API @Overnight @RequiresPriorDayFill
  Scenario: An overnight locate is marked with order type 5
    Given the client has a valid session token
    When the client submits an overnight-locate-order for the test symbol
    Then the HTTP response status should be 200
    And the order type should be overnight

  @Regression @API @Overnight @RequiresPriorDayFill
  Scenario: An overnight locate returns an identifiable order
    Given the client has a valid session token
    When the client submits an overnight-locate-order for the test symbol
    Then the HTTP response status should be 200
    And the order should echo back the requested cliOrdId
    And the order should carry a locateId
    And the order should echo back the requested symbol and quantity

  @Regression @API @Overnight @RequiresPriorDayFill
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
  @Regression @API @Overnight @RequiresPriorDayFill
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
