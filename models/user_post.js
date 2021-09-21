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
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
    text: {
      type: String,
      required: true,
    },
             }]
});
const Post = mongoose.model("Post", PostScheme);


const UserScheme = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    // unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  posts :[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }
  ]
});
const User = mongoose.model("User", UserScheme);


module.exports = { User, Post };
