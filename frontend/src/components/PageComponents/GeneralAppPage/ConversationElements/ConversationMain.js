import { useEffect, useRef } from "react";
import { Box, useTheme, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import MessageContainer from "./ConvoSubElements/MessageContainer";

const ConversationMain = () => {
  const theme = useTheme();
  const { user } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.chat);

  let currentSender = null;

  // Reference to the scrollable element
  const scrollContainerRef = useRef(null);

  // -------------- inner functions --------------
  // Function to check if the text only contains emojis
  const containsOnlyEmojis = (text) => {
    const emojiRegex = /[\p{Emoji}]/gu;
    const emojiStatus = text.match(emojiRegex)?.join("") === text;

    if (emojiStatus) {
      currentSender = null;
    }
    return emojiStatus;
  };

  // Function to determine message type
  const getMessageType = (text) =>
    containsOnlyEmojis(text) ? "emoji" : "text";

  // Function to check if the next message only contains emojis
  const nextMessageOnlyContainsEmojis = (index) =>
    index < messages.length - 1 &&
    containsOnlyEmojis(messages[index + 1].message);

  // Function to scroll to the bottom
  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  };

  // ------------------------------------------

  useEffect(() => {
    // Auto-scroll to the bottom with an animation when the component mounts
    if (scrollContainerRef.current) {
      scrollToBottom();
    }
  }, []);

  return (
    <Box
      width="100%"
      pl={4}
      pr={2}
      py={1}
      sx={{
        flexGrow: 1,
        overflowY: "scroll",
        backgroundColor: theme.palette.background.paper,
        scrollBehavior: "smooth", // Enable smooth scrolling
        transition: "scroll-behavior 300ms",
      }}
      className="scrollbar"
      ref={scrollContainerRef}
    >
      <Stack spacing={0.5}>
        {messages?.map((e, index) => {
          const isStartOfSequence =
            currentSender === null || e.sender._id !== currentSender;

          const isEndOfSequence =
            index === messages.length - 1 ||
            e.sender._id !== messages[index + 1].sender._id ||
            containsOnlyEmojis(e.message) ||
            nextMessageOnlyContainsEmojis(index);

          currentSender = e.sender._id;

          const isLastMessage = messages[messages.length - 1] === e;

          return (
            <MessageContainer
              key={e._id}
              message={e}
              me={user._id === e.sender._id}
              isStartOfSequence={isStartOfSequence}
              isEndOfSequence={isEndOfSequence}
              msgType={getMessageType(e.message)}
              isLastMessage={isLastMessage}
            />
          );
        })}
      </Stack>
    </Box>
  );
};

export default ConversationMain;
