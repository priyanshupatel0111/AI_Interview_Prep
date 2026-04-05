import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import userRoutes from "./routes/auth-route.js";
import sessionRoutes from "./routes/session-route.js";
import aiRoutes from "./routes/ai-route.js";
import conectDB from "./config/database-config.js";

conectDB();

const app = express();

// ── Security Headers ──────────────────────────────────────────────────────────
app.use(helmet());

// ── Logging ───────────────────────────────────────────────────────────────────
app.use(morgan("dev"));

// ── Rate Limiting ─────────────────────────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: { success: false, message: "Too many requests, please try again later." },
});
app.use("/api", limiter);

// ── CORS ──────────────────────────────────────────────────────────────────────
// In production, ALLOWED_ORIGIN is set in the hosting dashboard (e.g. Render).
// In development it falls back to localhost.
const allowedOrigins = (process.env.ALLOWED_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((o) => o.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (curl, Postman, mobile apps)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`CORS: origin '${origin}' not allowed`));
    },
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "1mb" })); // Prevent large payload attacks

// ── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/auth", userRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/ai", aiRoutes);

// ── Health check (useful for Render free tier) ────────────────────────────────
app.get("/health", (_req, res) => res.json({ status: "ok" }));

// ── Global Error Handler ──────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Express Error:", err.message);
  
  // Don't leak stack traces in production
  const isProd = process.env.NODE_ENV === "production";
  res.status(err.status || 500).json({
    success: false,
    message: isProd ? "Internal Server Error" : err.message,
    ...(isProd ? {} : { stack: err.stack }),
  });
});

// ── Start ─────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 9001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
