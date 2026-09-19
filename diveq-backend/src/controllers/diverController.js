const Diver = require("../models/Diver");
const Mission = require("../models/Mission");
const demoDivers = require("../data/demoDivers");

// Add a diver to a mission
const createDiver = async (req, res) => {
  try {
    const {
      missionId,
      name,
      age,
      experienceYears,
      certification,
      baselineHeartRate,
      baselineOxygenLevel,
    } = req.body;

    if (
      !missionId ||
      !name ||
      age === undefined ||
      experienceYears === undefined ||
      !certification ||
      baselineHeartRate === undefined ||
      baselineOxygenLevel === undefined
    ) {
      return res.status(400).json({
        message: "Please fill all diver fields",
      });
    }

    // Check whether the mission exists
    const mission = await Mission.findById(missionId);

    if (!mission) {
      return res.status(404).json({
        message: "Mission not found",
      });
    }

    // Create diver
    const diver = await Diver.create({
      missionId,
      name,
      age,
      experienceYears,
      certification,
      baselineHeartRate,
      baselineOxygenLevel,
    });

    res.status(201).json({
      message: "Diver added successfully",
      diver,
    });
  } catch (error) {
    console.error("Create diver error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// Get all divers for a mission
const getMissionDivers = async (req, res) => {
  try {
    const { missionId } = req.params;

    // Check whether the mission exists
    const mission = await Mission.findById(missionId);

    if (!mission) {
      return res.status(404).json({
        message: "Mission not found",
      });
    }

    const divers = await Diver.find({ missionId });

    res.status(200).json({
      count: divers.length,
      divers,
    });
  } catch (error) {
    console.error("Get mission divers error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};


const getDemoDiver = async (req, res) => {
  try {
    const { index } = req.params;

    const diver = demoDivers[Number(index)];

    if (!diver) {
      return res.status(404).json({
        message: "Demo diver not found",
      });
    }

    res.status(200).json(diver);
  } catch (error) {
    console.error(
      "Get demo diver error:",
      error.message
    );

    res.status(500).json({
      message: "Failed to fetch demo diver",
      error: error.message,
    });
  }
};


module.exports = {
  createDiver,
  getMissionDivers,
  getDemoDiver,
};