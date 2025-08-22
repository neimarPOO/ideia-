import React, { useState, useEffect } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Onboarding from './components/Onboarding';
import Home from './components/Home';
import CreateIdea from './components/CreateIdea';
import IdeaDetail from './components/IdeaDetail';
import ConnectionMap from './components/ConnectionMap';
import AISuggestions from './components/AISuggestions';
import ProfileSettings from './components/ProfileSettings';
import { auth } from './firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('onboarding');
  const [user, setUser] = useState(null); // Firebase user object
  const [selectedIdea, setSelectedIdea] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setCurrentScreen('home');
      } else {
        setCurrentScreen('onboarding');
      }
    });
    return () => unsubscribe();
  }, []);

  const handleRegisterClick = () => {
    setCurrentScreen('register');
  };

  const handleLoginClick = () => {
    setCurrentScreen('login');
  };

  const handleAuthSuccess = (loggedInUser) => {
    setUser(loggedInUser);
    setCurrentScreen('home');
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setCurrentScreen('onboarding');
    } catch (error) {
      console.error('Error during logout:', error);
    }
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

  const handleAISuggestionsClick = () => {
    setCurrentScreen('aiSuggestions');
  };

  const handleBackFromAISuggestions = () => {
    setCurrentScreen('home');
  };

  const handleProfileSettingsClick = () => {
    setCurrentScreen('profileSettings');
  };

  const handleBackFromProfileSettings = () => {
    setCurrentScreen('home');
  };

  return (
    <div className="App">
      {user ? (
        <>
          {currentScreen === 'home' && <Home onCreateIdeaClick={handleCreateIdeaClick} onIdeaClick={handleIdeaClick} onAISuggestionsClick={handleAISuggestionsClick} onProfileSettingsClick={handleProfileSettingsClick} onLogout={handleLogout} user={user} />}
          {currentScreen === 'createIdea' && <CreateIdea onCreateIdeaSuccess={handleCreateIdeaSuccess} user={user} />}
          {currentScreen === 'ideaDetail' && <IdeaDetail idea={selectedIdea} onBackClick={handleBackFromDetail} onConnectIdeaClick={handleConnectIdeaClick} user={user} />}
          {currentScreen === 'connectionMap' && <ConnectionMap onBackClick={handleBackFromConnectionMap} user={user} />}
          {currentScreen === 'aiSuggestions' && <AISuggestions onBackClick={handleBackFromAISuggestions} user={user} />}
          {currentScreen === 'profileSettings' && <ProfileSettings onBackClick={handleBackFromProfileSettings} user={user} onLogout={handleLogout} />}
        </>
      ) : (
        <>
          {currentScreen === 'onboarding' && (
            <Onboarding onRegisterClick={handleRegisterClick} onLoginClick={handleLoginClick} />
          )}
          {currentScreen === 'register' && <Register onRegisterSuccess={handleAuthSuccess} />}
          {currentScreen === 'login' && <Login onLoginSuccess={handleAuthSuccess} />}
        </>
      )}
    </div>
  );
}

export default App;