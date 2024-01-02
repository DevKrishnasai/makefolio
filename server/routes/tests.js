const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", (req, res) => {
  res.send("Api testing is working......(This is a get method)");
});
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(500).send({ message: "Internal server error.", status: 500 });
  }
});

module.exports = router;
