import {
  Badge,
  Box,
  Stack,
  Typography,
  Skeleton,
  useTheme,
} from "@mui/material";
import React from "react";

// redux imports
import { useDispatch } from "react-redux";
import { CreateOpenConversation } from "../../../../redux/slices/actions/chatActions";

import StyledBadge from "../../../StyledBadge";
import getAvatar from "../../../../utils/createAvatar";
import formatTime from "../../../../utils/timeFormatter";

const AllChatElement = ({
  _id,
  firstName,
  lastName,
  latestMessage,
  activityStatus,
  avatar,
  unread,
  online,
  isLoading,
}) => {
  // using theme
  const theme = useTheme();

  // from redux
  const dispatch = useDispatch();

  const truncateText = (string, n) => {
    return string?.length > n ? `${string?.slice(0, n)}...` : string;
  };

  // ----------- inner functions -----------
  const handleConversation = () => {
    dispatch(CreateOpenConversation(_id));
  };

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: "none",
        cursor: "pointer",
      }}
      pt={2}
      onClick={handleConversation}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          {/* Avatar and online status badge */}
          {isLoading ? (
            <Skeleton
              animation="wave"
              variant="circular"
              width={35}
              height={35}
            />
          ) : online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              {getAvatar(avatar, firstName, theme)}
            </StyledBadge>
          ) : (
            getAvatar(avatar, firstName, theme)
          )}

          {/* Name and message */}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">
              {isLoading ? (
                <Skeleton animation="wave" height={20} width="7em" />
              ) : (
                `${firstName} ${lastName}`
              )}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: theme.palette.text.secondary, paddingTop: 0.8 }}
            >
              {isLoading ? (
                <Skeleton animation="wave" height={20} width="12em" />
              ) : (
                truncateText(
                  latestMessage ? latestMessage.message : activityStatus,
                  20
                )
              )}
            </Typography>
          </Stack>
        </Stack>

        {/* Time and message badge */}
        <Stack spacing={2} alignItems={"center"}>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 600,
              color: theme.palette.text.secondary,
              paddingBottom: 0.8,
            }}
          >
            {isLoading ? (
              <Skeleton animation="wave" height={20} width="3em" />
            ) : (
              formatTime(latestMessage?.updatedAt)
            )}
          </Typography>
          {isLoading ? (
            <Skeleton
              animation="wave"
              variant="circular"
              width={15}
              height={15}
            />
          ) : (
            <Badge
              badgeContent={unread}
              max={9}
              sx={{
                paddingBottom: 1,
                "& .MuiBadge-badge": {
                  color: theme.palette.primary.main,
                  backgroundColor: `${theme.palette.primary.dark}20`,
                },
              }}
            />
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default AllChatElement;
