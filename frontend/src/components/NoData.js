import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import Lottie from "react-lottie";
import * as SearchNotFound from "../assets/Illustration/SearchNotFound.json";

const NoData = ({ label = "No Data found" }) => {
  return (
    <Grid
      container
      direction="column"
      height="60vh"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item sx={{ mb: 5 }}>
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: SearchNotFound,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice",
            },
          }}
          isClickToPauseDisabled={true}
        />
      </Grid>
      <Divider />
      <Grid item>
        <Typography variant="body2">{label}</Typography>
      </Grid>
    </Grid>
  );
};
export default NoData;
