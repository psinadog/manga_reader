"use strict";
exports.__esModule = true;
var nodemailer = require("nodemailer");
var Mail = /** @class */ (function () {
    function Mail(options) {
        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            service: "gmail",
            port: 465,
            secure: false,
            auth: {
                user: 'ilyaspiypiy@gmail.com',
                pass: "111111ab"
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        this.options = options;
    }
    Mail.prototype.send = function () {
        this.transporter.sendMail(this.options, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Email sent: ' + info.response);
            }
        });
    };
    return Mail;
}());
exports.Mail = Mail;
