import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Url } from '../Api/Url';

const LogOut = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Assume authenticated initially

  const handleLogout = async () => {
    try {
      // Send a POST request to the logout API with the token in the Authorization header
      const response = await axios.post(
        Url.logout, // The logout URL from your API
        {}, // Empty body if no data is needed
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Send the token in the Authorization header
          },
        }
      );

      if (response.status === 200) {
        // Successful logout
        setIsAuthenticated(false);
        localStorage.removeItem('authToken'); // Clear the token from localStorage
        console.log("Logout successful!");
        navigate('/login');
      } else {
        console.error('Logout failed:', response.data.message || 'Unknown error');
        alert('Logout failed: ' + (response.data.message || 'Unknown error'));
      }
    } catch (error) {
      if (error.response) {
        console.error('Logout failed:', error.response.data.message || 'Unknown error');
        alert('Logout failed: ' + (error.response.data.message || 'Unknown error'));
      } else {
        console.error('An error occurred during logout:', error.message);
        alert('An error occurred during logout.');
      }
    }
  };

  return (
    <div className="logout-container">
      <div className="logout-button" onClick={handleLogout}>
        Log Out
      </div>
    </div>
  );
};

export default LogOut;
