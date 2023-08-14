import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { MagnifyingGlass, PhoneCall } from "phosphor-react";
import React, { useState } from "react";
import { Search, SearchIconWrapper, StyledInputBase } from "../Search";
import { CallElement } from "./CallElement";
import { CallLogs } from "../../data";
import StartCall from "../../sections/main/StartCall";

const Calls = () => {
  // using theme
  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack>
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
            <Typography variant="h5">Call Log</Typography>

            {/* Search stack */}
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

            {/* Create new call stack */}
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              sx={{ cursor: "pointer" }}
              onClick={() => setOpen(true)}
            >
              <Typography variant="subtitle2" component={Button}>
                Start new conversation
              </Typography>
              <IconButton>
                <PhoneCall style={{ color: theme.palette.primary.main }} />
              </IconButton>
            </Stack>
            <Divider />

            {/* Call Logs starts here */}
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
              <Stack>
                {CallLogs.map((e) => {
                  return <CallElement key={e.id} {...e} />;
                })}
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
      {open && <StartCall open={open} handleClose={handleClose} />}
    </Stack>
  );
};

export default Calls;
