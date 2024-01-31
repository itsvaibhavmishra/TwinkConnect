import { useEffect } from "react";
import { Stack, useMediaQuery } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Sidebar from "./Sidebar";
import { setSession } from "../../utils/jwt";
import { connectSocket, socket } from "../../utils/socket";
import { ShowSnackbar } from "../../redux/slices/userSlice";

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
  }, [user._id, user.token]);

  if (!isLoggedIn || !user) {
    return <Navigate to={"/auth/login"} />;
  }
  if (user.token) {
    setSession(user.token, dispatch);
  }

  if (socket) {
    // socket error handling
    socket.on("connect_error", (error) => {
      dispatch(
        ShowSnackbar({
          severity: "error",
          message: error.message,
        })
      );
    });
  }

  return (
    <Stack direction={isSmallScreen ? "column-reverse" : "row"}>
      <Sidebar />
    </Stack>
  );
};

export default DashboardLayout;
