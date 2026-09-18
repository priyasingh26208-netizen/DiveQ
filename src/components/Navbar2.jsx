import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo2 from "../assets/logo2.png";

const Navbar2 = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Future me token/session remove kar sakte hain
    // localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <nav className="flex items-center px-8 py-4 bg-gradient-to-r from-sky-50 to-blue-100 shadow-md sticky top-0 z-50">
      
      {/* Logo + DiveQ */}
      <Link
        to="/"
        className="flex items-center gap-3 group"
      >
        <img
          src={logo2}
          alt="DiveQ Logo"
          className="w-20 h-20 object-contain"
        />

        <div>
          <h1 className="text-2xl font-bold text-sky-700 group-hover:text-sky-800 transition-colors">
            DiveQ
          </h1>

          <p className="text-xs text-sky-500">
            AI Dive Command Center
          </p>
        </div>
      </Link>

      {/* Navigation Links */}
      <ul className="flex flex-1 justify-center gap-8 font-medium text-lg items-center text-slate-700">

        <li>
          <Link
            to="/"
            className="hover:text-sky-600 transition-colors"
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            to="/dashboard"
            className="hover:text-sky-600 transition-colors"
          >
            Dashboard
          </Link>
        </li>

        <li>
          <Link
            to="/risk"
            className="hover:text-sky-600 transition-colors"
          >
            AI Risk
          </Link>
        </li>

        <li>
          <Link
            to="/decision"
            className="hover:text-sky-600 transition-colors"
          >
            Decision Support
          </Link>
        </li>

        <li>
          <Link
            to="/assistant"
            className="hover:text-sky-600 transition-colors"
          >
            AI Assistant
          </Link>
        </li>

        <li>
          <Link
            to="/alerts"
            className="hover:text-sky-600 transition-colors"
          >
            Alerts
          </Link>
        </li>

        <li>
          <Link
            to="/analytics"
            className="hover:text-sky-600 transition-colors"
          >
            Analytics
          </Link>
        </li>

        <li>
          <Link
            to="/reports"
            className="hover:text-sky-600 transition-colors"
          >
            Reports
          </Link>
        </li>

        <li>
          <Link
            to="/knowledge"
            className="hover:text-sky-600 transition-colors"
          >
            Knowledge
          </Link>
        </li>

      </ul>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium shadow-sm"
      >
        Logout
      </button>

    </nav>
  );
};

export default Navbar2;