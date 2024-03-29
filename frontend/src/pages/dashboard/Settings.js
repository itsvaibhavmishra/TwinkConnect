import { useState } from "react";
import {
  Box,
  ButtonBase,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Bell,
  Image,
  Info,
  Key,
  Keyboard,
  Lock,
  Note,
  PencilCircle,
} from "phosphor-react";

import Shortcuts from "../../sections/settings/Shortcuts";

// redux imports
import { useSelector } from "react-redux";
import getAvatar from "../../utils/createAvatar";

const Settings = () => {
  // using theme
  const theme = useTheme();

  // from redux
  const { user } = useSelector((state) => state.user);

  // handling keyboard shortcut dialog
  const [openSortcuts, setOpenShortcuts] = useState(false);

  const handleShortcuts = () => {
    setOpenShortcuts(!openSortcuts);
  };

  const list = [
    {
      key: 0,
      icon: <Bell size={20} />,
      title: "Notifications",
      onclick: () => {},
    },
    {
      key: 1,
      icon: <Lock size={20} />,
      title: "Privacy",
      onclick: () => {},
    },
    {
      key: 2,
      icon: <Key size={20} />,
      title: "Security",
      onclick: () => {},
    },
    {
      key: 3,
      icon: <PencilCircle size={20} />,
      title: "Theme",
      onclick: () => {},
    },
    {
      key: 4,
      icon: <Image size={20} />,
      title: "Chat Wallpaper",
      onclick: () => {},
    },
    {
      key: 5,
      icon: <Note size={20} />,
      title: "Request Account Info",
      onclick: () => {},
    },
    {
      key: 6,
      icon: <Keyboard size={20} />,
      title: "Keyboard Shortcuts",
      onclick: handleShortcuts,
    },
    {
      key: 7,
      icon: <Info size={20} />,
      title: "Help",
      onclick: () => {},
    },
  ];

  return (
    <>
      <Stack direction={"row"} sx={{ width: "100%" }}>
        {/* Settings menu */}
        <Box
          sx={{
            overflowY: "scroll",
            height: "100vh",
            width: 320,
            backgroundColor: theme.palette.background,
            boxShadow: "0px 0px 2px #00000040",
          }}
          className="scrollbar"
        >
          <Stack p={3} spacing={5}>
            {/* Header */}
            <Typography variant="h5">Settings</Typography>
            {/* Profile */}
            <Stack direction={"row"} spacing={3}>
              {getAvatar(user?.avatar, user?.firstName, theme, 56)}
              <Stack spacing={0.5}>
                <Typography variant="article">
                  {`${user?.firstName} ${user?.lastName}`}
                </Typography>
                <Typography
                  variant="body2"
                  color={theme.palette.text.secondary}
                >
                  {user?.activityStatus}
                </Typography>
              </Stack>
            </Stack>
            {/* Options */}
            <Stack spacing={3}>
              {list.map(({ key, icon, title, onclick }) => (
                <Stack spacing={2} key={key}>
                  <Stack alignItems={"start"}>
                    <ButtonBase
                      sx={{
                        padding: 1,
                        paddingRight: 1.5,
                        borderRadius: 1,
                        mx: -1,
                        mb: -2,
                      }}
                      onClick={onclick}
                    >
                      <Stack
                        direction={"row"}
                        spacing={2}
                        alignItems={"center"}
                      >
                        {icon}
                        <Typography variant="body2">{title}</Typography>
                      </Stack>
                    </ButtonBase>
                  </Stack>
                  {key !== 7 && <Divider />}
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Box>
        {/* Settings panel right*/}
      </Stack>

      {/* Keyboard shortcuts */}
      {openSortcuts && (
        <Shortcuts
          open={openSortcuts}
          handleClose={handleShortcuts}
          theme={theme}
        />
      )}
    </>
  );
};

export default Settings;
