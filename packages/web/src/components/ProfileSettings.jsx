import React from 'react';
import { Button, Typography, Box, Paper, List, ListItem, ListItemText } from '@mui/material'; // Import Material-UI components

function ProfileSettings({ onBackClick }) {
  return (
    <Box
      className="profile-settings-container handsdraw-border" // Apply handsdraw-border
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
        Perfil e Configurações
      </Typography>

      <Paper className="handsdraw-border" sx={{ p: 2, mb: 3, width: '100%' }}>
        <Typography variant="h5" component="h3" gutterBottom>
          Personalização
        </Typography>
        <Typography variant="body1">Opções de cores/tema (placeholder)</Typography>
      </Paper>

      <Paper className="handsdraw-border" sx={{ p: 2, mb: 3, width: '100%' }}>
        <Typography variant="h5" component="h3" gutterBottom>
          Gerenciamento de Conta
        </Typography>
        <Typography variant="body1">Gerenciar conta e sincronização em nuvem (placeholder)</Typography>
      </Paper>

      <Paper className="handsdraw-border" sx={{ p: 2, mb: 3, width: '100%' }}>
        <Typography variant="h5" component="h3" gutterBottom>
          Estatísticas
        </Typography>
        <List>
          <ListItem disablePadding>
            <ListItemText primary="Número de ideias criadas: (placeholder)" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Conexões feitas: (placeholder)" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Insights gerados: (placeholder)" />
          </ListItem>
        </List>
      </Paper>

      <Paper className="handsdraw-border" sx={{ p: 2, mb: 3, width: '100%' }}>
        <Typography variant="h5" component="h3" gutterBottom>
          Badges Gamificados
        </Typography>
        <List>
          <ListItem disablePadding>
            <ListItemText primary="Conector de Ideias (placeholder)" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary="Explorador Criativo (placeholder)" />
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
}

export default ProfileSettings;