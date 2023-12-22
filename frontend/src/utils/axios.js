import axios from "axios";

// Set the base URL for all axios requests
axios.defaults.baseURL =
  process.env.REACT_APP_API_ORIGIN || "http://localhost:8000/api";

// axios error handling
axios.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Axios - Something went wrong"
    )
);

export default axios;
