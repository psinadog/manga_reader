"use strict";
exports.__esModule = true;
var Intermediate = /** @class */ (function () {
    function Intermediate() {
    }
    Intermediate.prototype.get_user_data = function () {
        return [this.req.cookies.user_data[0]["name"], this.req.cookies.user_data[0]["password"]];
    };
    Intermediate.prototype.verify_cookies = function (req, res) {
        this.req = req;
        this.res = res;
        if (this.req.cookies.user_data === undefined) {
            return false;
        }
        else {
            return true;
        }
    };
    return Intermediate;
}());
exports.Intermediate = Intermediate;
