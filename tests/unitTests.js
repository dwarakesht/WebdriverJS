var credentials = require("./password_validation");
var assert = require("assert");

describe("Password validation for positive and negative scenarios", function () {
    it("Valid password", function () {
        var actualMessage = credentials.passwordValidation("dwarak123");
        console.log(actualMessage);
        assert.strictEqual(actualMessage, "Kindly re-enter the password for next field !!")
    })

    it("Invalid password", function () {
        var actualMessage = credentials.passwordValidation("dwarak");
        console.log(actualMessage);
        assert.strictEqual(actualMessage, "Password should not be less than 8 characters !!")
    })

    it("Invalid password exceeding limit", function () {
        var actualMessage = credentials.passwordValidation("dwarakeshthanifai123");
        console.log(actualMessage);
        assert.strictEqual(actualMessage, "Password should not be greater than 12 characters !!")
    })

})