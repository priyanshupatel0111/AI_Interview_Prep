import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const conectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected ✓");
  } catch (error) {
    console.error("DB Connection failed:", error.message);
    process.exit(1); // Crash loudly so Render knows the deploy failed
  }
};

export default conectDB;
