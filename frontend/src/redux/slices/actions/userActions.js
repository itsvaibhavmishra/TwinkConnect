import { createAsyncThunk } from "@reduxjs/toolkit";

import { ShowSnackbar } from "../userSlice";

import axios from "../../../utils/axios";
// Helper function to convert Blob URL to File
const blobUrlToFile = async (blobUrl, fileName) => {
  const response = await fetch(blobUrl);
  const blob = await response.blob();

  return new File([blob], fileName, { type: blob.type });
};

// ------------- Update Profile Thunk -------------
export const UpdateProfile = createAsyncThunk(
  "user/update-profile",
  async (formValues, { rejectWithValue, dispatch }) => {
    try {
      // Check if avatar is a Blob URL and convert it to File
      if (formValues.avatar && formValues.avatar.startsWith("blob:")) {
        const file = await blobUrlToFile(
          formValues.avatar,
          `${formValues.firstName}Avatar${Date.now()}`
        );

        formValues.avatar = file;
      }

      const formData = new FormData();
      formData.append("avatar", formValues.avatar);
      formData.append("userId", formValues.userId);
      formData.append("firstName", formValues.firstName);
      formData.append("lastName", formValues.lastName);
      formData.append("activityStatus", formValues.activityStatus);

      const { data } = await axios.post("/user/update-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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

// ------------- Search Friends Thunk -------------
export const SearchFriends = createAsyncThunk(
  "friends/search",
  async (searchData, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.get(
        `/friends/search/?search=${searchData.keyword}&page=${
          searchData.page || 0
        }`
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

// ------------- Get Friends Thunk -------------
export const GetFriends = createAsyncThunk(
  "friends/get-friends",
  async (arg, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.get("/friends/get-friends");

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

// ------------- Get Online Friends Thunk -------------
export const GetOnlineFriends = createAsyncThunk(
  "friends/online-friends",
  async (arg, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.get("/friends/online-friends");

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
