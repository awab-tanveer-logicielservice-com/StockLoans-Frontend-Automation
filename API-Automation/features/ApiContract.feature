Feature: Velocity JSON API - Transport contract and status codes (spec 1.1, 1.7, 1.9, 1.11)
  As the team maintaining the Velocity JSON API integration
  I want the transport rules and status vocabulary honoured on every endpoint
  So that a client written to the specification keeps working

  # This file holds the cross-cutting rules that are not tied to one business
  # flow: the HTTP contract from 1.1, the HTTP response codes from 1.11, and
  # the status object from 1.9. Endpoint behaviour lives in the per-endpoint
  # feature files.
  # Environment: Dev/Test only - see API-Automation/Config/env.js

  # --- 1.1 Transport rules ---

  @Smoke @Regression @API @Contract
  Scenario: Responses use application/json with no media type parameters
    Given the client has no session token
    When the client logs on with valid credentials
    Then the HTTP response status should be 200
    And the response Content-Type header should be "application/json"

  @Regression @API @Contract
  Scenario Outline: Every entity URL answers a POST
    Given the client has a valid session token
    When the client POSTs an empty document to "<entityUrl>"
    Then the response should be valid JSON

    Examples:
      | entityUrl  |
      | /quote     |
      | /limit     |
      | /overnight |
      | /locate    |
      | /snapshot  |

  # --- 1.9 Status object ---

  @Regression @API @Contract
  Scenario Outline: Every endpoint carries a status object
    Given the client has a valid session token
    When the client POSTs an empty document to "<entityUrl>"
    Then the response should carry a status object

    Examples:
      | entityUrl  |
      | /quote     |
      | /limit     |
      | /overnight |
      | /locate    |
      | /snapshot  |

  # --- 1.11 HTTP response codes ---

  # 400: "malformed syntax or missing fields. The client SHOULD NOT repeat the
  # request without modifications."
  @Regression @API @Contract @Negative
  Scenario Outline: A malformed document returns 400 Bad Request
    When the client POSTs the following document to "<entityUrl>":
      """
      {"token": "abc", "symbol":}
      """
    Then the HTTP response status should be 400

    Examples:
      | entityUrl  |
      | /logon     |
      | /logout    |
      | /quote     |
      | /limit     |
      | /overnight |
      | /locate    |
      | /snapshot  |

  # 401: "The request requires user authentication."
  @Regression @API @Contract @Negative
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
  @Regression @API @Contract
  Scenario: A quote answers inside the latency budget
    Given the client has a valid session token
    When the client requests a quote for the test symbol
    Then the HTTP response status should be 200
    And the response should arrive within 5000 ms

  # --- 1.2 End-to-end workflow ---

  # One session throughout - see step-definitions/workflowSteps.js for why
  # these steps are phrased "the same session" rather than reusing the
  # per-endpoint steps.
  @Smoke @Regression @API @Contract @Workflow
  Scenario: The documented workflow runs end to end on a single session
    Given a session established by this scenario
    When the same session requests a quote for the test symbol
    Then the HTTP response status should be 200
    And the quote should offer a positive price
    When the same session locates at the quoted price
    Then the HTTP response status should be 200
    And the order should carry a locateId
    When the same session restates that order
    Then the HTTP response status should be 200
    When the same session logs out
    Then the HTTP response status should be 200
    And the whole workflow should have succeeded
    And the invalidated token should be rejected on a subsequent request
