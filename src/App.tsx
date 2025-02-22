import { useState, useEffect } from "react";
import { signup } from "./auth/signup";
import { login } from "./auth/login";
import { logout } from "./auth/logout";
import { auth } from "./firebase";
import { onAuthStateChanged, User } from "firebase/auth";

const App: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);
// 
  return (
    <div className="container mt-5">
      <h2>Firebase Authentication</h2>
      {user ? (
        <div>
          <p>Welcome, {user.email}</p>
          <button className="btn btn-danger" onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <input
            className="form-control mb-2"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="form-control mb-2"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn btn-primary me-2" onClick={() => signup(email, password)}>Sign Up</button>
          <button className="btn btn-success" onClick={() => login(email, password)}>Login</button>
        </div>
      )}
    </div>
  );
};

export default App;