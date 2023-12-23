import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import { Tooltip, useMediaQuery } from "@mui/material";
import Draggable from "react-draggable";
import { useEffect, useRef } from "react";

import cssStyles from "../../../utils/cssStyles";
import Iconify from "../../Iconify";
import { IconButtonAnimate } from "../../animate";

const RootStyle = styled("span")(({ theme }) => ({
  ...cssStyles(theme).bgBlur({ opacity: 0.64 }),
  right: 0,
  top: "50%",
  position: "fixed",
  marginTop: theme.spacing(-3),
  padding: theme.spacing(0.5),
  zIndex: theme.zIndex.drawer + 2,
  borderRadius: "24px 0 20px 24px",
  boxShadow: `-12px 12px 32px -4px ${alpha(
    theme.palette.mode === "light"
      ? theme.palette.grey[600]
      : theme.palette.common.black,
    0.36
  )}`,
}));

ToggleButton.propTypes = {
  notDefault: PropTypes.bool,
  onToggle: PropTypes.func,
  open: PropTypes.bool,
  position: PropTypes.object,
  onDrag: PropTypes.func,
};

export default function ToggleButton({
  notDefault,
  open,
  onToggle,
  position,
  onDrag,
}) {
  // breakpoint
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const nodeRef = useRef(null);
  const dragStartPositionXYRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Load position from localStorage
    const savedPosition = JSON.parse(localStorage.getItem("buttonPosition"));
    if (savedPosition) {
      setButtonPosition(savedPosition);
    }
  }, []);

  const setButtonPosition = (newPosition) => {
    localStorage.setItem("buttonPosition", JSON.stringify(newPosition));
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      axis="y"
      onDrag={(event, data) => {
        onDrag(event, data);
        setButtonPosition({ x: position.x, y: position.y + data.deltaY });
      }}
      position={position}
      bounds={"body"}
      scale={isSmallScreen ? 1.5 : 0.5}
      onStart={(event) => {
        dragStartPositionXYRef.current = { x: position.x, y: position.y };
      }}
      onStop={(event, data) => {
        const THRESHOLD = 2;
        const { x, y } = dragStartPositionXYRef.current;
        const wasDragged =
          Math.abs(data.x - x) > THRESHOLD && Math.abs(data.y - y) > THRESHOLD;

        if (!wasDragged) {
          const clickableElement = event.target.closest(
            '[data-clickable="true"]'
          );

          if (clickableElement) {
            try {
              clickableElement.click();
            } catch (error) {
              console.error("Error triggering click:", error);
            }
          }
        }
      }}
    >
      <RootStyle ref={nodeRef}>
        {notDefault && !open}
        <Tooltip title="Settings" placement="left">
          <IconButtonAnimate
            color="inherit"
            onClick={onToggle}
            data-clickable="true"
            sx={{
              p: 1.25,
              transition: (theme) => theme.transitions.create("all"),
              "&:hover": {
                color: "primary.main",
                bgcolor: (theme) =>
                  alpha(
                    theme.palette.primary.main,
                    theme.palette.action.hoverOpacity
                  ),
              },
            }}
          >
            <Iconify icon="eva:options-2-fill" width={20} height={20} />
          </IconButtonAnimate>
        </Tooltip>
      </RootStyle>
    </Draggable>
  );
}
