import type { JobsType } from "../Types/types";
import { FaUser, FaBuilding, FaMoneyBill } from "react-icons/fa";
import JobStatus from "./JobStatus";
import { FaHouse, FaLocationPin } from "react-icons/fa6";
import { GrStatusCriticalSmall } from "react-icons/gr";

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
    // In JobCard.tsx, update the <li> class:
    <li className="flex flex-col gap-2 bg-emerald-200 p-4 rounded-lg shadow-sm">
      <div className="flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <FaBuilding className="text-slate-500" />
          <p className="capitalize font-semibold text-slate-800 text-lg tracking-wide">
            {job.companyName}
          </p>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <FaUser className="text-slate-500" />
          <p className="capitalize text-sm text-slate-900">{job.position}</p>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <FaLocationPin className="text-slate-500" />
          <p className="capitalize text-sm text-slate-900">{job.location}</p>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <FaMoneyBill className="text-slate-500" />
          <p className="capitalize text-sm text-slate-900">$ {job.salary}</p>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <FaHouse className="text-slate-500" />
          <p className="capitalize text-sm text-slate-900">{job.flexibility}</p>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <GrStatusCriticalSmall />
          <JobStatus job={job} />
        </div>
        <p>
          <strong>Applied On:</strong>{" "}
          {!isNaN(date.getTime()) ? (
            <time dateTime={date.toISOString()}>{formattedDate}</time>
          ) : (
            formattedDate
          )}
        </p>
      </div>
      <button onClick={() => onDelete(job.id)}>Delete</button>
      <button onClick={() => onEdit(job.id)}>Edit</button>
    </li>
  );
};

export default JobCard;
