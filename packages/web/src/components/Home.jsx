import React, { useState, useEffect } from 'react';

function Home({ onCreateIdeaClick, onIdeaClick, onAISuggestionsClick, onProfileSettingsClick, onLogout, user }) {
  const [ideas, setIdeas] = useState([]);
  const [loadingIdeas, setLoadingIdeas] = useState(true);
  const [ideasError, setIdeasError] = useState(null);

  useEffect(() => {
    const fetchIdeas = async () => {
      if (!user) {
        setLoadingIdeas(false);
        setIdeas([]);
        return;
      }

      setLoadingIdeas(true);
      setIdeasError(null);
      try {
        const idToken = await user.getIdToken();
        const response = await fetch('http://localhost:3001/ideas', {
          headers: {
            'Authorization': `Bearer ${idToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setIdeas(data);
      } catch (error) {
        console.error('Erro ao buscar ideias:', error);
        setIdeasError('Erro ao carregar suas ideias.');
      } finally {
        setLoadingIdeas(false);
      }
    };

    fetchIdeas();
  }, [user]);

  return (
    <div className="container home-container">
      <img src="/logo.png" alt="Ideia+ Logo" className="logo logo-small" />
      <h2>Painel de Ideias</h2>

      <div className="idea-list-placeholder">
        {loadingIdeas && <p>Carregando ideias...</p>}
        {ideasError && <p className="error-message">{ideasError}</p>}
        {!loadingIdeas && !ideasError && ideas.length === 0 && (
          <p>Você ainda não tem ideias. Que tal criar uma?</p>
        )}
        {ideas.map((idea) => (
          <div className="idea-card" key={idea.id} onClick={() => onIdeaClick(idea)}>
            <h3>{idea.title}</h3>
            <p>{idea.text.substring(0, 100)}...</p>
          </div>
        ))}
      </div>

      <div className="filters-placeholder">
        <p>Filtros: Tags | Data | Relevância</p>
      </div>

      <div className="ai-suggestions-placeholder">
        <p>Sugestões da IA: Quer expandir sua ideia X?</p>
        <button onClick={onAISuggestionsClick}>Ver Sugestões da IA</button>
      </div>

      <div className="button-group">
        <button onClick={onProfileSettingsClick}>Perfil</button>
        <button onClick={onLogout}>Sair</button>
      </div>

      <button className="fab" onClick={onCreateIdeaClick}>+</button>
    </div>
  );
}

export default Home;

