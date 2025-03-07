import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import 'bootstrap/dist/css/bootstrap.css';
import fLogo from '../assets/FLO_LOGO.png';
import '../style/Signup.css';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/main'); // Redirect to /main after successful signup
    } catch (error: any) {
      setError(error.message);
    }
  };


  return (
    <div className="container-fluid align-items-center justify-content-center border border-primary p-0">
      <div className=" d-flex flex-row justify-content-center align-items-center border border-primary">
        <div className=" d-none d-md-flex  flex-column text-start border border-primary px-4">
          <img src={fLogo} className="img"/>
          <p className="">Returning lost objects, one item at a time</p>
        </div>
        <div className="p-5 border border-primary d-flex flex-column">
          <p className="text-center">Signup</p>
          
          <form className="d-flex flex-column border border-primary p-3" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className="error-message">{error && error.includes('email') && error}</p>
            </div>

            <div className="input-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="error-message">{error && error.includes('password') && error}</p>
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <p className="error-message">{error && error.includes('match') && error}</p>
            </div>

            <button type="submit">Signup</button>
            {error && !error.includes('email') && !error.includes('password') && !error.includes('match') && <p style={{ color: 'red' }}>{error}</p>}
          </form>
        </div>
      </div>        
    </div>  
  );
}

export default Signup;
