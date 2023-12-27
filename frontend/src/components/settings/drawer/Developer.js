import { Box, Stack, Avatar, Typography, Button, alpha } from "@mui/material";

export default function Developer() {
  const openLinkInNewTab = () => {
    window.open("https://vaibhaw.netlify.app/", "_blank");
  };

  return (
    <Box width={"100%"} component={Button} onClick={openLinkInNewTab}>
      <Stack direction={"column"} alignItems={"center"} spacing={2}>
        <Avatar
          src="https://vaibhaw.netlify.app/img/favicon.ico"
          alt={"VaibhawMishra"}
          sx={{
            width: 80,
            height: 80,
            p: 1,
            border: (theme) =>
              `1px dashed ${alpha(theme.palette.grey[500], 1)}`,
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
        <Typography
          variant="caption"
          sx={{ color: (theme) => theme.palette.text.primary }}
        >
          Developed by Vaibhaw Mishra
        </Typography>
      </Stack>
    </Box>
  );
}
