import { Fragment, useEffect, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Divider,
  useTheme,
  IconButton,
} from "@mui/material";
import { UserPlus, MagnifyingGlass } from "phosphor-react";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import { SearchFriends } from "../../../redux/slices/actions/userActions";
import { ClearSearch } from "../../../redux/slices/userSlice";

import { Search, SearchIconWrapper, StyledInputBase } from "../../Search";
import ChatSearchResults from "../GeneralAppPage/ChatElements/ChatSearchResults";
import AllChatElement from "../GeneralAppPage/ChatElements/AllChatElement";
import OnlineFriendsElement from "../OnlineFriendsElement/OnlineFriendsElement";
import { MembersList } from "../../../data";

const ContactList = () => {
  // using theme
  const theme = useTheme();

  // from redux
  const dispatch = useDispatch();
  const { user, friends, searchResults, searchCount, isLoading } = useSelector(
    (state) => state.user
  );

  // states
  const [searchTerm, setSearchTerm] = useState("");
  const [prevSearchTerm, setPrevSearchTerm] = useState("");
  const [usersFound, setUsersFound] = useState([]);
  const [page, setPage] = useState(1);

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

  // Sort MembersList alphabetically by firstName
  const sortedMembersList = friends
    ?.slice()
    .sort((a, b) => a.firstName.localeCompare(b.firstName));

  // Group contacts by first letter of firstName
  const groupedContacts = sortedMembersList.reduce((acc, contact) => {
    const firstLetter = contact.firstName[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(contact);
    return acc;
  }, {});
  // --------------------------------------------

  return (
    <Box
      sx={{
        position: "relative",
        width: { xs: "100%", md: 320 },
        backgroundColor: theme.palette.background.default,
        boxShadow: "0px 0px 2px #00000040",
        overflow: "hidden",
      }}
    >
      <Stack p={3} spacing={2} sx={{ height: "100%" }}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography variant="h5">Contacts</Typography>
          <IconButton>
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
              onChange={(e) => handleSearch(e)}
            />
          </Search>
        </Stack>

        {!searchTerm ? (
          <>
            {/* Online Friends Slider */}
            <OnlineFriendsElement fromContact={true} />
            <Divider />

            <Typography variant="subtitle2" sx={{ color: "#676767" }}>
              All Contacts
            </Typography>

            {/* Contacts section starts here */}
            <Stack
              direction={"column"}
              sx={{
                flexGrow: 1,
                overflow: "scroll",
                height: "100%",
                overflowY: "auto",
                overflowX: "hidden",
              }}
              spacing={4}
              className="scrollbar"
            >
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
                : //Render contacts grouped by first letter
                  Object.entries(groupedContacts).map(([letter, contacts]) => (
                    <Stack spacing={0.5} key={letter}>
                      <Typography variant="subtitle2">{letter}</Typography>
                      {contacts.map((contact) => (
                        <AllChatElement
                          key={contact._id}
                          {...contact}
                          latestMessage={
                            contact._id === user._id
                              ? { message: "Message yourself" }
                              : contact.latestMessage
                          }
                          isLoading={isLoading}
                        />
                      ))}
                    </Stack>
                  ))}
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
              currentUser={user._id}
            />
          </Fragment>
        )}
      </Stack>
    </Box>
  );
};

export default ContactList;
