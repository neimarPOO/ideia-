import React, { useState, useEffect } from 'react';
import CreateIdea from './CreateIdea';

function Home({ onIdeaClick, onLogout, user }) {
  const [ideas, setIdeas] = useState([]);
  const [loadingIdeas, setLoadingIdeas] = useState(true);
  const [ideasError, setIdeasError] = useState(null);

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

  useEffect(() => {
    fetchIdeas();
  }, [user]);

  const handleIdeaCreated = (newIdea) => {
    setIdeas([newIdea, ...ideas]);
  };

  return (
    <div className="container home-container">
      <img src="/logo.png" alt="Ideia+ Logo" className="logo logo-small" />
      <h2>Painel de Ideias</h2>

      <CreateIdea onIdeaCreated={handleIdeaCreated} user={user} />

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

      <div className="button-group">
        <button onClick={onLogout}>Sair</button>
      </div>
    </div>
  );
}

export default Home;

