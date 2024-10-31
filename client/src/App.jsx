// Import necessary font styles for consistent typography
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Import MUI components for global styling and theming
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

/**
 * Main application component.
 * Wraps the app in a MUI ThemeProvider with a custom theme and includes global CSS baseline.
 *
 * @returns {JSX.Element} The wrapped application with a dark theme.
 */
function App() {
  // Define a custom theme using MUI's createTheme function
  const theme = createTheme({
    palette: {
      mode: 'dark',  // Sets the theme to dark mode
    },
  });

  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline provides a consistent baseline for styles */}
      <CssBaseline />
      {/* Main application content */}
      Taskifier
    </ThemeProvider>
  );
}

export default App;
