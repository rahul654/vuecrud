const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  author: String,
  comment: String,
  created: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Comment", commentSchema);
