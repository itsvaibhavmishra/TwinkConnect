import { createSlice } from "@reduxjs/toolkit";
import createAvatar from "../../utils/createAvatar";

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
          avatar: this_user.avatar || createAvatar(this_user.firstName),
          msg: "Hello World!",
          time: "9:36",
          unread: 0,
          pinned: false,
        };
      });
      state.direct_chat.conversations = list;
    },
  },
});

export function FetchDirectConversations({ conversations }) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.fetchDirectConversations({ conversations }));
  };
}

export default slice.reducer;
