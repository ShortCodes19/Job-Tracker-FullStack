import type { StatusFilter } from "@/Types/types";

interface JobFilter {
  statusFilter: StatusFilter;
  setStatusFilter: (value: StatusFilter) => void;
}
const JobFilter = ({ statusFilter, setStatusFilter }: JobFilter) => {
  return (
    <div>
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
        className="rounded-lg border text-slate-500 bg-slate-900 border-slate-400  px-4 py-2 outline-none focus:ring-1"
      >
        <option value="All">All Statuses</option>
        <option value="Applied">Applied</option>
        <option value="Rejected">Rejected</option>
        <option value="Hired">Hired</option>
        <option value="Interviewing">Interviewing</option>
      </select>
    </div>
  );
};

export default JobFilter;
