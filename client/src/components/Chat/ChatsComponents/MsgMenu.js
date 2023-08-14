import { Box, Menu, MenuItem, Stack } from "@mui/material";
import React from "react";
import { Message_options } from "../../../data";
import { CaretDown, Smiley } from "phosphor-react";
import { useTheme } from "@emotion/react";

const MsgMenu = ({ incoming }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();

  const containerRef = React.useRef(null);

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setAnchorEl(null);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <Box
      px={0.8}
      pt={0.6}
      sx={{
        backgroundColor: theme.palette.background.default,
        borderRadius: 10,
      }}
      alignItems="center"
      id="basic-button"
      aria-controls={open ? "basic-menu" : undefined}
      aria-haspopup="true"
      aria-expanded={open ? "true" : undefined}
      onClick={handleClick}
      ref={containerRef}
    >
      {incoming ? (
        <>
          <CaretDown style={{ marginRight: "5px" }} />
          <Smiley />
        </>
      ) : (
        <>
          <Smiley />
          <CaretDown style={{ marginLeft: "5px" }} />
        </>
      )}

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Stack spacing={1} px={1}>
          {Message_options.map((e, index) => (
            <MenuItem onClick={handleClose} key={index}>
              <Stack
                direction={"row"}
                spacing={2}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                {e.icon}
                <span>{e.title}</span>
              </Stack>
            </MenuItem>
          ))}
        </Stack>
      </Menu>
    </Box>
  );
};

export default MsgMenu;
