import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import InterviewPrep from "./pages/InterviewPrep";

const App = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-200 relative overflow-hidden font-sans">
      {/* Ambient Mesh Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-violet-600/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 w-full h-full min-h-screen">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/interview/:id" element={<InterviewPrep />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
