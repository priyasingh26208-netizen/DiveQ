import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar2 from "../components/Navbar2";

import {
  Heart,
  Waves,
  Thermometer,
  Battery,
  Gauge,
  ShieldAlert,
  User,
  Clock,
  MapPin,
  ArrowLeft,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

/* =========================================================
   MOCK DIVER DATA
   Later this can come from backend/API
========================================================= */

const diverData = {
  "DQ-101": {
    id: "DQ-101",
    name: "Priya Sharma",
    age: 26,
    experience: "5 Years",
    certification: "Advanced Rescue Diver",
    mission: "Pipeline Inspection Alpha",

    heartRate: 82,
    oxygen: 91,
    depth: 24,
    temperature: 36.8,
    battery: 88,

    riskLevel: "LOW",
    fatigueScore: 12,
    recommendation: "Continue Mission",

    graphData: [
      { time: "09:00", hr: 76 },
      { time: "09:15", hr: 79 },
      { time: "09:30", hr: 82 },
      { time: "09:45", hr: 80 },
      { time: "10:00", hr: 84 },
      { time: "10:15", hr: 82 },
    ],
  },

  "DQ-102": {
    id: "DQ-102",
    name: "Rahul Singh",
    age: 27,
    experience: "6 Years",
    certification: "Commercial Diver",
    mission: "Pipeline Inspection Alpha",

    heartRate: 108,
    oxygen: 62,
    depth: 37,
    temperature: 37.1,
    battery: 70,

    riskLevel: "MEDIUM",
    fatigueScore: 38,
    recommendation: "Monitor Closely",

    graphData: [
      { time: "09:00", hr: 84 },
      { time: "09:15", hr: 88 },
      { time: "09:30", hr: 92 },
      { time: "09:45", hr: 96 },
      { time: "10:00", hr: 101 },
      { time: "10:15", hr: 108 },
    ],
  },

  "DQ-103": {
    id: "DQ-103",
    name: "Amit Verma",
    age: 25,
    experience: "4 Years",
    certification: "Advanced Rescue Diver",
    mission: "Pipeline Inspection Alpha",

    heartRate: 78,
    oxygen: 84,
    depth: 18,
    temperature: 36.6,
    battery: 92,

    riskLevel: "LOW",
    fatigueScore: 18,
    recommendation: "Continue Monitoring",

    graphData: [
      { time: "09:00", hr: 74 },
      { time: "09:15", hr: 76 },
      { time: "09:30", hr: 78 },
      { time: "09:45", hr: 77 },
      { time: "10:00", hr: 79 },
      { time: "10:15", hr: 78 },
    ],
  },

  "DQ-104": {
    id: "DQ-104",
    name: "Neha Gupta",
    age: 30,
    experience: "7 Years",
    certification: "Commercial Diver",
    mission: "Pipeline Inspection Alpha",

    heartRate: 124,
    oxygen: 42,
    depth: 41,
    temperature: 37.4,
    battery: 61,

    riskLevel: "HIGH",
    fatigueScore: 64,
    recommendation: "Increase Monitoring",

    graphData: [
      { time: "09:00", hr: 98 },
      { time: "09:15", hr: 103 },
      { time: "09:30", hr: 108 },
      { time: "09:45", hr: 114 },
      { time: "10:00", hr: 120 },
      { time: "10:15", hr: 124 },
    ],
  },
};

/* =========================================================
   COMPONENT
========================================================= */

function Monitoring() {
  const navigate = useNavigate();
  const { diverId } = useParams();

  /*
    If URL contains a valid diver ID:
    /monitoring/DQ-103

    that diver will open.

    If no ID:
    /monitoring

    DQ-101 will be shown by default.
  */

  const currentDiver =
    diverData[diverId] || diverData["DQ-101"];

  const [diver, setDiver] = useState(currentDiver);

  const [preDive, setPreDive] = useState({
    weight: "",
    height: "",
    bloodPressure: "",
    bodyTemp: "",
  });

  /* =======================================================
     UPDATE DIVER WHEN URL CHANGES
  ======================================================= */

  useEffect(() => {
    setDiver(currentDiver);

    setPreDive({
      weight: "",
      height: "",
      bloodPressure: "",
      bodyTemp: "",
    });
  }, [diverId]);

  /* =======================================================
     FORM
  ======================================================= */

  const handleChange = (e) => {
    setPreDive({
      ...preDive,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log({
      diverId: diver.id,
      preDive,
    });

    alert("Pre-Dive Assessment Saved");
  };

  /* =======================================================
     RISK COLOR
  ======================================================= */

  const getRiskColor = () => {
    if (diver.riskLevel === "HIGH") {
      return "text-red-600";
    }

    if (diver.riskLevel === "MEDIUM") {
      return "text-orange-500";
    }

    return "text-green-600";
  };

  const getRiskBg = () => {
    if (diver.riskLevel === "HIGH") {
      return "bg-red-50 border-red-200";
    }

    if (diver.riskLevel === "MEDIUM") {
      return "bg-orange-50 border-orange-200";
    }

    return "bg-green-50 border-green-200";
  };

  return (
    <>
      <Navbar2 />

      <div className="min-h-screen bg-sky-50 p-6">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-start gap-3">

            <button
              onClick={() => navigate("/dashboard")}
              className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-sky-100 shadow-sm hover:bg-sky-50"
            >
              <ArrowLeft size={19} />
            </button>

            <div>
              <h1 className="text-4xl font-bold">
                Diver Monitoring Center
              </h1>

              <p className="text-slate-600 mt-2">
                Real-time diver supervision and safety monitoring
              </p>
            </div>

          </div>

          <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-xl border border-sky-100 shadow-sm">

            <span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse"></span>

            <span className="text-sm font-semibold text-slate-700">
              Monitoring Active
            </span>

          </div>

        </div>

        {/* =================================================
            DIVER PROFILE
        ================================================= */}

        <div className="bg-white rounded-2xl shadow-lg border border-sky-100 p-6 mb-8">

          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-5 mb-6">

            <div className="flex items-center gap-4">

              <div className="h-14 w-14 rounded-xl bg-sky-100 flex items-center justify-center text-sky-600">
                <User size={28} />
              </div>

              <div>

                <h2 className="text-2xl font-bold">
                  {diver.name}
                </h2>

                <p className="text-slate-500">
                  {diver.id}
                </p>

              </div>

            </div>

            <div
              className={`px-4 py-2 rounded-full border text-sm font-bold ${getRiskBg()} ${getRiskColor()}`}
            >
              {diver.riskLevel} RISK
            </div>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div>
              <p className="text-slate-500">Name</p>
              <h3 className="font-semibold">
                {diver.name}
              </h3>
            </div>

            <div>
              <p className="text-slate-500">ID</p>
              <h3 className="font-semibold">
                {diver.id}
              </h3>
            </div>

            <div>
              <p className="text-slate-500">Age</p>
              <h3 className="font-semibold">
                {diver.age}
              </h3>
            </div>

            <div>
              <p className="text-slate-500">
                Experience
              </p>

              <h3 className="font-semibold">
                {diver.experience}
              </h3>
            </div>

            <div>
              <p className="text-slate-500">
                Certification
              </p>

              <h3 className="font-semibold">
                {diver.certification}
              </h3>
            </div>

            <div>
              <p className="text-slate-500">
                Mission
              </p>

              <h3 className="font-semibold">
                {diver.mission}
              </h3>
            </div>

          </div>

        </div>

        {/* =================================================
            PRE-DIVE ASSESSMENT
        ================================================= */}

        <div className="bg-white rounded-2xl shadow-lg border border-sky-100 p-6 mb-8">

          <div className="flex items-center gap-2 mb-6">

            <ShieldAlert
              className="text-sky-600"
              size={24}
            />

            <h2 className="text-2xl font-bold">
              Pre-Dive Assessment
            </h2>

          </div>

          <p className="text-slate-500 mb-6">
            Enter the diver's pre-dive information before starting
            or continuing the mission.
          </p>

          <div className="grid md:grid-cols-2 gap-5">

            <input
              type="text"
              name="weight"
              placeholder="Weight (kg)"
              value={preDive.weight}
              onChange={handleChange}
              className="border border-slate-200 p-3 rounded-xl outline-none focus:border-sky-500"
            />

            <input
              type="text"
              name="height"
              placeholder="Height (cm)"
              value={preDive.height}
              onChange={handleChange}
              className="border border-slate-200 p-3 rounded-xl outline-none focus:border-sky-500"
            />

            <input
              type="text"
              name="bloodPressure"
              placeholder="Blood Pressure"
              value={preDive.bloodPressure}
              onChange={handleChange}
              className="border border-slate-200 p-3 rounded-xl outline-none focus:border-sky-500"
            />

            <input
              type="text"
              name="bodyTemp"
              placeholder="Body Temperature"
              value={preDive.bodyTemp}
              onChange={handleChange}
              className="border border-slate-200 p-3 rounded-xl outline-none focus:border-sky-500"
            />

          </div>

          <button
            onClick={handleSubmit}
            className="mt-5 bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Save Assessment
          </button>

        </div>

        {/* =================================================
            LIVE MONITORING
        ================================================= */}

        <div className="mb-8">

          <div className="flex items-center gap-2 mb-5">

            <Waves
              className="text-sky-600"
              size={25}
            />

            <h2 className="text-2xl font-bold">
              Live Monitoring
            </h2>

          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-5">

            {/* HEART RATE */}

            <div className="bg-white rounded-2xl p-5 shadow-lg border border-sky-100">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-slate-500">
                    Heart Rate
                  </p>

                  <h3 className="text-2xl font-bold">
                    {diver.heartRate} BPM
                  </h3>

                </div>

                <Heart
                  className="text-red-500"
                  size={32}
                />

              </div>

            </div>

            {/* OXYGEN */}

            <div className="bg-white rounded-2xl p-5 shadow-lg border border-sky-100">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-slate-500">
                    Oxygen
                  </p>

                  <h3 className="text-2xl font-bold">
                    {diver.oxygen}%
                  </h3>

                </div>

                <Waves
                  className="text-sky-600"
                  size={32}
                />

              </div>

            </div>

            {/* DEPTH */}

            <div className="bg-white rounded-2xl p-5 shadow-lg border border-sky-100">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-slate-500">
                    Depth
                  </p>

                  <h3 className="text-2xl font-bold">
                    {diver.depth} m
                  </h3>

                </div>

                <Gauge
                  className="text-blue-600"
                  size={32}
                />

              </div>

            </div>

            {/* TEMPERATURE */}

            <div className="bg-white rounded-2xl p-5 shadow-lg border border-sky-100">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-slate-500">
                    Temperature
                  </p>

                  <h3 className="text-2xl font-bold">
                    {diver.temperature}°C
                  </h3>

                </div>

                <Thermometer
                  className="text-orange-500"
                  size={32}
                />

              </div>

            </div>

            {/* BATTERY */}

            <div className="bg-white rounded-2xl p-5 shadow-lg border border-sky-100">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-slate-500">
                    Battery
                  </p>

                  <h3 className="text-2xl font-bold">
                    {diver.battery}%
                  </h3>

                </div>

                <Battery
                  className="text-green-600"
                  size={32}
                />

              </div>

            </div>

          </div>

        </div>

        {/* =================================================
            AI + EMERGENCY
        ================================================= */}

        <div className="grid lg:grid-cols-2 gap-6 mb-8">

          {/* AI */}

          <div className="bg-gradient-to-r from-sky-600 to-cyan-500 text-white rounded-2xl p-6 shadow-lg">

            <h2 className="text-2xl font-bold mb-5">
              AI Analysis
            </h2>

            <div className="space-y-5">

              <div>

                <p className="opacity-80">
                  Risk Level
                </p>

                <h3 className="text-3xl font-bold">
                  {diver.riskLevel}
                </h3>

              </div>

              <div>

                <p className="opacity-80">
                  Fatigue Score
                </p>

                <h3 className="text-2xl font-semibold">
                  {diver.fatigueScore}%
                </h3>

              </div>

              <div>

                <p className="opacity-80">
                  Recommendation
                </p>

                <h3 className="text-xl font-semibold">
                  {diver.recommendation}
                </h3>

              </div>

            </div>

            <button
              onClick={() =>
                navigate(`/ai`)
              }
              className="mt-6 bg-white text-sky-700 px-5 py-3 rounded-xl font-semibold hover:bg-sky-50"
            >
              Open AI Risk Analysis
            </button>

          </div>

          {/* EMERGENCY */}

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-sky-100">

            <h2 className="text-2xl font-bold mb-5">
              Emergency Controls
            </h2>

            <div className="space-y-4">

              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold">
                Recall Diver
              </button>

              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold">
                Request Backup Team
              </button>

              <button className="w-full bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-xl font-semibold">
                Emergency SOS
              </button>

            </div>

          </div>

        </div>

        {/* =================================================
            MISSION STATUS
        ================================================= */}

        <div className="grid md:grid-cols-3 gap-5 mb-8">

          <div className="bg-white rounded-2xl p-5 shadow-lg border border-sky-100">

            <div className="flex items-center gap-3">

              <Clock className="text-sky-600" />

              <div>

                <p className="text-slate-500">
                  Mission Status
                </p>

                <h3 className="font-bold">
                  ACTIVE
                </h3>

              </div>

            </div>

          </div>

          <div className="bg-white rounded-2xl p-5 shadow-lg border border-sky-100">

            <div className="flex items-center gap-3">

              <MapPin className="text-sky-600" />

              <div>

                <p className="text-slate-500">
                  Diver Location
                </p>

                <h3 className="font-bold">
                  Underwater Zone A
                </h3>

              </div>

            </div>

          </div>

          <div className="bg-white rounded-2xl p-5 shadow-lg border border-sky-100">

            <div className="flex items-center gap-3">

              <ShieldAlert className="text-green-600" />

              <div>

                <p className="text-slate-500">
                  System Status
                </p>

                <h3 className="font-bold text-green-600">
                  MONITORING
                </h3>

              </div>

            </div>

          </div>

        </div>

        {/* =================================================
            TIMELINE
        ================================================= */}

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-sky-100 mb-8">

          <h2 className="text-2xl font-bold mb-6">
            Dive Timeline
          </h2>

          <div className="space-y-5">

            <div className="flex gap-4">

              <div className="w-3 h-3 rounded-full bg-green-500 mt-2"></div>

              <div>

                <h3 className="font-semibold">
                  Dive Started
                </h3>

                <p className="text-slate-500">
                  09:00 AM
                </p>

              </div>

            </div>

            <div className="flex gap-4">

              <div className="w-3 h-3 rounded-full bg-blue-500 mt-2"></div>

              <div>

                <h3 className="font-semibold">
                  Reached 20m Depth
                </h3>

                <p className="text-slate-500">
                  09:15 AM
                </p>

              </div>

            </div>

            <div className="flex gap-4">

              <div className="w-3 h-3 rounded-full bg-cyan-500 mt-2"></div>

              <div>

                <h3 className="font-semibold">
                  Inspection Started
                </h3>

                <p className="text-slate-500">
                  09:30 AM
                </p>

              </div>

            </div>

            <div className="flex gap-4">

              <div className="w-3 h-3 rounded-full bg-yellow-500 mt-2"></div>

              <div>

                <h3 className="font-semibold">
                  Checkpoint Completed
                </h3>

                <p className="text-slate-500">
                  10:00 AM
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* =================================================
            HEART RATE GRAPH
        ================================================= */}

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-sky-100 mb-8">

          <div className="flex justify-between items-center mb-5">

            <div>

              <h2 className="text-2xl font-bold">
                Heart Rate Trend
              </h2>

              <p className="text-slate-500 mt-1">
                Recent telemetry readings
              </p>

            </div>

            <div className="flex items-center gap-2 text-sm text-green-600">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
              Live
            </div>

          </div>

          <div className="h-[350px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <LineChart data={diver.graphData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e2e8f0"
                />

                <XAxis
                  dataKey="time"
                  tick={{ fill: "#64748b" }}
                />

                <YAxis
                  tick={{ fill: "#64748b" }}
                />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="hr"
                  stroke="#0284c7"
                  strokeWidth={4}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* =================================================
            BACKEND READY NOTE
        ================================================= */}

        <div className="bg-sky-100 border border-sky-200 rounded-xl p-4 text-sm text-sky-800">

          <p>
            Current monitoring values are frontend mock data.
            Later, these values can be replaced with live backend
            telemetry without changing the page structure.
          </p>

        </div>

      </div>
    </>
  );
}

export default Monitoring;