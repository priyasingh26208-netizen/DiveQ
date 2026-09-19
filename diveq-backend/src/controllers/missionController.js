const Mission = require("../models/Mission");
const demoMissions = require("../data/demoMissions");

const createMission = async (req, res) => {
  try {
    const {
      missionName,
      waterBody,
      location,
      missionType,
      missionDate,
      plannedMaximumDepth,
      expectedDuration,
    } = req.body;

    // Check required fields
    if (
      !missionName ||
      !waterBody ||
      !location ||
      !missionType ||
      !missionDate ||
      plannedMaximumDepth === undefined ||
      expectedDuration === undefined
    ) {
      return res.status(400).json({
        message: "Please fill all mission fields",
      });
    }

    // Create mission
    const mission = await Mission.create({
      missionName,
      waterBody,
      location,
      missionType,
      missionDate,
      plannedMaximumDepth,
      expectedDuration,
      createdBy: req.user.userId,
    });

    res.status(201).json({
      message: "Mission created successfully",
      mission,
    });
  } catch (error) {
    console.error("Create mission error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};


const getDemoMission = async (req, res) => {
  try {
    const { index } = req.params;

    const mission = demoMissions[Number(index)];

    if (!mission) {
      return res.status(404).json({
        message: "Demo mission not found",
      });
    }

    res.status(200).json(mission);
  } catch (error) {
    console.error(
      "Get demo mission error:",
      error.message
    );

    res.status(500).json({
      message: "Failed to fetch demo mission",
      error: error.message,
    });
  }
};

const getMissions = async (req, res) => {
  try {
    const missions = await Mission.find({
      createdBy: req.user.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      count: missions.length,
      missions,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch missions",
      error: error.message,
    });
  }
};

const getMissionProgress = async (req, res) => {
  try {
    const { missionId } = req.params;

    const mission = await Mission.findById(missionId);

    if (!mission) {
      return res.status(404).json({
        message: "Mission not found",
      });
    }

    const DiveEvent = require("../models/DiveEvent");

    const events = await DiveEvent.find({ missionId }).sort({
      timestamp: 1,
    });

    const totalDivers = await require("../models/Diver").countDocuments({
      missionId,
    });

    const completedEvents = events.filter((event) =>
      [
        "CHECKPOINT_COMPLETED",
        "SURFACED",
      ].includes(event.eventType)
    ).length;

    const startedDivers = new Set(
      events
        .filter((event) => event.eventType === "DIVE_STARTED")
        .map((event) => event.diverId.toString())
    ).size;

    const surfacedDivers = new Set(
      events
        .filter((event) => event.eventType === "SURFACED")
        .map((event) => event.diverId.toString())
    ).size;

    let progress = 0;

    if (totalDivers > 0) {
      progress = Math.round(
        ((startedDivers + surfacedDivers) /
          (totalDivers * 2)) *
          100
      );
    }

    progress = Math.min(progress, 100);

    res.status(200).json({
      missionId: mission._id,
      missionName: mission.missionName,
      status: mission.status,
      progress,
      totalDivers,
      startedDivers,
      surfacedDivers,
      completedEvents,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to calculate mission progress",
      error: error.message,
    });
  }
};

const startMission = async (req, res) => {
  try {
    const { missionId } = req.params;

    const mission = await Mission.findById(missionId);

    if (!mission) {
      return res.status(404).json({
        message: "Mission not found",
      });
    }

    if (mission.status === "ACTIVE") {
      return res.status(400).json({
        message: "Mission is already active",
      });
    }

    if (mission.status === "COMPLETED") {
      return res.status(400).json({
        message: "Completed mission cannot be started again",
      });
    }

    mission.status = "ACTIVE";
    mission.startedAt = new Date();

    await mission.save();

    res.status(200).json({
      message: "Mission started successfully",
      mission: {
        id: mission._id,
        name: mission.missionName,
        status: mission.status,
        startedAt: mission.startedAt,
      },
    });
  } catch (error) {
    console.error(
      "Start mission error:",
      error.message
    );

    res.status(500).json({
      message: "Failed to start mission",
      error: error.message,
    });
  }
};

const completeMission = async (req, res) => {
  try {
    const { missionId } = req.params;

    const mission = await Mission.findById(missionId);

    if (!mission) {
      return res.status(404).json({
        message: "Mission not found",
      });
    }

    if (mission.status !== "ACTIVE") {
      return res.status(400).json({
        message: "Only active missions can be completed",
      });
    }

    mission.status = "COMPLETED";
    mission.completedAt = new Date();

    await mission.save();

    res.status(200).json({
      message: "Mission completed successfully",
      mission: {
        id: mission._id,
        name: mission.missionName,
        status: mission.status,
        startedAt: mission.startedAt,
        completedAt: mission.completedAt,
      },
    });
  } catch (error) {
    console.error(
      "Complete mission error:",
      error.message
    );

    res.status(500).json({
      message: "Failed to complete mission",
      error: error.message,
    });
  }
};

module.exports = {
  createMission,
  getDemoMission,
  getMissions,
  getMissionProgress,
  startMission,
  completeMission,
};