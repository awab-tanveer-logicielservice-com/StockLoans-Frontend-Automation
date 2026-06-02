# StockLoans SLS v2 — UI Revamp: Core Features Document

**Platform:** Velocity Clearing LLC — StockLoans (SLS v2)
**URL:** https://qa-sls-v2.web.app
**Prepared by:** QA Automation Team
**Date:** May 2026

---

## Overview

SLS v2 is a complete redesign and revamp of the Velocity Clearing LLC StockLoans platform. The new version introduces a modernized Angular-based UI powered by AG-Grid data tables, Material Design components, and Firebase real-time backend integration. The revamp targets improved performance, usability, accessibility, and operational efficiency across all core stock loan workflows — from contract management and trade execution to account administration and security master data management.

---

## 1. Login & Authentication

### Summary
The login experience has been completely redesigned with a clean, branded interface for Velocity Clearing LLC. The new authentication flow integrates Firebase Auth with clear inline validation, improved error messaging, and a secure credential persistence option.

### Key Revamped Features

**Redesigned Login Form**
The login screen presents a minimal, focused layout with clearly labeled Email and Password fields. Real-time Angular form validation highlights errors inline — invalid email format or empty fields trigger descriptive error messages immediately rather than after submission.

**Password Visibility Toggle**
Users can reveal or mask their password using a toggle icon embedded inside the password field. This removes the friction of mistyped passwords without compromising security.

**Remember Me**
A "Remember Me" checkbox stores the user's email address in `localStorage` so it auto-populates on subsequent visits. Passwords are intentionally never stored — only the email is persisted, balancing convenience with security. Unchecking the option clears stored data on logout.

**Firebase Error Handling**
Authentication failures (wrong password, unregistered email) are surfaced as readable inline messages rather than generic alerts, giving users clear guidance on how to proceed.

**Session Management**
Successful login redirects the user directly to the Contract Summary dashboard. Session expiry redirects silently back to the login page without data loss.

---

## 2. Contract Summary Dashboard

### Summary
The dashboard is the central hub of SLS v2. It replaces a legacy tabular view with a fully interactive AG-Grid that supports real-time filtering, row selection, a collapsible details panel, and depository switching — all without page reloads.

### Key Revamped Features

**High-Performance AG-Grid**
All contract data is rendered in an AG-Grid component supporting thousands of rows with smooth scrolling, column grouping, pinned summary rows (totals), and a loading overlay during data fetch. Empty-state overlays clearly indicate when no records match active filters.

**Multi-Field Filter Bar**
Users can simultaneously filter contracts by Symbol/CUSIP, DTC, LoanetId, Contract Number, Profit Center, and Effective Date. Filters are applied together with an **Apply** button and cleared at once with a **Clear** button — a significant improvement over the previous single-field search.

**Effective Date Navigation**
A date picker allows users to navigate to historical contract states, loading past records as of any selected date. This gives operations teams a full audit trail without needing to query a separate reporting tool.

**Details Toggle Panel**
A slide toggle expands an inline detail panel below a selected row, surfacing granular contract metadata without navigating away. This eliminates the need to open separate pages for basic contract inspection.

**Depository Switching**
Radio button controls at the top of the grid allow instant switching between depositories (e.g., DTC, Loanet), filtering the grid to show only contracts for the selected clearing channel.

---

## 3. Contract Details

### Summary
The Contract Details module is the most operationally critical screen in SLS v2. It provides full contract lifecycle management — including trade entry, re-rating, recalls, and returns — all from a single master-detail grid with inline editing.

### Key Revamped Features

**Master-Detail Grid**
Each contract row can be expanded to reveal its historical change log in an embedded child grid. Collapsing the row hides the history, keeping the view clean. This replaces a previous flat table with no drill-down capability.

**Trade Panel**
A slide-out side drawer enables new Borrow and/or Loan trade entry without navigating away from the grid. The panel includes:
- Counterparty autocomplete (dynamic lookup)
- Symbol/CUSIP autocomplete with validation
- Quantity spinbutton
- Rebate Rate spinbutton
- Trade type selection (Borrow / Loan / both)

The loan side auto-populates symbol data from the selected row and becomes read-only once the borrow side is filled, enforcing correct trade flow.

