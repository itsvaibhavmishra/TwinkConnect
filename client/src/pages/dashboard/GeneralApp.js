import React from "react";
import Chats from "../../components/Chat/Chats";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import Conversation from "../../components/Chat/Conversation";
import { useSelector } from "react-redux";
import { Contact, Shared, Starred } from "../../components/SidebarRight";
import NoChat from "../../assets/Illustration/NoChat";

const GeneralApp = () => {
  const { sidebar, room_id, chat_type } = useSelector((store) => store.app);

  const theme = useTheme();

  return (
    <Stack direction={"row"} sx={{ width: "100%" }}>
      {/* Chats area */}
      <Chats />

      {/* initializing height and width for conversation area */}
      <Box
        sx={{
          height: "100%",
          width: sidebar.open ? "calc(100vw - 720px)" : "calc(100vw - 400px)",
          transition: sidebar.open ? "" : "width 0.1s ease-in-out",
          backgroundColor: theme.palette.background.paper,
        }}
      >
        {room_id !== null && chat_type === "direct" ? (
          // Chats conversation area
          <Conversation sidebar={sidebar} />
        ) : (
          <Stack
            sx={{ height: "100%", width: "100%" }}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <NoChat />
            <Typography variant="subtitle2" sx={{ mt: -10 }}>
              Select or Start a new Conversation
            </Typography>
          </Stack>
        )}
      </Box>

      {sidebar.open &&
        (() => {
          switch (sidebar.type) {
            case "CONTACT":
              return <Contact />; // Contacts area

            case "STARRED":
              return <Starred />;

            case "SHARED":
              return <Shared />;
            default:
              break;
          }
        })()}
    </Stack>
  );
};

export default GeneralApp;
