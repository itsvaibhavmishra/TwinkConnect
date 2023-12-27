import { Stack, useMediaQuery } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Sidebar from "./Sidebar";
import { isValidToken, setSession } from "../../utils/jwt";

const DashboardLayout = () => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  // from redux
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);

  // check is user is logged in
  if (!isLoggedIn || !user || !isValidToken(user.token)) {
    return <Navigate to={"/auth/login"} />;
  }

  // Set the session with the valid token
  setSession(user.token);

  return (
    <Stack direction={isSmallScreen ? "column-reverse" : "row"}>
      <Sidebar />
    </Stack>
  );
};

export default DashboardLayout;
