import React, { useState } from 'react';

function Onboarding({ onRegisterClick, onLoginClick }) {
  const [backgroundColor, setBackgroundColor] = useState('rgba(240, 240, 240, 0.9)');

  const changeBackgroundColor = () => {
    const randomColor = () => Math.floor(Math.random() * 256);
    let newColor;
    do {
      newColor = `rgba(${randomColor()}, ${randomColor()}, ${randomColor()}, 0.9)`;
    } while (newColor === 'rgba(255, 255, 255, 0.9)');
    setBackgroundColor(newColor);
  };

  return (
    <div className="onboarding-container" onClick={changeBackgroundColor}>
      <div className="container" style={{ backgroundColor }}>
        <div className="logo-container">
          <img src="/logo.png" alt="Ideia+ Logo" className="logo logo-large" />
        </div>
        <p className="tagline">Toda grande ideia começa com um rabisco.</p>
        <div className="button-group">
          <button onClick={(e) => { e.stopPropagation(); onRegisterClick(); }}>Criar conta</button>
          <button onClick={(e) => { e.stopPropagation(); onLoginClick(); }}>Entrar</button>
        </div>
      </div>
    </div>
  );
}

export default Onboarding;

