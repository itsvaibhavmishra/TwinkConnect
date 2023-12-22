import { Stack, useMediaQuery } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  // check is user is logged in
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (!isLoggedIn) {
    return <Navigate to={"/auth/login"} />;
  }

  return (
    <Stack direction={isSmallScreen ? "column-reverse" : "row"}>
      <Sidebar />
    </Stack>
  );
};

export default DashboardLayout;
