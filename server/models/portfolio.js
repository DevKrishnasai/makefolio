import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
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
    unique: true,
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
});

export default mongoose.model("Portfolios", portfolioSchema);
