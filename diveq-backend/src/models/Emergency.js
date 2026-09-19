const mongoose = require("mongoose");

const emergencySchema = new mongoose.Schema(
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

    action: {
      type: String,
      enum: [
        "RECALL_DIVER",
        "REQUEST_BACKUP",
        "EMERGENCY_SOS",
      ],
      required: true,
    },

    status: {
      type: String,
      enum: ["TRIGGERED", "ACKNOWLEDGED", "RESOLVED"],
      default: "TRIGGERED",
    },

    triggeredAt: {
      type: Date,
      default: Date.now,
    },

    resolvedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Emergency", emergencySchema);