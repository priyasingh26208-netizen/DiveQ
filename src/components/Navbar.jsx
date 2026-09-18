import React from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import logo2 from "../assets/logo2.png";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-gradient-to-r from-sky-100 via-sky-200 to-blue-200 shadow-md relative z-50">

      {/* Logo */}
      <Link to="/" className="flex items-center gap-3 cursor-pointer">

        <img
          src={logo2}
          alt="DiveQ Logo"
          className="w-20 h-20 object-contain"
        />

        <div>
          <h1 className="text-2xl font-bold text-sky-700">
            DiveQ
          </h1>

          <p className="text-xs text-sky-600">
            AI Dive Command Center
          </p>
        </div>

      </Link>

      {/* Nav Links */}
      <ul className="flex gap-20 font-semibold text-xl tracking-wide items-center">

       <li
  onClick={() => {
    document
      .getElementById("how-it-works")
      ?.scrollIntoView({ behavior: "smooth" });
  }}
  className="cursor-pointer hover:text-sky-700 transition"
>
  How It Works
</li>

        {/* FEATURES */}
        <li className="relative group py-6">

          <div className="flex items-center gap-1 cursor-pointer hover:text-sky-700 transition">
            <span>Features</span>

            <ChevronDown
              size={16}
              className="transition-transform duration-300 group-hover:rotate-180"
            />
          </div>

          {/* Hover Bridge */}
          <div className="absolute top-full left-0 w-full h-6"></div>

          {/* Mega Menu */}
          <div
            className="
            absolute
            left-1/2
            top-full
            -translate-x-1/2
            hidden
            group-hover:block
            w-[700px]
            bg-gradient-to-br
            from-white
            to-sky-50
            rounded-xl
            shadow-2xl
            border
            border-sky-200
            p-6
            z-50
            "
          >

            <div className="grid grid-cols-2 gap-8">

              {/* LEFT COLUMN */}
              <div>

                <h3 className="text-xl font-bold text-sky-700 mb-4">
                  🌊 Operations
                </h3>

                <div className="space-y-2">

                  <div className="p-3 rounded-xl hover:bg-sky-50">
                    <h4 className="font-semibold">
                      Diver Monitoring & Tracking
                    </h4>

                    <p className="text-sm text-gray-600">
                      Monitor multiple divers in real time.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl hover:bg-sky-50">
                    <h4 className="font-semibold">
                      Operations & Safety
                    </h4>

                    <p className="text-sm text-gray-600">
                      Safety management and mission control.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl hover:bg-sky-50">
                    <h4 className="font-semibold">
                      Management & Reporting
                    </h4>

                    <p className="text-sm text-gray-600">
                      Logs, reports and mission documentation.
                    </p>
                  </div>

                </div>

                <h3 className="text-xl font-bold text-sky-700 mt-6 mb-4">
                  🛡 AI Risk & Safety
                </h3>

                <div className="space-y-2">

                  <div className="p-3 rounded-xl hover:bg-sky-50">
                    <h4 className="font-semibold">
                      AI Risk Prediction
                    </h4>

                    <p className="text-sm text-gray-600">
                      Predict future diver risks before they occur.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl hover:bg-sky-50">
                    <h4 className="font-semibold">
                      Early Warning System
                    </h4>

                    <p className="text-sm text-gray-600">
                      Generate proactive safety alerts.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl hover:bg-sky-50">
                    <h4 className="font-semibold">
                      Explainable AI Alerts
                    </h4>

                    <p className="text-sm text-gray-600">
                      Understand why an alert was triggered.
                    </p>
                  </div>

                </div>

              </div>

              {/* RIGHT COLUMN */}
              <div>

                <h3 className="text-xl font-bold text-sky-700 mb-4">
                  🧠 AI Decision Support
                </h3>

                <div className="space-y-2">

                  <div className="p-3 rounded-xl hover:bg-sky-50">
                    <h4 className="font-semibold">
                      Mission Decision Support
                    </h4>

                    <p className="text-sm text-gray-600">
                      AI recommendations for mission success.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl hover:bg-sky-50">
                    <h4 className="font-semibold">
                      AI Dive Supervisor Assistant
                    </h4>

                    <p className="text-sm text-gray-600">
                      Ask AI questions during operations.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl hover:bg-sky-50">
                    <h4 className="font-semibold">
                      Mission Outcome Prediction
                    </h4>

                    <p className="text-sm text-gray-600">
                      Estimate mission completion probability.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl hover:bg-sky-50">
                    <h4 className="font-semibold">
                      Knowledge-Based Recommendations
                    </h4>

                    <p className="text-sm text-gray-600">
                      Learn from previous missions.
                    </p>
                  </div>

                </div>

                <h3 className="text-xl font-bold text-sky-700 mt-6 mb-4">
                  📊 Analytics & Reports
                </h3>

                <div className="space-y-2">

                  <div className="p-3 rounded-xl hover:bg-sky-50">
                    <h4 className="font-semibold">
                      Automated Incident Analysis
                    </h4>

                    <p className="text-sm text-gray-600">
                      Analyze incidents automatically.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl hover:bg-sky-50">
                    <h4 className="font-semibold">
                      Diver Performance Analytics
                    </h4>

                    <p className="text-sm text-gray-600">
                      Track safety and efficiency scores.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl hover:bg-sky-50">
                    <h4 className="font-semibold">
                      AI Dive Report Generator
                    </h4>

                    <p className="text-sm text-gray-600">
                      Generate mission reports automatically.
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </li>

       <li>
  <Link
    to="/support"
    className="hover:text-sky-700 transition"
  >
    Support
  </Link>
</li>

      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        <select className="border rounded-lg px-3 py-2 bg-white">
          <option>English</option>
          <option>हिन्दी</option>
        </select>

        <Link to="/login">
          <button className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition">
            Login
          </button>
        </Link>

        <Link to="/register">
          <button className="px-5 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition">
            Get Started
          </button>
        </Link>

      </div>

    </nav>
  );
};

export default Navbar;