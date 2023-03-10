const { expect } = require("chai");
const { By, Key, Builder, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome")
require("chromedriver");
chromeOptions = new chrome.Options();
chromeOptions.addArguments("--start-maximized", "disable-infobars")
var assert = require("chai").expect;

describe("Validate Sauce Demo website", function () {
    // this.retries - this can be used in suite level and test level and not on hooks, 
    //it also will retry only for assertion failures and not for other script errors.
    var driver;

    beforeEach(async function () {
        driver = await new Builder().forBrowser("chrome").setChromeOptions(chromeOptions).build();
        await driver.get("https://www.saucedemo.com/");
    })

    xit("Valid credentials", async function () {
        this.retries(3);
        await driver.findElement(By.id("user-name")).sendKeys("standard_user")
        await driver.findElement(By.id("password")).sendKeys("secret_sauce");
        await driver.findElement(By.id("login-button")).click();
        var pageTitle = await driver.getTitle();
        assert.strictEqual(pageTitle, "Swag Labs");
    })

    xit("Invalid credentials", async function () {
        await driver.findElement(By.id("user-name")).sendKeys("standard_user")
        await driver.findElement(By.id("password")).sendKeys("test");
        await driver.findElement(By.id("login-button")).click();
        var errorMessage = await driver.findElement(By.xpath("//h3[@data-test='error']")).getText();
        assert.strictEqual(errorMessage, "Epic sadface: Username and password do not match any user in this service");
    })

    //Final Home Task
    it("Add item to cart and validate the price !!", async function () {
        await driver.findElement(By.id("user-name")).sendKeys("standard_user")
        await driver.findElement(By.id("password")).sendKeys("secret_sauce");
        await driver.findElement(By.id("login-button")).click();
        var actualPrice = await driver.findElement(By.xpath("//button[@id='add-to-cart-sauce-labs-backpack']//parent::div/div")).getText();
        console.log(actualPrice);
        await driver.findElement(By.xpath("//button[@id='add-to-cart-sauce-labs-backpack']")).click();
        await driver.wait(until.elementLocated(By.xpath("//a[@class='shopping_cart_link']")));
        var cartbadge = await driver.findElement(By.xpath("//a[@class='shopping_cart_link']")).getText();
        console.log(cartbadge);
        var cartbadgeInt = parseInt(cartbadge);
        console.log(typeof cartbadgeInt);
        expect(cartbadgeInt).to.be.a('number')
        expect(cartbadgeInt).to.be.greaterThan(0);
        await driver.findElement(By.id("shopping_cart_container")).click();
        var yourCartTitle = await driver.findElement(By.xpath("//span[@class='title']")).getText();
        expect(yourCartTitle).equal("Your Cart");
        var expectedPrice = await driver.findElement(By.xpath("//div[@class='inventory_item_price']")).getText();
        expect(expectedPrice).equal(actualPrice);
        await driver.findElement(By.id("checkout")).click();
        var checkoutTitle = await driver.findElement(By.xpath("//span[@class='title']")).getText();
        expect(checkoutTitle).equal("Checkout: Your Information"); 
        await driver.findElement(By.id("first-name")).sendKeys("Mark");
        await driver.findElement(By.id("last-name")).sendKeys("Antony");
        await driver.findElement(By.id("postal-code")).sendKeys("600113");
        await driver.findElement(By.id("continue")).click();
        var overviewTitle = await driver.findElement(By.xpath("//span[@class='title']")).getText();
        expect(overviewTitle).equal("Checkout: Overview"); 
        var itemName = await driver.findElement(By.xpath("//div[@class='inventory_item_name']")).getText();
        expect(itemName).equal("Sauce Labs Backpack"); 
        var itemPrice = await driver.findElement(By.xpath("//div[@class='inventory_item_price']")).getText();
        expect(itemPrice).equal(expectedPrice);
        await driver.findElement(By.id("finish")).click();
        

    })

    afterEach(async function () {
        await driver.quit();
    })
})
