import { Drawer, Box, useTheme } from "@mui/material";
import UserDrawerHeader from "./UserDrawerComps/UserDrawerHeader";

const UserProfileDrawer = ({ openDrawer, toggleDrawer, userData }) => {
  const theme = useTheme();

  return (
    <Drawer
      anchor="bottom"
      open={openDrawer}
      onClose={toggleDrawer}
      PaperProps={{
        sx: { height: "90%" },
      }}
    >
      <Box
        width={"100%"}
        height={"100%"}
        sx={{
          backgroundColor: theme.palette.background.default,
        }}
      >
        {/* Header */}
        <UserDrawerHeader toggleDrawer={toggleDrawer} userData={userData} />
        {/* Main */}
      </Box>
    </Drawer>
  );
};
export default UserProfileDrawer;
