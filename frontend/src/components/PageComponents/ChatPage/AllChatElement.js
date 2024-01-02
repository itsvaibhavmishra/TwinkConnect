import { Badge, Box, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import StyledBadge from "../../StyledBadge";
import getAvatar from "../../../utils/createAvatar";

const AllChatElement = ({
  id,
  firstName,
  lastName,
  avatar,
  msg,
  time,
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
      p={2}
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
              {getAvatar(avatar, firstName, theme)}
            </StyledBadge>
          ) : (
            getAvatar(avatar, firstName, theme)
          )}

          {/* Name and message */}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{`${firstName} ${lastName}`}</Typography>
            <Typography
              variant="caption"
              sx={{ color: theme.palette.text.secondary, paddingTop: 0.8 }}
            >
              {truncateText(msg, 20)}
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
            {time}
          </Typography>
          <Badge
            color="primary"
            badgeContent={unread}
            max={9}
            sx={{ paddingBottom: 1 }}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default AllChatElement;
