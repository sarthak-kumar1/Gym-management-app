package org.epam.page;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class RegisterPage extends BasePage {
    public RegisterPage(WebDriver driver) {
        super(driver);
    }

    @FindBy(xpath = "//input[@name='firstName']")
    private WebElement firstNameInput;

    @FindBy(xpath = "//input[@name='lastName']")
    private WebElement lastNameInput;

    @FindBy(xpath = "//input[@name='email']")
    private WebElement emailInput;

    @FindBy(xpath = "//input[@name='password']")
    private WebElement passwordInput;

    @FindBy(xpath = "//input[@name='confirmPassword']")
    private WebElement confirmPasswordInput;

    @FindBy(xpath = "//label[text()='Your target']/following-sibling::div")
    private WebElement targetBox;

    @FindBy(xpath = "//*[@id=\"root\"]/div/div[1]/div/form/div[5]/div/ul/li[2]")
    private WebElement targetOption;

    @FindBy(xpath = "//*[@id=\"root\"]/div/div[1]/div/form/div[6]/div/div")
    private WebElement preferenceBox;

    @FindBy(xpath = "//*[@id=\"root\"]/div/div[1]/div/form/div[6]/div/ul/li[2]")
    private WebElement preferenceOption;

    @FindBy(xpath = "//button[@type='submit']")
    private WebElement registerButton;

    @FindBy(xpath = "xpath of pop-up error message")
    private WebElement popUpErrorMessage;

    @FindBy(xpath = "//*[@id=\"root\"]/div/div[1]/div/h2")
    private WebElement RegisterPageTitle;

    @FindBy(xpath = "//a[contains(@href, '/login')]")
    private WebElement existingAccountLink;


    public String getTitle() {
        wait.until(ExpectedConditions.visibilityOf(RegisterPageTitle));
        return RegisterPageTitle.getText();
    }

    public void inputFirstName(String firstName) {
        wait.until(ExpectedConditions.visibilityOf(firstNameInput));
        firstNameInput.sendKeys(firstName);
    }

    public void inputLastName(String lastName) {
        wait.until(ExpectedConditions.visibilityOf(lastNameInput));
        lastNameInput.sendKeys(lastName);
    }

    public void inputEmail(String email) {
        wait.until(ExpectedConditions.visibilityOf(emailInput));
        emailInput.sendKeys(email);
    }

    public void inputPassword(String password) {
        wait.until(ExpectedConditions.visibilityOf(passwordInput));
        passwordInput.sendKeys(password);
    }

    public void inputConfirmPassword(String confirmPassword) {
        wait.until(ExpectedConditions.visibilityOf(confirmPasswordInput));
        confirmPasswordInput.sendKeys(confirmPassword);
    }

    public void selectTargetOption() {
        Actions actions = new Actions(driver);
        wait.until(ExpectedConditions.visibilityOf(targetBox));
        actions.moveToElement(targetBox).click().perform();
        wait.until(ExpectedConditions.visibilityOf(targetOption));
        actions.moveToElement(targetOption).click().perform();
    }

    public void selectPreferredOption() {
        Actions actions = new Actions(driver);
        wait.until(ExpectedConditions.visibilityOf(preferenceBox));
        actions.moveToElement(preferenceBox).click().perform();
        wait.until(ExpectedConditions.visibilityOf(preferenceOption));
        actions.moveToElement(preferenceOption).click().perform();
    }

    public void clickRegisterButton() {
        wait.until(ExpectedConditions.visibilityOf(registerButton));
        registerButton.click();
    }

    public String getInlineErrorMessage(String fieldName) {
        try {
            WebElement errorElement = driver.findElement(By.xpath("//input[@name='" + fieldName + "']/ancestor::*[1]/following-sibling::p"));
            wait.until(ExpectedConditions.visibilityOf(errorElement));
            return errorElement.getText();
        } catch (Exception e) {
            System.out.println("Error message not found for field: " + fieldName + ". " + e.getMessage());
            return "";
        }
    }

    public void clickExistingAccountLink(){
        wait.until(ExpectedConditions.elementToBeClickable(existingAccountLink));
        existingAccountLink.click();
    }

    public String getPopUpErrorMessage() {
        wait.until(ExpectedConditions.elementToBeClickable(popUpErrorMessage));
        return existingAccountLink.getText();
    }
}