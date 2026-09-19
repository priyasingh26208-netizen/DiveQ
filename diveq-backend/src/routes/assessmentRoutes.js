const express = require("express");

const {
  createAssessment,
  getDiverAssessment,
} = require("../controllers/assessmentController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createAssessment);

router.get("/diver/:diverId", protect, getDiverAssessment);

module.exports = router;