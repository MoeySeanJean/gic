import axios from "axios";

const baseURL = import.meta.env.API_URL || "http://localhost:3000/api/v1";

const axiosClient = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

export default axiosClient;
