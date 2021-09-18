const mongoose = require("mongoose");
// const posts = require("./post")
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
  

  module.exports = mongoose.model("Post", PostScheme)