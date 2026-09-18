
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import herooo from "../assets/herooo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);

    // Login successful -> Dashboard
    navigate("/dashboard");

    // Future API Call Here
  };

  return (
    <>
      <Navbar />

      <div
        className="relative min-h-screen bg-cover bg-center flex items-center justify-center px-4"
        style={{
          backgroundImage: `url(${herooo})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Login Card */}
        <div className="relative z-10 bg-white/95 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-md">

          <h1 className="text-4xl font-bold text-center text-sky-700 mb-2">
            Welcome Back
          </h1>

          <p className="text-center text-gray-500 mb-8">
            Login to DiveQ Command Center
          </p>

          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-sky-600 text-white py-3 rounded-xl font-semibold hover:bg-sky-700 transition-all"
            >
              Login
            </button>

          </form>

          {/* Forgot Password */}
          <div className="text-center mt-6">
            <a
              href="#"
              className="text-sm text-sky-600 hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          {/* Register */}
          <p className="text-center mt-6 text-gray-600">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-sky-600 font-semibold hover:underline"
            >
              Create Account
            </a>
          </p>

        </div>
      </div>
    </>
  );
}
