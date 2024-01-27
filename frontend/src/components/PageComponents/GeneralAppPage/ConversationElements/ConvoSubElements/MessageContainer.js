import { Stack, Box, useTheme, Typography } from "@mui/material";

const MessageContainer = ({ message, me }) => {
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      justifyContent={me ? "end" : "start"}
      alignItems="center"
      spacing={0.5}
    >
      <Box
        p={1.5}
        sx={{
          width: "max-content",
          backgroundColor: me
            ? theme.palette.primary.main
            : theme.palette.background.default,
          borderRadius: me ? "20px 20px 5px 20px" : "20px 20px 20px 5px",
        }}
      >
        <Typography variant="body2" color={me ? "#fff" : theme.palette.text}>
          {message.message}
        </Typography>
      </Box>
    </Stack>
  );
};
export default MessageContainer;
