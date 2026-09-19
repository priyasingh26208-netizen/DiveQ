const express = require("express");

const {
  calculateDiverFatigue,
  getDiverFatigue,
} = require("../controllers/fatigueController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Calculate fatigue for a diver
router.post("/calculate", protect, calculateDiverFatigue);

// Get fatigue history for a diver
router.get("/diver/:diverId", protect, getDiverFatigue);

module.exports = router;