const express = require("express");
const router = express.Router();
const ExpressError = require("../utility/ExpressError");
const catchAsync = require("../utility/catchAsync");
const { User, Post } = require("../models/user_post");

router.get("/", (req, res) => {
  res.render("login");
});

router.post(
  "/user",
  catchAsync(async (req, res, next) => {
    const newUser = new User(req.body);
    await newUser.save();
    console.log(newUser);
    res.redirect("/");
    // res.json(newUser);
  })
);
// User_Show
router.get('/user_show/:id', async(req, res) => {
  const {id} = req.params;
  const user = await User.findById({id});
  res.render("user_show", {user})
})

// User Show
router.get('/create_post/:id', async(req, res)=> {
  const {id} = req.body
  const users = await User.findById({id});
  res.render("post", {users})
})

router.post("/user/:id/posts", catchAsync(async(req, res, next) => {
const {id} = req.params;  
const user = await User.findById(id);
const { title, caption, image, comment } = req.body;
const post = new Post({title, caption, image, comment});
user.posts.push(post);
post.user = user;
await user.save();
await post.save();
res.redirect(`/user/${id}`)
}));


router.get("/users", async(req, res) => {
  const users = await User.find({});
    res.render("user.ejs", {users});
  });
  
module.exports = router;
