import type { JobsType } from "../Types/types";
import JobCard from "./JobCard";

interface JobListProps {
  jobs: JobsType[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}
const JobList = ({ jobs, onDelete, onEdit }: JobListProps) => {
  return (
    <ul>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </ul>
  );
};

export default JobList;
