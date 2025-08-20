import React from 'react';
import { Button, Typography, Box, Paper } from '@mui/material'; // Import Material-UI components

function AISuggestions({ onBackClick }) {
  return (
    <Box
      className="ai-suggestions-container handsdraw-border" // Apply handsdraw-border
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
        Sugestões da IA
      </Typography>

      <Paper className="handsdraw-border" sx={{ p: 2, mb: 3, width: '100%' }}>
        <Typography variant="h5" component="h3" gutterBottom>
          Expansões das suas ideias
        </Typography>
        <Box className="suggestion-item" sx={{ mb: 2 }}>
          <Typography variant="body1">Sua ideia sobre [Tópico] pode ser expandida para [Nova Aplicação]. (placeholder)</Typography>
          <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
            <Button variant="outlined" size="small">Salvar</Button>
            <Button variant="outlined" size="small">Descartar</Button>
          </Box>
        </Box>
      </Paper>

      <Paper className="handsdraw-border" sx={{ p: 2, mb: 3, width: '100%' }}>
        <Typography variant="h5" component="h3" gutterBottom>
          Novas conexões sugeridas
        </Typography>
        <Box className="suggestion-item" sx={{ mb: 2 }}>
          <Typography variant="body1">Sua ideia A e sua ideia B podem se conectar para formar C. (placeholder)</Typography>
          <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
            <Button variant="outlined" size="small">Salvar</Button>
            <Button variant="outlined" size="small">Descartar</Button>
          </Box>
        </Box>
      </Paper>

      <Paper className="handsdraw-border" sx={{ p: 2, mb: 3, width: '100%' }}>
        <Typography variant="h5" component="h3" gutterBottom>
          Inspiração externa
        </Typography>
        <Box className="suggestion-item" sx={{ mb: 2 }}>
          <Typography variant="body1">Confira este artigo/vídeo sobre [Tópico Relacionado]. (placeholder)</Typography>
          <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
            <Button variant="outlined" size="small">Salvar</Button>
            <Button variant="outlined" size="small">Descartar</Button>
            <Button variant="outlined" size="small">Compartilhar</Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default AISuggestions;