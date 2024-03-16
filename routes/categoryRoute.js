const express = require("express");
const categoryController = require("../controllers/categoryController");
const router = express.Router();

router.route("/").get(categoryController.getCategories).post(categoryController.addCategory);
router.route("/:storecode").get(categoryController.getStoreCategories);



module.exports = router;