**ReRate Dialog**
A focused modal dialog for modifying the rebate rate on selected contracts. Users enter a numeric rate and submit — invalid or out-of-range values are blocked with inline validation before submission reaches the backend.

**Recall Dialog**
Allows users to initiate a recall against a selected contract. The quantity spinbutton enforces a maximum value equal to the current contract quantity, preventing over-recalls.

**Return Dialog**
A structured form dialog for processing returns, supporting quantity entry, batch number, and a description field. A same-day acknowledgement checkbox must be checked when processing same-day returns — an explicit confirmation gate added in v2.

**Inline Profit Center Editing**
Profit Center cells are directly editable in the grid for current-date contracts. Clicking a cell activates edit mode; the field accepts a single character and validates on blur. Historical date views render the field as read-only.

**Live Quote Banner**
A snapshot banner displays real-time market quotes for the selected security, giving traders immediate pricing context during trade entry or re-rating.

**Row Multi-Select**
Ctrl/Cmd+Click supports multi-row selection for bulk operations such as batch re-rates, recalls, or returns — a workflow that previously required multiple individual actions.

---

## 4. FPL Accounts

### Summary
The FPL (Free Pledge Loan) Accounts page provides a structured view of clearing account relationships. The revamped interface introduces an interactive AG-Grid replacing a static HTML table, with floating filters and clickable cell interactions for quick account inspection.

### Key Revamped Features

**Interactive AG-Grid with Floating Filters**
Account data is displayed in an AG-Grid with per-column floating filter inputs directly below the column headers. Users can filter by account number, office code, or clearing details without opening a separate filter panel.

**Cell-Level Interactions**
Individual grid cells (FPL, VCSO, L, A, value cells) are clickable and trigger contextual dropdown options — such as selecting a clearing broker (e.g., APEX Clearing). This replaces a previous read-only display.

**Responsive Navigation**
The page includes a hamburger menu for mobile/responsive viewports. A sidebar overlay appears on narrow screens and can be dismissed by clicking outside it, ensuring the layout works across screen sizes.

**Account Row Details**
Clicking on an FPL VCSO row expands paragraph-level detail about that account's configuration, giving operations staff the full account context in a single view.

---

## 5. Security Master

### Summary
The Security Master module has been revamped into a full CRUD interface — users can search existing securities, edit their details inline, add new securities via a structured modal, and optionally cascade updates to all linked contracts simultaneously.

### Key Revamped Features

**Search & Edit**
A search bar accepts Symbol, CUSIP, or Description as input. Results load in an AG-Grid; selecting a row populates an edit form with all security fields. Changes (e.g., description, close price) are saved with an **Update** button and confirmed via a success snack bar.

**Add New Security Modal**
Clicking **Add New Security** opens a Material dialog with a validated form containing:
- Symbol (required, unique)
- CUSIP (required)
- Description (required)
- Exchange (optional)
- Volume (optional, numeric)
- Close Price (required, numeric)
- Close Date (required, date format)
- Status (optional dropdown: Active / Inactive / Pending)

The save button is disabled until all required fields pass validation. The modal closes automatically on successful save.

**Update Contracts Toggle**
A slide toggle reveals an additional sub-form for cascading a symbol/CUSIP change to all existing contracts that reference that security. Users enter the old symbol and CUSIP, then click **Update** to perform a bulk contract re-link. This prevents orphaned contract records when a security is renamed or restated.

**Unique Symbol Validation**
Attempting to add a symbol that already exists in the system triggers an inline error before the form is submitted, preventing duplicate security records.

---

## 6. Admin Management — Users, Counterparties & Entities

### Summary
Three administration modules — Users, Counterparties, and Entities — share a consistent revamped UI pattern: an AG-Grid listing backed by a modal form for creating new records. All three follow the same interaction model, reducing the learning curve for administrators managing multiple entity types.

### Key Revamped Features

**Unified Modal Pattern**
Each module uses the same Material dialog container, layout, and save/close behavior. Save buttons are disabled until all required fields are complete. Success and error outcomes are surfaced via snack bar notifications. The grid refreshes automatically after a save — no manual page reload required.

**Users Module**
Administrators can create new platform users by filling Email, First Name, Last Name, Title, and Nickname. Email format is validated using Angular's built-in email validator with an error displayed on blur. The new user appears in the grid immediately after save.

