import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ArchiveBox,
  CircleDashed,
  MagnifyingGlass,
  UserPlus,
} from "phosphor-react";
import React, { useEffect, useState } from "react";
import { ChatList } from "../../data";
import ChatElement from "./ChatElement";
import { Search, SearchIconWrapper, StyledInputBase } from "../Search";
import Friends from "../../sections/main/Friends";
import { socket } from "../../socket";

const Chats = () => {
  // using theme
  const theme = useTheme();

  // friends list dialog box
  const [openDialog, setOpenDialog] = useState(false);

  const toggleDialog = () => {
    setOpenDialog(!openDialog);
  };

  const user_id = window.localStorage.getItem("user_id");

  useEffect(() => {
    socket.emit("get_direct_conversations", { user_id }, (data) => {
      // data is the list of conversations
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box
        sx={{
          position: "relative",
          height: "100%",
          width: 320,
          backgroundColor: theme.palette.background.default,
          boxShadow: "0px 0px 2px #00000040",
        }}
      >
        <Stack p={3} spacing={2} sx={{ height: "100vh" }}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography variant="h5">Chats</Typography>
            <IconButton
              onClick={() => {
                toggleDialog();
              }}
            >
              <UserPlus />
            </IconButton>
          </Stack>

          {/* Search section */}
          <Stack sx={{ width: "100%" }}>
            <Search>
              <SearchIconWrapper>
                <MagnifyingGlass color={theme.palette.primary.main} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search..."
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Stack>
          <Stack spacing={1}>
            <Stack direction={"row"} alignItems={"center"} spacing={1.5}>
              <ArchiveBox size={24} />
              <Button sx={{ fontWeight: 500 }}>Archived</Button>
            </Stack>
            <Divider />
          </Stack>

          {/* Chats setion starts here */}
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
            {/* Pinned Messages */}
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
                  return <ChatElement {...e} key={e.id} />;
                })}
              </Stack>
            </Stack>

            {/* All Chats */}
            <Stack spacing={2.4}>
              <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                All Chats
              </Typography>
              <Stack
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: 1,
                }}
              >
                {ChatList.filter((e) => !e.pinned).map((e) => {
                  return <ChatElement {...e} key={e.id} />;
                })}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Box>
      {openDialog && <Friends open={openDialog} toggleDialog={toggleDialog} />}
    </>
  );
};

export default Chats;
