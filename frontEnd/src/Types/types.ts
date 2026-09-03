type JobStatus = "Applied" | "Rejected" | "Hired" | "Interviewing";

type StatusFilter = "All" | JobStatus;

interface JobsType {
  _id: string;
  companyName: string;
  position: string;
  location: string;
  status: JobStatus;
  flexibility: "Remote" | "On-Site";
  salary: number;
  appliedDate: string;
}

type NewJob = Omit<JobsType, "id">;

export type { JobsType, NewJob, JobStatus, StatusFilter };
