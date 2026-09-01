import type { JobsType } from "../Types/types";

interface JobCardProps {
  job: JobsType;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}
const JobCard = ({ job, onDelete, onEdit }: JobCardProps) => {
  const date = new Date(job.appliedDate);

  const formattedDate = !isNaN(date.getTime())
    ? new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(date)
    : "Date not specified";
  return (
    <li className="flex flex-col gap-2 bg-emerald-200">
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
      <button onClick={() => onDelete(job.id)}>Delete</button>
      <button onClick={() => onEdit(job.id)}>Edit</button>
    </li>
  );
};

export default JobCard;
