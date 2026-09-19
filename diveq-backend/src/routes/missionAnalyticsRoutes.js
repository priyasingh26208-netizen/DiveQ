const express = require("express");

const {
  getMissionAnalytics,
} = require("../controllers/missionAnalyticsController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:missionId", protect, getMissionAnalytics);

module.exports = router;
