const { io } = require("socket.io-client");

const MISSION_ID = "6aac3958c39028d0582efcf3";

const socket = io("http://localhost:5000", {
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("Connected to DiveQ Socket.IO:", socket.id);

  socket.emit("joinMission", MISSION_ID);

  console.log(
    `Joined mission room: mission:${MISSION_ID}`
  );
});

socket.on("telemetry:update", (data) => {
  console.log("\n==============================");
  console.log("LIVE TELEMETRY RECEIVED");
  console.log("==============================");

  console.log("Telemetry:", data.telemetry);

  console.log("\nRisk Assessment:", data.risk);

  console.log("==============================\n");
});

socket.on("disconnect", (reason) => {
  console.log("Socket disconnected:", reason);
});

socket.on("connect_error", (error) => {
  console.error(
    "Socket connection error:",
    error.message
  );
});

socket.on("risk:alert", (alert) => {
  console.log("\n🚨🚨🚨 DIVEQ RISK ALERT 🚨🚨🚨");

  console.log({
    diverName: alert.diverName,
    riskLevel: alert.riskLevel,
    riskScore: alert.riskScore,
    depth: alert.depth,
    heartRate: alert.heartRate,
    oxygenSaturation: alert.oxygenSaturation,
    respiratoryRate: alert.respiratoryRate,
    warnings: alert.warnings,
    timestamp: alert.timestamp,
  });

  console.log("🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨\n");
});

socket.on("battery:alert", (alert) => {
  console.log("\n🔋🔋🔋 BATTERY ALERT 🔋🔋🔋");
  console.log(alert);
  console.log("🔋🔋🔋🔋🔋🔋🔋🔋🔋\n");
});

socket.onAny((event, ...args) => {
  console.log("SOCKET EVENT RECEIVED:", event, args);
});

socket.on("emergency:alert", (alert) => {
  console.log("\n🚨🚨🚨 EMERGENCY ALERT 🚨🚨🚨");

  console.log({
    diverName: alert.diverName,
    action: alert.action,
    status: alert.status,
    missionId: alert.missionId,
    diverId: alert.diverId,
    triggeredAt: alert.triggeredAt,
  });

  console.log("🚨🚨🚨🚨🚨🚨🚨🚨🚨\n");
});