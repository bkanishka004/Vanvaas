const express = require("express");
const router = express.Router();
const Campground = require("../models/Camp");
const { summarizeReviews } = require("../utils/ai");

router.get("/summary/:id", async (req, res) => {
  try {
    const camp = await Campground.findById(req.params.id).populate("reviews");

    const reviewTexts = camp.reviews.map((r) => r.body);

    const summary = await summarizeReviews(reviewTexts);

    res.json({ summary });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
