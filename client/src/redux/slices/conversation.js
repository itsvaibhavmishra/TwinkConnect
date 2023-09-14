import { createSlice } from "@reduxjs/toolkit";

const user_id = window.localStorage.getItem("user_id");

const initialState = {
  direct_chat: {
    conversations: [],
    current_conversations: null,
    current_messages: [],
  },
  group_chat: {},
};

const slice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    fetchDirectConversations(state, action) {
      const list = action.payload.conversations.map((e) => {
        const this_user = e.participants.find(
          (el) => el._id.toString() !== user_id
        );

        return {
          id: e._id,
          user_id: this_user._id,
          name: `${this_user.firstName} ${this_user.lastName}`,
          online: this_user.status === "Online",
          avatar: this_user.avatar,
          msg: "Hello World!",
          time: "9:36",
          unread: 0,
          pinned: false,
        };
      });
      state.direct_chat.conversations = list;
    },

    addDirectConversation(state, action) {
      const this_conversation = action.payload.conversation;

      const user = this_conversation.participants.find(
        (el) => el._id.toString() !== user_id
      );

      state.direct_chat.conversations.push({
        id: this_conversation._id,
        user_id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        online: user.status === "Online",
        avatar: user.avatar,
        msg: "Hey World!!",
        time: "9:36",
        unread: 0,
        pinned: false,
      });
    },

    updateDirectConversation(state, action) {
      const this_conversation = action.payload.conversation;
      state.direct_chat.conversations = state.direct_chat.conversations.map(
        (e) => {
          if (e.id !== this_conversation._id) {
            return e;
          } else {
            const user = this_conversation.participants.find(
              (el) => el._id.toString() !== user_id
            );
            return {
              id: this_conversation._id,
              user_id: user._id,
              name: `${user.firstName} ${user.lastName}`,
              online: user.status === "Online",
              avatar: user.avatar,
              msg: "Hey World!!",
              time: "9:36",
              unread: 0,
              pinned: false,
            };
          }
        }
      );
    },
  },
});

export function FetchDirectConversations({ conversations }) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.fetchDirectConversations({ conversations }));
  };
}

export function AddDirectConversation({ conversation }) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.addDirectConversation({ conversation }));
  };
}

export function UpdateDirectConversation({ conversation }) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateDirectConversation({ conversation }));
  };
}

export default slice.reducer;
