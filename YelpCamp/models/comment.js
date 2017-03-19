var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    text: String,
    author: {
        // Since we'll be using username frequently, we're storing it along with id so that we don't have to query the database for it every time. (You can only do this with a non-relational database.)
        // We also don't need the entire user object
        id:{
            type: mongoose.Schema.Types.ObjectId,
            // ref refers to the collection name 
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Comment", commentSchema);