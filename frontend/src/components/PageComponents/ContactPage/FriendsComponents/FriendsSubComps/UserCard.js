import { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Stack,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  Drawer,
} from "@mui/material";

import getAvatar from "../../../../../utils/createAvatar";

const UserCard = ({ sender, fromSection }) => {
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  // breakpoint
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Grid item xs={12} sm={12} md={6} lg={4} key={sender._id}>
      <Card
        sx={{
          backgroundColor: theme.palette.background.default,
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: theme.palette.primary.lighterFaded,
            cursor: "pointer",
          },
        }}
        onClick={toggleDrawer}
      >
        <CardContent>
          <Stack spacing={1.5}>
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
                  sx={{
                    color: theme.palette.text.secondary,
                    wordBreak: "break-word",
                  }}
                >
                  {sender.email}
                </Typography>
              </Stack>
            </Stack>
            {/* Request Options */}
            {fromSection === "FriendRequests" ? (
              <Stack direction={"row"} justifyContent={"flex-end"} spacing={1}>
                <Button variant="text" color="error">
                  Reject
                </Button>
                <Button variant="outlined" color="success">
                  Accept
                </Button>
              </Stack>
            ) : (
              <Button variant="text" color="error">
                Unsend Request
              </Button>
            )}
          </Stack>
        </CardContent>
      </Card>

      {/* Drawer */}
      <Drawer anchor="right" open={openDrawer} onClose={toggleDrawer}>
        <div
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <Typography>{`${sender.firstName} ${sender.lastName}`}</Typography>
          {/* Content of your drawer */}
        </div>
      </Drawer>
    </Grid>
  );
};
export default UserCard;
