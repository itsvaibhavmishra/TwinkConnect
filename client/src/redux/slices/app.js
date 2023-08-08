import { createSlice } from "@reduxjs/toolkit";

// initial state for contacts menu
const initialState = {
  sidebar: {
    open: false, // contacts menu visibility
    type: "CONTACT", // default: Contacts menu | other menus: Stared, Shared
  },
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // toggle sidebar
    toggleSidebar(state, action) {
      state.sidebar.open = !state.sidebar.open;
    },
    updateSidebarType(state, action) {
      state.sidebar.type = action.payload.type;
    },
  },
});

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

export default slice.reducer;
