const express = require("express");

const {
  createDiver,
  getMissionDivers,
  getDemoDiver,
} = require("../controllers/diverController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Add a diver to a mission
router.post("/", protect, createDiver);

// Get all divers belonging to a mission
router.get("/mission/:missionId", protect, getMissionDivers);

// Get demo diver data
router.get("/demo/:index", protect, getDemoDiver);

module.exports = router;