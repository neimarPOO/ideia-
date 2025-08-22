import React, { useState } from 'react';

function AISuggestions({ onBackClick, user }) {
  const [prompt, setPrompt] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateSuggestion = async () => {
    if (!user) {
      setError('Você precisa estar logado para gerar sugestões.');
      return;
    }
    if (!prompt.trim()) {
      setError('Por favor, digite um prompt.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuggestion('');

    try {
      const idToken = await user.getIdToken();
      const response = await fetch('http://localhost:3001/ideas/suggest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`,
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSuggestion(data.suggestion);
    } catch (err) {
      console.error('Erro ao gerar sugestão:', err);
      setError('Erro ao gerar sugestão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container ai-suggestions-container">
      <img src="/logo.png" alt="Ideia+ Logo" className="logo logo-small" />
      <button className="back-button" onClick={onBackClick}>Voltar</button>
      <h2>Sugestões da IA</h2>

      <div className="form-container">
        <textarea
          placeholder="Descreva o que você quer que a IA sugira (ex: 'ideias para um aplicativo de meditação', 'como expandir minha ideia de rede social para pets')..."
          rows="5"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          required
        ></textarea>
        <button onClick={handleGenerateSuggestion} disabled={loading}>
          {loading ? 'Gerando...' : 'Gerar Sugestão'}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {suggestion && (
        <div className="suggestions-section">
          <h3>Sugestão Gerada:</h3>
          <p>{suggestion}</p>
        </div>
      )}

      {/* Placeholders for other sections, can be removed or adapted later */}
      <div className="suggestions-section">
        <h3>Expansões das suas ideias</h3>
        <div className="suggestion-item">
          <p>Sua ideia sobre [Tópico] pode ser expandida para [Nova Aplicação]. (placeholder)</p>
          <div className="button-group">
            <button>Salvar</button>
            <button>Descartar</button>
          </div>
        </div>
      </div>

      <div className="suggestions-section">
        <h3>Novas conexões sugeridas</h3>
        <div className="suggestion-item">
          <p>Sua ideia A e sua ideia B podem se conectar para formar C. (placeholder)</p>
          <div className="button-group">
            <button>Salvar</button>
            <button>Descartar</button>
          </div>
        </div>
      </div>

      <div className="suggestions-section">
        <h3>Inspiração externa</h3>
        <div className="suggestion-item">
          <p>Confira este artigo/vídeo sobre [Tópico Relacionado]. (placeholder)</p>
          <div className="button-group">
            <button>Salvar</button>
            <button>Descartar</button>
            <button>Compartilhar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AISuggestions;

