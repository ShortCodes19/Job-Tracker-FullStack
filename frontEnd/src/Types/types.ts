interface JobsType {
  id: number;
  companyName: string;
  position: string;
  location: string;
  status: "Applied" | "Rejected" | "Hired" | "Interviewing";
  flexibility: "Remote" | "On-Site";
  salary: number;
  appliedDate: string;
}

type NewJob = Omit<JobsType, "id">;

export type { JobsType, NewJob };
