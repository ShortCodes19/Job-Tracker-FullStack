import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import type { JobsType, NewJob } from "./Types/types";
import JobForm from "./components/JobForm";
import JobPages from "./pages/JobPages";
import WelcomePage from "./pages/WelcomePage";

const App = () => {
  const navigation = useNavigate();
  const [jobs, setJobs] = useState<JobsType[]>(() => {
    const saved = localStorage.getItem("jobs");

    if (!saved) return [];
    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  });

  const [editingJob, setEditingJob] = useState<JobsType | null>(null);

  // add job function
  const addJob = (job: NewJob) => {
    setJobs((prev) => [...prev, { ...job, id: Date.now() }]);
  };

  // delete jobs function
  const deleteJob = (id: number) => {
    setJobs((prev) => prev.filter((job) => job.id !== id));
  };

  const editJob = (id: number) => {
    const job = jobs.find((job) => job.id === id);

    if (!job) return;
    setEditingJob(job);
    navigation("/jobsForm");
  };

  // update jobs
  const updateJob = (updatedJob: JobsType) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === updatedJob.id ? { ...updatedJob } : job)),
    );
    setEditingJob(null);
  };

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);
  return (
    <div>
      <Routes>
        <Route path="/" element={<WelcomePage />} />

        <Route
          path="/jobs"
          element={
            <JobPages jobs={jobs} onDelete={deleteJob} onEdit={editJob} />
          }
        />

        <Route
          path="/jobsForm"
          element={
            <JobForm
              onAdd={addJob}
              editingJob={editingJob}
              updateJob={updateJob}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
