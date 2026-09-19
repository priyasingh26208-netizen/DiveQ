const Mission = require("../models/Mission");
const Diver = require("../models/Diver");
const Telemetry = require("../models/Telemetry");
const Emergency = require("../models/Emergency");
const Fatigue = require("../models/Fatigue");

const getMissionDashboard = async (req, res) => {
  try {
    const { missionId } = req.params;

    // Get mission
    const mission = await Mission.findById(missionId);

    if (!mission) {
      return res.status(404).json({
        message: "Mission not found",
      });
    }

    // Get all divers of mission
    const divers = await Diver.find({ missionId }).sort({ createdAt: 1 });

    // Get latest telemetry + fatigue for every diver
    const diversWithData = await Promise.all(
      divers.map(async (diver) => {
        const latestTelemetry = await Telemetry.findOne({
          missionId,
          diverId: diver._id,
        }).sort({ timestamp: -1 });

        const latestFatigue = await Fatigue.findOne({
          missionId,
          diverId: diver._id,
        }).sort({ timestamp: -1 });

        return {
          diver,
          latestTelemetry,
          latestFatigue,
        };
      })
    );

    // Get recent emergencies
    const emergencies = await Emergency.find({ missionId })
      .populate("diverId", "name")
      .sort({ triggeredAt: -1 })
      .limit(10);

    res.status(200).json({
      mission,
      divers: diversWithData,
      emergencies,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch dashboard data",
      error: error.message,
    });
  }
};

module.exports = {
  getMissionDashboard,
};