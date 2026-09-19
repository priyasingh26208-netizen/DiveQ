const Telemetry = require("../models/Telemetry");
const Mission = require("../models/Mission");
const Diver = require("../models/Diver");
const {
  startTelemetrySimulation,
  stopTelemetrySimulation,
} = require("../services/runTelemetrySimulator");

const createTelemetry = async (req, res) => {
  try {
    const {
      missionId,
      diverId,
      timestamp,
      depth,
      heartRate,
      oxygenSaturation,
      respiratoryRate,
      bodyTemperature,
      waterTemperature,
      batteryLevel,
      decompressionStatus,
    } = req.body;

    // Check required fields
    if (
      !missionId ||
      !diverId ||
      depth === undefined ||
      heartRate === undefined ||
      oxygenSaturation === undefined ||
      respiratoryRate === undefined ||
      bodyTemperature === undefined ||
      waterTemperature === undefined ||
      batteryLevel === undefined
    ) {
      return res.status(400).json({
        message: "Please fill all telemetry fields",
      });
    }

    // Check mission exists
    const mission = await Mission.findById(missionId);

    if (!mission) {
      return res.status(404).json({
        message: "Mission not found",
      });
    }

    // Check diver exists
    const diver = await Diver.findById(diverId);

    if (!diver) {
      return res.status(404).json({
        message: "Diver not found",
      });
    }

    // Make sure diver belongs to this mission
    if (diver.missionId.toString() !== missionId.toString()) {
      return res.status(400).json({
        message: "Diver does not belong to this mission",
      });
    }

    // Create telemetry reading
    const telemetry = await Telemetry.create({
      missionId,
      diverId,
      timestamp: timestamp || new Date(),
      depth,
      heartRate,
      oxygenSaturation,
      respiratoryRate,
      bodyTemperature,
      waterTemperature,
      batteryLevel,
      decompressionStatus,
    });

    res.status(201).json({
      message: "Telemetry recorded successfully",
      telemetry,
    });
  } catch (error) {
    console.error("Create telemetry error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getDiverTelemetry = async (req, res) => {
  try {
    const { diverId } = req.params;

    const diver = await Diver.findById(diverId);

    if (!diver) {
      return res.status(404).json({
        message: "Diver not found",
      });
    }

    const telemetry = await Telemetry.find({ diverId })
      .sort({ timestamp: 1 });

    res.status(200).json({
      count: telemetry.length,
      telemetry,
    });
  } catch (error) {
    console.error("Get diver telemetry error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};


const startSimulation = async (req, res) => {
  try {
    const { missionId } = req.body;

    if (!missionId) {
      return res.status(400).json({
        message: "Mission ID is required",
      });
    }

    const mission = await Mission.findById(missionId);

    if (!mission) {
      return res.status(404).json({
        message: "Mission not found",
      });
    }

    const divers = await Diver.find({ missionId });

    if (divers.length === 0) {
      return res.status(400).json({
        message: "No divers found for this mission",
      });
    }

    const io = req.app.get("io");

    const result = await startTelemetrySimulation(
    missionId,
    io
    );

    if (result.alreadyRunning) {
      return res.status(400).json({
        message: "Telemetry simulation is already running",
        missionId,
      });
    }

    if (result.error) {
      return res.status(500).json({
        message: "Failed to start telemetry simulation",
      });
    }

    res.status(200).json({
      message: "Telemetry simulation started successfully",
      missionId,
      diverCount: divers.length,
    });
  } catch (error) {
    console.error(
      "Start simulation error:",
      error.message
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};

const stopSimulation = async (req, res) => {
  try {
    const { missionId } = req.body;

    if (!missionId) {
      return res.status(400).json({
        message: "Mission ID is required",
      });
    }

    const stopped = stopTelemetrySimulation(missionId);

    if (!stopped) {
      return res.status(400).json({
        message: "No active simulation found for this mission",
      });
    }

    res.status(200).json({
      message: "Telemetry simulation stopped successfully",
      missionId,
    });
  } catch (error) {
    console.error("Stop simulation error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getOxygenTrend = async (req, res) => {
  try {
    const { diverId } = req.params;

    const telemetry = await Telemetry.find({ diverId })
      .sort({ timestamp: 1 })
      .select("timestamp oxygenSaturation depth");

    if (!telemetry.length) {
      return res.status(404).json({
        message: "No telemetry data found for this diver",
      });
    }

    const trend = telemetry.map((item) => ({
      timestamp: item.timestamp,
      oxygenSaturation: item.oxygenSaturation,
      depth: item.depth,
    }));

    res.status(200).json({
      diverId,
      count: trend.length,
      trend,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch oxygen trend",
      error: error.message,
    });
  }
};

const getHeartRateTrend = async (req, res) => {
  try {
    const { diverId } = req.params;

    const telemetry = await Telemetry.find({ diverId })
      .sort({ timestamp: 1 })
      .select("timestamp heartRate depth");

    if (!telemetry.length) {
      return res.status(404).json({
        message: "No telemetry data found for this diver",
      });
    }

    const trend = telemetry.map((item) => ({
      timestamp: item.timestamp,
      heartRate: item.heartRate,
      depth: item.depth,
    }));

    res.status(200).json({
      diverId,
      count: trend.length,
      trend,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch heart rate trend",
      error: error.message,
    });
  }
};

module.exports = {
  createTelemetry,
  getDiverTelemetry,
  startSimulation,
  stopSimulation,
  getOxygenTrend,
  getHeartRateTrend,
};