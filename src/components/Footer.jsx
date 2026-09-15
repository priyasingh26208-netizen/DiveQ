function Footer() {
  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid md:grid-cols-3 gap-10">

          {/* Logo & Description */}
          <div>
            <h2 className="text-3xl font-bold">
              Dive<span className="text-cyan-400">Q</span>
            </h2>

            <p className="mt-4 text-slate-400 leading-relaxed">
              AI-powered dive supervision platform helping teams
              monitor divers in real time, predict risks, and
              improve underwater mission safety.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-cyan-400">
              Quick Links
            </h3>

            <ul className="space-y-3 text-slate-400">
              <li><a href="#" className="hover:text-cyan-400">Home</a></li>
              <li><a href="#" className="hover:text-cyan-400">Features</a></li>
              <li><a href="#" className="hover:text-cyan-400">About</a></li>
              <li><a href="#" className="hover:text-cyan-400">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-cyan-400">
              Contact
            </h3>

            <div className="space-y-3 text-slate-400">
              <p>📧 support@diveq.ai</p>
              <p>📍 New Delhi, India</p>
              <p>📞 +91 98765 43210</p>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 mt-10 pt-6 text-center text-slate-500">
          © 2026 DiveQ. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;