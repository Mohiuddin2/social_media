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
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});
const User = mongoose.model("User", UserScheme);
module.exports = User;
