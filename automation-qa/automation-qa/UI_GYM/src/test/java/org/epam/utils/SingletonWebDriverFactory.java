package org.epam.utils;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.edge.EdgeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;

public class SingletonWebDriverFactory {
    private static volatile SingletonWebDriverFactory factory;
    private static final ThreadLocal<WebDriver> local = new ThreadLocal<>();

    private SingletonWebDriverFactory() {}

    private void setDriver(String browser) {
        if (local.get() != null) {
            quitDriver(); // Ensure no leftover sessions
        }
        switch (browser.toLowerCase()) {
            case "chrome":
                ChromeOptions chromeOptions = new ChromeOptions();
                chromeOptions.addArguments("--start-maximized");
                local.set(new ChromeDriver(chromeOptions));
                break;
            case "firefox":
                FirefoxOptions firefoxOptions = new FirefoxOptions();
                firefoxOptions.addArguments("--start-maximized");
                local.set(new FirefoxDriver(firefoxOptions));
                break;
            case "edge":
                EdgeOptions edgeOptions = new EdgeOptions();
                edgeOptions.addArguments("--start-maximized");
                local.set(new EdgeDriver(edgeOptions));
                break;
            default:
                throw new InvalidWebDriverException("Invalid browser name: " + browser);
        }
    }

    public WebDriver getDriver() {
        WebDriver driver = local.get();
        if (driver == null) {
            throw new IllegalStateException("WebDriver is not initialized. Call setDriver() first.");
        }
        return driver;
    }

    public static SingletonWebDriverFactory getInstance(String browser){
        if(factory == null){
            synchronized (SingletonWebDriverFactory.class) {
                if (factory == null) {
                    factory = new SingletonWebDriverFactory();
                }
            }
        }
        if (local.get() == null) {
            factory.setDriver(browser);
        }
        return factory;
    }

    public void quitDriver() {
        WebDriver driver = local.get();
        if (driver != null) {
            driver.quit();
            local.remove();
        }
    }
}
