import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar2 from "../components/Navbar2";

import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  BrainCircuit,
  ChevronRight,
  CircleAlert,
  Gauge,
  HeartPulse,
  ShieldAlert,
  TrendingUp,
  Waves,
  Wind,
} from "lucide-react";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/* =========================================================
   MOCK DIVER DATA

   IMPORTANT:
   IDs and names match Dashboard + Monitoring.jsx
========================================================= */

const divers = [
  {
    id: "DQ-101",
    name: "Priya Sharma",
    score: 28,
    prediction: "LOW",
    confidence: 91,
    status: "Normal",

    heartRate: 82,
    depth: 24,
    plannedDepth: 30,
    gas: 78,
    ascentRate: 5,
    plannedAscentRate: 9,
    diveTime: 35,
    plannedTime: 60,

    trend: "Stable",

    factors: [
      {
        name: "Gas Remaining",
        value: 10,
        status: "NORMAL",
        description:
          "Gas level is currently within the expected operating range.",
      },
      {
        name: "Heart Rate",
        value: 7,
        status: "NORMAL",
        description:
          "Heart rate is stable compared with recent telemetry readings.",
      },
      {
        name: "Depth Trend",
        value: 5,
        status: "NORMAL",
        description:
          "Current depth is within the planned mission profile.",
      },
      {
        name: "Ascent Rate",
        value: 4,
        status: "NORMAL",
        description:
          "Ascent rate is below the configured monitoring threshold.",
      },
      {
        name: "Dive Duration",
        value: 2,
        status: "NORMAL",
        description:
          "Current dive duration is within the planned mission duration.",
      },
    ],

    warnings: [],
  },

  {
    id: "DQ-102",
    name: "Rahul Singh",
    score: 58,
    prediction: "MEDIUM",
    confidence: 82,
    status: "Monitor Closely",

    heartRate: 108,
    depth: 37,
    plannedDepth: 35,
    gas: 62,
    ascentRate: 9,
    plannedAscentRate: 9,
    diveTime: 43,
    plannedTime: 60,

    trend: "Increasing",

    factors: [
      {
        name: "Gas Remaining",
        value: 15,
        status: "NORMAL",
        description:
          "Gas level is currently acceptable but should continue to be monitored.",
      },
      {
        name: "Heart Rate",
        value: 27,
        status: "INCREASING",
        description:
          "Heart rate has increased compared with previous readings.",
      },
      {
        name: "Depth Trend",
        value: 12,
        status: "HIGH",
        description:
          "Current depth is above the planned mission depth.",
      },
      {
        name: "Ascent Rate",
        value: 9,
        status: "WARNING",
        description:
          "Ascent rate is approaching the configured monitoring threshold.",
      },
      {
        name: "Dive Duration",
        value: 5,
        status: "NORMAL",
        description:
          "Dive duration remains within the planned mission duration.",
      },
    ],

    warnings: [
      "Heart rate elevated",
      "Current depth above plan",
    ],
  },

  {
    id: "DQ-103",
    name: "Amit Verma",
    score: 24,
    prediction: "LOW",
    confidence: 94,
    status: "Normal",

    heartRate: 78,
    depth: 18,
    plannedDepth: 30,
    gas: 84,
    ascentRate: 5,
    plannedAscentRate: 9,
    diveTime: 31,
    plannedTime: 55,

    trend: "Stable",

    factors: [
      {
        name: "Gas Remaining",
        value: 8,
        status: "NORMAL",
        description:
          "Gas level is comfortably within the expected range.",
      },
      {
        name: "Heart Rate",
        value: 5,
        status: "NORMAL",
        description:
          "Heart rate remains stable.",
      },
      {
        name: "Depth Trend",
        value: 4,
        status: "NORMAL",
        description:
          "Current depth remains within the mission profile.",
      },
      {
        name: "Ascent Rate",
        value: 3,
        status: "NORMAL",
        description:
          "Ascent rate is within the configured threshold.",
      },
      {
        name: "Dive Duration",
        value: 2,
        status: "NORMAL",
        description:
          "Dive duration is within the planned duration.",
      },
    ],

    warnings: [],
  },

  {
    id: "DQ-104",
    name: "Neha Gupta",
    score: 81,
    prediction: "HIGH",
    confidence: 92,
    status: "Immediate Attention",

    heartRate: 124,
    depth: 41,
    plannedDepth: 35,
    gas: 42,
    ascentRate: 13,
    plannedAscentRate: 9,
    diveTime: 51,
    plannedTime: 60,

    trend: "Increasing",

    factors: [
      {
        name: "Gas Remaining",
        value: 23,
        status: "LOW",
        description:
          "Gas remaining has entered a low operating range.",
      },
      {
        name: "Heart Rate",
        value: 28,
        status: "HIGH",
        description:
          "Heart rate is significantly elevated compared with recent readings.",
      },
      {
        name: "Depth Trend",
        value: 16,
        status: "HIGH",
        description:
          "Current depth is above the planned mission depth.",
      },
      {
        name: "Ascent Rate",
        value: 14,
        status: "HIGH",
        description:
          "Detected ascent rate is above the configured monitoring threshold.",
      },
      {
        name: "Dive Duration",
        value: 8,
        status: "WARNING",
        description:
          "Dive duration is approaching the planned maximum.",
      },
    ],

    warnings: [
      "Heart rate increasing",
      "Current depth above plan",
      "Ascent rate above threshold",
    ],
  },
];

