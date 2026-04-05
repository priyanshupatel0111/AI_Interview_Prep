import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const  conectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("DB Conected");
    
  } catch (error) {
    console.log(error);
  }
};

export default conectDB;

