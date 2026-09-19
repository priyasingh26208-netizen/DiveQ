const Diver = require("../models/Diver");
const { generateTelemetry } = require("./telemetrySimulator");
const activeSimulations = new Map();

const startTelemetrySimulation = async (missionId, io) => {
  try {
    const missionKey = missionId.toString();

    // Prevent duplicate simulations
    if (activeSimulations.has(missionKey)) {
      return {
        alreadyRunning: true,
      };
    }

    const divers = await Diver.find({ missionId });

    if (divers.length === 0) {
      return {
        noDivers: true,
      };
    }

    // Give every diver their own dive state
    const diverStates = new Map();

    
    const startingLocations = [
  {
    latitude: 18.923,
    longitude: 72.819,
    moveLat: 0.00003,
    moveLng: 0.00002,
  },
  {
    latitude: 18.926,
    longitude: 72.823,
    moveLat: -0.00002,
    moveLng: 0.00003,
  },
  {
    latitude: 18.920,
    longitude: 72.828,
    moveLat: 0.00002,
    moveLng: -0.00003,
  },
  {
    latitude: 18.918,
    longitude: 72.816,
    moveLat: -0.00003,
    moveLng: -0.00002,
  },
];

divers.forEach((diver, index) => {
  const location =
    startingLocations[index % startingLocations.length];

  diverStates.set(diver._id.toString(), {
    depth: 0,
    phase: "DESCENT",
    workingTicks: 0,
    lastRiskLevel: "NORMAL",
    batteryLevel: 100,
    gasRemaining: 100,
    lastBatteryStatus: "NORMAL",

    latitude: location.latitude,
    longitude: location.longitude,
    moveLat: location.moveLat,
    moveLng: location.moveLng,
  });
});

    console.log(
      `Telemetry simulation started for ${divers.length} diver(s).`
    );

    const interval = setInterval(async () => {
      for (const diver of divers) {
        const state = diverStates.get(
          diver._id.toString()
        );

        await generateTelemetry(
          missionId,
          diver,
          state,
          io
        );
      }
    }, 5000);

    activeSimulations.set(missionKey, interval);

    return {
      started: true,
    };
  } catch (error) {
    console.error(
      "Start telemetry simulation error:",
      error.message
    );

    return {
      error: true,
    };
  }
};

const stopTelemetrySimulation = (missionId) => {
  const missionKey = missionId.toString();

  const interval = activeSimulations.get(missionKey);

  if (!interval) {
    return false;
  }

  clearInterval(interval);

  activeSimulations.delete(missionKey);

  console.log(
    `Telemetry simulation stopped for mission ${missionId}.`
  );

  return true;
};

module.exports = {
  startTelemetrySimulation,
  stopTelemetrySimulation,
};