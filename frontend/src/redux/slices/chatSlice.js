import { createSlice } from "@reduxjs/toolkit";
import {
  CreateOpenConversation,
  GetConversations,
} from "./actions/chatActions";

// initial state for contacts menu
const initialState = {
  isLoading: false,
  error: false,

  conversations: [],
  activeConversation: null,
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

    // clear conversation
    clearConversation: (state, action) => {
      state.conversations = [];
      state.activeConversation = null;
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
      })
      // --------- Create Open Conversation Builder ---------
      .addCase(CreateOpenConversation.pending, (state, action) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(CreateOpenConversation.fulfilled, (state, action) => {
        state.activeConversation = action.payload.conversation;
        state.isLoading = false;
        state.error = false;
      })
      .addCase(CreateOpenConversation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

// snackbar functions
export function clearChat() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.clearConversation());
  };
}

export default slice.reducer;
