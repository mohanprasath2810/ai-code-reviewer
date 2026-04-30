const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

router.get("/", async (req, res) => {
  const reviews = await Review.findAll({ order: [["createdAt", "DESC"]], limit: 20 });
  res.json(reviews);
});

module.exports = router;