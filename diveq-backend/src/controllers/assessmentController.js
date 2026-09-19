const Assessment = require("../models/Assessment");
const Diver = require("../models/Diver");

const createAssessment = async (req, res) => {
  try {
    const {
      diverId,
      weight,
      height,
      bloodPressure,
      bodyTemperature,
    } = req.body;

    if (
      !diverId ||
      weight === undefined ||
      height === undefined ||
      !bloodPressure ||
      bodyTemperature === undefined
    ) {
      return res.status(400).json({
        message: "Please fill all assessment fields",
      });
    }

    const diver = await Diver.findById(diverId);

    if (!diver) {
      return res.status(404).json({
        message: "Diver not found",
      });
    }

    const assessment = await Assessment.create({
      diverId,
      weight,
      height,
      bloodPressure,
      bodyTemperature,
    });

    res.status(201).json({
      message: "Pre-dive assessment saved successfully",
      assessment,
    });
  } catch (error) {
    console.error(
      "Create assessment error:",
      error.message
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getDiverAssessment = async (req, res) => {
  try {
    const { diverId } = req.params;

    const diver = await Diver.findById(diverId);

    if (!diver) {
      return res.status(404).json({
        message: "Diver not found",
      });
    }

    const assessments = await Assessment.find({ diverId })
      .sort({ assessmentDate: -1 });

    res.status(200).json({
      count: assessments.length,
      assessments,
    });
  } catch (error) {
    console.error(
      "Get assessment error:",
      error.message
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  createAssessment,
  getDiverAssessment,
};