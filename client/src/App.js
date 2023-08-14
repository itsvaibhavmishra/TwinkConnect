import React, { useState, useEffect } from "react";
import Router from "./routes";
import ThemeProvider from "./theme";
import ThemeSettings from "./components/settings";
import { Slide, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { HideSnackbar } from "./redux/slices/app";

const vertical = "top";
const horizontal = "right";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

function App() {
  // from redux
  const { open, message, severity } = useSelector(
    (state) => state.app.snackbar
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
          {" "}
          <Router />{" "}
        </ThemeSettings>
      </ThemeProvider>

      {/* snackbar from mui */}
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
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
