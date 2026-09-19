const mongoose = require("mongoose");

const fatigueSchema = new mongoose.Schema(
  {
    missionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mission",
      required: true,
    },

    diverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Diver",
      required: true,
    },

    fatigueScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    fatigueLevel: {
      type: String,
      enum: ["LOW", "MODERATE", "HIGH", "CRITICAL"],
      required: true,
    },

    factors: {
      type: [String],
      default: [],
    },

    recommendation: {
      type: String,
      default: null,
    },

    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Fatigue", fatigueSchema);