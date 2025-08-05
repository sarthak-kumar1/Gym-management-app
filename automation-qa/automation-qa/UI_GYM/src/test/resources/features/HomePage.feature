Feature: Website Login Tests

  Background: I registered a new user
    Given user is on the Home page
    When I click on the login button
    Then I should see login Page
    When I enter email "laila_99.alpha@gmail.com" and password "zxczsczsxc12#A"
    And click Log In button in the Login Page


  Scenario Outline: Verify whether a client can find a workout
    When I select the desired "<Type of Sport>","<Date>","<Time>" and "<Coach>"
    And I click on the Find a Workout button
    Then I should see the available Coaches cards

    Examples:
      | Type of Sport | Date | Time         | Coach        |
      | All           | 28   | 08:00 AM     | John Doe     |
      | All           | 28  |  All          | All          |
      | Yoga Expert   | 28   | 10:00 AM     | John Doe     |

  Scenario Outline: Verify the error message when time is invalid
    When I select the desired options "<Type of Sport>","<Date>","<Coach>" and invalid time "<Time>"
    And I click on the Find a Workout button
    Then I should see the invalid time error message "<error_message>"

    Examples:
      | Type of Sport | Date | Coach    | Time       |  error_message              |
      | All           | 28   | John Doe | 08:00 AM  | Please choose a valid time.  |
      | All           | 28   | All      | 10:00 AM  | Please choose a valid time.  |
      | Yoga Expert   | 28   |John Doe  |  10:00 AM   |  Please choose a valid time. |


#  Scenario: Validate whether a user can book a workout session
#      When I select the desired "<Type of Sport>","<Date>","<Time>" and "<Coach>"
#      And I click on the Find a Workout button
#      Then I should see the available Coaches cards
#      When I click on Book Workout button on a specific coach card
#      And I click on confirm button on the pop up page
#      Then I should see the workout booked successfully message

  Scenario: Verify whether the coaches button is working
    When I click on the coaches button
    Then I should see the Coaches Page


  Scenario: Verify whether the user can see his/her account profile
    When I click on the user profile button
    And I click on the My Account button
    Then I should see the My Account Page


#  Scenario: Validate whether a user can't book a workout session if he/she is not logged in
#    When I select the desired "<Type of Sport>","<Date>","<Time>" and "<Coach>"
#    And I click on the Find a Workout button
#    Then I should see the available Coaches cards
#    When I click on Book Workout button on a specific coach card
#    And I click on confirm button on the pop up page
#    Then I should see the error pop-up message


