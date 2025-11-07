import axios from "axios";

const baseURL = "/api/v1";

const axiosClient = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

export default axiosClient;
