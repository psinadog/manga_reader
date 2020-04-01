"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var manga_schema = new mongoose.Schema({
    folder_name: {
        type: String,
        required: true
    },
    folder_content: {
        type: Array,
        required: true
    }
});
module.exports = mongoose.model("Manga", manga_schema);
