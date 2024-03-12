const express = require("express");
const stockController = require("../controllers/stockController");
const router = express.Router();

router.route("/").get(stockController.getStock);
router.route("/:storecode").get(stockController.getStoreStock);

module.exports = router;