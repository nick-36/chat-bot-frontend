import axios from "axios";

const BASE_URL =
  process.env.REACT_APP_PROD_SERVER_URL || process.env.REACT_APP_DEV_SERVER_URL;

export const axiosDefault = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
