package org.epam.stepDefinition;

import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import lombok.extern.log4j.Log4j2;
import org.epam.hooks.WebDriverHook;
import org.epam.page.CoachesPage;
import org.epam.page.LoginPage;
import org.openqa.selenium.WebDriver;

import static org.testng.AssertJUnit.assertTrue;

@Log4j2
public class CoachesStep {
    private WebDriver driver = WebDriverHook.getDriver();
    private CoachesPage coachesPage;
    private LoginPage loginPage;

    @Given("I am on the Coaches Page with url {string}")
    public void iAmOnTheCoachesPageWithUrl(String Url) {
        driver.get(Url);
        driver.manage().window().maximize();
    }

    @When("I click on Book Workout button on a specific coach card")
    public void iClickOnBookWorkoutButtonOnASpecificCoachCard() {
        coachesPage = new CoachesPage(driver);
        coachesPage.clickBookWorkoutCardButton();
    }

    @And("I select the desired {string} and {string}")
    public void iSelectTheDesiredAnd(String date, String time) {
        coachesPage.selectDateAndTime(date,time);
    }

    @And("I click on the Book Workout button")
    public void iClickOnTheBookWorkoutButton() {
        coachesPage.clickBookWorkoutButton();
    }

    @And("I click on Confirm Button on the PopUp page")
    public void iClickOnConfirmButtonOnThePopUpPage() {
        coachesPage.clickConfirmButton();

    }

    @Then("the pop up should come indicating that workout is booked successfully")
    public void thePopUpShouldComeIndicatingThatWorkoutIsBookedSuccessfully() {
        String actualStatus = coachesPage.getConfirmationMessage();
        boolean isWorkoutStatusDisplayed = "The new workout has been scheduled successfully".equals(actualStatus);
        log.info("Workout booked successfully message displayed: {}", isWorkoutStatusDisplayed);
        assertTrue(isWorkoutStatusDisplayed);
    }

    @Then("I should see the Login button on a pop up page")
    public void theUserShouldSeeTheLoginButtonOnAPopUpPage() {
        String actualStatus = coachesPage.getLoginConfirmationPopUpMessage();
        boolean isLoginButtonDisplayed = "Log in to book workout".equals(actualStatus);
        log.info("Login button displayed: {}", isLoginButtonDisplayed);
        assertTrue(isLoginButtonDisplayed);
    }

    @And("I click on the Login button on the pop up page")
    public void theUserClickOnTheLoginButtonOnTheNavigationBar() {
            coachesPage.clickLoginButton();
    }

}
