"use strict";
exports.__esModule = true;
var mysql_1 = require("../Mysql/mysql");
var Cookies = /** @class */ (function () {
    function Cookies(req, res) {
        this.mysql = new mysql_1.Mysql();
        this.req = req;
        this.res = res;
    }
    Cookies.prototype.verify = function () {
        var cookies_have;
        var cookies_name;
        var cookies_password;
        var cookies_privilege;
        if (this.req.cookies.user_data === undefined) {
            cookies_have = false;
        }
        else {
            cookies_have = Boolean(this.mysql.find_user(cookies_name, cookies_password));
            cookies_name = this.req.cookies.user_data["cookies_name"];
            cookies_password = this.req.cookies.user_data["cookies_password"];
            cookies_privilege = this.req.cookies.user_data["cookies_privilege"];
        }
        return {
            cookies_have: cookies_have,
            cookies_name: cookies_name,
            cookies_password: cookies_password,
            cookies_privilege: cookies_privilege
        };
    };
    return Cookies;
}());
exports.Cookies = Cookies;
