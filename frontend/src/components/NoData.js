import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const NoData = ({ label = "No Data found" }) => {
  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <Stack
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Typography variant="body2">{label}</Typography>
      </Stack>
    </Box>
  );
};
export default NoData;
