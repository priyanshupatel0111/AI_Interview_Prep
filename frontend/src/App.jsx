import { Routes, Route } from "react-router-dom";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { Toaster } from "react-hot-toast";

import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import InterviewPrep from "./pages/InterviewPrep";

const AppShell = () => {
  const { isDark } = useTheme();

  return (
    <div
      className="min-h-screen relative overflow-hidden font-sans transition-colors duration-300"
      style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
    >
      <Toaster position="top-center" />
      {/* Ambient Mesh Gradients */}
      <div
        className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full blur-[120px] pointer-events-none transition-all duration-700"
        style={{ background: "var(--orb-1)" }}
      />
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full blur-[150px] pointer-events-none transition-all duration-700"
        style={{ background: "var(--orb-2)" }}
      />

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

const App = () => (
  <ThemeProvider>
    <AppShell />
  </ThemeProvider>
);

export default App;
