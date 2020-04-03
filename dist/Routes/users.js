"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express = require("express");
var mysql = require("mysql");
var promise = require("bluebird");
var verify_cookies_1 = require("./verify_cookies");
var router = express.Router();
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
var cookies_data;
router.use(function (req, res, next) {
    var v = new verify_cookies_1.Cookies(req, res);
    cookies_data = v.verify();
    next();
});
router.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.render("content", { cookies_data: cookies_data });
        return [2 /*return*/];
    });
}); });
router.post("/", function (req, res) {
    var numRows;
    var queryPagination;
    var numPerPage = parseInt(req.query.npp, 10) || 1;
    var page = parseInt(req.query.page, 10) || 0;
    var numPages;
    var skip = page * numPerPage;
    // Here we compute the LIMIT parameter for MySQL query
    var limit = skip + "," + numPerPage;
    queryAsync("SELECT count(*) as numRows FROM USER")
        .then(function (results) {
        numRows = results[0].numRows;
        numPages = Math.ceil(numRows / numPerPage);
        console.log("number of pages:", numPages);
    })
        .then(function () { return queryAsync("SELECT * FROM USER ORDER BY ID DESC LIMIT " + limit); })
        .then(function (results) {
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
        }
        else
            responsePayload.pagination = {
                err: "queried page " + page + " is >= to maximum page number " + numPages
            };
        res.json(responsePayload);
    })["catch"](function (err) {
        console.error(err);
        res.json({ err: err });
    });
});
function exitHandler(options, err) {
    if (options.shutdownDb) {
        console.log("shutdown mysql connection");
        connection.end();
    }
    if (err)
        console.log(err.stack);
    if (options.exit)
        process.exit();
}
exports["default"] = router;
