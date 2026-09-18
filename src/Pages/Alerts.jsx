import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar2 from "../components/Navbar2";

import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  ChevronRight,
  Clock,
  Eye,
  ShieldAlert,
  User,
  Waves,
  XCircle,
} from "lucide-react";

/* =========================================================
   MOCK ALERT DATA
   IMPORTANT:
   Diver IDs and names match Dashboard + Monitoring + AI
========================================================= */

const initialAlerts = [
  {
    id: "ALT-001",
    severity: "HIGH",
    diverId: "DQ-104",
    diverName: "Neha Gupta",
    type: "Oxygen Warning",
    reason: "Oxygen level has dropped below the configured threshold.",
    timestamp: "10:42:18",
    status: "ACTIVE",
  },

  {
    id: "ALT-002",
    severity: "MEDIUM",
    diverId: "DQ-102",
    diverName: "Rahul Singh",
    type: "Heart Rate Elevated",
    reason: "Heart rate is higher than recent telemetry readings.",
    timestamp: "10:40:12",
    status: "ACTIVE",
  },

  {
    id: "ALT-003",
    severity: "HIGH",
    diverId: "DQ-104",
    diverName: "Neha Gupta",
    type: "Ascent Rate Warning",
    reason: "Detected ascent rate is above the configured monitoring threshold.",
    timestamp: "10:38:45",
    status: "ACTIVE",
  },

  {
    id: "ALT-004",
    severity: "MEDIUM",
    diverId: "DQ-102",
    diverName: "Rahul Singh",
    type: "Depth Deviation",
    reason: "Current depth is above the planned mission depth.",
    timestamp: "10:35:30",
    status: "ACTIVE",
  },

  {
    id: "ALT-005",
    severity: "LOW",
    diverId: "DQ-101",
    diverName: "Priya Sharma",
    type: "Mission Event",
    reason: "Diver entered the next mission checkpoint.",
    timestamp: "10:31:05",
    status: "ACKNOWLEDGED",
  },

  {
    id: "ALT-006",
    severity: "LOW",
    diverId: "DQ-103",
    diverName: "Amit Verma",
    type: "System Update",
    reason: "Telemetry synchronization completed successfully.",
    timestamp: "10:28:42",
    status: "ACKNOWLEDGED",
  },
];

/* =========================================================
   HELPERS
========================================================= */

const getSeverityStyles = (severity) => {
  if (severity === "HIGH") {
    return {
      badge: "border-red-200 bg-red-50 text-red-600",
      card: "border-red-100 bg-red-50/30",
      icon: "text-red-500",
    };
  }

  if (severity === "MEDIUM") {
    return {
      badge: "border-amber-200 bg-amber-50 text-amber-600",
      card: "border-amber-100 bg-amber-50/30",
      icon: "text-amber-500",
    };
  }

  return {
    badge: "border-sky-200 bg-sky-50 text-sky-600",
    card: "border-sky-100 bg-sky-50/30",
    icon: "text-sky-500",
  };
};

