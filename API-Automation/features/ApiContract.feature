Feature: Velocity JSON API - Transport contract and status codes (specification 1.5)
  As the team maintaining the Velocity JSON API integration
  I want the transport rules and status vocabulary honoured on every endpoint
  So that a client written to the specification keeps working

  # This file holds the cross-cutting rules that are not tied to one business
  # flow: HTTP response rules and status codes. Endpoint behaviour lives in the per-endpoint
  # feature files.
  # Environment: Dev/Test only - see API-Automation/Config/env.js

  # --- Transport rules ---

  @Smoke @Regression @API @Contract @SLL-C1644
  Scenario: Responses use application/json with UTF-8 charset
    Given the client has no session token
    When the client logs on with valid credentials
    Then the HTTP response status should be 200
    And the response Content-Type header should be "application/json;charset=utf-8"

  @Regression @API @Contract @SLL-C1645
  Scenario Outline: Every entity URL answers a POST
    Given the client has a valid session token
    When the client POSTs a document with only the session token to "<entityUrl>"
    Then the response should be valid JSON

    Examples:
      | entityUrl  |
      | /quote     |
      | /limit     |
      | /overnight |
      | /locate    |
      | /snapshot  |

  # --- Section 10 Status object ---

  @Regression @API @Contract @SLL-C1646
  Scenario Outline: Every endpoint carries a status object
    Given the client has a valid session token
    When the client POSTs a document with only the session token to "<entityUrl>"
    Then the response should carry a status object

    Examples:
      | entityUrl  |
      | /quote     |
      | /limit     |
      | /overnight |
      | /locate    |
      | /snapshot  |

  # Invalid JSON is rejected by the authentication filter before endpoint
  # processing; valid JSON with missing fields is covered per endpoint.
  @Regression @API @Contract @Negative @SLL-C1647
  Scenario: Invalid JSON returns the documented early-authentication error
    When the client POSTs the following document to "/logon":
      """
      {"user": "invalid", "password":}
      """
    Then the HTTP response status should be 401
    And the response should carry a status object

  # 401: "The request requires user authentication."
  @Regression @API @Contract @Negative @SLL-C1648
  Scenario Outline: An authenticated endpoint returns 401 without a valid token
    Given the client has an invalid session token "not-a-real-token-0000"
    When the client POSTs the following document to "<entityUrl>":
      """
      {"token": "not-a-real-token-0000", "quoteReqId": "QR-contract", "cliOrdId": "CO-contract", "mpid": "TEST", "trader": "TEST", "symbol": "AAPL", "orderQty": 100, "orderPx": 1.0}
      """
    Then the HTTP response status should be 401

    Examples:
      | entityUrl  |
      | /quote     |
      | /limit     |
      | /overnight |
      | /locate    |
      | /snapshot  |

  # --- Responsiveness ---

  # Not a spec requirement - a guard so a silently degraded environment shows
  # up as a failure instead of a slow green run. Raise the budget rather than
  # deleting the scenario if dev is legitimately slower.
  @Regression @API @Contract @SLL-C1649
  Scenario: A quote answers inside the latency budget
    Given the client has a valid session token
    When the client requests a quote for the test symbol
    Then the HTTP response status should be 200
    And the response should arrive within 5000 ms

  # --- Section 2 End-to-end workflow ---

  # One token and ordered endpoint calls; logout is the final API request.
  @Smoke @Regression @API @Contract @Workflow @OrderedWorkflow @SLL-C1650
  Scenario: The APIs run in the documented order on one session
    Given a session established by this scenario
    When the same session requests a quote for the test symbol
    And the same session requests a quote list snapshot
    And the same session submits a limit order at the quoted price
    And the same session restates that order
    And the same session submits an overnight order for the test symbol
    And the same session logs out
    Then the ordered workflow should have succeeded
