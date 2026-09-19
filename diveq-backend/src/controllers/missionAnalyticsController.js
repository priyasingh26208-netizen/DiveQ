const Mission = require("../models/Mission");
const Diver = require("../models/Diver");
const Telemetry = require("../models/Telemetry");
const DiveEvent = require("../models/DiveEvent");
const Emergency = require("../models/Emergency");

const getMissionAnalytics = async (req, res) => {
  try {
    const { missionId } = req.params;

    const mission = await Mission.findById(missionId);

    if (!mission) {
      return res.status(404).json({
        message: "Mission not found",
      });
    }

    const divers = await Diver.find({ missionId });

    const telemetry = await Telemetry.find({ missionId }).sort({
      timestamp: 1,
    });

    const events = await DiveEvent.find({ missionId });

    const emergencies = await Emergency.find({ missionId });

    const endTime = mission.completedAt
        ? new Date(mission.completedAt).getTime()
        : Date.now();

        const durationMinutes =
        mission.startedAt
            ? Math.floor(
                (endTime - new Date(mission.startedAt).getTime()) /
                (1000 * 60)
            )
            : 0;

    const maximumDepth =
      telemetry.length > 0
        ? Math.max(...telemetry.map((item) => item.depth))
        : 0;

    const averageHeartRate =
      telemetry.length > 0
        ? Math.round(
            telemetry.reduce(
              (sum, item) => sum + item.heartRate,
              0
            ) / telemetry.length
          )
        : 0;

    const averageOxygen =
      telemetry.length > 0
        ? Number(
            (
              telemetry.reduce(
                (sum, item) => sum + item.oxygenSaturation,
                0
              ) / telemetry.length
            ).toFixed(1)
          )
        : 0;

    res.status(200).json({
      mission: {
        id: mission._id,
        name: mission.missionName,
        location: mission.location,
        waterBody: mission.waterBody,
        missionType: mission.missionType,
        status: mission.status,
        startedAt: mission.startedAt,
        completedAt: mission.completedAt
      },

      analytics: {
        totalDivers: divers.length,
        totalTelemetryRecords: telemetry.length,
        totalEvents: events.length,
        totalEmergencies: emergencies.length,
        maximumDepth,
        averageHeartRate,
        averageOxygenSaturation: averageOxygen,
        durationMinutes,
      },
    });
  } catch (error) {
    console.error(
      "Get mission analytics error:",
      error.message
    );

    res.status(500).json({
      message: "Failed to fetch mission analytics",
      error: error.message,
    });
  }
};

module.exports = {
  getMissionAnalytics,
};