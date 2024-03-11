import { useEffect } from "react";

import { Drawer, Box, useTheme } from "@mui/material";

import { UserDrawerHeader, UserDrawerMain } from "./UserDrawerComps";

// redux imports
import { useDispatch, useSelector } from "react-redux";
import { GetUserData } from "../../../redux/slices/actions/contactActions";

const UserProfileDrawer = ({
  openDrawer,
  toggleDrawer,
  selectedUserData,
  isFrom,
  isRequestSent,
}) => {
  const theme = useTheme();

  // from redux
  const dispatch = useDispatch();
  const { userData, isUserDataLoading } = useSelector((state) => state.contact);

  useEffect(() => {
    if (selectedUserData?._id && openDrawer === true) {
      dispatch(GetUserData(selectedUserData?._id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openDrawer]);

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
        className={"scrollbar"}
        sx={{
          backgroundColor: theme.palette.background.default,
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {/* Header */}
        <UserDrawerHeader
          toggleDrawer={toggleDrawer}
          userData={userData}
          isLoading={isUserDataLoading}
        />

        {/* Main */}
        <UserDrawerMain
          toggleDrawer={toggleDrawer}
          userData={userData}
          isLoading={isUserDataLoading}
          isFrom={isFrom}
          isRequestSent={isRequestSent}
        />
      </Box>
    </Drawer>
  );
};
export default UserProfileDrawer;
