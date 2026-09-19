const Fatigue = require("../models/Fatigue");
const Mission = require("../models/Mission");
const Diver = require("../models/Diver");
const Telemetry = require("../models/Telemetry");
const { calculateFatigue } = require("../services/fatigueEngine");

const calculateDiverFatigue = async (req, res) => {
  try {
    const { missionId, diverId } = req.body;

    if (!missionId || !diverId) {
      return res.status(400).json({
        message: "Mission ID and Diver ID are required",
      });
    }

    const mission = await Mission.findById(missionId);

    if (!mission) {
      return res.status(404).json({
        message: "Mission not found",
      });
    }

    const diver = await Diver.findById(diverId);

    if (!diver) {
      return res.status(404).json({
        message: "Diver not found",
      });
    }

    if (diver.missionId.toString() !== missionId.toString()) {
      return res.status(400).json({
        message: "Diver does not belong to this mission",
      });
    }

    const latestTelemetry = await Telemetry.findOne({
      missionId,
      diverId,
    }).sort({ timestamp: -1 });

    if (!latestTelemetry) {
      return res.status(404).json({
        message: "No telemetry found for this diver",
      });
    }

    const firstTelemetry = await Telemetry.findOne({
      missionId,
      diverId,
    }).sort({ timestamp: 1 });

    const diveDurationMinutes =
      firstTelemetry
        ? Math.max(
            0,
            (latestTelemetry.timestamp - firstTelemetry.timestamp) /
              (1000 * 60)
          )
        : 0;

    const fatigue = calculateFatigue(
      latestTelemetry,
      diver,
      diveDurationMinutes
    );

    const fatigueRecord = await Fatigue.create({
      missionId,
      diverId,
      fatigueScore: fatigue.fatigueScore,
      fatigueLevel: fatigue.fatigueLevel,
      factors: fatigue.factors,
      recommendation: fatigue.recommendation,
      timestamp: latestTelemetry.timestamp,
    });

    res.status(201).json({
      message: "Fatigue assessment calculated successfully",
      fatigue: fatigueRecord,
    });
  } catch (error) {
    console.error(
      "Calculate fatigue error:",
      error.message
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getDiverFatigue = async (req, res) => {
  try {
    const { diverId } = req.params;

    const diver = await Diver.findById(diverId);

    if (!diver) {
      return res.status(404).json({
        message: "Diver not found",
      });
    }

    const fatigueRecords = await Fatigue.find({ diverId })
      .sort({ timestamp: -1 });

    res.status(200).json({
      count: fatigueRecords.length,
      fatigueRecords,
    });
  } catch (error) {
    console.error(
      "Get fatigue error:",
      error.message
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  calculateDiverFatigue,
  getDiverFatigue,
};