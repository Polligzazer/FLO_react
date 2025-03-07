import { useState } from 'react';

import HomePage from './pages/HomePage';
import ReportForm from './pages/ReportForm';
import Auth from './pages/Auth';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebase';
import App from './App';
import Login from './pages/Login';



function MainContent() {
    const [user, setUser] = useState<any | null>(null);
      const [showLogin, setShowLogin] = useState(false);
    

    const handleLogout = () => {
        auth.signOut().then(() => {
          setUser(null);
          setShowLogin(true);
        });
      };
    
  return (
    <Routes>
        <Route path="/home" element={user ? <HomePage handleLogout={handleLogout} /> : <Navigate to="/" />} />
        <Route path="/report" element={user ? <ReportForm /> : <Navigate to="/" />} />
    </Routes>
  );
}

export default MainContent;