import axios from "axios";

const API_AUTH_URL = import.meta.env.VITE_AUTH_URL;

export const registerUser = async (
  name: string,
  email: string,
  password: string,
) => {
  const response = await axios.post(`${API_AUTH_URL}/register`, {
    name,
    email,
    password,
  });
  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(
    `${API_AUTH_URL}/login`,
    { email, password },
    { withCredentials: true },
  );

  return response.data;
};

export const logoutUser = async () => {
  const response = await axios.post(
    `${API_AUTH_URL}/logout`,
    {},
    { withCredentials: true },
  );

  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axios.get(`${API_AUTH_URL}/me`, {
    withCredentials: true,
  });

  return response.data;
};
