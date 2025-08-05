package org.epam.page;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class LoginPage extends BasePage{
    @FindBy(xpath = "//h2[text()='Welcome Back']")
    private WebElement loginPageTitle;

    @FindBy(xpath = "//input[@name='email']")
    private WebElement emailInput;

    @FindBy(xpath = "//input[@name='password']")
    private WebElement passwordInput;

    @FindBy(xpath = "//button[@type='submit']")
    private WebElement loginButton;

    @FindBy(xpath = "//*[@id=\"root\"]/div/div[1]/div/form/div[1]/p")
    private WebElement errorMessage;

    @FindBy(xpath = "//*[@id=\"root\"]/div/div[1]/div/div")
    private WebElement popUpErrorMessage;

    @FindBy(xpath = "//a[contains(@href, '/register')]")
    private WebElement createAccountLink;

    @FindBy(xpath = "//div[@class = ' flex justify-center p-4 border-b border-gray-100']/div/p")
    private WebElement emailAddress;

    @FindBy(xpath = "//div[@class = ' flex justify-center p-4 border-b border-gray-100']/div/h4")
    private WebElement designation;


    public LoginPage(WebDriver driver) {
        super(driver);
    }

    public String getTitle() {
        wait.until(ExpectedConditions.visibilityOf(loginPageTitle));
        return loginPageTitle.getText();
    }
    public void inputEmail(String email) {
        wait.until(ExpectedConditions.visibilityOf(emailInput));
        emailInput.sendKeys(email);
    }

    public void inputPassword(String password) {
        wait.until(ExpectedConditions.visibilityOf(passwordInput));
        passwordInput.sendKeys(password);
    }

    public void clickLoginButton() {
        wait.until(ExpectedConditions.elementToBeClickable(loginButton));
        loginButton.click();
    }

    public String getErrorMessage(){
        wait.until(ExpectedConditions.visibilityOf(errorMessage));
        return errorMessage.getText();
    }

    public String getPopUpErrorMessage(){
        wait.until(ExpectedConditions.visibilityOf(popUpErrorMessage));
        return popUpErrorMessage.getText();
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

    public void setCreateAccountLink(){
        wait.until(ExpectedConditions.elementToBeClickable(createAccountLink));
        createAccountLink.click();
    }

    public String getEmailAddress(){
        wait.until(ExpectedConditions.visibilityOf(emailAddress));
        return emailAddress.getText();
    }

    public String getDesignation(){
        wait.until(ExpectedConditions.visibilityOf(designation));
        return designation.getText();
    }

}
