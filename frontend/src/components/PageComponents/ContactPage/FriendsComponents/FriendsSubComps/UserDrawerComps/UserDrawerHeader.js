import {
  Box,
  Stack,
  useTheme,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import { XCircle } from "phosphor-react";

import catDoodle from "../../../../../../assets/backgrounds/catDoodle.png";
import getAvatar from "../../../../../../utils/createAvatar";

const UserDrawerHeader = ({ toggleDrawer, userData }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "relative",
        backgroundImage: `url(${catDoodle})`,
        objectFit: "cover",
        backgroundSize: "300px",
        backgroundColor: theme.palette.primary.lighterFaded,
      }}
    >
      <IconButton
        onClick={toggleDrawer}
        sx={{
          position: "absolute",
          right: "10px",
          top: "10px",
          zIndex: "10",
          backgroundColor: theme.palette.background.default,
          "&:hover": {
            backgroundColor: theme.palette.background.paper,
          },
        }}
      >
        <XCircle />
      </IconButton>
      <Stack
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        height={"15em"}
        spacing={0.2}
        sx={{ position: "relative" }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 900,
            backgroundColor: `${theme.palette.background.default}80`,
            borderRadius: 2,
            p: 1,
          }}
        >
          {userData.firstName} {userData.lastName}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 900,
            backgroundColor: `${theme.palette.background.default}80`,
            borderRadius: 2,
            p: 1,
          }}
        >
          Hey There! I ❤️ Using TwinkChat 😸
        </Typography>
        <Box sx={{ position: "absolute", bottom: "-50px" }}>
          {getAvatar(userData.avatar, userData.firstName, theme, 100)}
        </Box>
      </Stack>
    </Box>
  );
};
export default UserDrawerHeader;
