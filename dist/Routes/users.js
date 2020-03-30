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
var crypto = require("crypto");
var mongoose = require("mongoose");
var multer = require("multer");
var GridFsStorage = require("multer-gridfs-storage");
var Grid = require("gridfs-stream");
var mongo_1 = require("../MongoDB/mongo");
var User = require("../MongoDB/Schema/users");
var router = express.Router();
var mongo = new mongo_1.MongoDB();
var cookies_data;
var cookies_name;
var cookies_password;
router.use(function (req, res, next) {
    if (req.cookies.user_data === undefined) {
        cookies_data = false;
    }
    else {
        cookies_data = true;
        cookies_name = req.cookies.user_data[0]["name"];
        cookies_password = req.cookies.user_data[0]["password"];
    }
    next();
});
router.get("/", mongo.paginated_results(User), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var next, previous;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, res.paginatedResults.next.page];
            case 1:
                next = _a.sent();
                return [4 /*yield*/, res.paginatedResults.previous.page];
            case 2:
                previous = _a.sent();
                res.render("content", {
                    paginated_results: JSON.stringify(res.paginatedResults),
                    next: next,
                    previous: previous,
                    data: {
                        is_login: cookies_data,
                        name: cookies_name,
                        password: cookies_password
                    }
                });
                return [2 /*return*/];
        }
    });
}); });
/**
 * Распределить по классам
 */
var mongoURI = "mongodb+srv://gokutok:111111ab@cluster0-070mp.mongodb.net/test?retryWrites=true&w=majority";
var conn = mongoose.createConnection(mongoURI);
var gfs;
conn.once("open", function () {
    gfs = Grid(conn.db, mongoose.mongo);
    /**
     * Сделать динамическую смену бакетов
     */
    gfs.collection("uploads2");
});
var storage = new GridFsStorage({
    url: mongoURI,
    file: function (req, file) {
        return new Promise(function (resolve, reject) {
            crypto.randomBytes(16, function (err, buf) {
                if (err) {
                    return reject(err);
                }
                /**
                 * Имя как ссылки
                 */
                var fileInfo = {
                    filename: "ASD",
                    /**
                     * Сделать динамическую смену бакетов
                     */
                    bucketName: "uploads2"
                };
                resolve(fileInfo);
            });
        });
    }
});
var upload = multer({ storage: storage });
router.get("/:id", function (req, res) {
    gfs.files.find().toArray(function (err, files) {
        if (!files || files.length === 0) {
            res.render("images_view", { files: false });
        }
        else {
            files.map(function (file) {
                if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
                    file.isImage = true;
                }
                else {
                    file.isImage = false;
                }
            });
            res.render("images_view", { files: files });
        }
    });
});
router.post("/upload", upload.array("file"), function (req, res) {
    res.redirect("/images");
});
router.get("/files", function (req, res) {
    gfs.files.find().toArray(function (err, files) {
        if (!files || files.length === 0) {
            return res.status(404).json({
                err: "No files exist"
            });
        }
        return res.json(files);
    });
});
router.get("/files/:filename", function (req, res) {
    gfs.files.findOne({ filename: req.params.filename }, function (err, file) {
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: "No file exists"
            });
        }
        return res.json(file);
    });
});
router.get("/image/:filename", function (req, res) {
    gfs.files.findOne({ filename: req.params.filename }, function (err, file) {
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: "No file exists"
            });
        }
        if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
            var readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        }
        else {
            res.status(404).json({
                err: "Not an image"
            });
        }
    });
});
router.post("/files/:id", function (req, res) {
    gfs.remove({ _id: req.params.id, root: "uploads" }, function (err, gridStore) {
        if (err) {
            return res.status(404).json({ err: err });
        }
        res.redirect("/");
    });
});
exports["default"] = router;
