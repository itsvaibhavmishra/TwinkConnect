// ContactList.js
import {
  Box,
  Stack,
  Typography,
  Divider,
  useTheme,
  IconButton,
} from "@mui/material";
import { UserPlus, MagnifyingGlass } from "phosphor-react";

import { MembersList } from "../../../data";
import AllContactElement from "./ContactElements/AllContactElement";
import { Search, SearchIconWrapper, StyledInputBase } from "../../Search";

const ContactList = () => {
  // using theme
  const theme = useTheme();

  // Sort MembersList alphabetically by firstName
  const sortedMembersList = MembersList.slice().sort((a, b) =>
    a.firstName.localeCompare(b.firstName)
  );

  // Group contacts by first letter of firstName
  const groupedContacts = sortedMembersList.reduce((acc, contact) => {
    const firstLetter = contact.firstName[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(contact);
    return acc;
  }, {});

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
              placeholder="Search Users..."
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Stack>

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
          {/* Render contacts grouped by first letter */}
          {Object.entries(groupedContacts).map(([letter, contacts]) => (
            <Stack spacing={0.5} key={letter}>
              <Typography variant="subtitle2">{letter}</Typography>
              {contacts.map((contact) => (
                <AllContactElement {...contact} key={contact._id} />
              ))}
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default ContactList;
