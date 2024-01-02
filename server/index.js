const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv/config");

// Middlewares
app.use(cors());
app.options("*", cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(morgan("tiny"));

const usersRoute = require("./routes/users.js");
const deleteUserRoute = require("./routes/deleteusers.js");
const portfolioRoute = require("./routes/portfolios.js");
const testRoute = require("./routes/tests.js");

// Routes
const api = process.env.API;
app.use(`${api}/users`, usersRoute);
app.use(`${api}/deleteusers`, deleteUserRoute);
app.use(`${api}/portfolios`, portfolioRoute);
app.use(`${api}/tests`, testRoute);

// Connecting to the database
mongoose
  .connect(process.env.MONGO_DB_URL)
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
