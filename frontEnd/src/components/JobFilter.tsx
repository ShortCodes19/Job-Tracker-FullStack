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
      >
        <option value="All">All</option>
        <option value="Applied">Applied</option>
        <option value="Rejected">Rejected</option>
        <option value="Interviewing">Interviewing</option>
        <option value="Hired">Hired</option>
      </select>
    </div>
  );
};

export default JobFilter;
