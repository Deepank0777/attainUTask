// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config");
const routes = require("./routes");
const { handleError } = require("./helpers/error");

// Database connection (MongoDB example)
const mongoURL = `mongodb://${config.MONGO_USERNAME}:${config.MONGO_PASSWORD}@${config.MONGO_HOSTNAME}:${config.MONGO_PORT}/${config.MONGO_DB}?authSource=admin`;
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

// App initialization
const app = express();

// ODM/ORM Initialization (Mongoose example)
mongoose
  .connect(mongoURL, mongoOptions)
  .then(() => {
    console.log("MongoDB is connected!");
    app.emit("mongoConnected");
  })
  .catch((err) => {
    console.log(err);
  });

// Configurations
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Welcome route
app.get("/", (req, res) => {
  res.send("Welcome to Post Service Backend!");
});

// Routes
app.use("/api", routes);

// eslint-disable-next-line
app.use((err, req, res, next) => {
  console.log(err);
  if (err.statusCode) handleError(err, res);
  else
    res.status(500).json({
      success: false,
      message: "Internal server error",
      statusCode: 500,
    });
});

// Starting server
app.listen(config.APP_PORT, () => {
  console.log(`Listening on port ${config.APP_PORT}`);
});

module.exports = app;
