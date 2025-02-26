import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import HomePage from './pages/HomePage';
import ReportForm from './pages/ReportForm';
import Post from './pages/Post';
import { auth, onAuthStateChangedListener } from './firebase';

function App() {
  const [user, setUser] = useState<any | null>(null);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((currentUser) => {
      setUser(currentUser);
      // Redirect to home page if user is already logged in
      if (currentUser) {
        setShowLogin(false);
      } else {
        setShowLogin(true);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLoginSuccess = () => {
    setShowLogin(false);
  };

  const handleSignupSuccess = () => {
    setShowLogin(false);
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      setUser(null);
      setShowLogin(true);
    });
  };

  return (
    <BrowserRouter>
      <div>
        <Routes>
        <Route path="/home" element={user ? <HomePage handleLogout={handleLogout} /> : <Navigate to="/" />} />
          <Route path="/report" element={user ? <ReportForm /> : <Navigate to="/" />} />
          <Route
            path="/"
            element={user ? <Navigate to="/home" /> : (
              <>
                {showLogin ? (
                  <>
                    <Login onLoginSuccess={handleLoginSuccess} />
                    <button onClick={() => setShowLogin(false)}>Go to Signup</button>
                  </>
                ) : (
                  <>
                    <Signup onSignupSuccess={handleSignupSuccess} />
                    <button onClick={() => setShowLogin(true)}>Go to Login</button>
                  </>
                )}
              </>
            )}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;