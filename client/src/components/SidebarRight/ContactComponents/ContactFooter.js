import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { Prohibit, Trash } from "phosphor-react";
import { faker } from "@faker-js/faker";
import React, { useState } from "react";

const BlockDialog = ({ open, handleClose, dialogText }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{dialogText}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to {dialogText.toLowerCase()} this{" "}
          {dialogText === "Block" ? "contact" : "chat"}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleClose} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Footer = () => {
  const [open, setOpen] = useState(false);
  const [dialogText, setDialogText] = useState("");

  const handleClickOpen = (text) => {
    setOpen(true);
    setDialogText(text);
  };

  const handleClose = () => {
    setOpen(false);
    setDialogText("");
  };

  return (
    <Stack spacing={3}>
      <Stack spacing={2}>
        <Typography variant="body2">1 group in common</Typography>
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <Avatar src={faker.image.avatar()} alt={faker.name.fullName()} />
          <Stack spacing={0.5}>
            <Typography variant="subtitle2">Friend's Group</Typography>
            <Typography variant="caption">Vipu, Dhananjay, You</Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack direction={"row"} alignItems={"center"} spacing={2}>
        <Button
          startIcon={<Prohibit />}
          fullWidth
          variant="outlined"
          onClick={() => {
            handleClickOpen("Block");
          }}
        >
          Block
        </Button>
        <Button
          startIcon={<Trash />}
          fullWidth
          variant="outlined"
          onClick={() => {
            handleClickOpen("Delete");
          }}
        >
          Delete
        </Button>
      </Stack>
      {/* rendering dialog */}
      {open && (
        <BlockDialog
          open={open}
          handleClose={handleClose}
          dialogText={dialogText}
        />
      )}
    </Stack>
  );
};

export default Footer;
