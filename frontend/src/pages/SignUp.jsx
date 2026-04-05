import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_PATHS } from "../utils/apiPaths";
import axios from "../utils/axiosInstance";

const SignUp = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleForm = (e) => {
    let { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSignup = async () => {
    try {
      await axios.post(API_PATHS.AUTH.SIGNUP, form);
      navigate("/login");
    } catch (error) {
      console.log(error.response);
      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 mb-4">
            <span className="text-white text-sm font-bold">AI</span>
          </div>
          <h1 className="text-lg font-semibold text-white">Create account</h1>
          <p className="text-xs text-gray-500 mt-1">Start your interview preparation journey</p>
        </div>

        {/* Card */}
        <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-3">
          <input
            name="name"
            placeholder="Full Name"
            className="w-full bg-white/5 border border-white/10 text-sm text-white rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/40 placeholder-gray-600 transition"
            onChange={handleForm}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full bg-white/5 border border-white/10 text-sm text-white rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/40 placeholder-gray-600 transition"
            onChange={handleForm}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full bg-white/5 border border-white/10 text-sm text-white rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/40 placeholder-gray-600 transition"
            onChange={handleForm}
          />
          <button
            onClick={handleSignup}
            className="relative w-full py-2.5 rounded-lg text-sm font-medium text-white overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 transition-opacity group-hover:opacity-90" />
            <span className="relative z-10">Create account</span>
          </button>
        </div>

        <p className="text-center text-xs text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-400 hover:text-indigo-300 transition">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
