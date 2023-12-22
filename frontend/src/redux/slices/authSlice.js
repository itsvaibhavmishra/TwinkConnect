import { createSlice } from "@reduxjs/toolkit";

import {
  AddOtpEmail,
  ForgorPassword,
  LoginUser,
  LogoutUser,
  RegisterUser,
  ResetPassword,
  SendOTP,
  VerifyOTP,
} from "./actions/authActions";

// initial state for logged in status
const initialState = {
  isLoggedIn: false,

  isLoading: false,
  error: false,

  otpEmail: "",
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // updating otp email state
    updateOtpEmail(state, action) {
      state.otpEmail = action.payload.otpEmail;
    },
  },
  extraReducers(builder) {
    builder
      // --------- Login Builder ---------
      .addCase(LoginUser.pending, (state, action) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        // check if user is verified
        if (action.payload.user) {
          state.isLoggedIn = true;
        } else {
          state.isLoggedIn = false;
        }
        state.isLoading = false;
        state.error = false;
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.isLoading = false;
        state.error = true;
      })

      // --------- Logout Builder ---------
      .addCase(LogoutUser.pending, (state, action) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(LogoutUser.fulfilled, (state, action) => {
        state.isLoggedIn = false;
        state.isLoading = false;
        state.error = false;
      })
      .addCase(LogoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
      })

      // --------- Register Builder ---------
      .addCase(RegisterUser.pending, (state, action) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.isLoading = false;
        state.error = true;
      })

      // --------- Verify OTP Builder ---------
      .addCase(VerifyOTP.pending, (state, action) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(VerifyOTP.fulfilled, (state, action) => {
        // check if user is verified
        if (action.payload.user) {
          state.isLoggedIn = true;
        } else {
          state.isLoggedIn = false;
        }
        state.isLoading = false;
        state.error = false;
      })
      .addCase(VerifyOTP.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.isLoading = false;
        state.error = true;
      })

      // --------- Send OTP Builder ---------
      .addCase(SendOTP.pending, (state, action) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(SendOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
      })
      .addCase(SendOTP.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.isLoading = false;
        state.error = true;
      })

      // --------- Add Email Builder ---------
      .addCase(AddOtpEmail.pending, (state, action) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(AddOtpEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
      })
      .addCase(AddOtpEmail.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.isLoading = false;
        state.error = true;
      })

      // --------- Forgot Password Builder ---------
      .addCase(ForgorPassword.pending, (state, action) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(ForgorPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
      })
      .addCase(ForgorPassword.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.isLoading = false;
        state.error = true;
      })

      // --------- Reset Password Builder ---------
      .addCase(ResetPassword.pending, (state, action) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(ResetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
      })
      .addCase(ResetPassword.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.isLoading = false;
        state.error = true;
      });
  },
});

export const { updateOtpEmail } = slice.actions;

export default slice.reducer;
