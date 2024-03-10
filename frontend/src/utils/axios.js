import axios from "axios";

// Set the base URL for all axios requests
axios.defaults.baseURL =
  process.env.REACT_APP_API_ORIGIN || "http://localhost:8000/api";

// Set credentials to true
axios.defaults.withCredentials = true;

export default axios;
