import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar2 from "../components/Navbar2";

import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  Battery,
  BellRing,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  Gauge,
  HeartPulse,
  MapPin,
  ShieldAlert,
  User,
  Waves,
  Wind,
} from "lucide-react";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/* =========================================================
   MOCK DIVER DATA
   Later replace with backend/API response
========================================================= */

const divers = {
  "DVR-001": {
    id: "DVR-001",
    name: "Alex Carter",
    role: "Lead Diver",
    status: "UNDERWATER",
    mission: "Pipeline Inspection",
    location: "Mumbai Offshore",

    currentDepth: 42,
    plannedDepth: 40,

    diveTime: 48,
    plannedDiveTime: 60,

    heartRate: 108,
    ascentRate: 11,
    plannedAscentRate: 9,

    gasRemaining: 31,
    battery: 82,

    decompressionStatus: "MONITORING",
    riskStatus: "HIGH",

    startTime: "10:02 AM",
    currentTime: "10:50 AM",

    currentLocation: "Sector A-14",

    preDive: {
      equipmentCheck: "Completed",
      oxygenSystem: "Checked",
      communicationCheck: "Passed",
      emergencyPlan: "Reviewed",
      medicalClearance: "Cleared",
    },
  },

  "DVR-002": {
    id: "DVR-002",
    name: "Maya Wilson",
    role: "Inspection Diver",
    status: "UNDERWATER",
    mission: "Pipeline Inspection",
    location: "Mumbai Offshore",

    currentDepth: 29,
    plannedDepth: 35,

    diveTime: 35,
    plannedDiveTime: 55,

    heartRate: 82,
    ascentRate: 6,
    plannedAscentRate: 9,

    gasRemaining: 67,
    battery: 91,

    decompressionStatus: "NORMAL",
    riskStatus: "LOW",

    startTime: "10:15 AM",
    currentTime: "10:50 AM",

    currentLocation: "Sector A-12",

    preDive: {
      equipmentCheck: "Completed",
      oxygenSystem: "Checked",
      communicationCheck: "Passed",
      emergencyPlan: "Reviewed",
      medicalClearance: "Cleared",
    },
  },

  "DVR-003": {
    id: "DVR-003",
    name: "Daniel Ross",
    role: "Inspection Diver",
    status: "UNDERWATER",
    mission: "Pipeline Inspection",
    location: "Mumbai Offshore",

    currentDepth: 37,
    plannedDepth: 40,

    diveTime: 43,
    plannedDiveTime: 60,

    heartRate: 96,
    ascentRate: 8,
    plannedAscentRate: 9,

    gasRemaining: 48,
    battery: 74,

    decompressionStatus: "NORMAL",
    riskStatus: "MEDIUM",

    startTime: "10:07 AM",
    currentTime: "10:50 AM",

    currentLocation: "Sector B-03",

    preDive: {
      equipmentCheck: "Completed",
      oxygenSystem: "Checked",
      communicationCheck: "Passed",
      emergencyPlan: "Reviewed",
      medicalClearance: "Cleared",
    },
  },

  "DVR-004": {
    id: "DVR-004",
    name: "Ryan Smith",
    role: "Support Diver",
    status: "UNDERWATER",
    mission: "Pipeline Inspection",
    location: "Mumbai Offshore",

    currentDepth: 46,
    plannedDepth: 40,

    diveTime: 51,
    plannedDiveTime: 60,

    heartRate: 116,
    ascentRate: 13,
    plannedAscentRate: 9,

    gasRemaining: 27,
    battery: 68,

    decompressionStatus: "ATTENTION",
    riskStatus: "HIGH",

    startTime: "09:59 AM",
    currentTime: "10:50 AM",

    currentLocation: "Sector B-08",

    preDive: {
      equipmentCheck: "Completed",
      oxygenSystem: "Checked",
      communicationCheck: "Passed",
      emergencyPlan: "Reviewed",
      medicalClearance: "Cleared",
    },
  },
};

/* =========================================================
   MOCK TELEMETRY
========================================================= */

