const express = require("express");
const router = express.Router({ mergeParams: true });
const ExpressError = require("../utility/ExpressError");
const catchAsync = require("../utility/catchAsync");
const User = require("../models/user_model");
const Post = require("../models/post_model");
const Comment = require("../models/comment_model");
const { findById } = require("../models/user_model");

router.get("/", (req, res) => {
  res.render("login");
});
// Show UserList it works
router.get(
  "/users",
  catchAsync(async (req, res) => {
    const users = await User.find({});
    const post = await Post.find({});
    res.render("user", { users, post });
  })
);
// to Create User it works..
router.post(
  "/user",
  catchAsync(async (req, res, next) => {
    const newUser = new User(req.body);
    await newUser.save();
    // console.log(newUser);
    res.redirect("/users");
    // res.json(newUser);
  })
);
//  Edit route
router.get(
  "/user/:uId/post/:pId/edit",
  catchAsync(async (req, res) => {
    const {uId, pId} = req.params;
    const user = await User.findById(uId)
    const post = await Post.findById(pId)
    console.log(req.params);
    res.render("edit", {user, post});
  })
);

// Create Posts it works
router.post(
  "/user/:id/posts",
  catchAsync(async (req, res, next) => {
    // console.log("Entered");
    const { id } = req.params;
    const user = await User.findById(id);
    const post = new Post(req.body.post);
    // console.log(`Post ${post}`);
    user.posts.push(post);
    // post.user = user;
    await user.save();
    await post.save();
    // console.log(post);
    res.redirect(`/user/${user._id}`); ///11111111
  })
);
// update eidit
router.put("/user/:uId/post/:pId", catchAsync(async(req, res) => {
  const { uId, pId } = req.params;
  const user = await User.findById(uId);
  const post = await Post.findByIdAndUpdate(pId, {...req.body.post})
  res.redirect(`/user/${user._id}`)
}))
// Delete done
router.delete(
  "/user/:uId/post/:pId",
  catchAsync(async (req, res) => {
    // console.log(req.params);
    const { uId, pId } = req.params;
    await User.findByIdAndUpdate(uId, { $pull: { posts: pId } });
    await Post.findByIdAndDelete(pId);
    res.redirect(`/user/${uId}`);
  })
);

// User Show user it works .. to shwo post creaet comments
router.get(
  "/user/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id).populate("posts");
    res.render("post", { user });
  })
);
// User Show user it works .. to shwo post creaet comments
router.get(
  "/user/:uId/:pId/:cId",
  catchAsync(async (req, res) => {
    console.log(req.params);
    const { uId } = req.params;
    const user = await User.findById(uId).populate("posts");
    const { pId } = req.params;
    const post = await Post.findById(pId).populate("comments");
    res.render("post_com", { user, post });
  })
);

// Cooment Routes is under construction
router.post(
  "/user/:userId/post/:postId/comments",
  catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    const user = await User.findById(userId);
    const { postId } = req.params;
    const post = await Post.findById(postId);
    // console.log(req.params);
    // const { text_com } = req.body;
    const comment = new Comment(req.body); ///
    // console.log(`NewComment: ${comment}`);
    post.comments.push(comment);
    // newComment.post = post;
    await user.save();
    await post.save();
    await comment.save();
    res.redirect(`/user/${user.id}/${post.id}/${comment.id}`);
  })
);

module.exports = router;
