const calculateRisk = (telemetry, diver) => {
  let riskScore = 0;
  const warnings = [];

  // Oxygen saturation
  if (telemetry.oxygenSaturation < 92) {
    riskScore += 40;
    warnings.push("Low oxygen saturation");
  } else if (telemetry.oxygenSaturation < 95) {
    riskScore += 20;
    warnings.push("Oxygen saturation below baseline range");
  }

  // Heart rate
  if (telemetry.heartRate > 120) {
    riskScore += 35;
    warnings.push("High heart rate");
  } else if (telemetry.heartRate > 105) {
    riskScore += 15;
    warnings.push("Elevated heart rate");
  }

  // Respiratory rate
  if (telemetry.respiratoryRate > 25) {
    riskScore += 25;
    warnings.push("High respiratory rate");
  } else if (telemetry.respiratoryRate > 20) {
    riskScore += 10;
    warnings.push("Elevated respiratory rate");
  }

  // Depth
  if (telemetry.depth > 40) {
    riskScore += 25;
    warnings.push("High operating depth");
  } else if (telemetry.depth > 30) {
    riskScore += 10;
    warnings.push("Depth above normal working range");
  }

  // Compare with diver baseline
  if (
    diver.baselineHeartRate &&
    telemetry.heartRate > diver.baselineHeartRate + 25
  ) {
    riskScore += 15;
    warnings.push("Heart rate significantly above diver baseline");
  }

  if (
    diver.baselineOxygenLevel &&
    telemetry.oxygenSaturation <
      diver.baselineOxygenLevel - 3
  ) {
    riskScore += 15;
    warnings.push("Oxygen level significantly below diver baseline");
  }

  // Determine overall risk
  let riskLevel = "NORMAL";

  if (riskScore >= 70) {
    riskLevel = "CRITICAL";
  } else if (riskScore >= 45) {
    riskLevel = "WARNING";
  } else if (riskScore >= 20) {
    riskLevel = "CAUTION";
  }

  return {
    riskScore,
    riskLevel,
    warnings,
  };
};

module.exports = {
  calculateRisk,
};