import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import FormProvider from "../../components/hook-form/FormProvider";
import { Stack } from "@mui/material";
import { RHFTextField } from "../../components/hook-form";
import { LoadingButton } from "@mui/lab";
import RHFOtp from "../../components/hook-form/RHFOtp";

// ---------------------- Email for OTP Form ----------------------
export const EmailForm = () => {
  // dispatch from redux
  const { isLoading } = useSelector((state) => state.auth);
  const { email } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Email for OTP Schema
  const EmailSchema = Yup.object().shape({
    email: Yup.string().required("Email Required").email("Invalid Email"),
  });

  //   Labels
  const defaultValues = {
    email: "",
  };

  const methods = useForm({
    resolver: yupResolver(EmailSchema),
    defaultValues,
  });

  const { handleSubmit, formState } = methods;

  const onSubmit = async (data) => {
    try {
      // api request to backend for verifying email for otp using redux
      console.log("OTP sent");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack
        direction={"row"}
        justifyContent={"center"}
        alignItems={"end"}
        spacing={2}
      >
        <RHFTextField
          name="email"
          label="Email address"
          InputProps={{
            endAdornment: (
              <LoadingButton
                loading={isLoading}
                size="small"
                type="submit"
                variant="outlined"
                sx={{
                  py: 1,
                  width: "9rem",
                  color: "common.black",
                  "&:hover": {
                    bgcolor: "primary.main",
                    color: "common.white",
                  },
                }}
              >
                Resend OTP
              </LoadingButton>
            ),
          }}
        />
      </Stack>
    </FormProvider>
  );
};

// ---------------------- OTP Form ----------------------
const VerifyForm = () => {
  // dispatch from redux
  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  //  OTP Schema
  const VerifySchema = Yup.object().shape({
    otp1: Yup.string().required("Required"),
    otp2: Yup.string().required("Required"),
    otp3: Yup.string().required("Required"),
    otp4: Yup.string().required("Required"),
    otp5: Yup.string().required("Required"),
    otp6: Yup.string().required("Required"),
  });

  //   Labels
  const defaultValues = {
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: "",
  };

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(VerifySchema),
    defaultValues,
  });

  const { handleSubmit, formState } = methods;

  const onSubmit = async (data) => {
    try {
      // api request to backend for verifying otp using redux
      dispatch(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {/* Custom OTP input */}
        <RHFOtp
          keyName="otp"
          inputs={["otp1", "otp2", "otp3", "otp4", "otp5", "otp6"]}
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
          Verify OTP
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
};

export default VerifyForm;
