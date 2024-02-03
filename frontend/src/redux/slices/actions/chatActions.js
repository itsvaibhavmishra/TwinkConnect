import { createAsyncThunk } from "@reduxjs/toolkit";

import { SetLoading, ShowSnackbar } from "../userSlice";

import axios from "../../../utils/axios";
import { socket } from "../../../utils/socket";
import { closeActiveConversation } from "../chatSlice";

// ------------- Get Conversation Thunk -------------
export const GetConversations = createAsyncThunk(
  "conversation/get-conversations",
  async (arg, { rejectWithValue, dispatch }) => {
    try {
      // set user loading to true
      dispatch(SetLoading(true));

      const { data } = await axios.get("/conversation/get-conversations/");

      // set user loading to false
      dispatch(SetLoading(false));
      return data;
    } catch (error) {
      // set user loading to false
      dispatch(SetLoading(false));

      // show snackbar
      dispatch(
        ShowSnackbar({
          severity: error.error.status,
          message: error.error.message,
        })
      );
      return rejectWithValue(error.error);
    }
  }
);

// ------------- Create or Open Conversation -------------
export const CreateOpenConversation = createAsyncThunk(
  "conversation/create-open-conversation",
  async (value, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.post(
        "/conversation/create-open-conversation",
        {
          receiver_id: value,
        }
      );

      dispatch(closeActiveConversation());

      // emit join conversation to socket
      socket.emit("join_conversation", data.conversation._id);

      return data;
    } catch (error) {
      // show snackbar
      dispatch(
        ShowSnackbar({
          severity: error.error.status,
          message: error.error.message,
        })
      );
      return rejectWithValue(error.error);
    }
  }
);

// ------------- Get Messages -------------
export const GetMessages = createAsyncThunk(
  "message/get-messages",
  async (convoId, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.get(`/message/get-messages/${convoId}`);

      return data;
    } catch (error) {
      // show snackbar
      dispatch(
        ShowSnackbar({
          severity: error.error.status,
          message: error.error.message,
        })
      );
      return rejectWithValue(error.error);
    }
  }
);

// ------------- Get Messages -------------
export const SendMessage = createAsyncThunk(
  "message/send-message",
  async (messageData, { rejectWithValue, dispatch, getState }) => {
    try {
      const { data } = await axios.post("/message/send-message", messageData);

      // Approach check
      if (!getState().chat.isOptimistic) {
        // emit send message to socket
        socket.emit("send_message", data.message);
      }
      return data;
    } catch (error) {
      // show snackbar
      dispatch(
        ShowSnackbar({
          severity: error.error.status,
          message: error.error.message,
        })
      );
      return rejectWithValue(error.error);
    }
  }
);
