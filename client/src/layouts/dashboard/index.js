// dashboard nav/sidebar
import { useDispatch, useSelector } from "react-redux";
import { Stack } from "@mui/material";
import Sidebar from "./Sidebar";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { connectSocket, socket } from "../../socket";
import { SelectConversation, ShowSnackbar } from "../../redux/slices/app";
import {
  AddDirectConversation,
  UpdateDirectConversation,
} from "../../redux/slices/conversation";

const DashboardLayout = () => {
  // using dispatch from redux
  const dispatch = useDispatch();

  // check is user is logged in
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { conversations } = useSelector(
    (state) => state.conversation.direct_chat
  );

  // getting user id from local storage
  const user_id = window.localStorage.getItem("user_id");

  useEffect(() => {
    let handleBeforeUnload;

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
        // Add a beforeunload event listener
        handleBeforeUnload = () => {
          // Disconnect the socket when the user closes the window
          socket.emit("end", { user_id });
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

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

        socket.on("start_chat", (data) => {
          const exisiting_conversation = conversations.find(
            (e) => e.id === data._id
          );

          if (exisiting_conversation) {
            dispatch(UpdateDirectConversation({ conversation: data }));
          } else {
            // add direct conversation
            dispatch(AddDirectConversation({ conversation: data }));
          }
          dispatch(SelectConversation({ room_id: data._id }));
        });

        socket.on("event_error", (data) => {
          dispatch(ShowSnackbar({ severity: "error", message: data.message }));
        });
      }
    }
    return () => {
      if (socket) {
        // Remove the beforeunload event listener when the component unmounts
        window.removeEventListener("beforeunload", handleBeforeUnload);
        socket.off("new_friend_request");
        socket.off("request_canceled");
        socket.off("request_accepted");
        socket.off("request_sent");
        socket.off("request_rejected");
        socket.off("friend_removed");
        socket.off("start_chat");
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
