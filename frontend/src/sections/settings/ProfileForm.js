import { useCallback, useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../components/hook-form/FormProvider";
import { Divider, Typography, Stack, useMediaQuery } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { RHFTextField, RHFUploadAvatar } from "../../components/hook-form";
import StyledBadge from "../../components/StyledBadge";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import { UpdateProfile } from "../../redux/slices/actions/userActions";

const ProfileForm = () => {
  // from redux
  const { id, avatar, firstName, lastName, activityStatus } = useSelector(
    (state) => state.user.user
  );
  const { isLoading } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [fileChanged, setFileChanged] = useState(false);

  //  Login Schema
  const ProfileSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("Name Required")
      .min(3, "Name cannot be less than 3 characters")
      .max(16, "Name cannot be more than 16 characters long"),
    lastName: Yup.string()
      .required("Name Required")
      .min(3, "Name cannot be less than 3 characters")
      .max(16, "Name cannot be more than 16 characters long"),
    activityStatus: Yup.string()
      .required("About Required")
      .min(3, "Minimum length should be more than 3 characters")
      .max(50, "About cannot be more than 50 characters long"),
    avatar: Yup.string().nullable(true),
  });

  //   Labels
  const defaultValues = {
    firstName: firstName || "",
    lastName: lastName || "",
    activityStatus: activityStatus || "",
    avatar: avatar || "",
  };

  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  const {
    setError,
    setValue,
    handleSubmit,
    formState: { isDirty },
  } = methods;

  const handleDrop = useCallback(
    (acceptedFiles, fileRejections) => {
      setError("avatar", null);
      if (fileRejections.length > 0) {
        const rejection = fileRejections[0];

        // Check if rejection is due to file size error
        if (rejection.errors.some((e) => e.code === "file-too-large")) {
          setError("avatar", {
            type: "manual",
            message: "File size exceeds the limit (3MB).",
          });
          return;
        }

        // Handle other rejection errors
        setError("avatar", {
          type: "manual",
          message: "Invalid file type or file not selected.",
        });
        return;
      }

      const file = acceptedFiles[0];

      setFileChanged(true); // Set the fileChanged state to true

      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setValue("avatar", imageUrl, { shouldValidate: true });
      }
    },
    [setValue, setError]
  );

  const onSubmit = async (data) => {
    try {
      if (data.avatar) {
        const image = new Image();
        image.src = data.avatar;
        await new Promise((resolve) => {
          image.onload = resolve;
        });

        const { width, height } = image;
        if (width !== height) {
          // If the image doesn't have a 1:1 ratio, open the AvatarCropper
          setError("avatar", {
            type: "manual",
            message: "Please set ratio to 1:1 using edit first.",
          });
          return;
        }
      }

      // Add the user id to the data object
      data.userId = id;
      // submit data to backend
      dispatch(UpdateProfile(data));
    } catch (error) {
      console.error(error);
      setError("afterSubmit", {
        ...error,
        message: error.message,
      });
    } finally {
      setFileChanged(false); // Reset fileChanged state after submission
    }
  };

  const handleRemoveImage = () => {
    setValue("avatar", ""); // Clear the avatar value
    setFileChanged(true); // Set fileChanged to true to indicate a change
  };

  const handleEditImage = () => {
    setFileChanged(true);
  };

  // breakpoint
  const isMediumScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFUploadAvatar
          name="avatar"
          maxSize={3145728}
          onDrop={handleDrop}
          onRemove={handleRemoveImage}
          onEdit={handleEditImage}
          formState={methods.formState}
          defaultValues={defaultValues}
        />
        <Divider>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            spacing={1.5}
          >
            <Typography component={"h2"} variant="caption" color={"#aaa"}>
              Active
            </Typography>
            <StyledBadge variant="dot" usecolor="" />
          </Stack>
        </Divider>

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
        {isLoading || isDirty || fileChanged ? (
          <Stack direction={"row"} justifyContent={"end"}>
            <LoadingButton
              color="primary"
              size="large"
              type="submit"
              variant="outlined"
              loading={isLoading}
              disabled={!isDirty && !fileChanged}
            >
              Save
            </LoadingButton>
          </Stack>
        ) : (
          <></>
        )}
      </Stack>
    </FormProvider>
  );
};

export default ProfileForm;
