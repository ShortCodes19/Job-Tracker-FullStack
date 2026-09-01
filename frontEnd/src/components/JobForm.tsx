import React, { useEffect, useState } from "react";
import type { JobsType, NewJob } from "../Types/types";

interface JobFormProps {
  onAdd: (job: NewJob) => void;
  editingJob: JobsType | null;
  updateJob: (updatedJob: JobsType) => void;
}

const JobForm = ({ onAdd, editingJob, updateJob }: JobFormProps) => {
  const [inputs, setInputs] = useState({
    companyName: "",
    position: "",
    location: "",
    salary: "",
    flexibility: "Remote",
    status: "Applied",
    appliedDate: "",
  });

  useEffect(() => {
    if (editingJob) {
      setInputs({
        companyName: editingJob.companyName,
        position: editingJob.position,
        location: editingJob.location,
        salary: String(editingJob.salary),
        flexibility: editingJob.flexibility,
        status: editingJob.status,
        appliedDate: editingJob.appliedDate,
      });
    }
  }, [editingJob]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newJob: NewJob = {
      companyName: inputs.companyName,
      position: inputs.position,
      location: inputs.location,
      salary: Number(inputs.salary),
      flexibility: inputs.flexibility as JobsType["flexibility"],
      status: inputs.status as JobsType["status"],
      appliedDate: inputs.appliedDate,
    };

    if (editingJob !== null) {
      const updatedJob: JobsType = {
        ...newJob,
        id: editingJob.id,
      };
      updateJob(updatedJob);
    } else {
      onAdd(newJob);
    }

    setInputs({
      companyName: "",
      position: "",
      location: "",
      salary: "",
      flexibility: "Remote",
      status: "Applied",
      appliedDate: "",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={inputs.companyName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="position"
          placeholder="Position"
          value={inputs.position}
          onChange={handleChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={inputs.location}
          onChange={handleChange}
        />
        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={inputs.salary}
          onChange={handleChange}
        />
        <input
          type="date"
          name="appliedDate"
          placeholder="Applied Date (timestamp)"
          value={inputs.appliedDate}
          onChange={handleChange}
        />
        <select
          name="flexibility"
          value={inputs.flexibility}
          onChange={handleChange}
        >
          <option value="Remote">Remote</option>
          <option value="On-Site">On-Site</option>
        </select>
        <select name="status" value={inputs.status} onChange={handleChange}>
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Hired">Hired</option>
          <option value="Rejected">Rejected</option>
        </select>
        <button type="submit">{editingJob ? "Save" : "Add"}</button>
      </form>
    </div>
  );
};

export default JobForm;
