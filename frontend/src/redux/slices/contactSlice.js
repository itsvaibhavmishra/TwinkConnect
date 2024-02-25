import { createSlice } from "@reduxjs/toolkit";

// initial state for contacts menu
const initialState = {
  isContactLoading: false,
  error: false,

  showFriendsMenu: false,
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
    // builder
    // --------- Profile Builder ---------
    // .addCase(UpdateProfile.pending, (state, action) => {
    //   state.isLoading = true;
    //   state.error = false;
    // })
    // .addCase(UpdateProfile.fulfilled, (state, action) => {
    //   state.user = { ...state.user, ...action.payload.user };
    //   state.isLoading = false;
    //   state.error = false;
    // })
    // .addCase(UpdateProfile.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.error = true;
    // })
  },
});

export const { setShowFriendsMenu } = slice.actions;

export default slice.reducer;
