package com.example;

import org.testng.annotations.Test;
import org.testng.annotations.BeforeMethod;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.testng.annotations.AfterMethod;

public class NewTest {
	WebDriver driver;
	
  @Test
  public void f() {
  }
  @BeforeMethod
  public void beforeMethod() {
	  System.setProperty("webdriver.gecko.driver","./src/test/resources/drivers/geckodriver.exe");
	  FirefoxOptions options = new FirefoxOptions();
      options.setBinary("C:\\Program Files\\Mozilla Firefox\\firefox.exe");
	  driver = new FirefoxDriver(options);
	  driver.get("http://demo-store.seleniumacademy.com/");
  }

  @AfterMethod
  public void afterMethod() {
	  driver.quit();
  }

}
