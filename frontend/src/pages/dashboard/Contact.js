import { useEffect } from "react";
import { Stack } from "@mui/material";

// redux imports
import { useSelector, useDispatch } from "react-redux";

import ContactList from "../../components/PageComponents/ContactPage/ContactList";
import { GetFriends } from "../../redux/slices/actions/userActions";

const Contact = () => {
  // from redux
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.token) {
      dispatch(GetFriends());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Stack
      direction={"row"}
      sx={{ width: "100%", height: { xs: "calc(100vh - 65px)", md: "100vh" } }}
    >
      {/* Contacts area */}
      <ContactList />

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

export default Contact;
