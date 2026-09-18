import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar2 from "../components/Navbar2";

import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  BrainCircuit,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  Gauge,
  HeartPulse,
  MapPin,
  Printer,
  ShieldAlert,
  User,
  Waves,
  Wind,
} from "lucide-react";

/* =========================================================
   MOCK REPORT DATA
   IDs + names match Dashboard / Monitoring / AI
========================================================= */

const divers = [
  {
    id: "DQ-101",
    name: "Priya Sharma",
    role: "Lead Diver",
    age: 26,
    experience: "5 Years",
    certification: "Advanced Rescue Diver",

    mission: "Pipeline Inspection Alpha",
    missionId: "M-204",
    location: "Arabian Sea Zone A",
    date: "18 Sep 2026",
    startTime: "09:00 AM",
    endTime: "10:15 AM",

    risk: "LOW",
    riskScore: 28,
    aiConfidence: 91,

    heartRate: 82,
    maxHeartRate: 86,

    depth: 24,
    maxDepth: 27,

    gasRemaining: 78,
    gasConsumed: 22,

    ascentRate: 5,
    maxAscentRate: 6,

    diveTime: 35,
    plannedDiveTime: 60,

    decompressionWarnings: 0,
    highAscentEvents: 0,

    missionOutcome: "Completed",
    performanceStatus: "Normal",

    warnings: [],

    aiSummary:
      "Current telemetry remained within the planned mission profile. No major risk indicators were detected during the recorded dive.",

    recommendations: [
      "Continue standard monitoring",
      "Maintain planned dive profile",
      "Review telemetry periodically",
    ],

    supervisorActions: [
      "Reviewed diver telemetry",
      "Confirmed mission checkpoint",
      "Completed routine monitoring",
    ],
  },

  {
    id: "DQ-102",
    name: "Rahul Singh",
    role: "Inspection Diver",
    age: 27,
    experience: "6 Years",
    certification: "Commercial Diver",

    mission: "Pipeline Inspection Alpha",
    missionId: "M-204",
    location: "Arabian Sea Zone A",
    date: "18 Sep 2026",
    startTime: "09:00 AM",
    endTime: "10:15 AM",

    risk: "MEDIUM",
    riskScore: 58,
    aiConfidence: 82,

    heartRate: 108,
    maxHeartRate: 110,

    depth: 37,
    maxDepth: 38,

    gasRemaining: 62,
    gasConsumed: 38,

    ascentRate: 9,
    maxAscentRate: 10,

    diveTime: 43,
    plannedDiveTime: 60,

    decompressionWarnings: 1,
    highAscentEvents: 2,

    missionOutcome: "Completed with Monitoring",
    performanceStatus: "Monitor Closely",

    warnings: [
      {
        type: "Heart Rate Elevated",
        severity: "MEDIUM",
        time: "10:40:12",
        description:
          "Heart rate was higher than recent telemetry readings.",
      },
      {
        type: "Depth Deviation",
        severity: "MEDIUM",
        time: "10:35:30",
        description:
          "Current depth exceeded the planned mission depth.",
      },
    ],

    aiSummary:
      "The AI analysis detected developing physiological and depth-related signals. The diver remained under active supervision throughout the mission.",

    recommendations: [
      "Monitor heart rate trend closely",
      "Review current depth against the mission plan",
      "Continue telemetry monitoring",
      "Reassess risk if indicators increase",
    ],

    supervisorActions: [
      "Reviewed elevated heart-rate telemetry",
      "Reviewed depth deviation",
      "Maintained close monitoring",
      "Acknowledged active alerts",
    ],
  },

  {
    id: "DQ-103",
    name: "Amit Verma",
    role: "Inspection Diver",
    age: 25,
    experience: "4 Years",
    certification: "Advanced Rescue Diver",

    mission: "Pipeline Inspection Alpha",
    missionId: "M-204",
    location: "Arabian Sea Zone A",
    date: "18 Sep 2026",
    startTime: "09:00 AM",
    endTime: "10:15 AM",

    risk: "LOW",
    riskScore: 24,
    aiConfidence: 94,

    heartRate: 78,
    maxHeartRate: 82,

    depth: 18,
    maxDepth: 21,

    gasRemaining: 84,
    gasConsumed: 18,

    ascentRate: 5,
    maxAscentRate: 5,

    diveTime: 31,
    plannedDiveTime: 55,

    decompressionWarnings: 0,
    highAscentEvents: 0,

    missionOutcome: "Completed",
    performanceStatus: "Normal",

    warnings: [],

    aiSummary:
      "Telemetry remained stable with no major early-warning indicators. The diver remained within the planned operational profile.",

    recommendations: [
      "Continue standard monitoring",
      "Maintain current mission profile",
      "Review telemetry periodically",
    ],

    supervisorActions: [
      "Reviewed diver telemetry",
      "Confirmed mission progress",
      "Completed routine supervision",
    ],
  },

  {
    id: "DQ-104",
    name: "Neha Gupta",
    role: "Support Diver",
    age: 30,
    experience: "7 Years",
    certification: "Commercial Diver",

    mission: "Pipeline Inspection Alpha",
    missionId: "M-204",
    location: "Arabian Sea Zone A",
    date: "18 Sep 2026",
    startTime: "09:00 AM",
    endTime: "10:15 AM",

    risk: "HIGH",
    riskScore: 81,
    aiConfidence: 92,

    heartRate: 124,
    maxHeartRate: 124,

    depth: 41,
    maxDepth: 45,

    gasRemaining: 42,
    gasConsumed: 58,

    ascentRate: 13,
    maxAscentRate: 13,

    diveTime: 51,
    plannedDiveTime: 60,

    decompressionWarnings: 2,
    highAscentEvents: 4,

    missionOutcome: "Completed with High-Risk Events",
    performanceStatus: "Immediate Attention",

    warnings: [
      {
        type: "Oxygen Warning",
        severity: "HIGH",
        time: "10:42:18",
        description:
          "Oxygen level moved into a monitored warning range.",
      },
      {
        type: "Ascent Rate Warning",
        severity: "HIGH",
        time: "10:38:45",
        description:
          "Detected ascent rate exceeded the configured monitoring threshold.",
      },
      {
        type: "Heart Rate Elevated",
        severity: "HIGH",
        time: "10:40:22",
        description:
          "Heart rate was significantly elevated compared with previous readings.",
      },
    ],

    aiSummary:
      "Multiple risk indicators were detected during the mission, including elevated heart rate, depth deviation and high ascent-rate events. The diver remained under enhanced supervision.",

    recommendations: [
      "Increase monitoring frequency",
      "Review current telemetry",
      "Assess depth and ascent status",
      "Continue close observation",
    ],

    supervisorActions: [
      "Reviewed high-risk telemetry",
      "Reviewed ascent-rate warning",
      "Reviewed elevated heart-rate signal",
      "Maintained enhanced monitoring",
      "Acknowledged high-severity alerts",
    ],
  },
];

