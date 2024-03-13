import { useEffect } from "react";
import { Stack, useMediaQuery } from "@mui/material";
import { Navigate } from "react-router-dom";

import Sidebar from "./Sidebar";
import { connectSocket, socket } from "../../utils/socket";

import { useDispatch, useSelector } from "react-redux";
import { ShowSnackbar, updateOnlineUsers } from "../../redux/slices/userSlice";
import {
  setIsOptimistic,
  updateMsgConvo,
  updateTypingConvo,
} from "../../redux/slices/chatSlice";
import { GetOnlineFriends } from "../../redux/slices/actions/userActions";
import { GetConversations } from "../../redux/slices/actions/chatActions";
import { StartServer } from "../../redux/slices/actions/authActions";

const DashboardLayout = () => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  // from redux
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);

  // get conversations and friends
  useEffect(() => {
    if (user.token) {
      // get all conversations
      dispatch(GetConversations());

      // get online friends
      dispatch(GetOnlineFriends());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user._id]);

  useEffect(() => {
    // start server
    dispatch(StartServer());

    // toggle approach between Optimistic & Pessimistic (true means use optimistic)
    dispatch(setIsOptimistic({ isOptimistic: true }));

    // socket connection
    if ((!socket || !socket.connected) && user._id) {
      connectSocket(user.token);
    }

    // socket listeners
    if (socket) {
      // socket server error handling
      socket.on("connect_error", (error) => {
        dispatch(
          ShowSnackbar({
            severity: "error",
            message: `Socket: ${error.message}`,
          })
        );
      });

      // socket other error handling
      socket.on("error", (error) => {
        dispatch(
          ShowSnackbar({
            severity: error.status,
            message: `Socket: ${error.message}`,
          })
        );
      });

      socket.on("message_received", (message) => {
        dispatch(updateMsgConvo(message));
      });

      socket.on("online_friends", (friend) => {
        dispatch(updateOnlineUsers(friend));
      });

      socket.on("start_typing", (typingData) => {
        dispatch(updateTypingConvo(typingData));
      });

      socket.on("stop_typing", (typingData) => {
        dispatch(updateTypingConvo(typingData));
      });

      return () => {
        if (socket) {
          socket.off("connect_error");
          socket.off("error");
          socket.off("message_received");
          socket.off("online_friends");
          socket.off("start_typing");
          socket.off("stop_typing");
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user._id, user.token]);

  if (!isLoggedIn || !user) {
    return <Navigate to={"/auth/welcome"} />;
  }

  return (
    <Stack direction={isSmallScreen ? "column-reverse" : "row"}>
      <Sidebar />
    </Stack>
  );
};

export default DashboardLayout;
