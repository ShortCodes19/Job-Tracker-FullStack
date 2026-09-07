import Job from "../models/Job.js";
import mongoose from "mongoose";

export const createJob = async (req, res, next) => {
  try {
    const job = await Job.create({
      ...req.body,
      user: req.userId,
    });

    res.status(201).json(job);
  } catch (error) {
    next(error);
  }
};

export const getJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ user: req.userId });

    res.status(200).json(jobs);
  } catch (error) {
    next(error);
  }
};

export const getJob = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid job ID",
      });
    }
    const job = await Job.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json(job);
  } catch (error) {
    next(error);
  }
};

export const updateJob = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid job ID",
      });
    }
    const job = await Job.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.userId,
      },
      req.body,
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json(job);
  } catch (error) {
    next(error);
  }
};

export const deleteJob = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid job ID",
      });
    }
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json({
      message: "Job deleted",
    });
  } catch (error) {
    next(error);
  }
};
