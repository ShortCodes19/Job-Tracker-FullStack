import type { JobsType } from "@/Types/types";
import {
  FaUserCheck, // Hired
  FaUserTimes, // Rejected
  FaFileAlt, // Applied
  FaComments, // Interviewing
} from "react-icons/fa";

// 1. Define configuration for each status
const STATUS_CONFIG = {
  applied: {
    label: "Applied",
    color: "#3182ce", // Blue
    icon: FaFileAlt,
  },
  interviewing: {
    label: "Interviewing",
    color: "#dd6b20", // Orange
    icon: FaComments,
  },
  hired: {
    label: "Hired",
    color: "#38a169", // Green
    icon: FaUserCheck,
  },
  rejected: {
    label: "Rejected",
    color: "#e53e3e", // Red
    icon: FaUserTimes,
  },
} as const;

type StatusKey = keyof typeof STATUS_CONFIG;

interface JobStatusProps {
  job: JobsType;
}

function JobStatus({ job }: JobStatusProps) {
  // Normalize key to lowercase to avoid casing bugs
  const statusKey = job?.status?.toLowerCase() as StatusKey | undefined;

  // Fallback configuration if status is missing or unexpected
  const config = (statusKey && STATUS_CONFIG[statusKey]) || {
    label: job?.status || "Unknown",
    color: "#4a5568",
    bgColor: "#edf2f7",
    icon: FaFileAlt,
  };

  const StatusIcon = config.icon;

  return (
    <p
      style={{ color: config.color }}
      className={`flex items-center gap-2 font-semibold py-1 px-2  text-sm text-${config.color} `}
    >
      <StatusIcon size={16} />
      <span>{config.label}</span>
    </p>
  );
}

export default JobStatus;
