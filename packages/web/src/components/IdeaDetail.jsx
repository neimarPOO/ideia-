import React from 'react';
import { Button, Typography, Box, Paper } from '@mui/material'; // Import Material-UI components

function IdeaDetail({ idea, onConnectIdeaClick, onBackClick }) {
  // Placeholder data if no idea is provided (for initial rendering/testing)
  const defaultIdea = {
    title: "Minha Ideia Incrível",
    text: "Esta é uma descrição detalhada da minha ideia incrível. Ela tem o potencial de revolucionar o mundo!",
    imageUrl: "https://via.placeholder.com/300x200?text=Imagem+da+Ideia", // Placeholder image
  };

  const currentIdea = idea || defaultIdea;

  return (
    <Box
      className="idea-detail-container handsdraw-border" // Apply handsdraw-border
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
        {currentIdea.title}
      </Typography>
      <Typography variant="body1" paragraph>
        {currentIdea.text}
      </Typography>
      <Box sx={{ mb: 3 }}>
        <img src={currentIdea.imageUrl} alt="Imagem da Ideia" style={{ maxWidth: '100%', height: 'auto', border: '2px solid #333', boxShadow: '2px 2px 0px 0px rgba(0,0,0,0.75)' }} />
      </Box>

      <Typography variant="h5" component="h3" gutterBottom>
        Sugestões da IA:
      </Typography>

      <Paper className="handsdraw-border" sx={{ p: 2, mb: 2, width: '100%' }}>
        <Typography variant="h6" component="h4">
          Extensões Criativas:
        </Typography>
        <ul>
          <Typography component="li" variant="body2">E se aplicarmos isso na educação? (placeholder)</Typography>
          <Typography component="li" variant="body2">Como isso pode ser usado em outro setor? (placeholder)</Typography>
        </ul>
      </Paper>

      <Paper className="handsdraw-border" sx={{ p: 2, mb: 2, width: '100%' }}>
        <Typography variant="h6" component="h4">
          Conexões Internas:
        </Typography>
        <ul>
          <Typography component="li" variant="body2">Essa ideia se conecta com a ideia X e Y que você já registrou. (placeholder)</Typography>
        </ul>
      </Paper>

      <Paper className="handsdraw-border" sx={{ p: 2, mb: 3, width: '100%' }}>
        <Typography variant="h6" component="h4">
          Sugestões Externas:
        </Typography>
        <ul>
          <Typography component="li" variant="body2">Vídeos, artigos, apps relacionados. (placeholder)</Typography>
        </ul>
      </Paper>

      <Button variant="contained" color="primary" onClick={onConnectIdeaClick}>
        Conectar com outra ideia
      </Button>
    </Box>
  );
}

export default IdeaDetail;