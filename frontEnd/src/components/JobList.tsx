import type { JobsType } from "../Types/types";
import JobCard from "./JobCard";

interface JobListProps {
  jobs: JobsType[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}
const JobList = ({ jobs, onDelete, onEdit }: JobListProps) => {
  return (
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 mt-8">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </ul>
  );
};

export default JobList;
