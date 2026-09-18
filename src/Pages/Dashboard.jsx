import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar2 from "../components/Navbar2";

import { ChevronDown } from "lucide-react";

import {
  Users,
  Activity,
  AlertTriangle,
  Waves,
  Heart,
  Gauge,
  Shield,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import L from "leaflet";

function Dashboard() {
  const navigate = useNavigate();

  /* =====================================================
     SELECTED MISSION
  ===================================================== */

  const [selectedMission, setSelectedMission] = useState(
    "Pipeline Inspection Alpha"
  );

  const missions = [
    "Pipeline Inspection Alpha",
    "Underwater Bridge Survey",
    "Ship Hull Inspection",
    "Rescue Operation Delta",
  ];

  /* =====================================================
     DASHBOARD STATS
  ===================================================== */

  const [dashboardStats] = useState({
    totalDivers: 12,
    activeDivers: 8,
    alerts: 2,
    missionProgress: 76,
  });

  /* =====================================================
     DIVER DATA
     IMPORTANT:
     IDs MATCH WITH Monitoring.jsx
  ===================================================== */

  const [divers] = useState([
    {
      id: "DQ-101",
      name: "Priya Sharma",
      status: "Safe",
      heartRate: 82,
      oxygen: 91,
      depth: 24,
      battery: 88,
      lat: 18.923,
  lng: 72.819,
    },
    {
      id: "DQ-102",
      name: "Rahul Singh",
      status: "Warning",
      heartRate: 108,
      oxygen: 62,
      depth: 37,
      battery: 70,
      lat: 18.926,
lng: 72.823
    },
    {
      id: "DQ-103",
      name: "Amit Verma",
      status: "Safe",
      heartRate: 78,
      oxygen: 84,
      depth: 18,
      battery: 92,
      lat: 18.920,
lng: 72.828

    },
    {
      id: "DQ-104",
      name: "Neha Gupta",
      status: "Critical",
      heartRate: 124,
      oxygen: 42,
      depth: 41,
      battery: 61,
      lat: 18.918,
lng: 72.816
    },
  ]);

  /* =====================================================
     ALERT DATA
  ===================================================== */

  const [alerts] = useState([
    {
      id: 1,
      type: "Critical",
      message: "Diver DQ-104 oxygen below safe threshold",
    },
    {
      id: 2,
      type: "Warning",
      message: "Diver DQ-102 heart rate elevated",
    },
  ]);

  /* =====================================================
     OXYGEN CHART DATA
  ===================================================== */

  const chartData = [
    {
      time: "09:00",
      oxygen: 96,
    },
    {
      time: "09:15",
      oxygen: 92,
    },
    {
      time: "09:30",
      oxygen: 88,
    },
    {
      time: "09:45",
      oxygen: 82,
    },
    {
      time: "10:00",
      oxygen: 79,
    },
    {
      time: "10:15",
      oxygen: 74,
    },
  ];
  const diverIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
  return (
    <>
      <Navbar2 />

      <div className="min-h-screen bg-sky-50 p-6">
        <div className="mx-auto max-w-[1500px]">

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900">
              DiveQ Command Center
            </h1>

            <p className="mt-2 text-slate-600">
              Real-time mission monitoring and diver management
            </p>
          </div>

          {/* =================================================
              ACTIVE MISSION
          ================================================= */}

          <div className="mb-8 rounded-2xl border border-sky-100 bg-white p-5 shadow-lg">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Active Mission
                </h2>

                <p className="text-slate-500">
                  Select a mission to monitor divers and operations
                </p>
              </div>

              <div className="relative">
                <select
                  value={selectedMission}
                  onChange={(e) =>
                    setSelectedMission(e.target.value)
                  }
                  className="appearance-none rounded-xl border border-sky-200 bg-sky-50 px-5 py-3 pr-12 font-medium text-slate-800 outline-none focus:border-sky-400"
                >
                  {missions.map((mission) => (
                    <option key={mission} value={mission}>
                      {mission}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={18}
                  className="pointer-events-none absolute right-4 top-4 text-slate-500"
                />
              </div>

            </div>
          </div>

          {/* =================================================
              STATS
          ================================================= */}

          <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            {/* TOTAL DIVERS */}

            <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-lg">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-slate-500">
                    Total Divers
                  </p>

                  <h2 className="mt-2 text-3xl font-bold">
                    {dashboardStats.totalDivers}
                  </h2>
                </div>

                <Users
                  className="text-sky-600"
                  size={38}
                />

              </div>
            </div>

            {/* ACTIVE DIVERS */}

            <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-lg">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-slate-500">
                    Active Divers
                  </p>

                  <h2 className="mt-2 text-3xl font-bold">
                    {dashboardStats.activeDivers}
                  </h2>
                </div>

                <Activity
                  className="text-green-600"
                  size={38}
                />

              </div>
            </div>

            {/* ALERTS */}

            <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-lg">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-slate-500">
                    Alerts
                  </p>

                  <h2 className="mt-2 text-3xl font-bold">
                    {dashboardStats.alerts}
                  </h2>
                </div>

                <AlertTriangle
                  className="text-red-500"
                  size={38}
                />

              </div>
            </div>

            {/* MISSION PROGRESS */}

            <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-lg">
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-slate-500">
                    Mission Progress
                  </p>

                  <h2 className="mt-2 text-3xl font-bold">
                    {dashboardStats.missionProgress}%
                  </h2>
                </div>

                <Shield
                  className="text-sky-600"
                  size={38}
                />

              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-sky-500"
                  style={{
                    width: `${dashboardStats.missionProgress}%`,
                  }}
                />
              </div>
            </div>

          </div>

          {/* =================================================
              ACTIVE DIVERS
          ================================================= */}

          <div className="mb-10">

            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">
                  Active Divers
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Select a diver to open their monitoring page.
                </p>
              </div>

              <button
                onClick={() => navigate("/monitoring")}
                className="rounded-xl border border-sky-200 bg-white px-4 py-2.5 text-sm font-semibold text-sky-700 hover:bg-sky-50"
              >
                Open Monitoring
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

              {divers.map((diver) => (

                <div
                  key={diver.id}
                  className="rounded-2xl border border-sky-100 bg-white p-5 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
                >

                  {/* CARD HEADER */}

                  <div className="mb-4 flex items-center justify-between">

                    <div>
                      <h3 className="text-lg font-bold">
                        {diver.name}
                      </h3>

                      <p className="mt-0.5 text-xs text-slate-400">
                        {diver.id}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        diver.status === "Safe"
                          ? "bg-green-100 text-green-700"
                          : diver.status === "Warning"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {diver.status}
                    </span>

                  </div>

                  {/* DIVER DETAILS */}

                  <div className="space-y-3">

                    {/* HEART RATE */}

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm text-slate-600">
                        <Heart size={16} />
                        Heart Rate
                      </span>

                      <span className="text-sm font-semibold">
                        {diver.heartRate} BPM
                      </span>
                    </div>

                    {/* OXYGEN */}

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm text-slate-600">
                        <Waves size={16} />
                        Oxygen
                      </span>

                      <span className="text-sm font-semibold">
                        {diver.oxygen}%
                      </span>
                    </div>

                    {/* DEPTH */}

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm text-slate-600">
                        <Gauge size={16} />
                        Depth
                      </span>

                      <span className="text-sm font-semibold">
                        {diver.depth} m
                      </span>
                    </div>

                    {/* BATTERY */}

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm text-slate-600">
                        <Shield size={16} />
                        Battery
                      </span>

                      <span className="text-sm font-semibold">
                        {diver.battery}%
                      </span>
                    </div>

                  </div>

                  {/* MONITOR BUTTON */}

                  <button
                    onClick={() =>
                      navigate(`/monitoring/${diver.id}`)
                    }
                    className="mt-5 w-full rounded-xl bg-sky-600 py-3 font-semibold text-white transition hover:bg-sky-700"
                  >
                    Monitor Diver
                  </button>

                </div>

              ))}

            </div>

          </div>
         {/* =================================================
    LIVE DIVER MAP
================================================= */}
<div className="mb-8 grid gap-6 lg:grid-cols-2">
<div className="mb-8 rounded-2xl border border-sky-100 bg-white p-6 shadow-lg">
  <div className="mb-5">
    <h2 className="text-2xl font-bold">
      Live Diver Locations
    </h2>

    <p className="mt-1 text-sm text-slate-500">
      Real-time positions of active divers
    </p>
  </div>

  <div className="h-[450px] overflow-hidden rounded-2xl">
    <MapContainer
      center={[18.923, 72.819]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {divers.map((diver) => (
        <Marker
          key={diver.id}
          position={[diver.lat, diver.lng]}
          icon={diverIcon}
        >
          <Popup>
            <div>
              <h3 className="font-bold">
                {diver.name}
              </h3>

              <p>ID: {diver.id}</p>
              <p>Status: {diver.status}</p>
              <p>Depth: {diver.depth}m</p>
              <p>Oxygen: {diver.oxygen}%</p>

              <button
                onClick={() =>
                  navigate(`/monitoring/${diver.id}`)
                }
                className="mt-2 rounded bg-sky-600 px-3 py-1 text-white"
              >
                Open Monitoring
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  </div>
</div>
<div className="mb-8 rounded-2xl border border-sky-100 bg-white p-6 shadow-lg">

  <div className="mb-5">
    <h2 className="text-2xl font-bold">
      Oxygen Consumption Trend
    </h2>

    <p className="mt-1 text-sm text-slate-500">
      Mission-wide oxygen trend
    </p>
  </div>

  <div className="h-[320px]">

    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData}>

        <defs>
          <linearGradient
            id="oxygenGradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="5%"
              stopColor="#0284c7"
              stopOpacity={0.8}
            />

            <stop
              offset="95%"
              stopColor="#0284c7"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="time" />

        <YAxis />

        <Tooltip />

        <Area
          type="monotone"
          dataKey="oxygen"
          stroke="#0284c7"
          fill="url(#oxygenGradient)"
          strokeWidth={3}
        />

      </AreaChart>
    </ResponsiveContainer>

  </div>

</div>
</div>

          {/* =================================================
              MISSION OVERVIEW + RECENT ACTIVITY
          ================================================= */}

          <div className="mb-8 grid gap-6 lg:grid-cols-3">

            {/* MISSION OVERVIEW */}

            <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-lg">

              <div className="mb-5 flex items-center gap-2">

                <Waves
                  className="text-sky-600"
                  size={23}
                />

                <h2 className="text-2xl font-bold">
                  Mission Overview
                </h2>

              </div>

              <div className="space-y-4">

                <div className="flex justify-between border-b pb-3">
                  <span className="text-slate-500">
                    Mission Name
                  </span>

                  <span className="font-semibold">
                    {selectedMission}
                  </span>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span className="text-slate-500">
                    Location
                  </span>

                  <span className="font-semibold">
                    Arabian Sea Zone A
                  </span>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span className="text-slate-500">
                    Start Time
                  </span>

                  <span className="font-semibold">
                    09:00 AM
                  </span>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span className="text-slate-500">
                    Mission Status
                  </span>

                  <span className="font-bold text-green-600">
                    Active
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Estimated Completion
                  </span>

                  <span className="font-semibold">
                    01:30 PM
                  </span>
                </div>

              </div>

            </div>

            {/* RECENT ACTIVITY */}

            <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-lg">

              <h2 className="mb-5 text-2xl font-bold">
                Recent Activity
              </h2>

              <div className="space-y-5">

                <div className="flex gap-4">

                  <div className="mt-2 h-3 w-3 shrink-0 rounded-full bg-green-500"></div>

                  <div>
                    <p className="font-semibold">
                      Diver DQ-101 entered mission zone
                    </p>

                    <span className="text-sm text-slate-500">
                      10 minutes ago
                    </span>
                  </div>

                </div>

                <div className="flex gap-4">

                  <div className="mt-2 h-3 w-3 shrink-0 rounded-full bg-yellow-500"></div>

                  <div>
                    <p className="font-semibold">
                      DQ-102 elevated heart rate detected
                    </p>

                    <span className="text-sm text-slate-500">
                      8 minutes ago
                    </span>
                  </div>

                </div>

                <div className="flex gap-4">

                  <div className="mt-2 h-3 w-3 shrink-0 rounded-full bg-blue-500"></div>

                  <div>
                    <p className="font-semibold">
                      Mission checkpoint completed
                    </p>

                    <span className="text-sm text-slate-500">
                      5 minutes ago
                    </span>
                  </div>

                </div>

                <div className="flex gap-4">

                  <div className="mt-2 h-3 w-3 shrink-0 rounded-full bg-red-500"></div>

                  <div>
                    <p className="font-semibold">
                      DQ-104 oxygen alert generated
                    </p>

                    <span className="text-sm text-slate-500">
                      2 minutes ago
                    </span>
                  </div>

                </div>

              </div>

            </div>
            {/* LIVE ALERTS */}

<div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-lg">

  <div className="mb-5 flex items-center justify-between">

    <div>
      <h2 className="text-2xl font-bold">
        Live Alerts
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Active mission warnings
      </p>
    </div>

    <AlertTriangle
      className="text-red-500"
      size={24}
    />

  </div>

  <div className="space-y-4">

    {alerts.map((alert) => (

      <div
        key={alert.id}
        className={`rounded-xl border-l-4 p-4 ${
          alert.type === "Critical"
            ? "border-red-500 bg-red-50"
            : "border-yellow-500 bg-yellow-50"
        }`}
      >

        <div className="mb-1 font-semibold">
          {alert.type}
        </div>

        <p className="text-sm leading-5 text-slate-600">
          {alert.message}
        </p>

      </div>

    ))}

  </div>

  <button
    onClick={() => navigate("/alerts")}
    className="mt-5 w-full rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
  >
    View All Alerts
  </button>

</div>
    
          </div>

        </div>
      </div>
    </>
  );
}

export default Dashboard;