const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();

const indexRouter = require("./routes/index");
const BUILD_PATH = path.join(__dirname, "../../", "build");
const uri = process.env.DB_HOST;

const app = express();
app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(BUILD_PATH, { index: false }));

app.use("/api", indexRouter);
app.use("/*", (req, res, next) => {
  res.sendFile(path.join(BUILD_PATH, "index.html"));
});

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

module.exports = app;
