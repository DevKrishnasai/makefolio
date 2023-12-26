const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv/config");

const errorHandler = require("./helpers/error-handler.js");

app.use(cors());
app.options("*", cors());

// Middlewares
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(morgan("tiny"));
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
app.use(errorHandler);

const api = "/api/v1";
const usersRoute = require("./routes/users");
const deleteUserRoute = require("./routes/deleteusers");
const portfolioRoute = require("./routes/portfolios");
const testRoute = require("./routes/tests");

// Routes

app.use(`${api}/users`, usersRoute);
app.use(`${api}/deleteusers`, deleteUserRoute);
app.use(`${api}/portfolios`, portfolioRoute);
app.use(`${api}/tests`, testRoute);

const dbConfig = require("./config/database.config.js");

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
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
app.listen(5000 || 4000, () => {
  console.log("Server is listening on port 5000");
});
