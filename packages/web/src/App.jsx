import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Onboarding from './components/Onboarding';
import Home from './components/Home';
import CreateIdea from './components/CreateIdea';
import IdeaDetail from './components/IdeaDetail';
import ConnectionMap from './components/ConnectionMap';
import AISuggestions from './components/AISuggestions';
import ProfileSettings from './components/ProfileSettings'; // Import ProfileSettings component
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('onboarding');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState(null);

  const handleRegisterClick = () => {
    setCurrentScreen('register');
  };

  const handleLoginClick = () => {
    setCurrentScreen('login');
  };

  const handleLoginSuccess = (uid) => {
    setIsLoggedIn(true);
    setCurrentScreen('home');
    console.log('User logged in with UID:', uid);
  };

  const handleCreateIdeaClick = () => {
    setCurrentScreen('createIdea');
  };

  const handleCreateIdeaSuccess = () => {
    setCurrentScreen('home');
  };

  const handleIdeaClick = (idea) => {
    setSelectedIdea(idea);
    setCurrentScreen('ideaDetail');
  };

  const handleBackFromDetail = () => {
    setCurrentScreen('home');
    setSelectedIdea(null);
  };

  const handleConnectIdeaClick = () => {
    setCurrentScreen('connectionMap');
  };

  const handleBackFromConnectionMap = () => {
    setCurrentScreen('ideaDetail');
  };

  const handleAISuggestionsClick = () => { // New handler for AI Suggestions
    setCurrentScreen('aiSuggestions');
  };

  const handleBackFromAISuggestions = () => { // New handler to go back from AI Suggestions
    setCurrentScreen('home');
  };

  const handleProfileSettingsClick = () => { // New handler for Profile/Settings
    setCurrentScreen('profileSettings');
  };

  const handleBackFromProfileSettings = () => { // New handler to go back from Profile/Settings
    setCurrentScreen('home');
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <>
          {currentScreen === 'home' && <Home onCreateIdeaClick={handleCreateIdeaClick} onIdeaClick={handleIdeaClick} onAISuggestionsClick={handleAISuggestionsClick} onProfileSettingsClick={handleProfileSettingsClick} />}
          {currentScreen === 'createIdea' && <CreateIdea onCreateIdeaSuccess={handleCreateIdeaSuccess} />}
          {currentScreen === 'ideaDetail' && <IdeaDetail idea={selectedIdea} onBackClick={handleBackFromDetail} onConnectIdeaClick={handleConnectIdeaClick} />}
          {currentScreen === 'connectionMap' && <ConnectionMap onBackClick={handleBackFromConnectionMap} />}
          {currentScreen === 'aiSuggestions' && <AISuggestions onBackClick={handleBackFromAISuggestions} />}
          {currentScreen === 'profileSettings' && <ProfileSettings onBackClick={handleBackFromProfileSettings} />}
        </>
      ) : (
        <>
          {currentScreen === 'onboarding' && (
            <Onboarding onRegisterClick={handleRegisterClick} onLoginClick={handleLoginClick} />
          )}
          {currentScreen === 'register' && <Register />}
          {currentScreen === 'login' && <Login onLoginSuccess={handleLoginSuccess} />}
        </>
      )}
    </div>
  );
}

export default App;