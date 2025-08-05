package org.epam.stepDefinition;

import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import lombok.extern.log4j.Log4j2;
import org.epam.hooks.WebDriverHook;
import org.epam.page.HomePage;
import org.epam.page.LoginPage;
import org.epam.page.RegisterPage;
import org.epam.utils.ConfigReader;
import org.openqa.selenium.WebDriver;
import java.util.LinkedHashMap;
import java.util.Map;
import static org.testng.AssertJUnit.assertTrue;

@Log4j2
public class RegisterStep {
    private WebDriver driver = WebDriverHook.getDriver();
    private RegisterPage registerPage;
    private LoginPage loginPage;
    private HomePage homePage;

    @When("I enter valid credentials like {string}, {string}, {string}, {string}, {string}")
    public void iEnterValidCredentialsLike(String firstName, String lastName, String email, String password, String confirmPassword) {
        registerPage = new RegisterPage(driver);
        registerPage.inputFirstName(firstName);
        registerPage.inputLastName(lastName);
        registerPage.inputEmail(email);
        registerPage.inputPassword(password);
        registerPage.inputConfirmPassword(confirmPassword);
    }

    @And("I select the desired target and preferred options")
    public void iSelectTheDesiredTargetAndPreferredOptions() {
        registerPage.selectTargetOption();
        registerPage.selectPreferredOption();
    }

    @And("I click on the Create an Account button")
    public void iClickOnTheCreateAnAccountButton() {
        registerPage.clickRegisterButton();
    }

    @Then("I should see the Login Page")
    public void iShouldSeeTheLoginPage() {
        loginPage = new LoginPage(driver);
        String dashboardLabel = loginPage.getTitle();
        boolean isDashboardDisplayed = "WELCOME BACK".equals(dashboardLabel);
        log.info("LoginPage displayed: {}", isDashboardDisplayed);
        assertTrue(isDashboardDisplayed );
    }


    @When("I enter invalid credentials of {string}, {string}, {string}, {string}, {string}")
    public void iEnterInvalidCredentialsOf(String firstName, String lastName, String email, String password, String confirmPassword) {
        registerPage = new RegisterPage(driver);
        registerPage.inputFirstName(firstName);
        registerPage.inputLastName(lastName);
        registerPage.inputEmail(email);
        registerPage.inputPassword(password);
        registerPage.inputConfirmPassword(confirmPassword);
    }


    @Then("the following inline errors should be displayed: {string}")
    public void theFollowingInlineErrorsShouldBeDisplayed(String expectedErrors) {
        Map<String, String> expectedErrorMap = parseErrorMessages(expectedErrors);

        for (Map.Entry<String, String> entry : expectedErrorMap.entrySet()) {
            String field = entry.getKey();
            String expectedMessage = entry.getValue();

            // Verify that the actual error message below the field matches the expected message
            String actualMessage = registerPage.getInlineErrorMessage(field);
            boolean errorMessageDisplayed = expectedMessage.equals(actualMessage);
            log.info("Error Message displayed: {}", errorMessageDisplayed);
            assertTrue(errorMessageDisplayed);
        }
    }

    private Map<String, String> parseErrorMessages(String errorMessagesString) {
        Map<String, String> errorMap = new LinkedHashMap<>();

        // Assume errors are in "Field: Message" format and separated by commas
        String[] errors = errorMessagesString.split(";");
        for (String error : errors) {
            if (error.contains(":")) { // Ensure the error contains a colon
                String[] parts = error.split(":", 2); // Split into two parts only
                String field = parts[0].trim(); // Extract field name
                String message = parts[1].trim(); // Extract error message
                errorMap.put(field, message);
            } else {
                log.warn("Skipping malformed error message: {}", error);
            }
        }
        return errorMap;
    }

    @When("I click on the link LOGIN HERE")
    public void iClickOnTheLinkLOGINHERE() {
        registerPage = new RegisterPage(driver);
        registerPage.clickExistingAccountLink();
    }

    @When("I enter valid credentials like {string}, {string}, {string}, {string} and already registered email {string}")
    public void iEnterValidCredentialsLikeAndAlreadyRegisteredEmail(String firstName, String lastName, String password, String confirmPassword, String email) {
        registerPage = new RegisterPage(driver);
        registerPage.inputFirstName(firstName);
        registerPage.inputLastName(lastName);
        registerPage.inputEmail(email);
        registerPage.inputPassword(password);
        registerPage.inputConfirmPassword(confirmPassword);
    }

    @Then("I should see the error message {string}")
    public void iShouldSeeTheErrorMessage(String errorMeesage) {
        String actualErrorMessage = registerPage.getPopUpErrorMessage();
        boolean isErrorMessageDisplayed = actualErrorMessage.equals(errorMeesage);
        log.info("Error Message displayed: {}", isErrorMessageDisplayed);
        assertTrue(isErrorMessageDisplayed);
    }
}