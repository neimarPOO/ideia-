import React, { useState, useEffect } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Onboarding from './components/Onboarding';
import Home from './components/Home';
import IdeaDetail from './components/IdeaDetail';
import ConnectionMap from './components/ConnectionMap';
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

  return (
    <div className="App">
      {user ? (
        <>
          {currentScreen === 'home' && <Home onIdeaClick={handleIdeaClick} onLogout={handleLogout} user={user} />}
          {currentScreen === 'ideaDetail' && <IdeaDetail idea={selectedIdea} onBackClick={handleBackFromDetail} onConnectIdeaClick={handleConnectIdeaClick} user={user} />}
          {currentScreen === 'connectionMap' && <ConnectionMap onBackClick={handleBackFromConnectionMap} user={user} />}
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