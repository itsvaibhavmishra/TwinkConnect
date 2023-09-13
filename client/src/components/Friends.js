import {
  Stack,
  useTheme,
  Avatar,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import React from "react";
import StyledBadge from "./StyledBadge";
import { socket } from "../socket";
import { useDispatch } from "react-redux";
import {
  FetchFriendRequest,
  FetchFriends,
  FetchUsers,
} from "../redux/slices/app";
import { Chat, CheckCircle, XCircle } from "phosphor-react";
import createAvatar from "../utils/createAvatar";

const getAvatar = ({ avatar, name, theme }) => {
  return avatar ? (
    <Avatar src={avatar} alt={name} />
  ) : (
    <Avatar
      sx={{
        backgroundColor: theme.palette[createAvatar(name).color].main,
        fontWeight: 800,
        color: "#fff",
      }}
      alt={name}
    >
      {createAvatar(name).name}
    </Avatar>
  );
};

const UserComponent = ({
  firstName,
  lastName,
  _id,
  online,
  avatar,
  sentRequests,
}) => {
  // using theme
  const theme = useTheme();

  // using dispatch
  const dispatch = useDispatch();

  // concatinating user's name
  const name = `${firstName} ${lastName}`;

  // getting current user id from localstorage
  const user_id = window.localStorage.getItem("user_id");

  // Check if the _id exists in the sentRequests list
  const isRequestSent =
    sentRequests === undefined || sentRequests.length < 0
      ? undefined
      : sentRequests.some((request) => request._id === _id);

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: theme.palette.background.paper,
        borderRadius: 1,
      }}
      p={2}
      my={1}
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

          <Stack spacing={0.3}>
            {/* Name */}
            <Typography variant="subtitle2" sx={{ fontSize: "1.1rem" }}>
              {name}
            </Typography>
          </Stack>
        </Stack>

        <Button
          onClick={() => {
            if (isRequestSent) {
              // handling cancel request
              socket.emit(
                "cancel_request",
                { to: _id, from: user_id },
                setTimeout(() => {
                  dispatch(FetchUsers());
                }, 2000)
              );
            } else {
              // handling sending request
              socket.emit(
                "friend_request",
                { to: _id, from: user_id },
                setTimeout(() => {
                  dispatch(FetchUsers());
                }, 2000)
              );
            }
          }}
        >
          {isRequestSent ? "Cancel Request" : "Send Request"}
        </Button>
      </Stack>
    </Box>
  );
};

const FriendsComponent = ({ firstName, lastName, _id, online, avatar }) => {
  // using theme
  const theme = useTheme();

  // getting current user id from localstorage
  const user_id = window.localStorage.getItem("user_id");

  // using redux
  const dispatch = useDispatch();

  // concatinating user's name
  const name = `${firstName} ${lastName}`;

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: theme.palette.background.paper,
        borderRadius: 1,
      }}
      p={2}
      my={1}
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

          <Stack spacing={0.3}>
            {/* Name */}
            <Typography variant="subtitle2" sx={{ fontSize: "1.1rem" }}>
              {name}
            </Typography>
          </Stack>
        </Stack>

        <Stack direction={"row"} alignItems={"center"}>
          <IconButton
            onClick={() => {
              // start conversation
            }}
          >
            <Chat style={{ color: theme.palette.success.main }} />
          </IconButton>
          <IconButton
            onClick={() => {
              const confirmed = window.confirm(
                `Remove ${firstName} from your Friends List?`
              );
              if (confirmed) {
                // Remove friend
                socket.emit(
                  "remove_friend",
                  {
                    user_id: user_id,
                    friend_id: _id,
                  },
                  setTimeout(() => {
                    dispatch(FetchFriends());
                  }, 2000)
                );
              }
            }}
          >
            <XCircle style={{ color: theme.palette.error.main }} />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};

const FriendRequestComponent = ({
  firstName,
  lastName,
  _id,
  online,
  avatar,
  id,
}) => {
  // using theme
  const theme = useTheme();

  // using redux
  const dispatch = useDispatch();

  // concatinating user's name
  const name = `${firstName} ${lastName}`;

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: theme.palette.background.paper,
        borderRadius: 1,
      }}
      p={2}
      my={1}
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

          <Stack spacing={0.3}>
            {/* Name */}
            <Typography variant="subtitle2" sx={{ fontSize: "1.1rem" }}>
              {name}
            </Typography>
          </Stack>
        </Stack>

        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <IconButton
            onClick={() => {
              socket.emit(
                "accept_request",
                { request_id: id },
                setTimeout(() => {
                  dispatch(FetchFriendRequest());
                }, 2000)
              );
            }}
          >
            <CheckCircle
              size={25}
              style={{ color: theme.palette.success.main }}
            />
          </IconButton>
          <IconButton
            onClick={() => {
              socket.emit(
                "reject_request",
                { request_id: id },
                setTimeout(() => {
                  dispatch(FetchFriendRequest());
                }, 2000)
              );
            }}
          >
            <XCircle size={25} style={{ color: theme.palette.error.main }} />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export { UserComponent, FriendsComponent, FriendRequestComponent };
