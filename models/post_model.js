const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostScheme = Schema({
  title: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
  },
  imgLink: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comment",
  }],
});

const Post = mongoose.model("Post", PostScheme);
module.exports = Post;
