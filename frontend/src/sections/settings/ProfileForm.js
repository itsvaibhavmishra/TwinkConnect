import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../components/hook-form/FormProvider";
import { Alert, Stack, useMediaQuery } from "@mui/material";
import { RHFTextField } from "../../components/hook-form";
import { LoadingButton } from "@mui/lab";

// redux imports
import { useSelector } from "react-redux";

const ProfileForm = () => {
  // from redux
  const { firstName, lastName, activityStatus } = useSelector(
    (state) => state.user.user
  );
  const { isLoading } = useSelector((state) => state.auth);

  //  Login Schema
  const LoginSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name Required")
      .min(3, "Name cannot be less than 3 characters")
      .max(25, "Name cannot be more than 25 characters long"),
    about: Yup.string()
      .required("About Required")
      .min(3, "Minimum length should be more than 3 characters")
      .max(50, "About cannot be more than 50 characters long"),
    avatarUrl: Yup.string(),
  });

  //   Labels
  const defaultValues = {
    firstName: firstName || "",
    lastName: lastName || "",
    activityStatus: activityStatus || "",
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isDirty },
  } = methods;

  const onSubmit = async (data) => {
    try {
      // submit data to backend
    } catch (error) {
      console.error(error);
      reset();
      setError("afterSubmit", {
        ...error,
        message: error.message,
      });
    }
  };

  // breakpoint
  const isMediumScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}

        <Stack
          direction={
            isMediumScreen ? (isSmallScreen ? "column" : "row") : "column"
          }
          spacing={2}
        >
          <RHFTextField
            name="firstName"
            label="First Name"
            helperText={
              isMediumScreen
                ? isSmallScreen
                  ? ""
                  : "This name will be visible to your contacts"
                : ""
            }
          />
          <RHFTextField
            name="lastName"
            label="Last Name"
            helperText={
              isMediumScreen
                ? isSmallScreen
                  ? "This name will be visible to your contacts"
                  : ""
                : "This name will be visible to your contacts"
            }
          />
        </Stack>
        <RHFTextField
          multiline
          rows={3}
          name="activityStatus"
          label="Activity Status"
        />
        <Stack direction={"row"} justifyContent={"end"}>
          <LoadingButton
            color="primary"
            size="large"
            type="submit"
            variant="outlined"
            loading={isLoading}
            disabled={!isDirty}
          >
            Save
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

export default ProfileForm;
