import { jwtDecode } from "jwt-decode";
import axios from "./axios";
import { LogoutUser, RefreshToken } from "../redux/slices/actions/authActions";

let expiredTimer;
let isLogoutDispatched = false; // Flag to track whether LogoutUser has been dispatched

// clear session if token is expired
const clearSession = () => {
  delete axios.defaults.headers.common.Authorization;
};

const isValidToken = (accessToken, dispatch) => {
  if (!accessToken) {
    clearSession();
    return false;
  }

  try {
    const decoded = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;

    if (!(decoded.exp > currentTime)) {
      clearSession();
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error decoding JWT:", error);
    clearSession();
    return false;
  }
};

const handleSessionExpiration = (exp, dispatch) => {
  const currentTime = Date.now();
  const timeLeft = exp * 1000 - currentTime; // - 86386000;

  // console.log(timeLeft);

  clearTimeout(expiredTimer);

  expiredTimer = setTimeout(() => {
    // Check if token is still valid before attempting to refresh
    if (isValidToken(axios.defaults.headers.common.Authorization, dispatch)) {
      dispatch(RefreshToken())
        .unwrap()
        .then(() => {
          // Token refreshed successfully
          const { exp: newExp } = jwtDecode(
            axios.defaults.headers.common.Authorization
          );
          handleSessionExpiration(newExp, dispatch);
        })
        .catch((error) => {
          // Refresh token failed, log out user
          clearSession();
        });
    } else {
      // Token is already expired, log out user
      clearSession();
      if (!isLogoutDispatched) {
        alert("Token expired, Logging you out...");
        dispatch(LogoutUser());
        isLogoutDispatched = true; // Set the flag to true after dispatching
      }
    }
  }, timeLeft);
};

const setSession = (accessToken, dispatch) => {
  isLogoutDispatched = false;

  if (accessToken) {
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    // Function for handling token expiry
    try {
      const { exp } = jwtDecode(accessToken);
      handleSessionExpiration(exp, dispatch);
    } catch (error) {
      alert("Invalid Token, Please login again");
      dispatch(LogoutUser());
      isLogoutDispatched = true;
    }
  } else {
    clearSession();
    if (!isLogoutDispatched) {
      dispatch(LogoutUser());
      isLogoutDispatched = true; // Set the flag to true after dispatching
    }
  }
};

export { isValidToken, setSession };
