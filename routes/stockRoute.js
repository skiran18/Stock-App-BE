const express = require("express");
const stockController = require("../controllers/stockController");
const router = express.Router();

router.route("/").get(stockController.getStock);
router.route("/:storecode").get(stockController.getStoreStock);
router.route("/addstock/newstock").post(stockController.addNewStock);


module.exports = router;