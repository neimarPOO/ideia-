import React from 'react';
import { Button, Typography, Box, Paper } from '@mui/material'; // Import Material-UI components

function Home({ onCreateIdeaClick, onIdeaClick, onAISuggestionsClick, onProfileSettingsClick }) {
  // Dummy idea data for demonstration
  const dummyIdea = {
    id: '1',
    title: 'Minha Primeira Ideia',
    text: 'Esta é a descrição da minha primeira ideia. É um conceito inovador para um aplicativo de organização de tarefas.',
    imageUrl: 'https://via.placeholder.com/300x200?text=Minha+Ideia',
  };

  return (
    <Box
      className="home-container"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 3,
      }}
    >
      <Typography variant="h4" component="h2" gutterBottom>
        Painel de Ideias
      </Typography>

      <Paper
        className="idea-list-grid-placeholder handsdraw-border" // Apply handsdraw-border
        sx={{
          width: '100%',
          padding: 2,
          mt: 2,
          mb: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="body1">Suas ideias aparecerão aqui.</Typography>
        <Box
          sx={{
            border: '1px solid #ccc',
            padding: '10px',
            margin: '10px',
            cursor: 'pointer',
          }}
          onClick={() => onIdeaClick(dummyIdea)} // Call onIdeaClick with dummy data
        >
          <h3>{dummyIdea.title}</h3>
          <p>{dummyIdea.text.substring(0, 50)}...</p>
        </Box>
      </Paper>

      <Paper
        className="filters-placeholder handsdraw-border" // Apply handsdraw-border
        sx={{
          width: '100%',
          padding: 2,
          mt: 2,
          mb: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="body1">Filtros: Tags | Data | Relevância</Typography>
      </Paper>

      <Paper
        className="ai-suggestions-carousel-placeholder handsdraw-border" // Apply handsdraw-border
        sx={{
          width: '100%',
          padding: 2,
          mt: 2,
          mb: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="body1">Sugestões da IA: Quer expandir sua ideia X?</Typography>
        <Button variant="outlined" onClick={onAISuggestionsClick} sx={{ mt: 1 }}>
          Ver Sugestões da IA
        </Button>
      </Paper>

      <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
        <Button variant="contained" color="primary" onClick={onCreateIdeaClick}>
          +
        </Button>
        <Button variant="outlined" onClick={onProfileSettingsClick}>
          Perfil / Configurações
        </Button>
      </Box>
    </Box>
  );
}

export default Home;