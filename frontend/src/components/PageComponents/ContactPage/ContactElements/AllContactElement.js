import { Box, Stack, Typography, useTheme } from "@mui/material";
import React from "react";

// redux imports
import { useSelector } from "react-redux";

import StyledBadge from "../../../StyledBadge";
import getAvatar from "../../../../utils/createAvatar";

const AllContactElement = ({
  _id,
  firstName,
  lastName,
  avatar,
  activityStatus,
  online,
}) => {
  // using theme
  const theme = useTheme();

  // redux
  const { user } = useSelector((state) => state.user);

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
      p={1}
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

          {/* Name and Status */}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">
              {_id === user.id
                ? `${firstName} ${lastName} (You)`
                : `${firstName} ${lastName}`}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: theme.palette.text.secondary, paddingTop: 0.8 }}
            >
              {_id === user.id
                ? "Message Yourself"
                : truncateText(activityStatus, 50)}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default AllContactElement;
