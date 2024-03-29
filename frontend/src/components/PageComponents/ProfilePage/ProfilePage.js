import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import ProfileForm from "../../../sections/settings/ProfileForm";

const ProfilePage = () => {
  return (
    <Stack>
      <Box
        sx={{
          overflowY: "scroll",
          height: "100vh",
          width: { xs: "100vw", md: 320 },
          backgroundColor: (theme) => theme.palette.background,
          boxShadow: "0px 0px 2px #00000040",
        }}
        className="scrollbar"
      >
        <Stack p={3} spacing={5}>
          {/* Header */}
          <Typography component={"h1"} variant="h5">
            My Profile
          </Typography>

          {/* Form Section */}
          <ProfileForm />
        </Stack>
      </Box>
    </Stack>
  );
};

export default ProfilePage;
