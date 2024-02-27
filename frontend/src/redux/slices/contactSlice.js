import { createSlice } from "@reduxjs/toolkit";
import { GetUserData } from "./actions/contactActions";

// initial state for contacts menu
const initialState = {
  isContactLoading: false,
  isUserDataLoading: false,
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
      // --------- Profile Builder ---------
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
      });
  },
});

export const { setShowFriendsMenu } = slice.actions;

export default slice.reducer;
