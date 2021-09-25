const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const ejsLint = require("ejs-lint")

require("dotenv/config");

// Import Routes
const postRouter = require("./routes/post_route");

// Every time we go to post --we use postRoutes(post.js), Middleware
app.use(express.urlencoded({ extended: true }));

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/", postRouter);

// Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("DB Connected")
);

// app.all("*", (req, res, next) => {
//   next(new ExpressError("Page Not Found", 404));
// });

// // default error handler..
// app.use((err, req, res, next) => {
//   const { statusCode = 500 } = err;
//   if (!err.message) err.message = "Saomething Went Wrong";
//   res.status(statusCode).send("error", { err });
// });

app.listen(5000, () => {
  console.log("5000 is serving!!");
});

// DB_CONNECTION=mongodb+srv://Social_Media:BuRJxAvVGyTcgUUS@cluster0.nusb2.mongodb.net/myFirstDatabase?retryWrites=true"