const telemetry = [
  {
    time: "10:20",
    depth: 34,
    heartRate: 91,
    gas: 51,
  },
  {
    time: "10:25",
    depth: 36,
    heartRate: 94,
    gas: 48,
  },
  {
    time: "10:30",
    depth: 37,
    heartRate: 96,
    gas: 45,
  },
  {
    time: "10:35",
    depth: 39,
    heartRate: 99,
    gas: 41,
  },
  {
    time: "10:40",
    depth: 40,
    heartRate: 103,
    gas: 37,
  },
  {
    time: "10:45",
    depth: 41,
    heartRate: 106,
    gas: 34,
  },
  {
    time: "10:50",
    depth: 42,
    heartRate: 108,
    gas: 31,
  },
];

/* =========================================================
   REUSABLE COMPONENT
========================================================= */

const StatusBadge = ({ children, type = "default" }) => {
  const styles = {
    default: "border-slate-200 bg-slate-50 text-slate-600",
    success: "border-emerald-200 bg-emerald-50 text-emerald-600",
    warning: "border-amber-200 bg-amber-50 text-amber-600",
    danger: "border-red-200 bg-red-50 text-red-600",
    info: "border-sky-200 bg-sky-50 text-sky-600",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${styles[type]}`}
    >
      {children}
    </span>
  );
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

const Monitoringg = () => {
  const navigate = useNavigate();
  const { diverId } = useParams();

  const [selectedDiver, setSelectedDiver] = useState(
    divers[diverId] || divers["DVR-001"]
  );

  const [showPreDive, setShowPreDive] = useState(true);

  const [form, setForm] = useState({
    plannedDepth: selectedDiver.plannedDepth,
    plannedDiveTime: selectedDiver.plannedDiveTime,
    diveObjective: "Pipeline inspection and visual assessment",
    equipmentStatus: "Checked",
    communicationStatus: "Passed",
    emergencyPlan: "Reviewed",
    notes: "",
  });

  const selectDiver = (id) => {
    const diver = divers[id];

    if (!diver) return;

    setSelectedDiver(diver);

    setForm({
      plannedDepth: diver.plannedDepth,
      plannedDiveTime: diver.plannedDiveTime,
      diveObjective: "Pipeline inspection and visual assessment",
      equipmentStatus: "Checked",
      communicationStatus: "Passed",
      emergencyPlan: "Reviewed",
      notes: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const riskType =
    selectedDiver.riskStatus === "HIGH"
      ? "danger"
      : selectedDiver.riskStatus === "MEDIUM"
      ? "warning"
      : "success";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar2 />

      <main className="mx-auto max-w-[1500px] px-5 py-8 lg:px-8">
        {/* =====================================================
            PAGE HEADER
        ===================================================== */}

        <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <button
              onClick={() => navigate("/ai")}
              className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
            >
              <ArrowLeft size={18} />
            </button>

            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-sky-600">
                <Waves size={18} />
                DIVER MONITORING
              </div>

              <h1 className="text-3xl font-bold tracking-tight">
                Diver Monitoring
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Pre-dive configuration and current operational monitoring for
                the selected diver.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500" />
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                System Status
              </p>

              <p className="text-sm font-semibold text-slate-800">
                Telemetry Connected
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
            DIVER SELECTOR
        ===================================================== */}

        <section className="mb-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Select Diver</h2>

            <p className="mt-1 text-sm text-slate-500">
              Choose a diver to view their monitoring details.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            {Object.values(divers).map((diver) => {
              const active = selectedDiver.id === diver.id;

              return (
                <button
                  key={diver.id}
                  onClick={() => selectDiver(diver.id)}
                  className={`rounded-xl border p-4 text-left transition ${
                    active
                      ? "border-sky-300 bg-sky-50 ring-1 ring-sky-200"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-sm font-bold text-slate-600">
                        {diver.name
                          .split(" ")
                          .map((word) => word[0])
                          .join("")}
                      </div>

                      <div>
                        <p className="text-sm font-semibold">
                          {diver.name}
                        </p>

                        <p className="text-xs text-slate-400">
                          {diver.id}
                        </p>
                      </div>
                    </div>

                    <StatusBadge type={diver.riskStatus === "HIGH" ? "danger" : diver.riskStatus === "MEDIUM" ? "warning" : "success"}>
                      {diver.riskStatus}
                    </StatusBadge>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* =====================================================
            SELECTED DIVER SUMMARY
        ===================================================== */}

        <section className="mb-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-50 text-lg font-bold text-sky-700">
                {selectedDiver.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")}
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Selected Diver
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  {selectedDiver.name}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {selectedDiver.id} · {selectedDiver.role}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge type="info">
                {selectedDiver.status}
              </StatusBadge>

              <StatusBadge type={riskType}>
                {selectedDiver.riskStatus} RISK
              </StatusBadge>

              <button
                onClick={() => navigate("/ai")}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <BrainCircuit size={17} />
                AI Analysis
              </button>
            </div>
          </div>
        </section>

        {/* =====================================================
            PRE-DIVE SECTION
        ===================================================== */}

        <section className="mb-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <button
            onClick={() => setShowPreDive(!showPreDive)}
            className="flex w-full items-center justify-between border-b border-slate-100 px-5 py-5 text-left"
          >
            <div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={19} className="text-emerald-500" />

                <h2 className="text-lg font-semibold">
                  Pre-Dive Information
                </h2>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Supervisor-entered information before the diver enters the
                water.
              </p>
            </div>

            <span className="text-sm font-medium text-sky-600">
              {showPreDive ? "Hide" : "Show"}
            </span>
          </button>

          {showPreDive && (
            <div className="p-5">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {/* PLANNED DEPTH */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Planned Depth (m)
                  </label>

                  <input
                    type="number"
                    name="plannedDepth"
                    value={form.plannedDepth}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                  />
                </div>

                {/* PLANNED TIME */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Planned Dive Duration (min)
                  </label>

                  <input
                    type="number"
                    name="plannedDiveTime"
                    value={form.plannedDiveTime}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                  />
                </div>

                {/* OBJECTIVE */}
                <div className="md:col-span-2 xl:col-span-1">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Dive Objective
                  </label>

                  <input
                    type="text"
                    name="diveObjective"
                    value={form.diveObjective}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                  />
                </div>

                {/* EQUIPMENT */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Equipment Check
                  </label>

                  <select
                    name="equipmentStatus"
                    value={form.equipmentStatus}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                  >
                    <option>Checked</option>
                    <option>Pending</option>
                    <option>Issue Detected</option>
                  </select>
                </div>

                {/* COMMUNICATION */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Communication Check
                  </label>

                  <select
                    name="communicationStatus"
                    value={form.communicationStatus}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                  >
                    <option>Passed</option>
                    <option>Pending</option>
                    <option>Failed</option>
                  </select>
                </div>

                {/* EMERGENCY */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Emergency Plan
                  </label>

                  <select
                    name="emergencyPlan"
                    value={form.emergencyPlan}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                  >
                    <option>Reviewed</option>
                    <option>Pending Review</option>
                  </select>
                </div>

                {/* NOTES */}
                <div className="md:col-span-2 xl:col-span-3">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Supervisor Notes
                  </label>

                  <textarea
                    name="notes"
                    rows="3"
                    value={form.notes}
                    onChange={handleChange}
                    placeholder="Enter any additional pre-dive instructions or notes..."
                    className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                  />
                </div>
              </div>

              <div className="mt-5 flex justify-end">
                <button
                  onClick={() =>
                    alert("Pre-dive information saved successfully.")
                  }
                  className="rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
                >
                  Save Pre-Dive Information
                </button>
              </div>
            </div>
          )}
        </section>

        {/* =====================================================
            CURRENT STATUS
        ===================================================== */}

        <section className="mb-7">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">
              Current Dive Status
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Current telemetry values for {selectedDiver.id}.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
            {/* DEPTH */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                <ArrowDown size={19} />
              </div>

              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Current Depth
              </p>

              <p className="mt-2 text-2xl font-bold">
                {selectedDiver.currentDepth}
                <span className="ml-1 text-sm font-medium text-slate-400">
                  m
                </span>
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Planned: {selectedDiver.plannedDepth} m
              </p>
            </div>

            {/* TIME */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <Clock3 size={19} />
              </div>

              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Dive Time
              </p>

              <p className="mt-2 text-2xl font-bold">
                {selectedDiver.diveTime}
                <span className="ml-1 text-sm font-medium text-slate-400">
                  min
                </span>
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Planned: {selectedDiver.plannedDiveTime} min
              </p>
            </div>

            {/* HEART RATE */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500">
                <HeartPulse size={19} />
              </div>

              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Heart Rate
              </p>

              <p className="mt-2 text-2xl font-bold">
                {selectedDiver.heartRate}
                <span className="ml-1 text-sm font-medium text-slate-400">
                  BPM
                </span>
              </p>

              <p className="mt-1 text-xs text-red-500">
                Increasing
              </p>
            </div>

            {/* ASCENT */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <ArrowUp size={19} />
              </div>

              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Ascent Rate
              </p>

              <p className="mt-2 text-2xl font-bold">
                {selectedDiver.ascentRate}
                <span className="ml-1 text-sm font-medium text-slate-400">
                  m/min
                </span>
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Planned: {selectedDiver.plannedAscentRate}
              </p>
            </div>

            {/* GAS */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                <Wind size={19} />
              </div>

              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Gas Remaining
              </p>

              <p className="mt-2 text-2xl font-bold">
                {selectedDiver.gasRemaining}
                <span className="ml-1 text-sm font-medium text-slate-400">
                  %
                </span>
              </p>

              <p className="mt-1 text-xs text-red-500">
                Low
              </p>
            </div>

            {/* BATTERY */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Battery size={19} />
              </div>

              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Device Battery
              </p>

              <p className="mt-2 text-2xl font-bold">
                {selectedDiver.battery}
                <span className="ml-1 text-sm font-medium text-slate-400">
                  %
                </span>
              </p>

              <p className="mt-1 text-xs text-emerald-600">
                Good
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            TELEMETRY + RISK
        ===================================================== */}

        <section className="mb-7 grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* TELEMETRY GRAPH */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">
                  Live Telemetry
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Recent telemetry trend for the selected diver.
                </p>
              </div>

              <StatusBadge type="success">
                LIVE DATA
              </StatusBadge>
            </div>

            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={telemetry}>
                  <defs>
                    <linearGradient
                      id="depthGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#0ea5e9"
                        stopOpacity={0.25}
                      />

                      <stop
                        offset="100%"
                        stopColor="#0ea5e9"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e2e8f0"
                  />

                  <XAxis
                    dataKey="time"
                    tick={{
                      fontSize: 11,
                      fill: "#94a3b8",
                    }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    tick={{
                      fontSize: 11,
                      fill: "#94a3b8",
                    }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="depth"
                    stroke="#0ea5e9"
                    strokeWidth={3}
                    fill="url(#depthGradient)"
                    name="Depth"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs text-slate-400">
                  Depth Trend
                </p>

                <p className="mt-1 text-sm font-semibold">
                  Increasing
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs text-slate-400">
                  Heart Rate Trend
                </p>

                <p className="mt-1 text-sm font-semibold">
                  Increasing
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs text-slate-400">
                  Gas Trend
                </p>

                <p className="mt-1 text-sm font-semibold">
                  Decreasing
                </p>
              </div>
            </div>
          </div>

          {/* RISK PANEL */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center gap-2">
              <ShieldAlert
                size={19}
                className={
                  selectedDiver.riskStatus === "HIGH"
                    ? "text-red-500"
                    : selectedDiver.riskStatus === "MEDIUM"
                    ? "text-amber-500"
                    : "text-emerald-500"
                }
              />

              <h2 className="text-lg font-semibold">
                Current Risk Status
              </h2>
            </div>

            <div
              className={`rounded-2xl border p-5 ${
                selectedDiver.riskStatus === "HIGH"
                  ? "border-red-100 bg-red-50"
                  : selectedDiver.riskStatus === "MEDIUM"
                  ? "border-amber-100 bg-amber-50"
                  : "border-emerald-100 bg-emerald-50"
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Current Risk
              </p>

              <p
                className={`mt-2 text-4xl font-bold ${
                  selectedDiver.riskStatus === "HIGH"
                    ? "text-red-600"
                    : selectedDiver.riskStatus === "MEDIUM"
                    ? "text-amber-600"
                    : "text-emerald-600"
                }`}
              >
                {selectedDiver.riskStatus}
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Current status is determined from the available telemetry
                indicators.
              </p>
            </div>

            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                <span className="text-sm text-slate-500">
                  Depth
                </span>

                <span className="text-sm font-semibold">
                  {selectedDiver.currentDepth} m
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                <span className="text-sm text-slate-500">
                  Gas
                </span>

                <span className="text-sm font-semibold">
                  {selectedDiver.gasRemaining}%
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                <span className="text-sm text-slate-500">
                  Decompression
                </span>

                <span className="text-sm font-semibold">
                  {selectedDiver.decompressionStatus}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                <span className="text-sm text-slate-500">
                  Location
                </span>

                <span className="text-sm font-semibold">
                  {selectedDiver.currentLocation}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            PRE-DIVE CHECKLIST
        ===================================================== */}

        <section className="mb-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={19} className="text-emerald-500" />

              <h2 className="text-lg font-semibold">
                Pre-Dive Checklist
              </h2>
            </div>

            <p className="mt-1 text-sm text-slate-500">
              Current checklist status before and during the mission.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-emerald-600" />

                <span className="text-sm font-semibold text-slate-700">
                  Equipment
                </span>
              </div>

              <p className="mt-2 text-xs text-emerald-600">
                {selectedDiver.preDive.equipmentCheck}
              </p>
            </div>

            <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-emerald-600" />

                <span className="text-sm font-semibold text-slate-700">
                  Oxygen System
                </span>
              </div>

              <p className="mt-2 text-xs text-emerald-600">
                {selectedDiver.preDive.oxygenSystem}
              </p>
            </div>

            <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-emerald-600" />

                <span className="text-sm font-semibold text-slate-700">
                  Communication
                </span>
              </div>

              <p className="mt-2 text-xs text-emerald-600">
                {selectedDiver.preDive.communicationCheck}
              </p>
            </div>

            <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-emerald-600" />

                <span className="text-sm font-semibold text-slate-700">
                  Emergency Plan
                </span>
              </div>

              <p className="mt-2 text-xs text-emerald-600">
                {selectedDiver.preDive.emergencyPlan}
              </p>
            </div>

            <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-emerald-600" />

                <span className="text-sm font-semibold text-slate-700">
                  Medical Clearance
                </span>
              </div>

              <p className="mt-2 text-xs text-emerald-600">
                {selectedDiver.preDive.medicalClearance}
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            DIVE INFORMATION
        ===================================================== */}

        <section className="mb-7 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* MISSION INFORMATION */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center gap-2">
              <MapPin size={19} className="text-sky-600" />

              <h2 className="text-lg font-semibold">
                Mission Information
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-sm text-slate-500">
                  Mission
                </span>

                <span className="text-sm font-semibold">
                  {selectedDiver.mission}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-sm text-slate-500">
                  Location
                </span>

                <span className="text-sm font-semibold">
                  {selectedDiver.location}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-sm text-slate-500">
                  Start Time
                </span>

                <span className="text-sm font-semibold">
                  {selectedDiver.startTime}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">
                  Current Time
                </span>

                <span className="text-sm font-semibold">
                  {selectedDiver.currentTime}
                </span>
              </div>
            </div>
          </div>

          {/* AI RECOMMENDATION */}
          <div className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center gap-2">
              <BrainCircuit size={19} className="text-sky-600" />

              <h2 className="text-lg font-semibold">
                AI Monitoring Recommendation
              </h2>
            </div>

            <div className="rounded-xl bg-sky-50 p-5">
              <p className="text-sm font-semibold text-slate-800">
                {selectedDiver.riskStatus === "HIGH"
                  ? "Increase Monitoring"
                  : selectedDiver.riskStatus === "MEDIUM"
                  ? "Monitor Closely"
                  : "Continue Monitoring"}
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Current telemetry should continue to be reviewed alongside
                depth, gas remaining, ascent rate and heart-rate trends.
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/ai")}
                className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
              >
                <BrainCircuit size={17} />
                Open AI Analysis
              </button>

              <button
                onClick={() => navigate("/alerts")}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <BellRing size={17} />
                View Alerts
              </button>
            </div>
          </div>
        </section>

        {/* =====================================================
            FOOTER NOTE
        ===================================================== */}

        <div className="rounded-xl border border-sky-100 bg-sky-50 px-5 py-4">
          <div className="flex items-start gap-3">
            <Gauge
              size={19}
              className="mt-0.5 shrink-0 text-sky-600"
            />

            <p className="text-sm leading-6 text-sky-800">
              This monitoring screen currently displays frontend mock
              telemetry. During backend integration, pre-dive information can
              be submitted to the backend and live device values can replace
              the mock telemetry automatically.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Monitoringg;