import { createSlice } from "@reduxjs/toolkit";
import {
  CreateOpenConversation,
  GetConversations,
  GetMessages,
  SendMessage,
} from "./actions/chatActions";

// initial state for contacts menu
const initialState = {
  isLoading: false,
  sendMsgLoading: false,
  error: false,

  conversations: [],
  activeConversation: null,
  notifications: [],

  messages: [],
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
      })

      // --------- Get Messages Builder ---------
      .addCase(GetMessages.pending, (state, action) => {
        state.error = false;
      })
      .addCase(GetMessages.fulfilled, (state, action) => {
        state.messages = action.payload.messages;
        state.isLoading = false;
        state.error = false;
      })
      .addCase(GetMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
      })

      // --------- Send Message Builder ---------
      .addCase(SendMessage.pending, (state, action) => {
        state.error = false;
        state.sendMsgLoading = true;
      })
      .addCase(SendMessage.fulfilled, (state, action) => {
        // updating messages list
        state.messages = [...state.messages, action.payload.message];

        // updating conversations
        const conversation = {
          ...action.payload.message.conversation,
        };
        let newConvos = [...state.conversations].filter(
          (e) => e._id !== conversation._id
        );
        newConvos.unshift(conversation);

        state.conversations = newConvos;

        state.sendMsgLoading = false;
        state.isLoading = false;
        state.error = false;
      })
      .addCase(SendMessage.rejected, (state, action) => {
        state.sendMsgLoading = false;
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

export const { setActiveConversation } = slice.actions;

export default slice.reducer;
