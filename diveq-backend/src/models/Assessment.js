const mongoose = require("mongoose");

const assessmentSchema = new mongoose.Schema(
  {
    diverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Diver",
      required: true,
    },

    weight: {
      type: Number,
      required: true,
    },

    height: {
      type: Number,
      required: true,
    },

    bloodPressure: {
      type: String,
      required: true,
      trim: true,
    },

    bodyTemperature: {
      type: Number,
      required: true,
    },

    assessmentDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Assessment", assessmentSchema);