import express from "express";
import "dotenv/config";
import connectDB from "./config/jobDb.js";
import jobRoutes from "./routes/jobRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import errorMiddleware from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";

const app = express();
process.env.MONGO_URI;
const PORT = 5000;

app.use(
  cors({
    origin: process.env.FRONT_END_URL,
  }),
);
app.use(express.json());
app.use(cookieParser());
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
