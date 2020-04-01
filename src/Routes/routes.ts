import express = require("express");

import { Mail } from "./nodemail";
import { Mysql } from "../Mysql/mysql";
import { Verify } from "./verify_user";

const router = express.Router();

const mysql = new Mysql();

let cookies_data: boolean;
let cookies_name: string;
let cookies_password: string;

router.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.cookies.user_data === undefined) {
        cookies_data = false;
    } else {
        cookies_data = true;
        cookies_name = req.cookies.user_data[0]["name"];
        cookies_password = req.cookies.user_data[0]["password"];
    }
    next();
});

router.get("/", async (req: express.Request, res: express.Response) => {
    const user = await mysql.find_user(cookies_name, cookies_password);
    if (user) res.render("index", { data: { is_login: cookies_data } });
    else {
        if (!user) {
            res.render("index", {
                data: {
                    is_login: cookies_data,
                    name: cookies_name,
                    password: cookies_password
                }
            });
        } else {
            res.clearCookie("user_data");
        }
    }
});

router.post("/exit", (req: express.Request, res: express.Response) => {
    res.clearCookie("user_data");
    res.redirect("/");
});

router.post("/req-page-progress", async (req: express.Request, res: express.Response | any) => {
    const user = await mysql.find_user(req.body.name, req.body.password);

    if (!req.body) return res.sendStatus(400);

    if (!user) {
        res.cookie("user_data", user);
        res.redirect("/");
    } else {
        res.json(false);
    }
});

router.post("/registration-process", async (req: express.Request, res: express.Response) => {
    const new_user = new Verify(req.body);
    const verify = new_user.verify() && new_user.is_empty();

    if (!verify) {
        return res.json(verify);
    }

    if (!req.body) return res.sendStatus(400);

    const exist = (await mysql.find_one(req.body.name)) && (await mysql.find_one(req.body.email));

    const message = {
        from: "ilyaspiypiy@gmail.com",
        to: req.body.email,
        subject: "Test",
        text: "работает"
    };

    if (!exist) {
        return res.json(exist);
    }

    const mail = new Mail(message);
    mail.send();
    mysql.save_user(req.body.name, req.body.password, req.body.email);
    return res.json(exist);
});

export default router;
