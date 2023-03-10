var sce = function () {
    this.passwordValidation = function (password) {
        if (password.length >= 8) {
            return "Kindly re-enter the password for next field !!"
        }
        else {
            return "Password should not be less than 8 characters !!"
        }
    }
}
module.exports = new sce();