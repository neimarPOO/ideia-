import React, { useState } from 'react';

function CreateIdea({ onIdeaCreated, user }) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!user) {
      setMessage('Você precisa estar logado para criar uma ideia.');
      return;
    }

    try {
      const idToken = await user.getIdToken();
      const response = await fetch('http://localhost:3001/ideas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`,
        },
        body: JSON.stringify({ title, text }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newIdea = await response.json();
      setMessage('Ideia criada com sucesso!');
      setTitle('');
      setText('');
      onIdeaCreated(newIdea);
    } catch (error) {
      console.error('Erro ao criar ideia:', error);
      setMessage(`Erro ao criar ideia: ${error.message}`);
    }
  };

  return (
    <div className="form-container">
      <h3>Nova Ideia</h3>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Título da sua ideia"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          rows="3"
          placeholder="Descreva sua ideia"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
        <button type="submit">Salvar Ideia</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CreateIdea;