import { useEffect } from "react";
import { Stack, useTheme } from "@mui/material";

// redux imports
import { useSelector, useDispatch } from "react-redux";

import { getOtherUser } from "../../../utils/getOtherUser";
import {
  ConversationFooter,
  ConversationHeader,
  ConversationMain,
} from "./ConversationElements";
import { GetMessages } from "../../../redux/slices/actions/chatActions";

const Conversation = () => {
  const theme = useTheme();
  const {
    activeConversation,
    activeConvoFriendship,
    sendMsgLoading,
    isOptimistic,
  } = useSelector((state) => state.chat);
  const { user, onlineFriends } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const otherUser = getOtherUser(
    activeConversation?.users,
    user._id,
    onlineFriends
  );

  useEffect(() => {
    dispatch(GetMessages(activeConversation?._id));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeConversation?._id]);

  return (
    <Stack height={"100%"} maxHeight={"100vh"} width={"auto"}>
      <ConversationHeader otherUser={otherUser} />

      <ConversationMain />

      {activeConvoFriendship && activeConvoFriendship ? (
        <ConversationFooter
          convo_id={activeConversation._id}
          sendMsgLoading={sendMsgLoading}
          // --------- Optimistic Approach ---------
          isOptimistic={isOptimistic}
          currentUser={user}
          otherUser={otherUser}
          activeConversation={activeConversation}
          // ---------------------------------------
        />
      ) : (
        <Stack
          py={2}
          px={3}
          width={"100%"}
          sx={{
            position: "sticky",
            backgroundColor: theme.palette.background.default,
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          }}
          alignItems={"center"}
        >
          You are no longer friends with this user!
        </Stack>
      )}
    </Stack>
  );
};
export default Conversation;
