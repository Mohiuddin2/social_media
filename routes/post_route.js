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
// User_Show
router.get(
  "/user_show/:id",
  catchAsync(async (req, res) => {
    // if(!mongoose.Types.ObjectId.isValid(id))
    // return false;
    // const { id } = req.params;
    // console.log(`ID: ${id}`);
    // const user = await User.findById({id});
    const user = await User.findById(req.params.id);
    console.log(`User: ${user}`);
    res.render("user_show", { user });
  })
);

// User Show user list
router.get("/create_post/:id", async (req, res) => {
  const { id } = req.body;
  const users = await User.findById({ id });
  res.render("post", { users });
});

// Posts Not Applied yet
router.post(
  "/user/:id/posts",
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);
    const { title, caption, image, comment } = req.body;
    const post = new Post({ title, caption, image, comment });
    user.posts.push(post);
    post.user = user;
    await user.save();
    await post.save();
    res.redirect(`/user/${id}`);
  })
);

// Show UserList it works

router.get("/users", catchAsync(async (req, res) => {
  const users = await User.find({});
  res.render("user", { users });
}));

module.exports = router;
