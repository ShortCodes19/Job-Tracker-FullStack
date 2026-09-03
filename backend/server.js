import express from "express";
import "dotenv/config";
import connectDB from "./config/jobDb.js";
import jobRoutes from "./routes/jobRoutes.js";
import cors from "cors";

const app = express();
process.env.MONGO_URI;
const PORT = 5000;

app.use(cors());
app.use(express.json());
connectDB();

app.get("/", (req, res) => {
  res.send("Job Tracker API is running");
});

app.use("/api/jobs", jobRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
