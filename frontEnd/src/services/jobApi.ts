import type { NewJob } from "@/Types/types";
import axios from "axios";

const API_JOB_URL = import.meta.env.VITE_JOB_URL;

export const getJobs = async () => {
  const response = await axios.get(API_JOB_URL, {
    withCredentials: true,
  });

  return response.data;
};

export const createJob = async (newJob: NewJob) => {
  const response = await axios.post(API_JOB_URL, newJob, {
    withCredentials: true,
  });

  return response.data;
};

export const deleteJobAPI = async (id: string) => {
  const response = await axios.delete(`${API_JOB_URL}/${id}`, {
    withCredentials: true,
  });

  return response.data;
};

export const editJobApi = async (id: string, updatedJob: NewJob) => {
  const response = await axios.put(`${API_JOB_URL}/${id}`, updatedJob, {
    withCredentials: true,
  });

  return response.data;
};
