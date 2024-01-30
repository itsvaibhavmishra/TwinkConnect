import { useState } from "react";
import {
  Stack,
  TextField,
  Tooltip,
  Fab,
  IconButton,
  InputAdornment,
  Popover,
} from "@mui/material";
import { LinkSimple, Smiley } from "phosphor-react";

import { Actions } from "../../../../../data";

const ChatInput = ({
  openPicker,
  setOpenPicker,
  setValue,
  value,
  inputRef,
  handleSubmit,
  theme,
}) => {
  const [popoverAnchor, setPopoverAnchor] = useState(null);

  const handlePopoverOpen = (event) => {
    setPopoverAnchor(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopoverAnchor(null);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      handleSubmit(event);
    }
  };

  return (
    <TextField
      inputRef={inputRef}
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
      }}
      onKeyDown={handleKeyPress}
      fullWidth
      multiline
      maxRows={3}
      autoComplete="off"
      autoFocus
      placeholder="Write a message..."
      variant="outlined"
      InputProps={{
        sx: {
          borderRadius: 20,
          backgroundColor: theme.palette.background.paper,
          "& textarea": {
            scrollbarColor: `${theme.palette.primary.main} transparent`,
            scrollbarWidth: "thin",
            "&::-webkit-scrollbar": {
              width: "5px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: theme.palette.primary.main,
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "transparent",
            },
          },
        },
        startAdornment: (
          <Stack>
            <Popover
              open={Boolean(popoverAnchor)}
              anchorEl={popoverAnchor}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              slotProps={{
                paper: {
                  sx: {
                    backgroundColor: "transparent !important",
                    boxShadow: "none",
                    padding: 2,
                  },
                },
              }}
            >
              <Stack spacing={2}>
                {Actions.map((el) => (
                  <Tooltip placement="right" title={el.title} key={el.title}>
                    <Fab
                      onClick={() => {
                        handlePopoverClose();
                      }}
                      sx={{
                        backgroundColor: theme.palette.primary[el.color],
                        color: el.contrast,
                        transition: "all 0.5s ease",
                        "&:hover": {
                          color: "#fff",
                        },
                      }}
                      aria-label="add"
                    >
                      {el.icon}
                    </Fab>
                  </Tooltip>
                ))}
              </Stack>
            </Popover>

            <InputAdornment position="start">
              <IconButton onClick={handlePopoverOpen}>
                <LinkSimple />
              </IconButton>
            </InputAdornment>
          </Stack>
        ),

        endAdornment: (
          <Stack sx={{ position: "relative" }}>
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  setOpenPicker(!openPicker);
                }}
              >
                <Smiley />
              </IconButton>
            </InputAdornment>
          </Stack>
        ),
      }}
    />
  );
};

export default ChatInput;
