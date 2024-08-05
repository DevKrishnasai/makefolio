const express = require("express");
const router = express.Router();

const User = require("../models/user");
const Portfolio = require("../models/portfolio");

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
      portfolioId: name + Math.floor(Math.random() * 1000),
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

router.put("/updateUser", async (req, res) => {
  try {
    const { updatedPortfolioId, email, password, portfolioId } = req.body;
    console.log("updateUser", req.body);

    const user = await User.findOne({ portfolioId });
    let portfolio = await Portfolio.findOne({ portfolioId });

    if (!user) {
      return res.status(404).send({ message: "user not exists.", status: 400 });
    }

    if (!portfolio) {
      // create portfolio
      const newPortfolio = Portfolio({
        logoName: "",
        fullName: "",
        email: "",
        about: "",
        tags: [],
        techs: [],
        tools: [],
        projects: [],
        links: {
          github: "",
          linkedin: "",
          instagram: "",
        },
        portfolioId: "",
        hero_url: "",
      });
      await newPortfolio.save();
      portfolio = newPortfolio;
    }

    user.email = email;
    user.password = password;
    if (updatedPortfolioId) {
      user.portfolioId = updatedPortfolioId;
      portfolio.portfolioId = updatedPortfolioId;
    }
    await user.save();
    await portfolio.save();

    res.status(200).send({
      message: "Accounts updated successfully.",
      status: 200,
      ...user,
    });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(500).send({ message: "Internal server error.", status: 500 });
  }
});

router.get("/getUsers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (id === process.env.ADMIN_PASS) {
      const users = await User.find({});
      console.log("Users fetched successfully:", users);
      res
        .status(200)
        .send({ message: "Users fetched successfully.", status: 200, users });
    }
    res.status(401).send({ message: "Unauthorized.", status: 401 });
  } catch (error) {
    console.error("Error getting users:", error.message);
    res.status(500).send({ message: "Internal server error.", status: 500 });
  }
});

module.exports = router;
