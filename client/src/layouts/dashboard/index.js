// dashboard nav/sidebar
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Nav_Buttons, Profile_Menu } from "../../data";
import { Gear } from "phosphor-react";
import { faker } from "@faker-js/faker";
import TwinkLogo from "../../assets/Images/TwinkChat.png";
import ThemeSwitch from "../../components/ThemeSwitch";
import useSettings from "../../hooks/useSettings";

const DashboardLayout = () => {
  // for getting color palattes from theme
  const theme = useTheme();

  const [selected, setSelected] = useState();
  const { onToggleMode } = useSettings(); // useSettings from custom hooks

  const [isSwitchChecked, setIsSwitchChecked] = useState(
    theme.palette.mode === "light"
  );

  const location = useLocation();

  // function to determine the selected index based on the current path
  const getSelectedIndex = (path) => {
    if (path.startsWith("/app") || path.startsWith("/profile")) {
      return 0;
    } else if (path.startsWith("/group")) {
      return 1;
    } else if (path.startsWith("/call")) {
      return 2;
    } else {
      return 3;
    }
  };

  // Update the selected state based on the current location path
  useEffect(() => {
    setSelected(getSelectedIndex(location.pathname));
  }, [location.pathname]);

  useEffect(() => {
    setIsSwitchChecked(theme.palette.mode === "light");
  }, [theme.palette.mode]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack direction="row">
      {/* main sidebar */}
      <Box
        p={2}
        sx={{
          backgroundColor: theme.palette.background.paper,
          boxShadow: "0px 0px 2px #00000040",
          height: "100vh",
          width: 80,
        }}
      >
        {/* Stack provides flex properties in mui */}
        <Stack
          direction="column"
          sx={{ height: "100%" }}
          alignItems="center"
          spacing={3}
          justifyContent={"space-between"}
        >
          <Stack alignItems={"center"} spacing={4}>
            {/* App logo */}
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

            {/* Navigation buttons from data/index */}
            <Stack
              spacing={3}
              alignItems="center"
              sx={{ width: "max-content" }}
            >
              {Nav_Buttons.map((e) =>
                e.index === selected ? (
                  <Box
                    key={e.index}
                    p={0.5}
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: 1.5,
                    }}
                  >
                    <Link to={e.address}>
                      <IconButton sx={{ width: "max-content", color: "#fff" }}>
                        {e.icon}
                      </IconButton>
                    </Link>
                  </Box>
                ) : (
                  <Link to={e.address}>
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
              {/* Adds a line like <hr> tag */}
              <Divider sx={{ width: "48px" }} />
              {selected === 3 ? (
                <Link to={"settings"}>
                  <Box
                    p={0.5}
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: 1.5,
                    }}
                  >
                    <IconButton sx={{ width: "max-content", color: "#fff" }}>
                      <Gear />
                    </IconButton>
                  </Box>
                </Link>
              ) : (
                <Link to={"settings"}>
                  <IconButton
                    onClick={() => setSelected(3)}
                    sx={{
                      width: "100%",
                      color:
                        theme.palette.mode === "dark"
                          ? theme.palette.text.primary
                          : "#000",
                    }}
                  >
                    <Gear />
                  </IconButton>
                </Link>
              )}
            </Stack>
          </Stack>

          {/*  theme switch button amd avatar */}
          <Stack spacing={4} alignItems={"center"}>
            <ThemeSwitch
              onChange={() => {
                onToggleMode();
              }}
              checked={isSwitchChecked}
            />
            <Avatar
              id="basic-menu"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              src={faker.image.avatar()}
              sx={{ cursor: "pointer" }}
            />
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
              <Stack spacing={1} px={1}>
                {Profile_Menu.map((e) => (
                  <MenuItem onClick={handleClose}>
                    <Stack
                      direction={"row"}
                      sx={{ width: 100 }}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <span>{e.title}</span>
                      {e.icon}
                    </Stack>
                  </MenuItem>
                ))}
              </Stack>
            </Menu>
          </Stack>
        </Stack>
      </Box>
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
