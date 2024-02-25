import { Box, Stack, Grid, Typography, useTheme } from "@mui/material";

import UserCard from "./FriendsSubComps/UserCard";

const SentRequests = ({ sentRequests }) => {
  const theme = useTheme();

  return (
    <Box height={"100%"} width={"100%"} p={2}>
      <Stack spacing={1} alignItems={"center"} justifyContent={"center"}>
        <Typography
          variant="caption"
          sx={{ color: theme.palette.text.secondary, textAlign: "center" }}
        >
          Here's a list of users whome you have sent a request | Click on a card
          to visit user
        </Typography>
        <Grid container spacing={3}>
          {sentRequests.map((sender) => (
            <UserCard sender={sender} fromSection={"SentRequests"} />
          ))}
        </Grid>
      </Stack>
    </Box>
  );
};
export default SentRequests;
