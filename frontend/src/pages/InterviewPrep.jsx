import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";

import QAItem from "../components/QAItems";
import EmptyState from "../components/EmptyState";
import ErrorBanner from "../components/ErrorBanner";
import GenerateButton from "../components/GenerateButton";
import SkeletonCard from "../components/SkeletonCard";
import { API_PATHS } from "../utils/apiPaths";

import axios from "../utils/axiosInstance";

const parseError = (err) => {
  if (err.response)
    return (
      err.response.data?.message ||
      err.response.data?.error ||
      `Server error: ${err.response.status}`
    );
  if (err.request) return "Cannot reach server. Check your connection.";
  return err.message || "Something went wrong.";
};

const InterviewPrep = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const res = await axios.get(`${API_PATHS.SESSION.GET_ONE}/${id}`);
      setQuestions(res.data.session.questions || []);
    } catch (err) {
      setFetchError(parseError(err));
    } finally {
      setLoading(false);
    }
  }, [id]);

  const generateQuestions = async () => {
    setGenerating(true);
    try {
      await axios.post(API_PATHS.AI.GENERATE_QUESTIONS, { sessionId: id });
      await fetchQuestions();
      toast.success("Questions generated!");
    } catch (err) {
      toast.error(parseError(err));
    } finally {
      setGenerating(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-6 max-w-3xl mx-auto relative z-10">
      <Toaster
        position="top-right"
        toastOptions={{ className: "!text-xs !font-medium" }}
      />

      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-[10px] text-indigo-400 font-medium uppercase tracking-wider mb-1">
            Session · {id?.slice(0, 8)}
          </p>
          <h1 className="text-lg font-semibold" style={{ color: "var(--text)" }}>
            Interview Questions
          </h1>
          {!loading && !fetchError && (
            <p className="text-xs mt-0.5" style={{ color: "var(--text-sub)" }}>
              {questions.length > 0
                ? `${questions.length} question${questions.length !== 1 ? "s" : ""}`
                : "No questions yet"}
            </p>
          )}
        </div>

        <GenerateButton
          onClick={generateQuestions}
          generating={generating}
          loading={loading}
        />
      </div>

      {/* ── Divider ── */}
      <div className="mb-6" style={{ borderTop: "1px solid var(--border)" }} />

        {/* ── Content ── */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : fetchError ? (
          <ErrorBanner message={fetchError} onRetry={fetchQuestions} />
        ) : questions.length === 0 ? (
          <EmptyState onGenerate={generateQuestions} generating={generating} />
        ) : (
          <AnimatePresence>
            <div className="space-y-4">
              {questions.map((q, i) => (
                <motion.div
                  key={q._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: i * 0.05 }}
                >
                  <QAItem item={q} />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
    </div>
  );
};

export default InterviewPrep;