/* =========================================================
   RISK TREND DATA
========================================================= */

const riskTrendData = {
  "DQ-101": [
    { time: "10:20", risk: 24 },
    { time: "10:25", risk: 25 },
    { time: "10:30", risk: 27 },
    { time: "10:35", risk: 26 },
    { time: "10:40", risk: 28 },
    { time: "10:45", risk: 27 },
    { time: "10:50", risk: 28 },
  ],

  "DQ-102": [
    { time: "10:20", risk: 38 },
    { time: "10:25", risk: 42 },
    { time: "10:30", risk: 45 },
    { time: "10:35", risk: 49 },
    { time: "10:40", risk: 52 },
    { time: "10:45", risk: 55 },
    { time: "10:50", risk: 58 },
  ],

  "DQ-103": [
    { time: "10:20", risk: 20 },
    { time: "10:25", risk: 21 },
    { time: "10:30", risk: 22 },
    { time: "10:35", risk: 21 },
    { time: "10:40", risk: 23 },
    { time: "10:45", risk: 23 },
    { time: "10:50", risk: 24 },
  ],

  "DQ-104": [
    { time: "10:20", risk: 54 },
    { time: "10:25", risk: 59 },
    { time: "10:30", risk: 64 },
    { time: "10:35", risk: 69 },
    { time: "10:40", risk: 74 },
    { time: "10:45", risk: 78 },
    { time: "10:50", risk: 81 },
  ],
};

/* =========================================================
   HELPERS
========================================================= */

const getRiskStyles = (prediction) => {
  if (prediction === "HIGH") {
    return {
      badge: "border-red-200 bg-red-50 text-red-600",
      icon: "text-red-500",
      progress: "bg-red-500",
    };
  }

  if (prediction === "MEDIUM") {
    return {
      badge: "border-amber-200 bg-amber-50 text-amber-600",
      icon: "text-amber-500",
      progress: "bg-amber-500",
    };
  }

  return {
    badge: "border-emerald-200 bg-emerald-50 text-emerald-600",
    icon: "text-emerald-500",
    progress: "bg-emerald-500",
  };
};

