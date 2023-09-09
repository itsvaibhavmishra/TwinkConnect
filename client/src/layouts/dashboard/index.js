// dashboard nav/sidebar
import { useDispatch, useSelector } from "react-redux";
import { Stack } from "@mui/material";
import Sidebar from "./Sidebar";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { connectSocket, socket } from "../../socket";
import { ShowSnackbar } from "../../redux/slices/app";

const DashboardLayout = () => {
  // using dispatch from redux
  const dispatch = useDispatch();

  // check is user is logged in
  const { isLoggedIn } = useSelector((state) => state.auth);

  // getting user id from local storage
  const user_id = window.localStorage.getItem("user_id");

  useEffect(() => {
    if (isLoggedIn) {
      // adding hash
      window.onload = function () {
        if (!window.location.hash) {
          window.location = window.location + "#loaded";
          window.location.reload();
        }
      };
      window.onload();

      if (!socket) {
        connectSocket(user_id);
      }

      if (socket) {
        // listening to events
        socket.on("new_friend_request", (data) => {
          dispatch(
            ShowSnackbar({ severity: "success", message: data.message })
          );
        });

        socket.on("request_canceled", (data) => {
          dispatch(
            ShowSnackbar({ severity: "success", message: data.message })
          );
        });

        socket.on("request_accepted", (data) => {
          dispatch(
            ShowSnackbar({ severity: "success", message: data.message })
          );
        });

        socket.on("request_sent", (data) => {
          dispatch(
            ShowSnackbar({ severity: "success", message: data.message })
          );
        });

        socket.on("request_rejected", (data) => {
          dispatch(ShowSnackbar({ severity: "info", message: data.message }));
        });

        socket.on("friend_removed", (data) => {
          dispatch(ShowSnackbar({ severity: "error", message: data.message }));
        });

        socket.on("event_error", (data) => {
          dispatch(ShowSnackbar({ severity: "error", message: data.message }));
        });
      }
    }
    return () => {
      if (socket) {
        socket.off("new_friend_request");
        socket.off("request_canceled");
        socket.off("request_accepted");
        socket.off("request_sent");
        socket.off("request_rejected");
        socket.off("friend_removed");
        socket.off("event_error");
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, socket]);

  if (!isLoggedIn) {
    return <Navigate to={"/auth/login"} />;
  }

  return (
    <Stack direction="row">
      <Sidebar />
    </Stack>
  );
};

export default DashboardLayout;
