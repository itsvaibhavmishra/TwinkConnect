import { Stack } from "@mui/material";

// redux imports
import { useSelector } from "react-redux";

import { getOtherUser } from "../../../utils/getOtherUser";
import {
  ConversationFooter,
  ConversationHeader,
  ConversationMain,
} from "./ConversationElements";

const Conversation = () => {
  const { activeConversation, sendMsgLoading } = useSelector(
    (state) => state.chat
  );
  const { user } = useSelector((state) => state.user);

  const otherUser = getOtherUser(activeConversation?.users, user._id);

  return (
    <Stack height={"100%"} maxHeight={"100vh"} width={"auto"}>
      <ConversationHeader otherUser={otherUser} />

      <ConversationMain />

      <ConversationFooter
        convo_id={activeConversation._id}
        sendMsgLoading={sendMsgLoading}
      />
    </Stack>
  );
};
export default Conversation;
