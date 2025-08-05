package org.epam.stepDefinition;

import io.cucumber.java.en.And;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import lombok.extern.log4j.Log4j2;
import org.epam.hooks.WebDriverHook;
import org.epam.page.HomePage;
import org.epam.page.LoginPage;
import org.epam.page.RegisterPage;
import org.openqa.selenium.WebDriver;
import java.util.LinkedHashMap;
import java.util.Map;
import static org.testng.AssertJUnit.assertTrue;

@Log4j2
public class LoginStep {
    private WebDriver driver = WebDriverHook.getDriver();
    private LoginPage loginPage;
    private HomePage homePage;
    private RegisterPage registerPage;


    @When("I Enter Valid Credentials like {string} and {string}")
    public void iEnterValidCredentialsLikeAnd(String email, String password) {
        loginPage = new LoginPage(driver);
        loginPage.inputEmail(email);
        loginPage.inputPassword(password);

    }

    @Then("I should see the Home Page")
    public void iShouldSeeTheHomePage() {
        homePage = new HomePage(driver);
        String homePageMessage = homePage.getMessage();
        System.out.println(homePageMessage);
        boolean isHomePageDisplayed = "Hello, Tanya Mehrotra".equals(homePageMessage);
        log.info("HomePage displayed: {}", isHomePageDisplayed);
        assertTrue(isHomePageDisplayed);
    }

    @When("I Enter inValid Credentials like {string} and {string}")
    public void iEnterInValidCredentialsLikeAnd(String email, String password) {
        loginPage = new LoginPage(driver);
        loginPage.inputEmail(email);
        loginPage.inputPassword(password);
    }

    @Then("I should see the desired error message {string}")
    public void iShouldSeeTheDesiredErrorMessage(String errorMessage) {
        Map<String, String> expectedErrorMap = parseErrorMessage(errorMessage);

        for (Map.Entry<String, String> entry : expectedErrorMap.entrySet()) {
            String field = entry.getKey();
            String expectedMessage = entry.getValue();

            String actualErrorMessage = loginPage.getInlineErrorMessage(field);
            System.out.println(actualErrorMessage);
            boolean isErrorMessageDisplayed = actualErrorMessage.equals(expectedMessage);
            log.info("Error message displayed: {}", isErrorMessageDisplayed);
            assertTrue(isErrorMessageDisplayed);
        }
    }

    private Map<String, String> parseErrorMessage(String errorMessagesString){
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
    @Then("I should see the desired error pop-up message {string}")
    public void iShouldSeeTheDesiredErrorPopUpMessage(String popUpMessage) {
        String actualPopUpMessage = loginPage.getPopUpErrorMessage();
        System.out.println(actualPopUpMessage);
        boolean isPopUpMessageDisplayed = actualPopUpMessage.contains(popUpMessage);
        log.info("Pop-up message displayed: {}", isPopUpMessageDisplayed);
        assertTrue(isPopUpMessageDisplayed);
    }

    @Then("I should see the Registration Page")
    public void iShouldSeeTheRegistrationPage() {
        registerPage = new RegisterPage(driver);
        String displayRegisterMessage = registerPage.getTitle();
        boolean isRegisterPageDisplayed = "LET'S GET YOU STARTED!".equals(displayRegisterMessage);
        log.info("RegisterPage displayed: {}", isRegisterPageDisplayed);
        assertTrue(isRegisterPageDisplayed);
    }

    @Then("the user's {string} and {string} should be displayed")
    public void theUserSAndShouldBeDisplayed(String designation, String email) {
        String expectedEmail = loginPage.getEmailAddress();
        String expectedDesignation = loginPage.getDesignation();
        boolean isDesignationMatches = expectedDesignation.contains(designation);
        boolean isEmailMatches = email.equals(expectedEmail);
        log.info("Email matches: {}", isEmailMatches);
        log.info("Designation matches: {}", isDesignationMatches);
        assertTrue(isEmailMatches);
        assertTrue(isDesignationMatches);
    }

}
