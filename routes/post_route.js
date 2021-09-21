const express = require("express");
const router = express.Router();
const ExpressError = require("../utility/ExpressError");
const catchAsync = require("../utility/catchAsync");
const { User, Post } = require("../models/user_post");

router.get("/", (req, res) => {
  res.render("login");
});
// to Create User it works..
router.post(
  "/user",
  catchAsync(async (req, res, next) => {
    const newUser = new User(req.body);
    await newUser.save();
    console.log(newUser);
    res.redirect("/users");
    // res.json(newUser);
  })
);
// User_details show.. it works
router.get(
  "/user_show/:id",
  catchAsync(async (req, res) => {
    const user = await User.findById(req.params.id);
    console.log(`User: ${user}`);
    res.render("user_show", { user });
  })
);

// User Show user list not applyet yet
router.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.render("post", { user });
});

// Create Posts Not Applied yet
router.post(
  "/c_post/:id/posts",
  catchAsync(async (req, res, next) => {
    console.log("Entered");
    const { id } = req.params;
    const user = await User.findById(id);
    // const { title, caption, image, comment } = req.body;
    const post = new Post(req.body.post);
    user.posts.push(post);
    post.user = user;
    await user.save();
    await post.save();
    console.log(post);
    res.send("Post Created");
  })
);

// Show UserList it works

router.get(
  "/users",
  catchAsync(async (req, res) => {
    const users = await User.find({});
    res.render("user", { users });
  })
);

module.exports = router;
