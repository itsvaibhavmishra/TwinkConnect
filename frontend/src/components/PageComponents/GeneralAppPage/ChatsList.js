import { Fragment, useEffect, useState } from "react";
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
import { SearchFriends } from "../../../redux/slices/actions/userActions";
import { ClearSearch } from "../../../redux/slices/userSlice";

import { MembersList } from "../../../data";
import AllChatElement from "./ChatElements/AllChatElement";
import { Search, SearchIconWrapper, StyledInputBase } from "../../Search";
import OnlineChatElement from "./ChatElements/OnlineChatElement";
import ChatSearchResults from "./ChatElements/ChatSearchResults";

const ChatsList = () => {
  // using theme
  const theme = useTheme();

  // from redux
  const dispatch = useDispatch();
  const { user, searchResults, isLoading } = useSelector((state) => state.user);
  const { conversations } = useSelector((state) => state.chat);

  // states
  const [searchTerm, setSearchTerm] = useState("");

  const isMediumScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const isSmallerScreen = useMediaQuery((theme) => theme.breakpoints.up("xs"));

  // -------------- inner functions --------------
  // function to handle searched term
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // using debounce method to dispatch action after search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== "") {
        dispatch(SearchFriends(searchTerm));
      } else {
        dispatch(ClearSearch());
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, searchTerm]);

  const getOtherUser = (users) => {
    let chatElementProps = null;

    if (users.length > 1) {
      const otherUser = users.find((e) => e._id !== user.id);

      if (otherUser) {
        // Extract data for the other user
        const { firstName, lastName, avatar } = otherUser;
        chatElementProps = { firstName, lastName, avatar };
      }
    } else if (users.length === 1) {
      // If there's only one user in the conversation
      const singleUser = users[0];
      const { firstName, lastName, avatar } = singleUser;
      chatElementProps = { firstName, lastName, avatar };
    }

    return chatElementProps;
  };

  const getSlidesPerView = () => {
    if (isMediumScreen) {
      return "3.5";
    } else if (isSmallScreen) {
      return "6.5";
    } else if (isSmallerScreen) {
      return "3.5";
    }
  };

  // --------------------------------------------

  const slidesPerView = getSlidesPerView();

  return (
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
            onChange={(e) => handleSearch(e)}
          />
        </Search>
      </Stack>

      {!searchTerm ? (
        <>
          {/* Online Friends Slider */}
          <Stack spacing={1}>
            <Swiper spaceBetween={20} slidesPerView={slidesPerView}>
              <Stack direction={"row"} alignItems={"center"} spacing={2}>
                {MembersList.filter((e) => e.online === true).map((e) => (
                  <SwiperSlide key={e._id}>
                    <OnlineChatElement {...e} isLoading={isLoading} />
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
              {/* loding skeleton */}
              {isLoading
                ? MembersList.map((e) => {
                    return (
                      <AllChatElement
                        key={e._id}
                        {...e}
                        isLoading={isLoading}
                      />
                    );
                  })
                : conversations.map((conversation) => {
                    const { users } = conversation;

                    const chatElementProps = getOtherUser(users);

                    return (
                      chatElementProps && (
                        <AllChatElement
                          key={conversation._id}
                          latestMessage={conversation.latestMessage}
                          {...chatElementProps}
                          isLoading={isLoading}
                        />
                      )
                    );
                  })}
            </Stack>
          </Stack>
        </>
      ) : (
        // Search Results
        <Fragment>
          <Divider />

          <Typography variant="subtitle2" sx={{ color: "#676767" }}>
            Search Result
          </Typography>

          <ChatSearchResults
            isLoading={isLoading}
            searchResults={searchResults}
          />
        </Fragment>
      )}
    </Stack>
  );
};

export default ChatsList;
