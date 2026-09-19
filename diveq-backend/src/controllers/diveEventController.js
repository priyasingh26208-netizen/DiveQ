const DiveEvent = require("../models/DiveEvent");
const Mission = require("../models/Mission");
const Diver = require("../models/Diver");
const Telemetry = require("../models/Telemetry");

const createDiveEvent = async (req, res) => {
  try {
    const {
      missionId,
      diverId,
      eventType,
      title,
      description,
      depth,
      timestamp,
    } = req.body;

    if (!missionId || !diverId || !eventType || !title) {
      return res.status(400).json({
        message:
          "Mission ID, Diver ID, event type and title are required",
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

    const diveEvent = await DiveEvent.create({
      missionId,
      diverId,
      eventType,
      title,
      description,
      depth:
        depth !== undefined && depth !== null
          ? depth
          : null,
      timestamp: timestamp || new Date(),
    });

    const io = req.app.get("io");

    io.to(`mission:${missionId}`).emit(
      "dive:event",
      {
        event: diveEvent,
        diverName: diver.name,
      }
    );

    console.log(
      `📍 DIVE EVENT | ${diver.name} | ${title}`
    );

    res.status(201).json({
      message: "Dive event recorded successfully",
      event: diveEvent,
    });
  } catch (error) {
    console.error(
      "Create dive event error:",
      error.message
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getDiverTimeline = async (req, res) => {
  try {
    const { diverId } = req.params;

    const diver = await Diver.findById(diverId);

    if (!diver) {
      return res.status(404).json({
        message: "Diver not found",
      });
    }

    const events = await DiveEvent.find({ diverId })
      .sort({ timestamp: 1 });

    res.status(200).json({
      count: events.length,
      events,
    });
  } catch (error) {
    console.error(
      "Get diver timeline error:",
      error.message
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getMissionActivity = async (req, res) => {
  try {
    const { missionId } = req.params;

    const events = await DiveEvent.find({ missionId })
      .populate("diverId", "name")
      .sort({ timestamp: -1 })
      .limit(20);

    const activity = events.map((event) => ({
      _id: event._id,
      diverId: event.diverId?._id,
      diverName: event.diverId?.name || "Unknown Diver",
      eventType: event.eventType,
      title: event.title,
      description: event.description,
      depth: event.depth,
      timestamp: event.timestamp,
    }));

    res.status(200).json({
      count: activity.length,
      activity,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch mission activity",
      error: error.message,
    });
  }
};

const getDiverDiveLog = async (req, res) => {
  try {
    const { diverId } = req.params;

    const diver = await Diver.findById(diverId);

    if (!diver) {
      return res.status(404).json({
        message: "Diver not found",
      });
    }

    const mission = await Mission.findById(diver.missionId);

    if (!mission) {
      return res.status(404).json({
        message: "Mission not found",
      });
    }

    const telemetry = await Telemetry.find({
      diverId,
      missionId: diver.missionId,
    }).sort({ timestamp: 1 });

    const events = await DiveEvent.find({
      diverId,
      missionId: diver.missionId,
    }).sort({ timestamp: 1 });

    const maxDepth =
      telemetry.length > 0
        ? Math.max(...telemetry.map((item) => item.depth))
        : 0;

    const averageHeartRate =
      telemetry.length > 0
        ? Math.round(
            telemetry.reduce((sum, item) => sum + item.heartRate, 0) /
              telemetry.length
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
      diver: {
        id: diver._id,
        name: diver.name,
        certification: diver.certification,
      },

      mission: {
        id: mission._id,
        name: mission.missionName,
        location: mission.location,
        waterBody: mission.waterBody,
        missionType: mission.missionType,
      },

      summary: {
        totalTelemetryRecords: telemetry.length,
        totalEvents: events.length,
        maximumDepth: maxDepth,
        averageHeartRate,
        averageOxygenSaturation: averageOxygen,
      },

      events,
      telemetry,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to generate dive log",
      error: error.message,
    });
  }
};

module.exports = {
  createDiveEvent,
  getDiverTimeline,
  getMissionActivity,
  getDiverDiveLog,
};