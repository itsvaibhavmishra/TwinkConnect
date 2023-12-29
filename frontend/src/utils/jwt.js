import { jwtDecode } from "jwt-decode";
import { PATH_AUTH } from "../routes/paths";
import axios from "./axios";

const isValidToken = (accessToken) => {
  if (!accessToken) {
    localStorage.removeItem("redux-root");
    return false;
  }
  const decoded = jwtDecode(accessToken);

  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const handleTokenExpired = (exp) => {
  let expiredTimer;

  const currentTime = Date.now();

  const timeLeft = exp * 1000 - currentTime;

  clearTimeout(expiredTimer);

  expiredTimer = setTimeout(() => {
    localStorage.removeItem("redux-root");
    delete axios.defaults.headers.common.Authorization;

    alert("Token expired");

    window.location.href = PATH_AUTH.login;
  }, timeLeft);
};

const setSession = (accessToken) => {
  if (accessToken) {
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    // function for handling token expiry
    const { exp } = jwtDecode(accessToken);
    handleTokenExpired(exp);
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export { isValidToken, setSession };
