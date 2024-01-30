import { Stack } from "@mui/material";

// redux imports
import { useSelector } from "react-redux";

import { getOtherUser } from "../../../utils/getOtherUser";
import {
  ConversationFooter,
  ConversationHeader,
  ConversationMain,
} from "./ConversationElements";
import LoadingScreen from "../../LoadingScreen";

const Conversation = () => {
  const { activeConversation, isLoading } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);

  const otherUser = getOtherUser(activeConversation?.users, user._id);

  if (isLoading) {
    return <LoadingScreen fromChat={true} />;
  }

  return (
    <Stack height={"100%"} maxHeight={"100vh"} width={"auto"}>
      <ConversationHeader otherUser={otherUser} />

      <ConversationMain />

      <ConversationFooter convo_id={activeConversation._id} />
    </Stack>
  );
};
export default Conversation;
