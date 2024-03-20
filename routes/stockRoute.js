const express = require("express");
const stockController = require("../controllers/stockController");
const router = express.Router();

router.route("/").get(stockController.getStock);
router.route("/:storecode").get(stockController.getStoreStock);
router.route("/addstock/newstock").post(stockController.addNewStock);
router.route("/addstock/existingstock").post(stockController.addExistingStock);
router.route("/removestock/existingstock").post(stockController.decrementStock);

module.exports = router;