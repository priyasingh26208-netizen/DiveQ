const calculateFatigue = (telemetry, diver, diveDurationMinutes = 0) => {
  let fatigueScore = 0;
  const factors = [];

  // Heart rate
  if (
    diver.baselineHeartRate &&
    telemetry.heartRate > diver.baselineHeartRate + 25
  ) {
    fatigueScore += 30;
    factors.push("Heart rate significantly above baseline");
  } else if (
    diver.baselineHeartRate &&
    telemetry.heartRate > diver.baselineHeartRate + 15
  ) {
    fatigueScore += 15;
    factors.push("Elevated heart rate");
  }

  // Respiratory rate
  if (telemetry.respiratoryRate > 25) {
    fatigueScore += 25;
    factors.push("High respiratory rate");
  } else if (telemetry.respiratoryRate > 20) {
    fatigueScore += 10;
    factors.push("Elevated respiratory rate");
  }

  // Oxygen
  if (telemetry.oxygenSaturation < 92) {
    fatigueScore += 25;
    factors.push("Low oxygen saturation");
  } else if (telemetry.oxygenSaturation < 95) {
    fatigueScore += 10;
    factors.push("Oxygen saturation below normal range");
  }

  // Dive duration
  if (diveDurationMinutes > 90) {
    fatigueScore += 20;
    factors.push("Extended dive duration");
  } else if (diveDurationMinutes > 60) {
    fatigueScore += 10;
    factors.push("Long dive duration");
  }

  // Depth
  if (telemetry.depth > 40) {
    fatigueScore += 15;
    factors.push("High operating depth");
  } else if (telemetry.depth > 30) {
    fatigueScore += 5;
    factors.push("Depth above normal working range");
  }

  fatigueScore = Math.min(fatigueScore, 100);

  let fatigueLevel = "LOW";
  let recommendation =
    "Continue monitoring diver condition.";

  if (fatigueScore >= 75) {
    fatigueLevel = "CRITICAL";
    recommendation =
      "Consider immediate supervisor intervention and evaluate diver for recovery or ascent.";
  } else if (fatigueScore >= 50) {
    fatigueLevel = "HIGH";
    recommendation =
      "Consider reducing workload and closely monitor diver condition.";
  } else if (fatigueScore >= 25) {
    fatigueLevel = "MODERATE";
    recommendation =
      "Continue close monitoring and reassess diver condition.";
  }

  return {
    fatigueScore,
    fatigueLevel,
    factors,
    recommendation,
  };
};

module.exports = {
  calculateFatigue,
};