import { useState } from "react";

import type { JobsType, NewJob } from "./Types/types";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";

const App = () => {
  const [jobs, setJobs] = useState<JobsType[]>([]);
  const [editingJob, setEditingJob] = useState<JobsType | null>(null);

  const editJob = (id: number) => {
    const job = jobs.find((job) => job.id === id);

    if (!job) return;
    setEditingJob(job);
    console.log("editing started", job);
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
      <JobForm onAdd={addJob} editingJob={editingJob} />
      <JobList jobs={jobs} onDelete={deleteJob} onEdit={editJob} />
    </div>
  );
};

export default App;
