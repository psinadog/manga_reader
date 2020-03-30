"use strict";
exports.__esModule = true;
var Verify = /** @class */ (function () {
    function Verify(user) {
        this.user = user;
    }
    Verify.prototype.verify = function () {
        if (this.user.name.length < 4) {
            return false;
        }
        if (this.user.password.length < 8) {
            return false;
        }
        if (this.user.email.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi) === null) {
            return false;
        }
        return true;
    };
    Verify.prototype.is_empty = function () {
        for (var key in this.user) {
            if (this.user[key] === "") {
                return false;
            }
        }
        return true;
    };
    return Verify;
}());
exports.Verify = Verify;
