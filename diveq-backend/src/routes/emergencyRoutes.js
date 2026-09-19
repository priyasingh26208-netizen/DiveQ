const express = require("express");

const {
  triggerEmergency,
  getMissionEmergencies,
  acknowledgeEmergency,
  resolveEmergency,
} = require("../controllers/emergencyController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Trigger an emergency action
router.post("/", protect, triggerEmergency);

// Get emergency history for a mission
router.get("/mission/:missionId", protect, getMissionEmergencies);
router.patch("/:emergencyId/acknowledge", protect, acknowledgeEmergency);
router.patch("/:emergencyId/resolve", protect, resolveEmergency);

module.exports = router;