import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";

const QAItem = ({ item, onPin }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="rounded-xl p-4 group transition-all duration-200"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow-card)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
      }}
    >
      <div className="flex justify-between items-start gap-3">
        <h3
          className="text-sm font-medium cursor-pointer flex-1 leading-snug"
          style={{ color: "var(--text)" }}
          onClick={() => setOpen(!open)}
        >
          {item.question}
        </h3>
        <button
          onClick={() => onPin?.(item._id)}
          className="text-xs p-1.5 rounded-lg transition shrink-0"
          style={{
            background: "var(--bg-input)",
            border: "1px solid var(--border)",
          }}
        >
          {item.pinned ? "📌" : "📍"}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div
              className="mt-3 pt-3 prose max-w-none text-xs leading-relaxed"
              style={{
                borderTop: "1px solid var(--border)",
                color: "var(--text-sub)",
              }}
            >
              <ReactMarkdown>{item.answer}</ReactMarkdown>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default QAItem;
