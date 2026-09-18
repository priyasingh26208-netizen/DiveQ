import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar2 from "../components/Navbar2";

import {
  Activity,
  ArrowDown,
  ArrowUp,
  BarChart3,
  Battery,
  CalendarDays,
  ChevronRight,
  Clock,
  Gauge,
  HeartPulse,
  History,
  ShieldAlert,
  TrendingUp,
  User,
  Waves,
  Wind,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

/* =========================================================
   MOCK DIVER ANALYTICS DATA

   IDs and names match:
   Dashboard
   Monitoring
   AI
========================================================= */

const diverAnalytics = [
  {
    id: "DQ-101",
    name: "Priya Sharma",
    mission: "Pipeline Inspection Alpha",
    averageHeartRate: 80,
    maximumHeartRate: 86,
    averageDepth: 21,
    maximumDepth: 27,
    gasConsumed: 22,
    maximumAscentRate: 6,
    highAscentEvents: 0,
    decompressionWarnings: 0,
    totalDiveTime: 35,
    riskLevel: "LOW",
  },

  {
    id: "DQ-102",
    name: "Rahul Singh",
    mission: "Pipeline Inspection Alpha",
    averageHeartRate: 101,
    maximumHeartRate: 110,
    averageDepth: 33,
    maximumDepth: 38,
    gasConsumed: 38,
    maximumAscentRate: 10,
    highAscentEvents: 2,
    decompressionWarnings: 1,
    totalDiveTime: 43,
    riskLevel: "MEDIUM",
  },

  {
    id: "DQ-103",
    name: "Amit Verma",
    mission: "Pipeline Inspection Alpha",
    averageHeartRate: 77,
    maximumHeartRate: 82,
    averageDepth: 17,
    maximumDepth: 21,
    gasConsumed: 18,
    maximumAscentRate: 5,
    highAscentEvents: 0,
    decompressionWarnings: 0,
    totalDiveTime: 31,
    riskLevel: "LOW",
  },

  {
    id: "DQ-104",
    name: "Neha Gupta",
    mission: "Pipeline Inspection Alpha",
    averageHeartRate: 113,
    maximumHeartRate: 124,
    averageDepth: 38,
    maximumDepth: 45,
    gasConsumed: 58,
    maximumAscentRate: 13,
    highAscentEvents: 4,
    decompressionWarnings: 2,
    totalDiveTime: 51,
    riskLevel: "HIGH",
  },
];

/* =========================================================
   HEART RATE TREND
========================================================= */

const heartRateTrend = [
  {
    time: "09:00",
    priya: 76,
    rahul: 91,
    amit: 74,
    neha: 98,
  },
  {
    time: "09:15",
    priya: 79,
    rahul: 96,
    amit: 76,
    neha: 103,
  },
  {
    time: "09:30",
    priya: 82,
    rahul: 101,
    amit: 78,
    neha: 108,
  },
  {
    time: "09:45",
    priya: 80,
    rahul: 104,
    amit: 77,
    neha: 114,
  },
  {
    time: "10:00",
    priya: 84,
    rahul: 108,
    amit: 79,
    neha: 120,
  },
  {
    time: "10:15",
    priya: 82,
    rahul: 110,
    amit: 78,
    neha: 124,
  },
];

/* =========================================================
   DEPTH TREND
========================================================= */

const depthTrend = [
  {
    time: "09:00",
    depth: 10,
  },
  {
    time: "09:15",
    depth: 18,
  },
  {
    time: "09:30",
    depth: 25,
  },
  {
    time: "09:45",
    depth: 31,
  },
  {
    time: "10:00",
    depth: 36,
  },
  {
    time: "10:15",
    depth: 41,
  },
];

/* =========================================================
   GAS CONSUMPTION
========================================================= */

const gasData = [
  {
    diver: "Priya",
    consumed: 22,
  },
  {
    diver: "Rahul",
    consumed: 38,
  },
  {
    diver: "Amit",
    consumed: 18,
  },
  {
    diver: "Neha",
    consumed: 58,
  },
];

/* =========================================================
   MISSION HISTORY
========================================================= */

const missionHistory = [
  {
    id: "M-204",
    name: "Pipeline Inspection Alpha",
    date: "18 Sep 2026",
    duration: "51 min",
    divers: 4,
    alerts: 5,
    highRiskEvents: 2,
    outcome: "Completed",
  },

  {
    id: "M-203",
    name: "Underwater Bridge Survey",
    date: "15 Sep 2026",
    duration: "46 min",
    divers: 5,
    alerts: 3,
    highRiskEvents: 1,
    outcome: "Completed",
  },

  {
    id: "M-202",
    name: "Ship Hull Inspection",
    date: "11 Sep 2026",
    duration: "54 min",
    divers: 4,
    alerts: 4,
    highRiskEvents: 1,
    outcome: "Completed",
  },

  {
    id: "M-201",
    name: "Rescue Operation Delta",
    date: "06 Sep 2026",
    duration: "39 min",
    divers: 3,
    alerts: 2,
    highRiskEvents: 0,
    outcome: "Completed",
  },
];

/* =========================================================
   RISK COMPARISON
========================================================= */

const riskComparison = [
  {
    diver: "Priya",
    risk: 28,
  },
  {
    diver: "Rahul",
    risk: 58,
  },
  {
    diver: "Amit",
    risk: 24,
  },
  {
    diver: "Neha",
    risk: 81,
  },
];

/* =========================================================
   HELPER
========================================================= */

const getRiskClasses = (risk) => {
  if (risk === "HIGH") {
    return "border-red-200 bg-red-50 text-red-600";
  }

  if (risk === "MEDIUM") {
    return "border-amber-200 bg-amber-50 text-amber-600";
  }

  return "border-emerald-200 bg-emerald-50 text-emerald-600";
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

function Analytics() {
  const navigate = useNavigate();

  const [selectedDiverId, setSelectedDiverId] =
    useState("DQ-101");

  const selectedDiver = useMemo(() => {
    return diverAnalytics.find(
      (diver) => diver.id === selectedDiverId
    );
  }, [selectedDiverId]);

  const totalAlerts = diverAnalytics.reduce(
    (total, diver) =>
      total +
      diver.highAscentEvents +
      diver.decompressionWarnings,
    0
  );

  const totalHighAscentEvents =
    diverAnalytics.reduce(
      (total, diver) =>
        total + diver.highAscentEvents,
      0
    );

  const totalDecompressionWarnings =
    diverAnalytics.reduce(
      (total, diver) =>
        total + diver.decompressionWarnings,
      0
    );

  const averageHeartRate = Math.round(
    diverAnalytics.reduce(
      (total, diver) =>
        total + diver.averageHeartRate,
      0
    ) / diverAnalytics.length
  );

  const averageDepth = Math.round(
    diverAnalytics.reduce(
      (total, diver) =>
        total + diver.averageDepth,
      0
    ) / diverAnalytics.length
  );

  const totalGasConsumed = diverAnalytics.reduce(
    (total, diver) =>
      total + diver.gasConsumed,
    0
  );

  return (
    <>
      <Navbar2 />

      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-[1500px]">

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-sky-600">
                <BarChart3 size={18} />
                DIVEQ ANALYTICS
              </div>

              <h1 className="text-3xl font-bold text-slate-900">
                Diver Performance & Analytics
              </h1>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
                Mission performance, diver telemetry trends and
                historical dive analytics.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                <CalendarDays size={20} />
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Current Mission
                </p>

                <p className="text-sm font-semibold text-slate-800">
                  Pipeline Inspection Alpha
                </p>
              </div>
            </div>

          </div>

          {/* =================================================
              SUMMARY CARDS
          ================================================= */}

          <section className="mb-8">

            <div className="mb-4 flex items-center gap-2">
              <Activity
                size={20}
                className="text-sky-600"
              />

              <h2 className="text-lg font-semibold">
                Mission Performance Summary
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-6">

              {/* AVG HEART RATE */}

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-500">
                  <HeartPulse size={18} />
                </div>

                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Avg Heart Rate
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {averageHeartRate}
                  <span className="ml-1 text-xs text-slate-400">
                    BPM
                  </span>
                </p>
              </div>

              {/* AVG DEPTH */}

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                  <ArrowDown size={18} />
                </div>

                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Avg Depth
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {averageDepth}
                  <span className="ml-1 text-xs text-slate-400">
                    m
                  </span>
                </p>
              </div>

              {/* GAS CONSUMED */}

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-500">
                  <Wind size={18} />
                </div>

                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Gas Consumed
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {totalGasConsumed}
                  <span className="ml-1 text-xs text-slate-400">
                    %
                  </span>
                </p>
              </div>

              {/* HIGH ASCENT EVENTS */}

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
                  <ArrowUp size={18} />
                </div>

                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  High Ascent Events
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {totalHighAscentEvents}
                </p>
              </div>

              {/* DECOMPRESSION */}

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-500">
                  <ShieldAlert size={18} />
                </div>

                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Decompression Warnings
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {totalDecompressionWarnings}
                </p>
              </div>

              {/* TOTAL EVENTS */}

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                  <TrendingUp size={18} />
                </div>

                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Risk Events
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {totalAlerts}
                </p>
              </div>

            </div>

          </section>

          {/* =================================================
              DIVER SELECTOR
          ================================================= */}

          <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="mb-5">
              <h2 className="text-lg font-semibold">
                Diver Analytics
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Select a diver to view detailed performance
                metrics.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">

              {diverAnalytics.map((diver) => {

                const selected =
                  diver.id === selectedDiverId;

                return (
                  <button
                    key={diver.id}
                    onClick={() =>
                      setSelectedDiverId(diver.id)
                    }
                    className={`rounded-xl border p-4 text-left transition ${
                      selected
                        ? "border-sky-300 bg-sky-50 ring-1 ring-sky-200"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >

                    <div className="flex items-center justify-between">

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                          <User
                            size={19}
                            className="text-slate-600"
                          />
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

                      <span
                        className={`rounded-full border px-2.5 py-1 text-[10px] font-bold ${getRiskClasses(
                          diver.riskLevel
                        )}`}
                      >
                        {diver.riskLevel}
                      </span>

                    </div>

                  </button>
                );
              })}

            </div>

          </section>

          {/* =================================================
              SELECTED DIVER METRICS
          ================================================= */}

          <section className="mb-8">

            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <h2 className="text-lg font-semibold">
                  {selectedDiver.name}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Performance analytics · {selectedDiver.id}
                </p>
              </div>

              <button
                onClick={() =>
                  navigate(
                    `/monitoring/${selectedDiver.id}`
                  )
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-700"
              >
                Open Monitoring
                <ChevronRight size={17} />
              </button>

            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

              {/* AVG HEART */}

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Average Heart Rate
                </p>

                <p className="mt-2 text-3xl font-bold">
                  {selectedDiver.averageHeartRate}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  BPM
                </p>

              </div>

              {/* MAX HEART */}

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Maximum Heart Rate
                </p>

                <p className="mt-2 text-3xl font-bold">
                  {selectedDiver.maximumHeartRate}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  BPM
                </p>

              </div>

              {/* AVG DEPTH */}

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Average Depth
                </p>

                <p className="mt-2 text-3xl font-bold">
                  {selectedDiver.averageDepth}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  meters
                </p>

              </div>

              {/* MAX DEPTH */}

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Maximum Depth
                </p>

                <p className="mt-2 text-3xl font-bold">
                  {selectedDiver.maximumDepth}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  meters
                </p>

              </div>

            </div>

          </section>

          {/* =================================================
              HEART RATE + DEPTH CHARTS
          ================================================= */}

          <section className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-2">

            {/* HEART RATE */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="mb-5">

                <h3 className="text-lg font-semibold">
                  Heart Rate Trend
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Heart rate comparison across the active
                  mission.
                </p>

              </div>

              <div className="h-[320px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <LineChart data={heartRateTrend}>

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

                    <Legend />

                    <Line
                      type="monotone"
                      dataKey="priya"
                      name="Priya"
                      stroke="#0284c7"
                      strokeWidth={3}
                    />

                    <Line
                      type="monotone"
                      dataKey="rahul"
                      name="Rahul"
                      stroke="#f59e0b"
                      strokeWidth={3}
                    />

                    <Line
                      type="monotone"
                      dataKey="amit"
                      name="Amit"
                      stroke="#16a34a"
                      strokeWidth={3}
                    />

                    <Line
                      type="monotone"
                      dataKey="neha"
                      name="Neha"
                      stroke="#dc2626"
                      strokeWidth={3}
                    />

                  </LineChart>

                </ResponsiveContainer>

              </div>

            </div>

            {/* DEPTH */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="mb-5">

                <h3 className="text-lg font-semibold">
                  Mission Depth Trend
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Overall depth progression during the
                  mission.
                </p>

              </div>

              <div className="h-[320px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <AreaChart data={depthTrend}>

                    <defs>

                      <linearGradient
                        id="depthGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >

                        <stop
                          offset="5%"
                          stopColor="#0284c7"
                          stopOpacity={0.7}
                        />

                        <stop
                          offset="95%"
                          stopColor="#0284c7"
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
                      tick={{ fill: "#64748b" }}
                    />

                    <YAxis
                      tick={{ fill: "#64748b" }}
                    />

                    <Tooltip />

                    <Area
                      type="monotone"
                      dataKey="depth"
                      stroke="#0284c7"
                      strokeWidth={3}
                      fill="url(#depthGradient)"
                    />

                  </AreaChart>

                </ResponsiveContainer>

              </div>

            </div>

          </section>

          {/* =================================================
              GAS + RISK CHART
          ================================================= */}

          <section className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-2">

            {/* GAS CONSUMPTION */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="mb-5">

                <h3 className="text-lg font-semibold">
                  Gas Consumption
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Gas consumed by each diver during the
                  mission.
                </p>

              </div>

              <div className="h-[320px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <BarChart data={gasData}>

                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e2e8f0"
                    />

                    <XAxis
                      dataKey="diver"
                      tick={{ fill: "#64748b" }}
                    />

                    <YAxis
                      tick={{ fill: "#64748b" }}
                    />

                    <Tooltip />

                    <Bar
                      dataKey="consumed"
                      name="Gas Consumed %"
                      fill="#0ea5e9"
                      radius={[8, 8, 0, 0]}
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>

            </div>

            {/* RISK COMPARISON */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="mb-5">

                <h3 className="text-lg font-semibold">
                  Diver Risk Comparison
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Current AI risk score across active divers.
                </p>

              </div>

              <div className="h-[320px]">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <BarChart
                    data={riskComparison}
                  >

                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e2e8f0"
                    />

                    <XAxis
                      dataKey="diver"
                      tick={{ fill: "#64748b" }}
                    />

                    <YAxis
                      domain={[0, 100]}
                      tick={{ fill: "#64748b" }}
                    />

                    <Tooltip />

                    <Bar
                      dataKey="risk"
                      name="Risk Score"
                      fill="#ef4444"
                      radius={[8, 8, 0, 0]}
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>

            </div>

          </section>

          {/* =================================================
              DETAILED SELECTED DIVER ANALYTICS
          ================================================= */}

          <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <h2 className="text-lg font-semibold">
                  Detailed Performance
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Metrics for {selectedDiver.name}
                </p>

              </div>

              <span
                className={`inline-flex w-fit rounded-full border px-3 py-1 text-xs font-semibold ${getRiskClasses(
                  selectedDiver.riskLevel
                )}`}
              >
                {selectedDiver.riskLevel} RISK
              </span>

            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">

              <div className="rounded-xl bg-slate-50 p-4">

                <HeartPulse
                  size={19}
                  className="text-red-500"
                />

                <p className="mt-3 text-xs text-slate-400">
                  Avg HR
                </p>

                <p className="mt-1 text-lg font-bold">
                  {selectedDiver.averageHeartRate} BPM
                </p>

              </div>

              <div className="rounded-xl bg-slate-50 p-4">

                <HeartPulse
                  size={19}
                  className="text-orange-500"
                />

                <p className="mt-3 text-xs text-slate-400">
                  Max HR
                </p>

                <p className="mt-1 text-lg font-bold">
                  {selectedDiver.maximumHeartRate} BPM
                </p>

              </div>

              <div className="rounded-xl bg-slate-50 p-4">

                <ArrowDown
                  size={19}
                  className="text-sky-600"
                />

                <p className="mt-3 text-xs text-slate-400">
                  Max Depth
                </p>

                <p className="mt-1 text-lg font-bold">
                  {selectedDiver.maximumDepth} m
                </p>

              </div>

              <div className="rounded-xl bg-slate-50 p-4">

                <Wind
                  size={19}
                  className="text-amber-500"
                />

                <p className="mt-3 text-xs text-slate-400">
                  Gas Consumed
                </p>

                <p className="mt-1 text-lg font-bold">
                  {selectedDiver.gasConsumed}%
                </p>

              </div>

              <div className="rounded-xl bg-slate-50 p-4">

                <ArrowUp
                  size={19}
                  className="text-orange-500"
                />

                <p className="mt-3 text-xs text-slate-400">
                  Max Ascent
                </p>

                <p className="mt-1 text-lg font-bold">
                  {selectedDiver.maximumAscentRate} m/min
                </p>

              </div>

              <div className="rounded-xl bg-slate-50 p-4">

                <Clock
                  size={19}
                  className="text-purple-500"
                />

                <p className="mt-3 text-xs text-slate-400">
                  Dive Time
                </p>

                <p className="mt-1 text-lg font-bold">
                  {selectedDiver.totalDiveTime} min
                </p>

              </div>

            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">

              <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">

                <p className="text-xs font-semibold uppercase tracking-wide text-amber-600">
                  High-Ascent Events
                </p>

                <p className="mt-2 text-3xl font-bold text-amber-700">
                  {selectedDiver.highAscentEvents}
                </p>

                <p className="mt-1 text-sm text-amber-700/70">
                  Recorded during this dive
                </p>

              </div>

              <div className="rounded-xl border border-red-100 bg-red-50 p-4">

                <p className="text-xs font-semibold uppercase tracking-wide text-red-600">
                  Decompression Warnings
                </p>

                <p className="mt-2 text-3xl font-bold text-red-700">
                  {selectedDiver.decompressionWarnings}
                </p>

                <p className="mt-1 text-sm text-red-700/70">
                  Recorded during this dive
                </p>

              </div>

            </div>

          </section>

          {/* =================================================
              MISSION HISTORY
          ================================================= */}

          <section className="mb-8 rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-5">

              <History
                size={20}
                className="text-sky-600"
              />

              <div>

                <h2 className="text-lg font-semibold">
                  Mission History
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Previous DiveQ mission performance.
                </p>

              </div>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full min-w-[850px]">

                <thead>

                  <tr className="border-b border-slate-100 bg-slate-50">

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Mission
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Date
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Duration
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Divers
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Alerts
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                      High-Risk Events
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Outcome
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {missionHistory.map((mission) => (

                    <tr
                      key={mission.id}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                    >

                      <td className="px-5 py-4">

                        <div>

                          <p className="text-sm font-semibold text-slate-800">
                            {mission.name}
                          </p>

                          <p className="text-xs text-slate-400">
                            {mission.id}
                          </p>

                        </div>

                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {mission.date}
                      </td>

                      <td className="px-5 py-4 text-sm font-medium">
                        {mission.duration}
                      </td>

                      <td className="px-5 py-4 text-sm font-medium">
                        {mission.divers}
                      </td>

                      <td className="px-5 py-4">

                        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-600">
                          {mission.alerts}
                        </span>

                      </td>

                      <td className="px-5 py-4">

                        <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                          {mission.highRiskEvents}
                        </span>

                      </td>

                      <td className="px-5 py-4">

                        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                          {mission.outcome}
                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </section>

          {/* =================================================
              QUICK NAVIGATION
          ================================================= */}

          <section className="grid grid-cols-1 gap-4 md:grid-cols-3">

            <button
              onClick={() =>
                navigate(
                  `/monitoring/${selectedDiver.id}`
                )
              }
              className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-sky-200 hover:bg-sky-50/40"
            >

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                  <Waves size={19} />
                </div>

                <div>

                  <p className="text-sm font-semibold">
                    Diver Monitoring
                  </p>

                  <p className="text-xs text-slate-400">
                    View current telemetry
                  </p>

                </div>

              </div>

              <ChevronRight
                size={18}
                className="text-slate-300"
              />

            </button>

            <button
              onClick={() => navigate("/risk")}
              className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-sky-200 hover:bg-sky-50/40"
            >

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <ShieldAlert size={19} />
                </div>

                <div>

                  <p className="text-sm font-semibold">
                    AI Risk Analysis
                  </p>

                  <p className="text-xs text-slate-400">
                    Review AI insights
                  </p>

                </div>

              </div>

              <ChevronRight
                size={18}
                className="text-slate-300"
              />

            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-sky-200 hover:bg-sky-50/40"
            >

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Gauge size={19} />
                </div>

                <div>

                  <p className="text-sm font-semibold">
                    Command Center
                  </p>

                  <p className="text-xs text-slate-400">
                    Return to dashboard
                  </p>

                </div>

              </div>

              <ChevronRight
                size={18}
                className="text-slate-300"
              />

            </button>

          </section>

          {/* =================================================
              BACKEND NOTE
          ================================================= */}

          <div className="mt-6 rounded-xl border border-sky-100 bg-sky-50 px-5 py-4">

            <p className="text-sm leading-6 text-sky-800">
              Analytics currently uses frontend mock data. Later,
              these metrics and charts can be populated from backend
              mission history and telemetry responses without
              changing the overall page structure.
            </p>

          </div>

        </div>
      </div>
    </>
  );
}

export default Analytics;