import axios from "axios";

// Create an instance of axios with the base URL set to the backend server
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // Change this to match your backend URL
});

export default axiosInstance;