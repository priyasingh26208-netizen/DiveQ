import React from "react";
import {
  Headphones,
  Mail,
  Phone,
  MessageSquare,
  Clock,
  Shield,
} from "lucide-react";
import Navbar from "../components/Navbar";


const Support = () => {
  return (
    <>
    <Navbar/>
    <section
      id="support"
      className="py-20 bg-gradient-to-b from-white to-sky-50"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-sky-900">
            Support & Assistance
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Our team is available to assist dive supervisors and operations
            teams whenever they need help with mission monitoring, system
            guidance, or technical support.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
            <Headphones className="w-12 h-12 text-sky-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              24/7 Technical Support
            </h3>
            <p className="text-gray-600">
              Get immediate assistance for system issues, telemetry monitoring,
              and operational guidance.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
            <Shield className="w-12 h-12 text-sky-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Safety Assistance
            </h3>
            <p className="text-gray-600">
              Access emergency procedures, risk recommendations, and mission
              safety support whenever required.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
            <Clock className="w-12 h-12 text-sky-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Fast Response Time
            </h3>
            <p className="text-gray-600">
              Our support team prioritizes mission-critical requests to ensure
              uninterrupted diving operations.
            </p>
          </div>
        </div>

        {/* Contact Box */}
        <div className="mt-14 bg-sky-900 text-white rounded-3xl p-10">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <Mail className="w-10 h-10 text-sky-300" />
              <div>
                <h4 className="font-semibold">Email Support</h4>
                <p className="text-sky-100">
                  support@diveq.com
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Phone className="w-10 h-10 text-sky-300" />
              <div>
                <h4 className="font-semibold">Call Us</h4>
                <p className="text-sky-100">
                  +91 98765 43210
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <MessageSquare className="w-10 h-10 text-sky-300" />
              <div>
                <h4 className="font-semibold">Live Chat</h4>
                <p className="text-sky-100">
                  Available 24/7 for operators
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Support;