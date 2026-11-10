Feature: Velocity JSON API - Quote List Snapshot (spec section 6)
  As a client of the Velocity Locate Services JSON API
  I want a price list of everything currently in inventory
  So that I can pick symbols and prices without quoting them one at a time

  # Entity URL: /snapshot
  # The literal string "snapshot" is sent as the symbol and echoed uppercase.
  #
  # Shape: confirmed against specification 1.5. The price list is
  # data.items, an array of { symbol, offerPx } entries - see
  # API-Automation/utils/snapshot.js.
  # Environment: Dev/Test only - see API-Automation/Config/env.js

  # --- Happy Path ---

  @Smoke @Regression @API @Snapshot @SLL-C1687
  Scenario: The snapshot returns the current inventory price list
    Given the client has a valid session token
    When the client requests a quote list snapshot
    Then the HTTP response status should be 200
    And the response should be valid JSON
    And the response should match the snapshot schema
    And the snapshot should contain a price list

  @Regression @API @Snapshot @SLL-C1688
  Scenario: Every entry in the snapshot is a symbol with a positive price
    Given the client has a valid session token
    When the client requests a quote list snapshot
    Then the HTTP response status should be 200
    And the snapshot should contain a price list
    And every snapshot entry should have a symbol and a price

  @Regression @API @Snapshot @SLL-C1689
  Scenario: The snapshot echoes back the request header fields
    Given the client has a valid session token
    When the client requests a quote list snapshot
    Then the HTTP response status should be 200
    And the snapshot should echo back the requested symbol

  @Regression @API @Snapshot @SLL-C1690
  Scenario: A symbol held in inventory appears in the snapshot
    Given the client has a valid session token
    When the client requests a quote list snapshot
    Then the HTTP response status should be 200
    And the snapshot should contain a price list
    And the snapshot should include the test symbol

  # --- Cross-endpoint: the section 6 snapshot then limit workflow ---

  @Regression @API @Snapshot @SLL-C1691
  Scenario: A price taken from the snapshot is usable for a limit-locate-order
    Given the client has a valid session token
    When the client requests a quote list snapshot
    Then the snapshot should contain a price list
    And the snapshot should include the test symbol
    When the client submits a limit-locate-order at the snapshot price
    Then the HTTP response status should be 200
    And the response should match the order schema
    And the executed price should not exceed the limit price

  # --- Negative Path ---

  @Regression @API @Snapshot @Negative @SLL-C1692
  Scenario: A snapshot document missing required fields is rejected
    Given the client has a valid session token
    When the client POSTs a document with only the session token to "/snapshot"
    Then the HTTP response status should be 400

  @Regression @API @Snapshot @Negative @SLL-C1693
  Scenario: A snapshot request with an invalid token is refused
    Given the client has an invalid session token "not-a-real-token-0000"
    When the client POSTs the following document to "/snapshot":
      """
      {"token": "not-a-real-token-0000", "quoteReqId": "QR-bad-token", "mpid": "TEST", "symbol": "snapshot"}
      """
    Then the HTTP response status should be 401
