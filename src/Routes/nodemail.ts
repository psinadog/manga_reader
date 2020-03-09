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
    // host: "smtp.gmail.com",
    // service: "gmail",
    // port: 465,
    // secure: false,
    // auth: {
    //     user: 'ilyaspiypiy@gmail.com',
    //     pass: "111111ab"
    // },
    // tls: {
    //     rejectUnauthorized: false
    // }
    transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: 'ilyaspiypiy@gmail.com',
            clientId: '537215972931-d7lib7p8fdgt9b00f2brcmff6t8gu9l3.apps.googleusercontent.com',
            clientSecret: 'VCLIztDMO-MzuLuDHLNVpaM2',
            refreshToken: '1//04EGCMoE3K2ljCgYIARAAGAQSNwF-L9IrPRgUx2huPWxAmTQrsM9HJxsZxcvS2IQQ54y6FkLheYMBNz0gVtuicSRPAJIrgJT2UCk',
            accessToken: 'ya29.a0Adw1xeUD38fMcEl3NlF6gsX2eVi0kXjrgiqBuBmhAt_k3dlTB9v1rt2Mhf975WTDNczTooW4doo6Qiv5qYtvDb-JlmAgL0hlUyiw1dAyJOl9lkWGxBmAeVhJ2VbxifVHNclLTl4PPiuHLiIVanDZYKwCMs4Rf081vd8'
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