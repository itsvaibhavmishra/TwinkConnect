import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Link as RouterLink } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  IconButton,
  InputAdornment,
  Link,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Eye, EyeSlash } from "phosphor-react";

// redux imports
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../../redux/slices/actions/authActions";

import FormProvider, { RHFTextField } from "../../components/hook-form";

const LoginForm = () => {
  // dispatch from redux
  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // hide and show password controller
  const [showPassword, setShowPassword] = useState(false);
  const recaptchaRef = useRef(null);

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
      dispatch(LoginUser({ ...data, recaptchaRef }));
    } catch (error) {
      console.log(error);
    }
  };

  // breakpoint
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={isSmallScreen ? 0 : 3}>
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
      <Stack alignItems={isSmallScreen ? "center" : "flex-end"} sx={{ my: 2 }}>
        <Link
          to="/auth/forgot-password"
          component={RouterLink}
          variant="body2"
          color="inherit"
          underline="hover"
        >
          Forgot Password?
        </Link>
      </Stack>

      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey={process.env.REACT_APP_RECAPTCHA_CLIENT}
        theme="dark"
      />

      <LoadingButton
        loading={isLoading}
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
