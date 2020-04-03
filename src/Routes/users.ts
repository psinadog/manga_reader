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
    /**
     * PAGINATION
     */
    // var numRows;
    // var queryPagination;
    // var numPerPage = parseInt(req.query.npp, 10) || 1;
    // var page = parseInt(req.query.page, 10) || 0;
    // var numPages;
    // var skip = page * numPerPage;
    // // Here we compute the LIMIT parameter for MySQL query
    // var limit = skip + "," + numPerPage;
    // queryAsync("SELECT count(*) as numRows FROM USER")
    //     .then(function(results) {
    //         numRows = results[0].numRows;
    //         numPages = Math.ceil(numRows / numPerPage);
    //         console.log("number of pages:", numPages);
    //     })
    //     .then(() => queryAsync("SELECT * FROM USER"))
    //     .then(async function(results) {
    //         var responsePayload = {
    //             results: results,
    //             pagination: {}
    //         };
    //         if (page < numPages) {
    //             responsePayload.pagination = {
    //                 current: page,
    //                 perPage: numPerPage,
    //                 previous: page > 0 ? page - 1 : undefined,
    //                 next: page < numPages - 1 ? page + 1 : undefined
    //             };
    //         } else
    //             responsePayload.pagination = {
    //                 err: "queried page " + page + " is >= to maximum page number " + numPages
    //             };
    //         console.log(responsePayload);
    //         res.render("responsePayload", await { responsePayload });
    //     })
    //     .catch(function(err) {
    //         console.error(err);
    //         res.json({ err: err });
    //     });
});

router.post("/modify", (req: express.Request, res: express.Response) => {
    if (req.body.make_D !== undefined) {
        mysql.delete_one(req.body.user);
    } else {
        mysql.make_admin(req.body.user);
    }
    res.redirect("users-list");
    // отправляем пришедший ответ обратно
});

// function exitHandler(options, err) {
//     if (options.shutdownDb) {
//         console.log("shutdown mysql connection");
//         connection.end();
//     }
//     if (err) console.log(err.stack);
//     if (options.exit) process.exit();
// }

export default router;
