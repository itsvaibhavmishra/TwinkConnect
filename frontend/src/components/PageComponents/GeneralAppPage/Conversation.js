import { useEffect } from "react";
import { Stack } from "@mui/material";

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
  const { activeConversation, sendMsgLoading } = useSelector(
    (state) => state.chat
  );
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const otherUser = getOtherUser(activeConversation?.users, user._id);

  useEffect(() => {
    dispatch(GetMessages(activeConversation?._id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
