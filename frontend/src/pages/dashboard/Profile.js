import { Box, Stack, Typography, useTheme } from "@mui/material";
import React from "react";

import ProfilePage from "../../components/PageComponents/ProfilePage/ProfilePage";
import NoChat from "../../assets/Illustration/NoChat";

const Profile = () => {
  // using theme
  const theme = useTheme();

  return (
    <Stack
      direction={"row"}
      sx={{ width: "100%", height: { xs: "calc(100vh - 65px)", md: "100vh" } }}
    >
      {/* Profile Panel */}
      <ProfilePage />

      {/* initializing height and width for conversation area */}
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          height: "100%",
          width: "calc(100vw - 400px)",
          transition: "width 0.1s ease-in-out",
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

export default Profile;
