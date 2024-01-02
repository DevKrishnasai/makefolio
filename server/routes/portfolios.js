const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Portfolio = require("../models/portfolio");

router.post("/checkId", async (req, res) => {
  try {
    const { portfolioId, email } = req.body;
    const user = await User.findOne({ portfolioId });
    if (!user) {
      const updatedUser = await User.findOneAndUpdate(
        { email: email },
        { portfolioId: portfolioId },
        { new: true }
      );
      if (!updatedUser) {
        return res
          .status(400)
          .send({ message: "User not found.", status: 400 });
      }
      res
        .status(200)
        .send({ message: "User updated successfully.", status: 200 });
    } else {
      res.status(400).send({ message: "Already id taken", status: 400 });
    }
  } catch (error) {
    console.error("Error during fetching:", error.message);
    res.status(500).send({ message: "Internal server error.", status: 500 });
  }
});

router.post("/portfoliodata", async (req, res) => {
  try {
    const {
      logoName,
      fullName,
      email,
      about,
      tags,
      techs,
      tools,
      projects,
      links,
      portfolioId,
      hero_url,
    } = req.body;

    const newPortfolio = Portfolio({
      logoName,
      fullName,
      email,
      about,
      tags,
      techs,
      tools,
      projects,
      links: {
        github: links.github,
        linkedin: links.linkedin,
        instagram: links.instagram,
      },
      portfolioId,
      hero_url,
    });
    await newPortfolio.save();
    res
      .status(201)
      .send({ message: "Portfolio data saved successfully.", status: 201 });
  } catch (error) {
    console.error("Error during saving:", error.message);
    res.status(500).send({ message: "Internal server error.", status: 500 });
  }
});

router.get("/portfolio/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await Portfolio.findOne({ portfolioId: id });
    // const userObject = Portfolio.toObject({ getters: true, virtuals: false });
    // const portfolioData = Portfolio.findOne({ portfolioId: id });
    if (!user) {
      return res
        .status(404)
        .send({ message: "Portfolio not found.", status: 404 });
    }
    res.status(200).send({ message: "found portfolio", user, status: 200 });
  } catch (error) {
    console.error("Error during fetching:", error.message);
    res.status(500).send({ message: "Internal server error.", status: 500 });
  }
});

module.exports = router;
