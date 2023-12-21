import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Stack, useMediaQuery } from "@mui/material";
import { LoadingButton } from "@mui/lab";

// redux imports
import { useDispatch, useSelector } from "react-redux";

import FormProvider, { RHFTextField } from "../../components/hook-form";

const ResetPasswordForm = () => {
  // from redux
  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  //  Login Schema
  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().required("Email Required").email("Invalid Email"),
  });

  //   Labels
  const defaultValues = {
    email: "",
  };

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    try {
      // reset-password api call using redux
    } catch (error) {
      console.error(error);
    }
  };

  // breakpoint
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={isSmallScreen ? 0 : 3}>
        <RHFTextField name="email" label="Email address" />

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
          Reset Password
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
};

export default ResetPasswordForm;
