const mongoose = require("mongoose");

const telemetrySchema = new mongoose.Schema(
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

    timestamp: {
      type: Date,
      default: Date.now,
      required: true,
    },

    depth: {
      type: Number,
      required: true,
    },

    heartRate: {
      type: Number,
      required: true,
    },

    oxygenSaturation: {
      type: Number,
      required: true,
    },

    respiratoryRate: {
      type: Number,
      required: true,
    },

    bodyTemperature: {
       type: Number, 
       required: true 
    },

    waterTemperature: {
      type: Number,
      required: true,
    },

    batteryLevel: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    gasRemaining: {
      type: Number,
      min: 0,
      max: 100,
    },

    latitude: {
      type: Number,
      required: true,
    },

    longitude: {
      type: Number,
      required: true,
    },

    decompressionStatus: {
      type: String,
      enum: ["NORMAL", "CAUTION", "WARNING"],
      default: "NORMAL",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Telemetry", telemetrySchema);