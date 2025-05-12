import mongoose from "mongoose";
import { MONGODB_URI } from "../config/config.js";

async function connectToDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");
    return true;
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error}`);
    return false;
  }
}
export default connectToDB;
