import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Paper } from '@mui/material'; // Import Material-UI components

function CreateIdea({ onCreateIdeaSuccess }) {
  const [ideaText, setIdeaText] = useState('');
  const [message, setMessage] = useState('');
  const [audioRecording, setAudioRecording] = useState(false); // Placeholder for audio recording state
  const [drawingMode, setDrawingMode] = useState(false); // Placeholder for drawing mode state

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage('');
    // In a real application, you would send this idea to the backend
    console.log('Idea submitted:', ideaText);
    setMessage('Idea submitted successfully!');
    if (onCreateIdeaSuccess) {
      onCreateIdeaSuccess();
    }
    setIdeaText(''); // Clear the input
  };

  // Placeholder functions for audio and drawing
  const toggleAudioRecording = () => {
    setAudioRecording(!audioRecording);
    setMessage(audioRecording ? 'Gravação de áudio parada.' : 'Gravando áudio...');
  };

  const toggleDrawingMode = () => {
    setDrawingMode(!drawingMode);
    setMessage(drawingMode ? 'Modo de desenho desativado.' : 'Modo de desenho ativado.');
  };

  const generateImage = () => {
    setMessage('Gerando imagem com IA...');
    // Simulate AI processing
    setTimeout(() => {
      setMessage('Imagem gerada!');
    }, 1500);
  };

  const expandIdea = () => {
    setMessage('Expandindo ideia com IA...');
    // Simulate AI processing
    setTimeout(() => {
      setMessage('Ideia expandida!');
    }, 1500);
  };

  return (
    <Box
      className="create-idea-container handsdraw-border" // Apply handsdraw-border
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 3,
        maxWidth: 600,
        margin: 'auto',
        mt: 5,
      }}
    >
      <Typography variant="h4" component="h2" gutterBottom>
        Criar Nova Ideia
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <TextField
          label="Sua Ideia (Texto)"
          multiline
          rows={5}
          value={ideaText}
          onChange={(e) => setIdeaText(e.target.value)}
          placeholder="Digite sua ideia aqui..."
          fullWidth
          margin="normal"
          required
        />

        <Typography variant="h5" component="h3" sx={{ mt: 3 }}>
          Opções de Entrada:
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
          <Button variant="outlined" onClick={toggleAudioRecording}>
            {audioRecording ? 'Parar Gravação' : 'Gravar Áudio'}
          </Button>
          {audioRecording && <Typography variant="body2">Gravando... (placeholder para transcrição)</Typography>}
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button variant="outlined" onClick={toggleDrawingMode}>
            {drawingMode ? 'Sair do Desenho' : 'Desenhar Ideia'}
          </Button>
          {drawingMode && (
            <Paper
              className="handsdraw-border" // Apply handsdraw-border
              sx={{
                border: '1px solid black',
                width: '100%',
                height: '200px',
                mt: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography variant="body2">Quadro de Desenho (placeholder)</Typography>
            </Paper>
          )}
        </Box>

        <Typography variant="h5" component="h3" sx={{ mt: 3 }}>
          Recursos de IA:
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2">Tags Automáticas Sugeridas: (placeholder)</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button variant="outlined" onClick={generateImage}>
            Gerar Imagem
          </Button>
          <Button variant="outlined" onClick={expandIdea}>
            Expandir Ideia
          </Button>
        </Box>

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
          Salvar Ideia
        </Button>
      </form>
      {message && (
        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
    </Box>
  );
}

export default CreateIdea;