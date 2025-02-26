import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { app } from '../firebase'; // Import your Firebase app instance
import { useNavigate } from 'react-router-dom';


const auth = getAuth(app);
const db = getFirestore(app);


const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(true); // Toggle between signup/login
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isSignup) {
        // Signup
        await createUserWithEmailAndPassword(auth, email, password);
        // Add user to Firestore (default role: "user")
        await setDoc(doc(db, 'users', auth.currentUser!.uid), {
          uid: auth.currentUser!.uid,
          email: auth.currentUser!.email!,
          role: 'user',
        });
      } else {
        // Login
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/'); // Redirect after successful auth
    } catch (error: any) {
      console.error('Authentication error:', error);
      alert(error.message); // Display error message to the user
    }
  };


  const handleRoleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => { // Note: HTMLSelectElement
    if (auth.currentUser) {
      try {
        await setDoc(doc(db, 'users', auth.currentUser.uid), {
          role: e.target.value,
        }, { merge: true });
        alert('Role updated!');
      } catch (error: any) {
        console.error("Error updating role:", error);
        alert("Failed to update role.");
      }
    } else {
      alert('You must be logged in to change your role.');
    }
  };


  return (
    <div>
      <h1>{isSignup ? 'Signup' : 'Login'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isSignup ? 'Signup' : 'Login'}</button>
      </form>
      {/* Only show for admin role management after login */}
      {auth.currentUser && (
        <>
          <div>
            <label>
              Change Role:
              <select onChange={handleRoleChange}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </label>
          </div>
        </>
      )}
      <button onClick={() => setIsSignup(!isSignup)}>
        {isSignup ? 'Already have an account? Login' : 'Create an account'}
      </button>
    </div>
  );
};

export default Auth;