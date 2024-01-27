import { Box, useTheme, Stack } from "@mui/material";

// redux imports
import { useSelector } from "react-redux";
import MessageContainer from "./ConvoSubElements/MessageContainer";

const ConversationMain = () => {
  const theme = useTheme();

  const { user } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.chat);

  return (
    <Box
      width={"100%"}
      px={2}
      py={1}
      sx={{
        flexGrow: 1,
        overflowY: "scroll",
        backgroundColor: theme.palette.background.paper,
      }}
      className="scrollbar"
    >
      <Stack spacing={0.5}>
        {messages &&
          messages.map((e) => (
            <MessageContainer
              key={e._id}
              message={e}
              me={user._id === e.sender._id}
            />
          ))}
      </Stack>
    </Box>
  );
};
export default ConversationMain;
