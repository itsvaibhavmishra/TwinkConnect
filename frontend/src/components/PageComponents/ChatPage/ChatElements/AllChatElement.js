import { Badge, Box, Stack, Typography, useTheme } from "@mui/material";
import React from "react";

import StyledBadge from "../../../StyledBadge";
import getAvatar from "../../../../utils/createAvatar";
import formatTime from "../../../../utils/timeFormatter";

const AllChatElement = ({
  _id,
  name,
  latestMessage,
  picture,
  unread,
  online,
}) => {
  // using theme
  const theme = useTheme();

  const truncateText = (string, n) => {
    return string?.length > n ? `${string?.slice(0, n)}...` : string;
  };

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: "none",
        cursor: "pointer",
      }}
      py={2}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          {/* Avatar and online status badge */}
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              {getAvatar(picture, name, theme)}
            </StyledBadge>
          ) : (
            getAvatar(picture, name, theme)
          )}

          {/* Name and message */}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{name}</Typography>
            <Typography
              variant="caption"
              sx={{ color: theme.palette.text.secondary, paddingTop: 0.8 }}
            >
              {truncateText(latestMessage?.message, 20)}
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
            {formatTime(latestMessage?.updatedAt)}
          </Typography>
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
        </Stack>
      </Stack>
    </Box>
  );
};

export default AllChatElement;
