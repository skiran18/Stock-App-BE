const express = require("express");
const stockController = require("../controllers/stockController");
const router = express.Router();

router.route("/").get(stockController.getStock);

module.exports = router;