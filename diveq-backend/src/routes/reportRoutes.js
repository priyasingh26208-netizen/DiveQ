const express = require("express");

const {
  generateMissionReport,
} = require("../controllers/reportController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/mission/:missionId", protect, generateMissionReport);

module.exports = router;