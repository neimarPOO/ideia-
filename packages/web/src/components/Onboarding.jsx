import React from 'react';
import { Button, Typography, Box } from '@mui/material'; // Import Material-UI components

function Onboarding({ onRegisterClick, onLoginClick }) {
  return (
    <Box
      className="onboarding-container handsdraw-border" // Added handsdraw-border class
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh', // Ensure it takes full viewport height
        padding: 2,
        textAlign: 'center',
      }}
    >
      {/* Placeholder for animated logo */}
      <Typography variant="h1" component="h1" gutterBottom>
        Ideia+
      </Typography>
      <Typography variant="h5" component="p" gutterBottom>
        Toda grande ideia começa com um rabisco.
      </Typography>
      <Box
        className="onboarding-buttons"
        sx={{
          mt: 4, // Margin top
          '& > button': {
            margin: 1, // Margin between buttons
          },
        }}
      >
        <Button variant="contained" color="primary" onClick={onRegisterClick}>
          Criar conta
        </Button>
        <Button variant="outlined" color="primary" onClick={onLoginClick}>
          Entrar
        </Button>
      </Box>
    </Box>
  );
}

export default Onboarding;