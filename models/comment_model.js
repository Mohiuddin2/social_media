const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = Schema({
//   post: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Post",
//   },
  user :{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  text_com: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
