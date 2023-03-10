const { expect } = require("chai");
const { By, Key, Builder, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome")
require("chromedriver");
chromeOptions = new chrome.Options();
chromeOptions.addArguments("--start-maximized", "disable-infobars")
var assert = require("chai").expect;

var driver = new Builder().forBrowser("chrome").setChromeOptions(chromeOptions).build();
// locators
var userNameField = driver.findElement(By.id("user-name"));
var passwordField = driver.findElement(By.id("password"));
var loginButton = driver.findElement(By.id("login-button"));
var productPriceLabel = driver.findElement(By.xpath("//button[@id='add-to-cart-sauce-labs-backpack']//parent::div/div"));
var backpackAddToCart = driver.findElement(By.xpath("//button[@id='add-to-cart-sauce-labs-backpack']"));
var shoppingCartBadge = driver.findElement(By.xpath("//a[@class='shopping_cart_link']"));
var shopCartContainer = driver.findElement(By.id("shopping_cart_container"));
var yourCartTitle = driver.findElement(By.xpath("//span[@class='title']"));
var checkoutButton = driver.findElement(By.id("checkout"));
var checkoutTitle = driver.findElement(By.xpath("//span[@class='title']"));
var overviewTitle = driver.findElement(By.xpath("//span[@class='title']"));
var itemName = driver.findElement(By.xpath("//div[@class='inventory_item_name']"));
var itemPrice = driver.findElement(By.xpath("//div[@class='inventory_item_price']"))
var finishButton = driver.findElement(By.id("finish"));

describe("Validate Sauce Demo website", function () {
    // this.retries - this can be used in suite level and test level and not on hooks, 
    //it also will retry only for assertion failures and not for other script errors.

    beforeEach(async function () {
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
        userLogin();
        assertTitle(yourCartTitle, "Products")
        var productPrice = getProductPrice();
        addToCartAndValidate();
        clickShopCartContainer();
        assertTitle(yourCartTitle, "Your Cart")
        validatePrice(productPrice);
        checkoutAndValidate();
        fillPersonalDetails();
        assertTitle(overviewTitle, "Checkout: Overview")
        validatePriceAndProduct();
        clickFinishButton();
    })

    afterEach(async function () {
        await driver.quit();
    })
});

async function clickFinishButton() {
    await finishButton.click();
}

async function validatePriceAndProduct() {
    expect(await itemName.getText()).equal("Sauce Labs Backpack");
    expect(await itemPrice.getText()).equal(expectedPrice);
}

async function checkoutAndValidate() {
    await checkoutButton.click();
    assertTitle(checkoutTitle, "Checkout: Your Information")
}
async function validatePrice(productPrice) {
    var expectedPrice = await driver.findElement(By.xpath("//div[@class='inventory_item_price']")).getText();
    expect(expectedPrice).equal(productPrice);
}

async function clickShopCartContainer() {
    await shopCartContainer.click();
}
async function addToCartAndValidate() {
    await backpackAddToCart.click();
    addToCartAndValidate();
    expect(parseInt(await shoppingCartBadge.getText())).to.be.a('number')
    expect(parseInt(await shoppingCartBadge.getText())).to.be.greaterThan(0);
}

async function fillPersonalDetails() {
    await driver.findElement(By.id("first-name")).sendKeys("Mark");
    await driver.findElement(By.id("last-name")).sendKeys("Antony");
    await driver.findElement(By.id("postal-code")).sendKeys("600113");
    await driver.findElement(By.id("continue")).click();
}

async function assertTitle(element, expectedData) {
    expect(await element.getText()).equal(expectedData);
}

async function getProductPrice() {
    return await productPriceLabel.getText();
}

async function userLogin() {
    await userNameField.sendKeys("standard_user")
    await passwordField.sendKeys("secret_sauce");
    await loginButton.click();
}

