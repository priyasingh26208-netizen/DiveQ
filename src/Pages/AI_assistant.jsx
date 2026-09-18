import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar2 from "../components/Navbar2";

import {
  Bot,
  Send,
  Sparkles,
  AlertTriangle,
  Activity,
  Users,
  Waves,
  ShieldCheck,
  Clock3,
  FileText,
  Brain,
  ArrowRight,
  Mic,
  CircleHelp,
  RefreshCcw,
} from "lucide-react";

const diverData = [
  {
    id: "DQ-101",
    name: "Priya Sharma",
    status: "SAFE",
    riskScore: 28,
    riskLevel: "LOW",
    heartRate: 82,
    oxygen: 91,
    depth: 24,
    battery: 88,
  },
  {
    id: "DQ-102",
    name: "Rahul Singh",
    status: "WARNING",
    riskScore: 58,
    riskLevel: "MEDIUM",
    heartRate: 108,
    oxygen: 62,
    depth: 37,
    battery: 70,
  },
  {
    id: "DQ-103",
    name: "Amit Verma",
    status: "SAFE",
    riskScore: 24,
    riskLevel: "LOW",
    heartRate: 78,
    oxygen: 84,
    depth: 18,
    battery: 92,
  },
  {
    id: "DQ-104",
    name: "Neha Gupta",
    status: "CRITICAL",
    riskScore: 81,
    riskLevel: "HIGH",
    heartRate: 124,
    oxygen: 42,
    depth: 41,
    battery: 61,
  },
];

const initialMessages = [
  {
    id: 1,
    sender: "ai",
    text:
      "Hello Supervisor. I am the DiveQ AI Supervisor Assistant. I can help you interpret mission data, review diver status, summarize alerts and support operational decisions.",
    time: "09:42 AM",
  },
  {
    id: 2,
    sender: "ai",
    text:
      "There are currently 4 actively monitored divers. Rahul Singh requires attention and Neha Gupta is currently marked as high risk.",
    time: "09:42 AM",
  },
];

const quickPrompts = [
  "Give me a mission summary",
  "Which diver needs attention?",
  "Why is Neha high risk?",
  "Summarize active alerts",
  "Show me Rahul's current status",
];

