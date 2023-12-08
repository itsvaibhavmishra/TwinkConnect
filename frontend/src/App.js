import ThemeSettings from "./components/settings";
import Router from "./routes";
import ThemeProvider from "./theme";

function App() {
  return (
    <ThemeProvider>
      <ThemeSettings>
        {" "}
        <Router />{" "}
      </ThemeSettings>
    </ThemeProvider>
  );
}

export default App;
