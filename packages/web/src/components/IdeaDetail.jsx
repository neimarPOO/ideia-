import React, { useState, useEffect } from 'react';

function IdeaDetail({ idea, onConnectIdeaClick, onBackClick, user }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(idea.title);
  const [editedText, setEditedText] = useState(idea.text);
  const [message, setMessage] = useState('');
  const [expandedIdea, setExpandedIdea] = useState('');
  const [creativeExtensions, setCreativeExtensions] = useState('');
  const [internalConnections, setInternalConnections] = useState('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState(idea.imageUrl || 'https://via.placeholder.com/300x200?text=Imagem+da+Ideia');
  const [loadingAI, setLoadingAI] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!user) {
      setMessage('Você precisa estar logado para editar uma ideia.');
      return;
    }

    try {
      const idToken = await user.getIdToken();
      const response = await fetch(`http://localhost:3001/ideas/${idea.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`,
        },
        body: JSON.stringify({ title: editedTitle, text: editedText }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setMessage('Ideia atualizada com sucesso!');
      setIsEditing(false);
      // Optionally, update the idea prop in the parent component or refetch ideas
    } catch (error) {
      console.error('Erro ao salvar ideia:', error);
      setMessage(`Erro ao salvar ideia: ${error.message}`);
    }
  };

  const handleDelete = async () => {
    if (!user) {
      setMessage('Você precisa estar logado para deletar uma ideia.');
      return;
    }

    if (!window.confirm('Tem certeza que deseja deletar esta ideia?')) {
      return;
    }

    try {
      const idToken = await user.getIdToken();
      const response = await fetch(`http://localhost:3001/ideas/${idea.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${idToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setMessage('Ideia deletada com sucesso!');
      onBackClick(); // Go back to the idea list
    } catch (error) {
      console.error('Erro ao deletar ideia:', error);
      setMessage(`Erro ao deletar ideia: ${error.message}`);
    }
  };

  const expandIdea = async () => {
    if (!user) {
      setMessage('Você precisa estar logado para expandir a ideia.');
      return;
    }
    setLoadingAI(true);
    try {
      const idToken = await user.getIdToken();
      const response = await fetch('http://localhost:3001/ideas/suggest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`,
        },
        body: JSON.stringify({ prompt: `Expanda a seguinte ideia: ${idea.title} - ${idea.text}` }),
      });
      const data = await response.json();
      setExpandedIdea(data.suggestion);
    } catch (error) {
      console.error('Erro ao expandir ideia:', error);
      setMessage('Erro ao expandir ideia.');
    } finally {
      setLoadingAI(false);
    }
  };

  const generateCreativeExtensions = async () => {
    if (!user) {
      setMessage('Você precisa estar logado para gerar extensões.');
      return;
    }
    setLoadingAI(true);
    try {
      const idToken = await user.getIdToken();
      const response = await fetch('http://localhost:3001/ideas/suggest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`,
        },
        body: JSON.stringify({ prompt: `Me dê extensões criativas para a ideia: ${idea.title} - ${idea.text}` }),
      });
      const data = await response.json();
      setCreativeExtensions(data.suggestion);
    } catch (error) {
      console.error('Erro ao gerar extensões criativas:', error);
      setMessage('Erro ao gerar extensões criativas.');
    } finally {
      setLoadingAI(false);
    }
  };

  const generateInternalConnections = async () => {
    if (!user) {
      setMessage('Você precisa estar logado para gerar conexões.');
      return;
    }
    setLoadingAI(true);
    try {
      const idToken = await user.getIdToken();
      const response = await fetch('http://localhost:3001/ideas/suggest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`,
        },
        body: JSON.stringify({ prompt: `Sugira conexões internas para a ideia: ${idea.title} - ${idea.text}` }),
      });
      const data = await response.json();
      setInternalConnections(data.suggestion);
    } catch (error) {
      console.error('Erro ao gerar conexões internas:', error);
      setMessage('Erro ao gerar conexões internas.');
    } finally {
      setLoadingAI(false);
    }
  };

  const handleSaveCreations = () => {
    // This is a placeholder for the save creations functionality
    setMessage('Criações salvas com sucesso!');
  };

  return (
    <div className="container idea-detail-container">
      <img src="/logo.png" alt="Ideia+ Logo" className="logo logo-small" />
      <button className="back-button" onClick={onBackClick}>Voltar</button>

      {isEditing ? (
        <form className="form-container" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            required
          />
          <textarea
            rows="5"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            required
          ></textarea>
          <div className="button-group">
            <button type="submit">Salvar</button>
            <button type="button" onClick={() => setIsEditing(false)}>Cancelar</button>
          </div>
        </form>
      ) : (
        <>
          <h2>{idea.title}</h2>
          <p>{idea.text}</p>
          {generatedImageUrl && <img src={generatedImageUrl} alt="Imagem da Ideia" className="idea-image" />}

          {user && (
            <div className="button-group">
              <button onClick={handleEdit}>Editar</button>
              <button onClick={handleDelete}>Deletar</button>
            </div>
          )}
        </>
      )}

      <h3>Recursos de IA:</h3>
      <div className="button-group">
        <button onClick={expandIdea} disabled={loadingAI}>Expandir Ideia</button>
      </div>
      {expandedIdea && (
        <div className="suggestions-section">
          <h4>Ideia Expandida:</h4>
          <p>{expandedIdea}</p>
        </div>
      )}

      <h3>Sugestões da IA:</h3>

      <div className="suggestions-section">
        <h4>Extensões Criativas:</h4>
        <button onClick={generateCreativeExtensions} disabled={loadingAI}>Gerar Extensões</button>
        {creativeExtensions && <p>{creativeExtensions}</p>}
      </div>

      <div className="suggestions-section">
        <h4>Conexões Internas:</h4>
        <button onClick={generateInternalConnections} disabled={loadingAI}>Gerar Conexões</button>
        {internalConnections && <p>{internalConnections}</p>}
      </div>

      <div className="suggestions-section">
        <h4>Sugestões Externas:</h4>
        <ul>
          <li>Vídeos, artigos, apps relacionados. (placeholder)</li>
        </ul>
      </div>

      <button onClick={onConnectIdeaClick}>Conectar com outra ideia</button>
      <button onClick={handleSaveCreations}>Salvar Criações</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default IdeaDetail;

