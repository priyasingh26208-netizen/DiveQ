
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import herooo from "../assets/herooo.png";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    organization: "",
    role: "Supervisor",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("Registered User:", formData);

    // Account created successfully
    navigate("/dashboard");

    // Future API Call Here
  };

  return (
    <>
      <Navbar />

      <div
        className="relative min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-10"
        style={{
          backgroundImage: `url(${herooo})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Register Card */}
        <div className="relative z-10 bg-white/95 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-lg">

          <h1 className="text-4xl font-bold text-center text-sky-700 mb-2">
            Create Account
          </h1>

          <p className="text-center text-gray-500 mb-8">
            Join DiveQ AI Dive Command Center
          </p>

          <form onSubmit={handleRegister} className="space-y-5">

            {/* Full Name */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>

            {/* Organization */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Organization
              </label>

              <input
                type="text"
                name="organization"
                placeholder="Company / Organization Name"
                value={formData.organization}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Role
              </label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option>Supervisor</option>
                <option>Diver</option>
              </select>
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>

            {/* Create Account */}
            <button
              type="submit"
              className="w-full bg-sky-600 text-white py-3 rounded-xl font-semibold hover:bg-sky-700 transition-all"
            >
              Create Account
            </button>

          </form>

          {/* Login */}
          <p className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-sky-600 font-semibold hover:underline"
            >
              Login
            </a>
          </p>

        </div>
      </div>
    </>
  );
}

