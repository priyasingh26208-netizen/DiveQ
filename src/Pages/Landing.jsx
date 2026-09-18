import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import Footer from '../components/Footer'
import { Link } from "react-router-dom";


function Landing() {
const [openCard, setOpenCard] = useState(null);
    return (
    <>
      <Navbar />
      <HeroSection />
    <section id="features" className="bg-gradient-to-b from-sky-50 via-white to-sky-50 py-24">

  <div className="max-w-7xl mx-auto px-6">

    {/* Heading */}

    <div className="text-center mb-16">

      <span id="how-it-works" className="bg-sky-100 text-sky-700 px-5 py-2 rounded-full font-semibold">
        DiveQ Platform
      </span>

      <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mt-6">
        Smarter Decisions. Safer Dives.
      </h2>

      <p className="mt-5 text-lg text-slate-600 max-w-3xl mx-auto">
        DiveQ combines real-time diver monitoring, operational control,
        safety management and AI-powered intelligence to transform
        underwater missions.
      </p>
      

    </div>

    {/* Top Section */}

    <div className="grid lg:grid-cols-3 gap-8 items-stretch mb-14">

      {/* Diver Monitoring */}

      <div className="bg-white rounded-2xl border border-sky-100 shadow-[0_10px_30px_rgba(0,0,0,0.12)] p-6">

        <h3 className="text-2xl font-bold text-sky-700 mb-6">
          🌊 Diver Monitoring & Tracking
        </h3>

        <div className="space-y-4">

          <div className="bg-sky-50 rounded-xl p-5 hover:shadow-lg transition-all">
            <h4 className="font-bold mb-2">Real-Time Diver Visibility</h4>
            <p className="text-slate-600">
              Continuous tracking of diver status, mission progress and underwater activity.
            </p>
          </div>

          <div className="bg-sky-50 rounded-xl p-5 hover:shadow-lg transition-all">
            <h4 className="font-bold mb-2">Centralized Mission Tracking</h4>
            <p className="text-slate-600">
              Monitor multiple divers simultaneously from a unified dashboard.
            </p>
          </div>

          <div className="bg-sky-50 rounded-xl p-5 hover:shadow-lg transition-all">
            <h4 className="font-bold mb-2">Live Communication Support</h4>
            <p className="text-slate-600">
              Ensure smooth coordination between supervisors and divers.
            </p>
          </div>

          <div className="bg-sky-50 rounded-xl p-5 hover:shadow-lg transition-all">
            <h4 className="font-bold mb-2">Depth & Dive Time Tracking</h4>
            <p className="text-slate-600">
              Monitor underwater depth and mission duration in real time.
            </p>
          </div>

        </div>

      </div>

      {/* Center Image */}

      <div className="flex items-center justify-center">

        <img
          src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200"
          alt="DiveQ"
          className="
          w-full
          h-full
          min-h-[550px]
          object-cover
          rounded-3xl
          shadow-[0_20px_50px_rgba(0,0,0,0.20)]
          border-4
          border-white
          "
        />

      </div>

      {/* Operations */}

      <div className="bg-white rounded-2xl border border-sky-100 shadow-[0_10px_30px_rgba(0,0,0,0.12)] p-6">

        <h3 className="text-2xl font-bold text-sky-700 mb-6">
          ⚙️ Operations & Safety
        </h3>

        <div className="space-y-4">

          <div className="bg-sky-50 rounded-xl p-5 hover:shadow-lg transition-all">
            <h4 className="font-bold mb-2">Mission Planning & Control</h4>
            <p className="text-slate-600">
              Organize dive operations with mission planning and supervision tools.
            </p>
          </div>

          <div className="bg-sky-50 rounded-xl p-5 hover:shadow-lg transition-all">
            <h4 className="font-bold mb-2">Emergency Response System</h4>
            <p className="text-slate-600">
              Instant alerts help teams react quickly to underwater emergencies.
            </p>
          </div>

          <div className="bg-sky-50 rounded-xl p-5 hover:shadow-lg transition-all">
            <h4 className="font-bold mb-2">Safety Monitoring</h4>
            <p className="text-slate-600">
              Continuous safety assessment reduces risks and improves mission success.
            </p>
          </div>

          <div className="bg-sky-50 rounded-xl p-5 hover:shadow-lg transition-all">
            <h4 className="font-bold mb-2">Mission Command Center</h4>
            <p className="text-slate-600">
              Centralized interface for mission control and operational awareness.
            </p>
          </div>

        </div>

      </div>

    </div>

    {/* Management */}
   <div className="bg-white rounded-2xl border border-sky-100 shadow-[0_10px_30px_rgba(0,0,0,0.12)] p-8">

  <h3 className="text-3xl font-bold text-sky-700 mb-3">
    📄 Management & Reporting
  </h3>

  <p className="text-slate-600 mb-8 max-w-3xl">
    DiveQ simplifies mission documentation, operational analysis
    and reporting by organizing all critical dive information
    in one centralized platform.
  </p>
  

  <div className="grid md:grid-cols-2 gap-6">

    <div className="bg-sky-50 rounded-xl p-6 shadow hover:shadow-xl transition-all">
      <h4 className="text-xl font-bold mb-3">
        📖 Dive Logs & Records
      </h4>

      <p className="text-slate-600">
        Maintain detailed records of every dive, including
        mission timelines, diver activities and operational data.
      </p>
    </div>

    <div className="bg-sky-50 rounded-xl p-6 shadow hover:shadow-xl transition-all">
      <h4 className="text-xl font-bold mb-3">
        📄 Automated Reporting
      </h4>

      <p className="text-slate-600">
        Generate structured mission reports automatically
        for analysis, documentation and future reference.
      </p>
    </div>

    <div className="bg-sky-50 rounded-xl p-6 shadow hover:shadow-xl transition-all">
      <h4 className="text-xl font-bold mb-3">
        📊 Analytics & Insights
      </h4>

      <p className="text-slate-600">
        Visualize operational performance, mission trends
        and key metrics through an interactive dashboard.
      </p>
    </div>

    <div className="bg-sky-50 rounded-xl p-6 shadow hover:shadow-xl transition-all">
      <h4 className="text-xl font-bold mb-3">
        🗂 Mission Archive
      </h4>

      <p className="text-slate-600">
        Securely store historical mission data and access
        previous operations whenever needed.
      </p>
    </div>

  </div>

</div>
    



{/* ================= AI INTELLIGENCE ENGINE ================= */}

<div className="mt-20">

  <div className="text-center mb-14">

    <span className="bg-sky-100 text-sky-700 px-5 py-2 rounded-full font-semibold">
      DiveQ USP
    </span>

    <h2 className="text-5xl font-bold text-slate-900 mt-5">
      🧠 AI Intelligence Engine
    </h2>

    <p className="text-slate-600 max-w-3xl mx-auto mt-4">
      DiveQ goes beyond traditional monitoring by transforming
      operational data into predictive insights, intelligent
      recommendations and proactive safety measures.
    </p>

  </div>

  {/* TOP GRID */}

  <div className="grid lg:grid-cols-3 gap-8 items-stretch mb-12">

    {/* LEFT */}

    <div className="bg-white rounded-2xl shadow-xl p-6">

      <h3 className="text-2xl font-bold text-sky-700 mb-5">
        Predict & Prevent
      </h3>

      <div className="space-y-4">

        <div className="bg-sky-50 p-5 rounded-xl shadow">
          <h4 className="font-bold mb-2">
            🧠 AI Risk Prediction
          </h4>

          <p className="text-slate-600 text-sm">
            Identify potential underwater risks before they become critical.
          </p>
        </div>

        <div className="bg-sky-50 p-5 rounded-xl shadow">
          <h4 className="font-bold mb-2">
            🚨 Early Warning System
          </h4>

          <p className="text-slate-600 text-sm">
            Generate proactive alerts for emerging safety concerns.
          </p>
        </div>

        <div className="bg-sky-50 p-5 rounded-xl shadow">
          <h4 className="font-bold mb-2">
            🎯 Mission Decision Support
          </h4>

          <p className="text-slate-600 text-sm">
            AI-powered recommendations for safer mission execution.
          </p>
        </div>

      </div>

    </div>

    {/* IMAGE */}

    <div className="flex justify-center">

     <img
  src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80"
  alt="AI Intelligence Dashboard"
  className="w-full h-full min-h-[500px] object-cover rounded-3xl shadow-2xl border-4 border-white"
/>
    </div>

    {/* RIGHT */}

    <div className="bg-white rounded-2xl shadow-xl p-6">

      <h3 className="text-2xl font-bold text-sky-700 mb-5">
        Analyze & Assist
      </h3>

      <div className="space-y-4">

        <div className="bg-sky-50 p-5 rounded-xl shadow">
          <h4 className="font-bold mb-2">
            🤖 AI Dive Supervisor Assistant
          </h4>

          <p className="text-slate-600 text-sm">
            Ask mission-related questions and receive intelligent guidance.
          </p>
        </div>

        <div className="bg-sky-50 p-5 rounded-xl shadow">
          <h4 className="font-bold mb-2">
            📈 Mission Outcome Prediction
          </h4>

          <p className="text-slate-600 text-sm">
            Estimate mission success probability using operational data.
          </p>
        </div>

        <div className="bg-sky-50 p-5 rounded-xl shadow">
          <h4 className="font-bold mb-2">
            📊 Diver Performance Analytics
          </h4>

          <p className="text-slate-600 text-sm">
            Evaluate diver efficiency, safety and mission performance.
          </p>
        </div>

      </div>

    </div>

  </div>

  {/* BOTTOM FEATURES */}

  <div className="bg-white rounded-2xl shadow-xl p-8">

    <h3 className="text-3xl font-bold text-sky-700 mb-3">
      Advanced AI Capabilities
    </h3>

    <p className="text-slate-600 mb-8">
      Additional AI tools designed to improve mission analysis,
      reporting accuracy and operational awareness.
    </p>

    <div className="grid md:grid-cols-2 gap-6">

      <div className="bg-sky-50 p-6 rounded-xl shadow">
        <h4 className="font-bold mb-2">
          📄 AI Dive Report Generator
        </h4>

        <p className="text-slate-600">
          Automatically generate detailed mission documentation.
        </p>
      </div>

      <div className="bg-sky-50 p-6 rounded-xl shadow">
        <h4 className="font-bold mb-2">
          🔍 Automated Incident Analysis
        </h4>

        <p className="text-slate-600">
          Analyze incidents and identify contributing factors.
        </p>
      </div>

      <div className="bg-sky-50 p-6 rounded-xl shadow">
        <h4 className="font-bold mb-2">
          💡 Knowledge-Based Recommendations
        </h4>

        <p className="text-slate-600">
          Learn from historical missions and improve decision-making.
        </p>
      </div>

      <div className="bg-sky-50 p-6 rounded-xl shadow">
        <h4 className="font-bold mb-2">
          🛡 Explainable AI Alerts
        </h4>

        <p className="text-slate-600">
          Understand why alerts are generated with transparent reasoning.
        </p>
      </div>

    </div>

  </div>

</div>

    

  </div>

</section>
      
      <Footer />
    </>
  )
}

export default Landing