import herooo from "../assets/herooo.png";
import Dive from  "../assets/Dive-collage.png"
function Hero() {
  return (
    <section
      className="relative py-24 lg:py-32 text-white bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${herooo})`,
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-slate-950/70"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div>
            <span className="inline-block px-4 py-2 rounded-full border border-cyan-500 text-cyan-400 text-sm font-semibold tracking-wider">
              AI-POWERED DIVE SUPERVISION
            </span>

            <h1 className="text-5xl md:text-7xl font-bold mt-6">
              Dive<span className="text-cyan-400">Q</span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-xl leading-relaxed">
              Connecting real-time diver data with intelligent AI
              analysis to help supervisors make safer decisions
              during underwater missions.
            </p>

            <div className="flex flex-wrap gap-8 mt-8 text-cyan-400 font-medium">
              <span>⚡ Real-Time Monitoring</span>
              <span>🧠 AI Risk Prediction</span>
            </div>

            <button className="mt-10 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-8 py-4 rounded-xl transition-all duration-300 flex items-center gap-3 shadow-lg">
              Learn More
              <span>→</span>
            </button>
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <img
             src= {Dive}
              alt="DiveQ Monitoring System"
              className="w-full max-w-md lg:max-w-2xl object-contain drop-shadow-[0_0_40px_rgba(34,211,238,0.5)]"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
