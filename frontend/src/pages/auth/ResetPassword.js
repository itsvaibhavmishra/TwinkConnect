import { Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { CaretLeft } from "phosphor-react";

import ResetPasswordForm from "../../sections/auth/ResetPasswordForm";

const ResetPassword = () => {
  // Checking if params url has token
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("code");

    if (!token) {
      navigate("/"); // Redirect to "/" if code parameter is not present
    }
  }, [location, navigate]);

  return (
    <Stack spacing={2} sx={{ my: 5, position: "realative" }}>
      {/* Head section */}
      <Stack justifyContent={"center"} alignItems={"center"} spacing={1}>
        <Typography component={"h1"} variant="h4">
          Reset Password
        </Typography>
      </Stack>
      <Typography sx={{ color: "text.secondary", mb: 5 }}>
        Please set your new password
      </Typography>

      {/* New Password Form */}
      <ResetPasswordForm />

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

export default ResetPassword;
