import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../components/hook-form/FormProvider";
import { Alert, Stack } from "@mui/material";
import { RHFTextField } from "../../components/hook-form";
import { useCallback } from "react";
import { LoadingButton } from "@mui/lab";

const ProfileForm = () => {
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
    name: "",
    about: "Hey There! I ❤️ Using TwinkChat",
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const values = watch();

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue("avatarUrl", newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

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

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}

        <RHFTextField
          name="name"
          label="Name"
          helperText={"This name will be visible to your contacts"}
        />
        <RHFTextField
          multiline
          rows={3}
          maxRow={5}
          name="about"
          label="About"
        />
        <Stack direction={"row"} justifyContent={"end"}>
          <LoadingButton
            color="primary"
            size="large"
            type="submit"
            variant="outlined"
            loading={isSubmitSuccessful || isSubmitting}
          >
            Save
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

export default ProfileForm;
