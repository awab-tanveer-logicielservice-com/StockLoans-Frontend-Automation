Feature: Velocity JSON API - Quote List Snapshot (spec 1.10)
  As a client of the Velocity Locate Services JSON API
  I want a price list of everything currently in inventory
  So that I can pick symbols and prices without quoting them one at a time

  # Entity URL: /snapshot
  # The literal string "snapshot" is sent as the symbol. A symbol that is not
  # in inventory simply does not appear in the list - its absence is not an
  # error.
  #
  # Shape caveat: the spec's printed response sample shows an unnamed
  # { symbol, offerPx } object inside `data`, which is not valid JSON, so the
  # real key is unknown until a live response is seen. The steps locate the
  # price list by structure and report which shape the server actually uses -
  # see API-Automation/utils/snapshot.js.
  # Environment: Dev/Test only - see API-Automation/Config/env.js

  # --- Happy Path ---

  @Smoke @Regression @API @Snapshot
  Scenario: The snapshot returns the current inventory price list
    Given the client has a valid session token
    When the client requests a quote list snapshot
    Then the HTTP response status should be 200
    And the response should be valid JSON
    And the response should match the snapshot schema
    And the snapshot should contain a price list

  @Regression @API @Snapshot
  Scenario: Every entry in the snapshot is a symbol with a positive price
    Given the client has a valid session token
    When the client requests a quote list snapshot
    Then the HTTP response status should be 200
    And the snapshot should contain a price list
    And every snapshot entry should have a symbol and a price

  @Regression @API @Snapshot
  Scenario: The snapshot echoes back the request header fields
    Given the client has a valid session token
    When the client requests a quote list snapshot
    Then the HTTP response status should be 200
    And the snapshot should echo back the symbol "snapshot"

  @Regression @API @Snapshot
  Scenario: A symbol held in inventory appears in the snapshot
    Given the client has a valid session token
    When the client requests a quote list snapshot
    Then the HTTP response status should be 200
    And the snapshot should contain a price list
    And the snapshot should include the test symbol

  # --- Cross-endpoint: the spec 1.10 workflow, snapshot then locate ---

  @Regression @API @Snapshot
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

  @Regression @API @Snapshot @Negative
  Scenario: A snapshot document missing required fields is rejected
    When the client POSTs an empty document to "/snapshot"
    Then the HTTP response status should be 400

  @Regression @API @Snapshot @Negative
  Scenario: A snapshot request with an invalid token is refused
    Given the client has an invalid session token "not-a-real-token-0000"
    When the client POSTs the following document to "/snapshot":
      """
      {"token": "not-a-real-token-0000", "quoteReqId": "QR-bad-token", "mpid": "TEST", "symbol": "snapshot"}
      """
    Then the HTTP response status should be 401
