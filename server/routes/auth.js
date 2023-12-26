const express = require("express");
const router = express();
const User = require("../models/user");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "User not found.", status: 400 });
    }
    if (user.password !== password) {
      return res
        .status(401)
        .send({ message: "Invalid credentials.", status: 401 });
    }
    res.status(200).send({
      message: "Login successful.",
      status: 200,
      portfolioId: user["portfolioId"],
    });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).send({ message: "Internal server error.", status: 500 });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .send({ message: "Email already exists.", status: 400 });
    }
    const newUser = new User({
      name,
      email,
      password,
    });
    await newUser.save();
    res
      .status(201)
      .send({ message: "Account created successfully.", status: 201 });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(500).send({ message: "Internal server error.", status: 500 });
  }
});

module.exports = router;
