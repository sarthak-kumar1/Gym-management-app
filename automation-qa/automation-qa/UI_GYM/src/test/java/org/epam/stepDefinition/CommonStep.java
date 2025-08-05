package org.epam.stepDefinition;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import lombok.extern.log4j.Log4j2;
import org.epam.hooks.WebDriverHook;
import org.epam.page.HomePage;
import org.epam.page.LoginPage;
import org.epam.utils.ConfigReader;
import org.openqa.selenium.WebDriver;
import static org.testng.AssertJUnit.assertTrue;


@Log4j2
public class CommonStep {
    private WebDriver driver = WebDriverHook.getDriver();
    private LoginPage loginPage;
    private final ConfigReader configReader = ConfigReader.getInstance();
    private final String BASE_URL = configReader.getProperty("GYM_HOMEPAGE_URL");
    private HomePage homePage;


    @Given("user is on the Home page")
    public void userIsOnTheHomePage() {
        driver.get(BASE_URL);
        driver.manage().window().maximize();
    }

    @When("I click on the login button")
    public void iClickOnTheLoginButton() {
        homePage = new HomePage(driver);
        homePage.clickLoginPageButton();
    }

    @Then("I should see login Page")
    public void iShouldSeeLoginPage() {
        loginPage = new LoginPage(driver);
        String dashboardLabel = loginPage.getTitle();
        boolean isDashboardDisplayed = "WELCOME BACK".equals(dashboardLabel);
        log.info("LoginPage displayed: {}", isDashboardDisplayed);
        assertTrue(isDashboardDisplayed );
    }

    @Then("I should see the Coaches Page")
    public void iShouldSeeTheCoachesPage() {
        System.out.println("Coaches Page is displayed");
    }

    @When("I click on the user profile button")
    public void iClickOnTheUserProfileButton() {
        homePage = new HomePage(driver);
        homePage.clickUserProfileButton();
    }

    @And("click Log In button in the Login Page")
    public void clickLogInButtonInTheLoginPage() {
        loginPage = new LoginPage(driver);
        loginPage.clickLoginButton();
    }


    @When("I click on the coaches button")
    public void iClickOnTheCoachesButton() {
        homePage = new HomePage(driver);
        homePage.clickCoachPageButton();
    }

    @When("I click on the link CREATE NEW ACCOUNT")
    public void iClickOnTheLinkCREATENEWACCOUNT() {
        loginPage = new LoginPage(driver);
        loginPage.setCreateAccountLink();
    }

    @When("I enter email {string} and password {string}")
    public void iEnterEmailAndPassword(String email, String password) {
        loginPage.inputEmail(email);
        loginPage.inputPassword(password);
    }
}
