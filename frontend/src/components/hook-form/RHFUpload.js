import PropTypes from "prop-types";
import { useFormContext, Controller } from "react-hook-form";
import { FormHelperText } from "@mui/material";
import { UploadAvatar } from "../upload";
import AvatarCropper from "../upload/preview/AvatarCropper";
import { useEffect, useState } from "react";

RHFUploadAvatar.propTypes = {
  name: PropTypes.string,
  formState: PropTypes.object,
  onRemove: PropTypes.func,
  onEdit: PropTypes.func,
  defaultValues: PropTypes.object,
};

export function RHFUploadAvatar({
  name,
  formState,
  onRemove,
  onEdit,
  defaultValues,
  ...other
}) {
  const methods = useFormContext(); // Use useFormContext to get the form methods

  const [cropperOpen, setCropperOpen] = useState(false);
  const [initialImageAdded, setInitialImageAdded] = useState(false);

  const handleOpenCropper = () => {
    setCropperOpen(true);
  };

  const handleCloseCropper = () => {
    setCropperOpen(false);
  };

  const handleUseCroppedImage = async (croppedImage) => {
    methods.setValue(name, croppedImage);
    onEdit(true);
    handleCloseCropper();
  };

  useEffect(() => {
    const imageValue = methods.getValues(name);

    // Check if the image is present, not initially added, and not on form submission
    if (
      !defaultValues[name] &&
      imageValue &&
      !initialImageAdded &&
      !methods.formState.isSubmitSuccessful
    ) {
      setInitialImageAdded(true);
      handleOpenCropper();
    }
  }, [methods, initialImageAdded, name, defaultValues]);

  const handleOnRemove = () => {
    setInitialImageAdded(false);
    onRemove();
  };

  return (
    <div>
      <Controller
        name={name}
        control={methods.control}
        render={({ field, fieldState: { error } }) => (
          <div>
            {cropperOpen && (
              <AvatarCropper
                open={cropperOpen}
                handleClose={handleCloseCropper}
                image={field.value}
                onUse={handleUseCroppedImage}
              />
            )}
            <UploadAvatar
              accept={{
                "image/jpeg": ".jpg, .jpeg",
                "image/png": ".png",
                "image/webp": ".webp",
              }}
              error={!!error}
              file={field.value}
              onRemove={handleOnRemove}
              formState={formState}
              onCrop={handleOpenCropper}
              {...other}
            />

            {!!error && (
              <FormHelperText error sx={{ px: 2, textAlign: "center" }}>
                {(!formState.isSubmitSuccessful || formState.isDirty) &&
                  error.message}
              </FormHelperText>
            )}
          </div>
        )}
      />
    </div>
  );
}
