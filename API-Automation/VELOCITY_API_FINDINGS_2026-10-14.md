# Velocity JSON API - Findings from the first live run against Dev/Test

**Date:** 2026-10-14
**Prepared by:** StockLoans Frontend Automation team
**Environment:** Dev/Test, `https://betapi.velocitycapitalllc.com/json`
**Reference:** Velocity Clearing JSON API Specification 1.4 (July/2026)
**Test account:** atanveer (idUser 2033), MPID AVTR, trader t-avatar-api
**Result:** 27 passed, 50 failed, 0 skipped, out of 77 automated scenarios

This is the first time the automation suite has run end to end with real
credentials. Every finding below was reproduced with a live request/response
pair and checked word for word against the specification PDF, not against our
own transcription of it. Four distinct defects account for the large majority
of the 50 failures; they are listed first, followed by two narrower issues and
two items that need confirmation from Velocity rather than a fix.

---

## 1. Logon/logout/order responses use `time` instead of the spec'd `transactTime`

**Spec (1.3, 1.4, 1.6, 1.8):** every response envelope includes `"transactTime": ""`.

**Observed, POST /logon:**
```json
{"user":"atanveer","token":"0a561dab43330440854bb234b845447fc3b6","time":"2026-10-14T11:52:47.400","status":{"code":0,"message":"Logon Successful"}}
```

The field is present and correctly populated - it is simply named `time`
instead of `transactTime`. Confirmed on logon, logout, and inside the `data`
object of limit/overnight responses. This single field-name mismatch is the
root cause of most of the "response does not match the specification shape"
failures across the suite (logon, logout, limit, overnight, locate, quote,
snapshot).

**Impact:** Any client built strictly to the published spec and reading
`transactTime` gets `undefined` for the response timestamp on every call.

---

## 2. `/logout` returns HTTP 500 on every call, not only on malformed input

**Spec (1.4, 1.11):** a logout with a valid token and user returns 200 with a
normal status envelope.

**Observed**, immediately after a successful logon and a successful order,
using the token just issued:
```
POST /logout -> HTTP 500
{"status":{"code":3,"message":"Internal Processing Error"}}
```

This happened on every single logout call made during the run (dozens, across
unrelated scenarios), including the simplest possible case: log on, log out,
nothing else. `status.code 3` does not appear in the spec's status code list
(0, 1, 2, 80, 93-99).

**Impact:** Logout is not usable as documented. Sessions can only be ended by
waiting for the 2-hour inactivity timeout or the 8:10 PM ET cutoff (spec 1.3).

---

## 3. `/overnight` response omits `orderType`, and `cliOrdId` is not echoed back

**Spec (1.8):** "In the response, `orderType` is 5." The response schema
lists `"orderType": "5"` and `"cliOrdId": ""` (echoing the request).

**Observed:**
```
req:  {"cliOrdId":"CO-mv835fn7-31544-0001-b3e6","mpid":"AVTR","trader":"t-avatar-api","symbol":"AAPL","orderQty":100}
res.data: {"cliOrdId":null,"locateId":25063884,"mpid":"AVTR","trader":"t-avatar-api",
           "symbol":"AAPL","orderQty":100,"orderPx":0.007,"execQty":100,"execPx":0.007,
           "tif":0,"transactTime":"2026-10-14T11:00:00.000","orderStatus":2}
           // no "orderType" key at all
status: {"code":-1,"message":""}
```

Two separate defects in this one response:
- `orderType` is missing entirely (spec requires the literal string `"5"`).
- `cliOrdId` comes back `null` instead of echoing the client's id, which
  breaks client-side order correlation.
- `status.code: -1` is also not in the spec's status code list.

---

## 4. Negative/malformed requests return HTTP 401 with a raw server exception, not HTTP 400

**Spec (1.11):** "missing fields... the client SHOULD NOT repeat the request
without modifications" -> HTTP 400.

**Observed**, POST with an empty or missing-field document to logon, logout,
limit, overnight, locate, quote, and snapshot:
```
HTTP 401
{"Status":401,"message":"Cannot invoke \"com.google.gson.JsonElement.getAsString()\" because the return value of \"com.google.gson.JsonObject.get(String)\" is null"}
```
and, for an invalid token on logout:
```
HTTP 401
{"Status":401,"message":"Invalid Token: Unauthroized:not-a-real-token-0000 {...}"}
```

