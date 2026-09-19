require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const connectDB = require("../config/db");
const Mission = require("../models/Mission");
const Diver = require("../models/Diver");
const User = require("../models/User");

const seedDemoData = async () => {
  try {
    await connectDB();

    // =========================
    // DEMO USER
    // =========================

    const hashedPassword = await bcrypt.hash(
      "DemoPassword123!",
      10
    );

    let demoUser = await User.findOne({
      email: "demo@diveq.com",
    });

    if (!demoUser) {
      demoUser = await User.create({
        name: "DiveQ Demo Supervisor",
        email: "demo@diveq.com",
        organization: "DiveQ Demo Operations",
        role: "SUPERVISOR",
        password: hashedPassword,
      });

      console.log("Demo supervisor created ✅");
    } else {
      demoUser.password = hashedPassword;
      await demoUser.save();

      console.log("Demo supervisor password updated ✅");
    }

    // =========================
    // DEMO MISSION
    // =========================

    let mission = await Mission.findOne({
      missionName: "DiveQ Demo Mission",
    });

    if (!mission) {
      mission = await Mission.create({
        missionName: "DiveQ Demo Mission",
        waterBody: "Arabian Sea",
        location: "Mumbai Offshore",
        missionType: "Pipeline Inspection",
        missionDate: new Date("2026-09-20"),
        plannedMaximumDepth: 50,
        expectedDuration: 60,
        status: "PLANNED",
        createdBy: demoUser._id,
      });

      console.log("Demo mission created ✅");
    } else {
      mission.createdBy = demoUser._id;
      await mission.save();

      console.log("Demo mission already exists — linked to demo supervisor ✅");
    }

    // =========================
    // DEMO DIVERS
    // =========================

    const demoDivers = [
      {
        name: "Alex Carter",
        age: 34,
        experienceYears: 9,
        certification: "Commercial Diver",
        baselineHeartRate: 72,
        baselineOxygenLevel: 98,
      },
      {
        name: "Daniel Brooks",
        age: 41,
        experienceYears: 14,
        certification: "Saturation Diver",
        baselineHeartRate: 68,
        baselineOxygenLevel: 97,
      },
      {
        name: "Ryan Mitchell",
        age: 29,
        experienceYears: 6,
        certification: "Commercial Diver",
        baselineHeartRate: 75,
        baselineOxygenLevel: 98,
      },
      {
        name: "Michael Anderson",
        age: 37,
        experienceYears: 11,
        certification: "Offshore Diver",
        baselineHeartRate: 70,
        baselineOxygenLevel: 97,
      },
    ];

    for (const diverData of demoDivers) {
      const existingDiver = await Diver.findOne({
        name: diverData.name,
        missionId: mission._id,
      });

      if (!existingDiver) {
        await Diver.create({
          ...diverData,
          missionId: mission._id,
          status: "READY",
        });

        console.log(`${diverData.name} created ✅`);
      } else {
        console.log(`${diverData.name} already exists ℹ️`);
      }
    }

    // =========================
    // SHOW RESULT
    // =========================

    console.log("\nDemo data seeded successfully 🎉");
    console.log("Demo User:", demoUser.email);
    console.log("Mission ID:", mission._id.toString());

    const divers = await Diver.find({
      missionId: mission._id,
    });

    divers.forEach((diver) => {
      console.log(
        `${diver.name} → ${diver._id.toString()}`
      );
    });

    await mongoose.connection.close();

    console.log("MongoDB connection closed.");
  } catch (error) {
    console.error(
      "Demo seed error ❌:",
      error.message
    );

    process.exit(1);
  }
};

seedDemoData();