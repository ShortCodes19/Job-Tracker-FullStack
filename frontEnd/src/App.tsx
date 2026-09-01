import { useEffect, useState } from "react";

import type { JobsType, NewJob } from "./Types/types";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";

const App = () => {
  const [jobs, setJobs] = useState<JobsType[]>(() => {
    const saved = localStorage.getItem("jobs");

    if (!saved) return [];
    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);
  const [editingJob, setEditingJob] = useState<JobsType | null>(null);

  const editJob = (id: number) => {
    const job = jobs.find((job) => job.id === id);

    if (!job) return;
    setEditingJob(job);
    console.log("editing started", job);
  };

  // update jobs
  const updateJob = (updatedJob: JobsType) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === updatedJob.id ? { ...updatedJob } : job)),
    );
    setEditingJob(null);
  };

  // add job function
  const addJob = (job: NewJob) => {
    setJobs((prev) => [...prev, { ...job, id: Date.now() }]);
  };

  // delete jobs function
  const deleteJob = (id: number) => {
    setJobs((prev) => prev.filter((job) => job.id !== id));
  };

  return (
    <div>
      <JobForm onAdd={addJob} editingJob={editingJob} updateJob={updateJob} />
      <JobList jobs={jobs} onDelete={deleteJob} onEdit={editJob} />
    </div>
  );
};

export default App;
