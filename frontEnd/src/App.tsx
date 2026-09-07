import { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import type { JobsType, NewJob } from "./Types/types";
import JobForm from "./components/JobForm";
import JobPages from "./pages/JobPages";
import WelcomePage from "./pages/WelcomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { getCurrentUser, logoutUser } from "./services/authApi";
import {
  getJobs,
  createJob,
  deleteJobAPI,
  editJobApi,
} from "./services/jobApi";

const App = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const [jobs, setJobs] = useState<JobsType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (location.pathname !== "/login" && location.pathname !== "/register") {
      return;
    }

    let active = true;
    const checkSession = async () => {
      try {
        await getCurrentUser();
        if (active) {
          navigation("/jobs");
        }
      } catch {
        // An unauthenticated visitor may use the login and register pages.
      }
    };

    checkSession();
    return () => {
      active = false;
    };
  }, [location.pathname, navigation]);

  useEffect(() => {
    if (location.pathname !== "/jobs") {
      return;
    }

    setLoading(true);
    const loadJobs = async () => {
      try {
        const data = await getJobs();
        setJobs(data);
      } catch (error) {
        setError("Failed to load jobs!");
        navigation("/login");
      } finally {
        setLoading(false);
      }
    };
    loadJobs();
  }, [location.pathname, navigation]);

  const [editingJob, setEditingJob] = useState<JobsType | null>(null);

  // add job function
  const addJob = async (newJob: NewJob) => {
    try {
      const createdJob = await createJob(newJob);
      console.log("created: ", createdJob);
      setJobs((prev) => [...prev, createdJob]);
    } catch (error) {
      console.log(error);
    }
  };

  // delete jobs function
  const deleteJob = async (id: string) => {
    await deleteJobAPI(id);
    setJobs((prev) => prev.filter((job) => job._id !== id));
  };

  const editJob = (id: string) => {
    const job = jobs.find((job) => job._id === id);

    if (!job) return;
    setEditingJob(job);
    navigation("/jobsForm");
  };

  // update jobs
  const updateJob = async (id: string, updatedJob: NewJob): Promise<void> => {
    const updated = await editJobApi(id, updatedJob);
    setJobs((prev) => prev.map((job) => (job._id === id ? updated : job)));
    setEditingJob(null);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
    } finally {
      setJobs([]);
      setEditingJob(null);
      navigation("/login");
    }
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<WelcomePage />} />

        <Route
          path="/jobs"
          element={
            <JobPages
              jobs={jobs}
              onDelete={deleteJob}
              onEdit={editJob}
              onLogout={handleLogout}
              loading={loading}
              error={error}
            />
          }
        />

        <Route
          path="/jobsForm"
          element={
            <JobForm
              onAdd={addJob}
              editingJob={editingJob}
              updateJob={updateJob}
            />
          }
        />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
