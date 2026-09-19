const Emergency = require("../models/Emergency");
const Mission = require("../models/Mission");
const Diver = require("../models/Diver");

const triggerEmergency = async (req, res) => {
  try {
    const {
      missionId,
      diverId,
      action,
    } = req.body;

    if (!missionId || !diverId || !action) {
      return res.status(400).json({
        message: "Mission ID, Diver ID and action are required",
      });
    }

    const allowedActions = [
      "RECALL_DIVER",
      "REQUEST_BACKUP",
      "EMERGENCY_SOS",
    ];

    if (!allowedActions.includes(action)) {
      return res.status(400).json({
        message: "Invalid emergency action",
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

    const emergency = await Emergency.create({
      missionId,
      diverId,
      action,
    });

    const io = req.app.get("io");

    io.to(`mission:${missionId}`).emit(
      "emergency:alert",
      {
        emergencyId: emergency._id,
        missionId,
        diverId,
        diverName: diver.name,
        action,
        status: emergency.status,
        triggeredAt: emergency.triggeredAt,
      }
    );

    console.log(
      `🚨 EMERGENCY ACTION | ${diver.name} | ${action}`
    );

    res.status(201).json({
      message: "Emergency action triggered successfully",
      emergency,
    });
  } catch (error) {
    console.error(
      "Trigger emergency error:",
      error.message
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getMissionEmergencies = async (req, res) => {
  try {
    const { missionId } = req.params;

    const mission = await Mission.findById(missionId);

    if (!mission) {
      return res.status(404).json({
        message: "Mission not found",
      });
    }

    const emergencies = await Emergency.find({ missionId })
      .populate("diverId", "name")
      .sort({ triggeredAt: -1 });

    res.status(200).json({
      count: emergencies.length,
      emergencies,
    });
  } catch (error) {
    console.error(
      "Get mission emergencies error:",
      error.message
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};

const acknowledgeEmergency = async (req, res) => {
  try {
    const { emergencyId } = req.params;

    const emergency = await Emergency.findById(emergencyId);

    if (!emergency) {
      return res.status(404).json({
        message: "Emergency not found",
      });
    }

    if (emergency.status !== "TRIGGERED") {
      return res.status(400).json({
        message: "Only triggered emergencies can be acknowledged",
      });
    }

    emergency.status = "ACKNOWLEDGED";

    await emergency.save();

    const io = req.app.get("io");

    io.to(`mission:${emergency.missionId}`).emit(
      "emergency:status-update",
      {
        emergencyId: emergency._id,
        status: emergency.status,
      }
    );

    res.status(200).json({
      message: "Emergency acknowledged successfully",
      emergency,
    });
  } catch (error) {
    console.error(
      "Acknowledge emergency error:",
      error.message
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};

const resolveEmergency = async (req, res) => {
  try {
    const { emergencyId } = req.params;

    const emergency = await Emergency.findById(emergencyId);

    if (!emergency) {
      return res.status(404).json({
        message: "Emergency not found",
      });
    }

    if (
      emergency.status !== "TRIGGERED" &&
      emergency.status !== "ACKNOWLEDGED"
    ) {
      return res.status(400).json({
        message: "Emergency is already resolved",
      });
    }

    emergency.status = "RESOLVED";
    emergency.resolvedAt = new Date();

    await emergency.save();

    const io = req.app.get("io");

    io.to(`mission:${emergency.missionId}`).emit(
      "emergency:status-update",
      {
        emergencyId: emergency._id,
        status: emergency.status,
        resolvedAt: emergency.resolvedAt,
      }
    );

    res.status(200).json({
      message: "Emergency resolved successfully",
      emergency,
    });
  } catch (error) {
    console.error(
      "Resolve emergency error:",
      error.message
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  triggerEmergency,
  getMissionEmergencies,
  acknowledgeEmergency,
  resolveEmergency,
};