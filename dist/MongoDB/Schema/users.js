"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var user_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('User', user_schema);
