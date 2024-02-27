import { Box, Stack, Grid, Typography, useTheme } from "@mui/material";

import UserCard from "./FriendsSubComps/UserCard";

const FriendRequests = ({ friendRequests }) => {
  const theme = useTheme();

  return (
    <Box height={"100%"} width={"100%"} p={2}>
      <Stack spacing={1} alignItems={"center"} justifyContent={"center"}>
        <Typography
          variant="caption"
          sx={{ color: theme.palette.text.secondary, textAlign: "center" }}
        >
          Below is the list of received friend requests | Click on a card to
          visit user
        </Typography>
        <Grid container spacing={3}>
          {friendRequests.map((sender) => (
            <UserCard
              sender={sender}
              fromSection={"FriendRequests"}
              key={sender._id}
            />
          ))}
        </Grid>
      </Stack>
    </Box>
  );
};

export default FriendRequests;
