import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axiosInstance";

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const navigate = useNavigate();

  const fetchSessions = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSessions(res.data.sessions);
    } catch (error) {
      console.log(error.response);
    }
  };

  const createSession = async () => {
    if (!role || !experience) return alert("Fill all fields");
    try {
      await axiosInstance.post(API_PATHS.SESSION.CREATE, {
        role,
        experience,
        questions: [],
      });
    } catch (error) {
      console.log(error.response);
    }
    setRole("");
    setExperience("");
    fetchSessions();
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const userName = localStorage.getItem("userName") || "User";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-white tracking-tight">Interview Prep</h1>
          <p className="text-xs text-gray-500 mt-0.5">Your AI workspace</p>
        </div>

        {/* Profile & Logout */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-white flex items-center justify-center text-xs font-bold">
              {userName.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm text-gray-300 hidden sm:block">{userName}</span>
          </div>
          <button
            onClick={handleLogout}
            className="text-xs text-gray-500 hover:text-red-400 transition px-2 py-1.5"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Create Session Bar */}
      <div className="relative w-full mb-8 group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/30 to-violet-500/30 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition duration-300" />
        <div className="relative bg-white/[0.04] backdrop-blur-xl rounded-xl border border-white/10 flex flex-col sm:flex-row gap-0 overflow-hidden">
          <input
            placeholder="Role (e.g. Frontend Developer)"
            value={role}
            className="flex-1 bg-transparent text-sm text-white placeholder-gray-600 px-4 py-3 focus:outline-none sm:border-r border-white/10"
            onChange={(e) => setRole(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && createSession()}
          />
          <input
            placeholder="Experience (yrs)"
            value={experience}
            className="w-full sm:w-36 bg-transparent text-sm text-white placeholder-gray-600 px-4 py-3 focus:outline-none border-t sm:border-t-0 sm:border-r border-white/10"
            onChange={(e) => setExperience(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && createSession()}
          />
          <button
            onClick={createSession}
            className="relative px-5 py-3 text-sm font-medium text-white shrink-0 overflow-hidden border-t sm:border-t-0 border-white/10"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600" />
            <span className="relative z-10 flex items-center justify-center gap-1.5">✨ Create</span>
          </button>
        </div>
      </div>

      {/* Sessions Grid */}
      {sessions.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-600 text-sm">No sessions yet</p>
          <p className="text-gray-700 text-xs mt-1">Create your first session above ↑</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {sessions.map((s, index) => (
            <div
              key={s._id}
              onClick={() => navigate(`/interview/${s._id}`)}
              className={`group relative bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-indigo-500/40 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                index === 0 ? "col-span-2 sm:col-span-2" : ""
              }`}
            >
              <p className="text-[10px] text-indigo-400 font-medium uppercase tracking-wider mb-1.5">
                {s.experience}yr exp
              </p>
              <h2 className="font-medium text-sm text-gray-200 leading-snug">{s.role}</h2>
              <div className="mt-3 text-[11px] text-gray-600 group-hover:text-indigo-400 transition-colors flex items-center gap-1">
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
