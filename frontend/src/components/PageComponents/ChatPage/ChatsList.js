import {
  Box,
  Stack,
  Typography,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { MagnifyingGlass } from "phosphor-react";
import { Swiper, SwiperSlide } from "swiper/react";

import { MembersList } from "../../../data";
import AllChatElement from "./AllChatElement";
import { Search, SearchIconWrapper, StyledInputBase } from "../../Search";
import OnlineChatElement from "./OnlineChatElement";

const ChatsList = () => {
  // using theme
  const theme = useTheme();

  const isMediumScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const slidesPerView = isMediumScreen
    ? isSmallScreen
      ? "3.5"
      : "6.5"
    : "4.5";

  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
        width: { xs: "100%", md: 380 },
        backgroundColor: theme.palette.background.default,
        boxShadow: "0px 0px 2px #00000040",
        overflow: "hidden",
      }}
    >
      <Stack p={3} spacing={2} sx={{ height: "100vh" }}>
        <Typography variant="h5">Chats</Typography>

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
          <Swiper spaceBetween={20} slidesPerView={slidesPerView}>
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
              {MembersList.filter((e) => e.online === true).map((e) => (
                <SwiperSlide key={e._id}>
                  <OnlineChatElement {...e} />
                </SwiperSlide>
              ))}
            </Stack>
          </Swiper>
        </Stack>

        <Divider />

        <Typography variant="subtitle2" sx={{ color: "#676767" }}>
          Recent Chats
        </Typography>

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
          {/* All Chats */}
          <Stack spacing={2.4}>
            <Stack
              sx={{
                borderRadius: 1,
              }}
            >
              {MembersList.filter((e) => !e.pinned).map((e) => {
                return <AllChatElement {...e} key={e._id} />;
              })}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ChatsList;
