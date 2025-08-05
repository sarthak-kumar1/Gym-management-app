package org.epam.page;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;
import static org.openqa.selenium.support.PageFactory.initElements;

public class BasePage {
    protected WebDriver driver;
    protected WebDriverWait wait;
    protected BasePage(WebDriver driver){
        this.driver = driver;
        wait = new WebDriverWait(driver, Duration.ofSeconds(20));
        initElements(driver,this);
    }
}
