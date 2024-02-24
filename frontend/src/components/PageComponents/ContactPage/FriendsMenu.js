import { useState } from "react";
import { Stack, Box, Tab, Tabs, useTheme, IconButton } from "@mui/material";
import { ArrowCircleLeft } from "phosphor-react";

import { FriendRequests, SearchUsers } from "./FriendsComponents";

// redux imports
import { useDispatch } from "react-redux";
import { setShowFriendsMenu } from "../../../redux/slices/userSlice";

const FriendsMenu = () => {
  const theme = useTheme();

  // from redux
  const dispatch = useDispatch();

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Stack height={"100%"} maxHeight={"100vh"} width={"auto"}>
      {/* Header */}
      <Box
        p={2}
        width={"100%"}
        sx={{
          backgroundColor: theme.palette.background.default,
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          position: "relative",
        }}
      >
        {/* Tabs */}
        <Stack alignItems={"center"}>
          <Tabs value={tabIndex} onChange={handleTabChange}>
            <Tab label="Friend Requests" disableRipple />

            <Tab label="Search Users" disableRipple />
          </Tabs>
        </Stack>

        {/* Close Icon */}
        <IconButton
          sx={{
            position: "absolute",
            right: "5px",
            top: "5px",
            display: { xs: "flex", md: "none" },
          }}
          onClick={() => dispatch(setShowFriendsMenu())}
        >
          <ArrowCircleLeft />
        </IconButton>
      </Box>

      {/* Sections */}
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        height={"100%"}
        maxHeight={"100vh"}
        spacing={2}
        p={2}
      >
        {tabIndex === 0 && <FriendRequests />}
        {tabIndex === 1 && <SearchUsers />}
      </Stack>
    </Stack>
  );
};
export default FriendsMenu;
