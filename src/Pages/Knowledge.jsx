
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar2 from "../components/Navbar2";

import {
  BookOpen,
  Search,
  Users,
  ShieldCheck,
  Wind,
  Gauge,
  Waves,
  Hand,
  Battery,
  HeartPulse,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  LifeBuoy,
  CircleHelp,
  Clock3,
  Anchor,
} from "lucide-react";

const knowledgeTopics = [
  {
    id: "basics",
    title: "Diving Basics",
    subtitle: "Know before you dive",
    icon: BookOpen,
    description:
      "The basic concepts every diver should understand before entering the water.",
    color: "sky",
  },
  {
    id: "buddy",
    title: "Buddy System",
    subtitle: "Never dive alone",
    icon: Users,
    description:
      "Why buddy awareness and communication are fundamental parts of dive safety.",
    color: "indigo",
  },
  {
    id: "equipment",
    title: "Dive Equipment",
    subtitle: "Know your gear",
    icon: LifeBuoy,
    description:
      "Understand the purpose of the main equipment used during a dive.",
    color: "cyan",
  },
  {
    id: "signals",
    title: "Hand Signals",
    subtitle: "Communicate underwater",
    icon: Hand,
    description:
      "Common underwater communication signals every dive team should review.",
    color: "violet",
  },
  {
    id: "depth",
    title: "Depth & Pressure",
    subtitle: "Understand the water",
    icon: Gauge,
    description:
      "Learn why depth and pressure matter during an underwater operation.",
    color: "blue",
  },
  {
    id: "breathing",
    title: "Breathing & Air",
    subtitle: "Monitor your supply",
    icon: Wind,
    description:
      "Basic awareness of breathing, air supply and gas management.",
    color: "emerald",
  },
  {
    id: "buoyancy",
    title: "Buoyancy",
    subtitle: "Control your position",
    icon: Waves,
    description:
      "Understand the importance of maintaining controlled buoyancy underwater.",
    color: "teal",
  },
  {
    id: "emergency",
    title: "Emergency Basics",
    subtitle: "Stay prepared",
    icon: AlertTriangle,
    description:
      "Basic awareness of what should be planned before an unexpected situation.",
    color: "red",
  },
];

