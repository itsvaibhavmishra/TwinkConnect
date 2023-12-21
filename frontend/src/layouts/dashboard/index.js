import { Stack, useMediaQuery } from "@mui/material";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Stack direction={isSmallScreen ? "column-reverse" : "row"}>
      <Sidebar />
    </Stack>
  );
};

export default DashboardLayout;
