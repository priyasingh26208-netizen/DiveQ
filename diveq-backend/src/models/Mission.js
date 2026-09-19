const mongoose = require("mongoose");

const missionSchema = new mongoose.Schema(
  {
    missionName: {
      type: String,
      required: true,
      trim: true,
    },

    waterBody: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    missionType: {
      type: String,
      required: true,
      trim: true,
    },

    missionDate: {
      type: Date,
      required: true,
    },

    plannedMaximumDepth: {
      type: Number,
      required: true,
    },

    expectedDuration: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["PLANNED", "ACTIVE", "COMPLETED", "CANCELLED"],
      default: "PLANNED",
    },

    startedAt: {
      type: Date,
      default: null,
    },

    completedAt: {
      type: Date,
      default: null,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Mission", missionSchema);