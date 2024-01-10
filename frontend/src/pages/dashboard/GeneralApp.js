import { useEffect } from "react";
import {
  Stack,
  // useTheme
} from "@mui/material";

// redux imports
import { useDispatch, useSelector } from "react-redux";
import { GetConversations } from "../../redux/slices/actions/chatActions";

import ChatsList from "../../components/PageComponents/ChatPage/ChatsList";

const GeneralApp = () => {
  // from redux
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user.token) {
      dispatch(GetConversations());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Stack
      direction={"row"}
      sx={{ width: "100%", height: { xs: "calc(100vh - 65px)", md: "100vh" } }}
    >
      {/* Chats area */}
      <ChatsList />

      {/* initializing height and width for conversation area */}
      {/* <Box
        sx={{
          height: "100%",
          width: "calc(100vw - 400px)",
          transition: "width 0.1s ease-in-out",
          backgroundColor: theme.palette.background.paper,
        }}
      ></Box> */}
    </Stack>
  );
};

export default GeneralApp;
