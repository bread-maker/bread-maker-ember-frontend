@application
Feature: Authentication

  Scenario: when Not authenticated, should be redirected to login from settings

    Given user is Not logged in
    When user visits the Settings page
    Then current page should be Login



  Scenario: when authenticated, user should be able to visit settings

    Given user is logged in
    When user visits the Settings page
    Then current page should be Settings



  Scenario: when Not authenticated, user should be able to visit login

    Given user is logged in
    When user visits the Login page
    Then current page should be Index



  Scenario: when authenticated, user should Not be able to visit login

    Given user is Not logged in
    When user visits the Login page
    Then current page should be Login



  Scenario: user should be able to log in with valid password

    Given user is Not logged in
    And password is `breadtime`

    When user visits the Login page
    And user types `breadtime` into the password field
    And user submits the login form
    # And debugger
    # And pause

    Then current page should be Index
    And user should be authenticated With A Token



  Scenario: user should see error when authenticating with an invalid password

    Given user is Not logged in
    And password is `breadtime`

    When user visits the Login page
    And user types `invalid_password` into the password field
    And user submits the login from
    Then current page should be Login
    And the `Invalid password` error should be displayed



  Scenario: user should be logged out on expired token
    Given user is logged in With An Expired Token
    When user visits the Settings page
    And user should Not be authenticated
