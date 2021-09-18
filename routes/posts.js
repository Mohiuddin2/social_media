const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("A Social Media App");
  }); 
  




module.exports = router;