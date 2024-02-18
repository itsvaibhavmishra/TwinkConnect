import React, { useEffect, useState } from "react";
import { Container, Stack, IconButton, Grow, Tooltip } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Trash } from "phosphor-react";

import Logo from "../../assets/icons/logo/TwinkChat.png";
import { StartServer } from "../../redux/slices/actions/authActions";

const AuthLayout = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, isLoading } = useSelector((state) => state.auth);

  const [showClear, setShowClear] = useState(false);

  const handleClearData = () => {
    setShowClear(false);

    localStorage.removeItem("redux-root");
    window.location.reload();
  };

  useEffect(() => {
    const timer = 10000;
    if (isLoading) {
      setTimeout(() => {
        setShowClear(true);
      }, timer);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isLoading]);

  // start server
  useEffect(() => {
    setTimeout(() => {
      dispatch(StartServer());
    }, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoggedIn) {
    return <Navigate to={"/"} />;
  }

  return (
    <Container sx={{ pt: 5 }} maxWidth="sm">
      <Stack spacing={5}>
        <Stack
          direction={"column"}
          alignItems={"center"}
          sx={{ width: "100%" }}
        >
          <img
            src={Logo}
            alt={"TwinkChat Logo"}
            style={{ height: 120, width: 120 }}
          />
        </Stack>

        {/* Trash icon button with tooltip */}
        <Grow in={showClear}>
          <Tooltip title="Click Here to Reload" placement="left">
            <Stack
              sx={{
                position: "absolute",
                top: -30,
                right: 20,
                backgroundColor: (theme) => theme.palette.primary.main,
                borderRadius: 20,
              }}
            >
              <IconButton onClick={handleClearData}>
                <Trash color="#fff" />
              </IconButton>
            </Stack>
          </Tooltip>
        </Grow>
      </Stack>

      <Outlet />
    </Container>
  );
};

export default AuthLayout;
