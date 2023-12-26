import { createAsyncThunk } from "@reduxjs/toolkit";

import { ShowSnackbar } from "../userSlice";

import axios from "../../../utils/axios";
// Helper function to convert Blob URL to File
const blobUrlToFile = async (blobUrl, fileName) => {
  const response = await fetch(blobUrl);
  const blob = await response.blob();

  return new File([blob], fileName, { type: blob.type });
};

// ------------- Login Thunk -------------
export const UpdateProfile = createAsyncThunk(
  "auth/update-profile",
  async (formValues, { rejectWithValue, dispatch, getState }) => {
    try {
      // Check if avatar is a Blob URL and convert it to File
      if (formValues.avatar && formValues.avatar.startsWith("blob:")) {
        const file = await blobUrlToFile(
          formValues.avatar,
          `${formValues.firstName}Avatar${Date.now()}`
        );

        formValues.avatar = file;
      }
      const token = getState().user.user.token;

      const { data } = await axios.post(
        "/user/update-profile",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      // show snackbar
      dispatch(
        ShowSnackbar({
          severity: data.status,
          message: data.message,
        })
      );

      //   // if user is not verified
      //   if (!data.user) {
      //     dispatch(updateOtpEmail({ otpEmail: formValues.email }));
      //     setTimeout(() => {
      //       window.location.href = "/auth/verify";
      //     }, 1000);
      //   } else {
      //     // update user data
      //     dispatch(updateUser(data.user));
      //   }

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
