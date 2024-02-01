import { useEffect } from "react";
import { Stack, useMediaQuery } from "@mui/material";
import { Navigate } from "react-router-dom";

import Sidebar from "./Sidebar";
import { setSession } from "../../utils/jwt";
import { connectSocket, socket } from "../../utils/socket";

import { useDispatch, useSelector } from "react-redux";
import { ShowSnackbar } from "../../redux/slices/userSlice";
import { UpdateMsgConvo } from "../../redux/slices/chatSlice";

const DashboardLayout = () => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  // from redux
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
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
            message: error.message,
          })
        );
      });

      // socket other error handling
      socket.on("error", (error) => {
        dispatch(
          ShowSnackbar({
            severity: error.status,
            message: error.message,
          })
        );
      });

      socket.on("message_received", (message) => {
        dispatch(UpdateMsgConvo(message));
      });

      socket.on("online_friends", (friend) => {
        console.log(friend);
      });

      return () => {
        if (socket) {
          socket.off("connect_error");
          socket.off("error");
          socket.off("message_received");
          socket.off("online_friends");
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user._id, user.token]);

  if (!isLoggedIn || !user) {
    return <Navigate to={"/auth/login"} />;
  }
  if (user.token) {
    setSession(user.token, dispatch);
  }

  return (
    <Stack direction={isSmallScreen ? "column-reverse" : "row"}>
      <Sidebar />
    </Stack>
  );
};

export default DashboardLayout;
