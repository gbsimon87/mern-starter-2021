const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const app = express();
const BUILD_PATH = path.join(__dirname, "../../", "build");

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

module.exports = app;
