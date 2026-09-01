import type { JobsType } from "../Types/types";

interface JobCardProps {
  job: JobsType;
}
const JobCard = ({ job }: JobCardProps) => {
  const date = new Date(job.appliedDate);

  const formattedDate = !isNaN(date.getTime())
    ? new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(date)
    : "Date not specified";
  return (
    <li>
      <p>{job.companyName}</p>
      <p>{job.position}</p>
      <p>{job.location}</p>
      <p>{job.salary}</p>
      <p>{job.flexibility}</p>
      <p>{job.status}</p>
      <p>
        <strong>Applied On:</strong>{" "}
        {!isNaN(date.getTime()) ? (
          <time dateTime={date.toISOString()}>{formattedDate}</time>
        ) : (
          formattedDate
        )}
      </p>
    </li>
  );
};

export default JobCard;
