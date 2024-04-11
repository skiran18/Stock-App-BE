const express = require("express");
const app = express();
const cors = require('cors');
const homeRouter = require('./routes/home')
const categoryRouter = require('./routes/categoryRoute')
const stockRouter = require('./routes/stockRoute')
const loginRouter= require('./routes/loginRoute')
const authRouter = require('./controllers/authController')
const {verifyToken} = require('./utils/auth')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use("/login",loginRouter);
app.use("/auth",authRouter);
app.use("/home",verifyToken,homeRouter);
app.use("/category",verifyToken,categoryRouter);
app.use("/stock",verifyToken,stockRouter);



module.exports = app;
