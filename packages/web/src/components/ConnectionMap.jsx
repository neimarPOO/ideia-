import React from 'react';
import { Button, Typography, Box, Paper } from '@mui/material'; // Import Material-UI components

function ConnectionMap({ onBackClick }) {
  return (
    <Box
      className="connection-map-container handsdraw-border" // Apply handsdraw-border
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 3,
        maxWidth: 800,
        margin: 'auto',
        mt: 5,
      }}
    >
      <Button variant="outlined" onClick={onBackClick} sx={{ alignSelf: 'flex-start', mb: 2 }}>
        Voltar
      </Button>
      <Typography variant="h4" component="h2" gutterBottom>
        Mapa de Conexões
      </Typography>
      <Paper
        className="handsdraw-border" // Apply handsdraw-border
        sx={{
          border: '1px solid #ccc',
          height: '400px',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mb: 2,
        }}
      >
        {/* Placeholder for interactive network visualization */}
        <Typography variant="body1">Visualização de Rede Interativa de Ideias (placeholder)</Typography>
      </Paper>
      {/* Placeholders for interactivity: Zoom, Drag, Click */}
      <Typography variant="body2" color="textSecondary">
        Interatividade: Zoom in/out, Arrastar e reorganizar bolhas, Clicar em uma ideia (placeholders)
      </Typography>
    </Box>
  );
}

export default ConnectionMap;