const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");

// Import Routes
const postRoute = require("./routes/posts");
// Every time we go to post --we use postRoutes(post.js), Middleware
app.use("/post", postRoute);

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
  console.log("DB Connected")
);

app.listen(5000, () => {
  console.log("5000 is serving!!");
});
