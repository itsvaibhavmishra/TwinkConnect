import { Box, useTheme } from "@mui/material";

const ConversationFooter = () => {
  const theme = useTheme();

  return (
    <Box
      p={2}
      sx={{
        height: 100,
        backgroundColor: theme.palette.background.default,
      }}
    >
      ConversationFooter
    </Box>
  );
};
export default ConversationFooter;
