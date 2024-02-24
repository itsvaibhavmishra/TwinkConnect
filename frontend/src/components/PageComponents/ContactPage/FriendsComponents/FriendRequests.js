import {
  Box,
  Stack,
  Card,
  CardContent,
  Grid,
  Typography,
  useTheme,
  Button,
  useMediaQuery,
} from "@mui/material";

import getAvatar from "../../../../utils/createAvatar";

const FriendRequests = ({ friendRequests }) => {
  const theme = useTheme();

  // breakpoint
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Box height={"100%"} width={"100%"} p={2}>
      <Stack spacing={1} alignItems={"center"} justifyContent={"center"}>
        <Typography
          variant="caption"
          sx={{ color: theme.palette.text.secondary }}
        >
          Below is the list of received friend requests | Click on a card to
          visit user
        </Typography>
        <Grid container spacing={3}>
          {friendRequests.map((sender) => (
            <Grid item xs={12} sm={12} md={6} lg={4} key={sender._id}>
              <Card sx={{ backgroundColor: theme.palette.background.default }}>
                <CardContent>
                  <Stack direction={"row"} spacing={2} alignItems={"center"}>
                    {/* Avatar */}
                    {getAvatar(
                      sender.avatar,
                      sender.firstName,
                      theme,
                      isSmallScreen ? 60 : 80
                    )}

                    {/* Name and Email */}
                    <Stack>
                      <Typography variant="h6">
                        {sender.firstName} {sender.lastName}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: theme.palette.text.secondary }}
                      >
                        {sender.email}
                      </Typography>
                    </Stack>
                  </Stack>
                  {/* Request Options */}
                  <Stack direction={"row"} justifyContent={"flex-end"}>
                    <Button variant="text" color="error">
                      Reject
                    </Button>
                    <Button variant="outlined" color="success">
                      Accept
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Box>
  );
};

export default FriendRequests;
