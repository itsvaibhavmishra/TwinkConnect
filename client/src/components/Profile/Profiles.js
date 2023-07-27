import { Box, IconButton, Stack, Typography } from "@mui/material";
import { CaretLeft } from "phosphor-react";
import React from "react";
import { Link } from "react-router-dom";
import ProfileForm from "../../sections/settings/ProfileForm";

const Profiles = () => {
  return (
    <Stack>
      <Box
        sx={{
          overflowY: "scroll",
          height: "100vh",
          width: 320,
          backgroundColor: (theme) => theme.palette.background,
          boxShadow: "0px 0px 2px #00000040",
        }}
        className="scrollbar"
      >
        <Stack p={4} spacing={5}>
          {/* Header */}
          <Stack direction={"row"} alignItems={"center"} spacing={3}>
            <Link to={"/"}>
              <IconButton>
                <CaretLeft size={24} color="#4B4B4B" />
              </IconButton>
            </Link>
            <Typography variant="h5">Profile</Typography>
          </Stack>

          {/* Form Section */}
          <ProfileForm />
        </Stack>
      </Box>
    </Stack>
  );
};

export default Profiles;
