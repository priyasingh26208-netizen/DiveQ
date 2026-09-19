const express = require("express");

const {
  createDiveEvent,
  getDiverTimeline,
  getMissionActivity,
  getDiverDiveLog,
} = require("../controllers/diveEventController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Create a dive timeline event
router.post("/", protect, createDiveEvent);

// Get timeline for a diver
router.get("/diver/:diverId", protect, getDiverTimeline);
router.get("/mission/:missionId/activity", protect, getMissionActivity);
router.get("/diver/:diverId/dive-log", protect, getDiverDiveLog);

module.exports = router;