import mongoose from "mongoose";

require("dotenv").config();
const connectDB = async () => {
  const dbConnectionString : string = process.env.DB_CONNECTION_STRING ?? '';
  try {
    await mongoose.connect(dbConnectionString, {});
    console.log("MongoDB Connected"); // Log a generic success message
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
