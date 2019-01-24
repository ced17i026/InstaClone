const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    postBody:{
        type: String,
    },
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref : "user",
    }],
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        body: String,
        ref : "user"
    }]
})

module.exports = mongoose.model("post",postSchema);