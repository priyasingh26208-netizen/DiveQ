import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar2 from "../components/Navbar2";

import {
  Brain,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Activity,
  Waves,
  HeartPulse,
  Gauge,
  Battery,
  Wind,
  UserRound,
  Clock3,
  FileText,
  RotateCcw,
  Siren,
} from "lucide-react";

const decisionData = [
  {
    id: "DQ-101",
    name: "Priya Sharma",
    riskScore: 28,
    riskLevel: "LOW",
    status: "SAFE",
    heartRate: 82,
    oxygen: 91,
    depth: 24,
    battery: 88,
    ascentRate: 5,
    diveTime: 35,
    recommendation: "Continue Mission",
    priority: "LOW",
    confidence: 91,
    reason:
      "Current telemetry is within the expected operating range. No major risk escalation is detected.",
    factors: [
      "Stable heart rate",
      "Healthy oxygen level",
      "Controlled depth",
      "Normal ascent behaviour",
    ],
  },

  {
    id: "DQ-102",
    name: "Rahul Singh",
    riskScore: 58,
    riskLevel: "MEDIUM",
    status: "WARNING",
    heartRate: 108,
    oxygen: 62,
    depth: 37,
    battery: 70,
    ascentRate: 9,
    diveTime: 43,
    recommendation: "Increase Monitoring",
    priority: "MEDIUM",
    confidence: 82,
    reason:
      "Elevated heart rate and reduced oxygen reserve indicate increased operational risk.",
    factors: [
      "Elevated heart rate",
      "Reduced oxygen level",
      "Increasing depth exposure",
      "Recent medium-severity alerts",
    ],
  },

  {
    id: "DQ-103",
    name: "Amit Verma",
    riskScore: 24,
    riskLevel: "LOW",
    status: "SAFE",
    heartRate: 78,
    oxygen: 84,
    depth: 18,
    battery: 92,
    ascentRate: 5,
    diveTime: 31,
    recommendation: "Continue Monitoring",
    priority: "LOW",
    confidence: 94,
    reason:
      "Telemetry remains stable and the current dive profile shows no significant warning indicators.",
    factors: [
      "Stable heart rate",
      "Good oxygen reserve",
      "Moderate depth",
      "High device battery",
    ],
  },

  {
    id: "DQ-104",
    name: "Neha Gupta",
    riskScore: 81,
    riskLevel: "HIGH",
    status: "CRITICAL",
    heartRate: 124,
    oxygen: 42,
    depth: 41,
    battery: 61,
    ascentRate: 13,
    diveTime: 51,
    recommendation: "Start Controlled Ascent",
    priority: "HIGH",
    confidence: 92,
    reason:
      "High heart rate, low oxygen reserve, increased depth and elevated ascent rate are combining into a high-risk condition.",
    factors: [
      "High heart rate",
      "Low oxygen reserve",
      "Deep operating depth",
      "Elevated ascent rate",
      "High cumulative dive time",
    ],
  },
];

const decisionHistory = [
  {
    time: "10:08 AM",
    diver: "Neha Gupta",
    id: "DQ-104",
    decision: "Increase Monitoring",
    status: "PENDING",
  },
  {
    time: "10:03 AM",
    diver: "Rahul Singh",
    id: "DQ-102",
    decision: "Closer Observation",
    status: "ACKNOWLEDGED",
  },
  {
    time: "09:56 AM",
    diver: "Priya Sharma",
    id: "DQ-101",
    decision: "Continue Mission",
    status: "EXECUTED",
  },
];

