import { Box } from "@mui/material";

import { useSelector } from "react-redux";

const Conversation = () => {
  const { activeConversation } = useSelector((state) => state.chat);
  return <Box>Current conversation: {activeConversation.name}</Box>;
};
export default Conversation;