Two defects:
- Wrong HTTP code: 401 instead of the spec'd 400 for malformed/missing-field
  input.
- Wrong envelope shape: the body uses capitalized `Status` as a bare number
  with a raw exception message, not the spec's `"status": {"code", "message"}`
  object. This looks like an unhandled exception in the server's input
  validation (a Gson `JsonObject.get(...)` call on a field that was never
  checked for null) rather than an intentional error response, and it also
  exposes an internal Java class name to the client. Note the server-side
  typo: "Unauthroized".

---

## 5. `orderQty` is documented as optional on `/quote`, but the server requires it

**Spec (1.5):** `"orderQty": 100 //number (optional)`.

**Observed**, a quote request that omits `orderQty` entirely:
```
POST /quote -> HTTP 400
{"status":{"code":20,"message":"Missing orderQty"}}
```
`status.code 20` is not in the spec's status code list either.

---

## 6. A quantity rejection reports the wrong status code and no message

**Spec (1.7, 1.9):** `orderStatus: 8` means "Rejected." For an unfilled
order, `status.code: 0` specifically means "No Inventory" - the spec provides
dedicated codes for quantity problems (`93 Qty Not Allowed`, `98 Qty Too
Low`).

**Observed**, a limit order for 100,000,000 shares at $999:
```
res.data: {..., "orderQty":100000000, "execQty":0, "orderStatus":8}
status: {"code":0,"message":""}
```
The order was correctly rejected (`orderStatus: 8`), but the reason reported
is `code 0` ("No Inventory"), which is factually wrong for a quantity
rejection, and the message is empty rather than explaining the real reason.
The equivalent underpriced-order scenario (`status.code: 2`, "Price Too Low")
also came back with an empty `message`.

---

## 7. `Content-Type` includes `;charset=utf-8`

**Spec (1.1):** "The server will send all JSON API data in response documents
with the header `Content-Type: application/json` without any media type
parameters."

**Observed:** `content-type: application/json;charset=utf-8` on every
response (confirmed via curl as well as the automated run).

---

## Resolved - not a bug

**A. `/overnight` returning "No Prior Locate to Overnight" (code 96) for
every symbol, including freshly-filled ones, was test data, not a server
defect.** Explained by the team on 2026-10-20: `/overnight` is not built from
a same-day locate. The server looks for locates that filled on the
**previous business day** for the same MPID + trader + symbol + account, and
builds the overnight order from those; if nothing filled yesterday under that
exact combination, there is nothing to build and the order is rejected with
this status.

Confirmed directly: on 2026-10-19 this account (MPID `AVTR`, trader
`t-avatar-api`) filled real limit locates on `AAPL` (e.g. locateId
`25074162`). Re-running the identical `/overnight` request against `AAPL` on
**2026-10-20** - the next business day - now fills:
```
POST /overnight -> 200
{"data":{"locateId":25074205,...,"execQty":100,"execPx":0.007,"orderStatus":2},
 "status":{"code":-1,"message":""}}
```
No rejection. The suite's `/overnight` scenarios need rewriting to use a
symbol/trader/MPID combination known to have filled on the prior business
day, not a symbol picked same-day - a same-day-only test design can never
pass regardless of server behavior. This is a test design fix, not something
to raise with Velocity.

Still real bugs, visible now that the order actually fills: `orderType` is
still missing from the response entirely (see finding 3), and `status.code`
on this successful fill was `-1`, not in the spec's list and not `0`
either - worth folding into finding 4's "undocumented codes" list.

**B. `locateId` is returned as a number.** Spec 1.9 already flags this
itself: "locateId type unified to string across requests and responses
(previously mixed string/number). Confirm the intended type." The live value
is numeric (e.g. `25063884`), so this still needs Velocity's confirmation of
which type is authoritative.

---

## Suggested priority for Velocity

1. **#2 (logout 500)** - blocks normal session hygiene on every call.
2. **#4 (401 instead of 400, exception leaking to client)** - unhandled
   exception path, also an information-disclosure concern (internal class
   names in the response body).
3. **#1 (`time` vs `transactTime`) and #3 (`orderType`/`cliOrdId` missing on
   `/overnight`)** - straightforward field-naming/completeness fixes.
4. **#5, #6, #7** - lower severity, but each is a clear, reproducible
   contract break.
5. **B** - clarify with Velocity before changing test expectations either
   way. (A is resolved - see "Resolved - not a bug" above.)
