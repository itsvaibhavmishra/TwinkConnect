import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Stack,
  Typography,
  Button,
  Slider,
} from "@mui/material";
import { XCircle } from "phosphor-react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage";

const AvatarCropper = ({ open, handleClose, image, onUse }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const getCroppedImgURL = async () => {
    try {
      const croppedImage = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation
      );
      onUse(croppedImage);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth={"xs"}
      aria-labelledby="responsive-dialog-title"
      keepMounted
      sx={{ p: 4 }}
    >
      {/* Header for Dialog */}
      <DialogTitle sx={{ mb: 3 }} id="responsive-dialog-title">
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          mb={1}
        >
          <Typography variant="h5" textAlign={"center"} p={1.5}>
            Make your Avatar
          </Typography>
          {/* Close Button */}
          <IconButton onClick={handleClose}>
            <XCircle weight="fill" />
          </IconButton>
        </Stack>
        <Stack justifyContent={"center"} alignItems={"center"}></Stack>
      </DialogTitle>

      {/* Form */}
      <DialogContent
        sx={{ overflowY: "scroll", height: "25rem", position: "relative" }}
        className="scrollbar"
      >
        <Cropper
          image={image}
          crop={crop}
          cropShape="round"
          rotation={rotation}
          zoom={zoom}
          aspect={1 / 1}
          onCropChange={setCrop}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </DialogContent>
      <DialogActions>
        <Stack
          justifyContent={"space-between"}
          sx={{ flexGrow: 1 }}
          direction={"column"}
        >
          {/* Cropper Actions */}
          <Stack direction={"column"} justifyContent={"flex-start"}>
            <div>
              <Typography variant="overline">Zoom</Typography>
              <Slider
                value={zoom}
                min={1}
                max={8}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(e, zoom) => setZoom(zoom)}
              />
            </div>
            <div>
              <Typography variant="overline">Rotation</Typography>
              <Slider
                value={rotation}
                min={0}
                max={360}
                step={90}
                aria-labelledby="Rotation"
                onChange={(e, rotation) => setRotation(rotation)}
              />
            </div>
          </Stack>
          {/* Main Actions */}
          <Stack direction={"row"} spacing={1} justifyContent={"flex-end"}>
            <Button autoFocus onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={getCroppedImgURL} autoFocus>
              Confirm
            </Button>
          </Stack>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default AvatarCropper;
