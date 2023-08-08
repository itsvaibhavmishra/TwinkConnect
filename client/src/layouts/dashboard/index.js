// dashboard nav/sidebar
import { useSelector } from "react-redux";
import { Stack } from "@mui/material";
import Sidebar from "./Sidebar";
import { Navigate } from "react-router-dom";

const DashboardLayout = () => {
  // check is user is logged in
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (!isLoggedIn) {
    return <Navigate to={"/auth"} />;
  }

  return (
    <Stack direction="row">
      <Sidebar />
    </Stack>
  );
};

export default DashboardLayout;
