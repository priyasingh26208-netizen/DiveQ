const Telemetry = require("../models/Telemetry");
const { calculateRisk } = require("./riskEngine");
const { checkBatteryStatus } = require("./batteryAlert");

const updateLocation = (simulationState) => {
  let { latitude, longitude } = simulationState;

  if (simulationState.phase === "DESCENT") {
    latitude += simulationState.moveLat;
    longitude += simulationState.moveLng;
  } else if (simulationState.phase === "WORKING") {
    latitude += simulationState.moveLat * 0.35;
    longitude += simulationState.moveLng * 0.35;
  } else if (simulationState.phase === "ASCENT") {
    latitude -= simulationState.moveLat * 0.5;
    longitude -= simulationState.moveLng * 0.5;
  }

  simulationState.latitude = latitude;
  simulationState.longitude = longitude;

  return {
    latitude,
    longitude,
  };
};

const generateTelemetry = async (
  missionId,
  diver,
  simulationState,
  io
) => {
  try {
    // Current depth from the simulator state
    let depth = simulationState.depth;

    // Move the diver through a simple dive profile
    if (simulationState.phase === "DESCENT") {
      depth += 2;

      if (depth >= 30) {
        depth = 30;
        simulationState.phase = "WORKING";
      }
    } else if (simulationState.phase === "WORKING") {
      depth += Math.floor(Math.random() * 3) - 1;

      // Keep working depth around 30m
      depth = Math.max(27, Math.min(32, depth));

      // After enough readings, begin ascent
      simulationState.workingTicks += 1;

      if (simulationState.workingTicks >= 24) {
        simulationState.phase = "ASCENT";
      }
    } else if (simulationState.phase === "ASCENT") {
      depth -= 2;

      if (depth <= 0) {
        depth = 0;
        simulationState.phase = "SURFACE";
      }
    } else if (simulationState.phase === "SURFACE") {
      depth = 0;
    }

    simulationState.depth = depth;

    const location = updateLocation(simulationState);

    // Heart rate changes gradually around the diver's baseline
    const workloadEffect =
      simulationState.phase === "WORKING" ? 5 : 0;

    const heartRateVariation =
      Math.floor(Math.random() * 7) - 3;

    const heartRate = Math.max(
      50,
      diver.baselineHeartRate +
        workloadEffect +
        heartRateVariation
    );
  
    // Oxygen saturation stays close to baseline
    const oxygenVariation =
      Math.floor(Math.random() * 3);

    const oxygenSaturation = Math.max(
      90,
      diver.baselineOxygenLevel - oxygenVariation
    );

    // Respiratory rate increases slightly during working phase
    const respiratoryBase =
      simulationState.phase === "WORKING" ? 18 : 15;

    const respiratoryRate =
      respiratoryBase +
      Math.floor(Math.random() * 3); 

    const batteryLevel = Math.max(
      0,
      simulationState.batteryLevel - 1
    );

    const gasRemaining = Math.max(
      0,
      simulationState.gasRemaining - (
        simulationState.phase === "WORKING" ? 1 : 0.5
      )
    );

simulationState.gasRemaining = gasRemaining;

    simulationState.batteryLevel = batteryLevel;

    const battery = checkBatteryStatus(batteryLevel);

    // Simple environmental temperature model
    const waterTemperature = Math.max(
      12,
      20 - Math.floor(depth * 0.08)
    );

    const bodyTemperature =
      36.5 + (Math.random() * 0.4 - 0.2);

    // using the dive profile and decompression model.
    const decompressionStatus = "NORMAL";

    const telemetry = await Telemetry.create({
      missionId,
      diverId: diver._id,
      timestamp: new Date(),
      depth,
      heartRate,
      oxygenSaturation,
      respiratoryRate,
      bodyTemperature,
      waterTemperature,
      batteryLevel,
      gasRemaining,
      latitude: location.latitude,
      longitude: location.longitude,
      decompressionStatus,
    });

    const risk = calculateRisk(
        telemetry,
        diver
    );

    const previousRiskLevel = simulationState.lastRiskLevel;

    const riskChanged =
    risk.riskLevel !== previousRiskLevel;

    simulationState.lastRiskLevel = risk.riskLevel;

    io.to(`mission:${missionId}`).emit(
      "telemetry:update",
      {
        telemetry,
        risk,
        battery,
      }
    );

    if (
      battery.batteryStatus !== "NORMAL" &&
      battery.batteryStatus !== simulationState.lastBatteryStatus
    ) {
      io.to(`mission:${missionId}`).emit(
        "battery:alert",
        {
          diverId: diver._id,
          diverName: diver.name,
          batteryLevel: battery.batteryLevel,
          batteryStatus: battery.batteryStatus,
          warning: battery.warning,
          timestamp: telemetry.timestamp,
        }
      );

      console.log(
        `🔋 BATTERY ALERT | ${diver.name} | ${battery.batteryStatus} | ${battery.batteryLevel}%`
      );
    }

    simulationState.lastBatteryStatus =
      battery.batteryStatus;

    if (
    riskChanged &&
    (risk.riskLevel === "CAUTION" ||
        risk.riskLevel === "WARNING" ||
        risk.riskLevel === "CRITICAL")
    ) {

  io.to(`mission:${missionId}`).emit(
    "risk:alert",
    {
      diverId: diver._id,
      diverName: diver.name,
      riskScore: risk.riskScore,
      riskLevel: risk.riskLevel,
      warnings: risk.warnings,
      depth: telemetry.depth,
      heartRate: telemetry.heartRate,
      oxygenSaturation: telemetry.oxygenSaturation,
      respiratoryRate: telemetry.respiratoryRate,
      timestamp: telemetry.timestamp,
    }
  );

  console.log(
      `🚨 RISK ALERT | ${diver.name} | ${risk.riskLevel} | Score: ${risk.riskScore}`
    );
  };

    console.log(
      `Telemetry | ${diver.name} | Phase: ${simulationState.phase} | Depth: ${depth}m | HR: ${heartRate} | O2: ${oxygenSaturation}%`
    );

    return telemetry;
  } catch (error) {
    console.error(
      "Telemetry simulation error:",
      error.message
    );

    return null;
  }
};

module.exports = {
  generateTelemetry,
};