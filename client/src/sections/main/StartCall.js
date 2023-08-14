import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { MagnifyingGlass, XCircle } from "phosphor-react";
import React from "react";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/Search";
import { NewCall } from "../../components/Call/CallElement";
import { MembersList } from "../../data";

const StartCall = ({ open, handleClose }) => {
  // using theme
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth={"xs"}
      aria-labelledby="responsive-dialog-title"
      keepMounted
      sx={{ p: 4 }}
    >
      {/* Header for Dialog */}
      <DialogTitle sx={{ mb: 3 }} id="responsive-dialog-title">
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          mb={1}
        >
          <Typography variant="h5" textAlign={"center"} p={1.5}>
            Start A New Call
          </Typography>
          {/* Close Button */}
          <IconButton onClick={handleClose}>
            <XCircle weight="fill" />
          </IconButton>
        </Stack>
        <Stack justifyContent={"center"} alignItems={"center"}>
          {/* Search */}
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
        </Stack>
      </DialogTitle>

      {/* Form */}
      <DialogContent
        sx={{ overflowY: "scroll", maxHeight: "25rem" }}
        className="scrollbar"
      >
        {/* Call list */}
        {MembersList.map((e) => (
          <NewCall key={e.id} {...e} />
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default StartCall;
