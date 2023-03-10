const { By, Key, Builder, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome")
require("chromedriver");
chromeOptions = new chrome.Options();
chromeOptions.addArguments("--start-maximized", "disable-infobars")

async function example() {
    let driver = await new Builder().forBrowser("chrome").setChromeOptions(chromeOptions).build();
    await driver.get("http://google.com");
    await driver.findElement(By.name("q")).sendKeys("Jack Bauer", Key.RETURN);
    // await driver.findElement(By.xpath("//input[@class='gLFyf']")).sendKeys("Jack Bauer", Key.RETURN);
    console.log(await driver.getTitle());
    await driver.quit();
}

async function validateForm() {
    let driver = await new Builder().forBrowser("chrome").setChromeOptions(chromeOptions).build();
    driver.manage().setTimeouts({ implicit: 5000 })
    await driver.get("https://the-internet.herokuapp.com/");
    await driver.findElement(By.linkText("Form Authentication")).click();
    await driver.wait(until.elementTextIs(driver.findElement(By.xpath("//div[@id='content']/div/h2")), "Login Page", 5000))
    // var loginLabelText = await driver.findElement(By.xpath("//div[@id='content']/div/h2")).getText();
    await driver.findElement(By.id("username")).sendKeys("tomsmith");
    await driver.findElement(By.id("password")).sendKeys("SuperSecretPassword!");
    await driver.findElement(By.xpath("//button[@type='submit']")).click();
    await driver.wait(until.elementLocated(By.className('flash success')));
    await driver.findElement(By.partialLinkText("Logout")).click();
    await driver.wait(until.elementLocated(By.className('flash success')));
    await driver.quit();


}
example();
validateForm();