import { Dialog, DialogTitle } from '@mui/material';
import React from 'react';

const Shortcuts = ({ open, handleClose }) => {
  return (
    <Dialog
      fullWidth
      maxWidth="md"
      keepMounted
      sx={{ p: 4 }}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Keyboard Shortcuts</DialogTitle>
    </Dialog>
  );
};

export default Shortcuts;
