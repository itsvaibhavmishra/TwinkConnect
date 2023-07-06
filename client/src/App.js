import Router from './routes';
import ThemeProvider from './theme';
import ThemeSettings from './components/settings';

function App() {
  return (
    <ThemeProvider>
      <ThemeSettings>
        {' '}
        <Router />{' '}
      </ThemeSettings>
    </ThemeProvider>
  );
}

export default App;
