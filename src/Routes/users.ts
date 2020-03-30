import express = require("express");
const crypto = require("crypto");
const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");

import { MongoDB } from "../MongoDB/mongo";

const User = require("../MongoDB/Schema/users");
const router = express.Router();
const mongo = new MongoDB();

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

router.get("/", mongo.paginated_results(User), async (req: express.Request, res: express.Response | any) => {
    const next = await res.paginatedResults.next.page;
    const previous = await res.paginatedResults.previous.page;
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
});

/**
 * Распределить по классам
 */

const mongoURI = "mongodb+srv://gokutok:111111ab@cluster0-070mp.mongodb.net/test?retryWrites=true&w=majority";
const conn = mongoose.createConnection(mongoURI);

let gfs;

conn.once("open", () => {
    gfs = Grid(conn.db, mongoose.mongo);
    /**
     * Сделать динамическую смену бакетов
     */
    gfs.collection("uploads2");
});

const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                /**
                 * Имя как ссылки
                 */
                const fileInfo = {
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
const upload = multer({ storage });
router.get("/:id", (req, res) => {
    gfs.files.find().toArray((err, files) => {
        if (!files || files.length === 0) {
            res.render("images_view", { files: false });
        } else {
            files.map(file => {
                if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
                    file.isImage = true;
                } else {
                    file.isImage = false;
                }
            });
            res.render("images_view", { files: files });
        }
    });
});

router.post("/upload", upload.array("file"), (req, res) => {
    res.redirect("/images");
});

router.get("/files", (req, res) => {
    gfs.files.find().toArray((err, files) => {
        if (!files || files.length === 0) {
            return res.status(404).json({
                err: "No files exist"
            });
        }

        return res.json(files);
    });
});

router.get("/files/:filename", (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: "No file exists"
            });
        }

        return res.json(file);
    });
});

router.get("/image/:filename", (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: "No file exists"
            });
        }

        if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            res.status(404).json({
                err: "Not an image"
            });
        }
    });
});

router.post("/files/:id", (req, res) => {
    gfs.remove({ _id: req.params.id, root: "uploads" }, (err, gridStore) => {
        if (err) {
            return res.status(404).json({ err: err });
        }
        res.redirect("/");
    });
});
export default router;
