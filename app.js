const express = require("express");
const app = express();
const { db_connection } = require("./utils/databaseCon");
const homeRouter = require('./routes/home')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/home",homeRouter);


module.exports = app;


// let stores = db_connection.collection('store').find()
// console.log(await stores.toArray())