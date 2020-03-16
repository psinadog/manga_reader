var Verify = /** @class */ (function () {
    function Verify(user) {
        this.user = user;
    }
    Verify.prototype.verify = function () {
        var verify_user = {
            name: true,
            password: true,
            email: true
        };
        if (this.is_empty(user))
            return this.is_empty(user);
        if (this.user.name.length < 4)
            verify_user.name = false;
        if (this.user.password.length < 8)
            verify_user.password = false;
        if (this.user.email.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi) === null)
            verify_user.email = false;
        return verify_user;
    };
    Verify.prototype.is_empty = function (user) {
        for (var key in user) {
            if (user[key] === "") {
                return key;
            }
        }
        return false;
    };
    return Verify;
}());
var user;
user = {
    name: "as33d",
    password: "343434343434",
    email: "rrr@gmadsf.com"
};
var a = new Verify(user);
console.log(a.verify());
