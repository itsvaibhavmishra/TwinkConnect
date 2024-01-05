import {
  Stack,
  // useTheme
} from "@mui/material";

import ContactList from "../../components/PageComponents/ContactPage/ContactList";

const Contact = () => {
  // using theme
  // const theme = useTheme();

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
