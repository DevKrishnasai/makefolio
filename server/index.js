import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import Users from "./models/user.js";
import Portfolios from "./models/portfolio.js";

dotenv.config();
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//Db connection
const connectDB = () => {
  mongoose
    .connect(process.env.DB)
    .then(() => console.log("Connect to database"))
    .catch((err) => console.log(err));
};

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected again");
});
mongoose.connection.on("error", (err) => {
  console.log("MongoDB error", err);
});
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

app.get("/", (req, res) => {
  res.write("API is working");
});

app.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if the user already exists
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .send({ message: "Email already exists.", status: 400 });
    }

    // Create a new user
    const newUser = new Users({
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

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Fetch the user by email
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(400).send({ message: "User not found.", status: 400 });
    }

    // Compare passwords
    if (user.password !== password) {
      return res
        .status(401)
        .send({ message: "Invalid credentials.", status: 401 });
    }

    // If login is successful
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

app.post("/deleteUser", async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user by emailID and delete
    const deletedUser = await Users.findOneAndDelete({ email });

    if (!deletedUser) {
      return res.status(404).send({ message: "User not found.", status: 404 });
    }

    res.status(200).send({
      message: "User deleted successfully.",
      status: 200,
    });
  } catch (error) {
    console.error("Error during user deletion:", error.message);
    res.status(500).send({ message: "Internal server error.", status: 500 });
  }
});

app.post("/checkId", async (req, res) => {
  try {
    const { portfolioId, email } = req.body;

    // Find a user with the given portfolioId
    const user = await Users.findOne({ portfolioId });

    if (!user) {
      // If id doesn't exist, update the user details with the provided email
      const updatedUser = await Users.findOneAndUpdate(
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

app.post("/portfoliodata", async (req, res) => {
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

    // Create the new portfolio instance
    const newPortfolio = new Portfolios({
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

    // Save the new portfolio to the database
    await newPortfolio.save();

    res
      .status(201)
      .send({ message: "Portfolio data saved successfully.", status: 201 });
  } catch (error) {
    console.error("Error during saving:", error.message);
    res.status(500).send({ message: "Internal server error.", status: 500 });
  }
});

app.get("/portfolio/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const portfolioData = await Portfolios.findOne({ portfolioId: id });
    if (!portfolioData) {
      return res
        .status(404)
        .send({ message: "Portfolio not found.", status: 404 });
    }
    res
      .status(200)
      .send({ message: "found portfolio", portfolioData, status: 200 });
  } catch (error) {
    console.error("Error during fetching:", error.message);
    res.status(500).send({ message: "Internal server error.", status: 500 });
  }
});

//server
app.listen(process.env.PORT, () => {
  console.log("Server is running on port 5000");
  connectDB();
});

export default app;
