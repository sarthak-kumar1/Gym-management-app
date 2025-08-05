Feature: Website Login Tests

  Background: I registered a new user/ coach / admin
    Given user is on the Home page
    When I click on the login button
    Then I should see login Page

  Scenario Outline: Verify the Login Feature with Valid Credentials
    When I Enter Valid Credentials like "<email>" and "<password>"
    And  click Log In button in the Login Page
    And I click on the user profile button
    Then the user's "<designation>" and "<email>" should be displayed

    Examples:
      | email                       | password       | designation |
      | laila_99.alpha@gmail.com    | zxczsczsxc12#A | Client      |
      | safalmehrotra1612@gmail.com | zxczsczsxc12#A | Coach       |
      | gargisafal@gmail.com        | zxczsczsxc12#A | Admin       |


  Scenario Outline: Verify the Login Feature with InValid Email Address and Password
    When I Enter inValid Credentials like "<email>" and "<password>"
    And  click Log In button in the Login Page
    Then I should see the desired error message "<error_message>"

    Examples:
      | email                    | password        | error_message                                          |
      |                          | zxczsczsxc12#A  | email: Email is required                               |
      | laila_99.alphagmail.com  | zxczsczsxc12#A  | email: Enter a valid email address                              |
      | laila_99.alpha@gmailcom  |                 | password: Password is required                           |
      |                          |                 | email: Email is required; password: Password is required |


  Scenario Outline: Verify the Login Feature with InValid Password
    When I Enter inValid Credentials like "<email>" and "<password>"
    And  click Log In button in the Login Page
    Then I should see the desired error pop-up message "<error_message>"

    Examples:
      | email                    | password       | error_message       |
      | laila_99.ha@gmail.com | zxczsczsxc12#A | Invalid email or password. Please try again. |
      | laila_99.al@gmail.com | zxczsczsxc12#A | Invalid email or password. Please try again. |
      | laila.alpha@gmail.com | zxczsczsxc12#A | Invalid email or password. Please try again. |


  Scenario: Validate the link to the Registration Page
    When I click on the link CREATE NEW ACCOUNT
    Then I should see the Registration Page


