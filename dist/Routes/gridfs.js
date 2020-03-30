"use strict";
exports.__esModule = true;
var GridFsStorage = require("multer-gridfs-storage");
var mongoose = require("mongoose");
var path = require("path");
var crypto = require("crypto");
var GFS = /** @class */ (function () {
    function GFS() {
        var _this = this;
        this.mongoURI = "mongodb+srv://gokutok:111111ab@cluster0-070mp.mongodb.net/test?retryWrites=true&w=majority";
        this.connection = mongoose.createConnection(this.mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        this.connection.once("open", function () {
            _this.gfs = new mongoose.mongo.GridFSBucket(_this.connection.db, {
                bucketName: "uploads"
            });
        });
        this.storage = new GridFsStorage({
            url: this.mongoURI,
            file: function (req, file) {
                return new Promise(function (resolve, reject) {
                    crypto.randomBytes(16, function (err, buf) {
                        if (err) {
                            return reject(err);
                        }
                        var filename = buf.toString("hex") + path.extname(file.originalname);
                        var fileInfo = {
                            filename: filename,
                            bucketName: "uploads"
                        };
                        resolve(fileInfo);
                    });
                });
            }
        });
    }
    GFS.prototype.get_storage = function () {
        return this.storage;
    };
    GFS.prototype.get_gfs = function () {
        return this.gfs;
    };
    return GFS;
}());
exports.GFS = GFS;