const getOverallRisk = (score) => {
  if (score >= 70) return "HIGH";
  if (score >= 45) return "MEDIUM";
  return "LOW";
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

const AI = () => {
  const navigate = useNavigate();

  // Default selected diver = Priya
  const [selectedDiverId, setSelectedDiverId] = useState("DQ-101");

  const selectedDiver = useMemo(() => {
    return divers.find(
      (diver) => diver.id === selectedDiverId
    );
  }, [selectedDiverId]);

  const highRiskCount = divers.filter(
    (diver) => diver.prediction === "HIGH"
  ).length;

  const mediumRiskCount = divers.filter(
    (diver) => diver.prediction === "MEDIUM"
  ).length;

  const lowRiskCount = divers.filter(
    (diver) => diver.prediction === "LOW"
  ).length;

  const averageRisk = Math.round(
    divers.reduce(
      (total, diver) => total + diver.score,
      0
    ) / divers.length
  );

  const overallRisk = getOverallRisk(averageRisk);

  const selectedRiskStyles =
    getRiskStyles(selectedDiver.prediction);

  const overallRiskStyles =
    getRiskStyles(overallRisk);

  const selectedRiskTrend =
    riskTrendData[selectedDiverId];

  const riskFactorChartData =
    selectedDiver.factors.map((factor) => ({
      name: factor.name
        .replace(" Remaining", "")
        .replace(" Trend", ""),
      value: factor.value,
    }));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      <Navbar2 />

      <main className="mx-auto max-w-[1500px] px-5 py-8 lg:px-8">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

          <div>

            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-sky-600">
              <BrainCircuit size={18} />
              AI-POWERED DIVE SUPERVISION
            </div>

            <h1 className="text-3xl font-bold tracking-tight">
              AI Risk & Decision Support
            </h1>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
              AI-assisted risk analysis, early warning signals and
              decision-support insights for the active dive mission.
            </p>

          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
              <Waves size={21} />
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

        {/* =====================================================
            MISSION RISK OVERVIEW
        ===================================================== */}

        <section className="mb-8">

          <div className="mb-4 flex items-center gap-2">

            <Gauge
              size={20}
              className="text-sky-600"
            />

            <h2 className="text-lg font-semibold">
              Mission Risk Overview
            </h2>

          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">

            {/* OVERALL RISK */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="mb-4 flex items-center justify-between">

                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Overall Mission Risk
                </p>

                <ShieldAlert
                  size={19}
                  className={overallRiskStyles.icon}
                />

              </div>

              <div className="flex items-end gap-2">

                <span className="text-4xl font-bold">
                  {averageRisk}
                </span>

                <span className="pb-1 text-sm text-slate-400">
                  / 100
                </span>

              </div>

              <span
                className={`mt-3 inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${overallRiskStyles.badge}`}
              >
                {overallRisk} RISK
              </span>

            </div>

            {/* TOTAL DIVERS */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="mb-4 flex items-center justify-between">

                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Monitored Divers
                </p>

                <Waves
                  size={19}
                  className="text-sky-500"
                />

              </div>

              <p className="text-4xl font-bold">
                {divers.length}
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Active mission divers
              </p>

            </div>

            {/* HIGH */}

            <div className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm">

              <div className="mb-4 flex items-center justify-between">

                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  High Risk
                </p>

                <CircleAlert
                  size={19}
                  className="text-red-500"
                />

              </div>

              <p className="text-4xl font-bold text-red-600">
                {highRiskCount}
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Require attention
              </p>

            </div>

            {/* MEDIUM */}

            <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">

              <div className="mb-4 flex items-center justify-between">

                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Medium Risk
                </p>

                <AlertTriangle
                  size={19}
                  className="text-amber-500"
                />

              </div>

              <p className="text-4xl font-bold text-amber-600">
                {mediumRiskCount}
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Monitor closely
              </p>

            </div>

            {/* LOW */}

            <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">

              <div className="mb-4 flex items-center justify-between">

                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Low Risk
                </p>

                <ShieldAlert
                  size={19}
                  className="text-emerald-500"
                />

              </div>

              <p className="text-4xl font-bold text-emerald-600">
                {lowRiskCount}
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Operating normally
              </p>

            </div>

          </div>

        </section>

        {/* =====================================================
            ALL DIVERS
        ===================================================== */}

        <section className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="flex flex-col gap-2 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <h2 className="text-lg font-semibold">
                Diver Risk Overview
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Select a diver to view detailed AI analysis.
              </p>

            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">

              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>

              AI analysis active

            </div>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[900px]">

              <thead>

                <tr className="border-b border-slate-100 bg-slate-50/70">

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Diver
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Risk Score
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Prediction
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Key Risk
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Status
                  </th>

                  <th className="px-5 py-4"></th>

                </tr>

              </thead>

              <tbody>

                {divers.map((diver) => {

                  const styles =
                    getRiskStyles(diver.prediction);

                  const isSelected =
                    diver.id === selectedDiverId;

                  return (
                    <tr
                      key={diver.id}
                      onClick={() =>
                        setSelectedDiverId(diver.id)
                      }
                      className={`cursor-pointer border-b border-slate-100 transition hover:bg-slate-50 ${
                        isSelected
                          ? "bg-sky-50/60"
                          : ""
                      }`}
                    >

                      {/* DIVER */}

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-xs font-bold text-slate-600">
                            {diver.name
                              .split(" ")
                              .map((word) => word[0])
                              .join("")}
                          </div>

                          <div>

                            <p className="text-sm font-semibold text-slate-800">
                              {diver.name}
                            </p>

                            <p className="text-xs text-slate-400">
                              {diver.id}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* SCORE */}

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-3">

                          <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">

                            <div
                              className={`h-full rounded-full ${styles.progress}`}
                              style={{
                                width: `${diver.score}%`,
                              }}
                            />

                          </div>

                          <span className="text-sm font-bold">
                            {diver.score}
                          </span>

                        </div>

                      </td>

                      {/* PREDICTION */}

                      <td className="px-5 py-4">

                        <span
                          className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${styles.badge}`}
                        >
                          {diver.prediction}
                        </span>

                      </td>

                      {/* KEY RISK */}

                      <td className="px-5 py-4">

                        <div className="flex max-w-[230px] items-center gap-2 text-sm text-slate-600">

                          {diver.warnings.length > 0 ? (
                            <>
                              <AlertTriangle
                                size={15}
                                className={styles.icon}
                              />

                              <span className="truncate">
                                {diver.warnings[0]}
                              </span>
                            </>
                          ) : (
                            <>
                              <ShieldAlert
                                size={15}
                                className="text-emerald-500"
                              />

                              <span>
                                No active risk signal
                              </span>
                            </>
                          )}

                        </div>

                      </td>

                      {/* STATUS */}

                      <td className="px-5 py-4">

                        <span className="text-sm text-slate-500">
                          {diver.status}
                        </span>

                      </td>

                      {/* ARROW */}

                      <td className="px-5 py-4">

                        <ChevronRight
                          size={19}
                          className={
                            isSelected
                              ? "text-sky-600"
                              : "text-slate-300"
                          }
                        />

                      </td>

                    </tr>
                  );
                })}

              </tbody>

            </table>

          </div>

        </section>

        {/* =====================================================
            SELECTED DIVER
        ===================================================== */}

        <section className="mb-5 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">

          <div>

            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-sky-600">
              Selected Diver
            </p>

            <h2 className="text-2xl font-bold">
              {selectedDiver.name}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {selectedDiver.id} · Current AI analysis
            </p>

          </div>

          {/* FIXED REVIEW BUTTON */}

          <button
            onClick={() =>
              navigate(
                `/monitoring/${selectedDiver.id}`
              )
            }
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Review Diver
            <ChevronRight size={17} />
          </button>

        </section>

        {/* =====================================================
            AI SUMMARY
        ===================================================== */}

        <section className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

          {/* RISK SCORE */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="mb-5 flex items-center justify-between">

              <div>

                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  AI Risk Score
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Current diver risk
                </p>

              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500">
                <Gauge size={20} />
              </div>

            </div>

            <div className="flex items-end gap-2">

              <p className="text-5xl font-bold">
                {selectedDiver.score}
              </p>

              <p className="pb-1 text-sm text-slate-400">
                / 100
              </p>

            </div>

            <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-100">

              <div
                className={`h-full rounded-full ${selectedRiskStyles.progress}`}
                style={{
                  width: `${selectedDiver.score}%`,
                }}
              />

            </div>

            <div className="mt-3 flex items-center justify-between">

              <span
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${selectedRiskStyles.badge}`}
              >
                {selectedDiver.prediction} RISK
              </span>

              <span
                className={`flex items-center gap-1 text-xs ${
                  selectedDiver.trend === "Increasing"
                    ? "text-red-500"
                    : "text-emerald-500"
                }`}
              >
                {selectedDiver.trend === "Increasing" ? (
                  <ArrowUp size={14} />
                ) : (
                  <ArrowDown size={14} />
                )}

                {selectedDiver.trend}
              </span>

            </div>

          </div>

          {/* RISK PREDICTION */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="mb-5 flex items-center justify-between">

              <div>

                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  AI Risk Prediction
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Predicted near-term risk
                </p>

              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500">
                <TrendingUp size={20} />
              </div>

            </div>

            <p
              className={`text-3xl font-bold ${
                selectedDiver.prediction === "HIGH"
                  ? "text-red-600"
                  : selectedDiver.prediction === "MEDIUM"
                  ? "text-amber-600"
                  : "text-emerald-600"
              }`}
            >
              {selectedDiver.prediction}
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Current risk prediction based on the available
              telemetry indicators.
            </p>

            <div className="mt-5">

              <div className="mb-2 flex items-center justify-between">

                <span className="text-xs text-slate-500">
                  Confidence
                </span>

                <span className="text-sm font-bold">
                  {selectedDiver.confidence}%
                </span>

              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-100">

                <div
                  className="h-full rounded-full bg-slate-800"
                  style={{
                    width: `${selectedDiver.confidence}%`,
                  }}
                />

              </div>

            </div>

          </div>

          {/* MISSION OUTCOME */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="mb-5 flex items-center justify-between">

              <div>

                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Mission Outcome
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Current AI projection
                </p>

              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
                <ShieldAlert size={20} />
              </div>

            </div>

            <p className="text-2xl font-bold">

              {selectedDiver.score >= 70
                ? "High Risk"
                : selectedDiver.score >= 45
                ? "Monitor Closely"
                : "Likely Stable"}

            </p>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Current mission projection based on the selected
              diver's risk indicators.
            </p>

            <div className="mt-5 flex items-center justify-between">

              <span className="text-xs text-slate-400">
                Confidence
              </span>

              <span className="text-lg font-bold">
                {Math.max(
                  50,
                  selectedDiver.confidence - 8
                )}
                %
              </span>

            </div>

          </div>

          {/* DECISION SUPPORT */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="mb-5 flex items-center justify-between">

              <div>

                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Decision Support
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  AI-assisted recommendation
                </p>

              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                <BrainCircuit size={20} />
              </div>

            </div>

            <p className="text-2xl font-bold">
              {selectedDiver.score >= 70
                ? "Increase Monitoring"
                : selectedDiver.score >= 45
                ? "Monitor Closely"
                : "Continue Monitoring"}
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Suggested action based on the current risk trend.
            </p>

          </div>

        </section>

        {/* =====================================================
            CHARTS
        ===================================================== */}

        <section className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-3">

          {/* RISK TREND */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">

            <div className="mb-5">

              <h3 className="text-lg font-semibold">
                Risk Trend
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                AI risk score progression for {selectedDiver.id}
              </p>

            </div>

            <div className="h-[300px] w-full">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <AreaChart
                  data={selectedRiskTrend}
                >

                  <defs>

                    <linearGradient
                      id="riskGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >

                      <stop
                        offset="0%"
                        stopColor="#ef4444"
                        stopOpacity={0.2}
                      />

                      <stop
                        offset="100%"
                        stopColor="#ef4444"
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
                      fontSize: 12,
                      fill: "#94a3b8",
                    }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    domain={[0, 100]}
                    tick={{
                      fontSize: 12,
                      fill: "#94a3b8",
                    }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="risk"
                    stroke="#ef4444"
                    strokeWidth={3}
                    fill="url(#riskGradient)"
                  />

                </AreaChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* RISK FACTORS */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="mb-5">

              <h3 className="text-lg font-semibold">
                Risk Factors
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Current contribution to risk analysis
              </p>

            </div>

            <div className="h-[300px] w-full">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <BarChart
                  data={riskFactorChartData}
                  layout="vertical"
                  margin={{
                    top: 5,
                    right: 10,
                    left: 5,
                    bottom: 5,
                  }}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                    horizontal={false}
                    stroke="#e2e8f0"
                  />

                  <XAxis
                    type="number"
                    domain={[0, 35]}
                    tick={{
                      fontSize: 11,
                      fill: "#94a3b8",
                    }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    type="category"
                    dataKey="name"
                    width={80}
                    tick={{
                      fontSize: 10,
                      fill: "#64748b",
                    }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <Tooltip />

                  <Bar
                    dataKey="value"
                    fill="#0ea5e9"
                    radius={[0, 6, 6, 0]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>

        </section>

        {/* =====================================================
            EARLY WARNING + DECISION
        ===================================================== */}

        <section className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-2">

          {/* EARLY WARNING */}

          <div className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm">

            <div className="mb-5 flex items-start justify-between">

              <div>

                <div className="flex items-center gap-2">

                  <AlertTriangle
                    size={19}
                    className="text-red-500"
                  />

                  <h3 className="text-lg font-semibold">
                    Early Warning System
                  </h3>

                </div>

                <p className="mt-1 text-sm text-slate-500">
                  Developing risk signals for {selectedDiver.id}
                </p>

              </div>

              <span
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                  selectedDiver.warnings.length > 0
                    ? "border-red-200 bg-red-50 text-red-600"
                    : "border-emerald-200 bg-emerald-50 text-emerald-600"
                }`}
              >
                {selectedDiver.warnings.length > 0
                  ? "ACTIVE"
                  : "CLEAR"}
              </span>

            </div>

            {selectedDiver.warnings.length > 0 ? (
              <div className="space-y-3">

                {selectedDiver.warnings.map(
                  (warning, index) => (

                    <div
                      key={warning}
                      className="flex items-center gap-3 rounded-xl border border-red-100 bg-red-50/50 px-4 py-3"
                    >

                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-red-500 shadow-sm">

                        <AlertTriangle size={16} />

                      </div>

                      <div className="flex-1">

                        <p className="text-sm font-medium text-slate-700">
                          {warning}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-400">
                          Signal{" "}
                          {String(index + 1).padStart(
                            2,
                            "0"
                          )}{" "}
                          · Active
                        </p>

                      </div>

                      <TrendingUp
                        size={17}
                        className="text-red-500"
                      />

                    </div>

                  )
                )}

              </div>
            ) : (
              <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-5">

                <p className="text-sm font-semibold text-emerald-700">
                  No active early warning signals.
                </p>

                <p className="mt-1 text-sm text-emerald-600">
                  Current indicators are within the expected range.
                </p>

              </div>
            )}

            <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">

              <div>

                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Trend
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {selectedDiver.trend}
                </p>

              </div>

              <div>

                <p className="text-right text-xs uppercase tracking-wide text-slate-400">
                  Severity
                </p>

                <p
                  className={`mt-1 text-right text-sm font-semibold ${
                    selectedDiver.prediction === "HIGH"
                      ? "text-red-600"
                      : selectedDiver.prediction === "MEDIUM"
                      ? "text-amber-600"
                      : "text-emerald-600"
                  }`}
                >
                  {selectedDiver.prediction}
                </p>

              </div>

            </div>

          </div>

          {/* DECISION RECOMMENDATIONS */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="mb-5 flex items-start justify-between">

              <div>

                <div className="flex items-center gap-2">

                  <BrainCircuit
                    size={19}
                    className="text-sky-600"
                  />

                  <h3 className="text-lg font-semibold">
                    Decision Recommendations
                  </h3>

                </div>

                <p className="mt-1 text-sm text-slate-500">
                  AI suggestions for supervisor review
                </p>

              </div>

              <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-600">
                AI SUPPORT
              </span>

            </div>

            <div className="space-y-3">

              {(selectedDiver.prediction === "HIGH"
                ? [
                    "Increase monitoring frequency",
                    "Review current gas remaining",
                    "Assess depth and ascent status",
                    "Continue close observation",
                  ]
                : selectedDiver.prediction === "MEDIUM"
                ? [
                    "Monitor heart rate trend",
                    "Review current depth",
                    "Continue telemetry monitoring",
                    "Reassess risk if indicators increase",
                  ]
                : [
                    "Continue standard monitoring",
                    "Maintain current mission profile",
                    "Review telemetry periodically",
                  ]
              ).map((recommendation, index) => (

                <div
                  key={recommendation}
                  className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"
                >

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-sm font-bold text-sky-600 shadow-sm">
                    {index + 1}
                  </div>

                  <p className="flex-1 text-sm font-medium text-slate-700">
                    {recommendation}
                  </p>

                  <ChevronRight
                    size={17}
                    className="text-slate-300"
                  />

                </div>

              ))}

            </div>

            <button
              onClick={() =>
                navigate(
                  `/monitoring/${selectedDiver.id}`
                )
              }
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
            >
              Review Diver Telemetry
              <ChevronRight size={17} />
            </button>

          </div>

        </section>

        {/* =====================================================
            EXPLAINABLE AI
        ===================================================== */}

        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="mb-6">

            <div className="flex items-center gap-2">

              <ShieldAlert
                size={19}
                className="text-slate-700"
              />

              <h3 className="text-lg font-semibold">
                Explainable AI
              </h3>

            </div>

            <p className="mt-1 text-sm text-slate-500">
              Why is this risk status active for{" "}
              {selectedDiver.id}?
            </p>

          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

            {selectedDiver.factors.map((factor) => {

              const normal =
                factor.status === "NORMAL";

              return (
                <div
                  key={factor.name}
                  className={`rounded-xl border p-4 ${
                    normal
                      ? "border-slate-100 bg-slate-50"
                      : "border-red-100 bg-red-50/40"
                  }`}
                >

                  <div className="flex items-start gap-3">

                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white ${
                        normal
                          ? "text-slate-500"
                          : "text-red-500"
                      }`}
                    >

                      {factor.name ===
                      "Heart Rate" ? (
                        <HeartPulse size={18} />
                      ) : factor.name ===
                        "Gas Remaining" ? (
                        <Wind size={18} />
                      ) : factor.name ===
                        "Depth Trend" ? (
                        <ArrowDown size={18} />
                      ) : factor.name ===
                        "Ascent Rate" ? (
                        <ArrowUp size={18} />
                      ) : (
                        <Gauge size={18} />
                      )}

                    </div>

                    <div className="min-w-0 flex-1">

                      <div className="flex flex-wrap items-center justify-between gap-2">

                        <p className="text-sm font-semibold text-slate-800">
                          {factor.name}
                        </p>

                        <span
                          className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                            normal
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-red-50 text-red-600"
                          }`}
                        >
                          {factor.status}
                        </span>

                      </div>

                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        {factor.description}
                      </p>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

        </section>

        {/* =====================================================
            TELEMETRY
        ===================================================== */}

        <section className="mb-8">

          <div className="mb-4">

            <h3 className="text-lg font-semibold">
              Current Telemetry Snapshot
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Current values used in AI analysis.
            </p>

          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

            {/* HEART RATE */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-500">
                <HeartPulse size={18} />
              </div>

              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Heart Rate
              </p>

              <div className="mt-2 flex items-end gap-1">

                <p className="text-2xl font-bold">
                  {selectedDiver.heartRate}
                </p>

                <span className="pb-0.5 text-xs text-slate-400">
                  BPM
                </span>

              </div>

            </div>

            {/* DEPTH */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                <ArrowDown size={18} />
              </div>

              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Current Depth
              </p>

              <div className="mt-2 flex items-end gap-1">

                <p className="text-2xl font-bold">
                  {selectedDiver.depth}
                </p>

                <span className="pb-0.5 text-xs text-slate-400">
                  m
                </span>

              </div>

              <p className="mt-1 text-xs text-slate-400">
                Planned: {selectedDiver.plannedDepth} m
              </p>

            </div>

            {/* GAS */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-500">
                <Wind size={18} />
              </div>

              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Gas Remaining
              </p>

              <div className="mt-2 flex items-end gap-1">

                <p className="text-2xl font-bold">
                  {selectedDiver.gas}
                </p>

                <span className="pb-0.5 text-xs text-slate-400">
                  %
                </span>

              </div>

            </div>

            {/* DIVE TIME */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-purple-500">
                <Gauge size={18} />
              </div>

              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Dive Time
              </p>

              <div className="mt-2 flex items-end gap-1">

                <p className="text-2xl font-bold">
                  {selectedDiver.diveTime}
                </p>

                <span className="pb-0.5 text-xs text-slate-400">
                  / {selectedDiver.plannedTime} min
                </span>

              </div>

            </div>

          </div>

        </section>

        {/* =====================================================
            AI SUPERVISOR ASSISTANT
        ===================================================== */}

        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="mb-5 flex items-start gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
              <BrainCircuit size={22} />
            </div>

            <div>

              <h3 className="text-lg font-semibold">
                AI Supervisor Assistant
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Dive supervision focused assistance for{" "}
                {selectedDiver.name}.
              </p>

            </div>

          </div>

          <div className="rounded-xl border border-sky-100 bg-sky-50/60 p-5">

            <p className="text-sm font-semibold text-slate-800">
              {selectedDiver.id} · {selectedDiver.name}
            </p>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">

              {selectedDiver.prediction === "HIGH"
                ? "Multiple risk indicators are currently present. The diver should be reviewed closely."
                : selectedDiver.prediction === "MEDIUM"
                ? "Some developing indicators require closer observation."
                : "Current indicators are within the expected operating range."}

            </p>

            <div className="mt-4 flex flex-wrap gap-3">

              <button
                onClick={() =>
                  navigate(
                    `/monitoring/${selectedDiver.id}`
                  )
                }
                className="rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700"
              >
                Review Diver
              </button>

              <button
                onClick={() => navigate("/dashboard")}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Back to Dashboard
              </button>

            </div>

          </div>

        </section>

        {/* =====================================================
            BACKEND NOTE
        ===================================================== */}

        <div className="rounded-xl border border-sky-100 bg-sky-50 px-5 py-4">

          <div className="flex items-start gap-3">

            <BrainCircuit
              size={19}
              className="mt-0.5 shrink-0 text-sky-600"
            />

            <p className="text-sm leading-6 text-sky-800">

              Current AI values are frontend mock data.
              Later, these values can be replaced with backend
              responses while keeping the same UI structure.

            </p>

          </div>

        </div>

      </main>
    </div>
  );
};

export default AI;