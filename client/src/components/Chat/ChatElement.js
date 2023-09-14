import { Avatar, Badge, Box, Stack, Typography, useTheme } from "@mui/material";
import StyledBadge from "../StyledBadge";
import { useDispatch, useSelector } from "react-redux";
import { SelectConversation } from "../../redux/slices/app";
import getAvatar from "../../utils/createAvatar";

const ChatElement = ({
  id,
  avatar,
  name,
  msg,
  time,
  unread,
  pinned,
  online,
}) => {
  const { room_id } = useSelector((state) => state.app);

  // using theme
  const theme = useTheme();

  // using redux
  const dispatch = useDispatch();

  const truncateText = (string, n) => {
    return string?.length > n ? `${string?.slice(0, n)}...` : string;
  };

  const selectedChat = () => {
    if (theme.palette.mode === "dark") {
      return id === room_id ? theme.palette.primary.dark : "none";
    } else {
      return id === room_id ? theme.palette.primary.lighter : "none";
    }
  };

  return (
    <Box
      onClick={() => {
        dispatch(SelectConversation({ room_id: id }));
      }}
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: selectedChat(),
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
              {getAvatar({ avatar, name, theme })}
            </StyledBadge>
          ) : (
            getAvatar({ avatar, name, theme })
          )}

          {/* Name and message */}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{name}</Typography>
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

export default ChatElement;
