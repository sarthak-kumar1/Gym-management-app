package org.epam.page;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class CoachesPage extends BasePage{
    public CoachesPage(WebDriver driver){
        super(driver);
    }

    @FindBy(xpath = "//*[@id=\"root\"]/div/div/div[1]/div[2]/button")
    private WebElement bookWorkoutCardButton;

    @FindBy(xpath = "//*[@id=\"root\"]/div/div/div[1]/div/div[2]/div[5]/button[1]")
    private WebElement bookWorkoutButton;

    @FindBy(xpath = "//*[@id=\"root\"]/div/div/div[1]/div/div[3]/div/div[3]/button")
    private WebElement confirmButton;

    @FindBy(xpath = "//*[@id=\"root\"]/div/div[2]/div/div[2]/button[2]")
    private WebElement loginButton;

    @FindBy(xpath = "//*[@id=\"root\"]/div/div[2]/div/div[1]/h2")
    private WebElement loginConfirmationPopUpMessage;

    @FindBy(xpath = "//p[@class = ' font-light text-black-700']")
    private WebElement confirmationMessage;

    public void clickBookWorkoutCardButton(){
        wait.until(ExpectedConditions.elementToBeClickable(bookWorkoutCardButton));
        bookWorkoutCardButton.click();
    }

    public void selectDateAndTime(String date, String time) {
        WebElement dateOption = driver.findElement(By.xpath("//button[text()='" + date + "']"));
        wait.until(ExpectedConditions.elementToBeClickable(dateOption));
        dateOption.click();

        WebElement timeOption = driver.findElement(By.xpath("//button[contains(normalize-space(.), '" +  time + "')]"));
        wait.until(ExpectedConditions.elementToBeClickable(timeOption));
        timeOption.click();
    }

    public void clickBookWorkoutButton(){
        wait.until(ExpectedConditions.elementToBeClickable(bookWorkoutButton));
        bookWorkoutButton.click();
    }

    public void clickConfirmButton(){
        wait.until(ExpectedConditions.elementToBeClickable(confirmButton));
        confirmButton.click();
    }

    public String getConfirmationMessage() {
        wait.until(ExpectedConditions.visibilityOf(confirmationMessage));
        return confirmationMessage.getText();
    }

    public String getLoginConfirmationPopUpMessage() {
        wait.until(ExpectedConditions.visibilityOf(loginConfirmationPopUpMessage));
        return loginConfirmationPopUpMessage.getText();
    }

    public void clickLoginButton() {
        wait.until(ExpectedConditions.elementToBeClickable(loginButton));
        loginButton.click();
    }


}
