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
    <li className="group flex flex-col gap-2 bg-sky-200 p-4 rounded-lg shadow-sm hover">
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
          <GrStatusCriticalSmall className="text-slate-500" />
          <JobStatus job={job} />
        </div>

        <p className="mt-4">
          <strong className="text-xs text-slate-700">Applied On:</strong>
          <br />
          {!isNaN(date.getTime()) ? (
            <time
              className="text-sm text-slate-800"
              dateTime={date.toISOString()}
            >
              {formattedDate}
            </time>
          ) : (
            formattedDate
          )}
        </p>
      </div>
      <div className="flex justify-center items-center gap-3">
        <button
          className="text-sm cursor-pointer text-slate-800 opacity-0 transition group-hover:opacity-100 hover:text-gray-700 font-semibold"
          onClick={() => onEdit(job.id)}
        >
          Edit
        </button>
        <button
          className="text-sm cursor-pointer text-slate-800 opacity-0 transition group-hover:opacity-100 hover:text-rose-500 font-semibold"
          onClick={() => onDelete(job.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default JobCard;
