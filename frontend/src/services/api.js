import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:3000",
  //baseURL: "https://cloudimg-4r97.onrender.com",
  baseURL: "https://cloud-img-1.vercel.app",
  withCredentials: true,
});

export default api;
