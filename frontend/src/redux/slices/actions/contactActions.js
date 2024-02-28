import { createAsyncThunk } from "@reduxjs/toolkit";

import { ShowSnackbar } from "../userSlice";

import axios from "../../../utils/axios";

// ------------- Get Conversation Thunk -------------
export const GetUserData = createAsyncThunk(
  "user/getUserData",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.get(`/user/getUserData/?userId=${id}`);

      return data;
    } catch (error) {
      // show snackbar
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
