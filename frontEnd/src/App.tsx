import { useState } from "react";

import type { JobsType, NewJob } from "./Types/types";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";

const App = () => {
  const [jobs, setJobs] = useState<JobsType[]>([]);

  const addJob = (job: NewJob) => {
    setJobs((prev) => [...prev, { ...job, id: Date.now() }]);
  };
  console.log("added jobs", jobs);

  return (
    <div>
      <JobForm onAdd={addJob} />
      <JobList jobs={jobs} />
    </div>
  );
};

export default App;
