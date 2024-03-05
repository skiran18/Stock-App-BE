const express = require("express");
const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use("/home", function (req, res, next) {
  res.send("Home page");
});

module.exports = app;
