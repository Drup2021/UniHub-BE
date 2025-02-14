import mongoose from "mongoose";

const connectDatabase = async (URI) => {
  try {
    await mongoose.connect(URI);
    console.log("MongoDB connected successfully");

    process.on("SIGINT", async () => {
      console.log("Shutting down gracefully...");
      await mongoose.connection.close();
      console.log("MongoDB connection closed");
      process.exit(0);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connectDatabase;
