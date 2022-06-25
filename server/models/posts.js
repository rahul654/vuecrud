const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: String,
  category: String,
  content: String,
  postedBy: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId, ref: 'Comment'
    }
  ],
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", postSchema);
