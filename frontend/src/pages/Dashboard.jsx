import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axiosInstance";
import { useTheme } from "../context/ThemeContext";

/* ── Sun / Moon icons ── */
const SunIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);
const MoonIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

/* ── Theme Toggle ── */
const ThemeToggle = () => {
  const { isDark, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
      style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-sub)" }}
    >
      <span style={{ color: isDark ? "#a78bfa" : "#f59e0b" }}>
        {isDark ? <MoonIcon /> : <SunIcon />}
      </span>
      <span className="hidden sm:inline">{isDark ? "Dark" : "Light"}</span>
    </button>
  );
};

/* ── Profile Dropdown ── */
const ProfileDropdown = ({ userName, userEmail, onLogout }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const initial = userName.charAt(0).toUpperCase();

  return (
    <div className="relative" ref={ref}>
      {/* Avatar trigger */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-200 hover:scale-105"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
      >
        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
          {initial}
        </div>
        <span className="text-sm hidden sm:block" style={{ color: "var(--text-sub)" }}>{userName}</span>
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          style={{ color: "var(--text-sub)" }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          className="absolute right-0 mt-2 w-56 rounded-2xl shadow-xl overflow-hidden z-50"
          style={{
            background: "var(--dropdown-bg)",
            border: "1px solid var(--border)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
            animation: "dropIn 0.15s ease-out",
          }}
        >
          {/* User info */}
          <div className="px-4 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white flex items-center justify-center text-sm font-bold shrink-0">
                {initial}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate" style={{ color: "var(--text)" }}>{userName}</p>
                <p className="text-xs truncate mt-0.5" style={{ color: "var(--text-sub)" }}>{userEmail}</p>
              </div>
            </div>
          </div>

          {/* Logout */}
          <div className="p-2">
            <button
              onClick={() => { setOpen(false); onLogout(); }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-colors duration-150 hover:bg-red-500/10 text-red-500 group"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/* ── Trash icon ── */
const TrashIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4h6v2" />
  </svg>
);

/* ── Dashboard ── */
const Dashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const userName  = localStorage.getItem("userName")  || "User";
  const userEmail = localStorage.getItem("userEmail") || "";

  const fetchSessions = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSessions(res.data.sessions);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load sessions");
    }
  };

  const createSession = async () => {
    if (!role || !experience) return toast.error("Fill all fields");
    try {
      await axiosInstance.post(API_PATHS.SESSION.CREATE, { role, experience, questions: [] });
      toast.success("Session created!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create session");
    }
    setRole("");
    setExperience("");
    fetchSessions();
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation(); // prevent card navigation
    if (!window.confirm("Delete this session and all its questions?")) return;
    setDeletingId(id);
    try {
      await axiosInstance.delete(`${API_PATHS.SESSION.DELETE}/${id}`);
      setSessions((prev) => prev.filter((s) => s._id !== id));
      toast.success("Session deleted");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete session");
    } finally {
      setDeletingId(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  useEffect(() => { fetchSessions(); }, []);

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-6 max-w-5xl mx-auto">

      {/* Dropdown animation keyframe */}
      <style>{`@keyframes dropIn { from { opacity:0; transform:translateY(-6px) } to { opacity:1; transform:translateY(0) } }`}</style>

      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold tracking-tight" style={{ color: "var(--text)" }}>
            Interview Prep
          </h1>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-sub)" }}>Your AI workspace</p>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ProfileDropdown userName={userName} userEmail={userEmail} onLogout={handleLogout} />
        </div>
      </div>

      {/* ── Create Session Bar ── */}
      <div className="relative w-full mb-8 group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/30 to-violet-500/30 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition duration-300" />
        <div
          className="relative backdrop-blur-xl rounded-xl flex flex-col sm:flex-row gap-0 overflow-hidden transition-all duration-300"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}
        >
          <input
            placeholder="Role (e.g. Frontend Developer)"
            value={role}
            className="flex-1 bg-transparent text-sm px-4 py-3 focus:outline-none sm:border-r"
            style={{ color: "var(--text)", borderColor: "var(--border)", caretColor: "#818cf8" }}
            onChange={(e) => setRole(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && createSession()}
          />
          <input
            placeholder="Experience (yrs)"
            value={experience}
            className="w-full sm:w-36 bg-transparent text-sm px-4 py-3 focus:outline-none border-t sm:border-t-0 sm:border-r"
            style={{ color: "var(--text)", borderColor: "var(--border)", caretColor: "#818cf8" }}
            onChange={(e) => setExperience(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && createSession()}
          />
          <button
            onClick={createSession}
            className="relative px-5 py-3 text-sm font-medium text-white shrink-0 overflow-hidden border-t sm:border-t-0"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600" />
            <span className="relative z-10 flex items-center justify-center gap-1.5">✨ Create</span>
          </button>
        </div>
      </div>

      {/* ── Sessions Grid ── */}
      {sessions.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-sm" style={{ color: "var(--text-sub)" }}>No sessions yet</p>
          <p className="text-xs mt-1" style={{ color: "var(--text-dim)" }}>Create your first session above ↑</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {sessions.map((s) => (
            <div
              key={s._id}
              onClick={() => navigate(`/interview/${s._id}`)}
              className="group relative rounded-xl p-4 cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-card)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)";
                e.currentTarget.style.background = "var(--bg-card-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.background = "var(--bg-card)";
              }}
            >
              {/* ── Delete button ── */}
              <button
                onClick={(e) => handleDelete(e, s._id)}
                disabled={deletingId === s._id}
                title="Delete session"
                className="absolute top-2.5 right-2.5 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-150 hover:bg-red-500/15 hover:text-red-400 disabled:opacity-40"
                style={{ color: "var(--text-sub)" }}
              >
                {deletingId === s._id ? (
                  <svg className="animate-spin w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                    <path d="M12 2a10 10 0 0 1 10 10" />
                  </svg>
                ) : (
                  <TrashIcon />
                )}
              </button>

              <p className="text-[10px] text-indigo-400 font-medium uppercase tracking-wider mb-1.5">
                {s.experience}yr exp
              </p>
              <h2 className="font-medium text-sm leading-snug pr-6" style={{ color: "var(--text)" }}>
                {s.role}
              </h2>
              <div className="mt-3 text-[11px] flex items-center gap-1 transition-colors duration-200" style={{ color: "var(--text-sub)" }}>
                Open <span className="group-hover:translate-x-0.5 transition-transform inline-block">→</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
