import { createAsyncThunk } from "@reduxjs/toolkit";

import { ShowSnackbar, removeFriend } from "../userSlice";

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

// ------------- Get Conversation Thunk -------------
export const RemoveFriend = createAsyncThunk(
  "friends/remove-friend",
  async (friend_id, { rejectWithValue, dispatch }) => {
    console.log(friend_id);
    try {
      const { data } = await axios.post("/friends/remove-friend", {
        friend_id,
      });

      // remove friend from friends list
      dispatch(removeFriend(data));

      // show snackbar
      dispatch(
        ShowSnackbar({
          severity: data.status,
          message: data.message,
        })
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
