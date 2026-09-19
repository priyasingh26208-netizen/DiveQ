const mongoose = require("mongoose");

const diveEventSchema = new mongoose.Schema(
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

    eventType: {
      type: String,
      enum: [
        "DIVE_STARTED",
        "DEPTH_REACHED",
        "INSPECTION_STARTED",
        "CHECKPOINT_COMPLETED",
        "ASCENT_STARTED",
        "SURFACED",
        "CUSTOM",
      ],
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: null,
    },

    depth: {
      type: Number,
      default: null,
    },

    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DiveEvent", diveEventSchema);