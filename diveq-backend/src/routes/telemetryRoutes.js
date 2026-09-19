const express = require("express");

const {
  createTelemetry,
  getDiverTelemetry,
  startSimulation,
  stopSimulation,
  getOxygenTrend,
  getHeartRateTrend,
} = require("../controllers/telemetryController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Record a telemetry reading
router.post("/", protect, createTelemetry);

// Get telemetry history for a diver
router.get("/diver/:diverId", protect, getDiverTelemetry);

// Get oxygen-trend from telemetry history for a diver
router.get("/diver/:diverId/oxygen-trend", protect, getOxygenTrend);

// Get HeartRate-trend from telemetry history for a diver
router.get("/diver/:diverId/heart-rate-trend", protect, getHeartRateTrend);

// Start telemetry simulation
router.post("/simulation/start", protect, startSimulation);

// Stop telemetry simulation
router.post("/simulation/stop", protect, stopSimulation);

module.exports = router;