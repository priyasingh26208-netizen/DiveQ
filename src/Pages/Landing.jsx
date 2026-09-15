import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import Footer from '../components/Footer'

function Landing() {
  return (
    <>
      <Navbar />
      <HeroSection />

      {/* How It Works Section */}
      <section className="bg-sky-50 py-24">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
              How DiveQ Works
            </h2>

            <p className="text-slate-600 mt-4 max-w-3xl mx-auto">
              DiveQ combines real-time diver monitoring with AI-powered
              analysis to improve underwater mission safety and decision-making.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">

            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-md hover:shadow-xl transition duration-300">
              <div className="text-sky-600 text-4xl font-bold mb-4">
                01
              </div>

              <h3 className="text-xl font-semibold mb-3 text-slate-900">
                Diver Monitoring
              </h3>

              <p className="text-slate-600">
                Collect real-time diver vitals, depth, oxygen levels and mission data.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-md hover:shadow-xl transition duration-300">
              <div className="text-sky-600 text-4xl font-bold mb-4">
                02
              </div>

              <h3 className="text-xl font-semibold mb-3 text-slate-900">
                AI Analysis
              </h3>

              <p className="text-slate-600">
                Analyze incoming data continuously and detect potential risks.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-md hover:shadow-xl transition duration-300">
              <div className="text-sky-600 text-4xl font-bold mb-4">
                03
              </div>

              <h3 className="text-xl font-semibold mb-3 text-slate-900">
                Smart Alerts
              </h3>

              <p className="text-slate-600">
                Generate instant warnings and AI recommendations for supervisors.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-md hover:shadow-xl transition duration-300">
              <div className="text-sky-600 text-4xl font-bold mb-4">
                04
              </div>

              <h3 className="text-xl font-semibold mb-3 text-slate-900">
                Mission Success
              </h3>

              <p className="text-slate-600">
                Enable safer and more efficient underwater operations.
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Landing