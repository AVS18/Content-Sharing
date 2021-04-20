const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const contentSchema = new Schema({
    created_by: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required:true
    }
})
module.exports = mongoose.model("Content", contentSchema, "contents")