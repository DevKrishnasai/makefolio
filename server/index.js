const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const Auth = require("./routes/auth");
const Portfolio = require("./routes/portfolio");
const DeleteUser = require("./routes/deleteUser");
const Test = require("./routes/test");
// const errorHandler = require("./error");
const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.options("*", cors());

// app.use(bodyParser.json({ limit: "50mb" }));
// app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
// app.use(errorHandler);
app.use("/api/v1/auth", Auth);

app.use("/api/v1/test", Test);
app.use("/api/v1/portfolio", Portfolio);
app.use("/api/v1/deleteuser", DeleteUser);
//Db connection
const connectDB = () => {
  mongoose
    .connect(
      "mongodb+srv://portfolio:portfolio@portfolio-cluster.wr5e8hj.mongodb.net/",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
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
  res.status(200).send({
    message: "Hello server working!",
    status: 200,
  });
});

app.all("*", (req, res) => {
  res.status(404).send({
    message: "Not Found bro",
    status: 404,
  });
});
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Internal server error.", status: 500 });
});

// Server
app.listen(3001, () => {
  console.log("Server is running on port 3001");
  connectDB();
});
