const express = require("express");

const {
  createMission,
  getDemoMission,
  getMissions,
  getMissionProgress,
  startMission,
  completeMission,
} = require("../controllers/missionController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Create a normal mission
router.post("/", protect, createMission);
router.get("/", protect, getMissions);
router.patch("/:missionId/start", protect, startMission);
router.patch("/:missionId/complete", protect, completeMission);
router.get("/:missionId/progress", protect, getMissionProgress);
// Get demo mission data
router.get("/demo/:index", protect, getDemoMission);


module.exports = router;