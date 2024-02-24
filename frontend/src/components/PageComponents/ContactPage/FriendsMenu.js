import { useState } from "react";
import {
  Stack,
  Box,
  Tab,
  Tabs,
  useTheme,
  IconButton,
  Typography,
} from "@mui/material";
import { ArrowCircleLeft } from "phosphor-react";

import { FriendRequests, SearchUsers } from "./FriendsComponents";
import { Friend_Requests } from "../../../data";

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
    <Stack height={"100%"}>
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
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="h5">Let's make new friends</Typography>
          {/* Close Icon */}
          <IconButton
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={() => dispatch(setShowFriendsMenu())}
          >
            <ArrowCircleLeft />
          </IconButton>
        </Stack>
      </Box>

      {/* Tabs */}
      <Stack alignItems={"center"}>
        <Tabs value={tabIndex} onChange={handleTabChange}>
          <Tab label="Friend Requests" disableRipple />

          <Tab label="Search Users" disableRipple />
        </Tabs>
      </Stack>

      {/* Sections */}
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        height={"100%"}
        spacing={2}
        p={2}
        sx={{
          flexGrow: 1,
          overflow: "scroll",
          height: "100%",
          overflowY: "auto",
          overflowX: "hidden",
          backgroundColor: theme.palette.background.paper,
        }}
        className="scrollbar"
      >
        {tabIndex === 0 && <FriendRequests friendRequests={Friend_Requests} />}
        {tabIndex === 1 && <SearchUsers />}
      </Stack>
    </Stack>
  );
};
export default FriendsMenu;
