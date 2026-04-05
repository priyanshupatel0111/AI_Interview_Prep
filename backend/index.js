import express from "express";
import cors from "cors"; 
import userRoutes from "./routes/auth-route.js";
import sessionRoutes from "./routes/session-route.js";
import aiRoutes from "./routes/ai-route.js";
import conectDB from "./config/database-config.js";

conectDB();

// 2) call/invoke the function
let app = express(); // object = {listen}

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.urlencoded({ extended: true }));// this 
app.use(express.json());

app.use("/api/auth", userRoutes); 
app.use("/api/sessions", sessionRoutes);
app.use("/api/ai", aiRoutes);


app.listen(9001, () => {
  console.log("Server Started.....");
});



