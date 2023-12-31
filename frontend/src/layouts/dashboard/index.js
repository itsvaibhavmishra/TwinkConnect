import { Stack, useMediaQuery } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Sidebar from "./Sidebar";
import { isValidToken, setSession } from "../../utils/jwt";

const DashboardLayout = () => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  // from redux
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);

  if (!isLoggedIn || !user || !isValidToken(user.token, dispatch)) {
    return <Navigate to={"/auth/login"} />;
  }
  if (user.token) {
    setSession(user.token, dispatch);
  }

  return (
    <Stack direction={isSmallScreen ? "column-reverse" : "row"}>
      <Sidebar />
    </Stack>
  );
};

export default DashboardLayout;
