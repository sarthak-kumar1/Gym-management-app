Feature: Website WorkoutPage Tests

  Background: I logged in as a client/coach
    Given user is on the Home page
    When I click on the login button
    Then I should see login Page

    Scenario: Validate whether client can cancel a workout
      When I enter email "laila_99.alpha@gmail.com" and password "zxczsczsxc12#A"
      And click Log In button in the Login Page
      When I click on Workouts button on NavBar
      Then I should see the My Workout Page
      When I click on Cancel Workout button on a specific workout card
      And I click on the Cancel Workout PopUp button
      Then the workout status should become cancelled

  Scenario: Validate whether coach can cancel a workout
    When I enter email "safalmehrotra1612@gmail.com" and password "zxczsczsxc12#A"
    And click Log In button in the Login Page
    Then I should see the My Workout Page
    When I click on Cancel Workout button on a specific workout card
    And I click on the Cancel Workout PopUp button
    Then the workout status should become cancelled

    Scenario: Validate whether client can resume a workout
      When I enter email "laila_99.alpha@gmail.com" and password "zxczsczsxc12#A"
      And click Log In button in the Login Page
      When I click on Workouts button on NavBar
      Then I should see the My Workout Page
      When I click on Cancel Workout button on a specific workout card
      And I click on the Resume Workout PopUp button
      Then the workout status should be the existing workout status


  Scenario: Validate whether client can give valid feedback to a workout
    When I enter email "laila_99.alpha@gmail.com" and password "zxczsczsxc12#A"
    And click Log In button in the Login Page
    When I click on Workouts button on NavBar
    Then I should see the My Workout Page
    When I click on Leave Feedback button on a specific workout card
    And I give the desired rating and feedback "Great workout!"
    And I click on the Submit Feedback button
    Then the feedback should be submitted successfully

  Scenario: Validate whether client can give invalid feedback to a workout
    When I enter email "laila_99.alpha@gmail.com" and password "zxczsczsxc12#A"
    And click Log In button in the Login Page
    When I click on Workouts button on NavBar
    Then I should see the My Workout Page
    When I click on Leave Feedback button on a specific workout card
    And I click on the Submit Feedback button without giving any rating and feedback
    Then the feedback should not be submitted


  Scenario: Validate whether coach can give valid feedback to a workout
    When I enter email "safalmehrotra1612@gmail.com" and password "zxczsczsxc12#A"
    And click Log In button in the Login Page
    Then I should see the My Workout Page
    When I click on Leave Feedback button on a specific workout card
    And I give the desired rating and feedback "Great workout!"
    And I click on the Submit Feedback button
    Then the feedback should be submitted successfully