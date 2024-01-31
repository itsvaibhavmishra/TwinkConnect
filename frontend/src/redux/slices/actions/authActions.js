import { createAsyncThunk } from "@reduxjs/toolkit";

import { ShowSnackbar, logout, updateUser } from "../userSlice";

import axios from "../../../utils/axios";
import { updateOtpEmail } from "../authSlice";
import { clearChat } from "../chatSlice";
import { socket } from "../../../utils/socket";

// ------------- Login Thunk -------------
export const LoginUser = createAsyncThunk(
  "auth/login",
  async (formValues, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.post("/auth/login", {
        ...formValues,
      });

      // show snackbar
      dispatch(
        ShowSnackbar({
          severity: data.status,
          message: data.message,
        })
      );

      // if user is not verified
      if (!data.user) {
        dispatch(updateOtpEmail({ otpEmail: formValues.email }));
        setTimeout(() => {
          window.location.href = "/auth/verify";
        }, 1000);
      } else {
        // update user data
        dispatch(updateUser(data.user));
      }

      return data;
    } catch (error) {
      dispatch(
        ShowSnackbar({
          severity: error.error.status,
          message: error.error.message,
        })
      );
      return rejectWithValue(error.error);
    }
  }
);

// ------------- Logout Thunk -------------
export const LogoutUser = createAsyncThunk(
  "auth/logout",
  async (arg, { rejectWithValue, dispatch }) => {
    return new Promise(async (resolve) => {
      try {
        const { data } = await axios.post("/auth/logout");

        dispatch(clearChat());
        dispatch(logout());
        socket.disconnect();

        // show snackbar
        dispatch(
          ShowSnackbar({
            severity: data.status,
            message: data.message,
          })
        );

        // Resolve the promise to indicate that the operation is complete
        resolve();
      } catch (error) {
        dispatch(
          ShowSnackbar({
            severity: error.error.status,
            message: error.error.message,
          })
        );

        return rejectWithValue(error);
      }
    });
  }
);

// ------------- Register Thunk -------------
export const RegisterUser = createAsyncThunk(
  "auth/register",
  async (formValues, { rejectWithValue, dispatch, getState }) => {
    try {
      const { data } = await axios.post("/auth/register", {
        ...formValues,
      });

      // update otp email
      dispatch(updateOtpEmail({ otpEmail: formValues.email }));

      // show snackbar
      dispatch(
        ShowSnackbar({
          severity: data.status,
          message: data.message,
        })
      );

      if (!getState().auth.error) {
        setTimeout(() => {
          window.location.href = "/auth/verify";
        }, 1000);
      }

      return data;
    } catch (error) {
      dispatch(
        ShowSnackbar({
          severity: error.error.status,
          message: error.error.message,
        })
      );
      return rejectWithValue(error.error);
    }
  }
);

// ------------- Verify OTP Thunk -------------
export const VerifyOTP = createAsyncThunk(
  "auth/verify-otp",
  async (formValues, { rejectWithValue, dispatch, getState }) => {
    try {
      const { data } = await axios.post("/auth/verify-otp", {
        ...formValues,
      });

      // update user data
      dispatch(updateUser(data.user));

      // show snackbar
      dispatch(
        ShowSnackbar({
          severity: data.status,
          message: data.message,
        })
      );

      return data;
    } catch (error) {
      dispatch(
        ShowSnackbar({
          severity: error.error.status,
          message: error.error.message,
        })
      );
      return rejectWithValue(error.error);
    }
  }
);

// ------------- Send OTP Thunk -------------
export const SendOTP = createAsyncThunk(
  "auth/send-otp",
  async (formValues, { rejectWithValue, dispatch, getState }) => {
    // update otp email
    dispatch(updateOtpEmail({ otpEmail: formValues.email }));

    try {
      const { data } = await axios.post("/auth/send-otp", {
        ...formValues,
      });

      // show snackbar
      dispatch(
        ShowSnackbar({
          severity: data.status,
          message: data.message,
        })
      );

      return data;
    } catch (error) {
      dispatch(
        ShowSnackbar({
          severity: error.error.status,
          message: error.error.message,
        })
      );
      return rejectWithValue(error.error);
    }
  }
);

// ------------- Add Email Thunk -------------
export const AddOtpEmail = createAsyncThunk(
  "auth/addOtpEmail",
  async (formValues, { rejectWithValue, dispatch, getState }) => {
    try {
      // update otp email
      dispatch(updateOtpEmail({ otpEmail: formValues.email }));

      // show snackbar
      dispatch(
        ShowSnackbar({
          severity: "success",
          message: "Email Added Successfully",
        })
      );
    } catch (error) {
      dispatch(
        ShowSnackbar({
          severity: error,
          message: "Could not add email",
        })
      );
      return rejectWithValue(error);
    }
  }
);

// ------------- Forgot Password Thunk -------------
export const ForgorPassword = createAsyncThunk(
  "auth/forgot-password",
  async (formValues, { rejectWithValue, dispatch, getState }) => {
    try {
      const { data } = await axios.post("/auth/forgot-password", {
        ...formValues,
      });

      // show snackbar
      dispatch(
        ShowSnackbar({
          severity: data.status,
          message: data.message,
        })
      );

      return data;
    } catch (error) {
      dispatch(
        ShowSnackbar({
          severity: error.error.status,
          message: error.error.message,
        })
      );
      return rejectWithValue(error.error);
    }
  }
);

// ------------- Reset Password Thunk -------------
export const ResetPassword = createAsyncThunk(
  "auth/reset-password",
  async (formValues, { rejectWithValue, dispatch, getState }) => {
    try {
      const { data } = await axios.post("/auth/reset-password", {
        ...formValues,
      });

      // show snackbar
      dispatch(
        ShowSnackbar({
          severity: data.status,
          message: data.message,
        })
      );

      return data;
    } catch (error) {
      dispatch(
        ShowSnackbar({
          severity: error.error.status,
          message: error.error.message,
        })
      );
      return rejectWithValue(error.error);
    }
  }
);

// ------------- Refresh Token Thunk -------------
export const RefreshToken = createAsyncThunk(
  "auth/refresh-token",
  async (arg, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.post("/auth/refresh-token/");

      // if user is not verified
      if (!data.user) {
        alert("Token expired, Logging you out...");
        dispatch(LogoutUser());
      } else {
        // update user data
        dispatch(updateUser(data.user));
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.error);
    }
  }
);
