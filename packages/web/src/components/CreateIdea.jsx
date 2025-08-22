import React, { useState } from 'react';

function CreateIdea({ onCreateIdeaSuccess, user }) {
  const [ideaText, setIdeaText] = useState('');
  const [message, setMessage] = useState('');
  const [audioRecording, setAudioRecording] = useState(false);
  const [drawingMode, setDrawingMode] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');

    if (!user) {
      setMessage('Você precisa estar logado para salvar uma ideia.');
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
        body: JSON.stringify({ title: ideaText.substring(0, 50), text: ideaText }), // Usando parte do texto como título
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMessage('Ideia salva com sucesso!');
      console.log('Ideia salva:', data);
      if (onCreateIdeaSuccess) {
        onCreateIdeaSuccess();
      }
      setIdeaText('');
    } catch (error) {
      console.error('Erro ao salvar ideia:', error);
      setMessage(`Erro ao salvar ideia: ${error.message}`);
    }
  };

  const toggleAudioRecording = () => {
    setAudioRecording(!audioRecording);
    setMessage(audioRecording ? 'Gravação de áudio parada.' : 'Gravando áudio...');
  };

  const toggleDrawingMode = () => {
    setDrawingMode(!drawingMode);
    setMessage(drawingMode ? 'Modo de desenho desativado.' : 'Modo de desenho ativado.');
  };

  return (
    <div className="container create-idea-container">
      <img src="/logo.png" alt="Ideia+ Logo" className="logo logo-small" />
      <h2>Criar Nova Ideia</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <textarea
          placeholder="Digite sua ideia aqui..."
          rows="5"
          value={ideaText}
          onChange={(e) => setIdeaText(e.target.value)}
          required
        ></textarea>

        <h3>Opções de Entrada:</h3>
        <div className="button-group">
          <button type="button" onClick={toggleAudioRecording}>
            {audioRecording ? 'Parar Gravação' : 'Gravar Áudio'}
          </button>
          <button type="button" onClick={toggleDrawingMode}>
            {drawingMode ? 'Sair do Desenho' : 'Desenhar Ideia'}
          </button>
        </div>
        {audioRecording && <p>Gravando... (placeholder para transcrição)</p>}
        {drawingMode && (
          <div className="drawing-canvas-placeholder">
            <p>Quadro de Desenho (placeholder)</p>
          </div>
        )}

        <h3>Recursos de IA:</h3>
        <p>Tags Automáticas Sugeridas: (placeholder)</p>
        <div className="button-group">
          {/* <button type="button" onClick={generateImage}>Gerar Imagem</button> */}
          {/* <button type="button" onClick={expandIdea}>Expandir Ideia</button> */}
        </div>

        <button type="submit">Salvar Ideia</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CreateIdea;

