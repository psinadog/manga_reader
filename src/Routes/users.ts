import express = require("express");
import mysql = require("mysql");
import promise = require("bluebird");

import { Cookies } from "./verify_cookies";

const router = express.Router();

var connection = mysql.createConnection({
    host: "bi2jnwdmlse79o7fxemx-mysql.services.clever-cloud.com",
    user: "u3iyfoj9l0m1qcmx",
    password: "VKYmppnmFQrZSLBbDfCk",
    database: "bi2jnwdmlse79o7fxemx"
});
var queryAsync = promise.promisify(connection.query.bind(connection));
connection.connect();
process.stdin.resume();
process.on("exit", exitHandler.bind(null, { shutdownDb: true }));

let cookies_data;

router.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    const v = new Cookies(req, res);
    cookies_data = v.verify();
    next();
});

router.get("/", async (req: express.Request, res: express.Response | any) => {
    res.render("content", { cookies_data });
});

router.post("/", function(req, res) {
    var numRows;
    var queryPagination;
    var numPerPage = parseInt(req.query.npp, 10) || 1;
    var page = parseInt(req.query.page, 10) || 0;
    var numPages;
    var skip = page * numPerPage;
    // Here we compute the LIMIT parameter for MySQL query
    var limit = skip + "," + numPerPage;
    queryAsync("SELECT count(*) as numRows FROM USER")
        .then(function(results) {
            numRows = results[0].numRows;
            numPages = Math.ceil(numRows / numPerPage);
            console.log("number of pages:", numPages);
        })
        .then(() => queryAsync("SELECT * FROM USER ORDER BY ID DESC LIMIT " + limit))
        .then(function(results) {
            var responsePayload = {
                results: results,
                pagination: {}
            };
            if (page < numPages) {
                responsePayload.pagination = {
                    current: page,
                    perPage: numPerPage,
                    previous: page > 0 ? page - 1 : undefined,
                    next: page < numPages - 1 ? page + 1 : undefined
                };
            } else
                responsePayload.pagination = {
                    err: "queried page " + page + " is >= to maximum page number " + numPages
                };
            res.json(responsePayload);
        })
        .catch(function(err) {
            console.error(err);
            res.json({ err: err });
        });
});

function exitHandler(options, err) {
    if (options.shutdownDb) {
        console.log("shutdown mysql connection");
        connection.end();
    }
    if (err) console.log(err.stack);
    if (options.exit) process.exit();
}

export default router;
