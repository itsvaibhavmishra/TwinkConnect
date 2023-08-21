import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

// initial state for contacts menu
const initialState = {
  sidebar: {
    open: false, // contacts menu visibility
    type: "CONTACT", // default: Contacts menu | other menus: Stared, Shared
  },
  snackbar: {
    open: false,
    message: null,
    severity: null,
  },
  users: [], // list of all unknown users
  friends: [], // list of all friends
  friendRequests: [], // list of all friend requests
};

const slice = createSlice({
  name: "app",
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
      state.snackbar.message = null;
    },

    // toggle sidebar
    toggleSidebar(state, action) {
      state.sidebar.open = !state.sidebar.open;
    },
    updateSidebarType(state, action) {
      state.sidebar.type = action.payload.type;
    },

    // slice for users
    updateUsers(state, action) {
      state.users = action.payload.users;
    },
    updateFriends(state, action) {
      state.friends = action.payload.friends;
    },
    updateFriendRequests(state, action) {
      state.friendRequests = action.payload.request;
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

// sidebar functions
export function ToggleSidebar() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.toggleSidebar());
  };
}

export function UpdateSidebarType(type) {
  return async (dispatch, getState) => {
    dispatch(
      slice.actions.updateSidebarType({
        type,
      })
    );
  };
}

// users list functions
export function FetchUsers() {
  return async (dispatch, getState) => {
    await axios
      .get("/user/get-users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((response) => {
        console.log(response);
        // adding found users to the list
        dispatch(slice.actions.updateUsers({ users: response.data.data }));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function FetchFriends() {
  return async (dispatch, getState) => {
    await axios
      .get("/user/get-friends", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((response) => {
        console.log(response);
        dispatch(slice.actions.updateFriends({ friends: response.data.data }));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function FetchFriendRequest() {
  return async (dispatch, getState) => {
    await axios
      .get("/user/get-requests", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((response) => {
        console.log(response);
        // adding found friend requests to the list
        dispatch(
          slice.actions.updateFriendRequests({ request: response.data.data })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export default slice.reducer;
