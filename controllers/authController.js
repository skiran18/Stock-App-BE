const express = require("express");
const auth = require("../utils/auth");
const router = express.Router();

router.route("/").post(auth.reFreshToken);

router.route("/refreshToken").post(auth.reFreshToken)
router.route("/logout").delete(auth.logout)

module.exports = router;