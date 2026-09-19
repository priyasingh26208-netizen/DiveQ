const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const missionRoutes = require("./routes/missionRoutes");
const diverRoutes = require("./routes/diverRoutes");
const telemetryRoutes = require("./routes/telemetryRoutes");
const emergencyRoutes = require("./routes/emergencyRoutes");
const assessmentRoutes = require("./routes/assessmentRoutes");
const fatigueRoutes = require("./routes/fatigueRoutes");
const diveEventRoutes = require("./routes/diveEventRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const missionAnalyticsRoutes = require("./routes/missionAnalyticsRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  transports: ["polling", "websocket"],
});

app.set("io", io);

app.use(cors());
app.use(express.json());

// Connect MongoDB
connectDB();

// Authentication routes
app.use("/api/auth", authRoutes);
app.use("/api/missions", missionRoutes);
app.use("/api/divers", diverRoutes);
app.use("/api/telemetry", telemetryRoutes);
app.use("/api/emergencies", emergencyRoutes);
app.use("/api/assessments", assessmentRoutes);
app.use("/api/fatigue", fatigueRoutes);
app.use("/api/dive-events", diveEventRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/mission-analytics", missionAnalyticsRoutes);
app.use("/api/reports", reportRoutes);


app.get("/", (req, res) => {
  res.json({
    message: "DiveQ Backend is running 🚀",
  });
});

io.on("connection", (socket) => {
  console.log("Supervisor connected:", socket.id);

  socket.on("joinMission", (missionId) => {
    socket.join(`mission:${missionId}`);

    console.log(
      `Supervisor ${socket.id} joined mission ${missionId}`
    );
  });

  socket.on("disconnect", () => {
    console.log("Supervisor disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`DiveQ server running on port ${PORT}`);
});