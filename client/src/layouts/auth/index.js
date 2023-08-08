import { Container, Stack } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import Logo from "../../assets/Images/TwinkChat.png";

const isAuthenticated = false;

const AuthLayout = () => {
  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <Container sx={{ mt: 5 }} maxWidth="sm">
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
