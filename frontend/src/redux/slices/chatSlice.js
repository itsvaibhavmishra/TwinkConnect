import { createSlice } from "@reduxjs/toolkit";
import { GetConversations } from "./actions/chatActions";

// initial state for contacts menu
const initialState = {
  isLoading: false,
  error: false,

  conversations: [],
  activeConversation: {},
  notifications: [],
};

const slice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    // active conversation
    setActiveConversation: (state, action) => {
      state.activeConversation = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      // --------- Get Conversations Builder ---------
      .addCase(GetConversations.pending, (state, action) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(GetConversations.fulfilled, (state, action) => {
        state.conversations = action.payload.conversations;
        state.isLoading = false;
        state.error = false;
      })
      .addCase(GetConversations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export default slice.reducer;
