import express = require("express");
import multer = require("multer");
import path = require("path");

import { Mysql } from "../Mysql/mysql";
import { Cookies } from "./verify_cookies";

const router = express.Router();
const mysql = new Mysql();
const cloudinary = require("cloudinary");

cloudinary.config({
    cloud_name: "picturesapplecustard",
    api_key: "416216855519675",
    api_secret: "TkE7-xyZCqx3HDEbhPI7uK5MzvE",
});
const fs = require("fs");
const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "-" + Date.now());
    },
});

const upload = multer({
    storage: storage,
});

let cookies_data;

router.use(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    cookies_data = new Cookies(req, res).verify();
    next();
});

router.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.render("upload");
});

router.post("/upload", upload.single("image"), async (req: any, res) => {
    res.send(req.file);
    // let filePaths = req.body.paths;

    // let multipleUpload = new Promise(async (resolve, reject) => {
    //     let upload_len = filePaths.length,
    //         upload_res = new Array();
    //     mysql.save_manga(req.body.name, req.body.preview, req.body.desc, upload_len);
    //     for (let i = 0; i <= upload_len + 1; i++) {
    //         let filePath = filePaths[i];
    //         await cloudinary.v2.uploader.upload(req.body.name + "/" + filePath, { public_id: req.body.name + "/" + "view" + "/" + (i + 1) }, (error, result) => {
    //             if (upload_res.length === upload_len) {
    //                 resolve(upload_res);
    //             } else if (result) {
    //                 upload_res.push(result.public_id);
    //             } else if (error) {
    //                 console.log(error);
    //                 reject(error);
    //             }
    //         });
    //     }
    // })
    //     .then((result) => result)
    //     .catch((error) => error);
    // cloudinary.v2.uploader.upload(req.body.preview, { public_id: req.body.name + "/" + "Preview" }, (error, result) => {});
    // let upload = await multipleUpload;
    // res.json({ response: upload });
});

router.post("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send("upload");
});

export default router;
