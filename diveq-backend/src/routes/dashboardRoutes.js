const express = require("express");
const { getMissionDashboard } = require("../controllers/dashboardController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/mission/:missionId", protect, getMissionDashboard);

module.exports = router;