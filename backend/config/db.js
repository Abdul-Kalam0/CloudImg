import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ DB Connected.");
  } catch (error) {
    console.error("❌ Error in connecting DB", error);
    process.exit(1); // stop the server if DB is not connected
  }
};
