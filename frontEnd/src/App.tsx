import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import type { JobsType, NewJob } from "./Types/types";
import JobForm from "./components/JobForm";
import JobPages from "./pages/JobPages";
import WelcomePage from "./pages/WelcomePage";
import { getJobs, createJob, deleteJobAPI } from "./services/jobApi";

const App = () => {
  const navigation = useNavigate();
  const [jobs, setJobs] = useState<JobsType[]>([]);

  useEffect(() => {
    const loadJobs = async () => {
      const data = await getJobs();
      // console.log(data);
      setJobs(data);
    };
    loadJobs();
  }, []);

  const [editingJob, setEditingJob] = useState<JobsType | null>(null);

  // add job function
  const addJob = async (newJob: NewJob) => {
    try {
      const createdJob = await createJob(newJob);
      console.log("created: ", createdJob);
      setJobs((prev) => [...prev, createdJob]);
    } catch (error) {
      console.log(error);
    }
  };

  // delete jobs function
  const deleteJob = async (id: string) => {
    await deleteJobAPI(id);
    setJobs((prev) => prev.filter((job) => job._id !== id));
  };

  const editJob = (id: string) => {
    const job = jobs.find((job) => job._id === id);

    if (!job) return;
    setEditingJob(job);
    navigation("/jobsForm");
  };

  // update jobs
  const updateJob = (updatedJob: JobsType) => {
    setJobs((prev) =>
      prev.map((job) => (job._id === updatedJob._id ? { ...updatedJob } : job)),
    );
    setEditingJob(null);
  };

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
