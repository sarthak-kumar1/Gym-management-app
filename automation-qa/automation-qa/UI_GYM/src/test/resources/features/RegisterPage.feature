Feature: Website Registration Tests

  Background: Open the browser
    Given user is on the Home page
    When I click on the login button
    Then I should see login Page
    When I click on the link CREATE NEW ACCOUNT
    Then I should see the Registration Page

  Scenario Outline: Create an account with valid credentials
    When I enter valid credentials like "<firstName>", "<lastName>", "<email>", "<password>", "<confirmPassword>"
    And I select the desired target and preferred options
    And I click on the Create an Account button
    Then I should see the Login Page

    Examples:
      | firstName   | lastName   |      email               | password       | confirmPassword  |
      | Johnsa      | Doea       |   jeniffer@gmail.com     | Password123#   | Password123#     |
      | Johasds      | asdff     |   fasnau@gmail.com       | Password123#   | Password123#     |

  Scenario Outline: Validate inline error messages for registration form fields
        When I enter invalid credentials of "<FirstName>", "<LastName>", "<Email>", "<Password>", "<confirmPassword>"
        And I select the desired target and preferred options
        And I click on the Create an Account button
        Then the following inline errors should be displayed: "<Error_message>"

        Examples:
          | FirstName | LastName      | Email                 | Password      | confirmPassword|  Error_message                                                                                    |
          | John      | Doe12         | jane@domain.com       | Password123#  | Password123#   |  lastName: Last name must contain only letters                                                    |
          |           | Doe           | john.doe@example.com  | Password123#  | Password123#   |  firstName: First name is required                                                                |
          | John      |               | john.doe@example.com  | Password123#  | Password123#   |  lastName: Last name is required                                                                  |
          | John      | Doe           | invalid_email         | Password123#  | Password123#   |  email: Enter a valid email                                                                       |
          | John      | Doe           | john.doe@example.com  | Password123   | Password123#   |  password: Password must be 8+ characters, include uppercase, number, and special character; confirmPassword: Passwords do not match      |
          |           |               | invalid_email         | Password123   | Password123#   |  firstName: First name is required; lastName: Last name is required; email: Email is required; password: Password must be 8+ characters, include uppercase, number, and special character; confirmPassword: Passwords do not match |
          | John      | Doe           | johndoe@example.com   |               | Password123#   |  password: Password is required; confirmPassword: Passwords do not match                                                                 |
          | John      | Doe           | john.doe@example.com  | Password123#  | Password123#A  |  confirmPassword: Passwords do not match                                                                                                |
          | John      | Doe           | john.doe@example.com  | Password123#  |                |  confirmPassword: Confirm Password is required                                                  |
          | John      | Doe           | john.doe@example.com  |               |                |  password: Password is required; confirmPassword: Confirm Password is required                                                   |


  Scenario: Validate the link to the Login Page
    When I click on the link LOGIN HERE
    Then I should see the Login Page


  Scenario Outline: Attempt to register with an already registered email
    When I enter valid credentials like "<firstName>", "<lastName>", "<password>", "<confirmPassword>" and already registered email "<email>"
    And I select the desired target and preferred options
    And I click on the Create an Account button
    Then I should see the error message "User with this email already exists!"

    Examples:
      | firstName   | lastName   |      email               | password       | confirmPassword  |
      | Johnsa      | Doea       |   jeniffer@gmail.com     | Password123#   | Password123#     |
      | Johnas      | Doeq       |   fasnau@gmail.com           | Password123#   | Password123#     |
