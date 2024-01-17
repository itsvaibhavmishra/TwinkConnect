import { Fragment, useEffect, useState } from "react";
import {
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
import { getOtherUser } from "../../../utils/getOtherUser";

const ChatsList = () => {
  // using theme
  const theme = useTheme();

  // from redux
  const dispatch = useDispatch();
  const { user, searchResults, searchCount, isLoading } = useSelector(
    (state) => state.user
  );
  const { conversations } = useSelector((state) => state.chat);

  // states
  const [searchTerm, setSearchTerm] = useState("");
  const [prevSearchTerm, setPrevSearchTerm] = useState("");
  const [usersFound, setUsersFound] = useState([]);
  const [page, setPage] = useState(1);

  const isMediumScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const isSmallerScreen = useMediaQuery((theme) => theme.breakpoints.up("xs"));

  // -------------- inner functions --------------
  // function to handle searched term
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  // using debounce method to dispatch action after search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== "") {
        const searchData = { keyword: searchTerm, page: 0 };
        dispatch(SearchFriends(searchData));
      } else {
        dispatch(ClearSearch());
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, searchTerm]);

  // function to handle page change
  const handleSearchPageChange = () => {
    // Increment the page count and dispatch SearchFriends with the new page
    setPage((prevpage) => prevpage + 1);
    const searchData = { keyword: searchTerm, page: page };
    dispatch(SearchFriends(searchData));
  };

  // After the searchResults are updated, set them to usersFound
  useEffect(() => {
    if (searchResults?.length > 0) {
      if (
        prevSearchTerm === searchTerm &&
        JSON.stringify(usersFound) !== JSON.stringify(searchResults) &&
        usersFound
      ) {
        setUsersFound((prevUsersFound) => [
          ...prevUsersFound,
          ...searchResults,
        ]);
      } else {
        setUsersFound(searchResults);
      }
    } else if (searchResults === null) {
      setUsersFound(null);
    } else {
      setUsersFound([]);
    }

    // Update prevSearchTerm
    setPrevSearchTerm(searchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchResults]);

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

                    const chatElementProps = getOtherUser(users, user._id);

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
            Search Result{searchCount > 0 && `: ${searchCount}`}
          </Typography>

          <ChatSearchResults
            isLoading={isLoading}
            searchResults={usersFound}
            searchCount={searchCount}
            currentPage={page}
            onSearchPageChange={handleSearchPageChange}
          />
        </Fragment>
      )}
    </Stack>
  );
};

export default ChatsList;
