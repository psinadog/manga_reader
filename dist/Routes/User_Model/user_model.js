"use strict";
exports.__esModule = true;
var Model = /** @class */ (function () {
    function Model() {
    }
    Model.get = function (is_login, name, password) {
        return {
            is_login: is_login,
            name: name,
            password: password
        };
    };
    return Model;
}());
exports.Model = Model;
