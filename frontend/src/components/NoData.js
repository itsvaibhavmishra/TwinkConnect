import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

const NoData = ({ label = "No Data found", children }) => {
  return (
    <Grid
      container
      direction="column"
      height="60vh"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item sx={{ mb: 5 }}>
        {/* icon */}
        {children}
      </Grid>
      <Divider />
      <Grid item>
        {/* label */}
        <Typography variant="body2">{label}</Typography>
      </Grid>
    </Grid>
  );
};
export default NoData;
