// Import necessary font styles for consistent typography
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './css/custom-scrollbar.css' 
// Import MUI components for global styling and theming
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Import custom components and pages
import AppLayout from './components/layout/AppLayout';
import AuthLayout from './components/layout/AuthLayout';
import Home from './components/pages/Home';
import Board from './components/pages/Board';
import Signup from './components/pages/Signup';
import Login from './components/pages/Login';

/**
 * Main application component.
 * Wraps the app in a MUI ThemeProvider with a custom theme and includes global CSS baseline.
 *
 * @returns {JSX.Element} The wrapped application with a dark theme and configured routes.
 */
function App() {
  // Define a custom theme using MUI's createTheme function
  const theme = createTheme({
    palette: {
      mode: 'dark', // Sets the theme to dark mode
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* Authentication Layout for Login and Signup */}
          <Route path="/" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>

          {/* Main Application Layout */}
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="board" element={<Home />} />
            <Route path="board/:boardId" element={<Board />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
