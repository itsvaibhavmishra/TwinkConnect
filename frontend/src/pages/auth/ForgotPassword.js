import { Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import React from "react";
import { CaretLeft } from "phosphor-react";

import ForgotPasswordForm from "../../sections/auth/ForgotPasswordForm";

const ForgotPassword = () => {
  return (
    <Stack spacing={2} sx={{ my: 5, position: "realative" }}>
      {/* Head section */}
      <Stack justifyContent={"center"} alignItems={"center"} spacing={1}>
        <Typography component={"h1"} variant="h3" paragraph>
          Forgot your Password?
        </Typography>
      </Stack>

      <Typography sx={{ color: "text.secondary", mb: 5 }}>
        Please enter your registered email. You will recieve a link to create a
        new password via email.
      </Typography>

      {/* Reset Password Form */}
      <ForgotPasswordForm />

      {/* Return to Login Button */}
      <Link
        component={RouterLink}
        to="/auth/login"
        color="inherit"
        variant="subtitle2"
        sx={{
          mt: 3,
          mx: "auto",
          alignItems: "center",
          display: "inline-flex",
        }}
      >
        <CaretLeft />
        Return to Login Page
      </Link>
    </Stack>
  );
};

export default ForgotPassword;
