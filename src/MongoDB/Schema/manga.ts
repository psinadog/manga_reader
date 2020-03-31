import * as mongoose from "mongoose";

const manga_schema = new mongoose.Schema({
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
