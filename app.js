const express = require("express");
const app = express();
// const { db_connection } = require("./utils/databaseCon");
const homeRouter = require('./routes/home')
const categoryRouter = require('./routes/categoryRoute')
const stockRouter = require('./routes/stockRoute')
const loginRouter= require('./routes/loginRoute')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var corsOptions = function(req, res, next){ 
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
     next();
}
app.use(corsOptions);

app.use("/login",loginRouter);
app.use("/home",homeRouter);
app.use("/category",categoryRouter);
app.use("/stock",stockRouter);


module.exports = app;
