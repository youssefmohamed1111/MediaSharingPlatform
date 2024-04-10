import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27018/media-sharing", {
    });
    console.log("MongoDB Connected"); // Log a generic success message
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
