import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { IconButton, InputAdornment, Link, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Eye, EyeSlash } from "phosphor-react";

import RHFTextField from "../../components/hook-form/RHFTextField";
import FormProvider from "../../components/hook-form/FormProvider";

const LoginForm = () => {
  // hide and show password controller
  const [showPassword, setShowPassword] = useState(false);

  // Login Schema
  const LoginSchema = Yup.object().shape({
    email: Yup.string().required("Email Required").email("Invalid Email"),
    password: Yup.string()
      .required("Password Required")
      .min(8, "Password must be atleast 8 characters long")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol"),
  });

  // Labels
  const defaultValues = {
    email: "",
    password: "",
  };

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="email" label="Email address" />
        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? <Eye /> : <EyeSlash />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Stack sx={{ my: 2, alignItems: { xs: "center", sm: "flex-end" } }}>
        <Link
          to="/auth/reset-password"
          component={RouterLink}
          variant="body2"
          color="inherit"
          underline="hover"
        >
          Forgot Password?
        </Link>
      </Stack>
      <LoadingButton
        // loading={isLoading}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        sx={{
          mt: 3,
          bgcolor: "text.primary",
          color: (theme) =>
            theme.palette.mode === "light" ? "common.white" : "grey.800",
          "&:hover": {
            bgcolor: "text.primary",
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",
          },
        }}
      >
        Login
      </LoadingButton>
    </FormProvider>
  );
};

export default LoginForm;
