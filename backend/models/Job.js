import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    status: { type: String, required: true },
  },
  { timestamps: true },
);

const Job = mongoose.model("Jobs", jobSchema);

export default Job;
