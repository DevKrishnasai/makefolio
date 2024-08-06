const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const cron = require("node-cron");
const axios = require("axios");
const app = express();
require("dotenv/config");

// Middlewares
app.use(cors());
app.options("*", cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(morgan("dev"));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Internal server error.",
    status: 500,
  });
});

cron.schedule("*/1 * * * *", async () => {
  try {
    // const response = await axios.get(
    //   `http://localhost:${process.env.PORT || 5000}`
    // );
    const response = await axios.get(process.env.URL);
    console.log("Server pinged successfully:", response.data);
  } catch (error) {
    console.error("Error pinging server:", error.message);
  }
});

const usersRoute = require("./routes/users.js");
const deleteUserRoute = require("./routes/deleteusers.js");
const portfolioRoute = require("./routes/portfolios.js");
const testRoute = require("./routes/tests.js");

// Routes
const api = process.env.API_PATH;
app.use(`${api}/users`, usersRoute);
app.use(`${api}/deleteusers`, deleteUserRoute);
app.use(`${api}/portfolios`, portfolioRoute);
app.use(`${api}/tests`, testRoute);

// Connecting to the database
mongoose
  .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.send("server working man!!!!!!");
});

// listen for requests
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is listening on port ${process.env.PORT || 5000}`);
});
