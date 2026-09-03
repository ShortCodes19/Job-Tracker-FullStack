import type { NewJob } from "@/Types/types";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getJobs = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

export const createJob = async (newJob: NewJob) => {
  const response = await axios.post(API_URL, newJob);

  return response.data;
};

export const deleteJobAPI = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);

  return response.data;
};

export const editJobApi = async (id: string, updatedJob: NewJob) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedJob);

  return response.data;
};