function AI_assistant() {
  const navigate = useNavigate();

  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [selectedDiverId, setSelectedDiverId] = useState("DQ-104");
  const [isThinking, setIsThinking] = useState(false);

  const selectedDiver = useMemo(
    () => diverData.find((diver) => diver.id === selectedDiverId),
    [selectedDiverId]
  );

  const addAIResponse = (question) => {
    const text = question.toLowerCase();

    if (text.includes("mission")) {
      return "Current mission monitoring shows 4 active divers. 2 divers are in low-risk condition, 1 is medium risk and 1 is high risk. The assistant recommends focusing supervisor attention on the higher-risk divers and reviewing their latest telemetry and alerts.";
    }

    if (
      text.includes("attention") ||
      text.includes("which diver") ||
      text.includes("need attention")
    ) {
      return "Neha Gupta (DQ-104) is currently the highest-risk diver with a risk score of 81. Rahul Singh (DQ-102) is the next diver requiring closer monitoring with a risk score of 58.";
    }

    if (text.includes("neha")) {
      return "Neha Gupta is currently marked HIGH risk with a score of 81. Her current telemetry shows heart rate 124 BPM, oxygen level 42%, depth 41 m and device battery 61%. These values should be reviewed together with the active alert context before the supervisor takes any action.";
    }

    if (text.includes("rahul")) {
      return "Rahul Singh (DQ-102) is currently marked MEDIUM risk. His telemetry shows heart rate 108 BPM, oxygen level 62%, depth 37 m and battery 70%. The system recommends closer monitoring and review of his recent trend data.";
    }

    if (text.includes("alert")) {
      return "There are currently 6 tracked alert events in the demo mission data. High-severity alerts are associated with Neha Gupta, while medium-severity alerts are associated with Rahul Singh. The Alerts page contains the detailed event history and acknowledgement controls.";
    }

    if (text.includes("report")) {
      return "Individual diver reports are available from the Reports section. Each report contains diver profile information, mission details, performance, risk analysis, alerts, AI decision support and supervisor actions.";
    }

    return "Based on the currently available mission data, I recommend reviewing the highest-risk diver first, checking recent telemetry trends, and then reviewing active alerts before making an operational decision. This is a demo AI response and will be replaced by the backend AI service later.";
  };

  const handleSend = (customMessage) => {
    const message = (customMessage ?? input).trim();

    if (!message) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsThinking(true);

    setTimeout(() => {
      const response = addAIResponse(message);

      const aiMessage = {
        id: Date.now() + 1,
        sender: "ai",
        text: response,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsThinking(false);
    }, 700);
  };

  const handleRefresh = () => {
    setMessages(initialMessages);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar2 />

      <main className="px-6 py-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-sky-600">
              <Brain size={18} />
              AI SUPERVISOR SYSTEM
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              AI Supervisor Assistant
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Intelligent mission support for real-time dive supervision
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
            >
              <RefreshCcw size={16} />
              Reset Chat
            </button>

            <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
              AI Online
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid gap-6 xl:grid-cols-[1fr_330px]">
          {/* LEFT - CHAT */}
          <section className="flex min-h-[700px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* Chat Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
                  <Bot size={24} />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">
                    DiveQ AI Assistant
                  </h2>
                  <p className="text-xs text-slate-500">
                    Mission-aware supervisor support
                  </p>
                </div>
              </div>

              <div className="hidden items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-xs text-slate-600 sm:flex">
                <Sparkles size={14} className="text-sky-500" />
                AI Assisted
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-5 overflow-y-auto bg-slate-50/60 p-5">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`flex max-w-[85%] gap-3 ${
                      message.sender === "user"
                        ? "flex-row-reverse"
                        : "flex-row"
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                        message.sender === "ai"
                          ? "bg-sky-100 text-sky-600"
                          : "bg-slate-800 text-white"
                      }`}
                    >
                      {message.sender === "ai" ? (
                        <Bot size={18} />
                      ) : (
                        <Users size={18} />
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <div
                        className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
                          message.sender === "user"
                            ? "rounded-tr-sm bg-sky-600 text-white"
                            : "rounded-tl-sm border border-slate-200 bg-white text-slate-700"
                        }`}
                      >
                        {message.text}
                      </div>

                      <p
                        className={`mt-1 text-[11px] text-slate-400 ${
                          message.sender === "user"
                            ? "text-right"
                            : "text-left"
                        }`}
                      >
                        {message.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {isThinking && (
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                    <Bot size={18} />
                  </div>

                  <div className="rounded-2xl rounded-tl-sm border border-slate-200 bg-white px-4 py-3">
                    <div className="flex items-center gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-sky-400"></span>
                      <span className="h-2 w-2 animate-bounce rounded-full bg-sky-400 [animation-delay:150ms]"></span>
                      <span className="h-2 w-2 animate-bounce rounded-full bg-sky-400 [animation-delay:300ms]"></span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Prompts */}
            <div className="border-t border-slate-200 bg-white px-5 py-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Quick Questions
              </p>

              <div className="flex flex-wrap gap-2">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSend(prompt)}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="border-t border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white p-2 shadow-sm focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-100">
                <button
                  type="button"
                  className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                  title="Voice input"
                >
                  <Mic size={18} />
                </button>

                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSend();
                    }
                  }}
                  placeholder="Ask the AI Supervisor Assistant..."
                  className="flex-1 bg-transparent px-2 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />

                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isThinking}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-600 text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Send size={18} />
                </button>
              </div>

              <p className="mt-2 text-[11px] text-slate-400">
                AI suggestions are decision-support outputs and should be
                reviewed by the responsible dive supervisor.
              </p>
            </div>
          </section>

          {/* RIGHT SIDEBAR */}
          <aside className="space-y-5">
            {/* Mission Context */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Current Mission
                  </p>

                  <h3 className="mt-1 font-semibold text-slate-900">
                    Pipeline Inspection Alpha
                  </h3>
                </div>

                <div className="rounded-lg bg-sky-100 p-2 text-sky-600">
                  <Waves size={20} />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Mission ID</span>
                  <span className="font-semibold text-slate-800">M-204</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Location</span>
                  <span className="font-semibold text-slate-800">
                    Arabian Sea Zone A
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Mission Progress</span>
                  <span className="font-semibold text-slate-800">76%</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[76%] rounded-full bg-sky-500"></div>
                </div>
              </div>
            </div>

            {/* Selected Diver */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <Activity size={18} className="text-sky-600" />

                <h3 className="font-semibold text-slate-900">
                  Selected Diver
                </h3>
              </div>

              <select
                value={selectedDiverId}
                onChange={(e) => setSelectedDiverId(e.target.value)}
                className="mb-4 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-sky-400"
              >
                {diverData.map((diver) => (
                  <option key={diver.id} value={diver.id}>
                    {diver.name} ({diver.id})
                  </option>
                ))}
              </select>

              {selectedDiver && (
                <>
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">
                        {selectedDiver.name}
                      </p>

                      <p className="text-xs text-slate-400">
                        {selectedDiver.id}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        selectedDiver.riskLevel === "HIGH"
                          ? "bg-red-100 text-red-700"
                          : selectedDiver.riskLevel === "MEDIUM"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {selectedDiver.riskLevel}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-[11px] text-slate-400">Risk Score</p>
                      <p className="mt-1 text-lg font-bold text-slate-800">
                        {selectedDiver.riskScore}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-[11px] text-slate-400">Heart Rate</p>
                      <p className="mt-1 text-lg font-bold text-slate-800">
                        {selectedDiver.heartRate}
                        <span className="ml-1 text-xs font-normal text-slate-400">
                          BPM
                        </span>
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-[11px] text-slate-400">Oxygen</p>
                      <p className="mt-1 text-lg font-bold text-slate-800">
                        {selectedDiver.oxygen}%
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-[11px] text-slate-400">Depth</p>
                      <p className="mt-1 text-lg font-bold text-slate-800">
                        {selectedDiver.depth}
                        <span className="ml-1 text-xs font-normal text-slate-400">
                          m
                        </span>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      navigate(`/monitoring/${selectedDiver.id}`)
                    }
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Open Diver Monitoring
                    <ArrowRight size={16} />
                  </button>
                </>
              )}
            </div>

            {/* AI Insights */}
            <div className="rounded-2xl border border-sky-100 bg-sky-50 p-5">
              <div className="mb-4 flex items-center gap-2">
                <Sparkles size={18} className="text-sky-600" />

                <h3 className="font-semibold text-slate-900">
                  AI Insights
                </h3>
              </div>

              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="mt-0.5 rounded-lg bg-white p-2 text-red-500">
                    <AlertTriangle size={16} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      High Risk Detected
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Neha Gupta currently has the highest risk score.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-0.5 rounded-lg bg-white p-2 text-amber-500">
                    <Activity size={16} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Increased Monitoring
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Rahul Singh should remain under closer observation.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-0.5 rounded-lg bg-white p-2 text-emerald-500">
                    <ShieldCheck size={16} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Mission Status
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Mission monitoring is active and telemetry is available.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Navigation */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <CircleHelp size={18} className="text-slate-500" />

                <h3 className="font-semibold text-slate-900">
                  Supervisor Tools
                </h3>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => navigate("/risk")}
                  className="flex w-full items-center justify-between rounded-lg border border-slate-200 px-3 py-3 text-sm text-slate-700 hover:bg-slate-50"
                >
                  <span className="flex items-center gap-2">
                    <Brain size={16} />
                    AI Risk & Decision Support
                  </span>

                  <ArrowRight size={15} />
                </button>

                <button
                  onClick={() => navigate("/alerts")}
                  className="flex w-full items-center justify-between rounded-lg border border-slate-200 px-3 py-3 text-sm text-slate-700 hover:bg-slate-50"
                >
                  <span className="flex items-center gap-2">
                    <AlertTriangle size={16} />
                    Alerts & Emergency
                  </span>

                  <ArrowRight size={15} />
                </button>

                <button
                  onClick={() => navigate("/reports")}
                  className="flex w-full items-center justify-between rounded-lg border border-slate-200 px-3 py-3 text-sm text-slate-700 hover:bg-slate-50"
                >
                  <span className="flex items-center gap-2">
                    <FileText size={16} />
                    Diver Reports
                  </span>

                  <ArrowRight size={15} />
                </button>

                <button
                  onClick={() => navigate("/dashboard")}
                  className="flex w-full items-center justify-between rounded-lg border border-slate-200 px-3 py-3 text-sm text-slate-700 hover:bg-slate-50"
                >
                  <span className="flex items-center gap-2">
                    <Users size={16} />
                    Command Center
                  </span>

                  <ArrowRight size={15} />
                </button>
              </div>
            </div>

            {/* System Status */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-2">
                <Clock3 size={17} className="text-slate-500" />

                <h3 className="font-semibold text-slate-900">
                  System Context
                </h3>
              </div>

              <div className="space-y-2 text-xs text-slate-500">
                <div className="flex justify-between">
                  <span>Telemetry</span>
                  <span className="font-medium text-emerald-600">
                    Connected
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Risk Engine</span>
                  <span className="font-medium text-emerald-600">
                    Active
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Mission State</span>
                  <span className="font-medium text-sky-600">
                    Monitoring
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default AI_assistant;