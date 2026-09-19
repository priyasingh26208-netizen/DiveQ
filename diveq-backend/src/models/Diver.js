const mongoose = require("mongoose");

const diverSchema = new mongoose.Schema(
  {
    missionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mission",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    age: {
      type: Number,
      required: true,
    },

    experienceYears: {
      type: Number,
      required: true,
    },

    certification: {
      type: String,
      required: true,
      trim: true,
    },

    baselineHeartRate: {
      type: Number,
      required: true,
    },

    baselineOxygenLevel: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["READY", "DIVING", "SURFACED", "EMERGENCY"],
      default: "READY",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Diver", diverSchema);