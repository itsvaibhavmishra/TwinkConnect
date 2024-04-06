import { Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import VerifyForm, { EmailForm } from "../../sections/auth/VerifyForm";

const Verify = () => {
  return (
    <Stack spacing={2} sx={{ my: 5, position: "realative" }}>
      <Stack justifyContent={"center"} alignItems={"center"} spacing={1}>
        <Typography component={"h1"} variant="h4">
          Let's Get You Verified
        </Typography>
        <Stack direction={"row"} spacing={0.5}>
          <Typography variant="body2">Already Verified?</Typography>
          <Link to="/auth/login" component={RouterLink} variant="subtitle2">
            Sign In
          </Link>
        </Stack>
      </Stack>

      {/* Verify Form */}
      <EmailForm />
      <VerifyForm />
    </Stack>
  );
};

export default Verify;
