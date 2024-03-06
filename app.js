const express = require("express");
const app = express();
const { db_con } = require("./utils/databaseCon");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/home", function (req, res, next) {
  console.log(db_con);
  const db = db_con.db("stockapp");
  const collection = db.collection("store");
  res.send(collection);
});

module.exports = app;
