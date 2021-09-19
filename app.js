const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const { User, Post } = require("./models/user_post");
const ExpressError = require("./utility/ExpressError");
const catchAsync = require("./utility/catchAsync");

require("dotenv/config");

// Import Routes
const postRouter = require("./routes/post_route");
// Every time we go to post --we use postRoutes(post.js), Middleware
app.use(express.urlencoded({ extended: true }));

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/login", postRouter);

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
  console.log("DB Connected")
);

// app.post(
//   "/signup",
//   catchAsync(async (req, res, next) => {
//     const newUser = new User(req.body);
//     await newUser.save();
//     console.log(newUser);
//     res.redirect("login");
//       // res.json(newUser);
//   })
// );




app.listen(5000, () => {
  console.log("5000 is serving!!");
});


// DB_CONNECTION=mongodb+srv://Social_Media:BuRJxAvVGyTcgUUS@cluster0.nusb2.mongodb.net/myFirstDatabase?retryWrites=true"