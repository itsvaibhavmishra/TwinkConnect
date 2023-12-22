import { Container, Stack } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Logo from "../../assets/icons/logo/TwinkChat.png";

const AuthLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

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
      </Stack>

      <Outlet />
    </Container>
  );
};

export default AuthLayout;
