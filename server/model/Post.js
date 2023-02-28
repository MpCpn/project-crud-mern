const mongoose = require('mongoose');
const Schema = mongoose.Schema

const postSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    desc: {
        type: String,
        require: true,
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema)