function Decision() {
  const navigate = useNavigate();

  const [selectedDiverId, setSelectedDiverId] = useState("DQ-104");
  const [actionStatus, setActionStatus] = useState("");

  const selectedDiver = useMemo(
    () => decisionData.find((diver) => diver.id === selectedDiverId),
    [selectedDiverId]
  );

  const handleAction = (action) => {
    setActionStatus(`${action} selected for ${selectedDiver.name}.`);
  };

  const riskStyle = (level) => {
    if (level === "HIGH") {
      return {
        badge: "bg-red-100 text-red-700",
        border: "border-red-200",
        icon: "text-red-600",
      };
    }

    if (level === "MEDIUM") {
      return {
        badge: "bg-amber-100 text-amber-700",
        border: "border-amber-200",
        icon: "text-amber-600",
      };
    }

    return {
      badge: "bg-emerald-100 text-emerald-700",
      border: "border-emerald-200",
      icon: "text-emerald-600",
    };
  };

  const currentRisk = riskStyle(selectedDiver.riskLevel);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar2 />

      <main className="px-6 py-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-sky-600">
              <Brain size={18} />
              AI DECISION SUPPORT
            </div>

            <h1 className="text-3xl font-bold tracking-tight">
              Decision Center
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Review AI recommendations and take operational action for
              monitored divers.
            </p>
          </div>

          <button
            onClick={() => navigate("/risk")}
            className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
          >
            <Brain size={17} />
            Open Risk Analysis
          </button>
        </div>

        {/* Top Stats */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Divers Monitored
                </p>
                <p className="mt-2 text-2xl font-bold">4</p>
              </div>

              <div className="rounded-xl bg-sky-50 p-3 text-sky-600">
                <UserRound size={22} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">High Risk</p>
                <p className="mt-2 text-2xl font-bold text-red-600">1</p>
              </div>

              <div className="rounded-xl bg-red-50 p-3 text-red-600">
                <ShieldAlert size={22} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Pending Decisions</p>
                <p className="mt-2 text-2xl font-bold text-amber-600">2</p>
              </div>

              <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                <Clock3 size={22} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Mission Status
                </p>
                <p className="mt-2 text-lg font-bold text-emerald-600">
                  Monitoring
                </p>
              </div>

              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                <CheckCircle2 size={22} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
          {/* Diver List */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Active Divers
              </p>

              <h2 className="mt-1 text-lg font-semibold">
                Select Diver
              </h2>
            </div>

            <div className="space-y-3">
              {decisionData.map((diver) => {
                const style = riskStyle(diver.riskLevel);

                return (
                  <button
                    key={diver.id}
                    onClick={() => {
                      setSelectedDiverId(diver.id);
                      setActionStatus("");
                    }}
                    className={`w-full rounded-xl border p-4 text-left transition ${
                      selectedDiverId === diver.id
                        ? "border-sky-300 bg-sky-50"
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900">
                          {diver.name}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {diver.id}
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${style.badge}`}
                      >
                        {diver.riskLevel}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-slate-500">
                        Risk Score
                      </span>

                      <span className="text-sm font-bold">
                        {diver.riskScore}/100
                      </span>
                    </div>

                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full ${
                          diver.riskLevel === "HIGH"
                            ? "w-[81%] bg-red-500"
                            : diver.riskLevel === "MEDIUM"
                            ? "w-[58%] bg-amber-500"
                            : `w-[28%] bg-emerald-500`
                        }`}
                      ></div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 border-t border-slate-200 pt-5">
              <button
                onClick={() =>
                  navigate(`/monitoring/${selectedDiver.id}`)
                }
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Open Monitoring
                <ArrowRight size={16} />
              </button>
            </div>
          </section>

          {/* Main Decision Area */}
          <section className="space-y-6">
            {/* Selected Diver Heading */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-bold">
                      {selectedDiver.name}
                    </h2>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                      {selectedDiver.id}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${currentRisk.badge}`}
                    >
                      {selectedDiver.riskLevel} RISK
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-slate-500">
                    Pipeline Inspection Alpha · Decision generated from
                    current telemetry
                  </p>
                </div>

                <div className="text-left lg:text-right">
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    AI Confidence
                  </p>

                  <p className="mt-1 text-2xl font-bold text-sky-600">
                    {selectedDiver.confidence}%
                  </p>
                </div>
              </div>
            </div>

            {/* AI Recommendation */}
            <div
              className={`rounded-2xl border ${currentRisk.border} bg-white p-6 shadow-sm`}
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex gap-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                      selectedDiver.riskLevel === "HIGH"
                        ? "bg-red-100 text-red-600"
                        : selectedDiver.riskLevel === "MEDIUM"
                        ? "bg-amber-100 text-amber-600"
                        : "bg-emerald-100 text-emerald-600"
                    }`}
                  >
                    <Brain size={25} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      AI Recommended Decision
                    </p>

                    <h3 className="mt-1 text-2xl font-bold">
                      {selectedDiver.recommendation}
                    </h3>

                    <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                      {selectedDiver.reason}
                    </p>
                  </div>
                </div>

                <div
                  className={`shrink-0 rounded-xl px-4 py-3 text-center ${
                    selectedDiver.priority === "HIGH"
                      ? "bg-red-50"
                      : selectedDiver.priority === "MEDIUM"
                      ? "bg-amber-50"
                      : "bg-emerald-50"
                  }`}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    Priority
                  </p>

                  <p
                    className={`mt-1 text-lg font-bold ${
                      selectedDiver.priority === "HIGH"
                        ? "text-red-600"
                        : selectedDiver.priority === "MEDIUM"
                        ? "text-amber-600"
                        : "text-emerald-600"
                    }`}
                  >
                    {selectedDiver.priority}
                  </p>
                </div>
              </div>

              {/* AI Factors */}
              <div className="mt-6 border-t border-slate-200 pt-5">
                <p className="mb-3 text-sm font-semibold text-slate-800">
                  Decision Factors
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  {selectedDiver.factors.map((factor, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 rounded-lg bg-slate-50 px-4 py-3"
                    >
                      <CheckCircle2
                        size={16}
                        className={currentRisk.icon}
                      />

                      <span className="text-sm text-slate-600">
                        {factor}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Telemetry */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900">
                    Supporting Telemetry
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">
                    Current data used for decision support
                  </p>
                </div>

                <Activity size={20} className="text-sky-500" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <HeartPulse size={17} />
                    <span className="text-xs">Heart Rate</span>
                  </div>

                  <p className="mt-2 text-xl font-bold">
                    {selectedDiver.heartRate}
                    <span className="ml-1 text-xs font-normal text-slate-400">
                      BPM
                    </span>
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Wind size={17} />
                    <span className="text-xs">Oxygen</span>
                  </div>

                  <p className="mt-2 text-xl font-bold">
                    {selectedDiver.oxygen}%
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Gauge size={17} />
                    <span className="text-xs">Depth</span>
                  </div>

                  <p className="mt-2 text-xl font-bold">
                    {selectedDiver.depth}
                    <span className="ml-1 text-xs font-normal text-slate-400">
                      m
                    </span>
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Battery size={17} />
                    <span className="text-xs">Battery</span>
                  </div>

                  <p className="mt-2 text-xl font-bold">
                    {selectedDiver.battery}%
                  </p>
                </div>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="flex items-center justify-between rounded-xl border border-slate-100 px-4 py-3">
                  <span className="text-sm text-slate-500">
                    Ascent Rate
                  </span>

                  <span className="font-semibold">
                    {selectedDiver.ascentRate} m/min
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-slate-100 px-4 py-3">
                  <span className="text-sm text-slate-500">
                    Dive Time
                  </span>

                  <span className="font-semibold">
                    {selectedDiver.diveTime} min
                  </span>
                </div>
              </div>
            </div>

            {/* Action Panel */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5">
                <h3 className="font-semibold text-slate-900">
                  Supervisor Action
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Review the AI recommendation and record the operational
                  response.
                </p>
              </div>

              {actionStatus && (
                <div className="mb-5 flex items-center gap-3 rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-700">
                  <CheckCircle2 size={18} />
                  {actionStatus}
                </div>
              )}

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <button
                  onClick={() => handleAction("Recommendation Accepted")}
                  className="flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white hover:bg-sky-700"
                >
                  <CheckCircle2 size={17} />
                  Accept Recommendation
                </button>

                <button
                  onClick={() => handleAction("Monitoring Increased")}
                  className="flex items-center justify-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-700 hover:bg-amber-100"
                >
                  <Activity size={17} />
                  Increase Monitoring
                </button>

                <button
                  onClick={() => handleAction("Diver Recall Initiated")}
                  className="flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 hover:bg-red-100"
                >
                  <RotateCcw size={17} />
                  Recall Diver
                </button>

                <button
                  onClick={() => handleAction("Emergency Support Requested")}
                  className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  <Siren size={17} />
                  Emergency Support
                </button>
              </div>
            </div>

            {/* Alternative Decision */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <AlertTriangle size={19} className="text-amber-500" />

                <h3 className="font-semibold">
                  Alternative Decision Paths
                </h3>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                <button
                  onClick={() => handleAction("Continue Current Plan")}
                  className="rounded-xl border border-slate-200 p-4 text-left hover:bg-slate-50"
                >
                  <p className="font-semibold text-slate-800">
                    Continue
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Keep the current dive plan with standard monitoring.
                  </p>
                </button>

                <button
                  onClick={() => handleAction("Increase Observation")}
                  className="rounded-xl border border-slate-200 p-4 text-left hover:bg-slate-50"
                >
                  <p className="font-semibold text-slate-800">
                    Increase Monitoring
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Increase supervisor observation and telemetry review.
                  </p>
                </button>

                <button
                  onClick={() => handleAction("Begin Controlled Ascent")}
                  className="rounded-xl border border-red-200 bg-red-50/50 p-4 text-left hover:bg-red-50"
                >
                  <p className="font-semibold text-red-700">
                    Controlled Ascent
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Begin a controlled ascent based on current risk context.
                  </p>
                </button>
              </div>
            </div>

            {/* Decision History */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">
                    Recent Decision History
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">
                    Previous AI-assisted operational decisions
                  </p>
                </div>

                <FileText size={19} className="text-slate-400" />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[650px] text-left">
                  <thead>
                    <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-400">
                      <th className="pb-3 font-semibold">Time</th>
                      <th className="pb-3 font-semibold">Diver</th>
                      <th className="pb-3 font-semibold">Decision</th>
                      <th className="pb-3 font-semibold">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {decisionHistory.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b border-slate-100 last:border-0"
                      >
                        <td className="py-4 text-sm text-slate-500">
                          {item.time}
                        </td>

                        <td className="py-4">
                          <p className="text-sm font-semibold text-slate-800">
                            {item.diver}
                          </p>
                          <p className="text-xs text-slate-400">
                            {item.id}
                          </p>
                        </td>

                        <td className="py-4 text-sm text-slate-600">
                          {item.decision}
                        </td>

                        <td className="py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              item.status === "EXECUTED"
                                ? "bg-emerald-100 text-emerald-700"
                                : item.status === "ACKNOWLEDGED"
                                ? "bg-sky-100 text-sky-700"
                                : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>

        {/* Footer Note */}
        <div className="mt-6 rounded-xl border border-slate-200 bg-white px-5 py-4 text-xs leading-5 text-slate-500 shadow-sm">
          <strong className="text-slate-700">
            Decision Support Notice:
          </strong>{" "}
          AI recommendations shown here are intended to support the dive
          supervisor's operational review. Final actions remain under
          supervisor control.
        </div>
      </main>
    </div>
  );
}

export default Decision;