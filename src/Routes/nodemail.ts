import nodemailer = require("nodemailer");
import xoauth2 = require("xoauth2");

export class Mail {
    main_user: "ilyaspiypiy@gmail.com";
    password: "111111ab";
    options: {
        from: string,
        to: string,
        subject: string,
        text: string
    };
    transporter = nodemailer.createTransport({
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
    constructor(options: {
        from: string,
        to: string,
        subject: string,
        text: string
    }) {
        this.options = options;
    }
    send() {
        this.transporter.sendMail(this.options, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}