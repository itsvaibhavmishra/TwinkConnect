import { AnimatePresence, m } from "framer-motion";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { alpha, styled, Slide } from "@mui/material";
import {
  Stack,
  Divider,
  Backdrop,
  Typography,
  IconButton,
  useMediaQuery,
} from "@mui/material";

import useSettings from "../../../hooks/useSettings";
import cssStyles from "../../../utils/cssStyles";
import { NAVBAR, defaultSettings } from "../../../config";
import Iconify from "../../Iconify";
import ToggleButton from "./ToggleButton";
import SettingDirection from "./SettingDirection";
import SettingFullscreen from "./SettingFullscreen";
import SettingColorPresets from "./SettingColorPresets";
import Developer from "./Developer";
// import useLocales from "../../../hooks/useLocales";
// import Avatar from "@mui/material/Avatar";

const RootStyle = styled(m.div)(({ theme }) => ({
  ...cssStyles(theme).bgBlur({
    color: theme.palette.background.paper,
    opacity: 0.92,
  }),
  top: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  position: "fixed",
  overflow: "hidden",
  width: NAVBAR.BASE_WIDTH,
  flexDirection: "column",
  margin: theme.spacing(2),
  paddingBottom: theme.spacing(3),
  zIndex: theme.zIndex.drawer + 3,
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  boxShadow: `-24px 12px 32px -4px ${alpha(
    theme.palette.mode === "light"
      ? theme.palette.grey[500]
      : theme.palette.common.black,
    0.16
  )}`,
}));

export default function SettingsDrawer() {
  const {
    themeMode,
    themeLayout,
    themeStretch,
    themeContrast,
    themeDirection,
    themeColorPresets,
    onResetSetting,
    onToggleMode,
  } = useSettings();

  // const { currentLang, onChangeLang, allLangs } = useLocales();

  const [open, setOpen] = useState(false);
  const [buttonPosition, setButtonPosition] = useState(
    JSON.parse(localStorage.getItem("buttonPosition")) || { x: 0, y: 0 }
  );

  const notDefault =
    themeMode !== defaultSettings.themeMode ||
    themeLayout !== defaultSettings.themeLayout ||
    themeStretch !== defaultSettings.themeStretch ||
    themeContrast !== defaultSettings.themeContrast ||
    themeDirection !== defaultSettings.themeDirection ||
    themeColorPresets !== defaultSettings.themeColorPresets;

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleDrag = (e, ui) => {
    const { x, y } = buttonPosition;
    setButtonPosition({ x, y: y + ui.deltaY });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const location = useLocation();

  const isAuthPage = location.pathname.includes("/auth");

  // breakpoint
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const handleResetSetting = () => {
    // Reset settings
    onResetSetting();

    // Reset button position in localStorage
    localStorage.removeItem("buttonPosition");
    setButtonPosition({ x: 0, y: 0 });
  };

  return (
    <>
      <Backdrop
        open={open}
        onClick={handleClose}
        sx={{
          background: "transparent",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      />

      {!open && (
        <ToggleButton
          open={open}
          notDefault={notDefault}
          onToggle={handleToggle}
          position={buttonPosition}
          onDrag={handleDrag}
        />
      )}

      <AnimatePresence>
        <Slide
          direction={themeDirection === "ltr" ? "left" : "right"}
          in={open}
          mountOnEnter
          unmountOnExit
        >
          <RootStyle>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ py: 2, pr: 1, pl: 2.5 }}
            >
              <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
                Settings
              </Typography>

              {isAuthPage || isSmallScreen ? (
                <IconButton onClick={onToggleMode}>
                  <Iconify
                    icon={`${
                      themeMode === "light" ? "ph:sun-bold" : "ph:moon-bold"
                    }`}
                    width={20}
                    height={20}
                  />
                </IconButton>
              ) : (
                <></>
              )}

              <IconButton onClick={handleResetSetting}>
                <Iconify icon={"ic:round-refresh"} width={20} height={20} />
              </IconButton>

              <IconButton onClick={handleClose}>
                <Iconify icon={"eva:close-fill"} width={20} height={20} />
              </IconButton>
            </Stack>

            <Divider sx={{ borderStyle: "dashed" }} />

            <Stack
              className="scrollbar"
              sx={{ overflowY: "auto", overflowX: "hidden" }}
            >
              <Stack spacing={3} sx={{ p: 3 }}>
                <Stack spacing={1.5}>
                  <Typography variant="subtitle2">Direction</Typography>
                  <SettingDirection />
                </Stack>

                <Stack spacing={1.5}>
                  <Typography variant="subtitle2">Presets</Typography>
                  <SettingColorPresets />
                </Stack>
                {/* <Stack spacing={1.5}>
                    <Typography variant="subtitle2">Language</Typography>
                    <Stack direction="row" spacing={1}>
                      {allLangs.map((lang) => (
                        <IconButton
                          key={lang.value}
                          onClick={() => onChangeLang(lang.value)}
                        >
                          <Avatar
                            key={lang.value}
                            src={lang.icon}
                            alt={lang.label}
                          ></Avatar>
                        </IconButton>
                      ))}
                    </Stack>
                  </Stack> */}

                <SettingFullscreen />
                <Developer />
              </Stack>
            </Stack>
          </RootStyle>
        </Slide>
      </AnimatePresence>
    </>
  );
}
