Feature: Homogenize Frontend Components and Styles (SLL-211)
  As an authorized user of SLS V2
  I want all screens to follow a consistent visual style, structure, and interaction pattern
  So that the application provides a uniform user experience and is easier to maintain

  # ── Layout & Spacing ─────────────────────────────────

  # Precondition: User is authenticated; multiple migrated screens are accessible
  @smokeBDD @Smoke @Regression @SLL-211
  Scenario: All migrated screens use consistent page-level layout and spacing
    Given the user is logged in to the application
    When the user navigates through multiple migrated screens
    Then each screen should use the same page-level layout margins and spacing

  # Precondition: User is authenticated; Contracts Summary, Security Master, and FPL Account pages are accessible
  @smokeBDD @Regression @SLL-211
  Scenario: Toolbar areas are consistently positioned and sized across all screens
    Given the user is logged in to the application
    When the user views the toolbar on the Contracts Summary page
    And the user views the toolbar on the Security Master page
    And the user views the toolbar on the FPL Account page
    Then all toolbars should be consistently positioned and sized

  # Precondition: User is authenticated; screens with filter panels are accessible
  @smokeBDD @Regression @SLL-211
  Scenario: Filter panel areas are consistently positioned across screens that include filters
    Given the user is logged in to the application
    When the user navigates to screens that include filter panels
    Then filter panels should appear in a consistent position with consistent spacing

  # ── Typography ───────────────────────────────────────

  # Precondition: User is authenticated; multiple screens are accessible
  @smokeBDD @Smoke @Regression @SLL-211
  Scenario: Headings and labels use consistent font size and weight across all screens
    Given the user is logged in to the application
    When the user navigates through multiple screens
    Then headings and field labels should use the same font size and weight throughout the application

  # Precondition: User is authenticated; multiple screens with Ag-Grid are accessible
  @smokeBDD @Regression @SLL-211
  Scenario: Grid column headers use consistent typography across all Ag-Grid instances
    Given the user is logged in to the application
    When the user views Ag-Grid components on different screens
    Then all grid column headers should use the same font style and size

  # Precondition: User is authenticated; multiple screens with data values are accessible
  @smokeBDD @Regression @SLL-211
  Scenario: Body text and data values use consistent font styling across all screens
    Given the user is logged in to the application
    When the user views data values in grids and detail panels across multiple screens
    Then all body text should use consistent font family, size, and color

  # ── Colors & Theme ───────────────────────────────────

  # Precondition: User is authenticated; theme switcher is available
  @smokeBDD @Smoke @Regression @SLL-211
  Scenario: All screens respect the active theme and apply theme-aware colors consistently
    Given the user is logged in to the application
    When the user switches between light and dark themes
    Then all screens and components should update to reflect the active theme colors consistently

  # Precondition: User is authenticated; multiple screens with primary action buttons are accessible
  @smokeBDD @Regression @SLL-211
  Scenario: Primary action buttons use a consistent color and hover state across all screens
    Given the user is logged in to the application
    When the user views primary action buttons on multiple screens
    Then all primary action buttons should share the same color, style, and hover behavior

  # Precondition: User is authenticated; screens with destructive actions are accessible
  @smokeBDD @Regression @SLL-211
  Scenario: Danger or destructive action buttons use a consistent color across all screens
    Given the user is logged in to the application
    When the user views destructive action buttons such as Delete or Deny on multiple screens
    Then all destructive action buttons should use a consistent color and style

  # ── Form Controls ────────────────────────────────────

  # Precondition: User is authenticated; Security Master and Contract Management pages are accessible
  @smokeBDD @Smoke @Regression @SLL-211
  Scenario: Text input fields use consistent height, border, and focus styling across all screens
    Given the user is logged in to the application
    When the user views text input fields on multiple screens including Security Master and Contract Management
    Then all text input fields should have the same height, border radius, and focus ring style

  # Precondition: User is authenticated; Report page and LCOR page are accessible
  @smokeBDD @Smoke @Regression @SLL-211
  Scenario: Dropdown selectors use consistent styling across all screens
    Given the user is logged in to the application
    When the user views dropdown components on the Report page, LCOR page, and other screens
    Then all dropdowns should share a consistent appearance and interaction behavior

  # Precondition: User is authenticated; Report page and Contract Review page are accessible
  @smokeBDD @Smoke @Regression @SLL-211
  Scenario: Date picker components use consistent styling across all screens
    Given the user is logged in to the application
    When the user views date picker controls on the Report page and Contract Review page
    Then all date pickers should have a consistent appearance and interaction pattern

  # Precondition: User is authenticated; Security Master and other screens with toggles are accessible
  @smokeBDD @Regression @SLL-211
  Scenario: Toggle switches use consistent styling and behavior across all screens
    Given the user is logged in to the application
    When the user views toggle switches on the Security Master and other screens
    Then all toggle switches should share a consistent visual style and interaction pattern

  # Precondition: User is authenticated; multiple screens with checkboxes are accessible
  @smokeBDD @Regression @SLL-211
  Scenario: Checkbox controls use consistent styling across all screens
    Given the user is logged in to the application
    When the user views checkboxes on multiple screens
    Then all checkboxes should use a consistent size, color, and checked state appearance

  # ── Buttons ──────────────────────────────────────────

  # Precondition: User is authenticated; Add New Security, Add New User, and Add New Entity modals are accessible
  @smokeBDD @Smoke @Regression @SLL-211
  Scenario: Save buttons across all modals and forms use a consistent style
    Given the user is logged in to the application
    When the user opens modals on the Add New Security, Add New User, and Add New Entity screens
    Then all Save buttons should have a consistent style, size, and positioning

  # Precondition: User is authenticated; multiple modals are accessible
  @smokeBDD @Smoke @Regression @SLL-211
  Scenario: Cancel or Close buttons across all modals use a consistent style
    Given the user is logged in to the application
    When the user opens modals on multiple screens
    Then all Cancel or Close buttons should have a consistent style, size, and positioning

  # Precondition: User is authenticated; screens with disabled buttons are accessible
  @smokeBDD @Regression @SLL-211
  Scenario: Disabled buttons display with a consistent disabled appearance across all screens
    Given the user is logged in to the application
    When the user views disabled buttons such as a Save button with an empty form across multiple screens
    Then all disabled buttons should use the same muted color and cursor style

  # ── Ag-Grid Consistency ───────────────────────────────

  # Precondition: User is authenticated; Contracts Summary, Security Master, FPL Account, and DTC Summary pages are accessible
  @smokeBDD @Smoke @Regression @SLL-211
  Scenario: All Ag-Grid instances use the same theme and row height across the application
    Given the user is logged in to the application
    When the user views Ag-Grid components on Contracts Summary, Security Master, FPL Account, and DTC Summary pages
    Then all grids should use the same Ag-Grid theme and row height

  # Precondition: User is authenticated; multiple screens with Ag-Grid are accessible
  @smokeBDD @Regression @SLL-211
  Scenario: Row hover and row selection styling is consistent across all Ag-Grid instances
    Given the user is logged in to the application
    When the user hovers over and selects rows in Ag-Grids on different screens
    Then the hover highlight and selection highlight should look the same across all grids

  # Precondition: User is authenticated; multiple screens with sortable Ag-Grid are accessible
  @smokeBDD @Regression @SLL-211
  Scenario: Column header appearance and sort indicator styling is consistent across all grids
    Given the user is logged in to the application
    When the user sorts columns in Ag-Grids on different screens
    Then the sort indicator and column header style should be consistent across all grids

  # ── Dialogs & Modals ─────────────────────────────────

  # Precondition: User is authenticated; Add New Security, Add New User, and Add New Counterparty screens are accessible
  @smokeBDD @Smoke @Regression @SLL-211
  Scenario: All modal dialogs use a consistent width, padding, and header style
    Given the user is logged in to the application
    When the user opens modals on the Add New Security, Add New User, and Add New Counterparty screens
    Then all modals should have a consistent width, internal padding, and header appearance

  # Precondition: User is authenticated; multiple modal dialogs are accessible
  @smokeBDD @Regression @SLL-211
  Scenario: Modal overlay backdrop is consistent across all dialogs
    Given the user is logged in to the application
    When the user opens any modal dialog in the application
    Then the backdrop overlay should use the same opacity and color across all modals

  # ── Loading State ────────────────────────────────────

  # Precondition: User is authenticated; Report page and grid-based screens are accessible
  @smokeBDD @Smoke @Regression @SLL-211
  Scenario: Loading indicators are displayed consistently while data is being fetched
    Given the user is logged in to the application
    When the user triggers a data load on multiple screens such as Report generation and grid refresh
    Then the loading indicator should look and behave the same across all screens

  # Precondition: User is authenticated; multiple screens with Ag-Grid are accessible
  @smokeBDD @Regression @SLL-211
  Scenario: Grid loading overlay uses consistent styling across all Ag-Grid instances
    Given the user is logged in to the application
    When data is loading in Ag-Grid components on different screens
    Then the grid loading overlay should use the same style and spinner across all grids

  # ── Validation Error Display ─────────────────────────

  # Precondition: User is authenticated; Add New Security modal and Report page are accessible
  @smokeBDD @Smoke @Regression @SLL-211
  Scenario: Inline validation error messages use consistent color, icon, and positioning across all forms
    Given the user is logged in to the application
    When the user triggers validation errors on the Add New Security modal and the Report page
    Then validation error messages should use the same color, icon, and position beneath the field

  # Precondition: User is authenticated; multiple screens with required form fields are accessible
  @smokeBDD @Regression @SLL-211
  Scenario: Required field indicators are displayed consistently across all forms
    Given the user is logged in to the application
    When the user views forms with required fields across multiple screens
    Then required field indicators should use a consistent visual marker across all forms

  # ── Empty State Display ──────────────────────────────

  # Precondition: User is authenticated; DTC Transactions and Report pages are accessible
  @smokeBDD @Smoke @Regression @SLL-211
  Scenario: Empty state messages in Ag-Grid instances use consistent styling across all screens
    Given the user is logged in to the application
    When no data is returned in Ag-Grids on the DTC Transactions page and Report page
    Then the empty state message should use the same style, icon, and wording pattern across all grids

  # Precondition: User is authenticated; Security Master and DTC Summary pages are accessible
  @smokeBDD @Regression @SLL-211
  Scenario: Empty state for search results uses consistent styling across all search-driven screens
    Given the user is logged in to the application
    When a search returns no results on the Security Master and DTC Summary pages
    Then the empty result state should use a consistent appearance across both screens

  # ── Disabled Action States ───────────────────────────

  # Precondition: User is authenticated; multiple screens with disabled controls are accessible
  @smokeBDD @Smoke @Regression @SLL-211
  Scenario: Disabled action controls use consistent opacity and cursor styling across all screens
    Given the user is logged in to the application
    When the user views disabled controls such as buttons, inputs, and toggles across multiple screens
    Then all disabled controls should share the same opacity level and not-allowed cursor style

  # Precondition: User is authenticated; DTC Transactions page and editable grid screens are accessible
  @smokeBDD @Regression @SLL-211
  Scenario: Read-only grid cells are visually distinguishable from editable cells consistently
    Given the user is logged in to the application
    When the user views read-only grids on the DTC Transactions page alongside editable grids
    Then read-only cells should have a consistent visual treatment distinct from editable cells

  # ── Cross-Screen Regression ───────────────────────────

  # Precondition: User is authenticated; all migrated screens are accessible after styling changes
  @smokeBDD @Smoke @Regression @SLL-211
  Scenario: Business behavior is preserved on all screens after styling homogenization
    Given the user is logged in to the application
    When the user performs key actions on each migrated screen after style changes
    Then all existing business behaviors should continue to function correctly

  # Precondition: User is authenticated; all migrated screens are accessible
  @smokeBDD @Regression @SLL-211
  Scenario: No visual regressions are introduced on previously passing screens after homogenization
    Given the user is logged in to the application
    When the user navigates through all migrated screens
    Then no new layout breaks, overlapping elements, or styling anomalies should be present

  # ── End-to-End ───────────────────────────────────────

  # Precondition: Fresh session; valid credentials; Security Master, Report, DTC Summary, Contract Management accessible
  @smokeBDD @Smoke @Regression @SLL-211
  Scenario: Full visual consistency check across key screens — Security Master, Report, DTC Summary, Contract Management
    Given the user navigates to the application
    When the user logs in with valid credentials
    Then the user should be redirected to the dashboard
    When the user navigates to the Security Master page
    Then the layout, form controls, and grid should use consistent SLS V2 styling
    When the user navigates to the Report page
    Then the date pickers, dropdown, and grid should use consistent SLS V2 styling
    When the user navigates to the DTC Summary page
    Then the filter inputs and grid should use consistent SLS V2 styling
    When the user navigates to the Contract Management page
    Then the toolbar, view toggles, and grid should use consistent SLS V2 styling
    And all screens should share the same component appearance and interaction patterns
