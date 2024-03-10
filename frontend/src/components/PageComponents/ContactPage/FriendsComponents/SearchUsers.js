import { useEffect, useState } from "react";
import { Box, Stack, Typography, Grid, useTheme } from "@mui/material";
import { MagnifyingGlass } from "phosphor-react";
import Lottie from "react-lottie";

import ChillingVibes from "../../../../assets/Illustration/Animations/ChillingVibes.json";
import { Search, SearchIconWrapper, StyledInputBase } from "../../../Search";

// redux imports
import { useDispatch } from "react-redux";

const SearchUsers = () => {
  // from redux
  const dispatch = useDispatch();

  // states
  const [searchTerm, setSearchTerm] = useState("");
  // const [prevSearchTerm, setPrevSearchTerm] = useState("");
  // const [usersFound, setUsersFound] = useState([]);
  // const [page, setPage] = useState(1);

  // -------------- inner functions --------------
  // function to handle searched term
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // setPage(1);
  };

  // using debounce method to dispatch action after search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== "") {
        // const searchData = { keyword: searchTerm, page: 0 };
        // dispatch(SearchFriends(searchData));
      } else {
        // dispatch(ClearSearch());
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, searchTerm]);

  // function to handle page change
  // const handleSearchPageChange = () => {
  //   // Increment the page count and dispatch SearchFriends with the new page
  //   setPage((prevpage) => prevpage + 1);
  //   const searchData = { keyword: searchTerm, page: page };
  //   // dispatch(SearchFriends(searchData));
  // };

  // After the searchResults are updated, set them to usersFound
  // useEffect(() => {
  //   if (searchResults?.length > 0) {
  //     if (
  //       prevSearchTerm === searchTerm &&
  //       JSON.stringify(usersFound) !== JSON.stringify(searchResults) &&
  //       usersFound
  //     ) {
  //       setUsersFound((prevUsersFound) => [
  //         ...prevUsersFound,
  //         ...searchResults,
  //       ]);
  //     } else {
  //       setUsersFound(searchResults);
  //     }
  //   } else if (searchResults === null) {
  //     setUsersFound(null);
  //   } else {
  //     setUsersFound([]);
  //   }

  //   // Update prevSearchTerm
  //   setPrevSearchTerm(searchTerm);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [searchResults]);

  // --------------------------------------------

  const theme = useTheme();
  return (
    <Box height={"100%"} width={"100%"} p={2}>
      <Stack spacing={1} alignItems={"center"} justifyContent={"center"}>
        <Typography
          variant="caption"
          sx={{ color: theme.palette.text.secondary, textAlign: "center" }}
        >
          Search users via their name or email
        </Typography>

        {/* Search  */}
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
        <Grid container spacing={3}>
          {!searchTerm ? (
            <Stack
              sx={{ height: "100%", width: "100%" }}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Box sx={{ width: { xs: "20em", md: "28em" } }}>
                <Lottie
                  options={{
                    loop: true,
                    autoplay: true,
                    animationData: ChillingVibes,
                    rendererSettings: {
                      preserveAspectRatio: "xMidYMid slice",
                    },
                  }}
                  isClickToPauseDisabled={true}
                />
              </Box>
            </Stack>
          ) : (
            <></>
          )}
        </Grid>
      </Stack>
    </Box>
  );
};
export default SearchUsers;
