import { Stack } from "@mui/material";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  return (
    <Stack direction="row">
      <Sidebar />
    </Stack>
  );
};

export default DashboardLayout;
