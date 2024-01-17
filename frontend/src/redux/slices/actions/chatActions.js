import { createAsyncThunk } from "@reduxjs/toolkit";

import { SetLoading, ShowSnackbar } from "../userSlice";

import axios from "../../../utils/axios";

// ------------- Get Conversation Thunk -------------
export const GetConversations = createAsyncThunk(
  "conversation/get-conversations",
  async (arg, { rejectWithValue, dispatch }) => {
    try {
      // set user loading to true
      dispatch(SetLoading(true));

      const { data } = await axios.get("/conversation/get-conversations/");

      // set user loading to false
      dispatch(SetLoading(false));
      return data;
    } catch (error) {
      // set user loading to false
      dispatch(SetLoading(false));

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

// ------------- Create or Open Conversation -------------
export const CreateOpenConversation = createAsyncThunk(
  "conversation/create-open-conversation",
  async (value, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.post(
        "/conversation/create-open-conversation",
        {
          receiver_id: value,
        }
      );

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
