import JobList from "../components/JobList";
import SearchFilter from "../components/SearchFilter";
import JobFilter from "../components/JobFilter";
import type { JobsType, StatusFilter } from "@/Types/types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";

interface JobsPagesProps {
  jobs: JobsType[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  loading: boolean;
  error: string;
}

const JobPages = ({
  jobs,
  onDelete,
  onEdit,
  loading,
  error,
}: JobsPagesProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [showFilters, setShowFilters] = useState(false);

  console.log(jobs);
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "All" || job.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-full h-screen overflow-auto px-5 py-8 bg-cyan-950 shadow-2xl shadow-slate-950">
      <Link
        to="/jobsForm"
        onClick={(e) => {
          if (error) e.preventDefault();
        }}
        aria-disabled={error ? true : undefined}
        className={`inline-block px-4 py-2 font-semibold text-white rounded text-center transition-colors ${
          error
            ? "bg-gray-400 cursor-not-allowed opacity-50 select-none pointer-events-none"
            : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
        }`}
      >
        Add New Job
      </Link>
      <div className="relative">
        {/* Arrow Button */}
        <button
          title="Search & Filter"
          onClick={() => setShowFilters((prev) => !prev)}
          className="fixed right-0 top-2 z-50 rounded-l-lg border text-xs font-bold bg-white px-3 py-4 shadow-md"
        >
          {showFilters ? ">>" : "<<"}
        </button>

        {/* Side Panel */}
        <div
          className={`fixed right-0 top-0 z-40 h-full w-80 transform bg-slate-900 opacity-90 p-6 shadow-xl transition-transform duration-300 ${
            showFilters ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <h2 className="mb-6 text-lg font-semibold text-slate-400">
            Search & Filters
          </h2>

          <div className="flex flex-col gap-4">
            <SearchFilter searchTerm={searchTerm} onSearch={setSearchTerm} />

            <JobFilter
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />
          </div>
        </div>
      </div>
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <ImSpinner2 className="text-white size-20 animate-spin" />
        </div>
      ) : error ? (
        <p className="text-lg text-center text-rose-300 py-12">{error}</p>
      ) : jobs.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-lg font-medium text-white">No jobs added yet</p>

          <p className="mt-1 text-sm text-slate-400">
            Add your first job to start tracking applications.
          </p>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-lg font-medium text-white">No jobs found</p>

          <p className="mt-1 text-sm text-slate-400">
            Try a different search or filter.
          </p>
        </div>
      ) : (
        <JobList jobs={filteredJobs} onDelete={onDelete} onEdit={onEdit} />
      )}
    </div>
  );
};

export default JobPages;