**Counterparties Module**
The most complex admin form, counterparty creation includes:
- Entity association (required dropdown with Material autocomplete)
- Name and Short Code
- Business Email and Operations Email
- Currency (default: USD), Default Margin, Rounding preference
- Type (default: Regular), Status (default: Active)
- Lend Limit and Borrow Limit

Pre-filled defaults reduce manual entry for common configurations, while all fields remain editable for non-standard counterparties.

**Entities Module**
A lightweight form requiring only an Entity Name. Entity Status is optional. The simplicity reflects the role of entities as top-level grouping structures referenced by counterparties and contracts.

---

## 7. Memo Segmentation (Memo Seg)

### Summary
The Memo Seg module enables operations staff to batch-allocate securities in a single submission. The revamped UI replaces a legacy one-by-one entry form with a free-text batch input field and a two-grid results view that shows both aggregated and individual segmentation records.

### Key Revamped Features

**Batch Text Input**
Users type multiple security allocations in a plain-text area using the format `SYMBOL QUANTITY` — one entry per line (e.g., `AAPL 100`, `MSFT 200`). This dramatically reduces the time needed to process multi-security segmentations.

**Dual-Grid Results View**
After submission, results are displayed across two grids:
- **Summary Grid** — aggregates records by symbol, showing total quantities grouped per security.
- **Detail Grid** — shows individual allocation records in a grouped/expandable row view.

Both grids update together on each successful submission, giving a complete picture of what was processed.

**UN-SEG Operation**
A dedicated **UN-SEG** button reverses an existing segmentation for a selected row. On success, both grids reset to reflect the reversal. This replaces a previously manual process requiring back-office intervention.

**Input Validation**
The system validates batch entries before submission — symbols must be uppercase and quantities must be numeric. Malformed entries are flagged with inline error messages, and only the valid portion of a batch is highlighted for correction.

---

## 8. Short Interest Rate Adjustment

### Summary
The Short Interest Rate Adjustment page provides authorized users with a direct interface to view and modify short interest rates for securities held in the platform. The revamp introduces role-based access control, grid-driven rate display, and a clean save workflow with explicit confirmation.

### Key Revamped Features

**Rate Grid**
All securities and their current short interest rates are displayed in an AG-Grid with clearly labeled column headers. The grid loads data from the backend on page entry and supports row selection for rate editing.

**Row-Gated Rate Input**
The rate input spinbutton is disabled until a row is selected. Attempting to save without selecting a row displays a warning message, preventing accidental or context-free rate submissions.

**Numeric Rate Entry**
The rate spinbutton accepts numeric input up to 10 characters. The value is bound directly to the selected row's rate field, and clicking **Save** persists the change to the backend. A success notification confirms the update, and the grid cell refreshes to show the new value.

**Role-Based Access Restriction**
Read-only users see the grid but the rate input and save button are both disabled. An access restriction message is displayed to communicate the limitation clearly — replacing a previous silent failure where the save button appeared active but had no effect.

**V2 Theme Styling**
The entire page adopts the SLS v2 design system — consistent with all other modules — including AG-Grid root wrapper classes, disabled-state styling, and button hierarchy.

---

## Summary Table

| # | Module | Key Revamp Highlights |
|---|--------|-----------------------|
| 1 | Login & Authentication | Redesigned form, password toggle, Remember Me, Firebase error handling |
| 2 | Contract Summary Dashboard | AG-Grid, multi-field filters, effective date nav, details toggle, depository switch |
| 3 | Contract Details | Master-detail grid, Trade panel, ReRate/Recall/Return dialogs, inline editing, live quote |
| 4 | FPL Accounts | Interactive AG-Grid, floating filters, clickable cells, responsive sidebar |
| 5 | Security Master | Search & edit, Add New modal with validation, Update Contracts cascade toggle |
| 6 | Admin — Users / Counterparties / Entities | Unified modal pattern, validated forms, auto-refresh grid, smart defaults |
| 7 | Memo Segmentation | Batch text input, dual-grid results, UN-SEG operation, batch validation |
| 8 | Short Interest Rate Adjustment | Rate grid, row-gated input, role-based access restriction, V2 theme |

---

*Document prepared from SLS v2 platform analysis — Velocity Clearing LLC StockLoans QA Automation Team.*
