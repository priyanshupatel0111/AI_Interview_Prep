import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";

const QAItem = ({ item, onPin }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div 
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-white/[0.04] border border-white/10 rounded-xl p-4 group hover:border-indigo-500/30 transition-colors"
    >
      <div className="flex justify-between items-start gap-3">
        <h3
          className="text-sm font-medium text-gray-300 cursor-pointer flex-1 leading-snug"
          onClick={() => setOpen(!open)}
        >
          {item.question}
        </h3>
        <button
          onClick={() => onPin?.(item._id)}
          className="text-xs p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition shrink-0"
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
            <div className="mt-3 pt-3 border-t border-white/10 text-gray-500 prose prose-invert max-w-none text-xs leading-relaxed">
              <ReactMarkdown>{item.answer}</ReactMarkdown>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default QAItem;
