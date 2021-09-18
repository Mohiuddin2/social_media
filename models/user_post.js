const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserScheme = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

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
  likes:{
    type: Int,
    default: 0,
  },
  comment: {
    user: UserScheme,
    text: {
        type: String,
        required: true,
        },
    },
});

module.exports = mongoose.model("User", UserScheme);
module.exports = mongoose.model("Post", PostScheme)
