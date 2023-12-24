import { Stack } from "@mui/material";

const GeneralApp = () => {
  return (
    <Stack
      direction={"row"}
      sx={{ width: "100%", height: { xs: "calc(100vh - 65px)", md: "100vh" } }}
    >
      General App Starts Here!
    </Stack>
  );
};

export default GeneralApp;
