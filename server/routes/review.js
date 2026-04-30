const express = require("express");
const router = express.Router();
const { reviewCode } = require("../controllers/reviewController");
router.post("/", reviewCode);
module.exports = router;