const getStatusStyles = (status) => {
  if (status === "ACTIVE") {
    return "border-red-200 bg-red-50 text-red-600";
  }

  return "border-emerald-200 bg-emerald-50 text-emerald-600";
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

function Alerts() {
  const navigate = useNavigate();

  const [alerts, setAlerts] = useState(initialAlerts);

  const [selectedAlertId, setSelectedAlertId] = useState(
    "ALT-001"
  );

  const [filter, setFilter] = useState("ALL");

  /* =======================================================
     FILTERED ALERTS
  ======================================================= */

  const filteredAlerts = useMemo(() => {
    if (filter === "ALL") {
      return alerts;
    }

    return alerts.filter(
      (alert) => alert.severity === filter
    );
  }, [alerts, filter]);

  /* =======================================================
     SELECTED ALERT
  ======================================================= */

  const selectedAlert =
    alerts.find(
      (alert) => alert.id === selectedAlertId
    ) || alerts[0];

  /* =======================================================
     COUNTS
  ======================================================= */

  const activeAlerts = alerts.filter(
    (alert) => alert.status === "ACTIVE"
  ).length;

  const highAlerts = alerts.filter(
    (alert) =>
      alert.severity === "HIGH" &&
      alert.status === "ACTIVE"
  ).length;

  const mediumAlerts = alerts.filter(
    (alert) =>
      alert.severity === "MEDIUM" &&
      alert.status === "ACTIVE"
  ).length;

  const acknowledgedAlerts = alerts.filter(
    (alert) => alert.status === "ACKNOWLEDGED"
  ).length;

  /* =======================================================
     ACKNOWLEDGE ALERT
  ======================================================= */

  const acknowledgeAlert = (alertId) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId
          ? {
              ...alert,
              status: "ACKNOWLEDGED",
            }
          : alert
      )
    );
  };

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

              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-red-600">
                <Bell size={18} />
                DIVEQ ALERT CENTER
              </div>

              <h1 className="text-3xl font-bold text-slate-900">
                Alerts & Emergency Center
              </h1>

              <p className="mt-2 max-w-3xl text-sm text-slate-500">
                Monitor active warnings, high-risk events and
                mission alerts across all active divers.
              </p>

            </div>

            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">

              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500"></span>

              <span className="text-sm font-semibold text-slate-700">
                {activeAlerts} Active Alerts
              </span>

            </div>

          </div>

          {/* =================================================
              SUMMARY CARDS
          ================================================= */}

          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {/* ACTIVE */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="mb-4 flex items-center justify-between">

                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Active Alerts
                </p>

                <Bell
                  size={20}
                  className="text-red-500"
                />

              </div>

              <p className="text-4xl font-bold text-slate-900">
                {activeAlerts}
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Alerts requiring review
              </p>

            </div>

            {/* HIGH */}

            <div className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm">

              <div className="mb-4 flex items-center justify-between">

                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  High Severity
                </p>

                <ShieldAlert
                  size={20}
                  className="text-red-500"
                />

              </div>

              <p className="text-4xl font-bold text-red-600">
                {highAlerts}
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Immediate attention
              </p>

            </div>

            {/* MEDIUM */}

            <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">

              <div className="mb-4 flex items-center justify-between">

                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Medium Severity
                </p>

                <AlertTriangle
                  size={20}
                  className="text-amber-500"
                />

              </div>

              <p className="text-4xl font-bold text-amber-600">
                {mediumAlerts}
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Monitor closely
              </p>

            </div>

            {/* ACKNOWLEDGED */}

            <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">

              <div className="mb-4 flex items-center justify-between">

                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Acknowledged
                </p>

                <CheckCircle2
                  size={20}
                  className="text-emerald-500"
                />

              </div>

              <p className="text-4xl font-bold text-emerald-600">
                {acknowledgedAlerts}
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Reviewed by supervisor
              </p>

            </div>

          </div>

          {/* =================================================
              FILTERS
          ================================================= */}

          <div className="mb-5 flex flex-wrap items-center gap-3">

            {["ALL", "HIGH", "MEDIUM", "LOW"].map(
              (item) => (

                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                    filter === item
                      ? "bg-sky-600 text-white"
                      : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {item === "ALL"
                    ? "All Alerts"
                    : `${item} Severity`}
                </button>

              )
            )}

          </div>

          {/* =================================================
              MAIN CONTENT
          ================================================= */}

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

            {/* =================================================
                ALERT LIST
            ================================================= */}

            <div className="xl:col-span-2 rounded-2xl border border-slate-200 bg-white shadow-sm">

              <div className="border-b border-slate-100 px-5 py-5">

                <h2 className="text-lg font-semibold">
                  Live Alerts
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Select an alert to view its details.
                </p>

              </div>

              <div className="divide-y divide-slate-100">

                {filteredAlerts.length === 0 ? (

                  <div className="p-10 text-center">

                    <CheckCircle2
                      size={40}
                      className="mx-auto text-emerald-500"
                    />

                    <h3 className="mt-4 text-lg font-semibold">
                      No Alerts Found
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                      No alerts match the selected filter.
                    </p>

                  </div>

                ) : (

                  filteredAlerts.map((alert) => {

                    const styles =
                      getSeverityStyles(
                        alert.severity
                      );

                    const selected =
                      alert.id === selectedAlertId;

                    return (
                      <div
                        key={alert.id}
                        onClick={() =>
                          setSelectedAlertId(
                            alert.id
                          )
                        }
                        className={`cursor-pointer p-5 transition hover:bg-slate-50 ${
                          selected
                            ? "bg-sky-50/60"
                            : ""
                        }`}
                      >

                        <div className="flex items-start gap-4">

                          {/* ICON */}

                          <div
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${styles.card}`}
                          >
                            <AlertTriangle
                              size={20}
                              className={
                                styles.icon
                              }
                            />
                          </div>

                          {/* CONTENT */}

                          <div className="min-w-0 flex-1">

                            <div className="flex flex-wrap items-center gap-2">

                              <span
                                className={`rounded-full border px-2.5 py-1 text-[10px] font-bold ${styles.badge}`}
                              >
                                {alert.severity}
                              </span>

                              <span
                                className={`rounded-full border px-2.5 py-1 text-[10px] font-bold ${getStatusStyles(
                                  alert.status
                                )}`}
                              >
                                {alert.status}
                              </span>

                            </div>

                            <h3 className="mt-2 text-sm font-semibold text-slate-800">
                              {alert.type}
                            </h3>

                            <p className="mt-1 text-sm leading-5 text-slate-500">
                              {alert.reason}
                            </p>

                            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-400">

                              <span className="flex items-center gap-1.5">
                                <User size={13} />
                                {alert.diverName}
                              </span>

                              <span className="flex items-center gap-1.5">
                                <Clock size={13} />
                                {alert.timestamp}
                              </span>

                              <span className="flex items-center gap-1.5">
                                <Waves size={13} />
                                {alert.diverId}
                              </span>

                            </div>

                          </div>

                          <ChevronRight
                            size={19}
                            className={
                              selected
                                ? "text-sky-600"
                                : "text-slate-300"
                            }
                          />

                        </div>

                      </div>
                    );
                  })

                )}

              </div>

            </div>

            {/* =================================================
                ALERT DETAILS
            ================================================= */}

            {selectedAlert && (

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                <div className="mb-5 flex items-center gap-2">

                  <Eye
                    size={20}
                    className="text-sky-600"
                  />

                  <h2 className="text-lg font-semibold">
                    Alert Details
                  </h2>

                </div>

                {/* SEVERITY */}

                <div
                  className={`rounded-2xl border p-5 ${
                    getSeverityStyles(
                      selectedAlert.severity
                    ).card
                  }`}
                >

                  <div className="flex items-center justify-between">

                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Alert Severity
                    </span>

                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-bold ${
                        getSeverityStyles(
                          selectedAlert.severity
                        ).badge
                      }`}
                    >
                      {selectedAlert.severity}
                    </span>

                  </div>

                  <h3 className="mt-3 text-xl font-bold text-slate-900">
                    {selectedAlert.type}
                  </h3>

                </div>

                {/* INFO */}

                <div className="mt-5 space-y-4">

                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">

                    <span className="text-sm text-slate-500">
                      Diver
                    </span>

                    <span className="text-sm font-semibold">
                      {selectedAlert.diverName}
                    </span>

                  </div>

                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">

                    <span className="text-sm text-slate-500">
                      Diver ID
                    </span>

                    <span className="text-sm font-semibold">
                      {selectedAlert.diverId}
                    </span>

                  </div>

                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">

                    <span className="text-sm text-slate-500">
                      Timestamp
                    </span>

                    <span className="text-sm font-semibold">
                      {selectedAlert.timestamp}
                    </span>

                  </div>

                  <div className="flex items-center justify-between">

                    <span className="text-sm text-slate-500">
                      Current Status
                    </span>

                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusStyles(
                        selectedAlert.status
                      )}`}
                    >
                      {selectedAlert.status}
                    </span>

                  </div>

                </div>

                {/* WHY */}

                <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">

                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Why Is This Alert Active?
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {selectedAlert.reason}
                  </p>

                </div>

                {/* ACTIONS */}

                <div className="mt-5 space-y-3">

                  <button
                    onClick={() =>
                      navigate(
                        `/monitoring/${selectedAlert.diverId}`
                      )
                    }
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
                  >
                    <Eye size={17} />
                    View Diver
                  </button>

                  {selectedAlert.status ===
                  "ACTIVE" ? (
                    <button
                      onClick={() =>
                        acknowledgeAlert(
                          selectedAlert.id
                        )
                      }
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
                    >
                      <CheckCircle2 size={17} />
                      Acknowledge Alert
                    </button>
                  ) : (
                    <div className="flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                      <CheckCircle2 size={17} />
                      Alert Acknowledged
                    </div>
                  )}

                </div>

              </div>

            )}

          </div>

          {/* =================================================
              EMERGENCY CONTROL
          ================================================= */}

          <section className="mt-6 rounded-2xl border border-red-100 bg-white p-5 shadow-sm">

            <div className="mb-5 flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <ShieldAlert size={22} />
              </div>

              <div>

                <h2 className="text-lg font-semibold">
                  Emergency Controls
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Emergency actions for supervisor review.
                </p>

              </div>

            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">

              <button
                onClick={() =>
                  alert(
                    `Recall request initiated for ${selectedAlert.diverName}`
                  )
                }
                className="rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Recall Diver
              </button>

              <button
                onClick={() =>
                  alert("Backup team request initiated.")
                }
                className="rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Request Backup Team
              </button>

              <button
                onClick={() =>
                  alert("Emergency SOS triggered.")
                }
                className="rounded-xl bg-slate-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-900"
              >
                Emergency SOS
              </button>

            </div>

          </section>

          {/* =================================================
              BACKEND NOTE
          ================================================= */}

          <div className="mt-6 rounded-xl border border-sky-100 bg-sky-50 px-5 py-4">

            <p className="text-sm leading-6 text-sky-800">
              This page currently uses frontend mock alerts.
              During backend integration, the same alert structure
              can be populated from live alert events and telemetry.
            </p>

          </div>

        </div>
      </div>
    </>
  );
}

export default Alerts;