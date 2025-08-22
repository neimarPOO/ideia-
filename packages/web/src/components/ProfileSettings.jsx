import React from 'react';

function ProfileSettings({ onBackClick, user, onLogout }) {
  return (
    <div className="container profile-settings-container">
      <img src="/logo.png" alt="Ideia+ Logo" className="logo logo-small" />
      <button className="back-button" onClick={onBackClick}>Voltar</button>
      <h2>Perfil e Configurações</h2>

      {user && (
        <div className="settings-section">
          <h3>Informações do Usuário</h3>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>UID:</strong> {user.uid}</p>
          <button onClick={onLogout}>Sair da Conta</button>
        </div>
      )}

      <div className="settings-section">
        <h3>Personalização</h3>
        <p>Opções de cores/tema (placeholder)</p>
      </div>

      <div className="settings-section">
        <h3>Gerenciamento de Conta</h3>
        <p>Gerenciar conta e sincronização em nuvem (placeholder)</p>
      </div>

      <div className="settings-section">
        <h3>Estatísticas</h3>
        <ul>
          <li>Número de ideias criadas: (placeholder)</li>
          <li>Conexões feitas: (placeholder)</li>
          <li>Insights gerados: (placeholder)</li>
        </ul>
      </div>

      <div className="settings-section">
        <h3>Badges Gamificados</h3>
        <ul>
          <li>Conector de Ideias (placeholder)</li>
          <li>Explorador Criativo (placeholder)</li>
        </ul>
      </div>
    </div>
  );
}

export default ProfileSettings;

