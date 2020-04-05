import express = require("express");
import mysql = require("mysql");

import { Cookies } from "./verify_cookies";
import { Mysql } from "../Mysql/mysql";

const mysql = new Mysql();

const router = express.Router();

let cookies_data;

router.use(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    cookies_data = new Cookies(req, res).verify();
    next();
});

router.get("/:name", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const manga = await mysql.find_manga_one(req.params.name);
    console.log(manga);
    res.render("manga", { manga, cookies_data });
});

router.get("/", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const list = await mysql.find_manga_all();
    console.log(list[11]);
    res.render("list", { cookies_data, list });
    "https://res.cloudinary.com/picturesapplecustard/image/upload/v1586026604/evangelion_24/view/1.jpg";
});
export default router;
