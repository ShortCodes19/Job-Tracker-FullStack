import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Applied", "Rejected", "Hired", "Interviewing"],
      required: true,
    },
    flexibility: {
      type: String,
      enum: ["Remote", "On-Site"],
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    appliedDate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Job = mongoose.model("Jobs", jobSchema);

export default Job;
