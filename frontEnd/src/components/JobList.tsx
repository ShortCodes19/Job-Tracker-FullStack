import type { JobsType } from "../Types/types";
import JobCard from "./JobCard";

interface JobListProps {
  jobs: JobsType[];
}
const JobList = ({ jobs }: JobListProps) => {
  return (
    <ul>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </ul>
  );
};

export default JobList;
