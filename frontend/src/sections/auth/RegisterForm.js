import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  IconButton,
  InputAdornment,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { Eye, EyeSlash } from "phosphor-react";
import { LoadingButton } from "@mui/lab";

// redux imports
import { useDispatch, useSelector } from "react-redux";
import { RegisterUser } from "../../redux/slices/actions/authActions";

import FormProvider, { RHFTextField } from "../../components/hook-form";

const RegisterForm = () => {
  // dispatch from redux
  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // hide and show password controller
  const [showPassword, setShowPassword] = useState(false);
  const recaptchaRef = useRef(null);

  //  Register Schema
  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First Name Required")
      .min(3, "First Name must be atleast 3 charaters long")
      .max(16, "First Name cannot be more than 16 characters long")
      .matches(/^[a-zA-Z]+$/, "Name can only contain alphabets"),
    lastName: Yup.string()
      .required("Last Name Required")
      .min(3, "Last Name must be atleast 3 charaters long")
      .max(16, "Last Name cannot be more than 16 characters long")
      .matches(/^[a-zA-Z]+$/, "Name can only contain alphabets"),

    email: Yup.string().required("Email Required").email("Invalid Email"),

    password: Yup.string()
      .required("Password Required")
      .min(8, "Password must be 8 characters long")
      .max(16, "Password cannot be more that 16 characters")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol"),
  });

  //   Labels
  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    try {
      // api request to backend for registering user using redux
      dispatch(RegisterUser({ ...data, recaptchaRef }));
    } catch (error) {
      console.error(error);
    }
  };

  // breakpoint
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={isSmallScreen ? 0 : 3}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems={"center"}
          spacing={isSmallScreen ? 0 : 2}
          justifyContent={"center"}
        >
          <RHFTextField name="firstName" label="First Name" />
          <RHFTextField name="lastName" label="Last Name" />
        </Stack>
        <RHFTextField name="email" label="Email" />
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
          Register
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
};

export default RegisterForm;