const topicContent = {
  basics: {
    title: "Diving Basics",
    icon: BookOpen,
    intro:
      "A good dive starts before entering the water. Every diver should understand the plan, equipment, communication method and personal limits.",
    points: [
      {
        title: "Plan the dive",
        text: "Know the planned depth, expected duration, location and exit or recovery arrangements.",
      },
      {
        title: "Know your limits",
        text: "Divers should operate within their training, certification and experience.",
      },
      {
        title: "Check your equipment",
        text: "Equipment should be inspected and its operation understood before the dive.",
      },
      {
        title: "Know the communication plan",
        text: "The team should agree on how divers will communicate underwater and at the surface.",
      },
    ],
  },

  buddy: {
    title: "Buddy System",
    icon: Users,
    intro:
      "Diving is a team activity. A buddy system provides mutual awareness, communication and support during a dive.",
    points: [
      {
        title: "Stay aware of your buddy",
        text: "Know where your buddy is and periodically check that everything is going normally.",
      },
      {
        title: "Agree on the plan",
        text: "Discuss the expected depth, duration, route and communication approach before entering the water.",
      },
      {
        title: "Communicate clearly",
        text: "Underwater communication is usually non-verbal, so agreed signals are important.",
      },
      {
        title: "Do not exceed limits",
        text: "A buddy should not pressure another diver to go beyond training or agreed dive limits.",
      },
    ],
  },

  equipment: {
    title: "Dive Equipment",
    icon: LifeBuoy,
    intro:
      "Knowing what your equipment does is one of the simplest ways to improve dive awareness.",
    points: [
      {
        title: "Mask",
        text: "Provides an air space in front of the eyes and helps the diver see clearly underwater.",
      },
      {
        title: "Regulator",
        text: "Delivers breathing gas from the cylinder at a pressure suitable for breathing.",
      },
      {
        title: "Buoyancy System",
        text: "Used to help manage buoyancy and maintain controlled positioning in the water.",
      },
      {
        title: "Dive Computer",
        text: "Provides information such as depth and dive time and may provide additional dive-profile information.",
      },
      {
        title: "Cylinder & Gas Supply",
        text: "Provides the breathing gas used during the dive and should be monitored throughout the operation.",
      },
    ],
  },

  signals: {
    title: "Underwater Hand Signals",
    icon: Hand,
    intro:
      "Since normal speech is not available underwater, divers rely on agreed visual signals for communication.",
    points: [
      {
        title: "OK",
        text: "Used to communicate that everything is okay.",
      },
      {
        title: "Problem",
        text: "Used to indicate that something is wrong or requires attention.",
      },
      {
        title: "Ascend",
        text: "A commonly taught signal indicating a request or instruction to move upward.",
      },
      {
        title: "Descend",
        text: "A commonly taught signal indicating a request or instruction to move downward.",
      },
      {
        title: "Low Air",
        text: "Used to communicate that the diver's available breathing-gas supply is getting low.",
      },
    ],
  },

  depth: {
    title: "Depth & Pressure",
    icon: Gauge,
    intro:
      "Water pressure increases with depth. Understanding this basic relationship is important for every diver.",
    points: [
      {
        title: "Depth changes pressure",
        text: "The deeper a diver goes, the greater the surrounding water pressure becomes.",
      },
      {
        title: "Equalization matters",
        text: "Pressure changes affect air spaces in the body, so divers learn techniques to equalize appropriately.",
      },
      {
        title: "Depth affects the dive profile",
        text: "Depth and time are important factors when planning and monitoring a dive.",
      },
      {
        title: "Respect the planned profile",
        text: "Unexpected changes in depth should be recognized and managed according to the dive plan and training.",
      },
    ],
  },

  breathing: {
    title: "Breathing & Air Supply",
    icon: Wind,
    intro:
      "Breathing normally and staying aware of available breathing gas are fundamental parts of safe scuba diving.",
    points: [
      {
        title: "Breathe normally",
        text: "Scuba divers should breathe regularly and should not intentionally hold their breath during ascent.",
      },
      {
        title: "Monitor air supply",
        text: "The remaining breathing-gas supply should be checked regularly throughout the dive.",
      },
      {
        title: "Plan your reserve",
        text: "A dive plan should account for sufficient gas for the planned dive and appropriate contingencies.",
      },
      {
        title: "Watch changes",
        text: "Unexpected changes in breathing pattern or workload may affect gas consumption.",
      },
    ],
  },

  buoyancy: {
    title: "Buoyancy",
    icon: Waves,
    intro:
      "Good buoyancy control helps divers maintain a stable position, conserve energy and manage their movement underwater.",
    points: [
      {
        title: "Stay controlled",
        text: "Avoid unnecessary movement and sudden changes in position.",
      },
      {
        title: "Use equipment correctly",
        text: "Buoyancy equipment should be familiar and properly configured for the planned dive.",
      },
      {
        title: "Maintain awareness",
        text: "Depth, breathing and equipment changes can affect buoyancy.",
      },
      {
        title: "Practice the skill",
        text: "Buoyancy is a learned diving skill and improves through proper training and practice.",
      },
    ],
  },

  emergency: {
    title: "Emergency Basics",
    icon: AlertTriangle,
    intro:
      "Good emergency response begins before the dive. Teams should know what to do if communication, equipment or diver conditions change unexpectedly.",
    points: [
      {
        title: "Have a plan",
        text: "An emergency action plan should be established before the dive.",
      },
      {
        title: "Know the communication method",
        text: "The team should know how to communicate an abnormal or emergency situation.",
      },
      {
        title: "Know the response resources",
        text: "The team should understand what support, equipment and emergency resources are available.",
      },
      {
        title: "Stay calm and follow training",
        text: "Emergency situations should be managed according to established training and approved procedures.",
      },
    ],
  },
};

const quickFacts = [
  {
    icon: Users,
    title: "Buddy System",
    text: "Always dive with a buddy and agree on the plan before entering the water.",
  },
  {
    icon: Wind,
    title: "Breathing",
    text: "Breathe regularly and never hold your breath during ascent.",
  },
  {
    icon: ShieldCheck,
    title: "Pre-Dive Check",
    text: "Inspect your equipment and review the dive plan before entering the water.",
  },
  {
    icon: Gauge,
    title: "Know Your Limits",
    text: "Stay within your training, experience and planned dive limits.",
  },
];

