import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import HomePage from './pages/HomePage';
import ReportForm from './pages/ReportForm';
<<<<<<< HEAD
=======
import MainContent from './MainContent';
>>>>>>> d273afd36c1290e95dff2b7a76ab4fde52ea95b9
import { auth, onAuthStateChangedListener } from './firebase';

function App() {
  const [user, setUser] = useState<any | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((currentUser) => {
      setUser(currentUser);
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
          <Route path="/" element={
            <>
              {showLogin ? <Login onLoginSuccess={handleLoginSuccess} /> : <Signup />}
              <button onClick={() => setShowLogin(!showLogin)}>
                {showLogin ? 'Go to Signup' : 'Go to Login'}
              </button>
            </>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
