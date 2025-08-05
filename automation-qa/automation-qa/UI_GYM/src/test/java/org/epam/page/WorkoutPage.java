package org.epam.page;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class WorkoutPage extends BasePage{
    public WorkoutPage(WebDriver driver){
        super(driver);
    }
    @FindBy(xpath = "//*[@id=\"root\"]/div[2]/div/div[1]/div[3]/button")
    private WebElement cancelWorkoutButton;

    @FindBy(xpath = "//*[@id=\"root\"]/div[2]/div/div[3]/div[3]/button")
    private WebElement leaveFeedbackButton;

    @FindBy(xpath = "//*[@id=\"root\"]/div[2]/div/div[3]/div[4]/div/div[3]/div/div[4]/div")
    private WebElement ratingButton;

    @FindBy(xpath = "//*[@id=\"root\"]/div[2]/div/div[3]/div[4]/div/div[4]/textarea")
    private WebElement feedbackTextArea;

    @FindBy(xpath = "//*[@id=\"root\"]/div[2]/div/div[1]/div[4]/div/div[2]/button[2]")
    private WebElement cancelPopUpWorkoutButton;

    @FindBy(xpath = "//*[@id=\"root\"]/div[2]/div/div[1]/div[4]/div/div[2]/button[1]")
    private WebElement resumePopUpWorkoutButton;

    @FindBy(xpath = "//*[@id=\"root\"]/div[2]/div/div[3]/div[4]/div/div[5]/button")
    private WebElement submitFeedbackPopUpButton;

    @FindBy(xpath = "//*[@id=\"root\"]/div[2]/div/div[1]/div[1]/span")
    private WebElement workoutStatus;

    @FindBy(xpath = "//*[@id=\"root\"]/div[2]/div/div[3]/div[1]/span")
    private WebElement feedbackStatus;

    @FindBy(xpath = "//a[@href='/workouts']")
    private WebElement workoutButton;

    @FindBy(xpath = "//div[text()='My Workouts']")
    private WebElement workoutPageTitle;

    public void clickCancelWorkoutButton(){
        wait.until(ExpectedConditions.elementToBeClickable(cancelWorkoutButton));
        cancelWorkoutButton.click();
    }

    public void clickLeaveFeedbackButton(){
        wait.until(ExpectedConditions.elementToBeClickable(leaveFeedbackButton));
        leaveFeedbackButton.click();
    }

    public void setRatingButton(){
        wait.until(ExpectedConditions.elementToBeClickable(ratingButton));
        ratingButton.click();
    }

    public void setFeedbackTextArea(String feedback){
        wait.until(ExpectedConditions.elementToBeClickable(feedbackTextArea));
        feedbackTextArea.sendKeys(feedback);
    }
    public void clickSubmitFeedbackPopUpButton(){
        wait.until(ExpectedConditions.elementToBeClickable(submitFeedbackPopUpButton));
        submitFeedbackPopUpButton.click();
    }
    public void clickCancelWorkoutPopUpButton(){
        wait.until(ExpectedConditions.elementToBeClickable(cancelPopUpWorkoutButton));
        cancelPopUpWorkoutButton.click();
    }

    public void clickResumeWorkoutPopUpButton(){
        wait.until(ExpectedConditions.elementToBeClickable(resumePopUpWorkoutButton));
        resumePopUpWorkoutButton.click();
    }

    public String checkCancelWorkoutStatus(){
        wait.until(ExpectedConditions.visibilityOf(workoutStatus));
        return workoutStatus.getText();
    }

    public String checkResumeWorkoutStatus(){
        wait.until(ExpectedConditions.visibilityOf(workoutStatus));
        return workoutStatus.getText();
    }

    public String checkFeedbackStatus(){
        wait.until(ExpectedConditions.visibilityOf(feedbackStatus));
        return feedbackStatus.getText();
    }

    public void clickWorkoutButton(){
        wait.until(ExpectedConditions.elementToBeClickable(workoutButton));
        workoutButton.click();
    }
    public String getWorkoutPageTitle(){
        wait.until(ExpectedConditions.visibilityOf(workoutPageTitle));
        return workoutPageTitle.getText();
    }

}
