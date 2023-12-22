import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateUser, logout, ShowSnackbar } from "./userSlice";

import axios from "../../utils/axios";

// initial state for logged in status
const initialState = {
  isLoggedIn: false,

  isLoading: false,
  error: false,

  otpEmail: "",
};

// Thunk for Login User
export const loginUser = createAsyncThunk(
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
      // update user data
      dispatch(updateUser(data.user));

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

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // --------- Login Builder ---------
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        // check if user is verified
        if (action.payload.user) {
          state.isLoggedIn = true;
        } else {
          state.isLoggedIn = false;
        }
        state.isLoading = false;
        state.error = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.isLoading = false;
        state.error = true;
      });
  },
});

// Thunk for handling logout, dispatches userSlice actions
export const logoutAndClearData = () => (dispatch) => {
  dispatch(logout()); // Dispatching the logout action from userSlice
};

export default slice.reducer;
