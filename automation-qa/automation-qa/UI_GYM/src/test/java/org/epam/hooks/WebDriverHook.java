package org.epam.hooks;

import io.cucumber.java.After;
import io.cucumber.java.Before;
import org.epam.utils.ConfigReader;
import org.epam.utils.SingletonWebDriverFactory;
import org.openqa.selenium.WebDriver;

public class WebDriverHook {
    private static WebDriver webDriver;
    private SingletonWebDriverFactory factory;
    private final ConfigReader configReader = ConfigReader.getInstance();

    @Before
    public void before() {
        String browserName = System.getProperty("browser", "chrome");
        factory = SingletonWebDriverFactory.getInstance(browserName);
        webDriver = factory.getDriver();
    }

    public static WebDriver getDriver() {
        if (webDriver == null) {
            throw new IllegalStateException("WebDriver is not initialized. Make sure the @Before method is executed before calling getWebDriver().");
        }
        return webDriver;
    }


    @After
    public void teardown() {
        if (factory != null) {
            factory.quitDriver();
        }
        webDriver = null; // Reset the WebDriver reference
    }
}