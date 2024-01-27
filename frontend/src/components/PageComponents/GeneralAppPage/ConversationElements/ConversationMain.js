import { Box, useTheme } from "@mui/material";

const ConversationMain = () => {
  const theme = useTheme();
  return (
    <Box
      width={"100%"}
      sx={{
        flexGrow: 1,
        overflowY: "scroll",
        backgroundColor: theme.palette.background.paper,
      }}
      className="scrollbar"
    >
      ConversationMain
    </Box>
  );
};
export default ConversationMain;
