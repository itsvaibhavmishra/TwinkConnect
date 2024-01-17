import { createSlice } from "@reduxjs/toolkit";

import { SearchFriends, UpdateProfile } from "./actions/userActions";

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

  searchResults: [],
  searchCount: null,
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

    // update user information
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    // update user information
    clearSearch: (state, action) => {
      state.searchResults = [];
      state.searchCount = null;
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
      })

      // --------- Search Friends Builder ---------
      .addCase(SearchFriends.pending, (state, action) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(SearchFriends.fulfilled, (state, action) => {
        if (action.payload.usersFound === 0) {
          state.searchResults = null;
          state.searchCount = null;
        } else {
          state.searchResults = action.payload.friends;
          state.searchCount = action.payload.usersFound;
        }
        state.isLoading = false;
        state.error = false;
      })
      .addCase(SearchFriends.rejected, (state, action) => {
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

// set loading functions
export function SetLoading(value) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.setLoading(value));
  };
}

// clear search functions
export function ClearSearch() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.clearSearch());
  };
}

export const { updateUser, logout, user } = slice.actions;

export default slice.reducer;
