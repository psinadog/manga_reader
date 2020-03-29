import GridFsStorage = require("multer-gridfs-storage");
import multer = require("multer");
import mongoose = require("mongoose");
import path = require("path");
import crypto = require("crypto");

export class GFS {
    mongoURI = "mongodb+srv://gokutok:111111ab@cluster0-070mp.mongodb.net/test?retryWrites=true&w=majority";
    connection: mongoose.Connection;
    gfs: any;
    storage: GridFsStorage;
    constructor() {
        this.connection = mongoose.createConnection(this.mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        this.connection.once("open", () => {
            this.gfs = new mongoose.mongo.GridFSBucket(this.connection.db, {
                bucketName: "uploads"
            });
        });
        this.storage = new GridFsStorage({
            url: this.mongoURI,
            file: (req, file) => {
                return new Promise((resolve, reject) => {
                    crypto.randomBytes(16, (err, buf) => {
                        if (err) {
                            return reject(err);
                        }
                        const filename = buf.toString("hex") + path.extname(file.originalname);
                        const fileInfo = {
                            filename: filename,
                            bucketName: "uploads"
                        };
                        resolve(fileInfo);
                    });
                });
            }
        });
    }

    get_storage() {
        return this.storage;
    }

    get_gfs() {
        return this.gfs;
    }
}
