import { createSlice } from "@reduxjs/toolkit";

import { UpdateProfile } from "./actions/userActions";

// initial state for contacts menu
const initialState = {
  isLoading: false,
  error: false,

  snackbar: {
    open: false,
    message: null,
    severity: null,
  },

  user: {
    id: "",
    firstName: "",
    lastName: "",
    avatar: "",
    email: "",
    activityStatus: "",
    token: "",
  },
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // toggle snackbar
    openSnackbar(state, action) {
      state.snackbar.open = true;
      state.snackbar.severity = action.payload.severity;
      state.snackbar.message = action.payload.message;
    },
    closeSnackbar(state, action) {
      state.snackbar.open = false;
    },

    // update user information
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },

    // logout reducer | being handled from auth
    logout: (state) => {
      state.isLoading = false;
      state.error = false;
      state.user = {
        id: "",
        firstName: "",
        lastName: "",
        avatar: "",
        email: "",
        activityStatus: "",
        token: "",
      };
    },
  },
  extraReducers(builder) {
    builder
      // --------- Profile Builder ---------
      .addCase(UpdateProfile.pending, (state, action) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(UpdateProfile.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload.user };
        state.isLoading = false;
        state.error = false;
      })
      .addCase(UpdateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

// snackbar functions
export function ShowSnackbar({ message, severity }) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.openSnackbar({ message, severity }));
  };
}

// snackbar functions
export function HideSnackbar() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.closeSnackbar());
  };
}

export const { updateUser, logout, user } = slice.actions;

export default slice.reducer;
