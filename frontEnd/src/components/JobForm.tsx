import React, { useEffect, useState } from "react";
import type { JobsType, NewJob } from "../Types/types";
import { useNavigate } from "react-router-dom";

interface JobFormProps {
  onAdd: (job: NewJob) => void;
  editingJob: JobsType | null;
  updateJob: (updatedJob: JobsType) => void;
}

const JobForm = ({ onAdd, editingJob, updateJob }: JobFormProps) => {
  const navigate = useNavigate();
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
    navigate("/jobs");
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
    <div className="bg-linear-to-br from-blue-50 to-indigo-50 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {editingJob ? "Edit Job" : "Add New Job"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={inputs.companyName}
            onChange={handleChange}
            required
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <input
            type="text"
            name="position"
            placeholder="Position"
            value={inputs.position}
            onChange={handleChange}
            required
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={inputs.location}
            onChange={handleChange}
            required
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={inputs.salary}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <input
            type="date"
            name="appliedDate"
            placeholder="Applied Date (timestamp)"
            value={inputs.appliedDate}
            onChange={handleChange}
            required
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <select
            name="flexibility"
            value={inputs.flexibility}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
          >
            <option value="Remote">Remote</option>
            <option value="On-Site">On-Site</option>
          </select>
          <select
            name="status"
            value={inputs.status}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white md:col-span-2"
          >
            <option value="Applied">Applied</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Hired">Hired</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full md:w-auto px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
        >
          {editingJob ? "Save Changes" : "Add Job"}
        </button>
      </form>
    </div>
  );
};

export default JobForm;
