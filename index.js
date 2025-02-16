// modules
import express from "express";
const app = express();
import cors from "cors";
import connectDatabase from "./utils/connectDatabase.js";
import cookieParser from "cookie-parser";

import baseRouter from "./routes/root.js";
import authRouter from "./routes/api/auth/root.js";
import forumRouter from "./routes/api/forum/root.js";
import eventRouter from "./routes/api/events/root.js";

// env variables
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

const corsOptions = {
  origin: ["http://localhost:5173", "https://fabulous-lokum-0f6f4a.netlify.app"],
  credentials: true
};

// middlewares
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/", baseRouter);
app.use("/api/auth", authRouter);
app.use("/api/forum", forumRouter);
app.use("/api/events", eventRouter);

// server listening
app.listen(PORT, () => {
  connectDatabase(MONGO_URI);
  console.log(`Server running on port: ${PORT}`);
});
