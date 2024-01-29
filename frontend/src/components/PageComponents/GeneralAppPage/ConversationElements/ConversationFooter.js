import { useRef, useState, useEffect } from "react";
import { Box, Stack, IconButton, useTheme, Grow } from "@mui/material";
import { PaperPlaneTilt } from "phosphor-react";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import ChatInput from "./ConvoSubElements/ChatInput";

const ConversationFooter = () => {
  const theme = useTheme();

  const [value, setValue] = useState("");
  const [openPicker, setOpenPicker] = useState(false);
  const inputRef = useRef(null);
  const pickerRef = useRef(null);

  const handleEmojiClick = (emoji) => {
    const input = inputRef.current;

    if (input) {
      const selectionStart = input.selectionStart;
      const selectionEnd = input.selectionEnd;

      setValue(
        value.substring(0, selectionStart) +
          emoji +
          value.substring(selectionEnd)
      );

      // Move the cursor to the end of the inserted emoji
      input.selectionStart = input.selectionEnd = selectionStart + 1;
    }
  };

  const handleClickOutsidePicker = (event) => {
    if (pickerRef.current && !pickerRef.current.contains(event.target)) {
      setOpenPicker(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (value && value !== "") {
      console.log(value);
      // Clear the input field
      setValue("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsidePicker);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsidePicker);
    };
  }, []);

  return (
    <Box
      py={2}
      px={3}
      width={"100%"}
      sx={{
        backgroundColor: theme.palette.background.default,
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Stack direction="row" alignItems={"center"} spacing={2}>
          <Stack sx={{ width: "100%" }}>
            <Grow in={openPicker}>
              <Box
                ref={pickerRef}
                sx={{
                  zIndex: 10,
                  position: "fixed",
                  bottom: { xs: 80, md: 65 },
                  right: { xs: 5, sm: 80, md: 100 },
                }}
              >
                <Picker
                  perLine={8}
                  theme={theme.palette.mode}
                  data={data}
                  onEmojiSelect={(emoji) => {
                    handleEmojiClick(emoji.native);
                  }}
                />
              </Box>
            </Grow>
            {/* Chat Input */}
            <ChatInput
              openPicker={openPicker}
              setOpenPicker={setOpenPicker}
              inputRef={inputRef}
              value={value}
              setValue={setValue}
              theme={theme}
            />
          </Stack>

          <IconButton
            type="submit"
            sx={{
              height: 40,
              width: 40,
              backgroundColor: theme.palette.primary.main,
              borderRadius: 20,
              transition: "background-color 0.2s ease",
            }}
          >
            <PaperPlaneTilt color="#ffffff" size={20} />
          </IconButton>
        </Stack>
      </form>
    </Box>
  );
};

export default ConversationFooter;
