package org.epam.stepDefinition;

import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import lombok.extern.log4j.Log4j2;
import org.epam.hooks.WebDriverHook;
import org.epam.page.WorkoutPage;
import org.openqa.selenium.WebDriver;
import static org.testng.AssertJUnit.assertTrue;

@Log4j2
public class WorkoutStep {
    private WebDriver driver = WebDriverHook.getDriver();
    private WorkoutPage workoutPage;


    @When("I click on Workouts button on NavBar")
    public void iClickOnWorkoutsButtonOnNavBar() {
        workoutPage = new WorkoutPage(driver);
        workoutPage.clickWorkoutButton();
    }

    @Then("I should see the My Workout Page")
    public void iShouldSeeTheMyWorkoutPage() {
        workoutPage = new WorkoutPage(driver);
        String actualStatus = workoutPage.getWorkoutPageTitle();
        boolean isWorkoutPageDisplayed = "My Workouts".equals(actualStatus);
        log.info("WorkoutPage displayed: {}", isWorkoutPageDisplayed);
        assertTrue(isWorkoutPageDisplayed);

    }

    @When("I click on Cancel Workout button on a specific workout card")
    public void iClickOnCancelWorkoutButtonOnASpecificWorkoutCard() {
        workoutPage = new WorkoutPage(driver);
        workoutPage.clickCancelWorkoutButton();
    }

    @And("I click on the Cancel Workout PopUp button")
    public void iClickOnTheCancelWorkoutPopUpButton() {
        workoutPage.clickCancelWorkoutPopUpButton();
    }

    @Then("the workout status should become cancelled")
    public void theWorkoutStatusShouldBecomeCancelled() {
        String actualStatus = workoutPage.checkCancelWorkoutStatus();
        boolean isWorkoutStatusDisplayed = "Canceled".equals(actualStatus);
        log.info("Cancelled workout status displayed: {}", isWorkoutStatusDisplayed);
        assertTrue(isWorkoutStatusDisplayed);
    }

    @And("I click on the Resume Workout PopUp button")
    public void iClickOnTheResumeWorkoutPopUpButton() {
        workoutPage.clickResumeWorkoutPopUpButton();
    }

    @Then("the workout status should be the existing workout status")
    public void theWorkoutStatusShouldBeTheExistingWorkoutStatus() {
        String actualStatus = workoutPage.checkResumeWorkoutStatus();
        boolean isWorkoutStatusDisplayed = "Scheduled".equals(actualStatus);
        log.info("Cancelled workout status displayed: {}", isWorkoutStatusDisplayed);
        assertTrue(isWorkoutStatusDisplayed);
    }

    @When("I click on Leave Feedback button on a specific workout card")
    public void iClickOnLeaveFeedbackButtonOnASpecificWorkoutCard() {
        workoutPage = new WorkoutPage(driver);
        workoutPage.clickLeaveFeedbackButton();
    }

    @And("I give the desired rating and feedback {string}")
    public void iGiveTheDesiredRatingAndFeedback(String feedback) {
        workoutPage.setRatingButton();
        workoutPage.setFeedbackTextArea(feedback);
    }

    @And("I click on the Submit Feedback button")
    public void iClickOnTheSubmitFeedbackButton() {
        workoutPage.clickSubmitFeedbackPopUpButton();
    }

    @Then("the feedback should be submitted successfully")
    public void theFeedbackShouldBeSubmittedSuccessfully() {
        String actualStatus = workoutPage.checkFeedbackStatus();
        boolean isWorkoutStatusDisplayed = "Finished".equals(actualStatus);
        log.info("Cancelled workout status displayed: {}", isWorkoutStatusDisplayed);
        assertTrue(isWorkoutStatusDisplayed);
    }


    @And("I click on the Submit Feedback button without giving any rating and feedback")
    public void iClickOnTheSubmitFeedbackButtonWithoutGivingAnyRatingAndFeedback() {
        workoutPage.clickSubmitFeedbackPopUpButton();
    }
}
