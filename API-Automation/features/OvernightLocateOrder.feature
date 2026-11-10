Feature: Velocity JSON API - Overnight-Locate-Order (spec section 7)
  As a client of the Velocity Locate Services JSON API
  I want to submit the total quantity of shares I hold overnight per symbol and trader
  So that my overnight position is located without my having to price it

  # Entity URL: /overnight
  # The request matches Limit-Locate-Order except it omits orderPx. Its
  # response has a null cliOrdId; a booked result is orderStatus 2 / code -1.
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

  # A single successful overnight request is intentional: resubmitting the
  # same symbol/trader creates another booking rather than replacing the first.
  @Smoke @Regression @API @Overnight @RequiresPriorDayFill @SLL-C1679
  Scenario: A prior-day locate can be carried without a client price
    Given the client has a valid session token
    When the client submits an overnight-locate-order for the test symbol
    Then the HTTP response status should be 200
    And the response should be valid JSON
    And the response should match the order schema
    And the overnight order should be booked
    And the overnight response should have a null cliOrdId
    And the order should carry a locateId
    And the order should echo back the requested symbol and quantity
    And the executed quantity should not exceed the ordered quantity

  # --- Negative Path ---

  @Regression @API @Overnight @Negative @SLL-C1684
  Scenario: An overnight locate for an unrecognised symbol is rejected for no inventory
    Given the client has a valid session token
    When the client submits an overnight-locate-order for "ZZZZQQ" quantity 100
    Then the HTTP response status should be 200
    And the status code should be "NO_INVENTORY"
    And the order status should be "REJECTED"

  @Regression @API @Overnight @Negative @SLL-C1685
  Scenario: An overnight document missing required fields is rejected
    Given the client has a valid session token
    When the client POSTs a document with only the session token to "/overnight"
    Then the HTTP response status should be 400

  @Regression @API @Overnight @Negative @SLL-C1686
  Scenario: An overnight order with an invalid token is refused
    Given the client has an invalid session token "not-a-real-token-0000"
    When the client POSTs the following document to "/overnight":
      """
      {"token": "not-a-real-token-0000", "cliOrdId": "CO-bad-token", "mpid": "TEST", "trader": "TEST", "symbol": "AAPL", "orderQty": 100}
      """
    Then the HTTP response status should be 401
