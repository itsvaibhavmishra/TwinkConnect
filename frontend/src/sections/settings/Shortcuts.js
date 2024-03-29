import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

const list = [
  {
    key: 0,
    title: "Mark as unread",
    combination: ["Ctrl", "Shift", "U"],
  },
  {
    key: 1,
    title: "Mute Chat",
    combination: ["Ctrl", "Shift", "M"],
  },
  {
    key: 2,
    title: "Archive Chat",
    combination: ["Ctrl", "Shift", "E"],
  },
  {
    key: 3,
    title: "Delete Chat",
    combination: ["Ctrl", "Shift", "D"],
  },
  {
    key: 4,
    title: "Pin Chat",
    combination: ["Ctrl", "Shift", "P"],
  },
  {
    key: 5,
    title: "Search",
    combination: ["Ctrl", "F"],
  },
  {
    key: 6,
    title: "Search Chat",
    combination: ["Ctrl", "Shift", "F"],
  },
  {
    key: 7,
    title: "Next Chat",
    combination: ["Ctrl", "N"],
  },
  {
    key: 8,
    title: "Next Step",
    combination: ["Ctrl", "Tab"],
  },
  {
    key: 9,
    title: "Previous Step",
    combination: ["Ctrl", "Shift", "Tab"],
  },
  {
    key: 10,
    title: "New Group",
    combination: ["Ctrl", "Shift", "N"],
  },
  {
    key: 11,
    title: "Profile & About",
    combination: ["Ctrl", "P"],
  },
  {
    key: 12,
    title: "Increase speed of voice message",
    combination: ["Shift", "."],
  },
  {
    key: 13,
    title: "Decrease speed of voice message",
    combination: ["Shift", ","],
  },
  {
    key: 14,
    title: "Settings",
    combination: ["Shift", "S"],
  },
  {
    key: 15,
    title: "Emoji Panel",
    combination: ["Ctrl", "E"],
  },
  {
    key: 16,
    title: "Sticker Panel",
    combination: ["Ctrl", "S"],
  },
];

const Shortcuts = ({ open, handleClose, theme }) => {
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
      <DialogContent sx={{ mt: 4, height: "100%" }} className="scrollbar">
        <Grid container spacing={3}>
          {list.map(({ key, title, combination }) => (
            <Grid item xs={6} container key={key}>
              <Stack
                direction={"row"}
                alignItems={"center"}
                spacing={3}
                sx={{ width: "100%" }}
                justifyContent={"space-between"}
              >
                <Typography variant="caption" sx={{ fontSize: 14 }}>
                  {title}
                </Typography>
                <Stack direction={"row"} spacing={2}>
                  {combination.map((e, index) => {
                    return (
                      <Button
                        key={index}
                        sx={{
                          p: 0.2,
                          color:
                            theme.palette.mode === "light"
                              ? "#454545"
                              : "#FFFC",
                          backgroundColor: "#919eab33",
                          cursor: "default",
                        }}
                      >
                        {e}
                      </Button>
                    );
                  })}
                </Stack>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose}>
          Got It!
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Shortcuts;
