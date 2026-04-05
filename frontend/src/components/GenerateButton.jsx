import { BsStars } from "react-icons/bs";
import { ImSpinner8 } from "react-icons/im";

const GenerateButton = ({ onClick, generating, loading }) => (
  <button
    onClick={onClick}
    disabled={generating || loading}
    className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all group overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
    style={{
      background: "var(--bg-card)",
      border: "1px solid var(--border)",
      color: "var(--text)",
      boxShadow: "var(--shadow-card)",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = "rgba(99,102,241,0.5)";
      e.currentTarget.style.background = "var(--bg-card-hover)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = "var(--border)";
      e.currentTarget.style.background = "var(--bg-card)";
    }}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/10 to-violet-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <span className="relative z-10 flex items-center gap-2">
      {generating ? (
        <>
          <ImSpinner8 className="animate-spin w-4 h-4 text-indigo-400" /> Generating…
        </>
      ) : (
        <>
          <BsStars className="w-4 h-4 text-indigo-400 group-hover:animate-pulse" /> Generate
        </>
      )}
    </span>
  </button>
);

export default GenerateButton;
