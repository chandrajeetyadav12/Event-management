import mongoose from "mongoose";
import { env } from "./env";

export const connectDB = async (): Promise<void> => {
  try {
    const connection = await mongoose.connect(env.MONGO_URI);

    console.log(
      `MongoDB Connected: ${connection.connection.host}`
    );
  } catch (error) {
    console.error("MongoDB Connection Error:", error);

    process.exit(1);
  }
};