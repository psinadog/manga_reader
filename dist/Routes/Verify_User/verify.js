"use strict";
exports.__esModule = true;
var Verify = /** @class */ (function () {
    function Verify(name, password) {
        this.name = name;
        this.password = password;
    }
    Verify.prototype.is_login = function (req) {
        if (req.cookies === undefined)
            return false;
    };
    return Verify;
}());
exports.Verify = Verify;
