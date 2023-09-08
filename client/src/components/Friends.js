import {
  Stack,
  useTheme,
  styled,
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
import { ShowSnackbar } from "../redux/slices/app";
import { Chat } from "phosphor-react";

const StyledChatBox = styled(Box)(({ theme }) => ({
  "&:hover": {
    cursor: "pointer",
  },
}));

const UserComponent = ({ firstName, lastName, _id, online, img }) => {
  // using theme
  const theme = useTheme();

  // using dispatch
  const dispatch = useDispatch();

  // concatinating user's name
  const name = `${firstName} ${lastName}`;

  // getting current user id from localstorage
  const user_id = window.localStorage.getItem("user_id");
  return (
    <StyledChatBox
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: theme.palette.background.paper,
      }}
      p={2}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          {" "}
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar alt={name} src={img} />
            </StyledBadge>
          ) : (
            <Avatar alt={name} src={img} />
          )}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{name}</Typography>
          </Stack>
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <Button
              onClick={() => {
                socket.emit(
                  "friend_request",
                  { to: _id, from: user_id },
                  () => {
                    dispatch(
                      ShowSnackbar({
                        severity: "success",
                        message: "Request Sent",
                      })
                    );
                  }
                );
              }}
            >
              Send Request
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </StyledChatBox>
  );
};

const FriendsComponent = ({ firstName, lastName, _id, online, img }) => {
  // using theme
  const theme = useTheme();

  // concatinating user's name
  const name = `${firstName} ${lastName}`;

  return (
    <StyledChatBox
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: theme.palette.background.paper,
      }}
      p={2}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          {" "}
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar alt={name} src={img} />
            </StyledBadge>
          ) : (
            <Avatar alt={name} src={img} />
          )}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{name}</Typography>
          </Stack>
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <IconButton
              onClick={() => {
                // start conversation
              }}
            >
              <Chat />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
    </StyledChatBox>
  );
};

const FriendRequestComponent = ({
  firstName,
  lastName,
  _id,
  online,
  img,
  id,
}) => {
  // using theme
  const theme = useTheme();

  // using dispatch
  const dispatch = useDispatch();

  // concatinating user's name
  const name = `${firstName} ${lastName}`;

  return (
    <StyledChatBox
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: theme.palette.background.paper,
      }}
      p={2}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          {" "}
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar alt={name} src={img} />
            </StyledBadge>
          ) : (
            <Avatar alt={name} src={img} />
          )}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{name}</Typography>
          </Stack>
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <Button
              onClick={() => {
                socket.emit("accept_request", { request_id: id }, () => {
                  dispatch(
                    ShowSnackbar({
                      severity: "success",
                      message: "Request Sent",
                    })
                  );
                });
              }}
            >
              Accept Request
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </StyledChatBox>
  );
};

export { UserComponent, FriendsComponent, FriendRequestComponent };
