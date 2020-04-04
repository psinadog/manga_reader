import express = require("express");
import mysql = require("mysql");
import promise = require("bluebird");

import { Cookies } from "./verify_cookies";
import { Mysql } from "../Mysql/mysql";

const mysql = new Mysql();

const router = express.Router();

let cookies_data;
let is_admin;

router.use(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const v = new Cookies(req, res);
    cookies_data = v.verify();
    is_admin = await mysql.is_admin(cookies_data.cookies_privilege);
    if (!(!is_admin || cookies_data.cookies_privilege === "admin")) {
        cookies_data.cookies_privilege === null;
    }
    next();
});

router.get("/", async (req: express.Request, res: express.Response | any) => {
    res.render("content", { cookies_data });
});

router.get("/users-list", async (req, res) => {
    if (is_admin) {
        return res.send("youre not admin");
    }
    const users = await mysql.find_all();

    res.render("responsePayload", { users });
});

router.post("/modify", (req: express.Request, res: express.Response) => {
    if (req.body.make_D !== undefined) {
        mysql.delete_one(req.body.user);
    } else {
        mysql.make_admin(req.body.user);
    }
    res.redirect("users-list");
});

export default router;
