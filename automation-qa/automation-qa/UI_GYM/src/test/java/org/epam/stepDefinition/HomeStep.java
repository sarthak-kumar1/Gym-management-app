package org.epam.stepDefinition;

import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import lombok.extern.log4j.Log4j2;
import org.epam.hooks.WebDriverHook;
import org.epam.page.HomePage;
import org.epam.page.LoginPage;
import org.epam.page.MyAccountPage;
import org.epam.page.RegisterPage;
import org.openqa.selenium.WebDriver;
import static org.testng.AssertJUnit.assertTrue;

@Log4j2
public class HomeStep {
    private WebDriver driver = WebDriverHook.getDriver();
    private HomePage homePage;
    private MyAccountPage myAccountPage;

    @When("I select the desired {string},{string},{string} and {string}")
    public void iSelectTheDesiredAnd(String TypeOfSport, String Date, String Time, String Coach) {
        homePage = new HomePage(driver);
        homePage.selectTypeOfSport(TypeOfSport);
        homePage.selectDate(Date);
        homePage.selectTime(Time);
        homePage.selectCoach(Coach);
    }

    @And("I click on the Find a Workout button")
    public void iClickOnTheFindAWorkoutButton() {
        homePage.clickFIndWorkoutButton();
    }

    @Then("I should see the available Coaches cards")
    public void iShouldSeeTheAvailableCoachesCards() {
        System.out.println("Available Coaches cards are displayed");
    }

    @When("I select the desired options {string},{string},{string} and invalid time {string}")
    public void iSelectTheDesiredOptionsAndInvalidTime(String TypeOfSport, String Date, String Coach, String Time) {
        homePage = new HomePage(driver);
        homePage.selectTypeOfSport(TypeOfSport);
        homePage.selectDate(Date);
        homePage.selectCoach(Coach);
        homePage.selectTime(Time);
    }

    @Then("I should see the invalid time error message {string}")
    public void iShouldSeeTheInvalidTimeErrorMessage(String timeErrorMessage) {
        String actualErrorMessage = homePage.getInvalidTimeMessage();
        boolean isErrorMessageDisplayed = actualErrorMessage.equals(timeErrorMessage);
        log.info("Error Message displayed: {}", isErrorMessageDisplayed);
        assertTrue(isErrorMessageDisplayed);
    }

    @And("I click on the My Account button")
    public void iClickOnTheMyAccountButton() {
        homePage = new HomePage(driver);
        homePage.clickMyAccountButton();
    }

    @Then("I should see the My Account Page")
    public void iShouldSeeTheMyAccountPage() {
        myAccountPage = new MyAccountPage(driver);
        String myAccountLabel = myAccountPage.getTitle();
        boolean isAccountPageDisplayed = "My Account".equals(myAccountLabel);
        log.info("LoginPage displayed: {}", isAccountPageDisplayed);
        assertTrue(isAccountPageDisplayed );
    }
}
