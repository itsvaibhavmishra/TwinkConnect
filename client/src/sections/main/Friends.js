import { Dialog, DialogContent, Stack, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";

const Friends = ({ open, toggleDialog }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Dialog
      open={open}
      onClose={toggleDialog}
      fullWidth
      maxWidth={"xs"}
      aria-labelledby="responsive-dialog-title"
      keepMounted
      sx={{ p: 4 }}
    >
      {/* Header tabs for Dialog */}
      <Stack p={2} sx={{ width: "100%" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Explore" />
          <Tab label="Friends" />
          <Tab label="Requests" />
        </Tabs>
      </Stack>

      {/* Listing items */}
      <DialogContent
        sx={{ overflowY: "scroll", maxHeight: "25rem" }}
        className="scrollbar"
      ></DialogContent>
    </Dialog>
  );
};

export default Friends;
