const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

router.get("/", async (req, res) => {
  try {
    const reviews = await Review.findAll({
      order: [["createdAt", "DESC"]],
      limit: 20,
    });

    // Parse the stored JSON string back to an object for each review
    const parsed = reviews.map((r) => ({
      id: r.id,
      language: r.language,
      code: r.code,
      review: (() => {
        try {
          return JSON.parse(r.review);
        } catch {
          return r.review;
        }
      })(),
      createdAt: r.createdAt,
    }));

    res.json(parsed);
  } catch (err) {
    console.error("History fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch review history", details: err.message });
  }
});

module.exports = router;
