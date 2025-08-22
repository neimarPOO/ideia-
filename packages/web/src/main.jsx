import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider, createTheme } from '@mui/material/styles'; // Import ThemeProvider and createTheme
import CssBaseline from '@mui/material/CssBaseline'; // Import CssBaseline
import './firebaseConfig'; // Import Firebase configuration

// Define a custom theme
const theme = createTheme({
  palette: {
    background: {
      default: '#89CFF0', // Set default background to baby blue
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#89CFF0', // Ensure body background is baby blue
        },
      },
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* CssBaseline to kickstart an elegant, consistent, and simple baseline to build upon. */}
      <App />
    </ThemeProvider>
  </StrictMode>,
)
