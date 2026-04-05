import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const FEATURES = [
  {
    icon: "✦",
    color: "from-indigo-500 to-violet-500",
    glow: "rgba(99,102,241,0.25)",
    title: "AI-Generated Questions",
    desc: "Tailored questions based on your target role, stack, and years of experience.",
  },
  {
    icon: "⚡",
    color: "from-violet-500 to-fuchsia-500",
    glow: "rgba(168,85,247,0.25)",
    title: "Instant Sessions",
    desc: "Spin up a focused prep session in seconds — no setup, no friction.",
  },
  {
    icon: "🎯",
    color: "from-fuchsia-500 to-pink-500",
    glow: "rgba(217,70,239,0.25)",
    title: "Track Progress",
    desc: "Review all past sessions and watch your confidence grow over time.",
  },
];

const STATS = [
  { value: "10k+", label: "Questions Generated" },
  { value: "500+", label: "Active Users" },
  { value: "95%", label: "Satisfaction Rate" },
];

const FeatureCard = ({ icon, color, glow, title, desc }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative group cursor-default rounded-2xl p-[1px] transition-all duration-300"
      style={{
        background: hovered
          ? `linear-gradient(135deg, ${glow.replace("0.25", "0.6")}, transparent)`
          : "transparent",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Glow behind card */}
      <div
        className="absolute inset-0 rounded-2xl blur-xl transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${glow}, transparent 70%)`,
          opacity: hovered ? 0.6 : 0,
        }}
      />

      <div
        className="relative rounded-2xl p-6 flex flex-col gap-4 h-full transition-all duration-300"
        style={{
          background: hovered
            ? "rgba(255,255,255,0.06)"
            : "rgba(255,255,255,0.03)",
          border: hovered
            ? `1px solid ${glow.replace("0.25", "0.5")}`
            : "1px solid rgba(255,255,255,0.08)",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
        }}
      >
        {/* Icon blob */}
        <div
          className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-lg shadow-lg transition-transform duration-300`}
          style={{ transform: hovered ? "scale(1.1) rotate(-4deg)" : "scale(1)" }}
        >
          {icon}
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white mb-1.5">{title}</h3>
          <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
        </div>

        {/* Bottom arrow link */}
        <div
          className="mt-auto text-xs font-medium flex items-center gap-1 transition-all duration-200"
          style={{ color: hovered ? "#a78bfa" : "#4b5563" }}
        >
          Learn more
          <span
            className="transition-transform duration-200 inline-block"
            style={{ transform: hovered ? "translateX(3px)" : "translateX(0)" }}
          >
            →
          </span>
        </div>
      </div>
    </div>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">

      {/* ── Floating Nav ── */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-6 px-5 py-2.5 rounded-full backdrop-blur-xl border border-white/10 bg-white/[0.04] shadow-xl">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white text-[10px] font-black">
            AI
          </div>
          <span className="text-white text-sm font-semibold hidden sm:block">PrepAI</span>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => navigate("/login")}
            className="text-xs text-gray-400 hover:text-white transition-colors px-3 py-1.5"
          >
            Sign in
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="relative text-xs font-medium text-white px-4 py-1.5 rounded-full overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 transition-opacity duration-200 group-hover:opacity-80" />
            <span className="relative z-10">Get Started</span>
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-32 pb-20 relative">

        {/* Animated ambient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[28vw] h-[28vw] rounded-full bg-indigo-600/20 blur-[100px] animate-pulse pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[22vw] h-[22vw] rounded-full bg-violet-600/20 blur-[100px] animate-pulse pointer-events-none" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 right-1/3 w-[16vw] h-[16vw] rounded-full bg-fuchsia-700/15 blur-[80px] pointer-events-none" />

        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-xs text-indigo-400 font-medium mb-8 backdrop-blur-sm transition-all duration-700"
          style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(12px)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          Powered by Gemini AI &nbsp;·&nbsp; Free to start
        </div>

        {/* Headline */}
        <h1
          className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-none max-w-4xl transition-all duration-700 delay-75"
          style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(16px)" }}
        >
          <span className="text-white">Ace Every</span>
          <br />
          <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            Interview
          </span>
          <span className="text-white"> with AI</span>
        </h1>

        {/* Sub */}
        <p
          className="mt-6 text-sm sm:text-base text-gray-500 max-w-lg leading-relaxed transition-all duration-700 delay-150"
          style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(16px)" }}
        >
          Generate personalized interview questions, practice your answers, and
          land your dream role — all inside one intelligent workspace.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center gap-3 mt-10 transition-all duration-700 delay-200"
          style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(16px)" }}
        >
          <button
            onClick={() => navigate("/signup")}
            className="relative px-7 py-3 rounded-xl text-sm font-semibold text-white overflow-hidden group shadow-lg shadow-indigo-900/40"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 transition-all duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-500 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300" />
            <span className="relative z-10 flex items-center gap-2">
              Start for Free
              <span className="inline-block group-hover:translate-x-1 transition-transform duration-200">→</span>
            </span>
          </button>

          <button
            onClick={() => navigate("/login")}
            className="px-7 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white border border-white/10 hover:border-white/25 bg-white/[0.02] hover:bg-white/[0.06] transition-all duration-200 group"
          >
            <span className="flex items-center gap-2">
              Sign in
              <span className="text-gray-600 group-hover:text-gray-400 transition-colors">↗</span>
            </span>
          </button>
        </div>

        {/* Stats row */}
        <div
          className="flex items-center gap-8 mt-14 transition-all duration-700 delay-300"
          style={{ opacity: mounted ? 1 : 0 }}
        >
          {STATS.map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl font-black text-white">{s.value}</p>
              <p className="text-[11px] text-gray-600 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Feature Cards ── */}
      <section className="px-4 pb-24 max-w-5xl mx-auto w-full">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-white/5" />
          <span className="text-[11px] text-gray-600 uppercase tracking-widest font-medium">Features</span>
          <div className="flex-1 h-px bg-white/5" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </section>

      {/* ── Bottom CTA Banner ── */}
      <section className="px-4 pb-16 max-w-5xl mx-auto w-full">
        <div className="group relative rounded-2xl overflow-hidden p-[1px] transition-all duration-300 hover:scale-[1.01]">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/40 via-violet-600/40 to-fuchsia-600/40 animate-pulse" style={{ animationDuration: "3s" }} />
          <div className="relative bg-[#0E0E12] rounded-2xl px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/5">
            <div>
              <h2 className="text-xl font-bold text-white">Ready to start preparing?</h2>
              <p className="text-sm text-gray-500 mt-1">Join hundreds of engineers who nailed their interviews.</p>
            </div>
            <button
              onClick={() => navigate("/signup")}
              className="relative shrink-0 px-7 py-3 rounded-xl text-sm font-semibold text-white overflow-hidden group/btn"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 transition-opacity duration-200 group-hover/btn:opacity-80" />
              <span className="relative z-10 flex items-center gap-2">
                Create Free Account
                <span className="group-hover/btn:translate-x-1 transition-transform duration-200 inline-block">→</span>
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-6 text-center text-[11px] text-gray-700">
        © {new Date().getFullYear()} PrepAI &nbsp;·&nbsp; Built with Gemini AI
      </footer>
    </div>
  );
};

export default LandingPage;