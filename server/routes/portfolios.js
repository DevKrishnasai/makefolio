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

router.get("/checkId/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findOne({ portfolioId: id });

    if (!user) {
      return res.status(201).send({ message: "id available", status: 201 });
    }

    res.status(401).send({ message: "id not available", status: 401 });
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

router.put("/portfoliodata", async (req, res) => {
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

    // const updatedPortfolio = await Portfolio.findOneAndUpdate(
    //   { portfolioId: portfolioId },
    //   { $set: updateFields },
    //   {
    //     new: true,
    //     runValidators: true,
    //   }
    // );

    let updatedPortfolio = await Portfolio.findOne({ portfolioId });

    if (!updatedPortfolio) {
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
      return res
        .status(201)
        .send({ message: "Portfolio data saved successfully.", status: 201 });
    }

    updatedPortfolio.logoName = logoName;
    updatedPortfolio.fullName = fullName;
    updatedPortfolio.email = email;
    updatedPortfolio.about = about;
    updatedPortfolio.tags = tags;
    updatedPortfolio.techs = techs;
    updatedPortfolio.tools = tools;
    updatedPortfolio.projects = projects;
    updatedPortfolio.links = links;
    updatedPortfolio.hero_url = hero_url;

    await updatedPortfolio.save();

    res.status(201).json({
      message: "Portfolio data updated successfully.",
      updatedPortfolio,
      status: 201,
    });
  } catch (error) {
    console.error("Error during updating:", error.message);
    res.status(500).json({
      message: "Internal server error.",
      status: 500,
    });
  }
});

router.get("/portfolio/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await Portfolio.findOne({ portfolioId: id });
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

router.get("/updateData/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const portfolio = await Portfolio.findOne({ portfolioId: id }).select(
      "-_id -__v"
    );
    if (!portfolio) {
      return res
        .status(404)
        .send({ message: "Portfolio not found.", status: 404 });
    }
    res.status(200).send({ message: "got portfolio", portfolio, status: 200 });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error.", status: 500 });
  }
});

router.get("/getPortfolios", async (req, res) => {
  try {
    const portfolios = await Portfolio.find();
    if (!portfolios) {
      return res
        .status(404)
        .send({ message: "Portfolios not found.", status: 404 });
    }
    res
      .status(200)
      .send({ message: "got portfolios", portfolios, status: 200 });
  } catch (error) {
    console.error("Error during fetching:", error.message);
    res.status(500).send({ message: "Internal server error.", status: 500 });
  }
});

module.exports = router;
