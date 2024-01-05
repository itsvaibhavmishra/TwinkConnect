import { useEffect } from "react";
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

import { useDispatch, useSelector } from "react-redux";
import { GetConversations } from "../../../redux/slices/actions/chatActions";

import { MembersList } from "../../../data";
import AllChatElement from "./ChatElements/AllChatElement";
import { Search, SearchIconWrapper, StyledInputBase } from "../../Search";
import OnlineChatElement from "./ChatElements/OnlineChatElement";

const ChatsList = () => {
  // using theme
  const theme = useTheme();

  // from redux
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { conversations } = useSelector((state) => state.chat);

  const isMediumScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const isSmallerScreen = useMediaQuery((theme) => theme.breakpoints.up("xs"));

  const getSlidesPerView = () => {
    if (isMediumScreen) {
      return "3.5";
    } else if (isSmallScreen) {
      return "6.5";
    } else if (isSmallerScreen) {
      return "3.5";
    }
  };
  const slidesPerView = getSlidesPerView();

  useEffect(() => {
    if (user.token) {
      dispatch(GetConversations());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
        width: { xs: "100%", md: 320 },
        backgroundColor: theme.palette.background.default,
        boxShadow: "0px 0px 2px #00000040",
        overflow: "hidden",
      }}
    >
      <Stack p={3} spacing={2} sx={{ height: "100%" }}>
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

        {/* Online Friends Slider */}
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
              {conversations.map((e) => {
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
