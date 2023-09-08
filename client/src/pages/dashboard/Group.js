import { Box, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import Groups from "../../components/Group/Groups";
import { useSelector } from "react-redux";
import NoChat from "../../assets/Illustration/NoChat";

const Group = () => {
  const { sidebar } = useSelector((store) => store.app);
  const theme = useTheme();
  return (
    <Stack direction={"row"} sx={{ width: "100%" }}>
      {/* Group List Panel */}
      <Groups />

      {/* Group Conversation Panel */}
      {/* initializing height and width for conversation area */}
      <Box
        sx={{
          height: "100%",
          width: sidebar.open ? "calc(100vw - 720px)" : "calc(100vw - 400px)",
          transition: sidebar.open ? "" : "width 0.1s ease-in-out",
          backgroundColor: theme.palette.background.paper,
        }}
      >
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
      </Box>
    </Stack>
  );
};

export default Group;
