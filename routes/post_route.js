const express = require("express");
const router = express.Router();
const ExpressError = require("../utility/ExpressError");
const catchAsync = require("../utility/catchAsync");
const { User, Post } = require("../models/user_post");

router.get("/", (req, res) => {
  res.render("login");
});

router.post(
  "/signup",
  catchAsync(async (req, res, next) => {
    const newUser = new User(req.body);
    await newUser.save();
    console.log(newUser);
    res.redirect("/");
    // res.json(newUser);
  })
);


module.exports = router;
