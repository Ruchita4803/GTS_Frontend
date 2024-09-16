import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogOut = ({ handleLogout }) => {
  const navigate = useNavigate();

  const handleLogOutClick = () => {
    // Remove the user's token from localStorage (or sessionStorage)
    localStorage.removeItem('authToken');
    handleLogout();

    // Redirect to the login page
    navigate('/login');
  };

  return (
    <div className="logout-container">
      <div className="logout-button" onClick={handleLogOutClick}>Log Out</div>
    </div>
  );
};

export default LogOut;