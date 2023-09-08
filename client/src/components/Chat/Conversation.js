import { Box, Stack } from "@mui/material";
import React from "react";
import { ChatFooter, ChatHeader } from ".";
import Message from "./ChatsComponents/Message";

function Conversation() {
  return (
    // Parent Stack
    <Stack height={"100%"} maxHeight={"100vh"} width={"auto"}>
      {/* header */}
      <ChatHeader />

      {/* Main Conversation */}
      <Box
        sx={{
          width: "100%",
          flexGrow: 1,
          height: "100%",
          overflowY: "scroll",
        }}
        className="scrollbar"
      >
        <Message />
      </Box>

      {/* footer */}
      <ChatFooter />
    </Stack>
  );
}

export default Conversation;
