// modules
import express from "express";
const app = express();
import cors from "cors";
import connectDatabase from "./utils/connectDatabase.js";
import cookieParser from "cookie-parser";

import baseRouter from "./routes/root.js";
import authRouter from "./routes/api/auth/root.js";
import forumRouter from "./routes/api/forum/root.js";

// env variables
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

const corsOptions = {
  origin: `${process.env.CLIENT_URL}`,
  credentials: true,
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

// server listening
app.listen(PORT, () => {
  connectDatabase(MONGO_URI);
  console.log(`Server running on port: ${PORT}`);
});
