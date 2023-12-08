import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Box,
  useTheme,
  Stack,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Typography,
} from "@mui/material";
import { SignOut } from "phosphor-react";

import TwinkLogo from "../../assets/icons/logo/TwinkChat.png";
import { Nav_Buttons, Profile_Menu } from "../../data";
import ThemeSwitch from "../../components/ThemeSwitch";
import useSettings from "../../hooks/useSettings";

const Sidebar = () => {
  const theme = useTheme();

  // Selected Menu
  const [selected, setSelected] = useState();

  //   ThemeSwitch
  const { onToggleMode } = useSettings(); // useSettings from custom hooks
  const [isSwitchChecked, setIsSwitchChecked] = useState(
    theme.palette.mode === "light"
  );

  const location = useLocation();

  // function to determine the selected index based on the current path
  const getSelectedIndex = (path) => {
    if (path.startsWith("/profile")) {
      return 0;
    } else if (path.startsWith("/app")) {
      return 1;
    } else if (path.startsWith("/group")) {
      return 2;
    } else if (path.startsWith("/contact")) {
      return 3;
    } else if (path.startsWith("/settings")) {
      return 4;
    }
  };

  // Update the selected state based on the current location path
  useEffect(() => {
    setSelected(getSelectedIndex(location.pathname));
  }, [location.pathname]);

  useEffect(() => {
    setIsSwitchChecked(theme.palette.mode === "light");
  }, [theme.palette.mode]);

  //   Avatar Menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        p={3}
        sx={{
          height: "100vh",
          width: 80,
          boxShadow: "0px 0px 2px #00000040",
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Stack
          direction="column"
          sx={{ height: "100%" }}
          alignItems="center"
          spacing={4}
          justifyContent={"space-between"}
        >
          {/* Sidebar Logo */}
          <Box
            sx={{
              backgroundColor: theme.palette.primary.main,
              height: 54,
              width: 54,
              borderRadius: 1.5,
            }}
          >
            <img
              src={TwinkLogo}
              alt="TwinkChat_Logo"
              style={{ padding: "2px 0px" }}
            />
          </Box>

          {/* Center Menus */}
          <Stack spacing={3} alignItems="center" sx={{ width: "max-content" }}>
            {Nav_Buttons.map((e) =>
              e.index === selected ? (
                <Box
                  key={e.index}
                  p={0.8}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 5,
                  }}
                >
                  <Link to={e.address}>
                    <IconButton sx={{ width: "max-content", color: "#fff" }}>
                      {e.icon}
                    </IconButton>
                  </Link>
                </Box>
              ) : (
                <Link to={e.address} key={e.index}>
                  <IconButton
                    onClick={() => setSelected(e.index)}
                    key={e.index}
                    sx={{
                      width: "100%",
                      color:
                        theme.palette.mode === "dark"
                          ? theme.palette.text.primary
                          : "#000",
                    }}
                  >
                    {e.icon}
                  </IconButton>
                </Link>
              )
            )}
          </Stack>

          {/* Sidebar Final Index */}
          <Stack spacing={4} alignItems={"center"}>
            <ThemeSwitch
              onChange={() => {
                onToggleMode();
              }}
              checked={isSwitchChecked}
            />
            <IconButton
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <Avatar
                id="basic-menu"
                src={""}
                label={"Avatar"}
                sx={{ cursor: "pointer" }}
              />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Stack spacing={0.5}>
                {Profile_Menu.map((menuItem, index) => (
                  <MenuItem
                    key={index}
                    onClick={handleClose}
                    component={Link}
                    to={menuItem.address}
                  >
                    <Typography variant="body1">
                      <Stack
                        direction={"row"}
                        sx={{ width: 130 }}
                        px={1}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                      >
                        {menuItem.title}

                        {menuItem.icon}
                      </Stack>
                    </Typography>
                  </MenuItem>
                ))}
                <Divider />
                <MenuItem onClick={handleClose}>
                  <Typography variant="body1">
                    <Stack
                      direction={"row"}
                      sx={{ width: 130 }}
                      px={1}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      Log Out
                      <SignOut />
                    </Stack>
                  </Typography>
                </MenuItem>
              </Stack>
            </Menu>
          </Stack>
        </Stack>
      </Box>
      <Outlet />
    </>
  );
};

export default Sidebar;
