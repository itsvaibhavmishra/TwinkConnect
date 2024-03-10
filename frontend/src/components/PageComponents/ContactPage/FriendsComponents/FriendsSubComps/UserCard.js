import { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
  Skeleton,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import getAvatar from "../../../../../utils/createAvatar";
import UserProfileDrawer from "../../../UserProfileDrawer/UserProfileDrawer";

const UserCard = ({ thisUser, fromSection, isLoading }) => {
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  // breakpoint
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Grid item xs={12} sm={12} md={6} lg={4}>
      <Card
        sx={{
          backgroundColor: theme.palette.background.default,
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: theme.palette.primary.lighterFaded,
            backdropFilter: "blur(10px)",
            cursor: "pointer",
          },
        }}
        onClick={toggleDrawer}
      >
        <CardContent>
          <Stack spacing={1.5}>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              {/* Avatar */}
              {isLoading ? (
                <Skeleton
                  animation="wave"
                  variant="circular"
                  width={isSmallScreen ? 60 : 80}
                  height={isSmallScreen ? 60 : 80}
                />
              ) : (
                getAvatar(
                  thisUser?.avatar,
                  thisUser?.firstName,
                  theme,
                  isSmallScreen ? 60 : 80
                )
              )}

              {/* Name and Email */}
              <Stack>
                <Typography variant="h6">
                  {isLoading ? (
                    <Skeleton animation="wave" width={100} />
                  ) : (
                    `${thisUser?.firstName} ${thisUser?.lastName}`
                  )}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: theme.palette.text.secondary,
                    wordBreak: "break-word",
                  }}
                >
                  {isLoading ? (
                    <Skeleton animation="wave" width={150} />
                  ) : (
                    thisUser?.email
                  )}
                </Typography>
              </Stack>
            </Stack>
            {/* Request Options */}
            {fromSection === "FriendRequests" ? (
              <Stack direction={"row"} justifyContent={"flex-end"} spacing={1}>
                <LoadingButton
                  loading={isLoading}
                  variant="text"
                  color="error"
                  onClick={(e) => e.stopPropagation()}
                >
                  Reject
                </LoadingButton>
                <LoadingButton
                  loading={isLoading}
                  variant="outlined"
                  color="success"
                  onClick={(e) => e.stopPropagation()}
                >
                  Accept
                </LoadingButton>
              </Stack>
            ) : fromSection === "SearchUsers" ? (
              <LoadingButton
                loading={isLoading}
                variant="text"
                color="success"
                onClick={(e) => e.stopPropagation()}
              >
                Send Request
              </LoadingButton>
            ) : (
              fromSection === "SentRequests" && (
                <LoadingButton
                  loading={isLoading}
                  variant="text"
                  color="error"
                  onClick={(e) => e.stopPropagation()}
                >
                  Unsend Request
                </LoadingButton>
              )
            )}
          </Stack>
        </CardContent>
      </Card>

      {/* Drawer */}
      <UserProfileDrawer
        isFrom={fromSection}
        openDrawer={openDrawer}
        toggleDrawer={toggleDrawer}
        selectedUserData={thisUser}
      />
    </Grid>
  );
};
export default UserCard;
