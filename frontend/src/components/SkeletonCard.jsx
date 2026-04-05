const SkeletonCard = () => (
  <div
    className="rounded-xl p-5 space-y-3 animate-pulse"
    style={{
      background: "var(--bg-card)",
      border: "1px solid var(--border)",
      boxShadow: "var(--shadow-card)",
    }}
  >
    <div className="flex items-center gap-2">
      <div className="h-5 w-5 rounded-full" style={{ background: "var(--border)" }} />
      <div className="h-3 rounded w-16" style={{ background: "var(--border)" }} />
    </div>
    <div className="h-4 rounded w-3/4" style={{ background: "var(--border)" }} />
    <div className="h-3 rounded w-full" style={{ background: "var(--bg-input)" }} />
    <div className="h-3 rounded w-5/6" style={{ background: "var(--bg-input)" }} />
  </div>
);

export default SkeletonCard;
