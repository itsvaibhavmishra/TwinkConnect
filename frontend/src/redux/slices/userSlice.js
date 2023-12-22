import { createSlice } from "@reduxjs/toolkit";
// import axios from "../../utils/axios";

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
      state.user = action.payload;
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
});

// snackbar functions
export function ShowSnackbar({ message, severity }) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.openSnackbar({ message, severity }));

    setTimeout(() => {
      dispatch(slice.actions.closeSnackbar());
    }, 5000);
  };
}

// snackbar functions
export function HideSnackbar() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.closeSnackbar());
  };
}

export const { updateUser, logout } = slice.actions;

export default slice.reducer;
