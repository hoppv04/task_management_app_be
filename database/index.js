import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb://localhost:27017/task_management_app_2024"
    );
    console.log("Connect DB successfully");
  } catch (error) {
    console.log(`Connect DB failed: ${error}`);
  }
};

export default connectDB;
