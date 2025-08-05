package org.epam.page;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class MyAccountPage extends BasePage{
    public MyAccountPage(WebDriver driver) {
        super(driver);
    }

    @FindBy(xpath = "//*[@id=\"root\"]/div[1]/div/div[2]")
    private WebElement myAccountTitle;

    @FindBy(xpath = "//*[@id=\"root\"]/div[2]/div/div[1]/button[3]")
    private WebElement logoutButton;

    @FindBy(xpath = "//*[@id=\"root\"]/div[2]/div/div[1]/button[2]")
    private WebElement changePasswordButton;

    public String getTitle() {
        wait.until(ExpectedConditions.visibilityOf(myAccountTitle));
        return myAccountTitle.getText();
    }

    public void clickLogoutButton() {
        wait.until(ExpectedConditions.elementToBeClickable(logoutButton));
        logoutButton.click();
    }


}
