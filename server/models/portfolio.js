const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  logoName: {
    type: String,
    require: true,
  },
  fullName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  about: {
    type: String,
    require: true,
  },
  tags: [{ key: String, value: String }],
  techs: [{ key: String, value: String }],
  tools: [{ key: String, value: String }],
  projects: [
    {
      title: String,
      description: String,
      github_live_link: String,
      github_repo_link: String,
      tech_stack: [{ key: String, value: String }],
      image_url: String,
    },
  ],
  links: {
    github: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  portfolioId: {
    type: String,
    unique: true,
    require: true,
  },
  hero_url: String,
  resume_url: String,
});

module.exports = mongoose.model("Portfolios", portfolioSchema);
