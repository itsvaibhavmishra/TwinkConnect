import { createSlice } from "@reduxjs/toolkit";
import { GetUserData, RemoveFriend } from "./actions/contactActions";

// initial state for contacts menu
const initialState = {
  isContactLoading: false,
  isUserDataLoading: false,
  isRemoveFriendLoading: false,
  error: false,

  showFriendsMenu: false,

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
  },
  extraReducers(builder) {
    builder
      // --------- User Data Builder ---------
      .addCase(GetUserData.pending, (state, action) => {
        state.isUserDataLoading = true;
        state.error = false;
      })
      .addCase(GetUserData.fulfilled, (state, action) => {
        state.userData = action.payload.userData;
        state.isUserDataLoading = false;
        state.error = false;
      })
      .addCase(GetUserData.rejected, (state, action) => {
        state.isUserDataLoading = false;
        state.error = true;
      })

      // --------- Remove Frined Builder ---------
      .addCase(RemoveFriend.pending, (state, action) => {
        state.isRemoveFriendLoading = true;
        state.error = false;
      })
      .addCase(RemoveFriend.fulfilled, (state, action) => {
        state.isRemoveFriendLoading = false;
        state.error = false;
      })
      .addCase(RemoveFriend.rejected, (state, action) => {
        state.isRemoveFriendLoading = false;
        state.error = true;
      });
  },
});

export const { setShowFriendsMenu } = slice.actions;

export default slice.reducer;