/* =========================================================
   HELPERS
========================================================= */

const getRiskClasses = (risk) => {
  if (risk === "HIGH") {
    return {
      badge: "border-red-200 bg-red-50 text-red-600",
      bg: "bg-red-50",
      text: "text-red-600",
    };
  }

  if (risk === "MEDIUM") {
    return {
      badge: "border-amber-200 bg-amber-50 text-amber-600",
      bg: "bg-amber-50",
      text: "text-amber-600",
    };
  }

  return {
    badge: "border-emerald-200 bg-emerald-50 text-emerald-600",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
  };
};

const getSeverityClasses = (severity) => {
  if (severity === "HIGH") {
    return "border-red-200 bg-red-50 text-red-600";
  }

  return "border-amber-200 bg-amber-50 text-amber-600";
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

function Reports() {
  const navigate = useNavigate();

  const [selectedDiverId, setSelectedDiverId] =
    useState("DQ-101");

  const [showPrintView, setShowPrintView] =
    useState(false);

  const selectedDiver = useMemo(() => {
    return (
      divers.find(
        (diver) => diver.id === selectedDiverId
      ) || divers[0]
    );
  }, [selectedDiverId]);

  const riskStyles = getRiskClasses(
    selectedDiver.risk
  );

  /* =======================================================
     PRINT
  ======================================================= */

  const handlePrint = () => {
    setShowPrintView(true);

    setTimeout(() => {
      window.print();
      setShowPrintView(false);
    }, 200);
  };

  return (
    <>
      {/* ===================================================
          PRINT STYLES
      =================================================== */}

      <style>
        {`
          @media print {

            body {
              background: white !important;
              margin: 0 !important;
              padding: 0 !important;
            }

            body * {
              visibility: hidden;
            }

            .print-area,
            .print-area * {
              visibility: visible;
            }

            .print-area {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              padding: 35px;
              background: white !important;
            }

            .no-print {
              display: none !important;
            }

            @page {
              size: A4;
              margin: 12mm;
            }
          }
        `}
      </style>

      <div className="no-print">
        <Navbar2 />
      </div>

      <div className="min-h-screen bg-slate-50 p-6 no-print">

        <div className="mx-auto max-w-[1500px]">

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

            <div>

              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-sky-600">
                <FileText size={18} />
                DIVEQ REPORT CENTER
              </div>

              <h1 className="text-3xl font-bold text-slate-900">
                Diver Reports
              </h1>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
                Select a diver to view and print their individual
                dive report.
              </p>

            </div>

            <button
              onClick={handlePrint}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-sky-700"
            >
              <Printer size={18} />
              Print {selectedDiver.name}'s Report
            </button>

          </div>

          {/* =================================================
              SELECT DIVER
          ================================================= */}

          <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="mb-5">

              <h2 className="text-lg font-semibold">
                Select Diver
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Choose which diver's report you want to review.
              </p>

            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

              {divers.map((diver) => {

                const selected =
                  diver.id === selectedDiverId;

                const styles =
                  getRiskClasses(diver.risk);

                return (
                  <button
                    key={diver.id}
                    onClick={() =>
                      setSelectedDiverId(diver.id)
                    }
                    className={`rounded-2xl border p-5 text-left transition ${
                      selected
                        ? "border-sky-300 bg-sky-50 ring-1 ring-sky-200"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >

                    <div className="flex items-start justify-between">

                      <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
                          <User
                            size={20}
                            className="text-slate-600"
                          />
                        </div>

                        <div>

                          <p className="font-semibold text-slate-800">
                            {diver.name}
                          </p>

                          <p className="text-xs text-slate-400">
                            {diver.id}
                          </p>

                        </div>

                      </div>

                      <span
                        className={`rounded-full border px-2.5 py-1 text-[10px] font-bold ${styles.badge}`}
                      >
                        {diver.risk}
                      </span>

                    </div>

                    <div className="mt-4 flex items-center justify-between">

                      <span className="text-xs text-slate-400">
                        Risk Score
                      </span>

                      <span className="text-sm font-bold">
                        {diver.riskScore}/100
                      </span>

                    </div>

                  </button>
                );
              })}

            </div>

          </section>

          {/* =================================================
              REPORT PREVIEW
          ================================================= */}

          <div className="print-area rounded-2xl border border-slate-200 bg-white shadow-sm">

            {/* REPORT HEADER */}

            <div className="border-b border-slate-200 px-6 py-7 md:px-8">

              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

                <div>

                  <div className="flex items-center gap-2 text-sm font-semibold text-sky-600">

                    <FileText size={18} />

                    DIVER REPORT

                  </div>

                  <h2 className="mt-2 text-3xl font-bold text-slate-900">
                    {selectedDiver.name}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Diver ID: {selectedDiver.id}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Mission: {selectedDiver.mission}
                  </p>

                </div>

                <div className="text-left md:text-right">

                  <span
                    className={`inline-flex rounded-full border px-4 py-2 text-sm font-bold ${riskStyles.badge}`}
                  >
                    {selectedDiver.risk} RISK
                  </span>

                  <p className="mt-3 text-xs text-slate-400">
                    Report ID
                  </p>

                  <p className="text-sm font-semibold text-slate-700">
                    RPT-{selectedDiver.missionId}-
                    {selectedDiver.id}
                  </p>

                </div>

              </div>

            </div>

            {/* =================================================
                MISSION DETAILS
            ================================================= */}

            <section className="border-b border-slate-100 px-6 py-7 md:px-8">

              <div className="mb-5 flex items-center gap-2">

                <Waves
                  size={20}
                  className="text-sky-600"
                />

                <h3 className="text-lg font-bold">
                  Mission Information
                </h3>

              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

                <div className="rounded-xl bg-slate-50 p-4">

                  <div className="flex items-center gap-2 text-slate-400">
                    <FileText size={16} />
                    <span className="text-xs uppercase">
                      Mission ID
                    </span>
                  </div>

                  <p className="mt-2 font-semibold">
                    {selectedDiver.missionId}
                  </p>

                </div>

                <div className="rounded-xl bg-slate-50 p-4">

                  <div className="flex items-center gap-2 text-slate-400">
                    <MapPin size={16} />
                    <span className="text-xs uppercase">
                      Location
                    </span>
                  </div>

                  <p className="mt-2 font-semibold">
                    {selectedDiver.location}
                  </p>

                </div>

                <div className="rounded-xl bg-slate-50 p-4">

                  <div className="flex items-center gap-2 text-slate-400">
                    <CalendarDays size={16} />
                    <span className="text-xs uppercase">
                      Date
                    </span>
                  </div>

                  <p className="mt-2 font-semibold">
                    {selectedDiver.date}
                  </p>

                </div>

                <div className="rounded-xl bg-slate-50 p-4">

                  <div className="flex items-center gap-2 text-slate-400">
                    <Clock3 size={16} />
                    <span className="text-xs uppercase">
                      Dive Duration
                    </span>
                  </div>

                  <p className="mt-2 font-semibold">
                    {selectedDiver.diveTime} min
                  </p>

                </div>

              </div>

              <div className="mt-4 rounded-xl border border-slate-200 p-4">

                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Mission Outcome
                </p>

                <p className="mt-2 text-sm font-semibold text-slate-800">
                  {selectedDiver.missionOutcome}
                </p>

              </div>

            </section>

            {/* =================================================
                DIVER PROFILE
            ================================================= */}

            <section className="border-b border-slate-100 px-6 py-7 md:px-8">

              <div className="mb-5 flex items-center gap-2">

                <User
                  size={20}
                  className="text-sky-600"
                />

                <h3 className="text-lg font-bold">
                  Diver Profile
                </h3>

              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                <div>
                  <p className="text-xs uppercase text-slate-400">
                    Name
                  </p>

                  <p className="mt-1 font-semibold">
                    {selectedDiver.name}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase text-slate-400">
                    Diver ID
                  </p>

                  <p className="mt-1 font-semibold">
                    {selectedDiver.id}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase text-slate-400">
                    Role
                  </p>

                  <p className="mt-1 font-semibold">
                    {selectedDiver.role}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase text-slate-400">
                    Age
                  </p>

                  <p className="mt-1 font-semibold">
                    {selectedDiver.age}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase text-slate-400">
                    Experience
                  </p>

                  <p className="mt-1 font-semibold">
                    {selectedDiver.experience}
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <p className="text-xs uppercase text-slate-400">
                    Certification
                  </p>

                  <p className="mt-1 font-semibold">
                    {selectedDiver.certification}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase text-slate-400">
                    Performance Status
                  </p>

                  <p className="mt-1 font-semibold">
                    {selectedDiver.performanceStatus}
                  </p>
                </div>

              </div>

            </section>

            {/* =================================================
                PERFORMANCE
            ================================================= */}

            <section className="border-b border-slate-100 px-6 py-7 md:px-8">

              <div className="mb-5 flex items-center gap-2">

                <Gauge
                  size={20}
                  className="text-sky-600"
                />

                <h3 className="text-lg font-bold">
                  Dive Performance
                </h3>

              </div>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

                {/* AVG HR */}

                <div className="rounded-xl border border-slate-200 p-4">

                  <HeartPulse
                    size={20}
                    className="text-red-500"
                  />

                  <p className="mt-3 text-xs uppercase text-slate-400">
                    Heart Rate
                  </p>

                  <p className="mt-1 text-2xl font-bold">
                    {selectedDiver.heartRate}
                    <span className="ml-1 text-xs text-slate-400">
                      BPM
                    </span>
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Max: {selectedDiver.maxHeartRate} BPM
                  </p>

                </div>

                {/* DEPTH */}

                <div className="rounded-xl border border-slate-200 p-4">

                  <ArrowDown
                    size={20}
                    className="text-sky-600"
                  />

                  <p className="mt-3 text-xs uppercase text-slate-400">
                    Maximum Depth
                  </p>

                  <p className="mt-1 text-2xl font-bold">
                    {selectedDiver.maxDepth}
                    <span className="ml-1 text-xs text-slate-400">
                      m
                    </span>
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Current: {selectedDiver.depth} m
                  </p>

                </div>

                {/* GAS */}

                <div className="rounded-xl border border-slate-200 p-4">

                  <Wind
                    size={20}
                    className="text-amber-500"
                  />

                  <p className="mt-3 text-xs uppercase text-slate-400">
                    Gas Consumption
                  </p>

                  <p className="mt-1 text-2xl font-bold">
                    {selectedDiver.gasConsumed}
                    <span className="ml-1 text-xs text-slate-400">
                      %
                    </span>
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Remaining: {selectedDiver.gasRemaining}%
                  </p>

                </div>

                {/* ASCENT */}

                <div className="rounded-xl border border-slate-200 p-4">

                  <ArrowUp
                    size={20}
                    className="text-orange-500"
                  />

                  <p className="mt-3 text-xs uppercase text-slate-400">
                    Maximum Ascent
                  </p>

                  <p className="mt-1 text-2xl font-bold">
                    {selectedDiver.maxAscentRate}
                    <span className="ml-1 text-xs text-slate-400">
                      m/min
                    </span>
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    High events: {selectedDiver.highAscentEvents}
                  </p>

                </div>

              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">

                <div className="rounded-xl bg-slate-50 p-4">

                  <p className="text-xs uppercase text-slate-400">
                    Dive Time
                  </p>

                  <p className="mt-1 text-xl font-bold">
                    {selectedDiver.diveTime} min
                  </p>

                  <p className="text-xs text-slate-400">
                    Planned: {selectedDiver.plannedDiveTime} min
                  </p>

                </div>

                <div className="rounded-xl bg-slate-50 p-4">

                  <p className="text-xs uppercase text-slate-400">
                    Decompression Warnings
                  </p>

                  <p className="mt-1 text-xl font-bold">
                    {selectedDiver.decompressionWarnings}
                  </p>

                </div>

              </div>

            </section>

            {/* =================================================
                RISK ANALYSIS
            ================================================= */}

            <section className="border-b border-slate-100 px-6 py-7 md:px-8">

              <div className="mb-5 flex items-center gap-2">

                <ShieldAlert
                  size={20}
                  className="text-sky-600"
                />

                <h3 className="text-lg font-bold">
                  Risk Analysis
                </h3>

              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                <div
                  className={`rounded-xl border p-5 ${riskStyles.bg}`}
                >

                  <div className="flex items-center justify-between">

                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      AI Risk Score
                    </p>

                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-bold ${riskStyles.badge}`}
                    >
                      {selectedDiver.risk}
                    </span>

                  </div>

                  <div className="mt-4 flex items-end gap-2">

                    <p
                      className={`text-4xl font-bold ${riskStyles.text}`}
                    >
                      {selectedDiver.riskScore}
                    </p>

                    <p className="pb-1 text-sm text-slate-400">
                      / 100
                    </p>

                  </div>

                  <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white">

                    <div
                      className={`h-full rounded-full ${
                        selectedDiver.risk === "HIGH"
                          ? "bg-red-500"
                          : selectedDiver.risk === "MEDIUM"
                          ? "bg-amber-500"
                          : "bg-emerald-500"
                      }`}
                      style={{
                        width: `${selectedDiver.riskScore}%`,
                      }}
                    />

                  </div>

                  <p className="mt-3 text-xs text-slate-500">
                    AI confidence:{" "}
                    {selectedDiver.aiConfidence}%
                  </p>

                </div>

                <div className="rounded-xl border border-slate-200 p-5">

                  <div className="flex items-center gap-2">

                    <BrainCircuit
                      size={19}
                      className="text-sky-600"
                    />

                    <p className="font-semibold">
                      AI Analysis Summary
                    </p>

                  </div>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {selectedDiver.aiSummary}
                  </p>

                </div>

              </div>

            </section>

            {/* =================================================
                ALERTS
            ================================================= */}

            <section className="border-b border-slate-100 px-6 py-7 md:px-8">

              <div className="mb-5 flex items-center justify-between">

                <div className="flex items-center gap-2">

                  <AlertTriangle
                    size={20}
                    className="text-amber-500"
                  />

                  <h3 className="text-lg font-bold">
                    Alerts & Events
                  </h3>

                </div>

                <span className="text-sm text-slate-400">
                  {selectedDiver.warnings.length} recorded
                </span>

              </div>

              {selectedDiver.warnings.length === 0 ? (

                <div className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-5">

                  <CheckCircle2
                    size={20}
                    className="text-emerald-600"
                  />

                  <div>

                    <p className="font-semibold text-emerald-700">
                      No alerts recorded
                    </p>

                    <p className="mt-1 text-sm text-emerald-600">
                      No active warning events were recorded for this diver.
                    </p>

                  </div>

                </div>

              ) : (

                <div className="space-y-3">

                  {selectedDiver.warnings.map(
                    (warning, index) => (

                      <div
                        key={`${warning.type}-${index}`}
                        className="rounded-xl border border-slate-200 p-4"
                      >

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                          <div>

                            <div className="flex flex-wrap items-center gap-2">

                              <span
                                className={`rounded-full border px-2.5 py-1 text-[10px] font-bold ${getSeverityClasses(
                                  warning.severity
                                )}`}
                              >
                                {warning.severity}
                              </span>

                              <span className="text-sm font-semibold">
                                {warning.type}
                              </span>

                            </div>

                            <p className="mt-2 text-sm text-slate-600">
                              {warning.description}
                            </p>

                          </div>

                          <div className="shrink-0 text-sm text-slate-400">
                            {warning.time}
                          </div>

                        </div>

                      </div>

                    )
                  )}

                </div>

              )}

            </section>

            {/* =================================================
                RECOMMENDATIONS
            ================================================= */}

            <section className="border-b border-slate-100 px-6 py-7 md:px-8">

              <div className="mb-5 flex items-center gap-2">

                <BrainCircuit
                  size={20}
                  className="text-sky-600"
                />

                <h3 className="text-lg font-bold">
                  AI Decision Support
                </h3>

              </div>

              <div className="space-y-3">

                {selectedDiver.recommendations.map(
                  (recommendation, index) => (

                    <div
                      key={recommendation}
                      className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4"
                    >

                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-sm font-bold text-sky-600">
                        {index + 1}
                      </div>

                      <p className="text-sm font-medium text-slate-700">
                        {recommendation}
                      </p>

                    </div>

                  )
                )}

              </div>

            </section>

            {/* =================================================
                SUPERVISOR ACTIONS
            ================================================= */}

            <section className="px-6 py-7 md:px-8">

              <div className="mb-5 flex items-center gap-2">

                <CheckCircle2
                  size={20}
                  className="text-emerald-600"
                />

                <h3 className="text-lg font-bold">
                  Supervisor Actions
                </h3>

              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">

                {selectedDiver.supervisorActions.map(
                  (action, index) => (

                    <div
                      key={action}
                      className="flex items-center gap-3 rounded-xl border border-slate-200 p-4"
                    >

                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-sm font-bold text-emerald-600">
                        {index + 1}
                      </div>

                      <p className="text-sm font-medium text-slate-700">
                        {action}
                      </p>

                    </div>

                  )
                )}

              </div>

            </section>

            {/* =================================================
                SIGNATURE / FOOTER
            ================================================= */}

            <div className="border-t border-slate-200 bg-slate-50 px-6 py-6 md:px-8">

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                <div>

                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Report Generated For
                  </p>

                  <p className="mt-1 font-semibold">
                    {selectedDiver.name} ·{" "}
                    {selectedDiver.id}
                  </p>

                </div>

                <div className="md:text-right">

                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Report Status
                  </p>

                  <p className="mt-1 font-semibold text-emerald-600">
                    Ready for Review
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              BOTTOM ACTIONS
          ================================================= */}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end no-print">

            <button
              onClick={() =>
                navigate(
                  `/monitoring/${selectedDiver.id}`
                )
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Open Monitoring
              <ChevronRight size={17} />
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-700"
            >
              <Printer size={17} />
              Print This Report
            </button>

          </div>

          {/* =================================================
              BACKEND NOTE
          ================================================= */}

          <div className="mt-6 rounded-xl border border-sky-100 bg-sky-50 px-5 py-4 no-print">

            <p className="text-sm leading-6 text-sky-800">
              This report currently uses frontend mock data. Later,
              the selected diver's report information can be loaded
              dynamically from the backend, while the same report
              layout and print functionality can be retained.
            </p>

          </div>

        </div>
      </div>

      {/* =====================================================
          PRINT STATE
      ===================================================== */}

      {showPrintView && (
        <div className="hidden">
          Preparing report for printing...
        </div>
      )}
    </>
  );
}

export default Reports;