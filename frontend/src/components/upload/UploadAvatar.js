import PropTypes from "prop-types";
import { useDropzone } from "react-dropzone";
import { Typography, IconButton } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { Image, Trash, Pen } from "phosphor-react";

import AvatarPreview from "./preview/AvatarPreview";

const Container = styled("div")({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const StyledDropZoneContainer = styled("div")({
  position: "relative",
});

const StyledDropZone = styled("div")(({ theme }) => ({
  width: 144,
  height: 144,
  margin: "auto",
  display: "flex",
  cursor: "pointer",
  overflow: "hidden",
  borderRadius: "50%",
  alignItems: "center",
  justifyContent: "center",
  border: `1px dashed ${alpha(theme.palette.grey[500], 0.32)}`,
}));

const StyledOptionButton = styled(IconButton)(({ theme, setval }) => ({
  position: "absolute",
  top: theme.spacing(14.5),
  right: theme.spacing(setval),
  zIndex: 10,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.default,
  border: `1px solid ${alpha(theme.palette.grey[500], 0.32)}`,
  borderRadius: "50%",
  padding: theme.spacing(1),
  "&:hover": {
    backgroundColor: theme.palette.background.neutral,
  },
}));

const StyledPlaceholder = styled("div")(({ theme }) => ({
  zIndex: 7,
  display: "flex",
  borderRadius: "50%",
  position: "absolute",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  width: `calc(100% - 16px)`,
  height: `calc(100% - 16px)`,
  color: theme.palette.text.disabled,
  backgroundColor: theme.palette.background.neutral,
  transition: theme.transitions.create("opacity", {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
}));

UploadAvatar.propTypes = {
  sx: PropTypes.object,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  helperText: PropTypes.node,
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onRemove: PropTypes.func,
  onCrop: PropTypes.func,
};

export default function UploadAvatar({
  error,
  file,
  disabled,
  helperText,
  onRemove,
  onCrop,
  sx,
  ...other
}) {
  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      multiple: false,
      disabled,
      ...other,
    });

  const hasFile = !!file;

  const isError = isDragReject || !!error;

  return (
    <Container>
      <StyledDropZoneContainer>
        <StyledDropZone
          {...getRootProps()}
          sx={{
            ...(isDragActive && {
              opacity: 0.72,
            }),
            ...(isError && {
              borderColor: "error.light",
              ...(hasFile && {
                bgcolor: "error.lighter",
              }),
            }),
            ...(disabled && {
              opacity: 0.48,
              pointerEvents: "none",
            }),
            ...(hasFile && {
              "&:hover": {
                "& .placeholder": {
                  opacity: 1,
                },
              },
            }),
            ...sx,
          }}
        >
          <input {...getInputProps()} />

          {hasFile && <AvatarPreview file={file} />}

          <StyledPlaceholder
            className="placeholder"
            sx={{
              "&:hover": {
                opacity: 0.72,
              },
              ...(hasFile && {
                zIndex: 9,
                opacity: 0,
                color: "common.white",
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.64),
              }),
              ...(isError && {
                color: "error.main",
                bgcolor: "error.lighter",
              }),
            }}
          >
            <Image />

            <Typography variant="caption">
              {file ? "Update photo" : "Upload photo"}
            </Typography>
          </StyledPlaceholder>
        </StyledDropZone>

        {hasFile && (
          <>
            <StyledOptionButton size="small" onClick={onCrop} setval={13}>
              <Pen />
            </StyledOptionButton>

            <StyledOptionButton size="small" onClick={onRemove} setval={0.5}>
              <Trash />
            </StyledOptionButton>
          </>
        )}
      </StyledDropZoneContainer>

      {helperText && helperText}
    </Container>
  );
}
