import { createSlice } from "@reduxjs/toolkit";
import {
  GetFriendRequests,
  GetUserData,
  RemoveFriend,
  SearchForUsers,
} from "./actions/contactActions";

// initial state for contacts menu
const initialState = {
  isContactLoading: false,
  isUserDataLoading: false,
  isRemoveFriendLoading: false,
  isRequestsLoading: false,
  isSearchLoading: false,

  error: false,

  searchedUsersList: [],
  searchedUsersCount: null,

  showFriendsMenu: false,

  friendRequests: [],

  userData: {},
};

const slice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    // toggle friends menu
    setShowFriendsMenu(state, action) {
      state.showFriendsMenu = !state.showFriendsMenu;
    },

    // update user information
    clearSearchUsers: (state, action) => {
      state.searchedUsersList = [];
      state.searchedUsersCount = null;
    },
  },
  extraReducers(builder) {
    builder
      // --------- User Data Builder ---------
      .addCase(GetUserData.pending, handlePending("isUserDataLoading"))
      .addCase(GetUserData.fulfilled, (state, action) => {
        state.userData = action.payload.userData;
        state.isUserDataLoading = false;
        state.error = false;
      })
      .addCase(GetUserData.rejected, handleRejected("isUserDataLoading"))

      // --------- Remove Frined Builder ---------
      .addCase(RemoveFriend.pending, handlePending("isRemoveFriendLoading"))
      .addCase(RemoveFriend.fulfilled, (state, action) => {
        state.isRemoveFriendLoading = false;
        state.error = false;
      })
      .addCase(RemoveFriend.rejected, handleRejected("isRemoveFriendLoading"))

      // --------- Frined Requests Builder ---------
      .addCase(GetFriendRequests.pending, handlePending("isRequestsLoading"))
      .addCase(GetFriendRequests.fulfilled, (state, action) => {
        state.friendRequests = action.payload.friendRequests;
        state.isRequestsLoading = false;
        state.error = false;
      })
      .addCase(GetFriendRequests.rejected, handleRejected("isRequestsLoading"))

      // --------- Search Users Builder ---------
      .addCase(SearchForUsers.pending, handlePending("isSearchLoading"))
      .addCase(SearchForUsers.fulfilled, (state, action) => {
        if (action.payload.usersFound === 0) {
          state.searchedUsersList = null;
          state.searchedUsersCount = null;
        } else {
          state.searchedUsersList = action.payload.users;
          state.searchedUsersCount = action.payload.usersFound;
        }

        state.isSearchLoading = false;
        state.error = false;
      })
      .addCase(SearchForUsers.rejected, handleRejected("isSearchLoading"));
  },
});

// function for pending and rejected handling
function handlePending(actionName) {
  return (state, action) => {
    state[actionName] = true;
    state.error = false;
  };
}

function handleRejected(actionName) {
  return (state, action) => {
    state[actionName] = false;
    state.error = true;
  };
}

export const { setShowFriendsMenu, clearSearchUsers } = slice.actions;

export default slice.reducer;
