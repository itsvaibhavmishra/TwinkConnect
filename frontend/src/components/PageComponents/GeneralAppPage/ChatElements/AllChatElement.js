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
import { useDispatch, useSelector } from "react-redux";
import { CreateOpenConversation } from "../../../../redux/slices/actions/chatActions";

import StyledBadge from "../../../StyledBadge";
import getAvatar from "../../../../utils/createAvatar";
import formatTime from "../../../../utils/timeFormatter";
import truncateText from "../../../../utils/truncateText";

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
  convo_id,
}) => {
  // using theme
  const theme = useTheme();

  // from redux
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);

  const isActiveConvo = activeConversation?._id === convo_id;

  // ----------- inner functions -----------
  const handleConversation = () => {
    if (!isActiveConvo && !isLoading) {
      dispatch(CreateOpenConversation(_id));
    }
  };
  // ---------------------------------------

  const selectedChat = () => {
    if (!activeConversation) {
      return "none";
    } else if (theme.palette.mode === "dark") {
      return isActiveConvo ? theme.palette.primary.lighterFaded : "none";
    } else {
      return isActiveConvo ? theme.palette.primary.lighter : "none";
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: selectedChat,
        cursor: !isActiveConvo && !isLoading ? "pointer" : "default",
        transition: "background-color 0.2s ease",
        "&:hover": {
          backgroundColor:
            !isActiveConvo && !isLoading && `${theme.palette.primary.main}20`,
        },
      }}
      p={1.5}
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
                `${firstName} ${lastName}${_id === user._id ? "(You)" : ""}`
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
                  latestMessage
                    ? latestMessage?.sender?._id === user._id
                      ? `You: ${latestMessage.message}`
                      : latestMessage.message
                    : activityStatus,
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
              textWrap: "nowrap",
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
                  backgroundColor: `${theme.palette.primary.main}15`,
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
