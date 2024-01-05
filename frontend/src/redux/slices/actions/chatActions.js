import { createAsyncThunk } from "@reduxjs/toolkit";

import { ShowSnackbar } from "../userSlice";

import axios from "../../../utils/axios";

// ------------- Get Conversation Thunk -------------
export const GetConversations = createAsyncThunk(
  "chat/get-conversations",
  async (arg, { rejectWithValue, dispatch }) => {
    try {
      console.log("check");
      const { data } = await axios.get("/conversation/get-conversations/");

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
