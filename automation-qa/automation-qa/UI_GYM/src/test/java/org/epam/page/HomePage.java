package org.epam.page;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class HomePage extends BasePage{
    public HomePage(WebDriver driver){
        super(driver);
    }
    @FindBy(xpath = "//*[@id=\"root\"]/div[1]/div[2]")
    private WebElement welcomeMessage;

    @FindBy(xpath = "//*[@id=\"root\"]/div[2]/form/div[1]/div")
    private WebElement typeOfSportBox;

    @FindBy(xpath = "//*[@id=\"root\"]/div[2]/form/div[2]/div")
    private WebElement dateBox;

    @FindBy(xpath = "//*[@id=\"root\"]/div[2]/form/div[3]/div")
    private WebElement timeBox;

    @FindBy(xpath = "//*[@id=\"root\"]/div[2]/form/div[4]/div")
    private WebElement coachBox;

    @FindBy(xpath = "//*[@id=\"root\"]/div[2]/form/div[5]/button")
    private WebElement findWorkoutButton;

    @FindBy(xpath = "//*[@id=\"root\"]/div[2]/div[1]/div/div/div[2]/p[2]")
    private WebElement invalidTimeErrorMessage;

    @FindBy(xpath = "//a[@href = '/coaches']")
    private WebElement coachPageButton;

    @FindBy(xpath = "//button[text()='Log In']")
    private WebElement loginButton;

    @FindBy(xpath = "//*[@id=\"root\"]/nav/div[2]/div/button")
    private WebElement userProfileButton;

    @FindBy(xpath = "//*[@id=\"root\"]/nav/div[2]/div/div/div[2]/a")
    private WebElement myAccountButton;

    @FindBy(xpath = "//button[text() = 'Log Out']")
    private WebElement logOutButton;

    public String getMessage() {
        wait.until(ExpectedConditions.visibilityOf(welcomeMessage));
        return welcomeMessage.getText();
    }

    public void selectTypeOfSport(String typeOfSport) {
        Actions actions = new Actions(driver);
        wait.until(ExpectedConditions.visibilityOf(typeOfSportBox));
        actions.moveToElement(typeOfSportBox).click().perform();

        WebElement typeOfSportOption = driver.findElement(By.xpath("//li[text()='" + typeOfSport + "']"));
        wait.until(ExpectedConditions.visibilityOf(typeOfSportOption));
        actions.moveToElement(typeOfSportOption).click().perform();
    }

    public void selectDate(String date) {
        Actions actions = new Actions(driver);
        wait.until(ExpectedConditions.visibilityOf(dateBox));
        actions.moveToElement(dateBox).click().perform();

        WebElement dateOption = driver.findElement(By.xpath("//button[text()='" + date + "']"));
        wait.until(ExpectedConditions.visibilityOf(dateOption));
        actions.moveToElement(dateOption).click().perform();
    }

    public void selectTime(String time) {
        Actions actions = new Actions(driver);
        wait.until(ExpectedConditions.visibilityOf(timeBox));
        actions.moveToElement(timeBox).click().perform();

        WebElement timeOption = driver.findElement(By.xpath("//li[text()='" + time + "']"));
        wait.until(ExpectedConditions.visibilityOf(timeOption));
        actions.moveToElement(timeOption).click().perform();
    }

    public void selectCoach(String coach) {
        Actions actions = new Actions(driver);
        wait.until(ExpectedConditions.visibilityOf(coachBox));
        actions.moveToElement(coachBox).click().perform();

        WebElement coachOption = driver.findElement(By.xpath("//li[text()='" + coach + "']"));
        wait.until(ExpectedConditions.visibilityOf(coachOption));
        actions.moveToElement(coachOption).click().perform();
    }

    public void clickFIndWorkoutButton(){
        wait.until(ExpectedConditions.elementToBeClickable(findWorkoutButton));
        findWorkoutButton.click();
    }

    public String getInvalidTimeMessage() {
        wait.until(ExpectedConditions.visibilityOf(invalidTimeErrorMessage));
        return invalidTimeErrorMessage.getText();
    }

    public void clickCoachPageButton() {
        wait.until(ExpectedConditions.visibilityOf(coachPageButton));
        coachPageButton.click();
    }

    public void clickLoginPageButton() {
        wait.until(ExpectedConditions.visibilityOf(loginButton));
        loginButton.click();
    }


    public void clickUserProfileButton() {
        wait.until(ExpectedConditions.visibilityOf(userProfileButton));
        userProfileButton.click();
    }

    public void clickMyAccountButton() {
        wait.until(ExpectedConditions.visibilityOf(myAccountButton));
        myAccountButton.click();
    }

    public void clickLogOutButton() {
        wait.until(ExpectedConditions.visibilityOf(logOutButton));
        logOutButton.click();
    }
}
