import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI

export async function dbConnect() {
  try {
    const res = await mongoose.connect(MONGODB_URI);
    console.log("✅ Database connected successfully");
    return res;
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1); 
  }
}
