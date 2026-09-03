import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import chalk from "chalk";
import Job from "./models/Job.js";

const app = express();
process.env.MONGO_URI;
const PORT = 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Job Tracker API is running");
});

app.post("/api/jobs", async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create job",
    });
  }
});

app.get("/api/jobs", async (req, res) => {
  try {
    const jobs = await Job.find();

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch jobs",
    });
  }
});

app.get("/api/jobs/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch job",
    });
  }
});

app.put("/api/jobs/:id", async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update job",
    });
  }
});

app.delete("/api/jobs/:id", async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }
    res.status(200).json({
      message: "Job deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete job",
    });
  }
});

const connectDB = async () => {
  try {
    const uri = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `${chalk.bgYellowBright("Data base connected - ")} ${uri.connection.host}`,
    );
  } catch (error) {
    console.log(`${chalk.red("Data base connection failed")}`);
    process.exit(1);
  }
};

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
