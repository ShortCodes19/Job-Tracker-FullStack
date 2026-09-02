import { useEffect, useState } from "react";

import type { JobsType, NewJob, StatusFilter } from "./Types/types";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import SearchFilter from "./components/SearchFilter";
import JobFilter from "./components/JobFilter";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
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

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.companyName.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
      job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "All" || job.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const editJob = (id: number) => {
    const job = jobs.find((job) => job.id === id);

    if (!job) return;
    setEditingJob(job);
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
      <SearchFilter onSearch={setSearchTerm} />
      <JobFilter
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      <JobForm onAdd={addJob} editingJob={editingJob} updateJob={updateJob} />
      <JobList jobs={filteredJobs} onDelete={deleteJob} onEdit={editJob} />
    </div>
  );
};

export default App;
