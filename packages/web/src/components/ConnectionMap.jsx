import React from 'react';

function ConnectionMap({ onBackClick, user }) {
  return (
    <div className="container connection-map-container">
      <img src="/logo.png" alt="Ideia+ Logo" className="logo logo-small" />
      <button className="back-button" onClick={onBackClick}>Voltar</button>
      <h2>Mapa de Conexões</h2>
      <div className="connection-map-placeholder">
        <p>Visualização de Rede Interativa de Ideias (placeholder)</p>
      </div>
      <p className="text-muted">
        Interatividade: Zoom in/out, Arrastar e reorganizar bolhas, Clicar em uma ideia (placeholders)
      </p>
    </div>
  );
}

export default ConnectionMap;

