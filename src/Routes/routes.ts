import express = require("express");

import { Mail } from "./nodemail";
import { Mysql } from "../Mysql/mysql";
import { Verify } from "./verify_user";
import { Cookies } from "./verify_cookies";

const router = express.Router();

const mysql = new Mysql();

let cookies_data;

router.use(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    cookies_data = new Cookies(req, res).verify();
    next();
});

router.get("/", async (req: express.Request, res: express.Response) => {
    res.render("index", {
        cookies_data,
    });
});

router.post("/exit", (req: express.Request, res: express.Response) => {
    res.clearCookie("user_data");
    res.redirect("/");
});

router.post("/req-page-progress", async (req: express.Request, res: express.Response) => {
    const user = await mysql.find_user(req.body.name, req.body.password);

    if (!req.body) return res.sendStatus(400);

    if (!user) {
        const user_value = await mysql.find_user_val(req.body.name, req.body.password);
        res.cookie("user_data", { cookies_have: user, cookies_name: user_value[0].NAME, cookies_password: user_value[0].PASSWORD, cookies_mail: user_value[0].MAIL, cookies_privilege: user_value[0].PRIVILEGE });
        res.json(true);
    } else {
        res.json(false);
    }
});

router.post("/registration-process", async (req: express.Request, res: express.Response) => {
    const new_user = new Verify(req.body);
    const verify = new_user.verify() && new_user.is_empty();

    if (!verify) {
        return res.json(!verify);
    }

    if (!req.body) return res.sendStatus(400);

    const exist = (await mysql.find_one(req.body.name)) && (await mysql.find_one(req.body.email));

    const message = {
        from: "ilyaspiypiy@gmail.com",
        to: req.body.email,
        subject: "Test",
        text: "работает",
    };

    if (!exist) {
        return res.json(!exist);
    }

    const mail = new Mail(message);
    mail.send();
    mysql.save_user(req.body.name, req.body.password, req.body.email);
    return res.json(!exist);
});

export default router;
