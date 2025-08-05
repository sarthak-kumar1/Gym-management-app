Feature: Website WorkoutPage Tests

  Background: Open the browser
    Given user is on the Home page


  Scenario: Verify the visibility, click ability and functionality of Login button on the Coach Profile Page when user is not logged in
    When I click on the coaches button
    Then I should see the Coaches Page
    When I click on Book Workout button on a specific coach card
    Then I should see the Login button on a pop up page
    And I click on the Login button on the pop up page
    Then I should see login Page

  Scenario Outline: Validate whether user can book a workout from the coaches page
    When I click on the login button
    Then I should see login Page
    When I enter email "laila_99.alpha@gmail.com" and password "zxczsczsxc12#A"
    And  click Log In button in the Login Page
    When I click on the coaches button
    Then I should see the Coaches Page
    When I click on Book Workout button on a specific coach card
    And I select the desired "<date>" and "<time>"
    And I click on the Book Workout button
    And I click on Confirm Button on the PopUp page
    Then the pop up should come indicating that workout is booked successfully
    Then I should see the last booked session details oin Upcoming Workout section

    Examples:
      | date | time                |
      | 28   | 10:00 AM - 11:00 AM |
      | 28   | 10:00 AM - 11:00 AM |
      | 28   |  3:00 PM  - 4:00 PM   |