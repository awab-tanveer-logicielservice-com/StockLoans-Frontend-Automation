@smokeBDD @Smoke @Regression @SLL-169
Feature: Login Functionality - Firebase Authentication
  As a user of the SLS v2 application
  I want to securely log in using Firebase Authentication
  So that I can access the StockLoans platform

  @smokeBDD @Smoke @Regression @SLL-169
  Scenario: Successful login with valid credentials redirects to Contract Summary dashboard
    Given the user navigates to the application
    When the user logs in with valid credentials
    Then the user should be redirected to the dashboard
    And the Contract Summary grid should be visible
    And the grid should display summary rows grouped by symbol
    When the user enters "AAPL" in the Symbol/CUSIP filter
    Then the grid should display only rows matching the entered symbol
    Given the user selects a summary row
    And the user enables the Details toggle
    Then the lower detail panel should be visible
