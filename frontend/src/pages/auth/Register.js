import { Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import RegisterForm from "../../sections/auth/RegisterForm";
import AuthSocial from "../../sections/auth/AuthSocial";

const Register = () => {
  return (
    <Stack spacing={2} sx={{ my: 5, position: "realative" }}>
      <Stack justifyContent={"center"} alignItems={"center"} spacing={1}>
        <Typography component={"h1"} variant="h4">
          Let's Get You Registered
        </Typography>
        <Stack direction={"row"} spacing={0.5}>
          <Typography variant="body2">Already Registered?</Typography>
          <Link to="/auth/login" component={RouterLink} variant="subtitle2">
            Sign In
          </Link>
        </Stack>
      </Stack>

      {/* Form Section */}
      <RegisterForm />

      {/* Terms and Conditions */}
      <Typography
        component={"div"}
        sx={{
          color: "text.secondary",
          mt: 3,
          typography: "caption",
          textAlign: "center",
        }}
      >
        {"By creating an account"} <br /> {"You agree to the "}
        <Link to="/auth/login" component={RouterLink} underline="hover">
          Terms and Conditions
        </Link>
      </Typography>

      {/* Auth Social login */}
      <AuthSocial />
    </Stack>
  );
};

export default Register;
