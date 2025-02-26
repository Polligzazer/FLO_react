import React from 'react';
import { useAuth } from '../context/AuthContext'; // Assuming you have this context

const AdminPage: React.FC = () => {
  const { user, logout } = useAuth(); // Access user info and logout function

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin!</p>
      <p>Logged in as: {user?.email}</p> {/* Display user email */}
      <button onClick={logout}>Logout</button> {/* Add logout button */}
      {/* Add admin-specific functionalities here */}
    </div>
  );
};

export default AdminPage;