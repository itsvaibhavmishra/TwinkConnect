import { forwardRef, useEffect, useState } from "react";
import ThemeSettings from "./components/settings";
import Router from "./routes";
import ThemeProvider from "./theme";

import { Slide, Snackbar, useTheme, useMediaQuery } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

import { useDispatch, useSelector } from "react-redux";
import { HideSnackbar } from "./redux/slices/userSlice";
import HelmetHandler from "./utils/helmetHandler";

import ReactGA from "react-ga4";

if (process.env.REACT_APP_GA_ID !== "") {
  ReactGA.initialize(process.env.REACT_APP_GA_ID);
}

const vertical = "top";
const horizontal = "right";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SlideTransition(props) {
  // breakpoint
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return <Slide {...props} direction={isSmallScreen ? "down" : "left"} />;
}

function App() {
  // breakpoint
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  // from redux
  const { open, message, severity } = useSelector(
    (state) => state.user.snackbar
  );

  // use dispatch
  const dispatch = useDispatch();

  // Local state to manage Snackbar visibility
  const [localOpen, setLocalOpen] = useState(false);

  // Effect to synchronize localOpen with the global open state
  useEffect(() => {
    setLocalOpen(open);
  }, [open]);

  // Handler for Snackbar close
  const handleCloseSnackbar = () => {
    setLocalOpen(false); // Hide Snackbar with local state
    setTimeout(() => {
      dispatch(HideSnackbar()); // Dispatch action after delay
    }, 300);
  };

  return (
    <>
      <ThemeProvider>
        <ThemeSettings>
          <Router />
        </ThemeSettings>
      </ThemeProvider>

      <HelmetHandler />

      {/* snackbar from mui */}
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: isSmallScreen ? "center" : "right",
        }}
        open={localOpen}
        autoHideDuration={5000}
        key={vertical + horizontal}
        onClose={handleCloseSnackbar}
        TransitionComponent={SlideTransition}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
