import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { MagnifyingGlass, Plus } from "phosphor-react";
import React, { useState } from "react";
import { Search, SearchIconWrapper, StyledInputBase } from "../Search";
import { ChatList } from "../../data";
import ChatElement from "../Chat/ChatElement";
import CreateGroup from "../../sections/main/CreateGroup";

const Groups = () => {
  // using theme
  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack>
      <Box
        sx={{
          position: "relative",
          height: "100%",
          width: 320,
          backgroundColor: theme.palette.background.default,
          boxShadow: "0px 0px 2px #00000040",
        }}
      >
        {/* Header */}
        <Stack p={3} spacing={2} sx={{ maxHeight: "100vh" }}>
          <Typography variant="h5">Groups</Typography>

          {/* Search stack */}
          <Stack sx={{ width: "100%" }}>
            <Search>
              <SearchIconWrapper>
                <MagnifyingGlass color="#709CE6" />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search..."
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Stack>

          {/* Create new group stack */}
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            sx={{ cursor: "pointer" }}
            onClick={() => {
              setOpen(true);
            }}
          >
            <Typography variant="subtitle2" component={Button}>
              Create New Group
            </Typography>
            <IconButton>
              <Plus style={{ color: theme.palette.primary.main }} />
            </IconButton>
          </Stack>
          <Divider />

          {/* Group Chat section starts here */}
          <Stack
            direction={"column"}
            sx={{
              flexGrow: 1,
              overflow: "scroll",
              height: "100%",
              overflowY: "auto",
              overflowX: "hidden",
            }}
            spacing={2}
            className="scrollbar"
          >
            {/* Pinned Group Messages */}
            <Stack spacing={2.4}>
              <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                Pinned
              </Typography>
              <Stack
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: 1,
                }}
              >
                {ChatList.filter((e) => e.pinned).map((e) => {
                  return <ChatElement key={e.id} {...e} />;
                })}
              </Stack>
            </Stack>

            {/* All Group Chats */}
            <Stack spacing={2.4}>
              <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                All Groups
              </Typography>
              <Stack
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: 1,
                }}
              >
                {ChatList.filter((e) => !e.pinned).map((e) => {
                  return <ChatElement key={e.id} {...e} />;
                })}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Box>
      {/* rendering dialog */}
      {open && <CreateGroup open={open} handleClose={handleClose} />}
    </Stack>
  );
};

export default Groups;