function Knowledge() {
  const navigate = useNavigate();

  const [activeTopic, setActiveTopic] = useState("basics");
  const [search, setSearch] = useState("");

  const currentTopic = topicContent[activeTopic];
  const CurrentIcon = currentTopic.icon;

  const filteredTopics = knowledgeTopics.filter((topic) => {
    const query = search.toLowerCase().trim();

    if (!query) return true;

    return (
      topic.title.toLowerCase().includes(query) ||
      topic.subtitle.toLowerCase().includes(query) ||
      topic.description.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar2 />

      <main className="px-5 py-6 lg:px-8">
        {/* HEADER */}
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-sky-600">
                <Anchor size={15} />
                DIVE KNOWLEDGE
              </div>

              <h1 className="text-3xl font-bold tracking-tight">
                Know Your Dive
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Simple and essential diving knowledge every member of a
                dive team should understand.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
              <BookOpen size={17} className="text-sky-500" />
              <span className="text-sm font-semibold text-slate-700">
                8 Core Topics
              </span>
            </div>
          </div>

          {/* SEARCH */}
          <div className="mb-6 flex items-center rounded-2xl border border-slate-200 bg-white px-4 shadow-sm">
            <Search size={19} className="text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search a topic..."
              className="w-full bg-transparent px-3 py-3.5 text-sm outline-none placeholder:text-slate-400"
            />
          </div>

          {/* TOP INTRO BANNER */}
          <div className="mb-6 overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-sm">
            <div className="grid lg:grid-cols-[1fr_300px]">
              <div className="bg-gradient-to-r from-sky-50 to-white p-7">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-100 text-sky-600">
                    <ShieldCheck size={19} />
                  </div>

                  <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
                    Safety Starts With Knowledge
                  </span>
                </div>

                <h2 className="max-w-xl text-2xl font-bold leading-tight">
                  The basics matter before the dive even begins.
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                  Understand the equipment, communication, depth,
                  breathing and safety fundamentals that form the
                  foundation of every well-planned dive.
                </p>
              </div>

              <div className="flex items-center border-t border-sky-100 bg-slate-900 p-7 lg:border-l lg:border-t-0">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Remember
                  </p>

                  <p className="mt-2 text-xl font-semibold leading-7 text-white">
                    Plan the dive.
                    <br />
                    Dive the plan.
                  </p>

                  <p className="mt-3 text-xs leading-5 text-slate-400">
                    Always follow the applicable training and approved
                    diving procedures for the operation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* MAIN KNOWLEDGE AREA */}
          <div className="grid gap-6 lg:grid-cols-[245px_1fr]">
            {/* TOPIC SIDEBAR */}
            <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-4 px-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  Learn
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-800">
                  Core Dive Topics
                </p>
              </div>

              <div className="space-y-1.5">
                {filteredTopics.map((topic) => {
                  const Icon = topic.icon;
                  const active = activeTopic === topic.id;

                  return (
                    <button
                      key={topic.id}
                      onClick={() => setActiveTopic(topic.id)}
                      className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition ${
                        active
                          ? "bg-sky-50 text-sky-700"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                          active
                            ? "bg-sky-100 text-sky-600"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        <Icon size={17} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold">
                          {topic.title}
                        </p>

                        <p className="mt-0.5 truncate text-[10px] text-slate-400">
                          {topic.subtitle}
                        </p>
                      </div>

                      <ChevronRight
                        size={14}
                        className={
                          active
                            ? "text-sky-500"
                            : "text-slate-300"
                        }
                      />
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* CONTENT */}
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              {/* CONTENT HEADER */}
              <div className="border-b border-slate-200 bg-gradient-to-r from-white to-sky-50/50 p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
                      <CurrentIcon size={27} />
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-sky-600">
                        Essential Knowledge
                      </p>

                      <h2 className="mt-1 text-2xl font-bold">
                        {currentTopic.title}
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-500">
                    <Clock3 size={14} />
                    Quick Read
                  </div>
                </div>

                <p className="mt-5 max-w-3xl text-sm leading-6 text-slate-600">
                  {currentTopic.intro}
                </p>
              </div>

              {/* CONTENT POINTS */}
              <div className="p-6">
                <div className="mb-4 flex items-center gap-2">
                  <CheckCircle2
                    size={17}
                    className="text-emerald-500"
                  />

                  <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
                    Things To Know
                  </h3>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  {currentTopic.points.map((point, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-slate-200 bg-slate-50/70 p-5"
                    >
                      <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-xs font-bold text-sky-600 shadow-sm">
                          {String(index + 1).padStart(2, "0")}
                        </div>

                        <h4 className="font-semibold text-slate-800">
                          {point.title}
                        </h4>
                      </div>

                      <p className="text-sm leading-6 text-slate-500">
                        {point.text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* BOTTOM TIP */}
                <div className="mt-6 flex gap-3 rounded-xl border border-sky-100 bg-sky-50 p-4">
                  <CircleHelp
                    size={18}
                    className="mt-0.5 shrink-0 text-sky-600"
                  />

                  <div>
                    <p className="text-sm font-semibold text-sky-800">
                      DiveQ Tip
                    </p>

                    <p className="mt-1 text-xs leading-5 text-sky-700/70">
                      Knowledge is useful only when combined with proper
                      training, planning and the procedures applicable to
                      the actual dive operation.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* QUICK FACTS */}
          <section className="mt-8">
            <div className="mb-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                Dive 101
              </p>

              <h2 className="mt-1 text-xl font-bold">
                Things Every Diver Should Remember
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {quickFacts.map((fact, index) => {
                const Icon = fact.icon;

                return (
                  <div
                    key={index}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                        <Icon size={19} />
                      </div>

                      <span className="text-[10px] font-bold text-slate-300">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="mt-4 font-semibold">
                      {fact.title}
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      {fact.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* COMMON KNOWLEDGE */}
          <section className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                  <Battery size={20} />
                </div>

                <div>
                  <h2 className="font-bold">
                    Know Your Equipment
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    Basic equipment awareness
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  "Know what each major piece of equipment does.",
                  "Inspect equipment before the dive.",
                  "Use only equipment you are trained to use.",
                  "Report damaged or unfamiliar equipment.",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-lg bg-slate-50 p-3"
                  >
                    <CheckCircle2
                      size={16}
                      className="shrink-0 text-emerald-500"
                    />

                    <span className="text-sm text-slate-600">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl bg-red-50 p-3 text-red-600">
                  <AlertTriangle size={20} />
                </div>

                <div>
                  <h2 className="font-bold">
                    Safety Mindset
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    Simple rules worth remembering
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  "Never ignore something that does not feel right.",
                  "Stay within your training and experience.",
                  "Review the dive plan before entering the water.",
                  "Know how the team will respond if something goes wrong.",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-lg bg-slate-50 p-3"
                  >
                    <ShieldCheck
                      size={16}
                      className="shrink-0 text-sky-500"
                    />

                    <span className="text-sm text-slate-600">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="mt-8 overflow-hidden rounded-2xl bg-slate-900 p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-sky-500/10 p-3 text-sky-400">
                  <CircleHelp size={22} />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-sky-400">
                    Need More Information?
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-white">
                    Ask the DiveQ AI Assistant
                  </h2>

                  <p className="mt-1 max-w-xl text-sm leading-6 text-slate-400">
                    Ask questions about the current mission, diver
                    telemetry or information available in your DiveQ
                    knowledge base.
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate("/ai-assistant")}
                className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100"
              >
                Open AI Assistant
                <ArrowRight size={17} />
              </button>
            </div>
          </section>

          {/* NOTE */}
          <div className="mt-5 flex items-start gap-3 px-1 pb-5">
            <AlertTriangle
              size={15}
              className="mt-0.5 shrink-0 text-amber-500"
            />

            <p className="text-[11px] leading-5 text-slate-400">
              This page provides general educational and reference
              information. Actual diving operations should always follow
              the applicable certification, training, dive plan and
              organization-approved procedures.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Knowledge;
